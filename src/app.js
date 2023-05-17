const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
app.get("/api/readFile", (req, res) => {
  const filePath = "/Users/giangtd/Desktop/ReadTxtNode/file/good.txt";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    const jsonData = JSON.stringify(data);
    const arrayData = jsonData.split("===============");
    const listData = [];
    arrayData.map((item) => {
      const usernameStartIndex = item.indexOf("Username:") + "Username:".length;
      const usernameEndIndex = item.indexOf("Password:");
      const passwordStartIndex = item.indexOf("Password:") + "Password:".length;
      const passwordEndIndex = item.indexOf("Application:");
      const applicationStartIndex =
        item.indexOf("Application:") + "Application:".length;

      // Extracting the values from the item
      const username = item
        .substring(usernameStartIndex, usernameEndIndex)
        .trim()
        .replace("\\r\\n", "");
      const password = item
        .substring(passwordStartIndex, passwordEndIndex)
        .trim()
        .replace("\\r\\n", "");
      const application = item
        .substring(applicationStartIndex)
        .trim()
        .replace("\\r\\n", "");

      // Creating the output object
      // const output = {
      //   Username: username,
      //   Password: password,
      //   Application: application,
      // };
      const output = `${username}:${password}`;
      listData.push(output);
    });
    const newListData = listData.join("\n");
    const outPutFilePath =
      "/Users/giangtd/Desktop/ReadTxtNode/output/output.txt";
    fs.writeFile(outPutFilePath, newListData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("File write operation completed successfully.");
    });
    res.send(listData.slice(0, listData.length - 1));
  });
});

app.get("/api/readFile2", (req, res) => {
  const folderPath = "/Users/giangtd/Desktop/ReadTxtNode/file";
  const filePath = "/Users/giangtd/Desktop/ReadTxtNode/output/output.txt";
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    const dataArray = [];

    files.forEach((file) => {
      const fileExtension = path.extname(file);
      if (fileExtension === ".txt") {
        const filePath = path.join(folderPath, file);
        const fileData = fs.readFileSync(filePath, "utf8").trim();
        dataArray.push(fileData);
      }
    });

    // const data = dataArray.join("\n");
    const jsonData = JSON.stringify(dataArray);
    const arrayData = jsonData.split("===============");
    const listData = [];
    arrayData.map((item) => {
      const usernameStartIndex = item.indexOf("Username:") + "Username:".length;
      const usernameEndIndex = item.indexOf("Password:");
      const passwordStartIndex = item.indexOf("Password:") + "Password:".length;
      const passwordEndIndex = item.indexOf("Application:");
      const applicationStartIndex =
        item.indexOf("Application:") + "Application:".length;

      // Extracting the values from the item
      const username = item
        .substring(usernameStartIndex, usernameEndIndex)
        .trim()
        .replace("\\r\\n", "");
      const password = item
        .substring(passwordStartIndex, passwordEndIndex)
        .trim()
        .replace("\\r\\n", "");
      const application = item
        .substring(applicationStartIndex)
        .trim()
        .replace("\\r\\n", "");

      // Creating the output object
      // const output = {
      //   Username: username,
      //   Password: password,
      //   Application: application,
      // };
      const output = `${username}:${password}`;
      listData.push(output);
    });
    const newListData = listData.join("\n");
    const outPutFilePath =
      "/Users/giangtd/Desktop/ReadTxtNode/output/output.txt";
    fs.writeFile(outPutFilePath, newListData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("File write operation completed successfully.");
    });
    res.send(listData.slice(0, listData.length - 1));
  });
});
const port = 1998; // Choose a port number

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
