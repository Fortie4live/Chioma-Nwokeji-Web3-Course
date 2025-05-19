const fs = require("fs").promises;
const path = require("path");

// Reads a file asynchronously, returns its content as a string
function textFile(filename) {
  return fs.readFile(path.join(__dirname, filename), "utf8");
}

// Converts the hourly activity table to a readable string graph
function activityGraph(table) {
  return table
    .map((val, hour) => `${String(hour).padStart(2, "0")}: ${"*".repeat(val)}`)
    .join("\n");
}

// Main function that counts activity per hour for a given weekday (0 = Sunday, ..., 6 = Saturday)
async function activityTable(day) {
  const table = Array(24).fill(0); // 24 hours
  const fileListText = await textFile("camera_logs.txt");
  
  // Trim, remove empty lines, and fix carriage returns
  const fileNames = fileListText
    .split("\n")
    .map(name => name.trim())
    .filter(name => name !== "");

  for (const file of fileNames) {
    const content = await textFile(file);
    
    const timestamps = content
      .split("\n")
      .map(line => line.trim())         // remove whitespace and \r
      .filter(line => line !== "")      // skip empty lines
      .map(Number);                     // convert to numbers

    for (const ts of timestamps) {
      if (!isNaN(ts)) {
        const time = new Date(ts);
        if (time.getDay() === day) {
          const hour = time.getHours();
          table[hour]++;
        }
      }
    }
  }

  return table;
}

// Run it for Tuesday (day = 2)
activityTable(2)
  .then(table => console.log(activityGraph(table)))
  .catch(err => console.error("Error:", err));