import { ReactElement, ReactNode } from "react";
import { MessageIcon, PreviewIcon } from "../../assets/svg/icons/Actions";
import { CodeIcon, ImageIcon, TextIcon } from "../../assets/svg/icons/Editor";
import { AboutIcon, ChangelogIcon, ComicsIcon, GamesIcon, HomeIcon, NewsIcon, PressIcon } from "../../assets/svg/icons/Menus";
import { CalendarIcon, CelebrateIcon, FireIcon, HelpIcon, ImportantIcon, InfoIcon, TestIcon } from "../../assets/svg/icons/Misc";

/**
 * All available icon components to be loaded by enumerator via mapping.
 */
export const enum ICON_COMPONENT {
    ABOUT = 'about',
    CALENDAR = 'calendar',
    CELEBRATE = 'celebrate',
    CHANGELOG = 'changelog',
    CODE = 'code',
    COMICS = 'comics',
    GAMES = 'games',
    FIRE = 'fire',
    HELP = 'help',
    HOME = 'home',
    IMAGE = 'image',
    IMPORTANT = 'important',
    INFO = 'info',
    MESSAGE = 'message',
    NEWS = 'news',
    PRESS = 'press',
    PREVIEW = 'preview',
    TEST = 'test',
    TEXT = 'text',
}

/**
 * Map of available icon components to be loaded dynamically based on string.
 */
export const MAP_OF_ICON_COMPONENTS = new Map<ICON_COMPONENT, ReactElement>([
    [ICON_COMPONENT.ABOUT, <AboutIcon />],
    [ICON_COMPONENT.CALENDAR, <CalendarIcon />],
    [ICON_COMPONENT.CELEBRATE, <CelebrateIcon />],
    [ICON_COMPONENT.CHANGELOG, <ChangelogIcon />],
    [ICON_COMPONENT.CODE, <CodeIcon />],
    [ICON_COMPONENT.COMICS, <ComicsIcon />],
    [ICON_COMPONENT.GAMES, <GamesIcon />],
    [ICON_COMPONENT.FIRE, <FireIcon />],
    [ICON_COMPONENT.HELP, <HelpIcon />],
    [ICON_COMPONENT.HOME, <HomeIcon />],
    [ICON_COMPONENT.IMAGE, <ImageIcon />],
    [ICON_COMPONENT.IMPORTANT, <ImportantIcon />],
    [ICON_COMPONENT.INFO, <InfoIcon />],
    [ICON_COMPONENT.MESSAGE, <MessageIcon />],
    [ICON_COMPONENT.NEWS, <NewsIcon />],
    [ICON_COMPONENT.PRESS, <PressIcon />],
    [ICON_COMPONENT.PREVIEW, <PreviewIcon />],
    [ICON_COMPONENT.TEST, <TestIcon />],
    [ICON_COMPONENT.TEXT, <TextIcon />],
]);
