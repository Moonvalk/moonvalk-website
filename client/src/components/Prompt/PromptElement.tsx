import { ReactElement, ReactNode } from "react";

/**
 * Properties available to a PromptElement for display.
 */
interface IPromptElementProps {
    /**
     * The text to be displayed on this prompt.
     */
    text: ReactNode | null,

    /**
     * An optional icon to be displayed on this prompt.
     */
    icon?: ReactNode | null,

    /**
     * Additional class names to assign to this prompt element.
     */
    class?: string,

    hideTextWrapper?: boolean,
}

/**
 * Generates a new prompt element for display on the page.
 * @param {IPromptElementProps} props_ - All properties used to set up this prompt.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PromptElement(props_: IPromptElementProps): ReactElement {
    return (
        <div className={`prompt ${props_.class ? props_.class : ''}`}>
            {props_.icon}
            {!props_.hideTextWrapper && (
                <p className='text_body'>{props_.text}</p>
            )}
            {props_.hideTextWrapper && (
                <>
                    {props_.text}
                </>
            )}
        </div>
    )
}