import { IOptionalSectionRepository } from "../../domain/repositories/IOptionalSectionRepository";
import { OptionalSection } from "../../domain/entities/OptionalSection";
import { getRepository, Like } from "typeorm";

export class OptionalSectionRepository implements IOptionalSectionRepository {

    async save(name: string, enterprise_id: number): Promise<OptionalSection> {
        try {

            const repository = getRepository(OptionalSection);

            const section = new OptionalSection()

            section.name = name
            section.enterprise_id = enterprise_id

            return await repository.save(section)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id: number, search: string): Promise<OptionalSection[]> {
        try {

            const repository = getRepository(OptionalSection);

            return await repository.find({ where: { enterprise_id: id, name: Like(`%${search}%`) }, relations: ["products"], cache: true})
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id: number, name: string): Promise<OptionalSection> {
        try {

            const repository = getRepository(OptionalSection);

            const result = await repository.update(id, { name: name })

            return await repository.findOneOrFail({ where: { id: id } })
        
        } catch (error) {   
            console.log(error)
            throw error
        }
    }
    
    async delete(id: number): Promise<boolean> {
        try {

            const repository = getRepository(OptionalSection);

            const result  = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}