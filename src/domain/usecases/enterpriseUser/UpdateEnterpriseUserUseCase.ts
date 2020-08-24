import { UseCase } from "../../utils/UseCase";
import { EnterpriseUser } from "../../entities/EnterpriseUser";
import { IEnterpriseUserRepository } from "../../repositories/IEnterpriseUserRepository";
import { EnterpriseUserRepository } from "../../../data/repositories/EnterpriseUserRepository";

export class UpdateEnterpriseUserUseCase extends UseCase<UpdateEnterpriseUserResponse, UpdateEnterpriseUserParams>{
    private repository: IEnterpriseUserRepository = new EnterpriseUserRepository()

    async buildUseCase(params: UpdateEnterpriseUserParams): Promise<UpdateEnterpriseUserResponse> {
        try {
            const enterpriseUser = await this.repository.update(params.id, params.name, params.telephone, params.email, params.password)

            return new UpdateEnterpriseUserResponse(enterpriseUser)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

}

export class UpdateEnterpriseUserParams {
    id: number
    name: string
    telephone: string
    email: string
    password: string

    constructor(id: number, name: string, telephone: string, email: string, password?: string) {
        this.id = id
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password = password
    }

}

export class UpdateEnterpriseUserResponse {
    enterpriseUser: EnterpriseUser = null

    constructor(enterpriseUser: EnterpriseUser) {
        this.enterpriseUser = enterpriseUser;
    }
}