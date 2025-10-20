/**
 * Open Graph Image Generation Script
 *
 * Generates OG image (1200x630px) from the Fiesta painting
 * for social media sharing (Facebook, Twitter, LinkedIn, etc.)
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  sourceImage: './public/images/paintings/originals/11_fiesta.jpeg',
  outputPath: './public/images/og-image.jpg',
  width: 1200,
  height: 630,
  quality: 90
};

async function generateOGImage() {
  console.log('🎨 Generating Open Graph Image from Fiesta Painting\n');
  console.log('='.repeat(60) + '\n');

  try {
    // Check source image exists
    await fs.access(CONFIG.sourceImage);
    console.log(`✓ Source image found: ${CONFIG.sourceImage}\n`);

    // Get source image metadata
    const metadata = await sharp(CONFIG.sourceImage).metadata();
    console.log(`Source dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`Target dimensions: ${CONFIG.width}x${CONFIG.height}\n`);

    // Generate OG image (1200x630, cropped to center)
    await sharp(CONFIG.sourceImage)
      .resize(CONFIG.width, CONFIG.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: CONFIG.quality,
        progressive: true
      })
      .toFile(CONFIG.outputPath);

    // Get file size
    const stats = await fs.stat(CONFIG.outputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log('Processing...\n');
    console.log('='.repeat(60));
    console.log('SUCCESS! OG image generated.');
    console.log('='.repeat(60));
    console.log(`\n✓ Created: ${CONFIG.outputPath}`);
    console.log(`✓ Dimensions: ${CONFIG.width}x${CONFIG.height}px`);
    console.log(`✓ File size: ${fileSizeKB} KB`);
    console.log(`✓ Quality: ${CONFIG.quality}%`);
    console.log('\nThis image will appear when your site is shared on:');
    console.log('- Facebook');
    console.log('- Twitter/X');
    console.log('- LinkedIn');
    console.log('- Slack');
    console.log('- WhatsApp');
    console.log('- iMessage');
    console.log('\nNext step: Update Open Graph meta tags in index.html');

  } catch (error) {
    console.error('✗ Fatal error:', error.message);
    process.exit(1);
  }
}

generateOGImage();
