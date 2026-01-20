import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

// GET all products or filter by category
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const subcategory = searchParams.get('subcategory');

        let query: any = {};
        if (category) query.category = category;
        if (subcategory) query.subcategory = subcategory;

        const products = await ProductModel.find(query).lean();

        const formatted = products.map(p => ({
            ...p,
            id: p._id.toString(),
            _id: undefined,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST create new product
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const product = await ProductModel.create(body);

        const formatted = {
            ...product.toObject(),
            id: product._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
