import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { Product } from '../types';

// Check if Firebase configuration environment variables are present
const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: metaEnv.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket
);

let app;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('Firebase initialized successfully!');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.warn(
    'Firebase environment variables are missing. Falling back to local storage.'
  );
}

export { isFirebaseConfigured, db, storage };

export interface UploadImageResult {
  url: string;
  metadata?: {
    size: number;
    type: string;
    uploadedAt: string;
    originalName: string;
  };
}

/**
 * Uploads an image (File or base64 data-url) to Firebase Storage
 * and returns the permanent download URL along with metadata.
 */
export async function uploadProductImage(
  productId: string,
  fileOrBase64: File | string
): Promise<UploadImageResult> {
  if (!fileOrBase64) {
    throw new Error('لم يتم توفير أي ملف صورة للرفع.');
  }

  // Validate File type and size if File object
  if (fileOrBase64 instanceof File) {
    if (!fileOrBase64.type.startsWith('image/')) {
      throw new Error('الملف المرفوع ليس صورة. يرجى اختيار ملف صورة صالح (JPG, PNG, WebP...).');
    }
    const maxSizeBytes = 15 * 1024 * 1024; // 15MB limit
    if (fileOrBase64.size > maxSizeBytes) {
      throw new Error('حجم الصورة كبير جداً (الحد الأقصى المسموح 15 ميغابايت).');
    }
  }

  if (!isFirebaseConfigured || !storage) {
    // If not configured, fallback to base64 string or mock URL
    if (typeof fileOrBase64 === 'string') {
      return { url: fileOrBase64 };
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve({
          url: result,
          metadata: {
            size: fileOrBase64.size,
            type: fileOrBase64.type,
            uploadedAt: new Date().toISOString(),
            originalName: fileOrBase64.name
          }
        });
      };
      reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة محلياً.'));
      reader.readAsDataURL(fileOrBase64);
    });
  }

  try {
    let blob: Blob;
    let fileName = `image_${Date.now()}`;
    let meta = {
      size: 0,
      type: 'image/jpeg',
      uploadedAt: new Date().toISOString(),
      originalName: 'image'
    };

    if (fileOrBase64 instanceof File) {
      blob = fileOrBase64;
      const sanitizedName = fileOrBase64.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      fileName = `${Date.now()}_${sanitizedName}`;
      meta = {
        size: fileOrBase64.size,
        type: fileOrBase64.type || 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        originalName: fileOrBase64.name
      };
    } else if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:')) {
      // Decode Base64 Data URL to Blob
      const parts = fileOrBase64.split(';base64,');
      if (parts.length !== 2) {
        throw new Error('صيغة صورة Base64 غير صالحة.');
      }
      const contentType = parts[0].split(':')[1] || 'image/png';
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      blob = new Blob([uInt8Array], { type: contentType });
      const ext = contentType.split('/')[1] || 'png';
      fileName = `${Date.now()}_image.${ext}`;
      meta = {
        size: blob.size,
        type: contentType,
        uploadedAt: new Date().toISOString(),
        originalName: fileName
      };
    } else {
      // It is already a remote URL string
      return { url: fileOrBase64 };
    }

    const storageRef = ref(storage, `products/${productId}/${fileName}`);
    
    // Upload bytes with content type and custom metadata
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: meta.type,
      customMetadata: {
        productId,
        originalName: meta.originalName,
        uploadedAt: meta.uploadedAt
      }
    });

    const downloadURL = await getDownloadURL(snapshot.ref);

    if (!downloadURL || !downloadURL.startsWith('http')) {
      throw new Error('فشل الحصول على رابط تنزيل صحيح من التخزين السحابي.');
    }

    return {
      url: downloadURL,
      metadata: meta
    };
  } catch (error: any) {
    console.error('Error uploading product image to Firebase:', error);
    throw new Error(error?.message || 'فشل رفع الصورة إلى Firebase Storage.');
  }
}

/**
 * Deletes an image from Firebase Storage if it's a Storage URL.
 */
export async function deleteProductImage(imageUrl: string): Promise<void> {
  if (!isFirebaseConfigured || !storage || !imageUrl) return;

  // Verify if it's a Firebase Storage URL before trying to delete
  if (imageUrl.includes('firebasestorage.googleapis.com')) {
    try {
      // Create ref from full URL
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      console.log('Image deleted from Firebase Storage:', imageUrl);
    } catch (error) {
      console.warn('Could not delete image from Storage (it might not exist):', error);
    }
  }
}

/**
 * Fetches all products from Firestore "products" collection.
 */
export async function fetchProductsFromFirestore(): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    const productsCol = collection(db, 'products');
    const q = query(productsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: Product[] = [];
    
    snapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      list.push({
        id: docSnapshot.id,
        ...data,
      } as Product);
    });

    return list;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw error;
  }
}

/**
 * Saves or updates a product in Firestore.
 */
export async function saveProductToFirestore(product: Product): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    const docRef = doc(db, 'products', product.id);
    const dataToSave = {
      ...product,
      createdAt: (product as any).createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    console.log('Product saved to Firestore successfully:', product.id);
  } catch (error) {
    console.error('Error saving product to Firestore:', error);
    throw error;
  }
}

/**
 * Deletes a product document from Firestore.
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    console.log('Product document deleted from Firestore:', productId);
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
    throw error;
  }
}
