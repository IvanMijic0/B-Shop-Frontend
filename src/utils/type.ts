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
