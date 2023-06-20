import { ReactElement, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './components/context/UserContextProvider';
import Layout from './components/layout/Layout';

// Set up lazy imports for all react routes.
const Home = lazy(() => import('./components/pages/IndexPage'));
const Games = lazy(() => import('./components/pages/GamesPage'));
const News = lazy(() => import('./components/pages/NewsPage'));
const Comics = lazy(() => import('./components/pages/ComicsPage'));
const About = lazy(() => import('./components/pages/AboutPage'));
const Login = lazy(() => import('./components/pages/LoginPage'));
const Press = lazy(() => import('./components/pages/PressPage'));
const Contact = lazy(() => import('./components/pages/ContactPage'));
const Changelog = lazy(() => import('./components/pages/ChangelogPage'));

/**
 * Main app functional component using client side rendering routes.
 * @return {ReactElement} Returns the main routed element to be displayed in the virtual DOM.
 */
export default function App(): ReactElement {
    return (
        <UserContextProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' Component={Home} />
                        <Route path='/games' Component={Games} />
                        <Route path='/news' Component={News} />
                        <Route path='/comics' Component={Comics} />
                        <Route path='/about' Component={About} />
                        <Route path='/login' Component={Login} />
                        <Route path='/press' Component={Press} />
                        <Route path='/contact' Component={Contact} />
                        <Route path='/changelog' Component={Changelog} />
                    </Route>
                </Routes>
        </UserContextProvider>
    );
}
