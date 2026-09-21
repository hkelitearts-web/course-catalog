// ==============================
// 在這裡管理你的所有課程
// ==============================
const courses = [
  {
    id: 1,
    title: "初級鋼琴一對一",
    teacher: "老師A",
    category: "鋼琴",
    type: "線下",
    description: "適合零基礎學生，建立正確手型與節奏感。",
    bookingUrl: "https://cal.com/你的帳號/piano-teacher-a"
  },
  {
    id: 2,
    title: "音樂理論基礎",
    teacher: "老師B",
    category: "理論",
    type: "線上",
    description: "從五線譜開始，系統學習基礎樂理。",
    bookingUrl: "https://cal.com/你的帳號/theory-teacher-b"
  },
  {
    id: 3,
    title: "小提琴進階班",
    teacher: "老師A",
    category: "小提琴",
    type: "線下",
    description: "針對已有基礎的學生，提升技巧與音樂性。",
    bookingUrl: "https://cal.com/你的帳號/violin-teacher-a"
  }
  // 繼續往下加其他課程...
];

// 目前的篩選條件
let filters = {
  type: "all",
  category: "all",
  teacher: "all"
};

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  generateFilterButtons();
  renderCourses();
  setupFilterEvents();
});

// 自動產生類別和老師的篩選按鈕
function generateFilterButtons() {
  const categories = [...new Set(courses.map(c => c.category))];
  const teachers = [...new Set(courses.map(c => c.teacher))];

  const categoryContainer = document.getElementById("category-buttons");
  const teacherContainer = document.getElementById("teacher-buttons");

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = "category";
    btn.dataset.value = cat;
    btn.textContent = cat;
    categoryContainer.appendChild(btn);
  });

  teachers.forEach(teacher => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = "teacher";
    btn.dataset.value = teacher;
    btn.textContent = teacher;
    teacherContainer.appendChild(btn);
  });
}

// 綁定篩選按鈕事件
function setupFilterEvents() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const filterType = btn.dataset.filter;
      const value = btn.dataset.value;

      // 更新同一組的 active 狀態
      document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      // 更新篩選條件
      filters[filterType] = value;
      renderCourses();
    });
  });
}

// 根據篩選條件顯示課程
function renderCourses() {
  const list = document.getElementById("course-list");
  list.innerHTML = "";

  const filtered = courses.filter(course => {
    const matchType = filters.type === "all" || course.type === filters.type;
    const matchCategory = filters.category === "all" || course.category === filters.category;
    const matchTeacher = filters.teacher === "all" || course.teacher === filters.teacher;
    return matchType && matchCategory && matchTeacher;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p style='grid-column:1/-1; text-align:center; padding:40px;'>目前沒有符合條件的課程</p>";
    return;
  }

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <div class="meta">老師：${course.teacher}</div>
      <div class="tags">
        <span class="tag \( {course.type === '線上' ? 'online' : 'offline'}"> \){course.type}</span>
        <span class="tag">${course.category}</span>
      </div>
      <div class="description">${course.description}</div>
      <a href="${course.bookingUrl}" target="_blank" class="book-btn">立即預約</a>
    `;
    list.appendChild(card);
  });
}
