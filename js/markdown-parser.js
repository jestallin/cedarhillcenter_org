/**
 * Simple Markdown Parser for Cedar Hill Retreat Center
 * Converts markdown content to HTML with basic syntax support
 */

class MarkdownParser {
    constructor() {
        this.rules = [
            // Headers
            { pattern: /^### (.*$)/gm, replacement: '<h3>$1</h3>' },
            { pattern: /^## (.*$)/gm, replacement: '<h2>$1</h2>' },
            { pattern: /^# (.*$)/gm, replacement: '<h1>$1</h1>' },
            
            // Bold and italic
            { pattern: /\*\*\*(.*?)\*\*\*/g, replacement: '<strong><em>$1</em></strong>' },
            { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
            { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
            
            // Links
            { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2">$1</a>' },
            
            // Images
            { pattern: /!\[([^\]]*)\]\(([^)]+)\)/g, replacement: '<img src="$2" alt="$1" />' },
            
            // Lists
            { pattern: /^\* (.+)$/gm, replacement: '<li>$1</li>' },
            { pattern: /^\d+\. (.+)$/gm, replacement: '<li>$1</li>' },
            
            // Line breaks
            { pattern: /\n\n/g, replacement: '</p><p>' },
            { pattern: /\n/g, replacement: '<br>' }
        ];
    }

    parse(markdown) {
        if (!markdown) return '';
        
        let html = markdown;
        
        // Handle special portrait section for Rosamund Allen
        html = html.replace(
            /## Rosamund's Vision\s*([\s\S]*?)(?=## |$)/,
            (match, content) => {
                if (content.includes('Rosamund Allen')) {
                    return `
                        <div class="card">
                            <h3>Rosamund's Vision</h3>
                            <div class="grid grid-2" style="align-items: center;">
                                <div>
                                    ${this.parseBasicMarkdown(content)}
                                </div>
                                <div class="text-center">
                                    <img src="Images/Historical/roseamund allen.jpg" alt="Rosamund Allen Portrait" style="max-width: 250px; width: 100%; border-radius: 8px; box-shadow: var(--shadow-md);">
                                    <p class="mt-4"><strong>Rosamund Allen</strong></p>
                                    <p style="font-size: 0.9rem; color: var(--neutral-stone); margin-top: 0.5rem;">Miss Allen's photograph hangs on the dining room wall in the Cedar Hill Retreat Center.</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                return match;
            }
        );
        
        // Apply all transformation rules
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // Wrap in paragraphs if not already wrapped
        if (!html.startsWith('<')) {
            html = `<p>${html}</p>`;
        }
        
        // Fix nested list items
        html = html.replace(/(<li>.*?<\/li>)/gs, (match) => {
            return match.replace(/<br>/g, ' ');
        });
        
        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>');
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>\s*<\/p>/g, '');
        
        return html;
    }

    // Helper method for basic markdown parsing without special layouts
    parseBasicMarkdown(markdown) {
        let html = markdown;
        
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        return html;
    }

    // Helper method to create hero sections
    createHeroSection(title, subtitle, backgroundImage = null) {
        const imageHtml = backgroundImage 
            ? `<img src="${backgroundImage}" alt="${title}" class="hero-background">`
            : '';
        
        return `
            <section class="hero">
                ${imageHtml}
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1>${title}</h1>
                    ${subtitle ? `<p>${subtitle}</p>` : ''}
                </div>
            </section>
        `;
    }

    // Helper method to create card layouts
    createCard(title, content, imageUrl = null) {
        const imageHtml = imageUrl 
            ? `<img src="${imageUrl}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">`
            : '';
        
        return `
            <div class="card">
                ${imageHtml}
                <h3>${title}</h3>
                <div>${this.parse(content)}</div>
            </div>
        `;
    }

    // Helper method to create image galleries
    createGallery(images) {
        const galleryItems = images.map(img => `
            <div class="gallery-item">
                <img src="${img.src}" alt="${img.alt || ''}" loading="lazy">
            </div>
        `).join('');

        return `<div class="gallery">${galleryItems}</div>`;
    }

    // Helper method to create contact forms
    createContactForm() {
        return `
            <form name="contact" method="POST" data-netlify="true" class="contact-form" netlify-honeypot="bot-field" netlify>
                <input type="hidden" name="form-name" value="contact">
                <div style="display: none;">
                    <label>Don't fill this out if you're human: <input name="bot-field"></label>
                </div>
                <div class="form-group">
                    <label for="name" class="form-label">Name *</label>
                    <input type="text" id="name" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" id="phone" name="phone" class="form-input">
                </div>
                <div class="form-group">
                    <label for="message" class="form-label">Message *</label>
                    <textarea id="message" name="message" class="form-textarea" rows="6" required placeholder="Please let us know about your retreat needs, dates, group size, and any special requirements."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
        `;
    }
}

// Export for use in other scripts
window.markdownParser = new MarkdownParser();