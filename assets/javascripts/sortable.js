/* Sortable and filterable tables: a table inside <div class="sortable-table"> sorts by the column whose header is
 * clicked (numbers by their first value, empty cells last), and an <input class="table-filter"> placed before it
 * keeps only the rows containing its text. No dependency. */
(function () {
  function sortKey(cell) {
    const text = cell.innerText.trim();
    const number = text.match(/-?\d+(?:\.\d+)?/);
    if (number) return [0, parseFloat(number[0])];
    return text ? [1, text.toLowerCase()] : [2, ""];
  }

  function makeSortable(table) {
    const headers = table.querySelectorAll("thead th");
    headers.forEach(function (th, column) {
      th.classList.add("sortable-header");
      th.setAttribute("role", "button");
      th.tabIndex = 0;
      function sort() {
        const ascending = th.dataset.sort !== "asc";
        headers.forEach(function (h) { delete h.dataset.sort; });
        th.dataset.sort = ascending ? "asc" : "desc";
        const body = table.tBodies[0];
        const rows = Array.from(body.rows);
        rows.sort(function (a, b) {
          const x = sortKey(a.cells[column]), y = sortKey(b.cells[column]);
          if (x[0] !== y[0]) return x[0] - y[0];          // numbers, then text, then empty cells
          if (x[1] === y[1]) return 0;
          return (x[1] < y[1] ? -1 : 1) * (ascending ? 1 : -1);
        });
        rows.forEach(function (row) { body.appendChild(row); });
      }
      th.addEventListener("click", sort);
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sort(); }
      });
    });
  }

  function init() {
    document.querySelectorAll(".sortable-table table").forEach(function (table) {
      if (table.dataset.sortable) return;
      table.dataset.sortable = "1";
      makeSortable(table);
    });
    document.querySelectorAll("input.table-filter").forEach(function (input) {
      if (input.dataset.bound) return;
      input.dataset.bound = "1";
      // Markdown wraps the input in a paragraph: look for the table after that paragraph.
      const start = input.parentElement && input.parentElement.tagName === "P" ? input.parentElement : input;
      let next = start.nextElementSibling;
      while (next && !next.querySelector("table")) next = next.nextElementSibling;
      if (!next) return;
      const table = next.querySelector("table");
      input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();
        Array.from(table.tBodies[0].rows).forEach(function (row) {
          row.hidden = query !== "" && !row.innerText.toLowerCase().includes(query);
        });
      });
    });
  }

  // Material's instant navigation swaps pages without a reload: re-run on each page it shows.
  if (typeof document$ !== "undefined") document$.subscribe(init);
  else document.addEventListener("DOMContentLoaded", init);
})();
