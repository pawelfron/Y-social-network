import { useState } from "react";
import LeftBar from "./components/leftBar";
import "./index.css";
import CurrentUser from "./components/currentUser";
import './App.css'
import RightMenu from './segments/RightMenu'


function App() {
  return (
    <>
      <LeftBar />
      <CurrentUser />
      <RightMenu></RightMenu>
    </>
  );
}