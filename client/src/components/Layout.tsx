import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import Header from "./Header";
import Footer from "./Footer";
import { SmartSuspense } from "./loading/SmartSuspense";
import { CanvasLoader } from "./scenes/CanvasLoader";

export default function Layout(): ReactElement {
    return (
        <main>
            <Header />
            <div className='content'>
                <SmartSuspense fallback={<CanvasLoader />}>
                    <Outlet />
                </SmartSuspense>
            </div>
            <Footer />
        </main>
    );
}