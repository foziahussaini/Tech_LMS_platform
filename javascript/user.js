// language Part
document.addEventListener("DOMContentLoaded", () => {
  const langText = document.getElementById("lang-text");
  const languageOptions = document.querySelectorAll("#language-option li");

  // FIXED: Moved function inside DOMContentLoaded context securely
  function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.dataset.key;

      if (!key) return; 
      // Safely fallback if translations dictionary isn't loaded globally
      const translated = typeof translations !== 'undefined' && translations[lang] && translations[lang][key];
      if (translated) {
        el.textContent = translated;
      } else if (typeof translations !== 'undefined' && translations.en) {
        el.textContent = translations.en[key] || el.textContent;
      }
    });
  }

  if (languageOptions) {
    languageOptions.forEach(item => {
      item.addEventListener("click", () => {
        const lang = item.dataset.lang;
        if (!lang) return;
        localStorage.setItem("language", lang);
        if (langText) langText.textContent = lang.toUpperCase();
        translatePage(lang);
      });
    });
  }

  const savedLang = localStorage.getItem("language") || "en";
  if (langText) langText.textContent = savedLang.toUpperCase();
  translatePage(savedLang);
});

// displaying dropdown menu by clicking on language icon
const languageIcon = document.getElementById("lang-text");
const dropdownLang = document.querySelector(".dropdown-lang");
const language = document.querySelectorAll("#language-option li");

if (languageIcon && dropdownLang) {
  languageIcon.addEventListener("click", () => {
    if (dropdownLang.style.display === "flex") {
      dropdownLang.style.display = "none";
    } else {
      dropdownLang.style.display = "flex";
    }
  });
}

if (language && dropdownLang) {
  language.forEach((option) => {
    option.addEventListener("click", () => {
      dropdownLang.style.display = "none";
    });
  });
}
// end of language part
// --------------------- --------------------- --------------------- ---------------------
// header part
const logoBtn = document.getElementById("logo");
const dashboard = document.querySelector("#dashboard");
const myCourseBtn = document.querySelector("#my-courses");
const progress = document.querySelector("#explore"); 
const langIcon = document.getElementById("lang-text");
const fullScreen = document.getElementById("toggle-screen");
const notif = document.getElementById("notification");
const myProfile = document.getElementById("prof-picture");

// linked to css variable rootstyles
function CssVaraible(variableName) {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(variableName).trim();
}

//  CSS variables
const hoverColor = CssVaraible('--color-hover');
const defaultColor = CssVaraible('--text-color');

// logo navigation to main home 
if (logoBtn) {
  logoBtn.addEventListener("click", () =>{
      window.location.href = "./index.html";
  });
}

// dashboard navigate to dashboard section
const dashboardSection = document.getElementById("dashboard-container");
const progressSection = document.getElementById("explore-container");
const myCourses = document.getElementById("courses-container");

// active navmenu items
function setActiveNav(activeItem) {
    const navItems = [dashboard, myCourseBtn, progress];
    
    navItems.forEach(item => {
        if (item) {
          if (item === activeItem) {
              item.style.color = hoverColor; 
          } else {
              item.style.color = defaultColor; 
          }
        }
    });
}

// dashboard navigate to dashboard section
if (dashboard && dashboardSection) {
  dashboard.addEventListener("click", () => {
      dashboardSection.style.display = "flex";
      if (progressSection) progressSection.style.display = "none";
      if (myCourses) myCourses.style.display = "none";
      setActiveNav(dashboard);
  });
}

// mycourse navigate to mycourse section
if (myCourseBtn && progressSection) {
  myCourseBtn.addEventListener("click", () =>{
      if (dashboardSection) dashboardSection.style.display = "none";
      progressSection.style.display = "flex"; 
      if (myCourses) myCourses.style.display = "none";
      setActiveNav(myCourseBtn);
  });
}

