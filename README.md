# Georgie Originals

A modern, static website showcasing original paintings with an interactive gallery and lightbox feature.

## Features

- **JSON-Driven Gallery**: All paintings are managed through a simple JSON file
- **Responsive Lightbox**: Full-screen viewing with keyboard and touch navigation
- **Modular JavaScript**: Clean, organized code with separate modules for gallery and lightbox
- **Mobile-Friendly**: Fully responsive design that works on all devices
- **Accessible**: Built with ARIA attributes and keyboard navigation support
- **Fast Loading**: Optimized images with lazy loading
- **SEO Ready**: Semantic HTML with proper meta tags

## Project Structure

```
georgieoriginals.com/
├── css/
│   └── styles.css          # All styles organized by section
├── js/
│   ├── utils.js            # Helper functions
│   ├── gallery.js          # Gallery rendering and management
│   └── lightbox.js         # Lightbox functionality
├── public/
│   ├── data/
│   │   └── paintings.json  # Gallery data
│   └── images/
│       └── paintings/      # Painting images
├── index.html              # Main HTML file
├── vercel.json            # Vercel configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Getting Started

### 1. Add Your Paintings

Edit `public/data/paintings.json` to add your painting details:

```json
{
  "id": 1,
  "title": "Painting Title",
  "year": "2024",
  "medium": "Oil on Canvas",
  "dimensions": "24 x 30 inches",
  "image": "/public/images/paintings/painting-1.jpg",
  "thumbnail": "/public/images/paintings/painting-1-thumb.jpg",
  "description": "Optional description",
  "available": true
}
```

### 2. Add Your Images

1. Place your painting images in `public/images/paintings/`
2. Recommended: Create thumbnails (smaller versions) for faster gallery loading
3. Update the paths in `paintings.json` to match your image filenames

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

## Image Optimization Tips

1. **Format**: Use JPEG for photographs/paintings, PNG for graphics
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

Edit CSS variables in `css/styles.css`:

```css
:root {
  --color-primary: #2c3e50;    /* Header/footer background */
  --color-secondary: #e74c3c;  /* Buttons and accents */
  --color-accent: #3498db;     /* Links and highlights */
}
```

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

For issues or questions, contact: hello@georgieoriginals.com
