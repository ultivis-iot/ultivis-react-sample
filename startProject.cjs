const fs = require("fs");
const path = require("path");

// 환경변수 APP_NAME 가져오기
const appName = "sample"; // ** 이 부분 변경 **

// 파일 경로 설정
const filesToUpdate = {
  cumulocity: path.resolve(__dirname, "public/cumulocity.json"),
  manifest: path.resolve(__dirname, "public/manifest.json"),
  packageJson: path.resolve(__dirname, "package.json"),
  envDev: path.resolve(__dirname, ".env.development"),
  envProd: path.resolve(__dirname, ".env.production"),
};

// JSON 파일 업데이트 함수
function updateJsonFile(filePath, updates) {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8")); // 기존 JSON 읽기
    Object.assign(content, updates); // 필드만 덮어쓰기
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8"); // 파일 저장
    console.log(`Updated ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}

// 환경 변수 파일 업데이트 함수
function updateEnvFile(filePath, updates) {
  let content = "";
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf8");
  }

  const lines = content.split("\n"); // 기존 파일의 줄 단위로 분리
  const envMap = {};

  // 기존 환경 변수 파싱
  lines.forEach((line) => {
    const [key, value] = line.split("=");
    if (key) {
      envMap[key.trim()] = value ? value.trim() : "";
    }
  });

  // 업데이트할 값 덮어쓰기
  Object.entries(updates).forEach(([key, value]) => {
    envMap[key] = value;
  });

  // 다시 파일로 저장
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
