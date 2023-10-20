import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CopyRightFooter from "../components/CopyRightFooter";

const Layout = () => {
  return <>
    <CssBaseline />
    <Navbar />
    <Outlet />
    <CopyRightFooter />
  </>;
};

export default Layout;
