import { lazy } from 'react';
import { PageRoutes } from '../constants/PageRoutes';

/**
 * A map containing lazy load imports for all page routes. This enables easy access to
 * components with code splitting for enhanced performance.
 */
export const LazyImports = new Map<PageRoutes, any>();

/**
 * Set up imports for all page routes.
 */

/** MAIN PAGES */
LazyImports.set(PageRoutes.Home, lazy(() => import('../pages/Main/Index/IndexPage')
    .then(module => { return { default: module.IndexPage }})));
LazyImports.set(PageRoutes.Games, lazy(() => import('../pages/Main/Games/GamesPage')
    .then(module => { return { default: module.GamesPage }})));
LazyImports.set(PageRoutes.News, lazy(() => import('../pages/Main/News/NewsPage')
    .then(module => { return { default: module.NewsPage }})));
LazyImports.set(PageRoutes.Comics, lazy(() => import('../pages/Main/Comics/ComicsPage')
    .then(module => { return { default: module.ComicsPage }})));
LazyImports.set(PageRoutes.About, lazy(() => import('../pages/Main/About/AboutPage')
    .then(module => { return { default: module.AboutPage }})));
LazyImports.set(PageRoutes.NewsPost, lazy(() => import('../pages/Main/News/Post/NewsPostPage')
    .then(module => { return { default: module.NewsPostPage }})));

/** FOOTER PAGES */
LazyImports.set(PageRoutes.Press, lazy(() => import('../pages/Footer/Press/PressPage')
    .then(module => { return { default: module.PressPage }})));
LazyImports.set(PageRoutes.Contact, lazy(() => import('../pages/Footer/Contact/ContactPage')
    .then(module => { return { default: module.ContactPage }})));
LazyImports.set(PageRoutes.Privacy, lazy(() => import('../pages/Footer/Support/PrivacyPage')
    .then(module => { return { default: module.PrivacyPage }})));
LazyImports.set(PageRoutes.Support, lazy(() => import('../pages/Footer/Support/SupportPage')
    .then(module => { return { default: module.SupportPage }})));
LazyImports.set(PageRoutes.Changelog, lazy(() => import('../pages/Footer/Changelog/ChangelogPage')
    .then(module => { return { default: module.ChangelogPage }})));

/** USER PAGES */
LazyImports.set(PageRoutes.Login, lazy(() => import('../pages/Login/LoginPage')
    .then(module => { return { default: module.LoginPage }})));
LazyImports.set(PageRoutes.Register, lazy(() => import('../pages/Register/RegisterPage')
    .then(module => { return { default: module.RegisterPage }})));

/** ADMIN PAGES */
LazyImports.set(PageRoutes.Dashboard, lazy(() => import('../pages/Admin/Dashboard/DashboardPage')
    .then(module => { return { default: module.DashboardPage }})));
LazyImports.set(PageRoutes.Settings, lazy(() => import('../pages/Admin/Settings/SettingsPage')
    .then(module => { return { default: module.SettingsPage }})));
LazyImports.set(PageRoutes.CreatePost, lazy(() => import('../pages/Admin/PostEditor/CreatePostPage')
    .then(module => { return { default: module.CreatePostPage }})));
LazyImports.set(PageRoutes.EditPost, lazy(() => import('../pages/Admin/PostEditor/EditPostPage')
    .then(module => { return { default: module.EditPostPage }})));
LazyImports.set(PageRoutes.UploadManager, lazy(() => import('../pages/Admin/Dashboard/UploadManager/UploadManagerPage')
    .then(module => { return { default: module.UploadManagerPage }})));
LazyImports.set(PageRoutes.PostManager, lazy(() => import('../pages/Admin/Dashboard/PostManager')
    .then(module => { return { default: module.PostManager }})));
LazyImports.set(PageRoutes.EmailManager, lazy(() => import('../pages/Admin/Dashboard/EmailManager')
    .then(module => { return { default: module.EmailManager }})));
LazyImports.set(PageRoutes.AnalyticsManager, lazy(() => import('../pages/Admin/Dashboard/AnalyticsManager')
    .then(module => { return { default: module.AnalyticsManager }})));


/** 404 ERROR PAGE */
LazyImports.set(PageRoutes.NotFound, lazy(() => import('../pages/NotFound/NotFoundPage')
    .then(module => { return { default: module.NotFoundPage }})));

/** TEST PAGES */
LazyImports.set(PageRoutes.Test, lazy(() => import('../pages/__Test/TestPage')
    .then(module => { return { default: module.TestPage }})));

/** MISC PAGES */
LazyImports.set(PageRoutes.Portfolio, lazy(() => import('../pages/Misc/Portfolio/PortfolioPage')
    .then(module => { return { default: module.PortfolioPage }})));
LazyImports.set(PageRoutes.Resume, lazy(() => import('../pages/Misc/ResumePage')
    .then(module => { return { default: module.ResumePage }})));
