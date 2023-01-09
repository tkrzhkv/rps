import ReactDOM from "react-dom/client";

import "./index.css";
import { RecoilRoot } from "recoil";
import { App } from "app";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
