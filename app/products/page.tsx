import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Product } from '@/lib/types';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    await connectDB();
    const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

    return products.map((p: any) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#282c3f] uppercase tracking-wide">
            All Products
            <span className="text-[#94969f] text-lg font-normal normal-case ml-2">
              ({products.length} items)
            </span>
          </h1>
        </div>

        {/* Products Grid - Using Flex Wrap */}
        <div className="flex flex-wrap gap-x-3 gap-y-4 md:gap-x-6 md:gap-y-10">
          {products.map((product: Product) => (
            <div key={product.id} className="w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#535665] text-lg">No products found.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}