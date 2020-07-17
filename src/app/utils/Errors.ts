import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { QueryFailedError } from "typeorm";

class Errors {
    
    isQueryError(error): boolean {
        if(error instanceof QueryFailedError
        || error instanceof EntityNotFoundError){
            return true
        }
        return false
    }
}

export default new Errors()