/**
 * Simple Client-Side Router for Cedar Hill Retreat Center
 * Handles navigation and page loading with hash-based routing
 */

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRouteChange());
        window.addEventListener('load', () => this.handleRouteChange());
        
        // Handle navigation link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-page]');
            if (link) {
                e.preventDefault();
                this.navigate(link.dataset.page);
            }
        });
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    navigate(path) {
        window.location.hash = path === 'home' ? '' : `/${path}`;
    }

    getCurrentPath() {
        const hash = window.location.hash;
        if (!hash || hash === '#' || hash === '#/') {
            return 'home';
        }
        // Extract route part (before any query parameters)
        const routePart = hash.split('?')[0];
        return routePart.slice(2); // Remove '#/' prefix
    }

    getAnchorFragment() {
        const hash = window.location.hash;
        // Check for query parameter 'anchor'
        const urlParams = new URLSearchParams(hash.split('?')[1] || '');
        return urlParams.get('anchor');
    }

    async handleRouteChange() {
        const path = this.getCurrentPath();
        const handler = this.routes.get(path) || this.routes.get('404');
        
        if (handler) {
            this.currentRoute = path;
            this.updateActiveNavLink(path);
            
            try {
                await handler();
                // After content is rendered, scroll to anchor if present
                this.scrollToAnchor();
            } catch (error) {
                console.error('Route handler error:', error);
                this.showError('Failed to load page content');
            }
        }
    }

    scrollToAnchor() {
        const anchor = this.getAnchorFragment();
        if (anchor) {
            // Small delay to ensure content is rendered
            setTimeout(() => {
                const element = document.getElementById(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    updateActiveNavLink(currentPath) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav link
        const activeLink = document.querySelector(`[data-page="${currentPath}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    showLoading() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="container">
                <div class="loading">
                    <div class="spinner"></div>
                </div>
            </div>
        `;
    }

    showError(message) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="container">
                <div class="card text-center">
                    <h2>Oops! Something went wrong</h2>
                    <p>${message}</p>
                    <a href="#/" class="btn btn-primary">Return Home</a>
                </div>
            </div>
        `;
    }

    renderContent(html, containerClass = 'container') {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="${containerClass}">
                ${html}
            </div>
        `;
    }
}

// Export for use in app.js
window.Router = Router;