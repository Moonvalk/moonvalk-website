import { ReactElement } from "react";

/**
 * All properties available to a tritone icon.
 */
interface IIconTritoneProps {
    baseSVG: ReactElement;
}

/**
 * 
 * @return {ReactElement} 
 */
export function IconTritone(props_: IIconTritoneProps): ReactElement {
    return (
        <div className='tritone-icon'>
            <div className='tritone-one'>{props_.baseSVG}</div>
            <div className='tritone-two'>{props_.baseSVG}</div>
            <div className='tritone-three'>{props_.baseSVG}</div>
        </div>
    );
}
