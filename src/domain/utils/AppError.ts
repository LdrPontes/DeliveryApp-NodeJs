class AppError {
    public readonly message: string;

    public readonly name: string;

    public readonly status: number;

    constructor(statusCode = 400, statusName: string , message: string) {
        this.status = statusCode;
        this.name = statusName
        this.message = message;

    }
}

export default AppError;