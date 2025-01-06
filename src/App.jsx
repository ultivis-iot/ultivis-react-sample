import ReactDOM from "react-dom/client";
import { AppProviders } from "@ultivis/library";
import "@ultivis/style";
import { router } from "./router";

// 자동 로그인
// setBasicAuth({
//   tenant: '',
//   user: '',
//   password: '',
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProviders router={router} login={true} />
);
