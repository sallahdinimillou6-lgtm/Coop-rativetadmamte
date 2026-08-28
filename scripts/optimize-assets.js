import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src/assets/images');
const publicDir = path.join(process.cwd(), 'public/assets/images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const mappings = [
  {
    src: 'souss_hero_bg_1786323595781.jpg',
    targetBase: 'souss_hero_bg',
    maxWidth: 1920,
    quality: 82
  },
  {
    src: 'cooperative_hands_1786323608092.jpg',
    targetBase: 'cooperative_hands_craft',
    maxWidth: 1200,
    quality: 80
  },
  {
    src: 'premium_honey_jar_1786323619526.jpg',
    targetBase: 'premium_honey_jar',
    maxWidth: 800,
    quality: 80
  },
  {
    src: 'traditional_amlou_jar_1786323629868.jpg',
    targetBase: 'traditional_amlou_jar',
    maxWidth: 800,
    quality: 80
  }
];

async function optimizeAssets() {
  console.log('--- Starting Image Optimization with Sharp ---');

  for (const item of mappings) {
    const srcPath = path.join(srcDir, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    const webpPath = path.join(publicDir, `${item.targetBase}.webp`);
    const jpgPath = path.join(publicDir, `${item.targetBase}.jpg`);

    // Generate optimized WebP
    await sharp(srcPath)
      .resize({ width: item.maxWidth, withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 6 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    console.log(`✅ ${item.targetBase}.webp -> ${(webpStat.size / 1024).toFixed(1)} KB`);

    // Generate optimized JPG fallback
    await sharp(srcPath)
      .resize({ width: item.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: item.quality, progressive: true, mozjpeg: true })
      .toFile(jpgPath);

    const jpgStat = fs.statSync(jpgPath);
    console.log(`✅ ${item.targetBase}.jpg -> ${(jpgStat.size / 1024).toFixed(1)} KB`);
  }

  // Also clean up old uncompressed files in public/assets/images
  const oldFiles = fs.readdirSync(publicDir);
  for (const oldFile of oldFiles) {
    if (oldFile.includes('1784596') || oldFile.includes('1784607')) {
      fs.unlinkSync(path.join(publicDir, oldFile));
      console.log(`🗑️ Removed old uncompressed file: ${oldFile}`);
    }
  }

  console.log('--- Image Optimization Completed Successfully ---');
}

optimizeAssets().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
