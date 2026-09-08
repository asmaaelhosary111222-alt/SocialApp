import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

export default function LayOut() {
  return (
    <>
    <NavBar />
    <Outlet/>
    </>
   
  )
}
