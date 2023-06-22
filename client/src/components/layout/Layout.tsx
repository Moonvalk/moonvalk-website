import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmartSuspense } from "../loading/SmartSuspense";
import { UniversalLoader } from "../loading/UniversalLoader";

export function Layout(): ReactElement {
    const [admin, setAdmin] = useState(true);

    return (
        <main>
            <Header />
            <div className='page-container'>
                {admin && (
                    <div className='header-margin' />
                )}
                <SmartSuspense fallback={<UniversalLoader />}>
                    <Outlet />
                </SmartSuspense>
            </div>
            <Footer />
        </main>
    );
}