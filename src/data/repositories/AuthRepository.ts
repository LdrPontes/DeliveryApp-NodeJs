import { IAuthRepository } from '../../domain/repositories/IAuthRepository'
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs'
import AppError from '../../domain/utils/AppError';

export class AuthRepository implements IAuthRepository {
 
    async registerEnterprise(name: string, telephone: string, email: string, password: string): Promise<EnterpriseUser> {
        try {

            const enterpriseUserRepository = getRepository(EnterpriseUser);

            const enterpriseUser = new EnterpriseUser()

            enterpriseUser.name = name
            enterpriseUser.telephone = telephone
            enterpriseUser.email = email
            enterpriseUser.password_hash = await bcrypt.hash(password, 8)

            return await enterpriseUserRepository.save(enterpriseUser)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async authenticateEnterprise(email: string, password: string): Promise<EnterpriseUser> {
        try {
            const enterpriseUserRepository = getRepository(EnterpriseUser);

            const result = await enterpriseUserRepository.findOneOrFail({ where: { email }, relations: ["enterprise"]})

            console.log(result)

            if (await bcrypt.compare(password, result.password_hash)) {
                return result
            } else {
                throw new AppError(401, 'INVALID_PASSWORD', 'Incorrect password')
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}