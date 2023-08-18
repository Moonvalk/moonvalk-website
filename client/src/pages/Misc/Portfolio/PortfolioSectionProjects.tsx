import { ReactElement } from "react";
import { AwardIcon, CardsIcon, DiceIcon, RadarIcon, VideoIcon } from "../../../assets/svg/icons/Misc";
import { IconTritone } from "../../../components/Icons/IconTritone";
import { ExternalLinkIcon } from "../../../assets/svg/icons/Actions";
import { PortfolioProject } from "./PortfolioProject";
import { GamesIcon, PressIcon } from "../../../assets/svg/icons/Menus";
import { CodeIcon } from "../../../assets/svg/icons/Editor";

/**
 * Called to generate the projects section found on the portfolio page.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function PortfolioSectionProjects(): ReactElement {
    return (
        <div className='portfolio-projects-section'>
            <h1 className='page-title'>
                <IconTritone baseSVG={<RadarIcon />} />
                Projects
            </h1>
            <hr className='hr_small' />
            <br/>
            <p className='medium align_left indent text_body'>
                Over the years I have worked on a wide variety of different projects from retro arcade games to gambling titles, to even a physical trading card game.
                I have had a <span className='color_highlight1'>pivotal role</span> in the creation and development of each project listed below.
            </p>
            <div className='portfolio-projects-container'>
                <PortfolioProject title='Gongbat'
                    description='
                        Gongbat is a 2D side-scrolling shooter arcade game with colorful retro graphics and challenging boss-fights.
                        This project took hundreds of hours to put together as I created it entirely myself.
                        This includes art assets, design, code, and music all created within my spare time.
                        Once the project was released it won multiple national & state-wide awards for excellence in game design and graphics.'
                    imageSource='../uploads/images/Gongbat_Zenith_Poster2.webp'
                    dateMonth='April' dateYear='2018'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://moonvalk.itch.io/gongbat', title: 'Play Gongbat on Itch.io'},
                        {icon: <AwardIcon />, path: 'https://stemchallenge.org/previous-winners/', title: 'Winner of the 2015 National STEM Challenge'},
                        {icon: <AwardIcon />, path: 'http://www.govart.org/winners/2015winners.htm', title: `Winner of the 2015 Ohio Governor's Art Show`},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/378013566', title: 'Gongbat Kousati Demo Reel'},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/377683105', title: 'Gongbat Official Trailer'},
                        {icon: <PressIcon />, path: 'https://hardcoregamer.com/news/go-batty-with-release-of-pc-shooter-gongbat/145463/', title: 'News Article'},
                        {icon: <PressIcon />, path: 'https://joanganzcooneycenter.org/2016/03/28/meet-the-winners-zack-harmon/', title: 'STEM Challenge News Article'},
                    ]} />
                <PortfolioProject title='Cinderpatch'
                    description='
                        Cinderpatch is a small farming game created for a game jam competition over the course of two weeks during free time.
                        This project is a great example of my skills under strict time restraints.
                        I only had about 40 hours outside of regular full time work to put this project together, and this included game design, artwork, programming, and more.'
                    imageSource='../uploads/images/CinderpatchScreen10.webp'
                    dateMonth='September' dateYear='2022'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://moonvalk.itch.io/cinderpatch', title: `Play Cinderpatch on Itch.io`},
                        {icon: <VideoIcon />, path: 'https://www.youtube.com/watch?v=vY8lgLtlzy0', title: `Cinderpatch Gameplay Video`},
                        {icon: <PressIcon />, path: 'https://itch.io/jam/cozy-autumn-game-jam-2022/rate/1714266', title: `View Results from the Game Jam`},
                    ]} />
                <PortfolioProject title='Lucky Money Tree'
                    description={`
                        Lucky Money Tree is a fast paced online gambling title that I created while working at Boom Entertainment.
                        This game features a cute asian theme and multiplier feature that can lead to outrageous wins.
                        Since this game's launch it has done exceptionally well in every market and continues to be the most popular title in Boom's catalog.`}
                    imageSource='../uploads/images/LuckyMoneyTree.webp'
                    dateMonth='January' dateYear='2023'
                    icon={<DiceIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.booment.com/game/lucky-money-tree', title: `View Lucky Money Tree on Boom Entertainment`},
                        {icon: <PressIcon />, path: 'https://games.gamingintelligence.com/boom-entertainment-expands-into-new-jersey-with-rush-street-interactives-betrivers/',
                            title: 'Related News Article'},
                    ]} />
                <PortfolioProject title='Half Court Shot'
                    description={`
                        Half Court Shot is a sports themed game where you win prizes simply by making baskets.
                        Although it is not truly skill-based and relies strictly on math outcomes this game has gotten players amped up to win.
                        This game continues to perform well months after its release on both mobile and desktop.`}
                    imageSource='../uploads/images/HalfCourtShot.webp'
                    dateMonth='June' dateYear='2023'
                    icon={<DiceIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.booment.com/game/half-court-shot', title: `View Half Court Shot on Boom Entertainment`},
                    ]} />
                <PortfolioProject title='Money Mansion'
                    description={`
                        Money Mansion is a high-roller style money themed reels game for online casinos.
                        This game released very recently but has seen promising results out in the field- even reaching the top ten paying games within RSI Michigan online casino.`}
                    imageSource='../uploads/images/MoneyMansion.webp'
                    dateMonth='July' dateYear='2023'
                    icon={<DiceIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.booment.com/game/money-mansion', title: `View Money Mansion on Boom Entertainment`},
                    ]} />
                <PortfolioProject title='Tic Tac Kablooie'
                    description={`
                        This project is a micro-sized tic-tac-toe game created within two days in vanilla TypeScript.
                        The game engine was created from scratch as well as all assets within the two day time period.
                        Below you can check out my source code for this project to see how much work was involved.`}
                    imageSource='../uploads/images/TicTacKablooie_GameThumbnail.webp'
                    dateMonth='June' dateYear='2022'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: '../projects/tic-tac-kablooie', title: 'Play Tic Tac Kablooie in Browser'},
                        {icon: <CodeIcon />, path: 'https://github.com/Moonvalk/TicTacKablooie', title: 'View Code on Github'},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/718531661', title: `Tic Tac Kablooie Gameplay Video`},
                    ]} />
                <PortfolioProject title='Lucky Stars'
                    description={`
                        Lucky Stars is a series of games I engineered while working at Ainsworth Game Technology.
                        These are land-based casino titles that showcase polished free games features awarded when you hit a lucky spin.
                        I was able to extensive shader/tool work for this project that has assisted Ainsworth's game development since.`}
                    imageSource='../uploads/images/LuckyStarsThumb.webp'
                    dateMonth='November' dateYear='2021'
                    icon={<DiceIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.agtslots.com/us/games/lucky-stars-blazin-hot', title: `View Lucky Stars on Ainsworth Game Technology`},
                        {icon: <VideoIcon />, path: 'https://www.youtube.com/watch?v=FidhpjtS7pE', title: `Lucky Stars Promo Video`},
                        {icon: <VideoIcon />, path: 'https://www.youtube.com/watch?v=1vaTAPsNf2s', title: `Lucky Stars Gameplay Video`},
                    ]} />
                <PortfolioProject title='Cash Attack'
                    description={`
                        Cash Attack is a unique high-roller title with persistent prizes that I developed while at Ainsworth.
                        This is a simple title where prizes are constantly growing until won similar to a traditional jackpot.
                        This game was well received as a flagship title for one of their latest high-end cabinets.`}
                    imageSource='../uploads/images/CashAttackThumb.webp'
                    dateMonth='April' dateYear='2022'
                    icon={<DiceIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.agtslots.com/us/games/cash-attack', title: `View Cash Attack on Ainsworth Game Technology`},
                        {icon: <VideoIcon />, path: 'https://www.youtube.com/watch?v=fqC0LT4DwXw', title: 'Cash Attack Promo Video'},
                    ]} />
                <PortfolioProject title='Argent Saga'
                    description={`
                        An international trading card game featuring detailed card artwork, story, and well-developed strategic gameplay.
                        As a part of this project's launch and first few months on market, I helped to run events across the United States, live stream Championships,
                        design cards, animate advertisements, create products and packaging, produce merchandise, separate artwork and colors, assist in development,
                        manage their website/online marketplace, design logos, and more.`}
                    imageSource='../uploads/images/ArgentSagaThumb.webp'
                    dateMonth='September' dateYear='2020'
                    icon={<CardsIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://www.kickstarter.com/projects/argentsagatcg/argent-saga-trading-card-game', title: `View Argent Saga on Kickstarter`},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/381490217', title: `Argent Saga Website Demo Reel`},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/381474500', title: `Argent Saga Motion Graphics Demo Reel`},
                        {icon: <PressIcon />, path: 'https://www.facebook.com/people/Argent-Saga/100048446811312/', title: `Argent Saga on Facebook`},
                    ]} />
                <PortfolioProject title='Milksoil Mystery'
                    description={`
                        The Milksoil Mystery is a goofy micro-sized horror game I developed over the course of three days for a game jam competition.
                        The game was well received and even garnered a decent amount of small YouTubers who posted their reactions.`}
                    imageSource='../uploads/images/178773-48uycfdj-v4.webp'
                    dateMonth='August' dateYear='2016'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://gamejolt.com/games/milksoil-mystery/178773', title: `Play Milksoil Mystery on GameJolt`},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/383435182', title: `Milksoil Mystery Gameplay Reaction Video`},
                    ]} />
                <PortfolioProject title='Double Dice'
                    description={`
                        Double Dice is a small test project created in Unity to showcase my skills working with 3D assets.
                        The design was requested and therefore extremely simple but I was happy to polish the casino theme of this game further than required.`}
                    imageSource='../uploads/images/Screenshot-3.webp'
                    dateMonth='January' dateYear='2021'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <VideoIcon />, path: 'https://vimeo.com/384325064', title: `Double Dice Gameplay Video`},
                    ]} />
                <PortfolioProject title='Eontrip'
                    description={`
                        Eontrip is a small side-scrolling shooter game made for a game jam competition.
                        I spent grueling hours in my free time creating the sharp pixel graphics and polishing little details to make the unfinished gameplay nice and juicy.`}
                    imageSource='../uploads/images/Eontrip-Future-Level-Design.webp'
                    dateMonth='February' dateYear='2018'
                    icon={<GamesIcon />}
                    links={[
                        {icon: <ExternalLinkIcon />, path: 'https://moonvalk.itch.io/eontrip', title: `Play Eontrip on Itch.io`},
                        {icon: <VideoIcon />, path: 'https://vimeo.com/381690690', title: `Eontrip Gameplay Video`},
                    ]} />
                <PortfolioProject title='Olweus Anti-Bullying Ad'
                    description={`
                        This is a video project I created to raise awareness for the Olweus Anti-Bullying Program in schools across the United States.
                        Their mission is to eliminate bullying in public schools by ensuring that everyone feels involved in their community.`}
                    imageSource='../uploads/images/Olweus-Anti-Bullying-Program3.gif'
                    dateMonth='October' dateYear='2014'
                    icon={<VideoIcon />}
                    links={[
                        {icon: <VideoIcon />, path: 'https://vimeo.com/375203775', title: `Watch on Vimeo`},
                    ]} />
            </div>
        </div>
    );
}
