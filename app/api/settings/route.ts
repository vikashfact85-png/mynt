import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getBankDetails, updateBankDetails } from '@/lib/models';

// GET bank details
export async function GET() {
    try {
        await connectDB();
        const bankDetails = await getBankDetails();
        return NextResponse.json(bankDetails);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

// PUT update bank details
export async function PUT(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const updated = await updateBankDetails(body);
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
