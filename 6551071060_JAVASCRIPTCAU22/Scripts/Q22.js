const API_URL = "https://68f982ecef8b2e621e7c4e26.mockapi.io/api/v1/CV";

document.getElementById("addSkill").addEventListener("click", function(e) {
  e.preventDefault();
  const skillList = document.getElementById("skillList");
  const newSkill = document.createElement("div");
  newSkill.classList.add("skill-row");
  newSkill.innerHTML = `
    <input type="text" placeholder="Tên kỹ năng" class="skill-name" required>
    <input type="range" min="0" max="100" step="10" class="skill-level">
  `;
  skillList.insertBefore(newSkill, this);
});

document.getElementById("cvForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const job = document.getElementById("job").value;

  const avatarInput = document.getElementById("avatar");
  let avatarURL = "https://i.pravatar.cc/150?img=5"; 
  if (avatarInput.files && avatarInput.files[0]) {
    avatarURL = URL.createObjectURL(avatarInput.files[0]);
  }

  const skills = [];
  document.querySelectorAll(".skill-row").forEach(row => {
    const name = row.querySelector(".skill-name").value;
    const level = row.querySelector(".skill-level").value;
    if (name.trim() !== "") skills.push({ name, level });
  });

  const cvData = { name, address, phone, email, job, avatar: avatarURL, skills };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cvData)
  })
  .then(res => {
    if (!res.ok) throw new Error("Lỗi khi gửi dữ liệu!");
    return res.json();
  })
  .then(() => {
    alert("Đăng ký thành công!");
    loadCVs();
    document.getElementById("cvForm").reset();
  })
  .catch(err => alert("Lỗi Ajax: " + err.message));
});

function loadCVs() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error("Không thể tải dữ liệu!");
      return res.json();
    })
    .then(data => {
      const list = document.getElementById("cvList");
      list.innerHTML = "";
      data.forEach(cv => {
        let skillsHTML = "";
        cv.skills.forEach(s => {
          skillsHTML += `
            <p>${s.name}</p>
            <div class="progress">
              <div class="progress-bar" style="width:${s.level}%">${s.level}%</div>
            </div>`;
        });
        list.innerHTML += `
          <div class="cv-card">
            <img src="${cv.avatar}" alt="Avatar">
            <h3>${cv.name}</h3>
            <p>${cv.job}</p>
            <p>📍 ${cv.address}</p>
            <p>📞 ${cv.phone}</p>
            <p>✉️ ${cv.email}</p>
            <h4>Kỹ năng</h4>
            ${skillsHTML}
          </div>
        `;
      });
    })
    .catch(err => alert("Lỗi tải dữ liệu: " + err.message));
}

loadCVs();
