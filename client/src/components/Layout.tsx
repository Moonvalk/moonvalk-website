import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ReactElement } from "react";
import './Layout.css';

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