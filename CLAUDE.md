# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern single-page application (SPA) for Cedar Hill Center, a non-denominational retreat center. The website has been completely refactored from legacy ASP.NET Web Forms into a maintainable, modern architecture.

**Domain**: cedarhillcenter.org (configured via CNAME file)
**Hosting**: GitHub Pages
**Technology**: Modern HTML5/CSS3/JavaScript SPA with hash-based routing

## Modern Architecture

### Single Page Application Structure
- `index.html` - Main SPA entry point with navigation and content container
- Hash-based client-side routing (`#/about`, `#/rates`, etc.)
- Dynamic content loading with JavaScript
- Responsive design with mobile-first approach

### Directory Structure
```
├── index.html              # Main SPA entry point
├── css/
│   └── styles.css         # Modern CSS design system
├── js/
│   ├── app.js            # Main application logic and page handlers
│   ├── router.js         # Client-side routing system
│   └── markdown-parser.js # Markdown to HTML conversion
├── content/               # Markdown content files
│   ├── home.md
│   ├── about.md
│   ├── history.md
│   ├── rates.md
│   ├── accommodations.md
│   └── contact.md
├── Images/               # Organized image assets
│   ├── Banner/          # Hero/banner images
│   ├── Bedrooms/        # Bedroom photos
│   ├── CommonAreas/     # Kitchen, living, dining room photos
│   ├── Nature/          # Outdoor, wildlife, and nature photos
│   ├── Winter/          # Seasonal winter photos
│   ├── Historical/      # Historical photos and portraits
│   └── Legacy/          # Legacy technical assets
├── css/                 # Image assets
└── CNAME                # Domain configuration
```

### Content Management
- **Dynamic Markdown Loading**: All page content loaded from `/content/` directory at runtime
- **Real-time Updates**: Edit markdown files and refresh to see changes immediately
- **No Build Process**: Content is fetched and parsed dynamically in the browser
- **Special Layouts**: Automatic detection of special sections (e.g., Rosamund's portrait layout)

### Design System

**Modern Color Palette**:
- Primary Green: `#2d5016` (Deep forest green)
- Primary Green Light: `#4a7c25`
- Secondary Blue: `#1e3a8a` (Deep ocean blue) 
- Secondary Blue Light: `#3b82f6`
- Accent Sage: `#87a96b`
- Neutral colors for backgrounds and text

**Typography**: Inter font family for modern, readable text
**Responsive**: Mobile-first design with CSS Grid and Flexbox
**Components**: Reusable card, button, and layout components

## Development Workflow

### Adding New Pages
1. Create new `.md` file in `/content/` directory
2. Add route in `js/app.js` setupRoutes() method
3. Add navigation link in `index.html` nav section
4. Implement page handler method in CedarHillApp class

### Editing Content
1. Edit the appropriate `.md` file in `/content/` directory
2. Use standard markdown syntax for formatting
3. Changes are reflected immediately when page loads

### Styling Changes
1. Edit `css/styles.css` using CSS custom properties (variables)
2. Follow existing design system patterns
3. Use responsive design principles

### JavaScript Functionality
- **Router**: Handles hash-based navigation and page loading
- **Markdown Parser**: Converts markdown to HTML with styling
- **App**: Main application logic, page handlers, and UI interactions
- **Mobile Menu**: Responsive navigation for mobile devices
- **Image Lightbox**: Gallery functionality for photo viewing
- **Contact Form**: Client-side form handling (displays contact info)

## Key Features

### Modern Navigation
- Clean, responsive navigation bar
- Mobile hamburger menu
- Active page highlighting
- Smooth hash-based routing

### Content Features
- Hero sections with background images
- Card-based layouts for content organization
- Responsive image galleries with lightbox
- Contact form with validation
- Modern typography and spacing

### Performance Optimizations
- Lightweight vanilla JavaScript (no jQuery dependency)
- CSS custom properties for consistent theming
- Optimized images and lazy loading
- Minimal external dependencies

## Deployment

The site deploys automatically to GitHub Pages:
- CNAME file points to cedarhillcenter.org
- All assets use relative paths
- No build process required
- Changes go live immediately upon push to main branch

### Testing Locally
1. Open `index.html` in a modern web browser
2. Use browser developer tools to test responsive design
3. Test all navigation links and functionality
4. Verify content renders correctly from markdown files

## Legacy Files (Archived)

The following legacy files are preserved but no longer used:
- `*.html` files (old static page structure) - renamed from `.aspx.html`
- `basicimg/` directory (old styling and assets)
- `jwplayer/` directory (old media player)
- Old JavaScript files in root directory

These can be safely removed if desired, but are kept for reference.