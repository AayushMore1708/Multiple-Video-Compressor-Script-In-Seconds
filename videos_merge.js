const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

// Your MP4 files
const inputFiles = [
  "Video (1).mp4",
  "Video (2).mp4",
  "Video (3).mp4"
];

const outputFile = "merged_output.mp4";

// Create temporary file list for ffmpeg
const listFile = path.join(__dirname, "file_list.txt");
const fileListContent = inputFiles
  .map(file => `file '${path.resolve(file).replace(/\\/g, "/")}'`)
  .join("\n");

fs.writeFileSync(listFile, fileListContent);

// Run ffmpeg concat
const cmd = `ffmpeg -f concat -safe 0 -i "${listFile}" -c copy "${outputFile}"`;

console.log("Merging videos...");
exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }
  if (stderr) console.log(stderr);
  console.log(`✅ Done! Merged file: ${outputFile}`);
  fs.unlinkSync(listFile); // delete temp list
});
