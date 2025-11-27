export const uploadSkateClip = async (
  uri: string,
  userId: string,
): Promise<string> => {
  // Mock upload
  console.log(`Uploading ${uri} for user ${userId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(uri); // Just return the URI for now
    }, 1000);
  });
};
