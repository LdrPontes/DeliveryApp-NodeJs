import { OptionalSection } from "../entities/OptionalSection";

export interface IOptionalSectionRepository {
    
    save(name: string, enterprise_id: number): Promise<OptionalSection>

    read(id: number, search: string): Promise<OptionalSection[]>

    update(id: number, name: string): Promise<OptionalSection>

    delete(id: number): Promise<boolean>
} 