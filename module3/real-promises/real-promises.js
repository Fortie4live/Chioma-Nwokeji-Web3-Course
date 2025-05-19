const fs = require("fs").promises;
const path = require("path");

function textFile(filename) {
  return fs.readFile(path.join(__dirname, filename), "utf8");
}

function activityGraph(table) {
  return table
    .map((val, hour) => `${String(hour).padStart(2, "0")}: ${"*".repeat(val)}`)
    .join("\n");
}

function activityTable(day) {
  let table = Array(24).fill(0);

  return textFile("camera_logs.txt")
    .then(fileList => {
      console.log("File list:", fileList); // Debugging log
      const files = fileList
        .split("\n")
        .map(name => name.trim())
        .filter(Boolean);

      return Promise.all(
        files.map(name =>
          textFile(name).then(content => {
            console.log(`Processing ${name}:`, content); // Debugging log
            content
              .trim()
              .split("\n")
              .map(Number)
              .forEach(ts => {
                const time = new Date(ts);
                if (time.getDay() === day) {
                  table[time.getHours()]++;
                }
              });
          })
        )
      );
    })
    .then(() => table)
    .catch(err => {
      console.error("Error:", err);
      throw err; // Re-throw to propagate the error
    });
}

activityTable(2)
  .then(table => console.log(activityGraph(table)))
  .catch(err => console.error("Final Error:", err));