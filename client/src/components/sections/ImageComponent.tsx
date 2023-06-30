import { ReactElement, useEffect, useState } from "react";
import { Blurhash } from 'react-blurhash';
import { getServerURI } from "../../utils/URIHelper";
import './styles/ImageComponent.css';

interface IHashData {
    hash: string,
    aspect: number,
}

interface IImageComponentProps {
    source_: string,
    alt_?: string,
}

export function ImageComponent({source_, alt_}: IImageComponentProps): ReactElement {
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
        image.src = source_;
        
        const sourceSplit = source_.split('\\');
        const imageId = sourceSplit[sourceSplit.length - 1];
        fetch(getServerURI('api/image-hash/'.concat(imageId)), {
            method: 'GET',
        }).then((response_) => {
            response_.json().then((hashData_: IHashData) => {
                setHashData(hashData_);
            }
        )});
    }, [source_]);

    return (
        <>
            <div className='image-container' style={{aspectRatio: hashData.aspect}}>
                {imageLoaded && (
                    <img className='image-component'
                        src={source_} alt={alt_ ? alt_ : ''} />
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
