import React from "react";
import { createRoot } from 'react-dom/client';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";

import App from "./App";

const store = createStore(rootReducer);

const root = createRoot(
  document.getElementById("root") as HTMLDivElement
)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
