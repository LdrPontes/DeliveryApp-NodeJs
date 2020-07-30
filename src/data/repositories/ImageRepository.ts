import { IImageRepository } from "../../domain/repositories/IImageRepository";
import S3 from './../aws/s3config'
import AppError from "../../domain/utils/AppError";

export class ImageRespository implements IImageRepository {
    
    async save(name: string, base64: string, img_type: string): Promise<string> {
        try {


            const response = await (await S3().upload({
                Bucket: 'go-delivery',
                Key: name + '.' + img_type.replace('image/', ''),
                Body: Buffer.from(base64, 'base64'),
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: img_type
            })).promise()
    

            return response.Location

        } catch (error) {
            throw new AppError(500, 'ERROR_UPLOAD_IMAGE', JSON.stringify(error))
        }
      
    }

}