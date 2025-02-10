export async function getImageFileFromUrl(url: string): Promise<File | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image, status code: ${response.status}`);
    }

    const blob = await response.blob();
    const fileName = url.substring(url.lastIndexOf("/") + 1); // Extracting filename from URL
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    return null;
  }
}
