import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PageRoutes } from './constants/PageRoutes';
import { LazyImports } from './components/loading/LazyImports';

/**
 * Main app functional component using client side rendering routes.
 * @return {ReactElement} Returns the main routed element to be displayed in the virtual DOM.
 */
export function App(): ReactElement {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/'                 Component={LazyImports.get(PageRoutes.Home)} />
                <Route path='/games'            Component={LazyImports.get(PageRoutes.Games)} />
                <Route path='/news'             Component={LazyImports.get(PageRoutes.News)} />
                <Route path='/comics'           Component={LazyImports.get(PageRoutes.Comics)} />
                <Route path='/about'            Component={LazyImports.get(PageRoutes.About)} />
                <Route path='/login'            Component={LazyImports.get(PageRoutes.Login)} />
                <Route path='/register'         Component={LazyImports.get(PageRoutes.Register)} />
                <Route path='/press'            Component={LazyImports.get(PageRoutes.Press)} />
                <Route path='/contact'          Component={LazyImports.get(PageRoutes.Contact)} />
                <Route path='/changelog'        Component={LazyImports.get(PageRoutes.Changelog)} />
                <Route path='/dashboard'        Component={LazyImports.get(PageRoutes.Dashboard)} />
                <Route path='/settings'         Component={LazyImports.get(PageRoutes.Settings)} />
                <Route path='/create'           Component={LazyImports.get(PageRoutes.CreatePost)} />
                <Route path='/news/edit:postId' Component={LazyImports.get(PageRoutes.EditPost)} />
            </Route>
        </Routes>
    );
}
