const MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
    { name: "Everest", height: 8848, place: "Nepal" },
    { name: "Mount Fuji", height: 3776, place: "Japan" },
    { name: "Vaalserberg", height: 323, place: "Netherlands" },
    { name: "Denali", height: 6168, place: "United States" },
    { name: "Popocatepetl", height: 5465, place: "Mexico" },
    { name: "Mont Blanc", height: 4808, place: "Italy/France" }
  ];
  
  function buildTable(data) {
    const table = document.createElement("table");
  
    // Create the header row
    const fields = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    for (let field of fields) {
      const header = document.createElement("th");
      header.textContent = field;
      headerRow.appendChild(header);
    }
    table.appendChild(headerRow);
  
    // Add the data rows
    for (let object of data) {
      const row = document.createElement("tr");
      for (let field of fields) {
        const cell = document.createElement("td");
        cell.textContent = object[field];
        // Right-align numeric values
        if (typeof object[field] === "number") {
          cell.style.textAlign = "right";
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    return table;
  }
  
  document.getElementById("mountains").appendChild(buildTable(MOUNTAINS));