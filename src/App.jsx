import ReactDOM from "react-dom/client";
import { AppProviders } from "@ultivis/library";
import "@ultivis/style";
import "./index.css";
import { router } from "./router";

import koTranslation from "@locales/ko/translation.json";
import enTranslation from "@locales/en/translation.json";

addLanguagePack("ko", "translation", koTranslation);
addLanguagePack("en", "translation", enTranslation);

// 자동 로그인
// setBasicAuth({
//   tenant: '',
//   user: '',
//   password: '',
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders router={router} login={true} />
);
