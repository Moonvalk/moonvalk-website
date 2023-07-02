import { ReactElement, ReactNode } from "react";

interface IButtonElementProps {
    text: ReactNode | null,
    icon?: ReactNode | null,
    onClick?: (event_: React.MouseEvent) => void,
}

export function ButtonElement(props: IButtonElementProps): ReactElement {
    return (
        <button className='submit-button' onClick={props.onClick}>
            {props.icon}
            {props.text}
        </button>
    )
}