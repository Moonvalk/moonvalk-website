import { ReactElement } from "react";
import { ImageComponent } from "../../../components/Image/ImageComponent";
import { Link } from "react-router-dom";

interface IGameTileProps {
    dateMonth: string,
    dateYear: string,
    title: string,
    description: string,
    imageSource: string,
    link: string,
    platforms?: ReactElement[],
}

/**
 * Called to generate a game tile found on the games page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function GameTile(props_: IGameTileProps): ReactElement {
    return (
        <div className='game-tile'>
            <div className='meta'>
                <ImageComponent className='photo' source={props_.imageSource} backgroundImage />\
                <div className='details'>
                    <div className='flex space-between'>
                        <div>
                            <li className='date month-day'>{props_.dateMonth}</li>
                            <li className='date year'>{props_.dateYear}</li>
                        </div>
                    </div>
                </div>
            </div>
            <div className='description-container'>
                <div className='description'>
                    <h1><Link to={props_.link} target='_blank'>{props_.title}</Link></h1>
                    <p>{props_.description}</p>
                    <div className='platforms'>
                        {props_.platforms && props_.platforms.map((item_) => {
                            return (item_);
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
