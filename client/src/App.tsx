import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './components/context/UserContextProvider';
import Layout from './components/Layout';
import { AboutPage } from './components/pages/AboutPage';
import { ComicsPage } from './components/pages/ComicsPage';
import { GamesPage } from './components/pages/GamesPage';
import { IndexPage } from './components/pages/IndexPage';
import { LoginPage } from './components/pages/LoginPage';
import { NewsPage } from './components/pages/NewsPage';
 
function App(): ReactElement {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path='/games' element={<GamesPage />} />
                    <Route path='/news' element={<NewsPage />} />
                    <Route path='/comics' element={<ComicsPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/press' element={<IndexPage />} />
                    <Route path='/contact' element={<IndexPage />} />
                    <Route path='/changelog' element={<IndexPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
