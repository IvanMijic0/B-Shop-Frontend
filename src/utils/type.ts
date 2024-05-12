export interface Subcategory {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    subcategoryId: number;
}

export interface LoginFormData {
    identifier: string;
    password: string;
}

export interface RegistrationFormData {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber:number;
}
