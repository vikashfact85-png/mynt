import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { Product } from '@/lib/types';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    await connectDB();
    // Sort by _id descending (newest first)
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(12).lean();
    
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

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Placeholder for Hero Image - ideally replaced with next/image if asset exists */}
        <div className="absolute inset-0 bg-[url('/assets/hero-banner.png')] bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="max-w-xl">
            <span className="text-lg font-bold uppercase tracking-widest text-[#ff3f6c] mb-3 block">
              New Season
            </span>
            <h1 className="text-6xl font-black text-[#282c3f] leading-tight mb-6">
              SUMMER<br />
              COLLECTION
            </h1>
            <p className="text-xl text-[#535665] mb-8 font-normal">
              Check out the latest trends and styles from top brands. <br />
              Flat 50-80% OFF on select items.
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="px-10 py-4 bg-[#ff3f6c] text-white font-bold uppercase tracking-wider hover:bg-[#d63359] transition-all rounded shadow-lg">
                Shop Now
              </Link>
              <Link href="/products" className="px-10 py-4 bg-white text-[#282c3f] font-bold uppercase tracking-wider border border-[#282c3f] hover:bg-gray-50 transition-all rounded">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-[#282c3f] uppercase tracking-wide">
              Fresh Arrivals
            </h2>
            <Link href="/products" className="text-[#ff3f6c] font-bold uppercase text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-10">
            {products.map((product: Product) => (
              <div key={product.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}