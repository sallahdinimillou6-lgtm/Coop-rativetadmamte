import { Product } from '../types';

/**
 * Client-Side API Helper to connect with the central backend server.
 * Ensures all products and images added from mobile or desktop are shared
 * globally with all visitors and customers in real-time.
 */

export async function fetchServerProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`/api/products?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
      return data.products;
    }
  } catch (err) {
    console.warn('Could not fetch products from server API:', err);
  }
  return null;
}

export async function saveServerProduct(product: Product): Promise<boolean> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return !!(data && data.success);
  } catch (err) {
    console.error('Error saving product to server API:', err);
    return false;
  }
}

export async function deleteServerProduct(productId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    return !!(data && data.success);
  } catch (err) {
    console.error('Error deleting product from server API:', err);
    return false;
  }
}

export async function syncAllProductsToServer(products: Product[]): Promise<boolean> {
  try {
    const res = await fetch('/api/products/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    });
    const data = await res.json();
    return !!(data && data.success);
  } catch (err) {
    console.error('Error batch syncing products to server:', err);
    return false;
  }
}

export async function uploadImageToServer(
  fileOrBase64: File | string,
  filename?: string
): Promise<string> {
  let base64String = '';
  if (fileOrBase64 instanceof File) {
    base64String = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrBase64);
    });
  } else {
    base64String = fileOrBase64;
  }

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64String,
        filename: filename || 'product_photo'
      }),
    });
    const data = await res.json();
    if (data && data.success && data.url) {
      return data.url;
    }
  } catch (err) {
    console.warn('Server upload failed, falling back to base64 data:', err);
  }

  // Fallback to data URL directly
  return base64String;
}

export async function fetchServerHeroBackground(): Promise<string | null> {
  try {
    const res = await fetch(`/api/hero-background?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.success && data.heroBackground) {
      return data.heroBackground;
    }
  } catch (err) {
    console.warn('Could not fetch server hero background:', err);
  }
  return null;
}

export async function saveServerHeroBackground(heroBackground: string): Promise<boolean> {
  try {
    const res = await fetch('/api/hero-background', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ heroBackground }),
    });
    const data = await res.json();
    return !!(data && data.success);
  } catch (err) {
    console.error('Error saving hero background to server:', err);
    return false;
  }
}
