# Cedar Hill Retreat Center Website

A modern, responsive website for Cedar Hill Retreat Center built as a single-page application.

## Quick Start

1. **View the site**: Open `index.html` in a modern web browser
2. **Edit content**: Modify page handlers in `js/app.js` for content updates
3. **Deploy**: Push changes to the main branch for automatic GitHub Pages deployment

## Content Management

### Editing Pages

All page content is hardcoded in the JavaScript page handlers in `js/app.js`:

- `loadHomePage()` - Homepage content with hero section and cards
- `loadAboutPage()` - About Us page content
- `loadHistoryPage()` - Cedar Hill history with special Rosamund portrait layout
- `loadRatesPage()` - Pricing and rates information
- `loadAccommodationsPage()` - Room and facility details
- `loadContactPage()` - Contact information and form

### How to Update Content

1. **Edit JavaScript**: Modify the appropriate page handler method in `js/app.js`
2. **Update HTML**: Change the content within the template strings
3. **Test Changes**: Refresh the page to see your updates
4. **Maintain Layout**: Follow existing HTML structure and CSS classes for consistency

### Content Structure

Content is structured using HTML within JavaScript template literals:

```javascript
const content = `
    <section class="section">
        <div class="section-title">
            <h2>Page Title</h2>
            <p>Page description</p>
        </div>
        <div class="card">
            <h3>Card Title</h3>
            <p>Card content</p>
        </div>
    </section>
`;
```

### Layout Features

- **Card Layouts**: Content is organized in professional card layouts
- **Grid Systems**: Responsive grid layouts for multiple columns
- **Special Sections**: Custom layouts like Rosamund's portrait in the history page

## Technical Details

### Architecture
- **Single Page Application**: All content loads dynamically without page refreshes
- **Hash-based Routing**: URLs like `#/about` navigate between pages
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern CSS**: Clean, professional styling with a nature-inspired color palette

### File Structure
```
├── index.html              # Main application entry point
├── css/styles.css         # Modern styling and design system
├── js/                    # JavaScript application files
├── content/               # Legacy markdown files (not used)
├── Images/                # Organized photo galleries
│   ├── Banner/          # Hero images for homepage
│   ├── Bedrooms/        # Accommodation photos
│   ├── CommonAreas/     # Kitchen, dining, living areas
│   ├── Nature/          # Outdoor and wildlife photos
│   ├── Winter/          # Seasonal winter scenes
│   ├── Historical/      # Historical photos and portraits
│   └── Legacy/          # Technical legacy assets
└── README.md              # This file
```

### Color Scheme
- **Primary Green**: Deep forest green (#2d5016)
- **Secondary Blue**: Ocean blue (#1e3a8a)
- **Accent Sage**: Natural sage green (#87a96b)
- **Neutral Tones**: Warm whites and stone grays

### Button Styles
- **`.btn-primary`**: Solid green button for primary actions
- **`.btn-outline`**: Green outline button for secondary actions on light backgrounds
- **`.btn-secondary`**: White outline button for use on dark backgrounds (hero sections)

## Features

- ✅ Responsive mobile-first design
- ✅ Fast client-side navigation
- ✅ Image gallery with lightbox
- ✅ Contact form
- ✅ Direct content editing in JavaScript
- ✅ Modern, professional appearance
- ✅ Optimized for search engines
- ✅ GitHub Pages deployment

## Development

### Adding New Pages
1. Add a new page handler method in `js/app.js`
2. Add a new route that calls your handler
3. Add a navigation link in `index.html`

### Customizing Styles
Edit `css/styles.css` and use the CSS custom properties (variables) for consistent theming.

### Local Development
Open `index.html` directly in a web browser, or use a local server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Support

For technical questions about the website, refer to the `CLAUDE.md` file for detailed development guidance.