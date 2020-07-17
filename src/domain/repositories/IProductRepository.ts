import { Product } from "../entities/Product";

export interface IProductRepository {
    
    save(title: string, description: string, img_url: string, price: number, enterprise_id: number, section_id: number): Promise<Product>

    read(id: number): Promise<Product>

    update(id: number, title: string, description: string, img_url: string, price: number, section_id: number): Promise<Product>

    delete(id: number): Promise<boolean>
} 