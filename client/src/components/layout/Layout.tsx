import { ReactElement, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './Layout.css';
import Header from "./Header";
import Footer from "./Footer";
import { SmartSuspense } from "../loading/SmartSuspense";
import { CanvasLoader } from "../scenes/CanvasLoader";
import { DashboardIcon } from "../icons/DashboardIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { NewPostIcon } from "../icons/NewPostIcon";

export default function Layout(): ReactElement {
    const [admin, setAdmin] = useState(true);

    return (
        <main>
            <Header />
            <div className='page-container'>
                {admin && (
                    <div className='header-margin' />
                )}
                <SmartSuspense fallback={<CanvasLoader />}>
                    <Outlet />
                </SmartSuspense>
            </div>
            <Footer />
        </main>
    );
}