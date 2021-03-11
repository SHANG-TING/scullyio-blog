---
title: '透過 javascript 實現遞迴取得檔案資訊'
tags: javascript
description: 透過 File System Access API 來實作此功能，以及同時也嘗試透過 File and Directory Entries API 提供的 DataTransferItem 來實作
author: 謝尚庭 Neil
published: true
---

# 透過 javascript 實現遞迴取得檔案資訊

## 透過 File System Access API 來實作

```javascript
async function recursive(parent, path = '') {
  let files = [];

  for await (const [name, handler] of parent.entries()) {
    const filepath = `${path}/${name}`

    if (handler.kind === "directory") {
      files = files.concat(await recursive(handler, filepath));
      continue;
    }

    const file = await handler.getFile();
    file.filepath = filepath;
    files.push(file);
  }

  return files;
}

(async () => {
  const root = await window.showDirectoryPicker();
  const files = await recursive(root.name);
  console.log(files);
})();
```

> 直接按 F12 打開開發者工具，且在 console 貼上這段程式碼，就可以體驗功能了~

## 透過 File and Directory Entries API 提供的 DataTransferItem 來實作

- index.js

```javascript
const getFilesFromEntry = async (entry, path = "") =>
  entry.isDirectory
    ? await readDir(entry, path)
    : [await readFile(entry, path)];

const readFile = (entry, path = "") => {
  return new Promise((resolve, reject) => {
    entry.file((file) => {
      file.filepath = path + file.name;
      resolve(file);
    }, reject);
  });
};

const readDir = async (entry, path) => {
  const dirReader = entry.createReader();
  const newPath = `${path + entry.name}/`;

  let files = [];
  let newFiles;

  do {
    newFiles = await dirReadEntries(dirReader, newPath);
    files = files.concat(newFiles);
  } while (newFiles.length > 0);

  return files;
};

const dirReadEntries = (dirReader, path) => {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(async (entries) => {
      let files = [];
      for (let entry of entries) {
        const itemFiles = await getFilesFromEntry(entry, path);
        files = files.concat(itemFiles);
      }
      resolve(files);
    }, reject);
  });
};
```

- index.html

```html
<html>
  <body>
    <div
      class="dropArea"
      style="width: 500px; height: 500px; border: solid black 2px"
    >
      drag & drop files/directories here and check logs in dev console
    </div>

    <script src="index.js"></script>
    <script>
      const dropArea = document.querySelector(".dropArea");
      dropArea.addEventListener("dragover", (evt) => evt.preventDefault());
      dropArea.addEventListener("drop", async (evt) => {
        evt.preventDefault();
        
        const entries = Array.from(evt.dataTransfer.items).map((item) =>
          item.webkitGetAsEntry()
        );

        let files = [];
        for (const entry of entries) {
          files = files.concat(await getFilesFromEntry(entry));
        }

        console.log(files);
      });
    </script>
  </body>
</html>
```

#### 可以玩玩看範例~

<iframe width="100%" height="450px" src="https://stackblitz.com/edit/drag-transfer-items?embed=1&file=index.js"></iframe>

## 參考資料

- <https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API>
- <https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer>
