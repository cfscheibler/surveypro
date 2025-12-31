# Panaya Branding Setup

## Current Branding Applied

The application now uses Panaya-branded colors and styling:

### Colors
- **Primary Blue**: `#0066CC` (Panaya Blue)
- **Secondary Blue**: `#00A3E0` (Panaya Light Blue)
- **Accent**: `#FF6B35` (Panaya Orange)
- **Background**: Light theme with `#F5F7FA` background
- **Text**: Dark text (`#1A1A1A`) for readability

### Logo

To add the Panaya logo:

1. **Get the Panaya Logo**
   - Download the Panaya logo SVG or PNG
   - Save it as `panaya-logo.svg` in the `public/` folder

2. **Logo Location**
   - File: `public/panaya-logo.svg`
   - The header will automatically display it
   - If logo not found, it falls back to "Panaya" text

3. **Logo Specifications**
   - Recommended format: SVG (scalable)
   - Recommended size: 150-200px width
   - Color: Should work on light background

## Customizing Branding

### Update Colors

Edit `src/variables.css`:

```css
:root {
  --panaya-primary: #0066CC; /* Change to Panaya's exact blue */
  --panaya-secondary: #00A3E0; /* Change to Panaya's light blue */
  --panaya-accent: #FF6B35; /* Change to Panaya's accent color */
}
```

### Update Fonts

If Panaya uses a specific font:

1. Add font import to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

2. Update `src/variables.css`:
```css
--font-family: 'YourFont', system-ui, sans-serif;
```

### Update Logo

1. Replace `public/panaya-logo.svg` with Panaya's actual logo
2. The header will automatically use it
3. Ensure logo is optimized (SVG preferred)

## Branding Components

- **PanayaHeader**: Displays logo at top of every page
- **Colors**: Applied throughout via CSS variables
- **Light Theme**: Professional light theme matching Panaya's style

## Testing Branding

1. Visit your deployed site
2. Check header shows Panaya logo
3. Verify colors match Panaya brand
4. Test on different pages (home, survey, thank you)

## Need Exact Panaya Colors?

If you have Panaya's exact brand colors, provide them and I'll update:
- Primary color
- Secondary color
- Accent color
- Any other brand colors

