import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable large JSON and URL-encoded payloads for image uploads (e.g., base64 or high-res photos)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global No-Cache headers for all API routes to prevent stale client caching across devices
app.use('/api', (req: Request, res: Response, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Directories
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded assets and public assets
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

// Helper: read/write products
function getStoredProducts(): any[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const content = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading products.json:', err);
  }
  return [];
}

function saveStoredProducts(products: any[]) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing products.json:', err);
  }
}

// Helper: read/write settings
function getStoredSettings(): Record<string, any> {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading settings.json:', err);
  }
  return {
    heroBackground: '/images/hero-background-v2.webp',
    lastUpdated: new Date().toISOString()
  };
}

function saveStoredSettings(settings: Record<string, any>) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing settings.json:', err);
  }
}

// ================= API ROUTES =================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all products
app.get('/api/products', (req: Request, res: Response) => {
  const products = getStoredProducts();
  res.json({ success: true, count: products.length, products });
});

// POST single product (create or update)
app.post('/api/products', (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (!product || !product.id || !product.name) {
      res.status(400).json({ success: false, error: 'بيانات المنتج غير مكتملة' });
      return;
    }

    const currentProducts = getStoredProducts();
    const existingIndex = currentProducts.findIndex((p) => p.id === product.id);

    if (existingIndex >= 0) {
      currentProducts[existingIndex] = { ...currentProducts[existingIndex], ...product, updatedAt: new Date().toISOString() };
    } else {
      currentProducts.unshift({ ...product, createdAt: new Date().toISOString() });
    }

    saveStoredProducts(currentProducts);
    res.json({ success: true, product, total: currentProducts.length });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT single product
app.put('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const currentProducts = getStoredProducts();
    const existingIndex = currentProducts.findIndex((p) => p.id === id);

    if (existingIndex >= 0) {
      currentProducts[existingIndex] = { ...currentProducts[existingIndex], ...updatedData, id, updatedAt: new Date().toISOString() };
      saveStoredProducts(currentProducts);
      res.json({ success: true, product: currentProducts[existingIndex] });
    } else {
      // Create if not found
      currentProducts.unshift({ ...updatedData, id, createdAt: new Date().toISOString() });
      saveStoredProducts(currentProducts);
      res.json({ success: true, product: currentProducts[0] });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE single product
app.delete('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let currentProducts = getStoredProducts();
    currentProducts = currentProducts.filter((p) => p.id !== id);
    saveStoredProducts(currentProducts);
    res.json({ success: true, message: 'Product deleted', total: currentProducts.length });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST batch products (Sync all phone products directly to server)
app.post('/api/products/batch', (req: Request, res: Response) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products)) {
      res.status(400).json({ success: false, error: 'Invalid products array' });
      return;
    }

    saveStoredProducts(products);
    res.json({ success: true, count: products.length, message: 'Synced successfully to central server' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Upload Image (Base64 or Binary)
app.post('/api/upload', (req: Request, res: Response) => {
  try {
    const { image, name, filename } = req.body;
    if (!image) {
      res.status(400).json({ success: false, error: 'No image data provided' });
      return;
    }

    let fileBuffer: Buffer;
    let ext = 'jpg';

    if (image.startsWith('data:image/')) {
      const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (matches) {
        ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        fileBuffer = Buffer.from(matches[2], 'base64');
      } else {
        fileBuffer = Buffer.from(image, 'base64');
      }
    } else {
      fileBuffer = Buffer.from(image, 'base64');
    }

    const safeName = (filename || name || 'photo')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueFileName = `${safeName}_${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueFileName);

    fs.writeFileSync(filePath, fileBuffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    res.json({ success: true, url: publicUrl, filename: uniqueFileName });
  } catch (err: any) {
    console.error('Error in /api/upload:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET / POST Hero background
app.get('/api/hero-background', (req: Request, res: Response) => {
  const settings = getStoredSettings();
  res.json({ success: true, heroBackground: settings.heroBackground || '/images/hero-background-v2.webp' });
});

app.post('/api/hero-background', (req: Request, res: Response) => {
  try {
    const { heroBackground } = req.body;
    if (!heroBackground) {
      res.status(400).json({ success: false, error: 'No hero background provided' });
      return;
    }

    const settings = getStoredSettings();
    settings.heroBackground = heroBackground;
    settings.lastUpdated = new Date().toISOString();
    saveStoredSettings(settings);

    res.json({ success: true, heroBackground });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= VITE / STATIC SERVING =================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Coopérative Tadmamte Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
