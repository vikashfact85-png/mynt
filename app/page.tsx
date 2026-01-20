import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { DEMO_PRODUCTS, CATEGORIES } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

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

export default async function Home() {
  const products = await getProducts();

  const menProducts = products.filter((p: any) => p.category === 'men').slice(0, 5);
  const womenProducts = products.filter((p: any) => p.category === 'women').slice(0, 5);
  const trendingProducts = products.slice(0, 10);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      {/* Hero Banner - Premium & Centered */}
      <section className="relative h-[600px] flex items-center bg-[url('/assets/hero-banner.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />

        <div className="container relative z-10 animate-fade-in">
          <div className="max-w-xl">
            <span className="text-xl font-bold uppercase tracking-wider text-[var(--primary)] mb-4 block">
              Spring / Summer '26
            </span>
            <h1 className="text-7xl font-black text-[var(--text-primary)] leading-tight mb-6">
              NEW SEASON<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-pink-600">ARRIVALS</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 font-medium">
              Check out the latest trends and styles from top brands. <br />
              Flat 50-80% OFF on select items.
            </p>
            <div className="flex gap-4 items-center">
              <Link href="/products" className="px-20 py-14 bg-[var(--primary)] text-white font-bold uppercase tracking-widest hover:scale-105 hover:bg-opacity-90 transition-all rounded-xl shadow-2xl flex items-center justify-center">
                Shop Collection
              </Link>
              <Link href="/men" className="px-20 py-14 bg-transparent text-[var(--text-primary)] font-bold uppercase tracking-widest border-2 border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white hover:scale-105 transition-all rounded-xl flex items-center justify-center">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category - MASSIVE TOP SPACING */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32  mt-24 md:mt-32">
        <div className="container">
          <h2 className="p-60 m-60 text-3xl font-extrabold  mb-16 uppercase tracking-widest text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((category: any) => (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className="group relative h-[320px] overflow-hidden rounded-none bg-[var(--bg-secondary)] cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
                    {category.name}
                  </h3>
                  <span className="text-xs font-bold text-white/80 uppercase tracking-widest border-b border-white/50 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now - MASSIVE TOP SPACING */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[var(--bg-secondary)] mt-24 md:mt-32">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-16 uppercase tracking-widest text-left pl-4 border-l-4 border-[var(--primary)]">
            Trending Now
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best of Brands - MASSIVE TOP SPACING */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-white mt-24 md:mt-32">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-16 uppercase tracking-widest text-center">
            Biggest Deals on Top Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Nike', 'Levis', 'H&M', 'Adidas', 'Puma', 'Roadster'].map((brand) => (
              <Link
                key={brand}
                href="/products"
                className="flex flex-col items-center justify-center h-32 border border-[var(--border-medium)] hover:border-[var(--text-primary)] hover:shadow-lg transition-all duration-300 bg-white group"
              >
                <span className="text-xl font-black text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] uppercase tracking-tighter">
                  {brand}
                </span>
                <span className="mt-2 text-[10px] font-bold text-white bg-[var(--primary)] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  FLAT 50% OFF
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* App Download / Trust Section - MASSIVE TOP SPACING */}
      <section className="pt-40 pb-32 md:pt-48 md:pb-40 bg-[#f4f4f5] mt-24 md:mt-32">
        <div className="container max-w-5xl mx-auto text-center">
          <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-8">
            EXPERIENCE THE MYNT APP
          </h3>
          <div className="flex justify-center gap-6 mb-16">
            <Link href="#" className="hover:opacity-80 transition-opacity transform hover:scale-105 duration-200">
              <Image src="/assets/play-store.png" alt="Get it on Google Play" width={180} height={53} className="h-[53px] w-auto" />
            </Link>
            <Link href="#" className="hover:opacity-80 transition-opacity transform hover:scale-105 duration-200">
              <Image src="/assets/app-store.png" alt="Download on App Store" width={180} height={53} className="h-[53px] w-auto" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="font-bold text-lg text-[var(--text-primary)] mb-2">100% ORIGINAL</h4>
              <p className="text-[var(--text-secondary)]">guarantee for all products at mynt.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </div>
              <h4 className="font-bold text-lg text-[var(--text-primary)] mb-2">Return within 14days</h4>
              <p className="text-[var(--text-secondary)]">of receiving your order</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h4 className="font-bold text-lg text-[var(--text-primary)] mb-2">Get 30 Days</h4>
              <p className="text-[var(--text-secondary)]">free delivery on all orders</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

