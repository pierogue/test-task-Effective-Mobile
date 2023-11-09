export default interface User {
    name:string,
    age:number,
    password:string
}

export interface UserUpdate {
    id:number,
    newName?:string,
    newAge?:number,
    newPassword?:string
}