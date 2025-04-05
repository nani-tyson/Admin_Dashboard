import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Ensure App.jsx exists in the same directory
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state"; // Corrected path
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api"; // Corrected path

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);