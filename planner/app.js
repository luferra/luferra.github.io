// Dati iniziali (puoi incollare qui tutte le settimane convertite in JSON)
let weeksData = [
  {
    "range": "17-23 AGO",
    "days": {
      "Lunedì": "—",
      "Martedì": "BICI Z2 90’ O CL- CM 20’-30’",
      "Mercoledì": "BICI Z2 90’ O CL- CM 20’-30’",
      "Giovedì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Venerdì": "BICI Z2 90’ O CL-CM 20’-30’",
      "Sabato": "BICI A PIACERE",
      "Domenica": "CL-CM 8-10 KM [ corri con l fresco ]"
    }
  },
  {
    "range": "24 -30 AGO",
    "days": {
      "Lunedì": "RIPOSO o BICI LEGGERA",
      "Martedì": "BICI 90’ inserendo 5 tratti da 1’ Z5-Z6 + 2’-3’ Z4",
      "Mercoledì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Giovedì": "BICI 90’ inserendo 5 tratti da 5’-6’ Z4- Z5",
      "Venerdì": "RISC+ 3-4 X 1.000 CM-CV",
      "Sabato": "BICI LEGGERA 90’-120’",
      "Domenica": "BICI 90’ inserendo 5 tratti da 1’ Z5-Z6 + 2’- 3’ Z4"
    }
  },
  {
    "range": "31 AGO – 6 SETT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "BICI 90’ inserendo 5 tratti da 1’ Z5-Z6 + 2’-3’ Z4",
      "Mercoledì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Giovedì": "BICI 90’ inserendo 5 tratti da 5’-6’ Z4- Z5",
      "Venerdì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Sabato": "RIPOSO o CL- CM 8-10 KM VOLONTARIO TRIATHLON LOCARNO",
      "Domenica": "RIPOSO VOLONTARIO TRIATHLON LOCARNO"
    }
  },
  {
    "range": "7-13 SETT",
    "days": {
      "Lunedì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Martedì": "BICI 60’ inserendo 3 tratti da 1’ Z5-Z6 + 2’-3’ Z4",
      "Mercoledì": "BICI LEGGERA o corsa 20’-25’",
      "Giovedì": "BICI 40’-50’ inserendo 3 tratti da 1’ Z5-Z6 + 1’ Z4",
      "Venerdì": "BICI LEGGERA",
      "Sabato": "NAZIONALI CICLISMO PERS. UNI 30 KM VICENZA",
      "Domenica": "CICLOTURISTI CA 50 KM D+ 500 VICENZA"
    }
  },
  {
    "range": "14-20 SETT",
    "days": {
      "Lunedì": "RIPOSO",
      "Martedì": "CL-CM 8-10 KM",
      "Mercoledì": "NUOTO VARIAZIONI VELOCITA' 2.200 - 2800",
      "Giovedì": "CL-CM 6-8KM",
      "Venerdì": "NUOTO_FORZ A_BRACCIA_A EROBICO_SOG LIA_VO2MAX_ 2.000",
      "Sabato": "BICI A PIACERE",
      "Domenica": "DA DEFINIRE"
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
