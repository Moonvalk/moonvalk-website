import { Request, Response } from 'express';
import Upload from '../../models/Upload';
import { encode } from 'blurhash';
import sharp from 'sharp';

/**
 * The quality ratio to use when generating compressed webp images.
 */
const WEBP_QUALITY_RATIO = 90;

/**
 * The directory where image uploads will be placed.
 */
const IMAGE_UPLOAD_PATH = '../uploads/images/';

/**
 * Handles creating a new upload doc and posting it to the database.
 * @param {Request} request_ - 
 * @param {Response} response_ - 
 * @return {Promise<void>} void
 */
export async function createUploadController(request_: Request, response_: Response): Promise<void> {
    const { originalname, buffer } = request_.file;

    // Determine new file name and path based on input.
    const splitString = originalname.split('.');
    const extension = splitString[splitString.length - 1];
    const canCompress = (extension === 'png' || extension === 'jpg' || extension === 'jpeg');
    const compressedExtension = (canCompress ? 'webp' : extension);
    const newName = `${splitString[0]}.${compressedExtension}`;
    const newFilePath = `${IMAGE_UPLOAD_PATH}${newName}`;

    // Generate a blurhash from the input image buffer.
    let blurhash: string;
    await sharp(buffer)
        .raw()
        .ensureAlpha()
        .resize(32, 32, {fit: 'inside', withoutEnlargement: true})
        .toBuffer((error_, buffer_, {width, height}) => {
            if (error_) {
                throw error_;
            }
            blurhash = encode(new Uint8ClampedArray(buffer_), width, height, 4, 3);
        });
    const formattedBuffer = await sharp(buffer)
        .resize(1200, 1200, {fit: 'inside', withoutEnlargement: true})
        .webp({quality: WEBP_QUALITY_RATIO})
        .toBuffer();
    
    // Handle generating the new file from buffer data.
    const imageUpload = await (canCompress ?
        sharp(formattedBuffer).webp({quality: 75}).toFile(newFilePath) :
        sharp(formattedBuffer).toFile(newFilePath));

    // Create new upload document that stores source, hash, and name of file.
    const newUpload = await Upload.create({
        source: newFilePath,
        hash: blurhash,
        name: newName,
        aspectRatio: imageUpload.width / imageUpload.height,
    });
    const savedUpload = await newUpload.save();
    console.log(`Saved new upload. Name: ${newUpload.name}, Source: ${newUpload.source}, Hash: ${newUpload.hash}`);
    response_.json(savedUpload);
}
