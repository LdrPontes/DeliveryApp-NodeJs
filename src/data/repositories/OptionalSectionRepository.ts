import { IOptionalSectionRepository } from "../../domain/repositories/IOptionalSectionRepository";
import { OptionalSection } from "../../domain/entities/OptionalSection";

export class OptionalSectionRepository implements IOptionalSectionRepository {

    save(name: string, enterprise_id: number): Promise<OptionalSection> {
        throw new Error("Method not implemented.");
    }

    read(id: number): Promise<OptionalSection> {
        throw new Error("Method not implemented.");
    }

    update(id: number, name: string): Promise<OptionalSection> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}