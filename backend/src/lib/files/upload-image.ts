import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export async function uploadImage(image?: Express.Multer.File) {
  if (!image) {
    throw new TypeError(`Expected image file, got ${image}`);
  }

  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, uploadResult) => {
        if (error) {
          return reject(error);
        }

        if (!uploadResult) {
          return reject(new Error("Missing response from provider"));
        }

        return resolve(uploadResult);
      })
      .end(image.buffer);
  });
}
