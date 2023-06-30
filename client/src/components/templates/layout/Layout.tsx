import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import './styles/Layout.css';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmartSuspense } from "../../loading/SmartSuspense";
import { UniversalLoader } from "../../loading/UniversalLoader";
import { userAuthStore } from "../../../stores/userAuth.store";

export function Layout(): ReactElement {
    const {userInfo} = userAuthStore();

    return (
        <main>
            <Header />
            <div className='page-container'>
                {userInfo !== null && (
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