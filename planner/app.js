// Dati iniziali (puoi incollare qui tutte le settimane convertite in JSON)
let weeksData = [
  {
    "range": "20-26 APR",
    "days": {
      "Lunedì": "RIPOSO o RULLI Z1 20’- 30’",
      "Martedì": "NUOTO MASTER",
      "Mercoledì": "MTB 90’",
      "Giovedì": "CL-CM 6-8KM",
      "Venerdì": "RIPOSO",
      "Sabato": "C.I. MTB personale universitario CUASSO AL MONTE (VA)",
      "Domenica": "C.I. MTB personale universitario"
    }
  },
  {
    "range": "27 APR-3 MAG",
    "days": {
      "Lunedì": "RIPOSO o CORSA LEGGERA A PIACERE",
      "Martedì": "BICI Z2 90’-120’",
      "Mercoledì": "NUOTO MASTER",
      "Giovedì": "CL-CM 10 KM",
      "Venerdì": "BICI 60’-70’",
      "Sabato": "BICI 5-6 ORE D+ 2.000-2.500",
      "Domenica": "BICI 4-5 ORE D+ 1.500-2.000"
    }
  },
  {
    "range": "4-10 MAG",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "NUOTO MASTER",
      "Mercoledì": "BICI Z2 90’-120’",
      "Giovedì": "CL-CM 10 KM",
      "Venerdì": "BICI Z2 90’-120’",
      "Sabato": "CORSO SUB",
      "Domenica": "CORSO SUB"
    }
  },
  {
    "range": "11-17 MAG",
    "days": {
      "Lunedì": "BICI 90’-120’",
      "Martedì": "BICI Z2 90’-120’",
      "Mercoledì": "NUOTO MASTER",
      "Giovedì": "CL-CM 10 KM",
      "Venerdì": "RIPOSO o BICI LEGGERA MAX 90’",
      "Sabato": "BICI 5-6 ORE D+ 2.000-2.500",
      "Domenica": "BICI LEGGERA MAX 120’"
    }
  },
  {
    "range": "18-24 MAG",
    "days": {
      "Lunedì": "RIPOSO o CORSA LEGGERA A PIACERE",
      "Martedì": "NUOTO MASTER",
      "Mercoledì": "BICI Z2 70’ - 90’",
      "Giovedì": "BICI 60’-70’",
      "Venerdì": "RIPOSO",
      "Sabato": "BICI 40’-60’",
      "Domenica": "NOVE COLLI"
    }
  },
  {
    "range": "25-31 MAG",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "BICI O CORSA MOLTO LEGGERA",
      "Mercoledì": "NUOTO MASTER",
      "Giovedì": "CL-CM 10 KM",
      "Venerdì": "RIPOSO",
      "Sabato": "CORSA A PIACERE",
      "Domenica": "BICI o CORSA A PIACERE"
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
