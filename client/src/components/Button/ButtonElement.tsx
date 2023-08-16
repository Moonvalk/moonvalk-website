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

    /** Type to be assigned to this button. Submit is used for form submissions. */
    type?: 'submit' | 'button',

    /** Classes to be associated with this button. By default a basic button class is assigned. */
    class?: string | null,

    /** The name of this button. */
    name?: string,

    /** A value to be associated with the press of this button. */
    value?: string,
}

/**
 * Generates a new Button component.
 * @param {IButtonElementProps} props_ - Configurable properties for this component.
 * @return {ReactElement} A new component.
 */
export function ButtonElement(props_: IButtonElementProps): ReactElement {
    return (
        <button name={props_.name} className={props_.class ? props_.class : 'button_basic'}
            value={props_.value} onClick={(event) => { props_.onClick && props_.onClick(event)}} type={props_.type ? props_.type : 'submit'}>
            <div className='icon'>{props_.icon}</div>
            {props_.text}
        </button>
    );
}
