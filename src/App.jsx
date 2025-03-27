import ReactDOM from "react-dom/client";
import { AppProviders, addLanguagePack, widgetManager } from "@ultivis/library";
import "@ultivis/style";
import "../library/ultivis-react-library.css";
import { router } from "./router";

import koTranslation from "@locales/ko/translation.json";
import enTranslation from "@locales/en/translation.json";

import html from "./html";

addLanguagePack("ko", "translation", koTranslation);
addLanguagePack("en", "translation", enTranslation);

widgetManager.register(html);

// 자동 로그인
// setBasicAuth({
//   tenant: '',
//   user: '',
//   password: '',
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders router={router} login={true} />
);
