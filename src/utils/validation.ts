import { ILoginData } from "../types/types";

const validation = (fields: {userName: string, password: string}, users: ILoginData[]): string[] => {
    const errors: string[] = [];
    if(!fields.password || !fields.userName) {
        errors.push("please fill all fields!");
    }
    if (fields.userName.length < 3 && fields.userName) {
        errors.push("The username should be longer!");
    }
    if (fields.password.length < 3 && fields.password) {
        errors.push("Your password must be longer than 3");
    }
    if(errors.length == 0) {
        const isUserExist = users.some(user => user.userName === fields.userName && user.password === fields.password);
        if(!isUserExist) {
            errors.push("Invalid username or password!")
        }

    }
    return errors;
}
export default validation;