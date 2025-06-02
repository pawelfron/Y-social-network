import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import { PostsProvider } from "./contexts/PostsListContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
          <PostsProvider>
            <App></App>
          </PostsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
); 
