import { ReactElement } from "react";
import { ExternalLinkIcon } from "../../../assets/svg/icons/Actions";
import { BriefcaseIcon, CalendarIcon } from "../../../assets/svg/icons/Misc";
import { Link } from "react-router-dom";

/**
 * Properties available to a timeline block element.
 */
interface IPortfolioTimelineBlockProps {
    /**
     * 
     */
    position: string,

    /**
     * 
     */
    company: string,

    /**
     * 
     */
    date: string,

    /**
     * 
     */
    description: ReactElement,

    /**
     * 
     */
    link?: string,

    /**
     * 
     */
    skills?: string[],

    /**
     * 
     */
    icon?: ReactElement,

    /**
     * 
     */
    companyClass?: string,
}

/**
 * Called to generate a new timeline block for display on the experience timeline.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioTimelineBlock(props_: IPortfolioTimelineBlockProps): ReactElement {
    let skillIndex = 0;

    return (
        <div className='timeline-block'>
            <div className={props_.companyClass ? `timeline-content ${props_.companyClass}` : 'timeline-content'}>
                <div className='experience-title'>
                    <h2>{props_.position}</h2>
                    {props_.link && (
                        <div className='experience-link'>
                            <Link to={props_.link} target='_blank' className='portfolio_link'>
                                <ExternalLinkIcon />
                            </Link>
                        </div>
                    )}
                    <h3>{props_.company}</h3>
                    <div className='timeline-date-mobile'>
                        <CalendarIcon />
                        {props_.date}
                    </div>
                </div>
                
                <div className='experience-description'>{props_.description}</div>
                <div className='experience-skills'>
                    {props_.skills && props_.skills.map((item_) => {
                        return (
                            <div className='experience-skill' key={`skill_` + skillIndex++}>{item_}</div>
                        );
                    })}
                </div>
            </div>
            <div className='timeline-point'>
                <div className='timeline-icon'>
                    {props_.icon}
                </div>
            </div>
            <div className='timeline-date'>
                <CalendarIcon />
                {props_.date}
            </div>
        </div>
    );
}
