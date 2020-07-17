import { OptionalProduct } from "../entities/OptionalProduct";

export interface IOptionalRepository {
    
    save(name: string, price: number, enterprise_id: number, section_id: number): Promise<OptionalProduct>

    read(id: number): Promise<OptionalProduct>

    update(id: number, name: string, price: number, section_id: number): Promise<OptionalProduct>

    delete(id: number): Promise<void>
} 