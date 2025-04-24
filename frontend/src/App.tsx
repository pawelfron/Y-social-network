import { useState } from "react";
import "./App.css";
import LeftBar from "./components/leftBar";
import "./index.css";
import CurrentUser from "./components/currentUser";

function App() {
  return (
    <>
      <LeftBar />
      <CurrentUser />
    </>
  );
}

export default App;
