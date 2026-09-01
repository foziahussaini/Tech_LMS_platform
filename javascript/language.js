document.addEventListener("DOMContentLoaded", () => {
  injectLanguageSelector();

  const langText = document.getElementById("lang-text");
  const languageOptions = document.querySelectorAll("#language-option li");
  
  const languageIcon = document.getElementById("language-icon") || document.getElementById("lang-text");
  const dropdownLang = document.querySelector(".dropdown-lang");

  async function translatePage(lang) {
    try {
      const response = await fetch(`./languages/${lang}.json`);
      if (!response.ok) throw new Error(`Kunne ikke laste inn oversettelse for: ${lang}`);
      
      const translations = await response.json();

      document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.dataset.key;
        if (!key) return; 
        
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });

      
    } catch (error) {
      console.error("", error);
    }
  }

  // 3. Klikk-lyttere for språkvalg i nedtrekksmenyen
  if (languageOptions) {
    languageOptions.forEach(item => {
      item.addEventListener("click", () => {
        const lang = item.dataset.lang;
        if (!lang) return;
        
        localStorage.setItem("language", lang);
        if (langText) langText.textContent = lang.toUpperCase();
        translatePage(lang);
        if (dropdownLang) dropdownLang.style.display = "none";
      });
    });
  }

  // 4. Vising og skjuling av nedtrekksmeny (Dropdown)
  if (languageIcon && dropdownLang) {
    languageIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownLang.style.display = dropdownLang.style.display === "flex" ? "none" : "flex";
    });
  }

  document.addEventListener("click", () => {
    if (dropdownLang) dropdownLang.style.display = "none";
  });

  // 5. Kjør oppstartsinnstillinger
  const savedLang = localStorage.getItem("language") || "en";
  if (langText) langText.textContent = savedLang.toUpperCase();
  translatePage(savedLang);
});

// Universell komponent-injisering basert på sidetype
function injectLanguageSelector() {
  const subHeader = document.querySelector(".sub-header");
  const profileContainer = document.querySelector(".profile");

  // Felles HTML-liste over tilgjengelige språk
  const dropdownHTML = `
    <ul id="language-option">
        <li data-lang="en">English</li>
        <li data-lang="fa">فارسی</li>
        <li data-lang="ps">پښتو</li>
        <li data-lang="fr">Français</li>
        <li data-lang="de">Deutsch</li>
    </ul>
  `;

  // Situasjon A: Siden har tradisjonell .sub-header (Feks. index.html)
  if (subHeader && !document.querySelector(".language")) {
    const langTrigger = document.createElement("div");
    langTrigger.className = "language";
    langTrigger.style.marginRight = "-1.8rem";
    langTrigger.innerHTML = `
      <span id="language-icon"><i class="fa-duotone fa-solid fa-earth-americas fa-s" style="--fa-primary-opacity: 0.4; --fa-secondary-opacity: 1; margin-top: 0.6rem;"></i></span>
      <span data-translate class="lang" id="lang-text" style="font-weight: bold; font-size: 0.9rem;">EN</span> 
    `;

    const langDropdown = document.createElement("div");
    langDropdown.className = "dropdown-lang";
    langDropdown.id = "dropdown-lang";
    langDropdown.innerHTML = dropdownHTML;

    subHeader.prepend(langDropdown);
    subHeader.prepend(langTrigger);
  } 

  // profile container for admin.html and other pages
  else if (profileContainer && !document.getElementById("lang-text")) {
    const langSpan = document.createElement("span");
    langSpan.className = "language-icon";
    langSpan.id = "lang-text";
    langSpan.setAttribute("data-translate", "");
    langSpan.style.cursor = "pointer";
    langSpan.textContent = "EN";

    const langDropdown = document.createElement("div");
    langDropdown.className = "dropdown-lang";
    langDropdown.id = "dropdown-lang";
    langDropdown.style.display = "none";
    langDropdown.innerHTML = dropdownHTML;

    profileContainer.prepend(langDropdown);
    profileContainer.prepend(langSpan);
  }
}
