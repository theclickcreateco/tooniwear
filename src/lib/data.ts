export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: "boys" | "girls";
    type: string;
    age: string;
    color: string[];
    sizes: string[];
    description: string;
    isNew?: boolean;
    isOnSale?: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Adventure Denim Dungarees",
        price: 34.99,
        originalPrice: 45.00,
        image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=600&auto=format&fit=crop",
        category: "boys",
        type: "dungarees",
        age: "2-4y",
        color: ["Blue"],
        sizes: ["2Y", "3Y", "4Y"],
        description: "Durable denim dungarees for little explorers.",
        isNew: true,
        isOnSale: true,
    },
    {
        id: "2",
        name: "Floral Summer Dress",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1518833278268-517eb99f7ac4?q=80&w=600&auto=format&fit=crop",
        category: "girls",
        type: "dresses",
        age: "4-6y",
        color: ["Pink", "White"],
        sizes: ["4Y", "5Y", "6Y"],
        description: "Lightweight and breezy dress for sunny days.",
        isNew: true,
    },
    {
        id: "3",
        name: "Classic Striped Tee",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=600&auto=format&fit=crop",
        category: "boys",
        type: "t-shirts",
        age: "3-5y",
        color: ["Navy", "White"],
        sizes: ["3Y", "4Y", "5Y"],
        description: "Soft cotton tee with classic nautical stripes.",
    },
    {
        id: "4",
        name: "Sparkle Tulle Skirt",
        price: 24.99,
        originalPrice: 32.00,
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
        category: "girls",
        type: "skirts",
        age: "6-8y",
        color: ["Gold", "Cream"],
        sizes: ["6Y", "7Y", "8Y"],
        description: "Magical tulle skirt for special occasions.",
        isOnSale: true,
    },
    {
        id: "5",
        name: "Urban Cargo Pants",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1519235106638-30cc49da348d?q=80&w=600&auto=format&fit=crop",
        category: "boys",
        type: "pants",
        age: "5-7y",
        color: ["Khaki", "Olive"],
        sizes: ["5Y", "6Y", "7Y"],
        description: "Sturdy cargo pants with multiple pockets.",
    },
    {
        id: "6",
        name: "Rainbow Knit Cardigan",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600&auto=format&fit=crop",
        category: "girls",
        type: "tops",
        age: "4-6y",
        color: ["Rainbow"],
        sizes: ["4Y", "5Y", "6Y"],
        description: "Hand-knit cozy cardigan for chilly evenings.",
        isNew: true
    }
];
