class clsLoginRequest {
    userName: string = "";
    password: string = "";

    constructor(userName: string, password: string) {
        this.password = password;
        this.userName = userName;
    }



}

export default clsLoginRequest;