// src/data/categories.ts
export interface Subcategory {
    id: number;
    name: string;
  }

export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
  }
  
  
  
  const categories: Category[] = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        { id: 1, name: "Mobile Phones" },
        { id: 2, name: "Computers" },
        { id: 3, name: "Cameras" },
        { id: 4, name: "TVs" },
        { id: 5, name: "Audio devices" },
        { id: 6, name: "Video Games" }
      ]
    },
    {
      id: 2,
      name: "Fashion",
      subcategories: [
        { id: 6, name: "Men’s Clothing" },
        { id: 7, name: "Women’s Clothing" },
        { id: 8, name: "Children’s Clothing" },
        { id: 9, name: "Footwear" },
        { id: 10, name: "Accessories" }
      ]
    },
    {
      id: 3,
      name: "Home and Garden",
      subcategories: [
        { id: 11, name: "Furniture" },
        { id: 12, name: "Home Decor" },
        { id: 13, name: "Gardening Supplies" },
        { id: 14, name: "Tools" },
        { id: 15, name: "Home Appliances" }
      ]
    },
    {
      id: 4,
      name: "Beauty and Health",
      subcategories: [
        { id: 16, name: "Skincare" },
        { id: 17, name: "Makeup" },
        { id: 18, name: "Perfumes" },
        { id: 19, name: "Health Supplements" },
        { id: 20, name: "Personal Care" }
      ]
    },
    {
      id: 5,
      name: "Sports and Leisure",
      subcategories: [
        { id: 21, name: "Sporting Goods" },
        { id: 22, name: "Fitness Equipment" },
        { id: 23, name: "Books" },
        { id: 24, name: "Hobbies" },
        { id: 25, name: "Musical Instruments" }
      ]
    },
    {
        id: 6,
        name: "Automotive",
        subcategories: [
          { id: 26, name: "Parts" },
          { id: 27, name: "Accessories" },
          { id: 28, name: "Cars" }
        ]
      }
    // Add other categories similar to above
  ];
  
  export default categories;
  