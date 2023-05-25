import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { BlogPage } from "./components/pages/BlogPage";
import { IndexPage } from "./components/pages/IndexPage";
import { UserContextProvider } from "./context/UserContextProvider";
import { AboutPage } from "./components/pages/AboutPage";
import { GamesPage } from "./components/pages/GamesPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";


export default function App(): ReactElement {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path='/games' element={<GamesPage />} />
                    <Route path='/blog' element={<BlogPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}
