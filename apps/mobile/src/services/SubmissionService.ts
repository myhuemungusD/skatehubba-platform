import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { GameLength } from '../components/GameModeSelector';

interface SubmissionPayload {
  challengeId: string;
  gameLength: GameLength;
  videoUri: string; // The local file path from Vision Camera
  duration: number;
}

export const SubmissionService = {
  /**
   * Orchestrates the video upload and document creation.
   * returns: Promise<void>
   */
  submitChallenge: async ({ challengeId, gameLength, videoUri, duration }: SubmissionPayload) => {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    // 1. Generate IDs and References
    // We create the document Reference *first* so we can use its ID for the video filename.
    // This keeps storage and database tightly linked.
    const submissionRef = firestore().collection('submissions').doc();
    const submissionId = submissionRef.id;
    const storagePath = `submissions/${user.uid}/${challengeId}/${submissionId}.mp4`;

    console.log('Starting upload for submission:', submissionId);

    try {
      // 2. Upload Video to Firebase Storage
      // Optimization: Set metadata for cache control and content type
      const reference = storage().ref(storagePath);
      await reference.putFile(videoUri, {
        contentType: 'video/mp4',
        customMetadata: {
          userId: user.uid,
          challengeId: challengeId,
          duration: duration.toString()
        }
      });

      // 3. Get the Download URL
      const downloadURL = await reference.getDownloadURL();

      // 4. Create the Firestore Document
      // We use serverTimestamp() for absolute accuracy on the server
      await submissionRef.set({
        submissionId: submissionId,
        userId: user.uid,
        challengeId: challengeId,
        gameLength: gameLength,
        videoURL: downloadURL,
        videoPath: storagePath, // Store path to allow easy deletion later if needed
        status: 'PENDING',
        resolvedOutcome: null,
        submittedAt: firestore.FieldValue.serverTimestamp(),
        judging: {
          landedVotes: 0,
          letterVotes: 0,
          disputeVotes: 0,
          judgesVoted: [] // Initialize empty array
        }
      });

      console.log('Submission successfully created!');
      
    } catch (error) {
      console.error('Submission failed:', error);
      // ROLLBACK STRATEGY: 
      // If Firestore write fails, we should ideally delete the uploaded video 
      // to avoid orphaned files (Ghost Storage).
      try {
        await storage().ref(storagePath).delete();
      } catch (e) {
        console.warn('Failed to rollback storage upload', e);
      }
      throw error; // Re-throw to UI for handling
    }
  }
};
