import { ReactElement, ReactNode } from "react";

interface IPromptElementProps {
    text: ReactNode | null,
    icon?: ReactNode | null,
}

export function PromptElement(props: IPromptElementProps): ReactElement {
    return (
        <div className='prompt'>
            {props.icon}
            <p className='body-text'>{props.text}</p>
        </div>
    )
}