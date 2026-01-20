import { connectDB } from '../lib/mongodb';
import { ProductModel } from '../lib/models';
import { DEMO_PRODUCTS } from '../lib/types';

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seed...');
        await connectDB();

        // Clear existing products
        await ProductModel.deleteMany({});
        console.log('✅ Cleared existing products');

        // Insert demo products
        const products = await ProductModel.insertMany(DEMO_PRODUCTS);
        console.log(`✅ Inserted ${products.length} products`);

        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