// progress li navigate to progress section 
if (progress && myCourses) {
  progress.addEventListener("click", () =>{
      if (dashboardSection) dashboardSection.style.display = "none";
      if (progressSection) progressSection.style.display = "none";
      myCourses.style.display = "flex"; 
      setActiveNav(progress);
  });
}

// navmenu hover event 
const navItems = [dashboard, myCourseBtn, progress];

navItems.forEach(item => {
    if (item) {
        item.style.transition = "background-color 0.3s ease-in-out, color 0.3s ease-in-out";

        item.addEventListener("mouseover", () => {
          item.style.color = hoverColor; 
        });
        item.addEventListener('mouseleave', () => {
            let correspondingSection;
            if (item === dashboard) correspondingSection = dashboardSection;
            else if (item === myCourseBtn) correspondingSection = progressSection; 
            else if (item === progress) correspondingSection = myCourses; 

            if (correspondingSection && correspondingSection.style.display === 'flex') {
                item.style.color = hoverColor; 
            } else {
                item.style.color = defaultColor; 
            }
        });
    }
});

// explore courses part
document.addEventListener("DOMContentLoaded", () => {
  const selectIcon = document.getElementById("icon");
  const dropdownCategories = document.getElementById("categoriesMenu");

  if (selectIcon && dropdownCategories) {
    selectIcon.addEventListener("click", () => {
      if (dropdownCategories.style.display === "none") {
        dropdownCategories.style.display = "flex";
      } else {
        dropdownCategories.style.display = "none";
      }
    });
  }

  const categoriesItems = document.querySelectorAll(".menu-item");
  const resultsDisplay = document.getElementById("resultsDisplay");
  const loadingMessage = document.getElementById("loadingMessage");
  
  if (categoriesItems) {
    categoriesItems.forEach((item) => {
      item.addEventListener("click", (event) => {
          if (item.tagName === 'A') {
              event.preventDefault(); 
          }
          if (loadingMessage) {
              loadingMessage.textContent = "Loading... please wait.";
          }

          categoriesItems.forEach(i => {
              i.classList.remove('active');
              i.style.color = ''; 
          });

          item.classList.add('active'); 
          if (dropdownCategories) dropdownCategories.style.display = "none";
          item.style.color = hoverColor;

          if (resultsDisplay && (item.innerHTML.trim() === "Mathematics" || item.innerHTML.trim() === "Game Development")) {
              resultsDisplay.style.display = "flex";
              return;
          }
          
          setTimeout(() => {
              window.location.href = "./index.html#courses-field";
          }, 1000);
      });
    });
  }
});

// my courses part
document.addEventListener("DOMContentLoaded", () => {
  const selectsIcon = document.getElementById("icons");
  const dropdownCategorie = document.getElementById("categoriesDropdown");

  if (selectsIcon && dropdownCategorie) {
    selectsIcon.addEventListener("click", () => {
      if (dropdownCategorie.style.display === "none") {
        dropdownCategorie.style.display = "flex";
      } else {
        dropdownCategorie.style.display = "none";
      }
    });
  }

  const categoriesItem = document.querySelectorAll(".menu-item");
  const resultsDisplay = document.getElementById("resultsDisplay");
  const loadingMessage = document.getElementById("loadingMessage");
  
  if (categoriesItem) {
    categoriesItem.forEach((item) => {
      item.addEventListener("click", (event) => {
          if (item.tagName === 'A') {
              event.preventDefault(); 
          }
          if (loadingMessage) {
              loadingMessage.textContent = "Loading... please wait.";
          }

          categoriesItem.forEach(i => {
              i.classList.remove('active');
              i.style.color = ''; 
          });

          item.classList.add('active'); 
          if (dropdownCategorie) dropdownCategorie.style.display = "none";
          item.style.color = hoverColor;

          if (resultsDisplay && (item.innerHTML.trim() === "Mathematics" || item.innerHTML.trim() === "Game Development")) {
              resultsDisplay.style.display = "flex";
              return;
          }
          
          setTimeout(() => {
              window.location.href = "./index.html#courses-field";
          }, 1000);
      });
    });
  }
});
