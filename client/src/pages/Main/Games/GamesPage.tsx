import { ReactElement } from 'react';
import { GamesIcon } from '../../../assets/svg/icons/Menus';
import { PageTemplate } from '../../../components/PageTemplate/PageTemplate';
import { PromptElement } from '../../../components/Prompt/PromptElement';
import { MessageIcon } from '../../../assets/svg/icons/Actions';
import { IconTritone } from '../../../components/Icons/IconTritone';
import { WindowsIcon } from '../../../assets/svg/icons/Platforms';
import { GameTile } from './GameTile';
import './GamesPage.css';

/**
 * Called to generate the games page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function GamesPage(): ReactElement {
    return (
        <PageTemplate title='Games' icon={<IconTritone baseSVG={<GamesIcon />} />} description='Announcing new projects soon!'>
            <div className='game-tile-container'>
                <GameTile title='Gongbat' dateMonth='February' dateYear='2018'
                    description='A 2D side-scrolling shooter arcade game with colorful retro graphics and challenging boss-fights.'
                    platforms={[<WindowsIcon key={'windows'} />]}
                    imageSource={'../uploads/images/Gongbat_Poster.webp'}
                    link={'https://moonvalk.itch.io/gongbat'} />
                <GameTile title='Cinderpatch' dateMonth='September' dateYear='2022'
                    description='A small farming game project built over the course of two weeks.'
                    platforms={[<WindowsIcon key={'windows'} />]}
                    imageSource={'../uploads/images/CinderpatchScreen10.webp'}
                    link={'https://moonvalk.itch.io/cinderpatch'} />
            </div>
            <PromptElement class='tight dark' icon={<MessageIcon />} text='Announcing new projects soon!' />
        </PageTemplate>
    );
}