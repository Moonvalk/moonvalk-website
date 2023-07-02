import { lazy } from 'react';
import { PageRoutes } from '../../constants/PageRoutes';

/**
 * A map containing lazy load imports for all page routes. This enables easy access to
 * components with code splitting for enhanced performance.
 */
export const LazyImports = new Map<PageRoutes, any>();

/**
 * Set up imports for all page routes.
 */

/** MAIN PAGES */
LazyImports.set(PageRoutes.Home, lazy(() => import('../../components/pages/main/IndexPage')
    .then(module => { return { default: module.IndexPage }})));
LazyImports.set(PageRoutes.Games, lazy(() => import('../../components/pages/main/GamesPage')
    .then(module => { return { default: module.GamesPage }})));
LazyImports.set(PageRoutes.News, lazy(() => import('../../components/pages/main/NewsPage')
    .then(module => { return { default: module.NewsPage }})));
LazyImports.set(PageRoutes.Comics, lazy(() => import('../../components/pages/main/ComicsPage')
    .then(module => { return { default: module.ComicsPage }})));
LazyImports.set(PageRoutes.About, lazy(() => import('../../components/pages/main/AboutPage')
    .then(module => { return { default: module.AboutPage }})));
LazyImports.set(PageRoutes.NewsPost, lazy(() => import('../../components/pages/main/NewsPostPage')
    .then(module => { return { default: module.NewsPostPage }})));

/** FOOTER PAGES */
LazyImports.set(PageRoutes.Press, lazy(() => import('../../components/pages/footer/PressPage')
    .then(module => { return { default: module.PressPage }})));
LazyImports.set(PageRoutes.Contact, lazy(() => import('../../components/pages/footer/ContactPage')
    .then(module => { return { default: module.ContactPage }})));
LazyImports.set(PageRoutes.Changelog, lazy(() => import('../../components/pages/footer/ChangelogPage')
    .then(module => { return { default: module.ChangelogPage }})));

/** USER PAGES */
LazyImports.set(PageRoutes.Login, lazy(() => import('../../components/pages/LoginPage')
    .then(module => { return { default: module.LoginPage }})));
LazyImports.set(PageRoutes.Register, lazy(() => import('../../components/pages/RegisterPage')
    .then(module => { return { default: module.RegisterPage }})));

/** ADMIN PAGES */
LazyImports.set(PageRoutes.Dashboard, lazy(() => import('../../components/pages/admin/DashboardPage')
    .then(module => { return { default: module.DashboardPage }})));
LazyImports.set(PageRoutes.Settings, lazy(() => import('../../components/pages/admin/SettingsPage')
    .then(module => { return { default: module.SettingsPage }})));
LazyImports.set(PageRoutes.CreatePost, lazy(() => import('../../components/pages/admin/CreatePostPage')
    .then(module => { return { default: module.CreatePostPage }})));
LazyImports.set(PageRoutes.EditPost, lazy(() => import('../../components/pages/admin/EditPostPage')
    .then(module => { return { default: module.EditPostPage }})));
LazyImports.set(PageRoutes.UploadManager, lazy(() => import('../../components/pages/admin/UploadManagerPage')
    .then(module => { return { default: module.UploadManagerPage }})));


/** 404 ERROR PAGE */
LazyImports.set(PageRoutes.NotFound, lazy(() => import('../../components/pages/NotFoundPage')
    .then(module => { return { default: module.NotFoundPage }})));

/** TEST PAGES */
LazyImports.set(PageRoutes.Test, lazy(() => import('../../components/pages/TestPage')
.then(module => { return { default: module.TestPage }})));