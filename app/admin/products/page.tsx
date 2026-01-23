'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Product } from '@/lib/types';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/sections', label: 'Sections' },
    { href: '/admin/settings', label: 'Settings' },
];

const SIZE_CHARTS = {
    clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    footwear: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    kids: ['0-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    freesize: ['Free Size'],
    none: [] as string[],
};

type SizeChartType = keyof typeof SIZE_CHARTS;

export default function AdminProducts() {
    const pathname = usePathname();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '', brand: '', description: '', price: '', original_price: '',
        category: 'men' as Product['category'], subcategory: '', sizes: [] as string[], colors: '', stock: '',
    });
    const [sizeChart, setSizeChart] = useState<SizeChartType>('clothing');
    const [imageUrls, setImageUrls] = useState<string[]>(['']);

    useEffect(() => {
        if (!localStorage.getItem('mynt_admin_token')) { window.location.href = '/admin'; return; }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('Expected array of products but got:', data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out empty image URLs
        const validImages = imageUrls.filter(url => url.trim() !== '');
        if (validImages.length === 0) {
            alert('Please add at least one product image');
            return;
        }

        const productData = {
            name: formData.name,
            brand: formData.brand,
            description: formData.description,
            price: parseFloat(formData.price),
            original_price: parseFloat(formData.original_price),
            discount_percent: Math.round((1 - parseFloat(formData.price) / parseFloat(formData.original_price)) * 100),
            images: validImages,
            sizes: formData.sizes,
            colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
            category: formData.category,
            subcategory: formData.subcategory,
            stock: parseInt(formData.stock),
            rating: editingProduct?.rating || 4.0,
            reviews_count: editingProduct?.reviews_count || 0,
        };

        try {
            if (editingProduct) {
                await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            } else {
                await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            }

            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (p: Product) => {
        setEditingProduct(p);

        // Determine size chart based on category or existing sizes
        let detectedChart: SizeChartType = 'none';
        if (p.sizes && p.sizes.length > 0) {
            if (p.sizes[0].includes('UK')) detectedChart = 'footwear';
            else if (p.sizes[0].includes('M') || p.sizes[0].includes('Y')) detectedChart = 'kids';
            else if (p.sizes[0] === 'Free Size') detectedChart = 'freesize';
            else detectedChart = 'clothing';
        }

        setSizeChart(detectedChart);
        setFormData({
            name: p.name, brand: p.brand, description: p.description, price: p.price.toString(), original_price: p.original_price.toString(),
            category: p.category, subcategory: p.subcategory, sizes: p.sizes, colors: p.colors.join(', '), stock: p.stock.toString(),
        });
        setImageUrls(p.images.length > 0 ? p.images : ['']);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;

        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({ name: '', brand: '', description: '', price: '', original_price: '', category: 'men', subcategory: '', sizes: [], colors: '', stock: '' });
        setSizeChart('clothing');
        setImageUrls(['']);
    };

    const handleSizeToggle = (size: string) => {
        setFormData(prev => {
            const currentSizes = prev.sizes;
            if (currentSizes.includes(size)) {
                return { ...prev, sizes: currentSizes.filter(s => s !== size) };
            } else {
                return { ...prev, sizes: [...currentSizes, size] };
            }
        });
    };

    const addImageField = () => {
        setImageUrls([...imageUrls, '']);
    };

    const removeImageField = (index: number) => {
        if (imageUrls.length === 1) {
            alert('At least one image is required');
            return;
        }
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const updateImageUrl = (index: number, value: string) => {
        const updated = [...imageUrls];
        updated[index] = value;
        setImageUrls(updated);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                updateImageUrl(index, data.url);
            } else {
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Upload failed');
        }
    };

    const filtered = Array.isArray(products)
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <div className="p-8 pb-24">
            <div className="flex items-center justify-between mb-8">
                <div><h2 className="text-2xl font-bold text-slate-900">Products</h2><p className="text-slate-500">Manage your inventory</p></div>
                <button onClick={() => { resetForm(); setShowModal(true); }} className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-rose-600">+ Add Product</button>
            </div>

            <div className="mb-6 max-w-md">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </div>

            {loading ? (
                <div className="text-center py-12">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-[3/4] bg-slate-100">
                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${product.stock > 50 ? 'bg-emerald-100 text-emerald-700' : product.stock > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                                {product.images.length > 1 && (
                                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                        {product.images.length} images
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-semibold text-slate-900">{product.brand}</p>
                                <p className="text-sm text-slate-500 truncate">{product.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
                                    <span className="text-xs text-pink-500 font-medium">{product.discount_percent}% OFF</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleEdit(product)} className="flex-1 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-slate-900">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Brand *</label><input type="text" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" required /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Description *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" rows={2} required /></div>

                            {/* Multiple Images Section */}
                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-slate-700">Product Images * ({imageUrls.filter(u => u.trim()).length} added)</label>
                                    <button type="button" onClick={addImageField} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">+ Add Image</button>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => updateImageUrl(index, e.target.value)}
                                                placeholder={`Image URL ${index + 1}`}
                                                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm"
                                            />
                                            <label className="cursor-pointer px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium whitespace-nowrap">
                                                Upload
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, index)} />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                className="px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">💡 Add multiple images for better product display. First image will be the main thumbnail.</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label><input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Original Price *</label><input type="number" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Stock *</label><input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" required /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Category *</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })} className="w-full px-4 py-2 border border-slate-200 rounded-lg"><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option><option value="home">Home & Living</option><option value="beauty">Beauty</option></select></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Subcategory</label><input type="text" value={formData.subcategory} onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" placeholder="e.g., T-Shirts, Jeans" /></div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Size Type *</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {(['clothing', 'footwear', 'kids', 'freesize', 'none'] as SizeChartType[]).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => {
                                                    setSizeChart(type);
                                                    setFormData({ ...formData, sizes: [] }); // Reset selection on change
                                                }}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize border ${sizeChart === type
                                                    ? 'bg-pink-50 border-pink-500 text-pink-700'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>

                                    {sizeChart !== 'none' && (
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Select Available Sizes:</label>
                                            <div className="flex flex-wrap gap-2">
                                                {SIZE_CHARTS[sizeChart].map((size) => (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() => handleSizeToggle(size)}
                                                        className={`px-3 py-2 rounded-lg text-sm font-bold border transition-all ${formData.sizes.includes(size)
                                                            ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                            {formData.sizes.length === 0 && <p className="text-xs text-amber-600 mt-2">⚠️ No sizes selected. Please select at least one.</p>}
                                        </div>
                                    )}
                                </div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Available Colors (comma separated)</label><input type="text" value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg" placeholder="Black, White, Blue" /></div>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl">{editingProduct ? 'Update' : 'Add'} Product</button>
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

