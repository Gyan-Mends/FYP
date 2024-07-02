export interface RegistrationInterface {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
}

export interface TicketInterface{
    _id: string,
    subject: string,
    description: string,
    category: string,
    priority: string,
    attachment: string,
    user:string,
    location: string,
    status:string,
    stuff:string,
    admin:string,
}