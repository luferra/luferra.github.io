// Dati iniziali (puoi incollare qui tutte le settimane convertite in JSON)
let weeksData = [
    {
    "range": "19 -25 OTT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "LL-CL 60'",
      "Mercoledì": "LL-CL 60'",
      "Giovedì": "RULLI Z1-Z2 40-45'",
      "Venerdì": "RISC + 5x1000 CV REC 1'",
      "Sabato": "NAZIONALI NUOTO – LIGNANO SABBIADORO",
      "Domenica": "LL-CL 15-18KM"
    }
  },
  {
    "range": "26 OTT-1 NOV",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "RISC + 5x1000 CV REC 1'",
      "Mercoledì": "CL-CM 60'",
      "Giovedì": "RULLI Z1-Z2 40-45'",
      "Venerdì": "RISC + 5 X 1.000 CV REC 1'",
      "Sabato": "LL-CL 15-18KM",
      "Domenica": "RULLI A PIACERE"
    }
  },
  {
    "range": "2 NOV-8 NOV",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "RISC + 8x1000 CV REC 1'",
      "Mercoledì": "CL-CM 70-90'",
      "Giovedì": "NUOTO",
      "Venerdì": "RISC + 8 X 1.000 CV REC 1'",
      "Sabato": "NUOTO",
      "Domenica": "LL-CL 22-25KM"
    }
  }
];

// Helpers per riconoscere lo sport da una stringa
function detectSports(text) {
  const t = text.toLowerCase();
  const sports = [];
  if (/(bici|mtb|rulli)/i.test(text)) sports.push("bici");
  if (/(nuoto|swim)/i.test(text)) sports.push("nuoto");
  if (/(corsa|km|ripetute|fk|san\b)/i.test(text) && !/(bici|mtb|rulli)/i.test(text))
    sports.push("corsa");
  return sports;
}

function isRest(text) {
  return /ripos/i.test(text);
}

// Rendering
const weeksContainer = document.getElementById("weeksContainer");
const weekTemplate = document.getElementById("weekTemplate");
const dayTemplate = document.getElementById("dayTemplate");
const sportFilter = document.getElementById("sportFilter");
const fileInput = document.getElementById("fileInput");

function renderWeeks() {
  const filter = sportFilter.value; // all | bici | nuoto | corsa
  weeksContainer.innerHTML = "";

  weeksData.forEach((week) => {
    const weekNode = weekTemplate.content.cloneNode(true);
    const titleEl = weekNode.querySelector(".week__title");
    const gridEl = weekNode.querySelector(".week__grid");
    titleEl.textContent = week.range;

    const order = [
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
      "Domenica"
    ];

    order.forEach((dayName) => {
      const content = week.days[dayName] || "";
      const sports = detectSports(content);

      if (filter !== "all" && sports.length > 0 && !sports.includes(filter)) {
        // se sto filtrando per sport, nascondo i giorni che non lo contengono
        return;
      }

      const dayNode = dayTemplate.content.cloneNode(true);
      const dayNameEl = dayNode.querySelector(".day__name");
      const dayContentEl = dayNode.querySelector(".day__content");
      const dayRoot = dayNode.querySelector(".day");

      dayNameEl.textContent = dayName;

      if (isRest(content)) {
        dayRoot.classList.add("day--rest");
      }

      // Tag sportivi
      if (sports.length > 0) {
        const frag = document.createDocumentFragment();
        sports.forEach((s) => {
          const span = document.createElement("span");
          span.classList.add(`tag-${s}`);

          let icon = "";
          if (s === "bici") icon = "🚴‍♂️";
          if (s === "nuoto") icon = "🏊‍♂️";
          if (s === "corsa") icon = "🏃‍♂️";

          span.textContent = `${icon} ${s.toUpperCase()}`;
          frag.appendChild(span);
        });
        if (sports.length > 1) {
          const badge = document.createElement("span");
          badge.classList.add("badge-multi");
          badge.textContent = "combo";
          frag.appendChild(badge);
        }
        dayContentEl.appendChild(frag);
        dayContentEl.appendChild(document.createElement("br"));
      }

      dayContentEl.append(document.createTextNode(content || "—"));
      gridEl.appendChild(dayNode);
    });

    // se la settimana è vuota dopo il filtro, non la mostro
    if (gridEl.children.length > 0) {
      weeksContainer.appendChild(weekNode);
    }
  });
}

// Upload JSON
fileInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  const readers = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = JSON.parse(reader.result);
            resolve(Array.isArray(data) ? data : [data]);
          } catch (e) {
            console.error("Errore parsing JSON", e);
            resolve([]);
          }
        };
        reader.onerror = reject;
        reader.readAsText(file);
      })
  );

  Promise.all(readers).then((results) => {
    const flat = results.flat();
    // Merge: se esiste già una settimana con lo stesso "range", la sostituisco
    flat.forEach((week) => {
      const idx = weeksData.findIndex((w) => w.range === week.range);
      if (idx >= 0) {
        weeksData[idx] = week;
      } else {
        weeksData.push(week);
      }
    });
    // Ordina grossolanamente per nome range
    weeksData.sort((a, b) => a.range.localeCompare(b.range));
    renderWeeks();
  });
});

sportFilter.addEventListener("change", renderWeeks);

// primo render
renderWeeks();
