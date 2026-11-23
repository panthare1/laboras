# Erik Adam Sinkevič – CV svetainė (LD7–LD12)

Šablonas: **MyResume** (template 2, vienas puslapis `index.html`).

## Ką dar reikia patikrinti ar pakeisti

| Kur | Ką daryti |
|---|---|
| `index.html` | Patikrinkite studijų programos pavadinimą, NVIDIA kurso metus (dabar „Baigtas kursas“), įgūdžių procentus ir paslaugų kainas |
| `assets/img/avatar-lygis-1…4.svg` | Jei reikalaujama, sugeneruokite ikonėles su https://avataaars2.com/ ir išsaugokite tais pačiais pavadinimais |

## Dizainas

Svetainė primena inžinerinį grafiką: milimetrinio popieriaus fonas, rašalo mėlyna (#14233B), grafiko mėlyna (#1D5FBF)
ir oranžinis duomenų taškas (#D95319, MATLAB antroji linijos spalva), naudojamas tik žymekliams.
Šriftas – Archivo (viena šeima, antraštėms naudojamas platesnis šrifto plotis).

## Kur kas padaryta

### LD7 – HTML ir VS Code
- Vardas, profesija, hero paveikslėlis (`assets/img/hero-bg.jpg`), meniu lietuviškai, „Apie“ turinys.
- **Papildoma:** `lang="lt"`, `<meta charset="utf-8">`, `author`, `description`, `<title>Mano CV</title>`, favicon (`favicon.svg` / `favicon.png`).

### LD8 – HTML elementai
- „Patirtis“: studijos, NVIDIA sertifikatas, Visma hakatonas ir 2 GitHub projektai; „Atlikti darbai“: 7 grafikai iš LD3–LD4 su pavadinimais ir aprašymais.
- „Paslaugos“: 4×3 lentelė (`<thead>` + 3 eilutės), `<ul>` su įdėtiniu sąrašu, `<ol>` su įdėtiniu sąrašu.
- Visi paveikslėliai `assets/img`, turi `alt`, `width` ir `height`.
- **Papildoma:** `<video>`, YouTube `<iframe>` (embed), `<audio>` – failai `assets/media`.

### LD9 – CSS (`assets/css/custom.css`, įkeliamas po `main.css`)
- Šriftas Archivo, h1–h6 ir `p` stiliai; mygtukai su `:hover` / `:active`; nuorodos.
- Tarpai ir blokai (šešėliai, užapvalinimai) „Apie“, „Patirtis“, „Atlikti darbai“ skiltyse.
- 2 komponentai: **navigacijos juosta** ir **„Į viršų“ mygtukas** (+ progreso juostos).
- **Papildoma:** sąrašai su `::before` ir `counter()`, atskiras įdėtinių sąrašų stilius; lentelės antraštė, „zebra“, `:hover`, vienodi tarpai, centravimas.

### LD10 – Animacijos (`custom.css`)
- `@keyframes socialPing` (4 būsenos: 0/30/60/100 %, keičia `transform` ir `color`) ir `nameIn` (hero vardo įžanga).
- Krovimo indikatorius „Pulsing Dots“ – `.services-loader`, „Paslaugų“ skiltyje.
- Skilčių antraščių `::before` (x ašis, `axisDraw`) ir `::after` (oranžinis taškas, keliaujantis ašimi, `pointTravel`).
- **Papildoma:** animuotas gradientinis „Paslaugų“ fonas (`gradientMove`); 4 CSS figūros „Apie“ skiltyje – MATLAB žymeklių formos o, ^, s, d (plaukioja, sukasi, didėja).

### LD11 – Forma (`assets/js/custom.js`)
- Laukai: vardas, pavardė, el. paštas, telefonas, adresas, 3 vertinimai (1–10), „Siųsti“.
- `preventDefault()`, duomenys surenkami į objektą, `console.log()`, išvedami po forma, rodomas vidurkis „Vardas Pavardė: vidurkis“.
- „Siųsti“ neaktyvus, kol laukai neužpildyti arba turi klaidų.
- **Papildoma:** validacija realiu laiku (raudonas rėmelis ir klaidos tekstas po lauku), telefono formatas `+370 6xx xxxxx` (tik skaitmenys, ilgis ribojamas), mygtukas „Išvalyti“.

### LD12 – Kompetencijų modulis (`assets/js/skills.js`, skiltis „Pažanga“)
- Masyvas iš 7 objektų (`name`, `status`, `xp`), XP nuo 30 iki 80, iš viso 370 XP.
- Kortelės generuojamos JS (`createSkillCard`, `renderBoard`), būsena keičiama mygtukais be puslapio perkrovimo.
- XP skaičiuojami tik „Atlikta“ įgūdžiams (`calculateXp`), lygis ir rangas nustatomi `getLevelInfo` su if/else.
- Progreso juosta rodo progresą nuo lygio pradžios iki sekančio lygio, 4 lygyje – 100 %; statistika: iš viso, atlikta, procentas.
- Ikonėlė keičiama pagal lygį (`updateAvatar`, if/else), lygiui sumažėjus grąžinama ankstesnė.
- **Papildoma:** Local Storage (`saveSkills` / `loadSkills`), 3 pasiekimai, kurie atsirakina ir vėl užsirakina.

## Įkėlimas į GitHub Pages
1. Sukurkite viešą saugyklą `panthare1.github.io`.
2. Įkelkite **visą** šio aplanko turinį (kad `index.html` būtų saugyklos šaknyje).
3. Svetainė bus pasiekiama adresu `https://panthare1.github.io/`.
