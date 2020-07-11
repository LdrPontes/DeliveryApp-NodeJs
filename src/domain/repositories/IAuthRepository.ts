import { EnterpriseUser } from "../entities/EnterpriseUser";

export interface IAuthRepository{

    registerEnterprise(): Promise<EnterpriseUser>

    authenticateEnterprise(): Promise<EnterpriseUser>

}

