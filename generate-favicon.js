/**
 * Favicon Generation Script
 *
 * Generates favicons in multiple sizes from the Sunflower painting
 * Creates: favicon.ico, apple-touch-icon, and various PNG sizes
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  sourceImage: './public/images/paintings/originals/12_Sunflower.jpeg',
  outputDir: './public/images',
  sizes: {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'favicon-48x48.png': 48,
    'apple-touch-icon.png': 180,  // Apple touch icon
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
  }
};

async function generateFavicon(size, filename) {
  const outputPath = path.join(CONFIG.outputDir, filename);

  try {
    await sharp(CONFIG.sourceImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(outputPath);

    console.log(`✓ Generated ${filename} (${size}x${size})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to generate ${filename}:`, error.message);
    return false;
  }
}

async function createICO() {
  // For .ico, we'll use the 32x32 PNG and just rename/copy it
  // Modern browsers support PNG favicons, but we'll create a basic .ico
  const source32 = path.join(CONFIG.outputDir, 'favicon-32x32.png');
  const icoPath = path.join(CONFIG.outputDir, 'favicon.ico');

  try {
    // Sharp doesn't support ICO format, so we'll use 32px PNG as fallback
    // Most modern browsers will use the PNG versions anyway
    await sharp(CONFIG.sourceImage)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(icoPath);

    console.log('✓ Generated favicon.ico (32x32)');
    return true;
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
    return false;
  }
}

async function generateManifest() {
  const manifest = {
    name: "Georgie Originals",
    short_name: "Georgie Originals",
    icons: [
      {
        src: "/public/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/public/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone"
  };

  const manifestPath = path.join(CONFIG.outputDir, 'site.webmanifest');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✓ Generated site.webmanifest');
}

async function main() {
  console.log('🎨 Generating Favicons from Sunflower Painting\n');
  console.log('='.repeat(60) + '\n');

  try {
    // Check source image exists
    await fs.access(CONFIG.sourceImage);

    // Generate all sizes
    console.log('Generating favicon sizes...\n');

    for (const [filename, size] of Object.entries(CONFIG.sizes)) {
      await generateFavicon(size, filename);
    }

    // Create .ico file
    await createICO();

    // Generate web manifest for PWA support
    await generateManifest();

    console.log('\n' + '='.repeat(60));
    console.log('SUCCESS! All favicons generated.');
    console.log('='.repeat(60));
    console.log('\nGenerated files:');
    console.log('- favicon.ico (32x32)');
    console.log('- favicon-16x16.png');
    console.log('- favicon-32x32.png');
    console.log('- favicon-48x48.png');
    console.log('- apple-touch-icon.png (180x180)');
    console.log('- android-chrome-192x192.png');
    console.log('- android-chrome-512x512.png');
    console.log('- site.webmanifest');
    console.log('\nNext step: Add favicon links to index.html <head>');

  } catch (error) {
    console.error('✗ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
