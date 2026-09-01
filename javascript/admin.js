// logo navigation to main home  
const logoBtn = document.getElementById("logo");

logoBtn.addEventListener("click", () =>{
    window.location.href = "./index.html";
})

// navBar
const dashboardBtn = document.getElementById("dashboard");
const Coursesbtn = document.getElementById("courses");
const studentsbtn = document.getElementById("students-btn"); 
const assessmentbtn = document.getElementById("assessment-btn");
const paymentbtn = document.getElementById("payment-btn");
const trashbtn = document.getElementById("trash-btn");
const loginIcon = document.getElementById("login")

// linked to css variable rootstyles
function CssVaraible(variableName) {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(variableName).trim();
}

//  CSS variables
const hoverColor = CssVaraible('--color-hover');
const defaultColor = CssVaraible('--text-color');

const dashboardSection = document.querySelector(".section1");
const CoursesSection = document.querySelector(".section2");
const studentsSection = document.querySelector(".section3");
const assessmentSection = document.querySelector(".section4");
const paymentSection = document.querySelector(".section5");
const trashSection = document.querySelector(".section6");

// active navmenu items
function setActiveNav(activeItem) {
    const navItems = [dashboardBtn, Coursesbtn, studentsbtn, assessmentbtn, paymentbtn, trashbtn, loginIcon];
    
    navItems.forEach(item => {
        if (item && item.classList) { 
            item.classList.remove('active');
          }
    });

    if (activeItem && activeItem.classList) {
        activeItem.classList.add('active');
    }
}
// --------------- --------------- --------------- --------------- --------------- ---------------
// navigate every navBar ul to its section
document.addEventListener("DOMContentLoaded", () => {

  // dashboard li
dashboardBtn.addEventListener("click", () => {
    dashboardSection.style.display = "flex";
    CoursesSection.style.display = "none";
    studentsSection.style.display = "none";
    assessmentSection.style.display = "none";
    paymentSection.style.display = "none";
    trashSection.style.display = "none";
    setActiveNav(dashboardBtn);
})

// courses li
Coursesbtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    CoursesSection.style.display = "flex";
    studentsSection.style.display = "none";
    assessmentSection.style.display = "none";
    paymentSection.style.display = "none";
    trashSection.style.display = "none";
    setActiveNav(Coursesbtn);
})

// students li
studentsbtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    CoursesSection.style.display = "none";
    studentsSection.style.display = "flex";
    assessmentSection.style.display = "none";
    paymentSection.style.display = "none";
    trashSection.style.display = "none";
    setActiveNav(studentsbtn);
})

// assessment li
assessmentbtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    CoursesSection.style.display = "none";
    studentsSection.style.display = "none";
    assessmentSection.style.display = "flex";
    paymentSection.style.display = "none";
    trashSection.style.display = "none";
    setActiveNav(assessmentbtn);
})

// payment li
paymentbtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    CoursesSection.style.display = "none";
    studentsSection.style.display = "none";
    assessmentSection.style.display = "none";
    paymentSection.style.display = "flex";
    trashSection.style.display = "none";
    setActiveNav(paymentbtn);
})

// trashbin li
trashbtn.addEventListener("click", () => {
    dashboardSection.style.display = "none";
    CoursesSection.style.display = "none";
    studentsSection.style.display = "none";
    assessmentSection.style.display = "none";
    paymentSection.style.display = "none";
    trashSection.style.display = "flex";
    setActiveNav(trashbtn);
})

})
// end of navBar
// added courses and save to localstorage
function getCourses(){
  return JSON.parse(localStorage.getItem("courses")) || [];
}

function setCourses(courses) {
  localStorage.setItem("courses", JSON.stringify(courses));
}

// add courses 
function addCourse(){
  const titleInput = document.getElementById("courseTitle");
  const descInput = document.getElementById("courseDesc"); 
  const priceInput = document.getElementById("coursePrice");
  const imageInput = document.getElementById("courseImage");

  const title = (titleInput.value || "").trim();
  const price = (priceInput.value || "").trim();

  if (!title || !price) {
    alert("Title and price are required");
    return;
  }

  const courses = getCourses();

  const persist = (image) => {
    courses.push({
      id: Date.now().toString(),
      title,
      price,
      image: image || "",
      videos: [],
      quizzes: [],
      createdAt: new Date().toISOString(),
    });

    setCourses(courses);
    renderCourses();

    titleInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
  };

  if (imageInput.files && imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      persist(reader.result);
    };
    reader.readAsDataURL(imageInput.files[0]); 
  } else {
    persist("");
  }
}

