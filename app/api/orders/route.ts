import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OrderModel } from '@/lib/models';

export const dynamic = 'force-dynamic';

// GET all orders
export async function GET() {
    try {
        await connectDB();
        const orders = await OrderModel.find({}).sort({ created_at: -1 }).lean();

        const formatted = orders.map(o => ({
            ...o,
            id: o._id.toString(),
            _id: undefined,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// POST create new order
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const order = await OrderModel.create(body);

        const formatted = {
            ...order.toObject(),
            id: order._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
