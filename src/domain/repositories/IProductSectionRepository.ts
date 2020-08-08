import { ProductSection } from "../entities/ProductSection";

export interface IProductSectionRepository {
    
    save(name: string, enterprise_id: number): Promise<ProductSection>

    read(id: number, search: string): Promise<ProductSection[]>

    update(id: number, name: string): Promise<ProductSection>

    delete(id: number): Promise<boolean>
} 