// language Part
document.addEventListener("DOMContentLoaded", () => {
  const langText = document.getElementById("lang-text");
  const languageOptions = document.querySelectorAll("#language-option li");

  function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.dataset.key;

      if (!key) return; 
      // Safely check if translations global object exists before reading properties
      const translated = typeof translations !== 'undefined' && translations[lang] && translations[lang][key];
      if (translated) {
        el.textContent = translated;
      } else if (typeof translations !== 'undefined' && translations.en) {
        el.textContent = translations.en[key] || el.textContent;
      }
    });
  }

  languageOptions.forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;
      if (!lang) return;
      localStorage.setItem("language", lang);
      if (langText) langText.textContent = lang.toUpperCase();
      translatePage(lang);
    });
  });

  const savedLang = localStorage.getItem("language") || "en";
  if (langText) langText.textContent = savedLang.toUpperCase();
  translatePage(savedLang);
});

// displaying dropdown menu by clicking on language icon
const languageIcon = document.getElementById("language-icon");
const dropdownLang = document.querySelector(".dropdown-lang");
const language = document.querySelectorAll("#language-option li");

// FIXED: Condition added to stop crashes if languageIcon is missing
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

// sign up form validation
const signUp = document.getElementById("btn");
const inputs = document.querySelectorAll("input[required]");

// FIXED: Condition added to stop crashes if signup button is missing
if (signUp) {
  signUp.addEventListener("click", (event) => {
      event.preventDefault(); 
      let allInputsFilled = true;

       inputs.forEach(input => {
          if (input.value.trim() === "") {
              allInputsFilled = false;
          }
      });
      
      const passwordEl = document.getElementById("password");
      const confirmPasswordEl = document.getElementById("confirm-password");
      const password = passwordEl ? passwordEl.value : "";
      const confirmPassword = confirmPasswordEl ? confirmPasswordEl.value : "";

      if (!allInputsFilled) {
          alert("Please fill all the required fields.");
      } else if (password !== confirmPassword) {
          alert("Passwords do not match.");
      } else {
           const nameEl = document.getElementById("name");
           const lastNameEl = document.getElementById("last-name");
           const professionEl = document.getElementById("profession");
           const countryEl = document.getElementById("country");
           const emailEl = document.getElementById("email");

           const formData = {
              name: nameEl ? nameEl.value : "",
              lastName: lastNameEl ? lastNameEl.value : "",
              profession: professionEl ? professionEl.value : "",
              country: countryEl ? countryEl.value : "",
              email: emailEl ? emailEl.value : "",
              password: password 
          };

          const formDataJSON = JSON.stringify(formData);
          localStorage.setItem("registrationData", formDataJSON);
        
          const userRole = professionEl ? professionEl.value : "";
          localStorage.setItem("userRole", userRole);

          // Perform the redirection immediately here:
          if (userRole === "student") {
            window.location.href = "./user.html";
          } else if (userRole === "admin") {
            window.location.href = "admin.html";
          } else {
              alert("Invalid profession specified. Cannot navigate.");
          }
      }
  });
}
// End of sign up form validation

// signup btn hover
const signUpBtn = document.querySelector("button[type='submit']");

function CssVaraible(variableName) {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(variableName).trim();
}

// FIXED: Condition added to stop crashes if submit button is missing
if (signUpBtn) {
  //  CSS variables
  const hoverColor = CssVaraible('--color-hover');
  const defaultColor = CssVaraible('--bg-color');

  signUpBtn.style.transition = "background-color 0.3s ease-in-out";

  signUpBtn.addEventListener("mouseover", () => {
    if (hoverColor) signUpBtn.style.backgroundColor = hoverColor; 
  });

  signUpBtn.addEventListener("mouseleave", () => {
    if (defaultColor) signUpBtn.style.backgroundColor = defaultColor;
  });
}
