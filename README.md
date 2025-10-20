# Georgie Originals

A minimalist, static website showcasing original paintings by Georgina Roy with an interactive gallery and lightbox feature.

## Design Philosophy

This site embodies a **minimalist aesthetic** that puts the artwork front and center:
- **Monochromatic palette**: Black, white, and gray tones let paintings provide the color
- **Generous white space**: Breathing room that creates a gallery-like atmosphere
- **Clean typography**: Simple sans-serif fonts with subtle letter-spacing
- **Minimal effects**: No shadows, gradients, or decorative elements
- **Subtle interactions**: Opacity changes instead of aggressive animations

The design draws inspiration from contemporary art galleries where the space serves the art, not the other way around.

## Features

- **JSON-Driven Gallery**: All paintings are managed through a simple JSON file
- **Responsive Lightbox**: Full-screen viewing with keyboard and touch navigation
- **Optimized Performance**: Automated image optimization with 88.9% reduction in initial load
- **Lazy Loading**: Gallery loads thumbnails first, full images on-demand
- **Modular JavaScript**: Clean, organized code with separate modules for gallery and lightbox
- **Mobile-Friendly**: Fully responsive design that works on all devices
- **Accessible**: Built with ARIA attributes and keyboard navigation support
- **SEO & Social**: Complete meta tags, favicons, and Open Graph images
- **PWA Ready**: Web app manifest for home screen installation

## Project Structure

```
georgieoriginals.com/
├── css/
│   └── styles.css                 # All styles organized by section
├── js/
│   ├── utils.js                   # Helper functions
│   ├── gallery.js                 # Gallery rendering and management
│   └── lightbox.js                # Lightbox functionality
├── public/
│   ├── data/
│   │   └── paintings.json         # Gallery data
│   └── images/
│       ├── paintings/
│       │   ├── originals/         # Original high-res backups
│       │   ├── thumbs/            # 600px thumbnails for gallery
│       │   └── optimized/         # 1200px images for lightbox
│       ├── favicon*               # Favicon files (7 sizes)
│       ├── og-image.jpg           # Social media share image
│       └── site.webmanifest       # PWA manifest
├── index.html                     # Main HTML file
├── optimize-images.js             # Image optimization script
├── generate-favicon.js            # Favicon generation script
├── generate-og-image.js           # OG image generation script
├── package.json                   # NPM scripts and dependencies
├── vercel.json                    # Vercel deployment config
├── .gitignore                     # Git ignore rules
├── README.md                      # This file
└── claude.md                      # Development session notes
```

## Getting Started

### Prerequisites

- Node.js 18+ (for image optimization scripts)
- npm (comes with Node.js)

### 1. Install Dependencies

```bash
npm install
```

This installs Sharp for image processing.

### 2. Add Your Paintings

1. **Add original images** to `public/images/paintings/` (any size, will be optimized)

2. **Run the optimization script:**
   ```bash
   npm run optimize
   ```
   This automatically creates:
   - `thumbs/` - 600px thumbnails for gallery (fast loading)
   - `optimized/` - 1200px images for lightbox (detail preserved)
   - `originals/` - Backs up your original files

3. **Edit `public/data/paintings.json`** with your painting details:
   ```json
   {
     "id": 1,
     "title": "Painting Title",
     "year": "2024",
     "medium": "Oil on Canvas",
     "dimensions": "24 x 30 inches",
     "thumbnail": "/public/images/paintings/thumbs/painting-1.jpg",
     "image": "/public/images/paintings/optimized/painting-1.jpg",
     "description": "Optional description",
     "available": true
   }
   ```

The optimization script updates `paintings.json` automatically with the correct paths.

### 3. Customize Content

Edit `index.html` to update:
- Site title and description
- About section text
- Contact email address
- Social media links (if desired)

### 4. Customize Styling

Edit `css/styles.css` to modify:
- Color scheme (see CSS variables in `:root`)
- Fonts
- Spacing
- Layout

## Deploy to Vercel via GitHub

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Georgie Originals website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `georgieoriginals.com` (or your preferred name)
3. Don't initialize with README (you already have one)

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/georgieoriginals.com.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "Add New Project"
4. Import your `georgieoriginals.com` repository
5. Vercel will auto-detect settings (no configuration needed)
6. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app` in seconds!

### Step 5: Add Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `georgieoriginals.com`)
4. Follow Vercel's DNS configuration instructions

## Making Updates

After deployment, to update your site:

```bash
# Make your changes to files
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy your site with the changes.

## NPM Scripts

This project includes several helpful scripts:

```bash
npm run optimize      # Optimize all images (creates thumbs + optimized versions)
npm run favicon       # Generate favicon from selected painting
npm run og-image      # Generate Open Graph social sharing image
```

## Image Optimization

### Automated Optimization

The `npm run optimize` script uses Sharp to:
- Create 600px thumbnails (85% quality JPEG)
- Create 1200px optimized full-size (90% quality JPEG)
- Back up originals to `originals/` folder
- Update `paintings.json` with new paths

**Results:**
- 88.9% reduction in initial gallery load
- Gallery loads thumbnails first (~1.88 MB total)
- Lightbox loads full images on-demand (~6.54 MB total)

### Manual Optimization Tips

1. **Format**: Use JPEG for photographs/paintings, PNG for graphics with transparency
2. **Size**:
   - Full images: Max 2000px on longest side
   - Thumbnails: 400-600px on longest side
3. **Compression**: Use tools like [TinyPNG](https://tinypng.com) to reduce file size
4. **Naming**: Use descriptive, URL-friendly names (e.g., `sunset-landscape.jpg`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus trap in lightbox
- Alt text for all images
- Reduced motion support

## Performance Features

- Lazy loading images
- Minimal dependencies (no frameworks)
- Optimized CSS
- Cache headers configured in `vercel.json`

## Customization Examples

### Change Color Scheme

The current design uses a **minimalist monochromatic palette**. Edit CSS variables in `css/styles.css`:

```css
:root {
  /* Current minimalist palette */
  --color-primary: #000;        /* Pure black for text and borders */
  --color-secondary: #333;      /* Dark gray */
  --color-accent: #666;         /* Medium gray for secondary text */
  --color-text: #000;           /* Primary text color */
  --color-text-light: #666;     /* Secondary text color */
  --color-bg: #fff;             /* White background */
  --color-bg-light: #fafafa;    /* Off-white for subtle sections */
  --color-border: #e8e8e8;      /* Light gray borders */
}
```

**Note**: The minimalist design intentionally uses black/white/gray to let the artwork provide all the color. Consider this philosophy before adding colorful accents.

### Add Social Media Links

In `index.html`, add to the footer:

```html
<div class="social-links">
  <a href="https://instagram.com/yourhandle">Instagram</a>
  <a href="https://facebook.com/yourpage">Facebook</a>
</div>
```

### Add Google Analytics

Add before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Troubleshooting

### Images not loading
- Check file paths in `paintings.json` are correct
- Ensure images are in `public/images/paintings/` directory
- Verify image file extensions match exactly (case-sensitive)

### Gallery not displaying
- Open browser console (F12) to check for errors
- Verify `paintings.json` is valid JSON (use [JSONLint](https://jsonlint.com))
- Check that all JavaScript files are loading correctly

### Deployment issues
- Ensure all files are committed to Git
- Check Vercel build logs for errors
- Verify `vercel.json` is in the root directory

## License

All rights reserved. The code structure may be used as a template, but the artwork and content are copyrighted.

## Support

For issues or questions, contact: aaron@aaronroy.com

## Session Documentation

For detailed development notes, technical decisions, and session history, see [claude.md](claude.md).
