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
    payment_method: 'upi' | 'bank_transfer';
    payment_status: 'pending' | 'completed' | 'disputed';
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

// Demo fashion products
export const DEMO_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Slim Fit Casual Shirt',
        brand: 'Roadster',
        description: 'Men Navy Blue & White Regular Fit Checked Casual Shirt',
        price: 699,
        original_price: 1499,
        discount_percent: 53,
        images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Navy Blue', 'White'],
        category: 'men',
        subcategory: 'Shirts',
        stock: 150,
        rating: 4.9,
        reviews_count: 3847,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Floral Print Maxi Dress',
        brand: 'SASSAFRAS',
        description: 'Women Pink & Green Floral Printed Maxi Dress',
        price: 1199,
        original_price: 2999,
        discount_percent: 60,
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Pink', 'Green'],
        category: 'women',
        subcategory: 'Dresses',
        stock: 80,
        rating: 5.0,
        reviews_count: 2156,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Classic Polo T-Shirt',
        brand: 'HRX by Hrithik Roshan',
        description: 'Men Black Solid Polo Collar T-shirt',
        price: 449,
        original_price: 999,
        discount_percent: 55,
        images: ['https://images.unsplash.com/photo-1625910513413-5fc45c79f4c6?w=400'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        category: 'men',
        subcategory: 'T-Shirts',
        stock: 200,
        rating: 4.8,
        reviews_count: 6234,
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'High-Rise Skinny Jeans',
        brand: 'Levis',
        description: 'Women Blue High-Rise Skinny Fit Jeans',
        price: 1799,
        original_price: 3299,
        discount_percent: 45,
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400'],
        sizes: ['26', '28', '30', '32', '34'],
        colors: ['Blue'],
        category: 'women',
        subcategory: 'Jeans',
        stock: 120,
        rating: 4.9,
        reviews_count: 4883,
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        name: 'Printed Kurta Set',
        brand: 'Biba',
        description: 'Women Yellow Printed Kurta with Palazzos',
        price: 1599,
        original_price: 3999,
        discount_percent: 60,
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Yellow', 'Gold'],
        category: 'women',
        subcategory: 'Kurtas',
        stock: 90,
        rating: 5.0,
        reviews_count: 1567,
        created_at: new Date().toISOString(),
    },
    {
        id: '6',
        name: 'Running Shoes',
        brand: 'Nike',
        description: 'Men Black REVOLUTION 6 Running Shoes',
        price: 2995,
        original_price: 4995,
        discount_percent: 40,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
        sizes: ['6', '7', '8', '9', '10', '11'],
        colors: ['Black', 'Red'],
        category: 'men',
        subcategory: 'Sports Shoes',
        stock: 75,
        rating: 4.9,
        reviews_count: 7892,
        created_at: new Date().toISOString(),
    },
    {
        id: '7',
        name: 'Cotton Printed T-Shirt',
        brand: 'H&M',
        description: 'Boys Blue Printed Round Neck T-shirt',
        price: 349,
        original_price: 599,
        discount_percent: 42,
        images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
        colors: ['Blue'],
        category: 'kids',
        subcategory: 'T-Shirts',
        stock: 180,
        rating: 4.8,
        reviews_count: 892,
        created_at: new Date().toISOString(),
    },
    {
        id: '8',
        name: 'Ethnic Lehenga Choli',
        brand: 'Fabindia',
        description: 'Girls Pink & Gold Lehenga Choli with Dupatta',
        price: 1999,
        original_price: 4999,
        discount_percent: 60,
        images: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'],
        sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
        colors: ['Pink', 'Gold'],
        category: 'kids',
        subcategory: 'Ethnic Wear',
        stock: 50,
        rating: 5.0,
        reviews_count: 456,
        created_at: new Date().toISOString(),
    },
    {
        id: '9',
        name: 'Cushion Cover Set',
        brand: 'HomeKraft',
        description: 'Set of 5 Multicoloured Ethnic Motifs Square Cushion Covers',
        price: 599,
        original_price: 1299,
        discount_percent: 54,
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'],
        sizes: ['16x16 inch', '18x18 inch'],
        colors: ['Multicoloured'],
        category: 'home',
        subcategory: 'Cushion Covers',
        stock: 200,
        rating: 4.9,
        reviews_count: 2847,
        created_at: new Date().toISOString(),
    },
    {
        id: '10',
        name: 'Matte Lipstick',
        brand: 'MAC',
        description: 'Retro Matte Lipstick - Ruby Woo',
        price: 1750,
        original_price: 1950,
        discount_percent: 10,
        images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'],
        sizes: ['3g'],
        colors: ['Ruby Red'],
        category: 'beauty',
        subcategory: 'Lipstick',
        stock: 100,
        rating: 5.0,
        reviews_count: 3291,
        created_at: new Date().toISOString(),
    },
    {
        id: '11',
        name: 'Slim Fit Blazer',
        brand: 'Van Heusen',
        description: 'Men Navy Blue Slim Fit Single-Breasted Blazer',
        price: 3999,
        original_price: 7999,
        discount_percent: 50,
        images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
        sizes: ['38', '40', '42', '44', '46'],
        colors: ['Navy Blue'],
        category: 'men',
        subcategory: 'Blazers',
        stock: 40,
        rating: 4.8,
        reviews_count: 1876,
        created_at: new Date().toISOString(),
    },
    {
        id: '12',
        name: 'Embroidered Saree',
        brand: 'Sabyasachi',
        description: 'Women Maroon & Gold Embroidered Silk Saree',
        price: 8999,
        original_price: 15999,
        discount_percent: 44,
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'],
        sizes: ['Free Size'],
        colors: ['Maroon', 'Gold'],
        category: 'women',
        subcategory: 'Sarees',
        stock: 25,
        rating: 5.0,
        reviews_count: 734,
        created_at: new Date().toISOString(),
    },
];

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
