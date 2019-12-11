export class User {
    id: number;
    name: string = '';
    surname: string = '';
    city: string = '';
    country: string = '';
    email: string = '';
    password: string = '';
    admin: boolean = false;
}

export class Scroll {
    skip: number = 0;
    limit: number = 20;
}
