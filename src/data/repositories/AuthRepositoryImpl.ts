import { IAuthRepository } from '../../domain/repositories/IAuthRepository'
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";

export class AuthRepositoryImpl implements IAuthRepository {
    registerEnterprise(): Promise<EnterpriseUser> {
        //TODO
        return
    }

    authenticateEnterprise(): Promise<EnterpriseUser> {
        //TODO
        return
    }
}