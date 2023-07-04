import { ReactElement, useEffect, useState } from "react";
import { Blurhash } from 'react-blurhash';
import { getServerURI } from "../../utils/URIHelper";
import './ImageComponent.css';

/**
 * Represents image data pulled from the server.
 */
interface IHashData {
    hash: string,
    aspect: number,
}

/**
 * Available properties for an Image component.
 */
interface IImageComponentProps {
    source: string,
    alt?: string,
    className?: string,
}

/**
 * Generates a new Image component.
 * @param {IImageComponentProps} props - Configurable properties for this component.
 * @return {ReactElement} A new component.
 */
export function ImageComponent(props: IImageComponentProps): ReactElement {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayHash, setDisplayHash] = useState(true);
    const [hashData, setHashData] = useState<IHashData>({
        hash: 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
        aspect: 2,
    });

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setTimeout(() => {
                setImageLoaded(true);
                setTimeout(() => {
                    setDisplayHash(false);
                }, 500);
            }, 1000);
        };
        image.src = props.source;
        
        const sourceSplit = props.source.split('\\');
        const imageId = sourceSplit[sourceSplit.length - 1];
        fetch(getServerURI('api/image-hash/'.concat(imageId)), {
            method: 'GET',
        }).then((response_) => {
            response_.json().then((hashData_: IHashData) => {
                setHashData(hashData_);
            }
        )});
    }, [props.source]);

    return (
        <>
            <div className='image-container' style={{aspectRatio: hashData.aspect}}>
                {imageLoaded && (
                    <img className={'image-component' + (props.className ? ` ${props.className}` : '')}
                        src={props.source} alt={props.alt ? props.alt : ''} />
                )}
                {displayHash && (
                    <>
                        <Blurhash hash={hashData.hash}
                            className={imageLoaded ?
                                'blurhash blur-component-off' : 'blurhash blur-component-on'}
                            width='100%'
                            height='100%'
                            resolutionX={32}
                            resolutionY={32}
                            punch={1.5} />
                        {!imageLoaded && (
                            <div className="blurhash-loader">
                                <div className="image-loader"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
