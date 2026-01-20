import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { OrderModel } from '@/lib/models';

// PUT update order status
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updated = await OrderModel.findByIdAndUpdate(
            id,
            { status: body.status },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        const formatted = {
            ...updated,
            id: updated._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
