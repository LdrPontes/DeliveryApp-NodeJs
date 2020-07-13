import { UseCase } from "../utils/UseCase";
import { EnterpriseUser } from "../entities/EnterpriseUser";
import { IAuthRepository } from "../repositories/IAuthRepository";
import { AuthRepositoryImpl } from "../../data/repositories/AuthRepositoryImpl";

export class SignUpEnterpriseUseCase extends UseCase<SignUpEnterpriseResponse, SignUpEnterpriseParams>{
    private repository: IAuthRepository = new AuthRepositoryImpl()

    async buildUseCase(params: SignUpEnterpriseParams): Promise<SignUpEnterpriseResponse> {
        try {
            const enterpriseUser = await this.repository.registerEnterprise(params.name, params.telephone, params.email, params.password)

            return new SignUpEnterpriseResponse(enterpriseUser)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

}

export class SignUpEnterpriseParams {
    private _name;
    private _telephone;
    private _email;
    private _password;

    constructor(name: string, telephone: string, email: string, password: string) {
        this._name = name
        this._telephone = telephone
        this._email = email
        this._password = password
    }
    get name(): string {
        return this._name
    }

    get telephone(): string {
        return this._telephone
    }

    get email(): string {
        return this._email
    }

    get password(): string {
        return this._password
    }
}

export class SignUpEnterpriseResponse {
    private _enterpriseUser: EnterpriseUser = null

    constructor(enterpriseUser: EnterpriseUser) {
        this._enterpriseUser = enterpriseUser;
    }

    get enterpriseUser(): EnterpriseUser {
        return this._enterpriseUser
    }
}