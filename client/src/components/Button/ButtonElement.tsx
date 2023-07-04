import { ReactElement, ReactNode } from "react";

/**
 * Available properties to the ButtonElement.
 */
interface IButtonElementProps {
    /** The text value to be displayed on this button. */
    text: ReactNode | null,

    /** An optional icon to be displayed on the left side of this button. */
    icon?: ReactNode | null,

    /** A callback to be executed when this button is clicked. */
    onClick?: (event_: React.MouseEvent) => void,
}

/**
 * Generates a new Button component.
 * @param {IButtonElementProps} props - Configurable properties for this component.
 * @return {ReactElement} A new component.
 */
export function ButtonElement(props: IButtonElementProps): ReactElement {
    return (
        <button className='submit-button' onClick={props.onClick}>
            {props.icon}
            {props.text}
        </button>
    )
}