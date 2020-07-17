import { ProductSection } from "../entities/ProductSection";

export interface IProductSectionRepository {
    
    save(name: string, enterprise_id: number): Promise<ProductSection>

    read(id: number): Promise<ProductSection>

    update(id: number, name: string): Promise<ProductSection>

    delete(id: number): Promise<void>
} 