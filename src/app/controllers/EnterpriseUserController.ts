import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";

class EnterpriseUserController {
    private enterpriseUserRepository: Repository<EnterpriseUser>

    public constructor(){
        this.enterpriseUserRepository = getManager().getRepository(EnterpriseUser);
    }

    public async registerUser() {
        //  todo
    }

}

const enterpriseUserController = new EnterpriseUserController()
export default enterpriseUserController