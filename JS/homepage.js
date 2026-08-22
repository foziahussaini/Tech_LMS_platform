

// *************************************************************************************

// All button hover method 
// dynamix-btn at header hover and dropdown show for details
  const dynamixBtn = document.getElementById('dynamix-btn');
  const dropdownDetails = document.getElementById('dropdown-details');

    dynamixBtn.addEventListener('click', function() {
        dropdownDetails.classList.toggle('active');
    });

    // linked to css variable rootstyles
    // fuction CSS variable
function CssVaraible(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

//  CSS variables
const hoverColor = CssVaraible('--color-hover');
const defaultColor = CssVaraible('--bg-color');
dynamixBtn.style.transition = "background-color 0.3s ease-in-out";

// dynamix btn hover
dynamixBtn.addEventListener("mouseover", () => {
  dynamixBtn.style.backgroundColor = hoverColor; 
});

dynamixBtn.addEventListener("mouseleave", () => {
    dynamixBtn.style.backgroundColor = defaultColor;
});

// searchbar icon hover and dropdown show for searching
const searchIcon = document.getElementById("searchIcon")
const searchBarDropdown = document.getElementById("searchbardropdown");

        
searchIcon.addEventListener('click', () => {
  searchBarDropdown.classList.toggle('active');
});

// search input work with enter key and search for data inside the site and show result
function clickEnter(event) {
    if (event.key === 'Enter') {
        searchData();
    }
}

function searchData() {
    const searchData = document.getElementById('search').value;

    if (searchData.trim() === "") {
      alert("Please enter a search term.");
         return;
   }

    localStorage.setItem('lastSearchData', searchData);
}

// header navbar ul >li hover and active
const liMenu = document.querySelectorAll("li");
liMenu.forEach(li =>{
  li.addEventListener("click", () => {
    liMenu.forEach(item => 
    item.classList.remove("active"));
    li.classList.add("active");
  })
})

// services btn at first section hover
const ServicesBtn = document.getElementById("services-btn");

//  CSS variables
const hoveredColor = CssVaraible('--color-hover');
const defaultsColor = CssVaraible('--bg-color');
ServicesBtn.style.transition = "background-color 0.3s ease-in-out";

ServicesBtn.addEventListener("mouseover", () => {
  ServicesBtn.style.backgroundColor = hoveredColor; 
});

ServicesBtn.addEventListener("mouseleave", () => {
    ServicesBtn.style.backgroundColor = defaultsColor;
});

// card-name hover in section 3 
const cardbtn = document.querySelectorAll(".card-name");
const defaultColors = CssVaraible('--bg2-color');

cardbtn.forEach(card => {
  card.addEventListener("mouseover", () =>{
    card.style.transition = "background-color 0.5s ease-in-out";
    card.style.backgroundColor = hoverColor;
  });
});

cardbtn.forEach(card => {
  card.addEventListener("mouseleave", () => {
    card.style.backgroundColor = defaultColors;
  });
});

// get involved btn hover section 4
const involvedBtns = document.querySelectorAll(".involved-btn"); 
const defaultsColors = CssVaraible('--bg2-color');

involvedBtns.forEach(involvedBtn => {
  involvedBtn.addEventListener("mouseover", () =>{
    involvedBtn.style.backgroundColor = hoverColor;
});

involvedBtn.addEventListener("mouseleave", () => {
    involvedBtn.style.backgroundColor = defaultsColors;
});

});

// email button hover section 5
const emailBtn = document.getElementById("emailbtn");
emailBtn.addEventListener("mouseover", () =>{
  emailBtn.style.backgroundColor = hoverColor;
})
emailBtn.addEventListener("mouseleave", () =>{
  emailBtn.style.backgroundColor = defaultsColors;
})

// hover enroll btns in section6
const enrollBtns = document.querySelectorAll("button");
enrollBtns.forEach(enrollBtn => {
  enrollBtn.addEventListener("mouseover", () =>{
    enrollBtn.style.transition = "background-color 0.5s ease-in-out";
    enrollBtn.style.backgroundColor = hoverColor;
})
});

enrollBtns.forEach(enrollBtn => {
  enrollBtn.addEventListener("mouseleave", () => {
    enrollBtn.style.backgroundColor = defaultColor;
});
});
// all hover methods end
// **************************************************************
// linked and navigated options parts and pages 

// login button link to login page
const isLoggedIn = () => !!localStorage.getItem("userRole");
const loginBtn = document.getElementById("login");
const signOutBtn = document.getElementById("sign-out");
const userDropdown = document.getElementById("user-dropdown");
const userEmailElement = document.getElementById("user-email");
const userRoleElement = document.getElementById("user-role")

// Function to simulate a successful login
function simulateLogin() {
    // these values come from an authentication response
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("userEmail", "user@example.com");
    console.log("User logged in.");
    updateUI();
}
// sign out function for user signout
function signOut() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    console.log("User signed out.");
    updateUI();
    userDropdown.style.display = "none";
}
// Function to update the button and dropdown state
function updateUI() {
    if (isLoggedIn()) {
        // If logged in: update dropdown content and change button text if needed
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const email = localStorage.getItem("userEmail");
        const role = localStorage.getItem("userRole");
        userEmailElement.textContent = email;
        userRoleElement.textContent = role;
        userDropdown.style.display = "none";
  // if logged in login button change to user name
        const userName = (firstName && lastName) ? `${firstName} ${lastName}` : email || "User Profile";
        loginBtn.innerHTML = `<span class="user">${userName}</span>`;
    } else {
  // If logged out: change button text back to "Login"
        loginBtn.textContent = "Login";
    }
}
// show dropdown by clicking the login btn and navigate to register form if not logged in
loginBtn.addEventListener("click", () => {
    if (isLoggedIn() || userDropdown.style.display === "none") {
        userDropdown.style.display = "flex";
    } else {
         userDropdown.style.display = "none";
         window.location.href = "./register.html"
    }
});

