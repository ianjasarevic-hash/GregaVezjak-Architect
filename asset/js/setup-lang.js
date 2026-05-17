/**
 * Mark up project descriptions with language attributes
 * Run this once to add lang="en" and lang="sl" to description paragraphs
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find paragraphs in the project description area
    const descriptionDiv = document.querySelector('.font-headline.text-xl');

    if (descriptionDiv) {
        const paragraphs = descriptionDiv.querySelectorAll('p');

        paragraphs.forEach((p, index) => {
            const text = p.textContent.toLowerCase();

            // Check if paragraph has Slovenian characters or starts with "v sloveniji"
            if (text.includes('v sloveniji') ||
                text.includes('pri kamni') ||
                text.includes('sestavlja') ||
                text.includes('predlog') ||
                text.includes('gredo') ||
                text.includes('zgrajen') ||
                text.includes('nahaja') ||
                text.includes('stoji') ||
                text.includes('svoji')) {
                p.setAttribute('lang', 'sl');
            } else {
                p.setAttribute('lang', 'en');
            }
        });

        console.log('Marked up', paragraphs.length, 'description paragraphs');
    }
});

// Also add to translation function in i18n.js
if (typeof I18n !== 'undefined') {
    const originalTranslate = I18n.translate;
    I18n.translate = function() {
        originalTranslate.call(this);

        // Handle lang attribute elements
        document.querySelectorAll('[lang]').forEach(el => {
            if (el.getAttribute('lang') === this.currentLang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    };
}