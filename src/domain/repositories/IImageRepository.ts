export interface IImageRepository {
    save(name: string, base64: string, img_type: string): Promise<string>
}