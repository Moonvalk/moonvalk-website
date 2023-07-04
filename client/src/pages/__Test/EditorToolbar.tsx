import { ReactElement } from "react";
import { TextIcon, ImageIcon, CodeIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, UnorderedListIcon, ListIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LinkIcon, HorizontalRuleIcon } from "../../assets/svg/icons/Editor";
import { NewPostIcon } from "../../assets/svg/icons/Menus";


export function EditorToolbar(): ReactElement {
    return (
        <div className='editor-buttons'>
            <button className='editor-button' title='Add New Element'><NewPostIcon /></button>
            <button className='editor-button'><TextIcon /></button>
            <button className='editor-button'><ImageIcon /></button>
            <button className='editor-button'><CodeIcon /></button>
            <div className="vertical-break" />
            <select id='font-family' className='editor-select'>
                <option value='abel' className='font_abel'>Abel</option>
                <option value='bebas-neue' className='font_bebas-neue'>Bebas Neue</option>
                <option value='jetbrains-mono' className='font_jetbrains-mono'>Jetbrains Mono</option>
            </select>
            <select id='font-size' className='editor-select'>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='14'>14</option>
                <option value='16'>16</option>
                <option value='18'>18</option>
                <option value='20'>20</option>
                <option value='22'>22</option>
                <option value='24'>24</option>
                <option value='28'>28</option>
                <option value='32'>32</option>
            </select>
            <button className='editor-button'><BoldIcon /></button>
            <button className='editor-button selected'><ItalicIcon /></button>
            <button className='editor-button'><UnderlineIcon /></button>
            <button className='editor-button'><StrikethroughIcon /></button>
            <select id='font-color' className='editor-select'>
                <option value='default' className='color_default'>Default</option>
                <option value='highlight1' className='color_highlight1'>Highlight 1</option>
                <option value='highlight2' className='color_highlight2'>Highlight 2</option>
                <option value='highlight3' className='color_highlight3'>Highlight 3</option>
                <option value='highlight4' className='color_highlight4'>Highlight 4</option>
                <option value='highlight5' className='color_highlight5'>Highlight 5</option>
                <option value='dim1' className='color_dim1'>Dim</option>
                <option value='dim2' className='color_dim2'>Dimmer</option>
            </select>
            <button className='editor-button'><UnorderedListIcon /></button>
            <button className='editor-button'><ListIcon /></button>
            <button className='editor-button'><AlignLeftIcon /></button>
            <button className='editor-button'><AlignCenterIcon /></button>
            <button className='editor-button'><AlignRightIcon /></button>
            <button className='editor-button'><HorizontalRuleIcon /></button>
            <button className='editor-button'><LinkIcon /></button>
        </div>
    );
}
