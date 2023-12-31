import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer.ts";

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
