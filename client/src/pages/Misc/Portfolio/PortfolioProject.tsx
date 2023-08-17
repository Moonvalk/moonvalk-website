import { ReactElement } from "react";
import { ImageComponent } from "../../../components/Image/ImageComponent";
import { Link } from "react-router-dom";

interface IPortfolioProjectProps {
    dateMonth: string,
    dateYear: string,
    title: string,
    description: string,
    imageSource: string,
    links?: IPortfolioProjectLink[],
    icon: ReactElement,
}

interface IPortfolioProjectLink {
    icon: ReactElement,
    path: string,
    title?: string,
}

/**
 * Called to generate a project tile found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioProject(props_: IPortfolioProjectProps): ReactElement {
    let linkKey = 0;

    return (
        <div className='portfolio-project-tile'>
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
                <div className='icon-container'>
                    {props_.icon}
                </div>
            </div>
            <div className='description'>
                <h1>{props_.title}</h1>
                <p>{props_.description}</p>
                <div className='links'>
                    {props_.links && props_.links.map((item_) => {
                        return (
                            <Link to={item_.path} target='_blank' title={item_.title ? item_.title : ''} key={`${linkKey++}_project_link`}>
                                {item_.icon}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
