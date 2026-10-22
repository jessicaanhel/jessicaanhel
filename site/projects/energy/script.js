// ---- "How one hour is made" --------------------------------------------------------------
// Real fifteen-minute readings (MW) copied from the sample CSV files of the project.
// The two results follow the backend's Aggregator: the mean of the readings, and their sum.
const PARKS = [
  {
    name: "Netterden",
    type: "wind",
    hour: "2 November 2020, 10:00",
    readings: [
      ["10:00", 13.02],
      ["10:15", 12.348],
      ["10:30", 12.9],
      ["10:45", 12.972],
    ],
  },
  {
    name: "Bemmel",
    type: "solar",
    hour: "15 July 2020, 14:00",
    readings: [
      ["14:00", 7.268],
      ["14:15", 7.708],
      ["14:30", 8.112],
      ["14:45", 9.472],
    ],
  },
  {
    name: "Zwartenbergseweg",
    type: "wind",
    hour: "6 June 2020, 14:00",
    readings: [
      ["14:00", 8.944],
      ["14:15", 8.512],
      ["14:30", 9.232],
      ["14:45", 9.664],
    ],
  },
  {
    name: "Stadskanaal",
    type: "solar",
    hour: "15 July 2020, 13:00",
    readings: [
      ["13:00", 4.968],
      ["13:15", 5.676],
      ["13:30", 6.312],
      ["13:45", 6.96],
    ],
  },
];

const COLOURS = {
  wind: { line: "#0000ff", soft: "rgba(0, 0, 255, 0.1)" },
  solar: { line: "#ffa500", soft: "rgba(255, 165, 0, 0.1)" },
};

// All bars share one scale, so parks can be compared when you switch.
const SCALE_MAX = 14;

const picker = document.getElementById("park-picker");
const title = document.getElementById("hour-title");
const slots = document.getElementById("slots");
const averageOut = document.getElementById("result-average");
const totalOut = document.getElementById("result-total");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function resultText(target, value, note) {
  target.replaceChildren(document.createTextNode(`${value.toFixed(2)} MW`), element("small", "", note));
}

function show(park) {
  const colour = COLOURS[park.type];
  title.textContent = `${park.name} (${park.type}), ${park.hour}`;

  slots.replaceChildren();
  for (const [time, mw] of park.readings) {
    const row = element("li");
    row.appendChild(element("span", "time", time));
    const track = element("span", "track");
    const fill = element("span", "fill");
    fill.style.width = `${Math.min(100, (mw / SCALE_MAX) * 100)}%`;
    fill.style.setProperty("--fill-line", colour.line);
    fill.style.setProperty("--fill-soft", colour.soft);
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(element("span", "value", mw.toFixed(2)));
    slots.appendChild(row);
  }

  const total = park.readings.reduce((sum, [, mw]) => sum + mw, 0);
  resultText(averageOut, total / park.readings.length, "the four readings, divided by four");
  resultText(totalOut, total, "the four readings, added up");

  for (const button of picker.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.park === park.name));
  }
}

for (const park of PARKS) {
  const button = element("button");
  button.type = "button";
  button.dataset.park = park.name;
  button.setAttribute("aria-pressed", "false");
  const dot = element("span", "dot");
  dot.style.background = COLOURS[park.type].line;
  button.append(dot, park.name);
  button.addEventListener("click", () => show(park));
  picker.appendChild(button);
}
show(PARKS[0]);
