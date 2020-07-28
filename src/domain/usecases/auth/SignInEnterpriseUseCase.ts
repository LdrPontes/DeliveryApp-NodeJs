import { UseCase } from "../../utils/UseCase";
import { EnterpriseUser } from "../../entities/EnterpriseUser";
import { IAuthRepository } from "../../repositories/IAuthRepository";
import { AuthRepository } from "../../../data/repositories/AuthRepository";

export class SignInEnterpriseUseCase extends UseCase<SignInEnterpriseResponse, SignInEnterpriseParams>{
    private repository: IAuthRepository = new AuthRepository()

    async buildUseCase(params: SignInEnterpriseParams): Promise<SignInEnterpriseResponse> {
        try {
            const enterpriseUser = await this.repository.authenticateEnterprise(params.email, params.password)

            return new SignInEnterpriseResponse(enterpriseUser)
        } catch (error) {
            console.log("Error UseCase")
            throw error
        }

    }

}

export class SignInEnterpriseParams {
    private _email;
    private _password;

    constructor(email: string, password: string) {
        this._email = email
        this._password = password
    }

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }
}

export class SignInEnterpriseResponse {
    private _enterpriseUser: EnterpriseUser = null

    constructor(enterpriseUser: EnterpriseUser) {
        this._enterpriseUser = enterpriseUser;
    }

    get enterpriseUser(): EnterpriseUser {
        return this._enterpriseUser
    }
}