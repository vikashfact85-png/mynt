// Database types for Myntra Clone

export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    original_price: number;
    discount_percent: number;
    images: string[];
    sizes: string[];
    colors: string[];
    category: 'men' | 'women' | 'kids' | 'home' | 'beauty';
    subcategory: string;
    stock: number;
    rating: number;
    reviews_count: number;
    created_at: string;
}

export interface CartItem {
    product_id: string;
    product: Product;
    size: string;
    color: string;
    quantity: number;
}

export interface WishlistItem {
    product_id: string;
    product: Product;
    added_at: string;
}

export interface Order {
    id: string;
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    items: CartItem[];
    total_amount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    payment_method: 'upi' | 'bank_transfer' | 'cod';
    payment_status: 'pending' | 'completed' | 'disputed';
    transaction_id?: string;
    screenshot_url?: string;
    created_at: string;
}

export interface BankDetails {
    bank_name: string;
    account_number: string;
    account_holder: string;
    ifsc_code: string;
    upi_id: string;
    upi_qr_code_url: string;
}

export const DEFAULT_BANK_DETAILS: BankDetails = {
    bank_name: 'HDFC Bank',
    account_number: '50100123456789',
    account_holder: 'Myntra Fashion Store',
    ifsc_code: 'HDFC0001234',
    upi_id: 'mynt@upi',
    upi_qr_code_url: '',
};

export const CATEGORIES = [
    { id: 'men', name: 'Men', image: '/assets/cat-men.png' },
    { id: 'women', name: 'Women', image: '/assets/cat-women.png' },
    { id: 'home', name: 'Home & Living', image: '/assets/cat-home.png' },
];

export const SUBCATEGORIES = {
    men: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Blazers', 'Sports Shoes', 'Casual Shoes', 'Watches'],
    women: ['Dresses', 'Tops', 'Jeans', 'Kurtas', 'Sarees', 'Heels', 'Handbags', 'Jewellery'],
    kids: ['T-Shirts', 'Dresses', 'Jeans', 'Ethnic Wear', 'Shoes', 'Toys'],
    home: ['Bedsheets', 'Cushion Covers', 'Curtains', 'Wall Decor', 'Kitchen'],
    beauty: ['Lipstick', 'Foundation', 'Skincare', 'Hair Care', 'Fragrances'],
};

export const BRANDS = [
    'Roadster', 'HRX', 'Nike', 'Adidas', 'Levis', 'H&M', 'Zara', 'Van Heusen',
    'SASSAFRAS', 'Biba', 'W', 'Fabindia', 'MAC', 'Lakme', 'Maybelline',
];
