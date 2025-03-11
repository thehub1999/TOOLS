// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    // Load header
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    initializeSearch();
    loadTools();
});

// Common utility functions
function showLoading() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.body.appendChild(loadingSpinner);
}

function hideLoading() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Initialize tooltips and popovers if Bootstrap is present
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Search functionality for tools
function searchTools() {
    const searchInput = document.getElementById('search-tools');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', searchTools);

// Load tools dynamically
function loadTools() {
    const toolsData = {
        'image-tools': [
            { title: 'Image Editor', description: 'Edit images with filters, effects, and drawing tools', icon: 'bi-pencil-square', url: 'tools/image-tools/image-editor.html' },
            { title: 'Image Resizer', description: 'Resize images while maintaining quality', icon: 'bi-arrows-angle-expand', url: 'tools/image-tools/image-resizer.html' },
            { title: 'Image Compressor', description: 'Compress images while maintaining visual quality', icon: 'bi-compress', url: 'tools/image-tools/image-compressor.html' },
            { title: 'Image Format Converter', description: 'Convert images between different formats', icon: 'bi-arrow-repeat', url: 'tools/image-tools/image-format-converter.html' },
            { title: 'Image Converter', description: 'Convert images to various formats with advanced options', icon: 'bi-arrow-left-right', url: 'tools/image-tools/image-converter.html' },
            { title: 'Image Cropper', description: 'Crop and reshape your images with precision', icon: 'bi-crop', url: 'tools/image-tools/image-cropper.html' },
            { title: 'Image Filter', description: 'Apply beautiful filters and effects to your images', icon: 'bi-image-fill', url: 'tools/image-tools/image-filter.html' },
            { title: 'Image Watermark', description: 'Add text or image watermarks to your images', icon: 'bi-water', url: 'tools/image-tools/image-watermark.html' },
            { title: 'Image Metadata Viewer', description: 'View and analyze image metadata information', icon: 'bi-card-list', url: 'tools/image-tools/image-metadata-viewer.html' },
            { title: 'Image Comparison', description: 'Compare two images side by side or with a slider', icon: 'bi-arrows-angle-expand', url: 'tools/image-tools/image-comparison.html' },
            { title: 'Image to PNG', description: 'Convert images to PNG format', icon: 'bi-image', url: 'tools/image-tools/image-to-png.html' },
            { title: 'Image to JPG', description: 'Convert images to JPG format', icon: 'bi-file-image', url: 'tools/image-tools/image-to-jpg.html' },
            { title: 'QR Code Generator', description: 'Create QR codes for text, URLs, and more', icon: 'bi-qr-code', url: 'tools/image-tools/qr-code-generator.html' },
            // Add more tools here
        ],
        'seo-tools': [
            { title: 'Meta Tag Generator', description: 'Generate meta tags for your website', icon: 'bi-code-square', url: 'tools/seo-tools/meta-tag-generator.html' },
            { title: 'Keyword Density Checker', description: 'Check keyword density in your content', icon: 'bi-percent', url: 'tools/seo-tools/keyword-density.html' },
            // Add more tools here
        ],
        'text-tools': [
            { title: 'Word Counter', description: 'Count words, characters, sentences and paragraphs', icon: 'bi-calculator', url: 'tools/text-tools/word-counter.html' },
            { title: 'Case Converter', description: 'Convert text to UPPERCASE, lowercase, Title Case and more', icon: 'bi-type', url: 'tools/text-tools/case-converter.html' },
            // Add more tools here
        ],
        'security-tools': [
            { title: 'Password Generator', description: 'Generate secure passwords with custom options', icon: 'bi-shield-lock', url: 'tools/security-tools/password-generator.html' },
            // Add more tools here
        ],
        'converter-tools': [
            { title: 'Currency Converter', description: 'Convert between different currencies with real-time rates', icon: 'bi-currency-exchange', url: 'tools/converter-tools/currency-converter.html' },
            { title: 'Unit Converter', description: 'Convert between different units of measurement', icon: 'bi-arrows-angle-contract', url: 'tools/converter-tools/unit-converter.html' },
            // Add more tools here
        ]
        // Add more categories here
    };

    // Load tools for each category
    Object.entries(toolsData).forEach(([category, tools]) => {
        const container = document.getElementById(category);
        if (container) {
            tools.forEach(tool => {
                container.appendChild(createToolCard(tool));
            });
        }
    });
}

// Create tool card element
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
        <div class="card tool-card h-100">
            <div class="card-body">
                <div class="tool-icon">
                    <i class="bi ${tool.icon}"></i>
                </div>
                <h5 class="card-title">${tool.title}</h5>
                <p class="card-text">${tool.description}</p>
                <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
            </div>
        </div>
    `;
    return card;
}

// Add Google AdSense (if available)
function loadAds() {
    // Add your AdSense code here
    // Example:
    // (adsbygoogle = window.adsbygoogle || []).push({});
} 