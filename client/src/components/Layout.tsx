import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
import Header from "./Header";

export default function Layout(): ReactElement {
    return (
        <main>
            <Header />
            <div className='page-container'>
                <Outlet />
            </div>
        </main>
    )
}