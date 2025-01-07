const fs = require("fs");
const path = require("path");

const appName = "sample"; // ** 이 부분 변경 **

const filesToUpdate = {
  cumulocity: path.resolve(__dirname, "public/cumulocity.json"),
  manifest: path.resolve(__dirname, "public/manifest.json"),
  packageJson: path.resolve(__dirname, "package.json"),
  envDev: path.resolve(__dirname, ".env.development"),
  envProd: path.resolve(__dirname, ".env.production"),
};

function updateJsonFile(filePath, updates) {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    Object.assign(content, updates);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
    console.log(`Updated ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}

function updateEnvFile(filePath, updates) {
  let content = "";
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf8");
  }

  const lines = content.split("\n");
  const envMap = {};

  lines.forEach((line) => {
    const [key, value] = line.split("=");
    if (key) {
      envMap[key.trim()] = value ? value.trim() : "";
    }
  });

  Object.entries(updates).forEach(([key, value]) => {
    envMap[key] = value;
  });

  const updatedContent = Object.entries(envMap)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(`Updated ${filePath}`);
}

// Step 1: Update cumulocity.json
updateJsonFile(filesToUpdate.cumulocity, {
  name: appName,
  contextPath: appName.toLowerCase(),
  key: appName.toLowerCase(),
});

// Step 2: Update manifest.json
updateJsonFile(filesToUpdate.manifest, {
  name: appName,
  short_name: appName,
});

// Step 3: Update package.json
updateJsonFile(filesToUpdate.packageJson, {
  name: appName,
});

// Step 4: Update .env.development file
updateEnvFile(filesToUpdate.envDev, {
  VITE_APP_NAME: appName,
});

// Step 4: Update .env.production file
updateEnvFile(filesToUpdate.envProd, {
  VITE_APP_NAME: appName,
});

console.log("All files updated successfully!");
