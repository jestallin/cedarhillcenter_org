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
        return hash.slice(2); // Remove '#/' prefix
    }

    async handleRouteChange() {
        const path = this.getCurrentPath();
        const handler = this.routes.get(path) || this.routes.get('404');
        
        if (handler) {
            this.currentRoute = path;
            this.updateActiveNavLink(path);
            
            try {
                await handler();
            } catch (error) {
                console.error('Route handler error:', error);
                this.showError('Failed to load page content');
            }
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

    async loadContent(path) {
        this.showLoading();
        
        try {
            const response = await fetch(`content/${path}.md`);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status}`);
            }
            const markdown = await response.text();
            return window.markdownParser.parse(markdown);
        } catch (error) {
            console.error('Content loading error:', error);
            throw error;
        }
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