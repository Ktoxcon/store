import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export type UploadImageArgs = {
  fileName: string;
  formData: FormData;
};

export async function uploadImage({ fileName, formData }: UploadImageArgs) {
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });

  const file = formData.get(fileName);

  if (!file || !(file instanceof File)) {
    throw new Error(
      `File with name ${fileName} was not found in request body.`
    );
  }

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
