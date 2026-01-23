import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Mock upload - in a real app, you would upload to Cloudinary/S3 here
        // For now, we'll return a fake URL
        const mockUrl = `https://placehold.co/600x400?text=Payment+Screenshot`;

        return NextResponse.json({
            url: mockUrl,
            message: 'Upload successful'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}
