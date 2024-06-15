export interface Subcategory {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    category_id: number;
    seller_id: number;
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    image_url: string;
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
    phoneNumber: string; 
}

export interface AddNewProductOnSaleModalProps {
    open: boolean;
    handleClose: () => void;
}

