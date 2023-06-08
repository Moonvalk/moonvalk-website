import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(): ReactElement {
    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}