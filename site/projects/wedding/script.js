// The only setting: the address of the live wedding site. Leave it empty and the button stays hidden.
const LIVE_URL = "";

// ---- live site button -------------------------------------------------------------------
const liveLink = document.getElementById("live-link");
if (LIVE_URL && liveLink) {
  liveLink.href = LIVE_URL;
  liveLink.hidden = false;
}

// ---- panel tour: arrows scroll one screen --------------------------------------------------
const tour = document.getElementById("tour");
const scrollTour = (direction) => {
  const card = tour.querySelector(".phone-card");
  const step = card ? card.getBoundingClientRect().width + 22 : 280;
  tour.scrollBy({ left: direction * step * 2, behavior: "smooth" });
};
document.getElementById("tour-prev")?.addEventListener("click", () => scrollTour(-1));
document.getElementById("tour-next")?.addEventListener("click", () => scrollTour(1));

// ---- "Log in as…": the panel's default permissions, per role -----------------------------
// This mirrors the defaults of the panel (lib/panel/permissions.ts there). A page is open when the
// role may use it; otherwise it is shown struck through.
const MENU = [
  { page: "Overview", key: "main" },
  {
    group: "Planning",
    pages: [
      { page: "Tasks", key: "main" },
      { page: "Budget", key: "main" },
      { page: "Vendors", key: "main" },
      { page: "Guests", key: "main" },
      { page: "Mind Board", key: "main" },
    ],
  },
  { page: "Inspirations", key: "main" },
  {
    group: "Bride Board",
    pages: [
      { page: "Overview", key: "bride-board" },
      { page: "Pinterest inspo", key: "bride-board" },
    ],
  },
  {
    group: "Groom Board",
    pages: [
      { page: "Overview", key: "groom-board" },
      { page: "Pinterest inspo", key: "groom-board" },
    ],
  },
];

const AVATAR_MENU = [
  { page: "My information", key: "everyone" },
  { page: "Accounts", key: "accounts" },
  { page: "Permissions", key: "permissions" },
  { page: "Trash", key: "trash" },
];

const NOTHING_EXTRA = [
  ["Change the planned budget", false],
  ["Make vendors", false],
  ["Add names from the RSVPs to the guest list", false],
  ["Create accounts", false],
  ["Change permissions", false],
];

const ROLES = [
  {
    id: "bride",
    label: "Bride",
    keys: ["main", "bride-board", "accounts", "permissions", "trash"],
    story: "The site admin. She opens everything and changes every permission, except the Groom Board: that one is a surprise for her.",
    hiddenNote: { "groom-board": "even for the site admin" },
    can: [
      ["Change the planned budget", true],
      ["Make vendors", true],
      ["Add names from the RSVPs to the guest list", true],
      ["Create accounts", "any role"],
      ["Change permissions", true],
    ],
  },
  {
    id: "groom",
    label: "Groom",
    keys: ["main", "groom-board", "accounts", "permissions", "trash"],
    story: "Opens the Groom Board and invites his own helpers. He can look at the Permissions page, but only the bride can change it.",
    can: [
      ["Change the planned budget", true],
      ["Make vendors", true],
      ["Add names from the RSVPs to the guest list", true],
      ["Create accounts", "Groom mate only"],
      ["Change permissions", "view only"],
    ],
  },
  {
    id: "event-manager",
    label: "Event manager",
    keys: ["main"],
    story: "Helps with the planning: tasks, guests, vendors and budget. Does not manage people or settings.",
    can: [
      ["Change the planned budget", false],
      ["Make vendors", false],
      ["Add names from the RSVPs to the guest list", true],
      ["Create accounts", false],
      ["Change permissions", false],
    ],
  },
  {
    id: "bride-mate",
    label: "Bride mate",
    keys: ["main", "bride-board"],
    story: "Friends and family on the bride's side. The planning, plus the Bride Board: tickets, links, notes and a to-do list that nobody else sees.",
    can: NOTHING_EXTRA,
  },
  {
    id: "groom-mate",
    label: "Groom mate",
    keys: ["main", "groom-board"],
    story: "Friends and family on the groom's side. The planning, plus the Groom Board for the surprise. The groom invites them himself, with this role only.",
    can: NOTHING_EXTRA,
  },
];

const picker = document.getElementById("role-picker");
const menu = document.getElementById("role-menu");
const story = document.getElementById("role-story");
const actions = document.getElementById("role-actions");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function menuRow(entry, role, sub) {
  const allowed = entry.key === "everyone" || role.keys.includes(entry.key);
  const row = element("div", `page ${sub ? "sub" : ""} ${allowed ? "open" : "locked"}`);
  row.appendChild(element("span", "", entry.page));
  const note = role.hiddenNote?.[entry.key];
  if (!allowed) row.appendChild(element("small", "", note ?? "no access"));
  return row;
}

function show(role) {
  menu.replaceChildren();
  for (const entry of MENU) {
    if (entry.group) {
      menu.appendChild(element("p", "group", entry.group));
      for (const page of entry.pages) menu.appendChild(menuRow(page, role, true));
    } else {
      menu.appendChild(menuRow(entry, role, false));
    }
  }
  const avatar = element("div", "avatar-menu");
  avatar.appendChild(element("p", "group", "Under the account icon"));
  for (const entry of AVATAR_MENU) avatar.appendChild(menuRow(entry, role, false));
  menu.appendChild(avatar);

  story.textContent = role.story;
  actions.replaceChildren();
  for (const [label, value] of role.can) {
    const item = element("li", value === false ? "no" : "yes");
    item.appendChild(element("span", "mark", value === false ? "–" : "✓"));
    item.appendChild(element("span", "", typeof value === "string" ? `${label}: ${value}` : label));
    actions.appendChild(item);
  }
  for (const button of picker.querySelectorAll("button")) button.setAttribute("aria-pressed", String(button.dataset.role === role.id));
}

for (const role of ROLES) {
  const button = element("button", "", role.label);
  button.type = "button";
  button.dataset.role = role.id;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => show(role));
  picker.appendChild(button);
}
show(ROLES[0]);
