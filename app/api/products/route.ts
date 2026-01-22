import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

export const dynamic = 'force-dynamic';

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

        if (!products) {
            return NextResponse.json([]);
        }

        const formatted = products.map(p => ({
            ...p,
            id: p._id.toString(),
            _id: undefined,
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', details: error.message }, 
            { status: 500 }
        );
    }
}

// POST create new product
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Auto-generate rating (4.8, 4.9, or 5.0) if not provided
        if (!body.rating || body.rating === 0) {
            const ratings = [4.8, 4.9, 5.0];
            body.rating = ratings[Math.floor(Math.random() * ratings.length)];
        }

        // Auto-generate purchase count (2-4 digits: 10-9999) if not provided
        if (!body.reviews_count || body.reviews_count === 0) {
            const minDigits = 2;
            const maxDigits = 4;
            const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;

            if (digits === 2) {
                body.reviews_count = Math.floor(Math.random() * 90) + 10; // 10-99
            } else if (digits === 3) {
                body.reviews_count = Math.floor(Math.random() * 900) + 100; // 100-999
            } else {
                body.reviews_count = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
            }
        }

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
