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

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
}

export interface TokenPayload {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  seller_id: number;
  created_at: string;
  updated_at: string;
}

export type NewProduct = Omit<Product, "id" | "created_at" | "updated_at">;
