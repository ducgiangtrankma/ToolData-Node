const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "temp/" });

app.use(express.static("public"));

app.post("/upload", upload.array("files"), (req, res) => {
  const files = req.files;

  const outputFolder = "output/";
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  const dataArray = [];
  files.forEach((file) => {
    if (path.extname(file.originalname) === ".txt") {
      const filePath = path.join(file.destination, file.filename);
      const fileData = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.stringify(fileData);
      const arrayData = jsonData.split("===============");
      dataArray.push(arrayData);
    }
  });
  const listData = [];
  dataArray.flat().map((item) => {
    const usernameStartIndex = item.indexOf("Username:") + "Username:".length;
    const usernameEndIndex = item.indexOf("Password:");
    const passwordStartIndex = item.indexOf("Password:") + "Password:".length;
    const passwordEndIndex = item.indexOf("Application:");
    // Extracting the values from the item
    const username = item
      .substring(usernameStartIndex, usernameEndIndex)
      .trim()
      .replace("\\r\\n", "")
      .replace(/\s/g, "");
    const password = item
      .substring(passwordStartIndex, passwordEndIndex)
      .trim()
      .replace("\\r\\n", "")
      .replace(/\s/g, "");
    const output = `${username}:${password}`;
    if (username !== "UNKNOWN" && !listData.find((e) => e === output)) {
      listData.push(output);
    }
  });
  const newListData = listData.join("\n");
  const outPutFilePath = path.join(__dirname, "../output", "output.txt");
  fs.writeFile(outPutFilePath, newListData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File write operation completed successfully.");
  });
  res.send("Files processed successfully!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
