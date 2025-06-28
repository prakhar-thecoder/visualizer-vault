const ImageKit = require('imagekit');
require('dotenv').config();

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


const uploadImage = async (file, fileName, folder) => {
    try {
        if (!file) {
            throw new Error('No file provided');
        }

        folder = `PersonalProjects/VisualizerVault/${folder}`;

        // Convert file buffer to base64
        const fileBuffer = file.buffer.toString('base64');

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            folder: folder,
            useUniqueFileName: false,
            overwriteFile: true,
            tags: [folder, 'uploaded-by-api']
        });

        return {
            success: true,
            url: response.url,
            fileId: response.fileId,
            filePath: response.filePath,
            name: response.name,
            size: response.size,
            fileType: response.fileType,
            height: response.height,
            width: response.width,
            thumbnailUrl: response.thumbnailUrl
        };
    } catch (error) {
        console.error('Error uploading to ImageKit:', error);
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

const getAuthParams = () => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        return {
            success: true,
            ...authParams
        };
    } catch (error) {
        console.error('Error generating auth params:', error);
        throw new Error(`Failed to generate auth parameters: ${error.message}`);
    }
};

module.exports = {
    uploadImage,
    getAuthParams
};
