import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/Product";

export class ProductRepository implements IProductRepository {

    save(title: string, description: string, img_url: string, price: number, enterprise_id: number, section_id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
    read(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    update(id: number, name: string, price: number, section_id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}