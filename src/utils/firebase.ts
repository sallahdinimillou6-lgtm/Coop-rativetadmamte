import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { Product } from '../types';

// Load Firebase configuration from environment variables or custom runtime config
const metaEnv = (import.meta as any).env || {};

function getStoredFirebaseConfig() {
  try {
    const saved = localStorage.getItem('tadmamte_firebase_custom_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDPvX5DkZHCFp5mo-qHFdHN2SsEFw2q9IU",
  authDomain: "vivid-solution-tk7s0.firebaseapp.com",
  projectId: "vivid-solution-tk7s0",
  storageBucket: "vivid-solution-tk7s0.firebasestorage.app",
  messagingSenderId: "358663154812",
  appId: "1:358663154812:web:56d1140f9d18b72632adf9",
  firestoreDatabaseId: "ai-studio-cooprativetadmam-7c16c26d-924b-4ef2-9d41-d9f70214780f"
};

const customConfig = getStoredFirebaseConfig();

const firebaseConfig = {
  apiKey: customConfig?.apiKey || metaEnv.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: customConfig?.authDomain || metaEnv.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: customConfig?.projectId || metaEnv.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: customConfig?.storageBucket || metaEnv.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: customConfig?.messagingSenderId || metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: customConfig?.appId || metaEnv.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  firestoreDatabaseId: customConfig?.firestoreDatabaseId || metaEnv.VITE_FIREBASE_DATABASE_ID || DEFAULT_FIREBASE_CONFIG.firestoreDatabaseId,
};

let isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket
);

let app: any = null;
let db: any = null;
let storage: any = null;

function initFirebase() {
  if (isFirebaseConfigured) {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      db = (firebaseConfig as any).firestoreDatabaseId 
        ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
        : getFirestore(app);
      storage = getStorage(app);
      console.log('Firebase initialized successfully for project:', firebaseConfig.projectId);
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }
  }
}

initFirebase();

export function updateCustomFirebaseConfig(config: Partial<typeof firebaseConfig>) {
  try {
    localStorage.setItem('tadmamte_firebase_custom_config', JSON.stringify(config));
    Object.assign(firebaseConfig, config);
    isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.storageBucket);
    initFirebase();
    window.location.reload();
  } catch (err) {
    console.error('Failed to save custom Firebase config:', err);
  }
}

export { isFirebaseConfigured, db, storage, firebaseConfig };

export function getFirebaseDiagnostics() {
  return {
    isConfigured: isFirebaseConfigured,
    projectId: firebaseConfig.projectId || '',
    authDomain: firebaseConfig.authDomain || '',
    hasApiKey: !!firebaseConfig.apiKey,
    hasStorageBucket: !!firebaseConfig.storageBucket,
  };
}

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
 * Uses robust collection fetch with in-memory sorting to prevent missing-index errors on mobile.
 */
export async function fetchProductsFromFirestore(): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured.');
  }

  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    const list: Product[] = [];
    
    snapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      list.push({
        id: docSnapshot.id,
        ...data,
      } as Product);
    });

    // In-memory sort by createdAt (descending)
    list.sort((a: any, b: any) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    return list;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw error;
  }
}

/**
 * Real-time listener for Firestore "products" collection.
 * Invokes the callback immediately and on every product update/addition/deletion from any device.
 */
export function subscribeToProductsFromFirestore(
  onProductsUpdate: (products: Product[]) => void,
  onError?: (error: Error) => void
): () => void {
  if (!isFirebaseConfigured || !db) {
    return () => {};
  }

  try {
    const productsCol = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsCol,
      { includeMetadataChanges: false },
      (snapshot) => {
        const list: Product[] = [];
        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          list.push({
            id: docSnapshot.id,
            ...data,
          } as Product);
        });

        // In-memory sort by createdAt (descending)
        list.sort((a: any, b: any) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });

        onProductsUpdate(list);
      },
      (error) => {
        console.warn('Firestore real-time listener error:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error: any) {
    console.error('Error setting up Firestore products listener:', error);
    if (onError) onError(error);
    return () => {};
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

export const BANNED_DUMMY_PRODUCT_IDS = [
  'tadmamte-honey-harsha',
  'tadmamte-amlou-walnut',
  'tadmamte-honey-flowers',
  'honey-flowers',
  'honey-harsha',
  'amlou-walnut',
  'rare-wild-souss',
  'rare-chendgoura',
  'honey-sidr',
  'amlou-almond',
  'tadmamte-honey-sidr',
  'tadmamte-amlou-almond',
  'tadmamte-honey-rare-wild'
];

/**
 * Automatically purges all banned/dummy product records from Firestore.
 */
export async function purgeDummyProductsFromFirestore(): Promise<number> {
  if (!isFirebaseConfigured || !db) return 0;
  let deletedCount = 0;
  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    for (const docSnap of snapshot.docs) {
      const id = docSnap.id;
      const data = docSnap.data();
      const isBanned = BANNED_DUMMY_PRODUCT_IDS.includes(id) ||
        (data && (data.isDummy === true || data.isMock === true));
      if (isBanned) {
        try {
          await deleteDoc(doc(db, 'products', id));
          deletedCount++;
        } catch (e) {}
      }
    }
  } catch (err) {
    console.warn('Error during Firestore purge:', err);
  }
  return deletedCount;
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

/**
 * Uploads a hero background image to Storage and returns the permanent URL.
 */
export async function uploadHeroBackgroundImage(
  fileOrBase64: File | string
): Promise<string> {
  if (!fileOrBase64) {
    throw new Error('لم يتم توفير ملف صورة الواجهة.');
  }

  const result = await uploadProductImage('hero_settings', fileOrBase64);
  return result.url;
}

/**
 * Fetches the global hero background URL from Firestore "settings" collection.
 */
export async function fetchHeroBackgroundFromFirestore(): Promise<string | null> {
  if (!isFirebaseConfigured || !db) {
    return null;
  }

  try {
    const { getDoc } = await import('firebase/firestore');
    const docRef = doc(db, 'settings', 'hero_banner');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data?.imageUrl || null;
    }
    return null;
  } catch (error) {
    console.warn('Could not fetch hero background from Firestore:', error);
    return null;
  }
}

/**
 * Saves the global hero background URL to Firestore so all visitors see it.
 */
export async function saveHeroBackgroundToFirestore(imageUrl: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    return;
  }

  try {
    const docRef = doc(db, 'settings', 'hero_banner');
    await setDoc(docRef, {
      imageUrl,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('Hero background URL saved globally to Firestore:', imageUrl);
  } catch (error) {
    console.error('Error saving hero background to Firestore:', error);
    throw error;
  }
}

