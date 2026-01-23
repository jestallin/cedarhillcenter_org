/**
 * Cedar Hill Retreat Center - Main Application
 * Initializes the router and handles page-specific functionality
 */

class CedarHillApp {
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        this.setupRoutes();
        this.setupMobileMenu();
        this.setupImageLightbox();
        this.setupContactForm();
    }

    setupRoutes() {
        // Define all routes
        this.router.addRoute('home', () => this.loadHomePage());
        this.router.addRoute('about', () => this.loadAboutPage());
        this.router.addRoute('history', () => this.loadHistoryPage());
        this.router.addRoute('rates', () => this.loadRatesPage());
        this.router.addRoute('accommodations', () => this.loadAccommodationsPage());
        this.router.addRoute('photos', () => this.loadPhotosPage());
        this.router.addRoute('events', () => this.loadEventsPage());
        this.router.addRoute('contact', () => this.loadContactPage());
        this.router.addRoute('payment', () => this.loadPaymentPage());
        this.router.addRoute('404', () => this.load404Page());
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navList = document.querySelector('.nav-list');

        if (toggle && navList) {
            toggle.addEventListener('click', () => {
                navList.classList.toggle('mobile-open');
            });

            // Close mobile menu when clicking on a link
            navList.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navList.classList.remove('mobile-open');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !navList.contains(e.target)) {
                    navList.classList.remove('mobile-open');
                }
            });
        }
    }

    setupImageLightbox() {
        // Simple lightbox functionality for gallery images
        document.addEventListener('click', (e) => {
            if (e.target.matches('.gallery-item img')) {
                this.openLightbox(e.target.src, e.target.alt);
            }
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <img src="${src}" alt="${alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close') || e.target.classList.contains('lightbox-overlay')) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        });

        // Add lightbox styles
        if (!document.querySelector('#lightbox-styles')) {
            const styles = document.createElement('style');
            styles.id = 'lightbox-styles';
            styles.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                }
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-content img {
                    width: 100%;
                    height: auto;
                    max-height: 90vh;
                    object-fit: contain;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    setupContactForm() {
        // Netlify Forms handles form submission automatically
        // No JavaScript form handling needed
    }

    // Page Loading Methods
    async loadHomePage() {
        const heroSection = window.markdownParser.createHeroSection(
            'Welcome to Cedar Hill',
            'A peaceful sanctuary for learning, growth and enrichment in harmony with nature.',
            'Images/Banner/banner1.jpg'
        );

        const content = `
            ${heroSection}
            <div class="container">
                <section class="section">
                    <div class="section-title">
                        <h2>Experience Tranquility</h2>
                        <p>Cedar Hill offers an intimate experience on 12 acres of conservation land, boasting a picturesque path to 500 feet of private bay beach. The center is equipped to host day groups of up to 30 people and provides comfortable overnight sleeping for a total of 15 guests, with 20 parking spaces available.</p>
                    </div>
                    <div class="grid grid-3">
                        <div class="card">
                            <h3>Natural Setting</h3>
                            <p>Our protected grounds offer guests a beautiful, natural setting for relaxation and gatherings on 12 acres of fields enhanced by wildflowers, stately cedars, and pristine private beach.</p>
                        </div>
                        <div class="card">
                            <h3>Modern Amenities</h3>
                            <p>We have a fully-equipped kitchen, large dining, living and family rooms, two full and two half baths, and comfortable accommodations for up to 30 day guests and 15 overnight guests.</p>
                        </div>
                        <div class="card">
                            <h3>Peaceful Retreat</h3>
                            <p>An intimate retreat space ideal for groups that desire to gather for quiet enjoyment of nature, non-motorized recreation, and meaningful conferences or retreats.</p>
                        </div>
                    </div>
                    <div class="text-center mt-8">
                        <a href="#/contact" class="btn btn-primary">Plan Your Retreat</a>
                        <a href="#/photos" class="btn btn-outline">View Photos</a>
                    </div>
                </section>
            </div>
        `;

        this.router.renderContent(content, '');
    }

    async loadAboutPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>About Cedar Hill</h2>
                    <p>Learn about our mission, values, and the team behind Cedar Hill Retreat Center.</p>
                </div>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Our Mission</h3>
                        <p>Cedar Hill Retreat Center is owned and operated as a Massachusetts non-profit corporation under the leadership of our Board of Directors. We are stewards of an intimate retreat space in a unique, natural setting; a sanctuary for learning, growth and enrichment.</p>
                        <p>We don't have an onsite office, so the best way to reach us is by email at <a href="mailto:cedarhillretreat@gmail.com">cedarhillretreat@gmail.com</a> or by phone at 781-217-4540.</p>
                    </div>
                    <div class="card">
                        <h3>Who We Serve</h3>
                        <p>Many diverse groups use our facilities for their classes, conferences and retreat needs:</p>
                        <ul>
                            <li>Parish staff and church groups</li>
                            <li>Community groups and social service agencies</li>
                            <li>Yoga groups and wellness practitioners</li>
                            <li>Youth groups and school faculty</li>
                            <li>Small non-profit organizations</li>
                            <li>Family retreat groups</li>
                        </ul>
                        <h4>Custom Solutions</h4>
                        <p>Since your needs are unique, please email us, and we will be glad to gather the details of your stay and give you a quote based on your needs.</p>
                    </div>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadHistoryPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Cedar Hill History</h2>
                    <p>Discover the rich heritage of our retreat center, from its origins as a private estate to today's sanctuary for learning and growth.</p>
                </div>
                <div class="card">
                    <h3>The Allen Legacy (1870-1980)</h3>
                    <p>Stephen Allen, a Boston businessman and lawyer, arrived in Duxbury in 1870. Allen was a self-made man from New Hampshire who made his fortune largely in Boston real estate. He came to Duxbury to find a summer home and quickly realized the potential for profit in the town's seaside farms, proceeding to buy as much as he could of the old Myles Standish farm and its surrounding neighborhood of Captain's Hill.</p>
                    <p>At his death in 1894, he left his estate to his son Horace Allen. After Horace's death in 1919, the property passed to his three daughters: Beatrice, Rosamond, and Eleanor. In 1939, they divided the property into 3 parts, each receiving a parcel.</p>
                </div>
                <div class="card">
                    <h3>Rosamund's Vision</h3>
                    <div class="grid grid-2" style="align-items: center;">
                        <div>
                            <p>Rosamund Allen received the 12½ acre parcel known as 52D, which was for many years her summer home that she called "Cedar Hill." As Miss Allen aged, her summers to Cedar Hill were of shorter duration, but she spent at least some of every year there from her childhood until her last stay during the summer of 1983.</p>
                            <p>Rosamund Allen desired that her "Cedar Hill" remain as she remembered it. She wanted the buildings and grounds to offer peace and harmony to others in the same way they had to her, but could find no person or organization to guarantee her wishes.</p>
                        </div>
                        <div class="text-center">
                            <img src="Images/Historical/roseamund allen.jpg" alt="Rosamund Allen Portrait" style="max-width: 250px; width: 100%; border-radius: 8px; box-shadow: var(--shadow-md);">
                            <p class="mt-4"><strong>Rosamund Allen</strong></p>
                            <p style="font-size: 0.9rem; color: var(--neutral-stone); margin-top: 0.5rem;">Miss Allen's photograph hangs on the dining room wall in the Cedar Hill Retreat Center.</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Unitarian Universalist Era (1980-2010)</h3>
                        <p>In 1980, she left her beloved summer estate to the regional Unitarian Universalist Church association for a retreat house known as Cedar Hill. 
                        <p>On April 11th, 1981, at a dedication ceremony, Rev. Fewkes said, "Today Rosamund Allen's dream becomes a reality as we dedicate this place to be used for the religious, educational, scientific and aesthetic purposes for which she intended."</p>
                        <p>It served as a place for area Unitarian Universalists to relax and reflect for 30 years, with vibrancy and activities that encouraged volunteerism and valued dedication.</p>
                    </div>
                    <div class="card">
                        <h3>Independent Non-Profit (2010-Present)</h3>
                        <p>In January 2010, Cedar Hill was transferred to an independent non-profit organization and is now run as a non-denominational retreat and learning center offering meeting space and accommodations for guests. 
                        <p>Our mission is to provide an environment dedicated to learning, growth and enrichment while operating in harmony with our natural surroundings.</p>
                    </div>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadRatesPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Rates & Offerings</h2>
                    <p>Affordable pricing for your retreat, conference, or special event needs.</p>
                </div>
                <div class="card">
                    <h3>2025 Pricing</h3>
                    <div class="grid grid-2">
                        <div class="rate-item">
                            <h4>DAY: $600.00</h4>
                            <p><em>Daily rentals are limited and available by request only</em></p>
                        </div>
                        <div class="rate-item">
                            <h4>OVERNIGHTS: $700.00</h4>
                            <p><em>During July and August guests are required to stay for a minimum of 5 nights</em></p>
                        </div>
                    </div>
                    <p class="text-center mt-4">Please <a href="#/contact">contact us</a> for the total payment amount.</p>
                    <div class="text-center mt-4">
                        <a href="#/contact" class="btn btn-primary">Request Quote</a>
                    </div>
                </div>
                <div class="card">
                    <h3>2027 Rate Update</h3>
                    <p>Starting in 2027, our overnight rate will increase to $800.00 per night. We are making this announcement early to give our guests advance notice for planning future retreats.</p>
                </div>
                <div class="card">
                    <h3>What's Included</h3>
                    <div class="grid grid-2">
                        <div>
                            <ul>
                                <li>Fully-equipped kitchen</li>
                                <li>Large dining, living and family rooms</li>
                                <li>Two full and two half bathrooms</li>
                                <li>Sleeping accommodations for up to 15 people</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>Outside shower, grill and fire pit</li>
                                <li>Porch with rocking chairs</li>
                                <li>Access to 12 acres of conservation land</li>
                                <li>500 feet of private beach access</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadAccommodationsPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Accommodations</h2>
                    <p>Comfortable sleeping arrangements and modern amenities for groups up to 15 people.</p>
                </div>
                <div class="card">
                    <h3>Capacity</h3>
                    <p>Cedar Hill can accommodate day groups up to 30 and can sleep up to 15 people.</p>
                </div>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Bedroom Configurations</h3>
                        <p>We have five bedrooms that sleep a total of 13 with an additional 2 trundle beds bringing the total up to 15. All beds are twin beds.</p>
                        <ul>
                            <li><strong>Bedroom 1:</strong> Sleeps 1 (with one trundle bed)</li>
                            <li><strong>Bedroom 2:</strong> Sleeps 2</li>
                            <li><strong>Bedroom 3:</strong> Sleeps 2</li>
                            <li><strong>Bedroom 4:</strong> Sleeps 4</li>
                            <li><strong>Bedroom 5:</strong> Sleeps 4 (with one additional trundle bed)</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Common Areas</h3>
                        <ul>
                            <li><strong>Kitchen:</strong> Fully-equipped with modern appliances</li>
                            <li><strong>Dining Room:</strong> Large space for group meals</li>
                            <li><strong>Living Room:</strong> Comfortable seating for relaxation</li>
                            <li><strong>Family Room:</strong> Additional gathering space</li>
                            <li><strong>Bathrooms:</strong> Two full and two half baths</li>
                        </ul>
                    </div>
                </div>
                <div class="card">
                    <h3>Outdoor Features</h3>
                    <div class="grid grid-2">
                        <div>
                            <ul>
                                <li><strong>Porch:</strong> Rocking chairs with vista of cedar trees leading to the ocean</li>
                                <li><strong>Outside Shower:</strong> Convenient outdoor bathing facility</li>
                                <li><strong>Grill:</strong> For outdoor cooking and meals</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><strong>Fire Pit:</strong> Perfect for evening gatherings</li>
                                <li><strong>Private Beach:</strong> 500 feet of pristine beach access</li>
                                <li><strong>Nature Trails:</strong> Picturesque path through 12 acres of conservation land</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <a href="#/photos" class="btn btn-primary">View Photos</a>
                    <a href="#/rates" class="btn btn-outline">Check Rates</a>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadPhotosPage() {
        const images = [
            { src: 'Images/Banner/banner1.jpg', alt: 'Cedar Hill Exterior' },
            { src: 'Images/Banner/banner2.jpg', alt: 'Beautiful Grounds' },
            { src: 'Images/Banner/banner3.jpg', alt: 'Scenic Views' },
            { src: 'Images/Nature/Beach.jpg', alt: 'Private Beach Access' },
            { src: 'Images/Nature/Beachclouds.jpg', alt: 'Beach with Clouds' },
            { src: 'Images/Nature/BeachgrassA.jpg', alt: 'Beach Grass' },
            { src: 'Images/Nature/Beachpath.jpg', alt: 'Path to Beach' },
            { src: 'Images/Nature/Beachsun.jpg', alt: 'Sunny Beach Day' },
            { src: 'Images/Nature/Creek.jpg', alt: 'Natural Creek' },
            { src: 'Images/Nature/Deer.jpg', alt: 'Local Wildlife' },
            { src: 'Images/Nature/Fire pit.jpg', alt: 'Fire Pit Area' },
            { src: 'Images/Nature/Sunset.jpg', alt: 'Beautiful Sunset' },
            { src: 'Images/Nature/Sunsetclouds.JPG', alt: 'Sunset with Clouds' },
            { src: 'Images/Nature/Rainbow.jpg', alt: 'Rainbow over Cedar Hill' },
            { src: 'Images/Nature/Stonesculpture.jpg', alt: 'Stone Sculpture' },
            { src: 'Images/Nature/Butterfly.jpg', alt: 'Local Butterfly' },
            { src: 'Images/Nature/Turtle.jpg', alt: 'Local Turtle' },
            { src: 'Images/Nature/Hawk.jpg', alt: 'Local Hawk' },
            { src: 'Images/Nature/Fisherman.jpg', alt: 'Fishing Activities' },
            { src: 'Images/Nature/Kayaking.jpg', alt: 'Kayaking on the Bay' },
            { src: 'Images/CommonAreas/KitchenA.jpg', alt: 'Kitchen Area A' },
            { src: 'Images/CommonAreas/KitchenB.jpg', alt: 'Kitchen Area B' },
            { src: 'Images/CommonAreas/Diningroom.jpg', alt: 'Dining Room' },
            { src: 'Images/CommonAreas/Livingroom.jpg', alt: 'Living Room' },
            { src: 'Images/CommonAreas/LivingroomA.jpg', alt: 'Living Room View A' },
            { src: 'Images/CommonAreas/Familyroom.jpg', alt: 'Family Room' },
            { src: 'Images/CommonAreas/FamilyroomA.jpg', alt: 'Family Room View A' },
            { src: 'Images/CommonAreas/Redchairs.jpg', alt: 'Red Chairs on Porch' },
            { src: 'Images/CommonAreas/Rocking Chairs.png', alt: 'Rocking Chairs' },
            { src: 'Images/Bedrooms/Bedroom1.jpg', alt: 'Bedroom 1' },
            { src: 'Images/Bedrooms/Bedroom2A.jpg', alt: 'Bedroom 2A' },
            { src: 'Images/Bedrooms/Bedroom2B.jpg', alt: 'Bedroom 2B' },
            { src: 'Images/Bedrooms/Bedroom3A.jpg', alt: 'Bedroom 3A' },
            { src: 'Images/Bedrooms/Bedroom3B.jpg', alt: 'Bedroom 3B' },
            { src: 'Images/Bedrooms/Bedroom4A.jpg', alt: 'Bedroom 4A' },
            { src: 'Images/Bedrooms/Bedroom4B.jpg', alt: 'Bedroom 4B' },
            { src: 'Images/Bedrooms/Bedroom 5.JPG', alt: 'Bedroom 5' },
            { src: 'Images/Winter/Wintercenter.jpeg', alt: 'Cedar Hill in Winter' },
            { src: 'Images/Winter/Winterscene.JPG', alt: 'Winter Scene' },
            { src: 'Images/Winter/Wintersunset.JPG', alt: 'Winter Sunset' },
            { src: 'Images/Winter/Winterfootprints.jpeg', alt: 'Winter Footprints' },
            { src: 'Images/Winter/Wintertrees.jpeg', alt: 'Winter Trees' },
            { src: 'Images/Historical/roseamund allen.jpg', alt: 'Rosamund Allen Portrait' },
            { src: 'Images/Historical/1 of 36.jpg', alt: 'Historical Photo 1' },
            { src: 'Images/Historical/19 of 36.jpg', alt: 'Historical Photo 2' },
            { src: 'Images/Historical/20160704_204641.jpg', alt: 'Historical Photo 3' },
            { src: 'Images/Historical/DSC_0109.jpg', alt: 'Historical Photo 4' },
            { src: 'Images/Historical/DSC_0129.jpg', alt: 'Historical Photo 5' },
            { src: 'Images/Historical/IMG_1647.jpg', alt: 'Historical Photo 6' }
        ];

        const gallery = window.markdownParser.createGallery(images);

        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Photo Gallery</h2>
                    <p>Take a visual tour of Cedar Hill Retreat Center and discover the beauty that awaits you.</p>
                </div>
                ${gallery}
                <div class="text-center mt-8">
                    <p>Click on any image to view it in full size.</p>
                    <a href="#/contact" class="btn btn-primary">Plan Your Visit</a>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadContactPage() {
        const contactForm = window.markdownParser.createContactForm();
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Contact Us</h2>
                    <p>Get in touch to plan your retreat or ask any questions about Cedar Hill.</p>
                </div>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Get In Touch</h3>
                        <p>We don't have an onsite office, so the best way to reach us is by email or phone. We'll be happy to provide information and answer all your questions.</p>
                        <p><strong>Email:</strong> <a href="mailto:cedarhillretreat@gmail.com">cedarhillretreat@gmail.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:781-217-4540">781-217-4540</a></p>
                        
                        <h4>Location</h4>
                        <p>Cedar Hill Retreat Center<br>
                        Duxbury, Massachusetts<br>
                        12 acres with 500 feet of private beach</p>
                        
                        <h4>Planning Your Retreat</h4>
                        <p>Since your needs are unique, please contact us and we will be glad to gather the details of your stay and give you a quote based on your specific requirements.</p>
                        
                        <p>We serve many diverse groups including:</p>
                        <ul>
                            <li>Parish staff and church groups</li>
                            <li>Community organizations</li>
                            <li>Yoga and wellness groups</li>
                            <li>Youth and educational groups</li>
                            <li>Small non-profit organizations</li>
                            <li>Family retreat groups</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Send Us a Message</h3>
                        ${contactForm}
                    </div>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadEventsPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Events</h2>
                    <p>Cedar Hill Center hosts and sponsors various events throughout the year to bring the community together and support our mission as a nonprofit retreat center.</p>
                </div>
                <div class="card">
                    <h3>Upcoming Events</h3>
                </div>
                <div class="card" id="marine-life-event">
                    <h3>The Beauty of New England Marine Life with Andrew J. Martinez</h3>
                    <p><strong>Friday, April 10th, 7:00-9:00 PM | Duxbury UU First Parish Assembly Hall, 842 Tremont St., Duxbury</strong></p>
                    <p>Join renowned underwater photographer and marine naturalist Andrew J. Martinez for a visual journey beneath New England's cold waters. For over 40 years, Andrew has documented the Gulf of Maine's extraordinary marine life through stunning photography.</p>
                    <p>As author of the acclaimed field guide "Marine Life of the North Atlantic" and creator of the popular Marine Life app, Andrew will reveal the vibrant colors, intricate behaviors, and surprising diversity of species that call our local waters home—from delicate nudibranchs to mysterious deep-water fish.</p>
                    <h4>Early Bird Raffle</h4>
                    <p>Purchase tickets early for a chance to win a copy of Andrew's book and app subscription. Must be present to win.</p>
                    <p><strong>Tickets: $30</strong></p>
                    
                    <div class="mt-6" style="border-top: 1px solid #e5e7eb; padding-top: var(--space-6);">
                        <h4>Purchase Tickets</h4>
                        <form id="marine-life-ticket-form" class="ticket-form">
                            <div class="form-group">
                                <label for="marine-quantity" class="form-label">Number of Tickets</label>
                                <select id="marine-quantity" name="quantity" class="form-input" required>
                                    <option value="">Select quantity...</option>
                                    <option value="1">1 ticket - $30.00</option>
                                    <option value="2">2 tickets - $60.00</option>
                                    <option value="3">3 tickets - $90.00</option>
                                    <option value="4">4 tickets - $120.00</option>
                                    <option value="5">5 tickets - $150.00</option>
                                    <option value="6">6 tickets - $180.00</option>
                                    <option value="7">7 tickets - $210.00</option>
                                    <option value="8">8 tickets - $240.00</option>
                                    <option value="9">9 tickets - $270.00</option>
                                    <option value="10">10 tickets - $300.00</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div style="background-color: var(--neutral-warm); padding: var(--space-4); border-radius: var(--border-radius); margin-bottom: var(--space-4);">
                                    <p style="margin-bottom: 0;"><strong>Total:</strong> <span id="marine-total" style="font-size: var(--font-size-xl); color: var(--primary-green);">$0.00</span></p>
                                </div>
                            </div>
                            <div id="converge-pay-button-container" style="display: none; text-align: center; margin-top: var(--space-4);">
                                <!-- Converge Pay button will be inserted here -->
                            </div>
                            <div id="payment-amount-note" class="mt-4" style="display: none; background-color: var(--neutral-warm); padding: var(--space-4); border-radius: var(--border-radius);">
                                <p style="font-size: 0.9rem; color: var(--neutral-charcoal); margin-bottom: var(--space-2);"><strong>Note:</strong> If the payment page asks you to enter an amount, please enter:</p>
                                <p style="font-size: var(--font-size-lg); color: var(--primary-green); font-weight: 600; margin-bottom: 0;" id="payment-amount">$0.00</p>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card">
                    <h3>Past Events</h3>
                </div>
                <div class="card">
                    <h3>Living with Sharks - Benefit Presentation by Dr. Greg Skomal</h3>
                    <p><strong>March 10, 2023 | First Parish Unitarian Universalist Church, Duxbury</strong></p>
                    <p>Mass Division of Marine Fisheries Shark Research Director, Dr. Greg Skomal, made an hour and a half presentation to a packed audience of 98 attendees at Duxbury's First Parish Unitarian Universalist Church. This benefit presentation for Cedar Hill Retreat Center, a nonprofit, nondenominational, self-supporting 501(c)3, focused on the sand shark and the great white shark, both of which have returned to the Northeast.</p>
                    <h4>Presentation Highlights:</h4>
                    <ul>
                        <li>Shark locations in and around Massachusetts Bay</li>
                        <li>Preferred water temperatures and seasonal patterns</li>
                        <li>Return patterns to the Northeast, including Canada</li>
                        <li>Feeding and migrating behaviors</li>
                        <li>Congregation and dispersal patterns</li>
                    </ul>
                    <p>Following the presentation, Dr. Skomal signed copies of the most recent (third) edition of his highly acclaimed book, <em>The Shark Handbook</em>, which serves as an excellent read and handy desktop reference for shark lovers and scientists alike.</p>
                </div>
                <div class="card">
                    <h3>We Are All Whalers - Benefit Presentation by Dr. Michael Moore</h3>
                    <p><strong>November 8, 2024 | First Parish Unitarian Universalist Church, Duxbury</strong></p>
                    <p>Marine Veterinarian Dr. Michael Moore from Woods Hole Oceanographic Institution presented "We Are All Whalers: The Plight of Whales and Our Responsibility" to benefit Cedar Hill Retreat Center. Drawing from 40 years of marine research, Dr. Moore explored the critical threats facing North Atlantic right whales from human activities.</p>
                    <h4>Presentation Highlights:</h4>
                    <ul>
                        <li>The critically endangered North Atlantic right whale population</li>
                        <li>Impact of commercial fishing and global shipping on whale survival</li>
                        <li>Trauma from ship collisions and fishing gear entanglements</li>
                        <li>Technological solutions including ropeless fishing nets</li>
                        <li>Consumer responsibility and sustainable seafood practices</li>
                        <li>What individuals can do to help protect marine mammals</li>
                    </ul>
                    <p>Dr. Moore shared compelling insights from his decades of research, emphasizing how human activities directly impact whale populations and offering practical solutions for conservation. The presentation aimed to educate attendees about sustainable practices and their role in marine conservation.</p>
                </div>
                <div class="card text-center">
                    <p><em>Stay tuned for upcoming events and presentations that support Cedar Hill Center's mission of providing a peaceful retreat space for all.</em></p>
                </div>
            </section>
        `;

        this.router.renderContent(content);
        
        // Set up ticket form handlers after content is rendered
        setTimeout(() => {
            this.setupMarineLifeTicketForm();
        }, 100);
    }

    setupMarineLifeTicketForm() {
        const quantitySelect = document.getElementById('marine-quantity');
        const totalSpan = document.getElementById('marine-total');
        const buttonContainer = document.getElementById('converge-pay-button-container');
        const amountNote = document.getElementById('payment-amount-note');
        const amountDisplay = document.getElementById('payment-amount');

        if (quantitySelect && totalSpan && buttonContainer) {
            // Update totals when quantity changes
            quantitySelect.addEventListener('change', () => {
                const quantity = parseInt(quantitySelect.value) || 0;
                const pricePerTicket = 30;
                const total = quantity * pricePerTicket;
                
                totalSpan.textContent = `$${total.toFixed(2)}`;
                
                // Update amount note
                if (amountNote && amountDisplay) {
                    if (quantity > 0) {
                        amountDisplay.textContent = `$${total.toFixed(2)}`;
                        amountNote.style.display = 'block';
                    } else {
                        amountNote.style.display = 'none';
                    }
                }
                
                // Clear existing button and remove old scripts
                buttonContainer.innerHTML = '';
                
                // Remove any existing Converge Pay scripts to ensure fresh session
                const existingScripts = document.querySelectorAll('script[src*="convergepay.com/hosted-payments/buy_button_script"]');
                existingScripts.forEach(s => s.remove());
                
                if (quantity > 0) {
                    // Create unique container ID for this button instance
                    const containerId = `converge-container-${Date.now()}`;
                    buttonContainer.innerHTML = `
                        <div id="${containerId}">
                            <button disabled class="converge-pay-button" style="color:#ffffff; font-size:var(--font-size-base); font-family:var(--font-primary); font-weight:600; background-color:var(--primary-green); padding:var(--space-3) var(--space-6); display:inline-block; border-radius:var(--border-radius); border:2px solid var(--primary-green); box-shadow:var(--shadow-md); cursor:pointer; transition:all 0.2s ease;">BUY NOW</button>
                        </div>
                    `;
                    
                    // Add CSS to ensure button styling is maintained after Converge Pay script loads
                    if (!document.getElementById('converge-button-styles')) {
                        const style = document.createElement('style');
                        style.id = 'converge-button-styles';
                        style.textContent = `
                            .converge-pay-button,
                            .converge-pay-button:not(:disabled) {
                                background-color: var(--primary-green) !important;
                                color: #ffffff !important;
                                border-color: var(--primary-green) !important;
                                font-family: var(--font-primary) !important;
                                font-weight: 600 !important;
                                border-radius: var(--border-radius) !important;
                                box-shadow: var(--shadow-md) !important;
                            }
                            .converge-pay-button:hover:not(:disabled) {
                                background-color: var(--primary-green-light) !important;
                                transform: translateY(-1px) !important;
                                box-shadow: var(--shadow-lg) !important;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
                    // Load Converge Pay script with cache-busting to ensure new session
                    // The script will enable the button and create a new payment session
                    const script = document.createElement('script');
                    const scriptUrl = 'https://www.convergepay.com/hosted-payments/buy_button_script/524d352b576475615338694a36413376346e614946414141415a76734e5a4c46';
                    // Add cache-busting parameter to force fresh script load (creates new session)
                    script.src = `${scriptUrl}?t=${Date.now()}`;
                    script.onload = () => {
                        buttonContainer.style.display = 'block';
                    };
                    script.onerror = () => {
                        console.error('Failed to load Converge Pay script');
                    };
                    
                    document.body.appendChild(script);
                } else {
                    buttonContainer.style.display = 'none';
                }
            });
        }
    }

    load404Page() {
        const content = `
            <section class="section">
                <div class="card text-center">
                    <h2>Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="#/" class="btn btn-primary">Return Home</a>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

    async loadPaymentPage() {
        const content = `
            <section class="section">
                <div class="section-title">
                    <h2>Online Payment</h2>
                    <p>Secure online payment for your Cedar Hill retreat reservation.</p>
                </div>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Payment Information</h3>
                        <p>Use this secure payment form to pay for your Cedar Hill retreat reservation.</p>
                        
                        <h4>2025 Rates</h4>
                        <ul>
                            <li><strong>Day Rate:</strong> $600.00</li>
                            <li><strong>Overnight Rate:</strong> $700.00</li>
                        </ul>
                        
                        <p><strong>Important Notes:</strong></p>
                        <ul>
                            <li>Daily rentals are limited and available by request only</li>
                            <li>During July and August, guests are required to stay for a minimum of 5 nights</li>
                            <li>Please <a href="#/contact">contact us</a> for the total payment amount before processing payment</li>
                        </ul>
                        
                        <h4>Payment Security</h4>
                        <p>All payments are processed securely through Converge Pay. Your payment information is encrypted and secure.</p>
                    </div>
                    <div class="card">
                        <h3>Make Payment</h3>
                        <div class="payment-section">
                            <p>Click the button below to proceed to our secure payment portal:</p>
                            <div class="text-center mt-4">
                                <a href="https://www.convergepay.com/hosted-payments?ssl_txn_auth_token=Gef%2Bp53bRIqSGxoh6N7IngAAAZeYVTpD" class="btn btn-primary" target="_blank" rel="noopener noreferrer">PAY NOW</a>
                            </div>
                            <p class="mt-4" style="font-size: 0.9rem; color: var(--neutral-stone);">By clicking "PAY NOW", you will be redirected to our secure payment processor.</p>
                        </div>
                        
                        <div class="mt-6">
                            <h4>Need Help?</h4>
                            <p>If you have questions about your payment or need assistance, please contact us:</p>
                            <p><strong>Email:</strong> <a href="mailto:cedarhillretreat@gmail.com">cedarhillretreat@gmail.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:781-217-4540">781-217-4540</a></p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <a href="#/rates" class="btn btn-outline">Back to Rates</a>
                    <a href="#/contact" class="btn btn-outline">Contact Us</a>
                </div>
            </section>
        `;

        this.router.renderContent(content);
    }

}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CedarHillApp();
});