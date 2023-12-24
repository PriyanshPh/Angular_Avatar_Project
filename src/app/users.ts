export class Users {
    id: number;
    first_name: string;
    last_name: string;
    email:string;
    gender:string;
    avatar:string;
    domain:string;
    available:string;

    constructor(id:any,first_name:any,last_name:any,email:any,gender:any,avatar:any,domain:any,available:any){
        this.id=id;
        this.first_name=first_name;
        this.last_name=last_name;
        this.email=email;
        this.gender=gender;
        this.avatar=avatar;
        this.domain=domain;
        this.available=available;
    }
}