signOutBtn.addEventListener("click", signOut);
updateUI();

// navbar links to sections
  const menuItems = document.querySelectorAll(".navBar li");
  const ServiceLinks = document.querySelectorAll("[data-target]");

  // dashboard li navBar btn navigate to user dashboard and admin dashboard
  const dashboardBtn = document.getElementById("dashboard");
  dashboardBtn.addEventListener("click", () =>{
    const userRole = localStorage.getItem("userRole");

    if(userRole === "student"){
      window.location.href = "./user.html";
    }else if (userRole === "admin"){
      window.location.href = "./admin.html";
    }else{
      alert("please login  again");
      window.location.href = "./register.html";
    }
  });

  // services button navigation section1 to section4
  ServiceLinks.forEach(btn => {  
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const section = document.getElementById(targetId);

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


// courses card navigation to subjects section6
const courseCards = document.querySelectorAll(".card-name");
courseCards.forEach(card => {
  card.addEventListener("click", () => {
    const subjectsSection = document.getElementById("all-fields");
    subjectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
})

// navigation email button to contact section5
const emailButton = document.getElementById("emailbtn");
emailButton.addEventListener("click", () => {
  const contactSection = document.getElementById("email");
  contactSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// **************************************************************
// slider part for courses section3
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cards = Array.from(document.querySelectorAll(".section3 .card"));

const visibleCount = 3;
let startIndex = 0;

function updateSlider() {
  cards.forEach((card, index) => {
    if (index >= startIndex && index < startIndex + visibleCount) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// next button
nextBtn.addEventListener("click", () => {
  if (startIndex + visibleCount < cards.length) {
    startIndex += visibleCount;
  }
  updateSlider();
});

// prev button
prevBtn.addEventListener("click", () => {
  if (startIndex - visibleCount >= 0) {
    startIndex -= visibleCount;
  }
  updateSlider();
});

// initialize
updateSlider();


// previous and next buttons for subjects section6 
const prevSubjects = document.querySelector(".prev-subjects");  
const nextSubjects = document.querySelector(".next-subjects");
const subjects = Array.from(document.querySelectorAll(".subjects"));

// default to Development subject (class 'third') if available
let defaultIndex = subjects.findIndex(s => s.classList.contains('third') || s.className.toLowerCase().includes('third'));
let currentSubject = defaultIndex >= 0 ? defaultIndex : 0;
let currentPage = 0;

function showSubject(newIndex, direction = "right") {
  if (newIndex === currentSubject) return;

  const prev = subjects[currentSubject];
  const next = subjects[newIndex];

  // hide previous immediately
  if (prev) {
    prev.style.display = "none";
    prev.classList.remove("slide-in-left", "slide-in-right", "active");
  }

  // prepare next and animate in
  if (next) {
    next.style.display = "flex";
    next.classList.remove("slide-in-left", "slide-in-right");
   
    void next.offsetWidth;
    next.classList.add(direction === "left" ? "slide-in-left" : "slide-in-right", "active");
    // reset to first page for the newly shown group
    currentPage = 0;
    renderPage(next, currentPage);
  }

  currentSubject = newIndex;
}


// initialize: hide all except the default subject
if (subjects.length) {
  subjects.forEach((s, i) => {
    if (i === currentSubject) {
      s.style.display = "flex";
      s.classList.add("active");
      renderPage(s, currentPage);
    } else {
      s.style.display = "none";
    }
  });

  // wire up field buttons to filter subjects by index (buttons order matches subject groups)
  const fields = Array.from(document.querySelectorAll('.field'));
  fields.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (idx >= subjects.length) return; 
      const direction = idx < currentSubject ? 'left' : 'right';
      showSubject(idx, direction);
      // toggle active class on buttons
      fields.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      if( btn.classList.add('active')){
        btn.style.borderBottom = "2px solid gray";
      }else{
        btn.style.borderBottom = "none";
      }
    });
  });

  // prev/next should page within the currently visible subject group (4 items per page)
  nextSubjects && nextSubjects.addEventListener("click", () => {
    const subs = Array.from(subjects[currentSubject].querySelectorAll('.sub'));
    const pages = Math.max(1, Math.ceil(subs.length / 4));
    currentPage = (currentPage + 1) % pages;
    renderPage(subjects[currentSubject], currentPage);
  });

  prevSubjects && prevSubjects.addEventListener("click", () => {
    const subs = Array.from(subjects[currentSubject].querySelectorAll('.sub'));
    const pages = Math.max(1, Math.ceil(subs.length / 4));
    currentPage = (currentPage - 1 + pages) % pages;
    renderPage(subjects[currentSubject], currentPage);
  });

// render a page of .subjects group
function renderPage(subjectEl, pageIndex) {
  if (!subjectEl) return;
  const subs = Array.from(subjectEl.querySelectorAll('.sub'));
  const perPage = 4;
  subs.forEach((sub, i) => {
    sub.style.display = (i >= pageIndex * perPage && i < (pageIndex + 1) * perPage) ? 'flex' : 'none';
  });
}

// navigate to register from by enrolling the courses
  document.querySelectorAll('.enroll-btn').forEach(button => {
    button.addEventListener('click', function() {
      if (!isLoggedIn()) {
        window.location.href = "./register.html";
      } 
    });
  });
}
 

// section six hover enrollbtn and active field
document.addEventListener('DOMContentLoaded', (event) => {
    const courseFields = document.querySelectorAll(".field");

    courseFields.forEach(field => {
      field.addEventListener("mouseover", () =>{
        field.style.transition = "color 0.5s ease-in-out";
        field.style.backgroundColor = hoverColor;
    });
    });

    courseFields.forEach(field => {
      field.addEventListener("mouseleave", () => {
        field.style.backgroundColor = "transparent";
    });
  }); 

    courseFields.forEach(field => {
      field.addEventListener("click", () => {
        courseFields.forEach(sub => {
          sub.classList.remove("active");
        });
      field.classList.add("active");
    });
  });
});

// ---------- ----------- ----------- ----------- ----------- ----------- ------------
// for admin edits part
// logo function 
function initializeLogo() {
    const logo = localStorage.getItem("siteLogo");
    if (logo) {
        const logoImg = document.querySelector(".logo img");
        if (logoImg) logoImg.src = logo;
    }
}

// added courses by admin here
function getCourses() {
    return JSON.parse(localStorage.getItem("courses")) || [];
}

// Function to generate the HTML structure for a single course card (sub div)
function createCourseCard(course) {
    const card = document.createElement("div");
    card.className = "sub"; 

    card.setAttribute("data-id", course.id);
    card.setAttribute("data-title", course.title);
    card.setAttribute("data-image", course.image || './images/placeholder.jpg'); // Use a placeholder if image is missing
    card.setAttribute("data-price", `$${course.price}`);

    card.innerHTML = `
        <img src="${course.image || './images/placeholder.jpg'}" alt="${course.title}">
        <h4>${course.title}</h4>
        <div class="enroll-btn">
            <p>$${course.price}</p>
            <button class="enrolled-btn">Enroll</button>
        </div>
    `;
    return card;
}

// enrollemnet btn of courses
function renderAdminCourses() {
    const targetContainer = document.querySelector(".subjects.first"); 
    
    if (!targetContainer) {
        console.error("Target container not found for admin courses.");
        return;
    }

    const courses = getCourses();

    if (courses.length === 0) {
  return;
    }

    courses.forEach(course => {
        const card = createCourseCard(course);
        targetContainer.appendChild(card);
    });
}

function enrollmentListeners() {
   document.querySelectorAll('.sub').forEach(course => {
      const enrollBtn = course.querySelector('.enrolled-btn');

      if (!enrollBtn) return;

      enrollBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
           window.location.href = "./register.html";
          return;
        }

        const courseData = {
          id: course.dataset.id || Date.now().toString(),
          title: course.dataset.title || course.querySelector("h4")?.innerText,
          image: course.dataset.image || course.querySelector("img")?.src,
          price: course.dataset.price || ("free"),
          progress: 2
        };

        if(!courseData.title || !courseData.image){
          alert("course data missed!");
            return;
        }

        let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

        // prevent duplicate enrollment
        const alreadyEnrolled = enrolledCourses.some(c => c.id === courseData.id);
        if (!alreadyEnrolled) {
          enrolledCourses.push(courseData);
          localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
        }

        window.location.href = "./user.html";
      });
    });
}

// initialize
document.addEventListener("DOMContentLoaded", () => {

  renderAdminCourses();
  enrollmentListeners();
});







