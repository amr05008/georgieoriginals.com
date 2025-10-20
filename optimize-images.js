/**
 * Image Optimization Script for Georgie Originals
 *
 * This script:
 * 1. Creates backups of original images
 * 2. Generates optimized thumbnails (600px wide) for gallery grid
 * 3. Generates optimized full-size images (1200px wide) for lightbox
 * 4. Provides before/after size comparison report
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: './public/images/paintings',
  outputDirs: {
    originals: './public/images/paintings/originals',
    thumbnails: './public/images/paintings/thumbs',
    optimized: './public/images/paintings/optimized'
  },
  thumbnailWidth: 600,      // Width for gallery grid
  fullSizeWidth: 1200,      // Width for lightbox view
  thumbnailQuality: 85,     // JPEG quality for thumbnails
  fullSizeQuality: 90,      // JPEG quality for full-size images
};

// Helper: Format bytes to human-readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper: Get file size
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

// Create necessary directories
async function createDirectories() {
  for (const dir of Object.values(CONFIG.outputDirs)) {
    await fs.mkdir(dir, { recursive: true });
  }
  console.log('✓ Created output directories\n');
}

// Process a single image
async function processImage(filename) {
  const inputPath = path.join(CONFIG.inputDir, filename);
  const originalPath = path.join(CONFIG.outputDirs.originals, filename);
  const thumbPath = path.join(CONFIG.outputDirs.thumbnails, filename);
  const optimizedPath = path.join(CONFIG.outputDirs.optimized, filename);

  try {
    // Get original size
    const originalSize = await getFileSize(inputPath);

    // Move original to backup folder
    await fs.copyFile(inputPath, originalPath);

    // Generate thumbnail (600px wide, 85% quality)
    await sharp(inputPath)
      .resize(CONFIG.thumbnailWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: CONFIG.thumbnailQuality, progressive: true })
      .toFile(thumbPath);

    // Generate optimized full-size (1200px wide, 90% quality)
    await sharp(inputPath)
      .resize(CONFIG.fullSizeWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: CONFIG.fullSizeQuality, progressive: true })
      .toFile(optimizedPath);

    // Get new sizes
    const thumbSize = await getFileSize(thumbPath);
    const optimizedSize = await getFileSize(optimizedPath);

    // Calculate savings
    const thumbSavings = ((1 - thumbSize / originalSize) * 100).toFixed(1);
    const optimizedSavings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    return {
      filename,
      original: originalSize,
      thumbnail: thumbSize,
      optimized: optimizedSize,
      thumbSavings,
      optimizedSavings
    };
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return null;
  }
}

// Main execution
async function main() {
  console.log('🎨 Georgie Originals - Image Optimization\n');
  console.log('='.repeat(80) + '\n');

  try {
    // Create directories
    await createDirectories();

    // Get all JPEG files
    const files = await fs.readdir(CONFIG.inputDir);
    const imageFiles = files.filter(file =>
      /\.(jpe?g|png)$/i.test(file) && !file.startsWith('.')
    );

    console.log(`Found ${imageFiles.length} images to process\n`);
    console.log('Processing images...\n');

    // Process all images in parallel
    const results = await Promise.all(
      imageFiles.map(file => processImage(file))
    );

    // Filter out failed results
    const successfulResults = results.filter(r => r !== null);

    // Generate report
    console.log('\n' + '='.repeat(80));
    console.log('OPTIMIZATION REPORT');
    console.log('='.repeat(80) + '\n');

    let totalOriginal = 0;
    let totalThumbs = 0;
    let totalOptimized = 0;

    console.log('File                              Original    Thumbnail   Optimized   Savings');
    console.log('-'.repeat(80));

    successfulResults.forEach(result => {
      totalOriginal += result.original;
      totalThumbs += result.thumbnail;
      totalOptimized += result.optimized;

      const name = result.filename.padEnd(32);
      const orig = formatBytes(result.original).padStart(10);
      const thumb = formatBytes(result.thumbnail).padStart(10);
      const opt = formatBytes(result.optimized).padStart(10);
      const savings = `${result.optimizedSavings}%`.padStart(8);

      console.log(`${name} ${orig}  ${thumb}  ${opt}  ${savings}`);
    });

    console.log('-'.repeat(80));

    const totalThumbSavings = ((1 - totalThumbs / totalOriginal) * 100).toFixed(1);
    const totalOptimizedSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

    console.log(`${'TOTAL'.padEnd(32)} ${formatBytes(totalOriginal).padStart(10)}  ${formatBytes(totalThumbs).padStart(10)}  ${formatBytes(totalOptimized).padStart(10)}  ${totalOptimizedSavings.padStart(7)}%`);

    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Original total size:    ${formatBytes(totalOriginal)}`);
    console.log(`Thumbnail total:        ${formatBytes(totalThumbs)} (${totalThumbSavings}% reduction)`);
    console.log(`Optimized total:        ${formatBytes(totalOptimized)} (${totalOptimizedSavings}% reduction)`);
    console.log(`\nGallery initial load:   ${formatBytes(totalThumbs)} (thumbnails only)`);
    console.log(`Full gallery size:      ${formatBytes(totalThumbs + totalOptimized)} (if all lightboxes opened)`);
    console.log(`\n✓ Images optimized successfully!`);
    console.log(`\nOriginal images backed up to: ${CONFIG.outputDirs.originals}`);
    console.log(`Thumbnails created in: ${CONFIG.outputDirs.thumbnails}`);
    console.log(`Optimized images in: ${CONFIG.outputDirs.optimized}`);

  } catch (error) {
    console.error('✗ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
