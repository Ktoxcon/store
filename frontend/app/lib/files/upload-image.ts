import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export type UploadImageArgs = {
  fileName: string;
  formData: FormData;
};

export async function uploadImage({ fileName, formData }: UploadImageArgs) {
  const file = formData.get(fileName) as File;

  if (!file || file.size === 0) {
    return;
  }

  if (!(file instanceof File)) {
    throw new TypeError("Image should be a instance of File");
  }

  console.log("Here");
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });

  const buffer = await file.bytes();

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
      .end(buffer);
  });
}
