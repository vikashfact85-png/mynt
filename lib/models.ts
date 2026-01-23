import mongoose, { Schema, Model } from 'mongoose';
import { Product, Order, BankDetails } from './types';

// Product Schema - Full featured
const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    original_price: { type: Number, required: true },
    discount_percent: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'home', 'beauty'],
        required: true
    },
    subcategory: { type: String, default: '' },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false },
});

// Section Schema - For organizing products on homepage
interface Section {
    id: string;
    title: string;
    subtitle?: string;
    type: 'category' | 'deal' | 'brand' | 'trending' | 'custom';
    category?: string;
    product_ids: string[];
    display_order: number;
    is_active: boolean;
    discount_text?: string;
    created_at: string;
}

const SectionSchema = new Schema<Section>({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    type: {
        type: String,
        enum: ['category', 'deal', 'brand', 'trending', 'custom'],
        required: true
    },
    category: { type: String, default: '' },
    product_ids: { type: [String], default: [] },
    display_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    discount_text: { type: String, default: '' },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false },
});

// Order Schema - Enhanced with cart items
interface CartItemSchema {
    product_id: string;
    product_name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
}

const OrderSchema = new Schema<Order>({
    customer_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    items: {
        type: [{
            product_id: String,
            product_name: String,
            size: String,
            color: String,
            quantity: Number,
            price: Number,
        }],
        required: true
    },
    total_amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment_method: {
        type: String,
        enum: ['upi', 'bank_transfer', 'cod'],
        default: 'upi'
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'disputed'],
        default: 'pending'
    },
    transaction_id: { type: String },
    screenshot_url: { type: String },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false },
});

// Settings Schema (for bank details and other key-value pairs)
interface SettingDocument {
    key: string;
    value: string;
}

const SettingSchema = new Schema<SettingDocument>({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
});


// Export models (use existing models if already compiled)
export const ProductModel: Model<Product> =
    mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);

export const OrderModel: Model<Order> =
    mongoose.models.Order || mongoose.model<Order>('Order', OrderSchema);

export const SectionModel =
    mongoose.models.Section || mongoose.model('Section', SectionSchema);

export const SettingModel: Model<SettingDocument> =
    mongoose.models.Setting || mongoose.model<SettingDocument>('Setting', SettingSchema);


// Helper functions for bank details
export async function getBankDetails(): Promise<BankDetails> {
    const settings = await SettingModel.find({
        key: { $in: ['bank_name', 'account_number', 'account_holder', 'ifsc_code', 'upi_id', 'upi_qr_code_url'] }
    });

    const bankDetails: BankDetails = {
        bank_name: '',
        account_number: '',
        account_holder: '',
        ifsc_code: '',
        upi_id: '',
        upi_qr_code_url: '',
    };

    settings.forEach(setting => {
        if (setting.key in bankDetails) {
            (bankDetails as any)[setting.key] = setting.value;
        }
    });

    return bankDetails;
}

export async function updateBankDetails(details: Partial<BankDetails>): Promise<BankDetails> {
    const updates = Object.entries(details);

    for (const [key, value] of updates) {
        await SettingModel.findOneAndUpdate(
            { key },
            { key, value },
            { upsert: true, new: true }
        );
    }

    return getBankDetails();
}
