// "Live or mocked?" demo: the same filter rule the dashboard uses (utils/dataSource.ts there).
// "All" shows everything; "Live" and "Mocked" hide the other kind, but partial cards always stay,
// because they hold both kinds of data.
const filterGroup = document.getElementById("source-filter");
const rows = document.querySelectorAll("#source-rows li");

function matchesFilter(source, filter) {
  if (filter === "all" || source === "partial") return true;
  return source === filter;
}

function applyFilter(filter) {
  for (const row of rows) {
    row.hidden = !matchesFilter(row.dataset.source, filter);
  }
  for (const button of filterGroup.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  }
}

filterGroup?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (button) applyFilter(button.dataset.filter);
});
