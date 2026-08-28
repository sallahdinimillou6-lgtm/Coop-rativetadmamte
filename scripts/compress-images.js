import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public/assets/images');

async function processImages() {
  const files = fs.readdirSync(imagesDir);
  console.log('Found files:', files);

  for (const file of files) {
    if (file.endsWith('.webp')) continue; // Skip webp
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) continue;

    const ext = path.extname(file);
    const nameWithoutExt = path.basename(file, ext);

    console.log(`Processing ${file} (Original size: ${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

    // Create compressed WebP version
    const webpPath = path.join(imagesDir, `${nameWithoutExt}.webp`);
    await sharp(filePath)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath + '.tmp');

    fs.renameSync(webpPath + '.tmp', webpPath);
    const webpStat = fs.statSync(webpPath);
    console.log(`  -> WebP created: ${(webpStat.size / 1024).toFixed(1)} KB`);

    // Create optimized JPG version
    const jpgTempPath = path.join(imagesDir, `${nameWithoutExt}_opt.jpg`);
    await sharp(filePath)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(jpgTempPath);

    fs.renameSync(jpgTempPath, filePath);
    const newJpgStat = fs.statSync(filePath);
    console.log(`  -> JPG optimized: ${(newJpgStat.size / 1024).toFixed(1)} KB`);
  }
}

processImages().catch(console.error);
