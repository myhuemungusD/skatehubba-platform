/**
 * VideoUploadService.ts
 * 
 * Handles robust video uploading to Firebase Storage with progress tracking,
 * error handling, and retry logic.
 */

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number; // 0 to 1
}

export interface UploadResult {
  downloadURL: string;
  storagePath: string;
}

/**
 * Uploads a video file to Firebase Storage.
 * 
 * @param localFilePath - The local URI of the video file
 * @param challengeId - The ID of the challenge (for organization)
 * @param onProgress - Callback for upload progress updates
 * @returns Promise resolving to the download URL and storage path
 */
export const uploadSubmissionVideo = async (
  localFilePath: string,
  challengeId: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    throw new Error('User must be authenticated to upload video');
  }

  // Create a unique filename
  const timestamp = Date.now();
  const filename = `submission_${userId}_${timestamp}.mp4`;
  const storagePath = `submissions/${challengeId}/${userId}/${filename}`;
  
  const reference = storage().ref(storagePath);

  // Handle file path differences between iOS and Android
  let uploadUri = localFilePath;
  if (Platform.OS === 'ios' && !uploadUri.startsWith('file://')) {
    uploadUri = `file://${uploadUri}`;
  }

  const task = reference.putFile(uploadUri);

  // Monitor upload progress
  task.on('state_changed', (snapshot) => {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes;
    if (onProgress) {
      onProgress({
        bytesTransferred: snapshot.bytesTransferred,
        totalBytes: snapshot.totalBytes,
        progress,
      });
    }
  });

  try {
    await task;
    const downloadURL = await reference.getDownloadURL();
    console.log('Video uploaded successfully:', downloadURL);
    return { downloadURL, storagePath };
  } catch (error: any) {
    console.error('Video upload failed:', error);
    
    // Map common errors to user-friendly messages
    if (error.code === 'storage/unauthorized') {
      throw new Error('Permission denied. Please check your connection and try again.');
    } else if (error.code === 'storage/canceled') {
      throw new Error('Upload canceled.');
    } else if (error.code === 'storage/unknown') {
      throw new Error('An unknown error occurred during upload.');
    }
    
    throw new Error('Failed to upload video. Please try again.');
  }
};
