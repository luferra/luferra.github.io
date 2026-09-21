// Dati iniziali (puoi incollare qui tutte le settimane convertite in JSON)
let weeksData = [
  {
    "range": "21-27 SETT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "BICI 60’- 90’",
      "Mercoledì": "RISC + 6-8 X 1.000 CM-CV REC 1’",
      "Giovedì": "RISC+ CM 10- 13KM",
      "Venerdì": "BICI LEGGERA",
      "Sabato": "CL-CM 10-12KM",
      "Domenica": "TRAVERSATA. ALBISOLA 1 MIGLIO + STAFFETTA 2 X 400"
    }
  },
  {
    "range": "28 SETT- 4 OTT",
    "days": {
      "Lunedì": "CORSA LEGGERA A PIACERE",
      "Martedì": "RISC + 6-8 X 1.000 CM-CV REC 1’",
      "Mercoledì": "RISC+ CM 10- 13KM",
      "Giovedì": "RIPOSO o BICI LEGGERA",
      "Venerdì": "RISC + 6-8 X 1.000 CM-CV REC 1’",
      "Sabato": "RISC+ CM 10- 13KM",
      "Domenica": "BICI A PIACERE MAX 150’"
    }
  },
  {
    "range": "5-11 OTT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "RISC+ 5 X 1.000 CV/SAN REC 1’30”",
      "Mercoledì": "RISC+ 4 X 1.000 CV/SAN REC 1’30”",
      "Giovedì": "NUOTO MASTER 7:00_8:15",
      "Venerdì": "RISC+ 2-3 X 1.000 CV/SAN REC 1’30”",
      "Sabato": "NUOTO MASTER 13:30_15:00",
      "Domenica": "NAZIONALI CORSA 10 KM - MILANO"
    }
  },
  {
    "range": "12-18 OTT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "NUOTO MASTER 20.30_22.00",
      "Mercoledì": "CL 13-15KM",
      "Giovedì": "NUOTO MASTER 7:00_8:15",
      "Venerdì": "CL 13-15KM",
      "Sabato": "NUOTO MASTER 13:30_15:00",
      "Domenica": "CL 20-22 KM"
    }
  },
  {
    "range": "19 -25 OTT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "NUOTO MASTER 20.30_22.00",
      "Mercoledì": "CL-CM 7-8KM",
      "Giovedì": "NUOTO MASTER 7:00_8:15",
      "Venerdì": "CORSA LEGGERA NUOTO LEGGERO",
      "Sabato": "NAZIONALI NUOTO – LIGNANO SABBIADORO",
      "Domenica": "CORSA LEGGERA A PIACERE"
    }
  },
  {
    "range": "26 OTT-1 NOV",
    "days": {
      "Lunedì": "RISC + 8-10 X 1.000 CM-CV REC 1’",
      "Martedì": "NUOTO MASTER 20.30_22.00",
      "Mercoledì": "RISC + 8-10 X 1.000 CM-CV REC 1’",
      "Giovedì": "NUOTO MASTER 7:00_8:15",
      "Venerdì": "RISC+ 6 X 1.000 CV/SAN REC 1’30”",
      "Sabato": "NUOTO MASTER 13:30_15:00",
      "Domenica": "CL 25-28KM"
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
