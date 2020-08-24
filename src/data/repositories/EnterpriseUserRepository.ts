import { IEnterpriseUserRepository } from "../../domain/repositories/IEnterpriseUserRepository";
import { getRepository } from "typeorm";
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";
import bcrypt from 'bcryptjs'

export class EnterpriseUserRepository implements IEnterpriseUserRepository {

    async update(id: number, name: string, telephone: string, email: string, password?: string): Promise<EnterpriseUser> {
        try {

            const repository = getRepository(EnterpriseUser);
            
            let password_hash = ''

            if(password){
                password_hash = await bcrypt.hash(password, 8)
            }
            
           
            const values =  { name: name, telephone: telephone, email: email, password_hash: password_hash !== '' ? password_hash : undefined }
            
            await repository.update(id, JSON.parse(JSON.stringify(values)))

            return await repository.findOneOrFail({ where: { email }, relations: ["enterprise"]})

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}