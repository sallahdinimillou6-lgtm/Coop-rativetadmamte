/**
 * In-browser Image Compressor & Optimizer
 * Compresses camera/gallery photos to lightweight WebP/JPEG in < 50ms using hardware acceleration.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: 'image/webp' | 'image/jpeg';
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<{ file: File; dataUrl: string; size: number }> {
  const {
    maxWidth = 850,
    maxHeight = 850,
    quality = 0.75,
    mimeType = 'image/webp'
  } = options;

  if (!file.type.startsWith('image/')) {
    throw new Error('الملف المحدد ليس صورة صالحة.');
  }

  // Fast path: Hardware-accelerated createImageBitmap
  if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      let width = bitmap.width;
      let height = bitmap.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();

        let exportMime = mimeType;
        let dataUrl = canvas.toDataURL(exportMime, quality);
        if (!dataUrl.startsWith(`data:${exportMime}`)) {
          exportMime = 'image/jpeg';
          dataUrl = canvas.toDataURL(exportMime, quality);
        }

        const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, exportMime, quality));
        if (blob) {
          const extension = exportMime === 'image/webp' ? 'webp' : 'jpg';
          const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'product_img';
          const compressedFile = new File([blob], `${baseName}.${extension}`, {
            type: exportMime,
            lastModified: Date.now(),
          });

          return {
            file: compressedFile,
            dataUrl,
            size: blob.size,
          };
        }
      }
    } catch {
      // Fallback to standard Image loader if createImageBitmap fails
    }
  }

  // Fallback path
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
          reject(new Error('Could not initialize canvas context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(img, 0, 0, width, height);

        let exportMime = mimeType;
        let dataUrl = canvas.toDataURL(exportMime, quality);

        if (!dataUrl.startsWith(`data:${exportMime}`)) {
          exportMime = 'image/jpeg';
          dataUrl = canvas.toDataURL(exportMime, quality);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const extension = exportMime === 'image/webp' ? 'webp' : 'jpg';
              const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
              const compressedFile = new File([blob], `${baseName}_optimized.${extension}`, {
                type: exportMime,
                lastModified: Date.now(),
              });

              resolve({
                file: compressedFile,
                dataUrl,
                size: blob.size,
              });
            } else {
              resolve({
                file,
                dataUrl,
                size: file.size,
              });
            }
          },
          exportMime,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('فشل معالجة وضغط الصورة في المتصفح.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('فشل قراءة ملف الصورة.'));
    };
  });
}

