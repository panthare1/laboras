/*==============================================================
  custom.js – LD11: kontaktų formos apdorojimas
  - duomenų surinkimas į objektą, išvedimas į konsolę ir puslapį
  - vertinimų vidurkis
  - „Siųsti“ mygtukas aktyvus tik kai visi laukai užpildyti ir teisingi
  - validacija realiu laiku, telefono formatavimas, „Išvalyti“ mygtukas
==============================================================*/
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");
  const result = document.getElementById("formResult");
  const resultData = document.getElementById("formResultData");
  const averageEl = document.getElementById("formAverage");

  // Formos laukai
  const fields = {
    vardas: document.getElementById("fName"),
    pavarde: document.getElementById("fSurname"),
    elPastas: document.getElementById("fEmail"),
    telefonas: document.getElementById("fPhone"),
    adresas: document.getElementById("fAddress"),
    klausimas1: document.getElementById("fQ1"),
    klausimas2: document.getElementById("fQ2"),
    klausimas3: document.getElementById("fQ3"),
  };

  // Laukų pavadinimai rezultatų išvedimui
  const labels = {
    vardas: "Vardas",
    pavarde: "Pavardė",
    elPastas: "El. paštas",
    telefonas: "Tel. numeris",
    adresas: "Adresas",
    klausimas1: "Svetainės dizainas (1–10)",
    klausimas2: "Informacijos aiškumas (1–10)",
    klausimas3: "Rekomendacija (1–10)",
  };

  // Laukai, kurių klaidos jau rodomos (rodome tik vartotojui pradėjus pildyti)
  const touched = new Set();

  /* ---------- Validavimo taisyklės ---------- */
  const NAME_RE = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+(?:[ -][A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const PHONE_RE = /^\+370 6\d{2} \d{5}$/;

  // Grąžina klaidos tekstą arba tuščią eilutę, jei laukas teisingas
  function getError(key, value) {
    const v = value.trim();
    if (v === "") return "Šis laukas yra privalomas.";

    switch (key) {
      case "vardas":
      case "pavarde":
        return NAME_RE.test(v) ? "" : "Galima naudoti tik raides.";
      case "elPastas":
        return EMAIL_RE.test(v) ? "" : "Neteisingas el. pašto formatas (pvz., vardas@pastas.lt).";
      case "telefonas":
        return PHONE_RE.test(v) ? "" : "Numeris turi būti formatu +370 6xx xxxxx.";
      case "adresas":
        return v.length >= 3 ? "" : "Adresas per trumpas.";
      case "klausimas1":
      case "klausimas2":
      case "klausimas3": {
        const n = Number(v);
        return Number.isInteger(n) && n >= 1 && n <= 10 ? "" : "Įveskite sveikąjį skaičių nuo 1 iki 10.";
      }
      default:
        return "";
    }
  }

  // Parodo / paslepia klaidą konkrečiam laukui
  function showFieldState(key) {
    const input = fields[key];
    const errorEl = document.getElementById(input.id + "-error");
    const error = getError(key, input.value);

    if (!touched.has(key)) {
      input.classList.remove("is-invalid", "is-valid");
      errorEl.textContent = "";
      return;
    }
    input.classList.toggle("is-invalid", error !== "");
    input.classList.toggle("is-valid", error === "");
    input.setAttribute("aria-invalid", error !== "" ? "true" : "false");
    errorEl.textContent = error;
  }

  // „Siųsti“ aktyvus tik kai visi laukai užpildyti ir be klaidų
  function updateSubmitState() {
    const allValid = Object.keys(fields).every(function (key) {
      return getError(key, fields[key].value) === "";
    });
    submitBtn.disabled = !allValid;
  }

  /* ---------- Telefono numerio formatavimas realiu laiku ---------- */
  function formatPhone(raw) {
    let digits;

    if (raw.startsWith("+370 ")) {
      // Jau suformatuotas numeris – imame skaitmenis po „+370 “
      digits = raw.slice(5).replace(/\D/g, "");
    } else {
      const all = raw.replace(/\D/g, "");          // paliekame tik skaitmenis
      if (all === "") return "";
      if (["3", "37", "370"].includes(all)) return "+" + all; // vartotojas renka šalies kodą
      if (all.startsWith("370")) digits = all.slice(3);
      else if (all.startsWith("8")) digits = all.slice(1);    // 86xxxxxxx -> 6xxxxxxx
      else digits = all;
    }

    digits = digits.slice(0, 8);                  // ilgio apribojimas: 8 skaitmenys po +370
    if (digits.length === 0) return "";

    let out = "+370 " + digits.slice(0, 3);
    if (digits.length > 3) out += " " + digits.slice(3);
    return out;
  }

  // Pastaba: ne skaitmenys (raidės, „+“, tarpai) pašalinami formatPhone() funkcijoje
  // kiekvieno „input“ įvykio metu, todėl įvesti galima tik skaitmenis.

  /* ---------- Įvykiai laukams ---------- */
  Object.keys(fields).forEach(function (key) {
    const input = fields[key];

    input.addEventListener("input", function () {
      if (key === "telefonas") input.value = formatPhone(input.value);
      touched.add(key);
      showFieldState(key);
      updateSubmitState();
    });

    input.addEventListener("blur", function () {
      touched.add(key);
      showFieldState(key);
    });
  });

  /* ---------- Formos pateikimas ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // puslapis neperkraunamas

    // Paskutinis patikrinimas
    Object.keys(fields).forEach(function (key) {
      touched.add(key);
      showFieldState(key);
    });
    updateSubmitState();
    if (submitBtn.disabled) return;

    // Surenkame duomenis į objektą
    const formData = {
      vardas: fields.vardas.value.trim(),
      pavarde: fields.pavarde.value.trim(),
      elPastas: fields.elPastas.value.trim(),
      telefonas: fields.telefonas.value.trim(),
      adresas: fields.adresas.value.trim(),
      klausimas1: Number(fields.klausimas1.value),
      klausimas2: Number(fields.klausimas2.value),
      klausimas3: Number(fields.klausimas3.value),
    };

    console.log("Formos duomenys:", formData);

    // Išvedame duomenis po forma
    resultData.innerHTML = "";
    Object.keys(formData).forEach(function (key) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = labels[key] + ": ";
      p.appendChild(strong);
      p.appendChild(document.createTextNode(formData[key]));
      resultData.appendChild(p);
    });

    // Vertinimų vidurkis
    const average = (formData.klausimas1 + formData.klausimas2 + formData.klausimas3) / 3;
    averageEl.textContent = formData.vardas + " " + formData.pavarde + ": " + average.toFixed(2);
    averageEl.style.color = average < 4 ? "#b91c1c" : average < 7 ? "#b45309" : "#15803d";

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  /* ---------- „Išvalyti“ – grąžiname formą į pradinę būseną ---------- */
  clearBtn.addEventListener("click", function () {
    form.reset();
    touched.clear();
    Object.keys(fields).forEach(function (key) {
      fields[key].removeAttribute("aria-invalid");
      showFieldState(key);
    });
    resultData.innerHTML = "";
    averageEl.textContent = "";
    averageEl.style.color = "";
    result.hidden = true;
    updateSubmitState();
  });

  updateSubmitState();
});
