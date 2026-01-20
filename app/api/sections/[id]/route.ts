import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SectionModel } from '@/lib/models';

// GET single section
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const section = await SectionModel.findById(id).lean();

        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        const formatted = {
            ...section,
            id: section._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching section:', error);
        return NextResponse.json({ error: 'Failed to fetch section' }, { status: 500 });
    }
}

// PUT update section
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updated = await SectionModel.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        ).lean();

        if (!updated) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        const formatted = {
            ...updated,
            id: updated._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error updating section:', error);
        return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
    }
}

// DELETE section
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const deleted = await SectionModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting section:', error);
        return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
    }
}
