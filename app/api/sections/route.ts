import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SectionModel } from '@/lib/models';

// GET all active sections
export async function GET() {
    try {
        await connectDB();
        const sections = await SectionModel.find({ is_active: true })
            .sort({ display_order: 1 })
            .lean();

        const formatted = sections.map(s => ({
            ...s,
            id: s._id.toString(),
            _id: undefined,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching sections:', error);
        return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
    }
}

// POST create new section
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const section = await SectionModel.create(body);

        const formatted = {
            ...section.toObject(),
            id: section._id.toString(),
            _id: undefined,
        };

        return NextResponse.json(formatted, { status: 201 });
    } catch (error) {
        console.error('Error creating section:', error);
        return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
    }
}
