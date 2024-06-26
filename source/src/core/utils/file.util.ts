import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';

// https://ionicframework.com/docs/angular/your-first-app/5-adding-mobile
/**
 * This method get an URI and read the contennt as base64
 *
 * @param uri HTTP URL (browser) OR file:// path (native)
 * @returns base64 string
 */
export async function readAsBase64(uri: string): Promise<string> {
  // "hybrid" will detect Cordova or Capacitor
  if (!Capacitor.isNativePlatform()) {
    // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: uri,
    });

    return file.data as string;
  } else {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(uri);
    const blob = await response.blob();

    return (await convertBlobToBase64(blob)) as string;
  }
}

export function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}
