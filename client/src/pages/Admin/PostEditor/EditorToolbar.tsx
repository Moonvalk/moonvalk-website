import { ReactElement } from "react";
import { ImageIcon, CodeIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, UnorderedListIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LinkIcon, HorizontalRuleIcon, AlignJustifiedIcon, HTMLIcon } from "../../../assets/svg/icons/Editor";


export function EditorToolbar(): ReactElement {
    return (
        <div className='editor-buttons'>
            {/* <button className='editor-button' title='Add New Element'><NewPostIcon /></button>
            <button className='editor-button'><TextIcon /></button> */}
            {/* <div className="vertical-break" /> */}
            <select id='font-family' className='editor-select' title='Font Family'>
                <option value='abel' className='font_abel'>Abel</option>
                <option value='bebas-neue' className='font_bebas-neue'>Bebas Neue</option>
                <option value='jetbrains-mono' className='font_jetbrains-mono'>Jetbrains Mono</option>
            </select>
            <select id='font-size' className='editor-select' title='Font Size'>
                <option value='p'>Paragraph</option>
                <option value='h1'>Heading 1</option>
                <option value='h2'>Heading 2</option>
                <option value='h3'>Heading 3</option>
                <option value='h4'>Heading 4</option>
                <option value='h5'>Heading 5</option>
                <option value='h6'>Heading 6</option>
            </select>
            <button className='editor-button' title='Bold'><BoldIcon /></button>
            <button className='editor-button' title='Italic'><ItalicIcon /></button>
            <button className='editor-button' title='Underline'><UnderlineIcon /></button>
            <button className='editor-button' title='Strikethrough'><StrikethroughIcon /></button>
            <select id='font-color' className='editor-select' title='Font Color'>
                <option value='default' className='color_default'>Default</option>
                <option value='highlight1' className='color_highlight1'>Highlight 1</option>
                <option value='highlight2' className='color_highlight2'>Highlight 2</option>
                <option value='highlight3' className='color_highlight3'>Highlight 3</option>
                <option value='highlight4' className='color_highlight4'>Highlight 4</option>
                <option value='highlight5' className='color_highlight5'>Highlight 5</option>
                <option value='dim1' className='color_dim1'>Dim</option>
                <option value='dim2' className='color_dim2'>Dimmer</option>
            </select>
            <button className='editor-button' title='Insert Unordered List'><UnorderedListIcon /></button>
            {/* <button className='editor-button' title='Ordered List'><ListIcon /></button> */}
            <button className='editor-button' title='Align Left'><AlignLeftIcon /></button>
            <button className='editor-button' title='Align Center'><AlignCenterIcon /></button>
            <button className='editor-button' title='Align Right'><AlignRightIcon /></button>
            <button className='editor-button' title='Align Justified'><AlignJustifiedIcon /></button>
            <button className='editor-button' title='Insert Horizontal Rule'><HorizontalRuleIcon /></button>
            <button className='editor-button' title='Insert Link'><LinkIcon /></button>
            <button className='editor-button' title='Insert Image'><ImageIcon /></button>
            <button className='editor-button' title='Insert Codeblock'><CodeIcon /></button>
            <button className='editor-button' title='Insert HTML'><HTMLIcon /></button>
        </div>
    );
}
