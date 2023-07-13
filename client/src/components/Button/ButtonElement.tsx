import { ReactElement, ReactNode } from "react";

/**
 * Available properties to the ButtonElement.
 */
interface IButtonElementProps {
    /** The text value to be displayed on this button. */
    text?: ReactNode | null,

    /** An optional icon to be displayed on the left side of this button. */
    icon?: ReactNode | null,

    /** A callback to be executed when this button is clicked. */
    onClick?: (event_: React.MouseEvent) => void,

    type?: 'submit' | 'button',

    class?: string | null,
    name?: string,
    value?: string,
}

/**
 * Generates a new Button component.
 * @param {IButtonElementProps} props_ - Configurable properties for this component.
 * @return {ReactElement} A new component.
 */
export function ButtonElement(props_: IButtonElementProps): ReactElement {
    return (
        <button name={props_.name} className={props_.class ? props_.class : 'submit-button'}
            value={props_.value} onClick={props_.onClick} type={props_.type ? props_.type : 'submit'}>
            {props_.icon}
            {props_.text}
        </button>
    );
}
