/**
 * UploadService.ts
 *
 * Handles robust video uploading to Firebase Storage.
 * Features:
 * - Unique path generation
 * - Progress tracking
 * - Error handling
 * - Metadata attachment
 */

import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number; // 0 to 1
}

/**
 * Uploads a video file to Firebase Storage.
 *
 * @param localUri - The local file URI of the video
 * @param challengeId - The ID of the challenge (for organization)
 * @param onProgress - Callback for upload progress
 * @returns Promise resolving to the public download URL
 */
export const uploadSubmissionVideo = async (
  localUri: string,
  challengeId: string,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> => {
  const userId = auth().currentUser?.uid;
  if (!userId) throw new Error("User must be authenticated to upload.");

  // 1. Generate a unique file path
  // Structure: submissions/{challengeId}/{userId}_{timestamp}.mp4
  const timestamp = Date.now();
  const fileName = `${userId}_${timestamp}.mp4`;
  const storagePath = `submissions/${challengeId}/${fileName}`;

  const reference = storage().ref(storagePath);

  // 2. Handle platform-specific URI formatting
  const uploadUri =
    Platform.OS === "ios" ? localUri.replace("file://", "") : localUri;

  // 3. Create the upload task
  const task = reference.putFile(uploadUri, {
    contentType: "video/mp4",
    customMetadata: {
      userId,
      challengeId,
      uploadedAt: new Date().toISOString(),
    },
  });

  // 4. Monitor progress
  task.on("state_changed", (snapshot) => {
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
    // 5. Wait for completion
    await task;

    // 6. Get the download URL
    const url = await reference.getDownloadURL();
    console.log("Upload successful:", url);
    return url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error(
      "Failed to upload video. Please check your connection and try again.",
    );
  }
};
