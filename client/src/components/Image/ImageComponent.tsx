import { CSSProperties, ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { Blurhash } from 'react-blurhash';
import { getServerURI } from "../../utils/URIHelper";
import './ImageComponent.css';

/**
 * Represents image data pulled from the server.
 */
export interface IImageData {
    source?: string,
    name?: string,
    hash: string,
    aspectRatio: number,
    type?: string,
}

/**
 * Available properties for an Image component.
 */
interface IImageComponentProps {
    source: string,
    alt?: string,
    className?: string,
    caption?: (string | ReactElement)[] | null,
    backgroundImage?: boolean,
}

/**
 * Generates a new Image component.
 * @param {IImageComponentProps} props_ - Configurable properties for this component.
 * @return {ReactElement} A new component.
 */
export function ImageComponent(props_: IImageComponentProps): ReactElement {
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayHash, setDisplayHash] = useState(true);
    const [containerStyle, setContainerStyle] = useState<CSSProperties | null>(null);

    const [imageHash, setImageHash] = useState('006a-q');
    const [aspectRatio, setAspectRatio] = useState(2);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loadingImage) {
            return;
        }
        const image = new Image();
        image.onload = () => {
            setTimeout(() => {
                setImageLoaded(true);
                if (props_.backgroundImage) {
                    setContainerStyle({backgroundImage: `url('${props_.source}')`});
                }
                setTimeout(() => {
                    setDisplayHash(false);
                }, 500);
            }, 0);
        };
        image.src = props_.source;

        loadImageData();
    }, [props_.source]);

    useEffect(() => {
        if (!props_.backgroundImage && containerRef.current) {
            const bounds = containerRef.current.getBoundingClientRect();
            const aspectHeight = (bounds.width / aspectRatio);
            setContainerStyle({height: aspectHeight, aspectRatio: aspectRatio});
        }
    }, [aspectRatio, containerRef]);

    async function loadImageData(): Promise<void> {
        let sourceSplit = props_.source.split('\\');
        sourceSplit = sourceSplit[sourceSplit.length - 1].split('/');
        const imageId = sourceSplit[sourceSplit.length - 1];

        fetch(getServerURI('api/upload/'.concat(imageId)), {
            method: 'GET',
        }).then((response_) => {
            if (response_.ok) {
                response_.json().then((imageData_: IImageData) => {
                    setAspectRatio(imageData_.aspectRatio);
                    setImageHash(imageData_.hash);
                });
            }
        });
        setLoadingImage(true);
    }

    return (
        <>
            <div className={props_.backgroundImage ? props_.className : 'image-container'} style={containerStyle} ref={containerRef}>
                {!props_.backgroundImage && imageLoaded && (
                    <img className={'image-component' + (props_.className ? ` ${props_.className}` : '')}
                        src={props_.source} alt={props_.alt ? props_.alt : ''} />
                )}
                {displayHash && (
                    <>
                        <Blurhash hash={imageHash}
                            className={imageLoaded ?
                                'blurhash blur-component-off' : 'blurhash blur-component-on'}
                            width='100%'
                            height='100%'
                            resolutionX={4}
                            resolutionY={3}
                            punch={1.0} />
                        {!imageLoaded && (
                            <div className="blurhash-loader">
                                <div className="image-loader"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {props_.caption && (
                <div className='image-caption'>
                    {props_.caption}
                </div>
            )}
        </>
    );
}
