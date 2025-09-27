// FINBlog Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnimations();
    initSearch();
    initContactForm();
    initTableOfContents();
    initSmoothScrolling();
    initTooltips();
    initLazyLoading();
});

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .hero-section, .feature-icon').forEach(el => {
        observer.observe(el);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('input[name="q"]');
    const searchForm = document.querySelector('form[action*="search"]');
    
    if (searchInput && searchForm) {
        // Add search suggestions
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });

        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            const query = searchInput.value.trim();
            if (!query) {
                e.preventDefault();
                searchInput.focus();
                return false;
            }
        });
    }
}

// Show search suggestions
function showSearchSuggestions(query) {
    const suggestions = [
        'budgeting tips',
        'student banking',
        'side hustles',
        'NSFAS',
        'budgeting apps',
        'saving money',
        'financial planning',
        'student loans',
        'Capitec',
        'FNB',
        'Standard Bank',
        'emergency fund'
    ];

    const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query)
    );

    if (filteredSuggestions.length > 0) {
        let suggestionsHTML = '<div class="search-suggestions">';
        filteredSuggestions.slice(0, 5).forEach(suggestion => {
            suggestionsHTML += `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`;
        });
        suggestionsHTML += '</div>';

        // Remove existing suggestions
        hideSearchSuggestions();
        
        // Add new suggestions
        const searchContainer = document.querySelector('.input-group');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.insertAdjacentHTML('beforeend', suggestionsHTML);
        }
    }
}

// Hide search suggestions
function hideSearchSuggestions() {
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

// Select search suggestion
function selectSuggestion(suggestion) {
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
        searchInput.value = suggestion;
        hideSearchSuggestions();
        searchInput.focus();
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                submitContactForm(data);
            }
        });
    }
}

// Validate contact form
function validateContactForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit contact form
function submitContactForm(data) {
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span class="spinner me-2"></span>Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        document.querySelector('form').reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Initialize table of contents
function initTableOfContents() {
    const toc = document.getElementById('toc');
    if (!toc) return;
    
    // Check if TOC already has static content
    const existingLinks = toc.querySelectorAll('.nav-link');
    if (existingLinks.length > 0) {
        // Add click handlers to existing links
        existingLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        return;
    }
    
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    
    if (headings.length > 0) {
        headings.forEach((heading, index) => {
            // Add ID to heading if not exists
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }
            
            // Create TOC link
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.className = 'nav-link py-1';
            link.textContent = heading.textContent;
            
            // Add appropriate class based on heading level
            if (heading.tagName === 'H3') {
                link.className += ' ps-3';
            }
            
            // Add click handler for smooth scrolling
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            
            toc.appendChild(link);
        });
    } else {
        toc.innerHTML = '<p class="text-muted small">No headings found</p>';
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize lazy loading and image handling
function initLazyLoading() {
    // Handle image containers
    document.querySelectorAll('.image-container').forEach(container => {
        container.classList.add('loading');
        
        const img = container.querySelector('img');
        if (img) {
            // Handle successful load
            img.addEventListener('load', () => {
                container.classList.remove('loading');
            });
            
            // Handle load error
            img.addEventListener('error', () => {
                container.style.display = 'none';
            });
        }
    });
    
    // Set up lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.src; // Trigger load if already in viewport
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function to throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    hideSearchSuggestions();
}, 250));

// Handle scroll events
window.addEventListener('scroll', throttle(function() {
    // Add scroll-based functionality here
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
}, 100));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        document.title = '👋 Come back to FINBlog!';
    } else {
        // Page is visible
        document.title = 'FINBlog - Financial Tips for South African Students';
    }
});

// Copy URL to clipboard
function copyToClipboard(button) {
    const url = button.getAttribute('data-url');
    const originalText = button.innerHTML;
    
    // Create temporary input element
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    
    // Show success message
    button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i><span class="d-none d-sm-inline ms-1">Copied!</span>';
    button.classList.add('btn-success');
    button.classList.remove('btn-outline-secondary');
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-secondary');
    }, 2000);
}

// Social Share Tracking
function trackShare(platform) {
    // You can add analytics tracking here
    console.log(`Shared on ${platform}`);
}

// Add CSS for search suggestions
const style = document.createElement('style');
style.textContent = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #dee2e6;
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
    }
    
    .suggestion-item {
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-bottom: 1px solid #f8f9fa;
        transition: background-color 0.2s ease;
    }
    
    .suggestion-item:hover {
        background-color: #f8f9fa;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .navbar-scrolled {
        background-color: rgba(0, 123, 255, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
