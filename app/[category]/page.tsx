import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models';

export async function generateStaticParams() {
  return [
    { category: 'men' },
    { category: 'women' },
    { category: 'home' },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Direct mapping since we unified URLs
  const dbCategory = category;

  // Validate category
  const validCategories = ['men', 'women', 'home'];
  
  if (!validCategories.includes(dbCategory)) {
     notFound();
  }

  await connectDB();
  const dbProducts = await ProductModel.find({ category: dbCategory }).lean();
  const products = JSON.parse(JSON.stringify(dbProducts));

  const categoryTitle = category === 'home' ? 'Home & Living' : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
        <Header />
        
        <main className="container py-8 min-h-[60vh]">
            <h1 className="text-3xl font-extrabold uppercase tracking-widest mb-8 text-[var(--text-primary)]">{categoryTitle}</h1>
            
            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-[var(--text-secondary)]">No products found in this category.</p>
                </div>
            )}
        </main>

        <Footer />
    </div>
  );
}
