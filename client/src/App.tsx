import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './components/context/UserContextProvider';
import Layout from './components/Layout';
import { AboutPage } from './components/pages/AboutPage';
import { BlogPage } from './components/pages/BlogPage';
import { GamesPage } from './components/pages/GamesPage';
import { IndexPage } from './components/pages/IndexPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
 
function App(): ReactElement {
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

export default App;
