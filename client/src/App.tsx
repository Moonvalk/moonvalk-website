import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/templates/layout/Layout';
import { PageRoutes } from './constants/PageRoutes';
import { LazyImports } from './components/loading/LazyImports';

/**
 * Main app functional component using client side rendering routes.
 * @return {ReactElement} Returns the main routed element to be displayed in the virtual DOM.
 */
export function App(): ReactElement {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index               Component={LazyImports.get(PageRoutes.Home)} />
                <Route path='/games'                Component={LazyImports.get(PageRoutes.Games)} />
                <Route path='/news'                 Component={LazyImports.get(PageRoutes.News)} />
                <Route path='/comics'               Component={LazyImports.get(PageRoutes.Comics)} />
                <Route path='/about'                Component={LazyImports.get(PageRoutes.About)} />
                <Route path='/login'                Component={LazyImports.get(PageRoutes.Login)} />
                <Route path='/register'             Component={LazyImports.get(PageRoutes.Register)} />
                <Route path='/press'                Component={LazyImports.get(PageRoutes.Press)} />
                <Route path='/contact'              Component={LazyImports.get(PageRoutes.Contact)} />
                <Route path='/changelog'            Component={LazyImports.get(PageRoutes.Changelog)} />
                <Route path='/dashboard'            Component={LazyImports.get(PageRoutes.Dashboard)} />
                <Route path='/dashboard/uploads'    Component={LazyImports.get(PageRoutes.UploadManager)} />
                <Route path='/settings'             Component={LazyImports.get(PageRoutes.Settings)} />
                <Route path='/create'               Component={LazyImports.get(PageRoutes.CreatePost)} />
                <Route path='/news/post/:id'        Component={LazyImports.get(PageRoutes.NewsPost)} />
                <Route path='/news/edit/:id'        Component={LazyImports.get(PageRoutes.EditPost)} />
                <Route path='/test'                 Component={LazyImports.get(PageRoutes.Test)} />
                <Route path='*'                     Component={LazyImports.get(PageRoutes.NotFound)} />
            </Route>
        </Routes>
    );
}