// render courses
function renderCourses() {
  const courses = getCourses();
  const list = document.getElementById("courseList");
  if (!list) return;
  list.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <img src="${course.image || ''}" alt="${course.title}">
      <h3>${course.title}</h3>
      <p>${course.description || ''}</p>
      <p>${course.price}$</p>
      <div class="actions">
        <button onclick="promptEditCourse('${course.id}')">Edit</button>
        <button onclick="deleteCourse('${course.id}')">Delete</button>
        <button onclick="promptAddVideo('${course.id}')">Add Video</button>
        <button onclick="promptAddQuiz('${course.id}')">Add Quiz</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function promptEditCourse(id) {
  const courses = getCourses();
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return;
  const c = courses[idx];
  const newTitle = prompt("Edit title", c.title) || c.title;
  const newPrice = prompt("Edit price", c.price) || c.price;
  courses[idx] = { ...c, title: newTitle, description: newDesc, price: newPrice };
  setCourses(courses);
  renderCourses();
}

// delete course
function deleteCourse(id) {
  const courses = getCourses().filter((c) => c.id !== id);
  setCourses(courses);
  renderCourses();
}

// add video
function addVideo(courseId, title, url) {
  const courses = getCourses();
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;
  course.videos.push({ title, url });
  setCourses(courses);
}

function promptAddVideo(courseId) {
  const title = prompt("Video title");
  if (!title) return;
  const url = prompt("Video URL (YouTube or file URL)");
  if (!url) return;
  addVideo(courseId, title, url);
}

// add quiz
function addQuiz(courseId, question, options, answer) {
  const courses = getCourses();
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;
  course.quizzes.push({ question, options, answer });
  setCourses(courses);
}

function promptAddQuiz(courseId) {
  const question = prompt("Quiz question");
  if (!question) return;
  const opts = prompt("Comma-separated options");
  if (!opts) return;
  const options = opts.split(",").map((s) => s.trim()).filter(Boolean);
  const answer = prompt("Correct answer (must match one option)");
  if (!answer) return;
  addQuiz(courseId, question, options, answer);
}

// seed students example (optional)
(function seedStudents() {
  const existing = localStorage.getItem("students");
  if (!existing) {
    const students = [
      { userId: "user123", enrolledCourses: [], progress: {} },
    ];
    localStorage.setItem("students", JSON.stringify(students));
  }
})();

function getTrash() {
  return JSON.parse(localStorage.getItem("deletedCourses")) || [];
}

function setTrash(trashCourses) {
  localStorage.setItem("deletedCourses", JSON.stringify(trashCourses));
}

function renderTrash() {
    const trash = getTrash();
    trashSectionContainer.innerHTML = '<h2>Deleted Courses (Trash Bin)</h2>'; 

    trash.forEach((course) => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
          <img src="${course.image || ''}" alt="${course.title}">
          <h3>${course.title}</h3>
          <p>Deleted on: ${new Date(course.createdAt).toLocaleDateString()}</p>
          <div class="actions">
            <button onclick="restoreCourse('${course.id}')">Restore</button>
            <button onclick="permanentlyDeleteCourse('${course.id}')">Permanent Delete</button>
          </div>
        `;
        trashSectionContainer.appendChild(card);
    });
}

function deleteCourse(id) {
  let courses = getCourses();
  let trash = getTrash();

  const [deletedCourse] = courses.filter((c) => c.id === id);
  
  if (deletedCourse) {
      // 1. Remove from active courses
      courses = courses.filter((c) => c.id !== id);
      setCourses(courses);

      // 2. Add to trash storage
      trash.push(deletedCourse);
      setTrash(trash);
      renderCourses();
      renderTrash(); 
  }
}

const trashSectionContainer = document.getElementById("trash"); 


function restoreCourse(id) {
    let courses = getCourses();
    let trash = getTrash();

    const [restoredCourse] = trash.filter(c => c.id === id);

    if (restoredCourse) {
        // Remove from trash
        trash = trash.filter(c => c.id !== id);
        setTrash(trash);

        // Add back to active courses
        courses.push(restoredCourse);
        setCourses(courses);

        renderCourses();
        renderTrash();
    }
}

function permanentlyDeleteCourse(id) {
    // This removes the item entirely from localStorage
    const trash = getTrash().filter((c) => c.id !== id);
    setTrash(trash);
    renderTrash();
    alert("Course permanently deleted.");
}

// init
function initAdmin() {
  const logoIcon = document.getElementById("logo");
  if (logoIcon) {
    logoIcon.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
  const addBtn = document.getElementById("addCourseBtn");
  if (addBtn) {
    addBtn.addEventListener("click", addCourse);
  }
  renderCourses();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdmin);
} else {
  initAdmin();
}

// Expose handler functions to the global window scope for inline onclick to work
window.addCourse = addCourse; 
window.promptEditCourse = promptEditCourse;
window.deleteCourse = deleteCourse;
window.promptAddVideo = promptAddVideo;
window.promptAddQuiz = promptAddQuiz;
window.renderTrash = renderTrash;
window.restoreCourse = restoreCourse;
window.permanentlyDeleteCourse = permanentlyDeleteCourse;

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







