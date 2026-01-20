'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/sections', label: 'Sections' },
    { href: '/admin/settings', label: 'Settings' },
];

interface Section {
    id: string;
    title: string;
    subtitle?: string;
    type: 'category' | 'deal' | 'brand' | 'trending' | 'custom';
    category?: string;
    product_ids: string[];
    display_order: number;
    is_active: boolean;
    discount_text?: string;
}

interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
}

export default function AdminSections() {
    const pathname = usePathname();
    const [sections, setSections] = useState<Section[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        type: 'custom' as Section['type'],
        category: '',
        display_order: 0,
        is_active: true,
        discount_text: '',
    });

    useEffect(() => {
        if (!localStorage.getItem('mynt_admin_token')) { window.location.href = '/admin'; return; }
        fetchSections();
        fetchProducts();
    }, []);

    const fetchSections = async () => {
        try {
            const res = await fetch('/api/sections');
            const data = await res.json();
            setSections(data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            product_ids: selectedProducts,
        };

        try {
            if (editingSection) {
                await fetch(`/api/sections/${editingSection.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch('/api/sections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            resetForm();
            fetchSections();
        } catch (error) {
            console.error('Error saving section:', error);
        }
    };

    const handleEdit = (section: Section) => {
        setEditingSection(section);
        setFormData({
            title: section.title,
            subtitle: section.subtitle || '',
            type: section.type,
            category: section.category || '',
            display_order: section.display_order,
            is_active: section.is_active,
            discount_text: section.discount_text || '',
        });
        setSelectedProducts(section.product_ids);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this section?')) return;

        try {
            await fetch(`/api/sections/${id}`, { method: 'DELETE' });
            fetchSections();
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            subtitle: '',
            type: 'custom',
            category: '',
            display_order: 0,
            is_active: true,
            discount_text: '',
        });
        setSelectedProducts([]);
        setEditingSection(null);
        setShowModal(false);
    };

    const toggleProductSelection = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <div className="p-8 pb-24">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Sections Management</h2>
                    <p className="text-slate-500">Organize products into sections for homepage</p>
                </div>
                <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600">
                    + Add Section
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white rounded-2xl border border-slate-200 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${section.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {section.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {section.type}
                                        </span>
                                    </div>
                                    {section.subtitle && <p className="text-slate-600 mb-2">{section.subtitle}</p>}
                                    {section.discount_text && (
                                        <p className="text-pink-600 font-semibold mb-2">{section.discount_text}</p>
                                    )}
                                    <p className="text-sm text-slate-500">
                                        {section.product_ids.length} products • Display Order: {section.display_order}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(section)} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(section.id)} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-slate-900">
                                {editingSection ? 'Edit Section' : 'Add New Section'}
                            </h3>
                            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                                    <input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Type *</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as Section['type'] })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500">
                                        <option value="custom">Custom</option>
                                        <option value="category">Category</option>
                                        <option value="deal">Deal</option>
                                        <option value="brand">Brand</option>
                                        <option value="trending">Trending</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                                    <input type="number" value={formData.display_order} onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                    <select value={formData.is_active ? 'active' : 'inactive'} onChange={e => setFormData({ ...formData, is_active: e.target.value === 'active' })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Discount Text</label>
                                <input type="text" value={formData.discount_text} onChange={e => setFormData({ ...formData, discount_text: e.target.value })} placeholder="e.g., Min 40% Off" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Select Products ({selectedProducts.length} selected)</label>
                                <div className="border border-slate-200 rounded-xl max-h-64 overflow-y-auto">
                                    {products.map((product) => (
                                        <label key={product.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0">
                                            <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => toggleProductSelection(product.id)} className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500" />
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900">{product.name}</p>
                                                <p className="text-sm text-slate-500">{product.brand} • ₹{product.price}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600">
                                    {editingSection ? 'Update Section' : 'Create Section'}
                                </button>
                                <button type="button" onClick={resetForm} className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
