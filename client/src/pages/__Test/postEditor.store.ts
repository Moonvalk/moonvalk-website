import { create } from 'zustand';

const enum POST_TEXT_COLOR {
    DEFAULT,
    HIGHLIGHT_1,
    HIGHLIGHT_2,
    HIGHLIGHT_3,
    HIGHLIGHT_4,
    HIGHLIGHT_5,
    DIM,
    DIMMER,
}

const enum POST_TEXT_ALIGNMENT {
    LEFT,
    CENTER,
    RIGHT,
}

interface ITextSettings {
    fontSize: number,
    fontFamily: string,
    bold: boolean,
    italic: boolean,
    underlined: boolean,
    strikethrough: boolean,
    color: POST_TEXT_COLOR,
    alignment: POST_TEXT_ALIGNMENT,
}

/**
 * Contract for the post editor store to fulfill.
 */
interface IPostEditor {
    textSettings: ITextSettings,
    setTextSettings: (settings_: ITextSettings) => void,
}

/**
 * Data storage used for tracking post editor settings.
 */
export const postEditorStore = create<IPostEditor>((set) => ({
    textSettings: null,
    setTextSettings: (settings_: ITextSettings) => set({ textSettings: settings_ }),
}));
