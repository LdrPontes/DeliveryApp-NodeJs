import { IProductSectionRepository } from "../../domain/repositories/IProductSectionRepository";
import { ProductSection } from "../../domain/entities/ProductSection";

export class ProductionSectionRepository implements IProductSectionRepository {

    save(name: string, enterprise_id: number): Promise<ProductSection> {
        throw new Error("Method not implemented.");
    }

    read(id: number): Promise<ProductSection> {
        throw new Error("Method not implemented.");
    }

    update(id: number, name: string): Promise<ProductSection> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}