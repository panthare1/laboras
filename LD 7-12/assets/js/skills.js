/*==============================================================
  skills.js – LD12: vartotojo kompetencijų pažangos modulis
  Įgūdžių progreso lenta (Skill Kanban), XP / lygiai / rangai,
  progreso juosta, statistika, ikonėlė pagal lygį,
  Local Storage ir pasiekimai (papildoma užduotis).
==============================================================*/
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const board = document.getElementById("pmBoard");
  if (!board) return;

  /* ---------- Duomenys ---------- */
  const STATUSES = ["Planuojama", "Mokomasi", "Atlikta"];
  const STORAGE_KEY = "cvSkillBoard-v2";

  // Pradinė būsena: 7 įgūdžiai, XP 30–80, bendra suma 370 XP (≥ 300)
  const DEFAULT_SKILLS = [
    { id: 1, name: "Python", status: "Atlikta", xp: 40 },
    { id: 2, name: "C ir C++", status: "Atlikta", xp: 60 },
    { id: 3, name: "Git ir GitHub", status: "Atlikta", xp: 30 },
    { id: 4, name: "Duomenų analizė (Pandas)", status: "Mokomasi", xp: 50 },
    { id: 5, name: "Mašininis mokymasis", status: "Mokomasi", xp: 80 },
    { id: 6, name: "LLM programų kūrimas", status: "Planuojama", xp: 70 },
    { id: 7, name: "Docker", status: "Planuojama", xp: 40 },
  ];

  // Lygių ir rangų lentelė
  const LEVELS = [
    { level: 1, min: 0, max: 50, rank: "Pradedantysis" },
    { level: 2, min: 50, max: 150, rank: "Praktikantas" },
    { level: 3, min: 150, max: 300, rank: "Specialistas" },
    { level: 4, min: 300, max: Infinity, rank: "Profesionalas" },
  ];

  // Pasiekimai (papildoma užduotis)
  const ACHIEVEMENTS = [
    { id: "discoverer", title: "Įgūdžių atradėjas", desc: "Atlikite bent 1 įgūdį", icon: "bi-compass" },
    { id: "master", title: "Įgūdžių meistras", desc: "Atlikite bent 4 įgūdžius", icon: "bi-award" },
    { id: "expert", title: "Įgūdžių ekspertas", desc: "Pasiekite 4 lygį", icon: "bi-trophy" },
  ];

  let skills = loadSkills();
  let previousLevel = null;

  /* ==========================================================
     1. Local Storage: išsaugojimas ir atkūrimas
  ========================================================== */
  function cloneDefaults() {
    return DEFAULT_SKILLS.map(function (s) { return Object.assign({}, s); });
  }

  function loadSkills() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved)) {
        // Atkuriame tik būsenas, likę duomenys – iš pradinio masyvo
        return cloneDefaults().map(function (skill) {
          const found = saved.find(function (s) { return s.id === skill.id; });
          if (found && STATUSES.includes(found.status)) skill.status = found.status;
          return skill;
        });
      }
    } catch (e) {
      /* saugykla nepasiekiama arba sugadinta – naudojame pradinę būseną */
    }
    return cloneDefaults();
  }

  function saveSkills() {
    try {
      const data = skills.map(function (s) { return { id: s.id, status: s.status }; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* saugykla nepasiekiama – modulis veikia ir be jos */
    }
  }

  /* ==========================================================
     2. Kortelių ir stulpelių atvaizdavimas
  ========================================================== */
  function createSkillCard(skill) {
    const card = document.createElement("article");
    card.className = "pm-card";
    card.dataset.id = skill.id;

    const top = document.createElement("div");
    top.className = "pm-card-top";

    const title = document.createElement("h4");
    title.textContent = skill.name;

    const xp = document.createElement("span");
    xp.className = "pm-xp";
    xp.textContent = skill.xp + " XP";

    top.append(title, xp);

    // Būsenos keitimo mygtukai
    const actions = document.createElement("div");
    actions.className = "pm-card-actions";
    actions.setAttribute("role", "group");
    actions.setAttribute("aria-label", "Keisti būseną: " + skill.name);

    STATUSES.forEach(function (status) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = status;
      if (status === skill.status) {
        btn.classList.add("is-current");
        btn.disabled = true;
        btn.setAttribute("aria-pressed", "true");
      }
      btn.addEventListener("click", function () {
        changeStatus(skill.id, status);
      });
      actions.appendChild(btn);
    });

    card.append(top, actions);
    return card;
  }

  function renderBoard() {
    board.innerHTML = "";

    STATUSES.forEach(function (status) {
      const column = document.createElement("div");
      column.className = "pm-column";
      column.dataset.status = status;

      const columnSkills = skills.filter(function (s) { return s.status === status; });

      const head = document.createElement("div");
      head.className = "pm-column-head";
      const h3 = document.createElement("h3");
      h3.textContent = status;
      const count = document.createElement("span");
      count.className = "pm-count";
      count.textContent = columnSkills.length;
      head.append(h3, count);
      column.appendChild(head);

      if (columnSkills.length === 0) {
        const empty = document.createElement("p");
        empty.className = "pm-empty";
        empty.textContent = "Įgūdžių nėra";
        column.appendChild(empty);
      }

      columnSkills.forEach(function (skill) {
        column.appendChild(createSkillCard(skill));
      });

      board.appendChild(column);
    });
  }

  /* ==========================================================
     3. Būsenos keitimas
  ========================================================== */
  function changeStatus(id, newStatus) {
    const skill = skills.find(function (s) { return s.id === id; });
    if (!skill || skill.status === newStatus) return;
    skill.status = newStatus;

    saveSkills();
    renderBoard();
    updateProgress();

    // Paryškiname perkeltą kortelę naujame stulpelyje
    const moved = board.querySelector('.pm-card[data-id="' + id + '"]');
    if (moved) moved.classList.add("just-moved");
  }

  /* ==========================================================
     4. XP, lygiai ir rangai
  ========================================================== */
  function calculateXp() {
    // Įskaičiuojami tik „Atlikta“ būsenos įgūdžiai
    return skills
      .filter(function (s) { return s.status === "Atlikta"; })
      .reduce(function (sum, s) { return sum + s.xp; }, 0);
  }

  function getLevelInfo(xp) {
    if (xp >= 300) return LEVELS[3];
    else if (xp >= 150) return LEVELS[2];
    else if (xp >= 50) return LEVELS[1];
    else return LEVELS[0];
  }

  /* ==========================================================
     5. Progreso juosta
  ========================================================== */
  function updateProgressBar(xp, info) {
    const fill = document.getElementById("pmProgressFill");
    const bar = document.getElementById("pmProgressBar");
    const label = document.getElementById("pmProgressLabel");
    const pctEl = document.getElementById("pmProgressPct");

    let percent;
    if (info.level === 4) {
      percent = 100;
      label.textContent = xp + " XP – pasiektas maksimalus lygis";
    } else {
      // Progresas nuo einamojo lygio pradžios iki sekančio lygio ribos
      percent = ((xp - info.min) / (info.max - info.min)) * 100;
      label.textContent = (xp - info.min) + " / " + (info.max - info.min) + " XP iki " + (info.level + 1) + " lygio";
    }

    percent = Math.round(percent);
    fill.style.width = percent + "%";
    fill.classList.toggle("is-max", info.level === 4);
    bar.setAttribute("aria-valuenow", percent);
    pctEl.textContent = percent + "%";
  }

  /* ==========================================================
     6. Statistika
  ========================================================== */
  function updateStats() {
    const total = skills.length;
    const done = skills.filter(function (s) { return s.status === "Atlikta"; }).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    document.getElementById("pmTotal").textContent = total;
    document.getElementById("pmDone").textContent = done;
    document.getElementById("pmDonePct").textContent = pct + "%";
    return done;
  }

  /* ==========================================================
     7. Vartotojo ikonėlė pagal lygį (if / else)
  ========================================================== */
  function updateAvatar(level) {
    const img = document.getElementById("pmAvatar");
    let src;

    if (level === 1) {
      src = "assets/img/avatar-lygis-1.svg";
    } else if (level === 2) {
      src = "assets/img/avatar-lygis-2.svg";
    } else if (level === 3) {
      src = "assets/img/avatar-lygis-3.svg";
    } else {
      src = "assets/img/avatar-lygis-4.svg";
    }

    if (img.getAttribute("src") !== src) {
      img.setAttribute("src", src);
      img.alt = "Vartotojo ikonėlė – " + level + " lygis (" + LEVELS[level - 1].rank + ")";
    }

    // Trumpa animacija, kai lygis pasikeičia
    if (previousLevel !== null && previousLevel !== level) {
      const wrap = img.parentElement;
      wrap.classList.remove("level-up");
      void wrap.offsetWidth; // leidžia animaciją paleisti iš naujo
      wrap.classList.add("level-up");
    }
  }

  /* ==========================================================
     8. Pasiekimai (papildoma užduotis)
  ========================================================== */
  function renderAchievements() {
    const container = document.getElementById("pmAchievements");
    container.innerHTML = "";

    ACHIEVEMENTS.forEach(function (a) {
      const card = document.createElement("div");
      card.className = "pm-achievement";
      card.id = "ach-" + a.id;

      const icon = document.createElement("i");
      icon.className = "bi " + a.icon;
      icon.setAttribute("aria-hidden", "true");

      const body = document.createElement("div");
      const state = document.createElement("span");
      state.className = "pm-state";
      const h4 = document.createElement("h4");
      h4.textContent = a.title;
      const p = document.createElement("p");
      p.textContent = a.desc;
      body.append(state, h4, p);

      card.append(icon, body);
      container.appendChild(card);
    });
  }

  function updateAchievements(doneCount, level) {
    const conditions = {
      discoverer: doneCount >= 1,
      master: doneCount >= 4,
      expert: level === 4,
    };

    ACHIEVEMENTS.forEach(function (a) {
      const card = document.getElementById("ach-" + a.id);
      const unlocked = conditions[a.id];
      card.classList.toggle("unlocked", unlocked);
      card.querySelector(".pm-state").textContent = unlocked ? "Atrakinta" : "Užrakinta";
      card.querySelector("i").className = "bi " + (unlocked ? a.icon : "bi-lock-fill");
    });
  }

  /* ==========================================================
     Bendras perskaičiavimas
  ========================================================== */
  function updateProgress() {
    const xp = calculateXp();
    const info = getLevelInfo(xp);

    document.getElementById("pmXp").textContent = xp + " XP";
    document.getElementById("pmLevel").textContent = info.level;
    document.getElementById("pmRank").textContent = info.rank;

    updateProgressBar(xp, info);
    const doneCount = updateStats();
    updateAvatar(info.level);
    updateAchievements(doneCount, info.level);

    previousLevel = info.level;
  }

  /* ---------- Atkūrimo mygtukas ---------- */
  document.getElementById("pmReset").addEventListener("click", function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignoruojame */ }
    skills = cloneDefaults();
    renderBoard();
    updateProgress();
  });

  /* ---------- Paleidimas ---------- */
  renderAchievements();
  renderBoard();
  updateProgress();
});
