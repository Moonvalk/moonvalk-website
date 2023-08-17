import { ReactElement } from 'react';
import { GamesIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { IconTritone } from '../../../components/Icons/IconTritone';
import { ImageComponent } from '../../../components/Image/ImageComponent';
import { WindowsIcon } from '../../../assets/svg/icons/Platforms';
import { Link } from 'react-router-dom';
import './GamesPage.css';

/**
 * Called to generate the games page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<IconTritone baseSVG={<GamesIcon />} />}
            pageWrap='page_medium' description='Announcing new projects soon!'>
            <div className='game-tile'>
                <ImageComponent className='game-image' source={'../uploads/images/Gongbat_Poster.webp'} />
                <div className='game-details'>
                    <div className='game-title'><Link to={'https://moonvalk.itch.io/gongbat'} target='_blank'><title>Gongbat (2018)</title>Gongbat (2018)</Link></div>
                    <div className='game-description'>
                        A 2D side-scrolling shooter arcade game with colorful retro graphics and challenging boss-fights.
                    </div>
                    <div className='game-play-button'>
                    </div>
                    <div className='game-platforms'>
                        <WindowsIcon />
                    </div>
                </div>
            </div>
            <div className='game-tile'>
                <ImageComponent className='game-image' source={'../uploads/images/CinderpatchScreen10.webp'} />
                <div className='game-details'>
                    <div className='game-title'><Link to={'https://moonvalk.itch.io/cinderpatch'} target='_blank'><title>Cinderpatch (2022)</title>Cinderpatch (2022)</Link></div>
                    <div className='game-description'>
                        A small farming game project built over the course of two weeks.
                    </div>
                    <div className='game-platforms'>
                        <WindowsIcon />
                    </div>
                </div>
            </div>
            <br />
            <PromptElement class='tight' icon={<MessageIcon />} text='Announcing new projects soon!' />
        </PageTemplate>
    );
}