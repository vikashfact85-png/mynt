import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { DEMO_PRODUCTS, Product } from '@/lib/types';

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.log('Using demo products');
    return DEMO_PRODUCTS;
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
        <div className="flex flex-wrap gap-x-6 gap-y-10">
          {products.map((product: Product) => (
            <div key={product.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
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