import { IAuthRepository } from '../../domain/repositories/IAuthRepository'
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs'


export class AuthRepositoryImpl implements IAuthRepository {
 
    async registerEnterprise(name, telephone, email, password): Promise<EnterpriseUser> {
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

    async authenticateEnterprise(email, password): Promise<EnterpriseUser> {
        try {
            const enterpriseUserRepository = getRepository(EnterpriseUser);

            const result = await enterpriseUserRepository.findOneOrFail({ where: { email } })

            console.log(result)

            if (await bcrypt.compare(password, result.password_hash)) {
                return result
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}