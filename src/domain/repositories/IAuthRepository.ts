import { EnterpriseUser } from "../entities/EnterpriseUser";

export interface IAuthRepository{

    registerEnterprise(name: string, telephone: string, email: string, password: string): Promise<EnterpriseUser>

    authenticateEnterprise(email: string, password: string): Promise<EnterpriseUser>

}

