// Language Switcher
var I18n = {
    currentLang: 'en',
    ui: {
        sl: { "Work": "Dela", "News": "Novice", "Profile": "Profil", "Media": "Mediji", "Home": "Domov", "Contact": "Kontakt", "Selected Work": "Izbrana Dela", "Location": "Lokacija", "Year": "Leto", "Status": "Status", "Studio": "Studio", "Social": "Socialna Omrežja", "Instagram": "Instagram", "Facebook": "Facebook", "X": "X", "Back to Projects": "Nazaj k Projektom", "Journal": "Dnevnik" },
        en: { "Work": "Work", "News": "News", "Profile": "Profile", "Media": "Media", "Home": "Home", "Contact": "Contact", "Selected Work": "Selected Work", "Location": "Location", "Year": "Year", "Status": "Status", "Studio": "Studio", "Social": "Social", "Instagram": "Instagram", "Facebook": "Facebook", "X": "X", "Back to Projects": "Back to Projects", "Journal": "Journal" }
    },

    translate: function() {
        var lang = this.currentLang;
        var dict = this.ui[lang];

        // Translate data-i18n elements
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute('data-i18n');
            if (key && dict[key]) els[i].textContent = dict[key];
        }

        // Show/hide bilingual content blocks - selector for elements with lang attribute
        var langEls = document.querySelectorAll('p[lang], h1[lang], h2[lang], h3[lang], div[lang], span[lang], li[lang], a[lang]');
        for (var j = 0; j < langEls.length; j++) {
            var elLang = langEls[j].getAttribute('lang');
            var shouldShow = (elLang === lang);
            // Use both display and hidden class
            if (shouldShow) {
                langEls[j].style.display = 'inline';
                langEls[j].classList.remove('hidden');
            } else {
                langEls[j].style.display = 'none';
                langEls[j].classList.add('hidden');
            }
        }
    },

    init: function() {
        // Set initial display for bilingual elements based on saved language
        var lang = this.currentLang;
        var langEls = document.querySelectorAll('p[lang], h1[lang], h2[lang], h3[lang], div[lang], span[lang], li[lang], a[lang]');
        for (var j = 0; j < langEls.length; j++) {
            var elLang = langEls[j].getAttribute('lang');
            var shouldShow = (elLang === lang);
            if (shouldShow) {
                langEls[j].style.display = 'inline';
                langEls[j].classList.remove('hidden');
            } else {
                langEls[j].style.display = 'none';
                langEls[j].classList.add('hidden');
            }
        }
    },

    switchLanguage: function(lang) {
        this.currentLang = lang;
        try { localStorage.setItem('gva-language', lang); } catch(e) {}
        this.translate();
    }
};

// Init on load
document.addEventListener('DOMContentLoaded', function() {
    var saved = localStorage.getItem('gva-language');
    I18n.currentLang = saved || 'en';
    I18n.init();
    I18n.translate();
});