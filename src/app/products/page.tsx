'use client'
import ProductList from '@/components/Product/ProductList';
import SkeletonLoader from '@/components/Skeleton/SkeletonLoader';
import useCategories from '@/hooks/useCategories';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useState } from 'react';

export default function Products() {
    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const [filters, setFilters] = useState({
        category: "",
        minPrice: 0,
        maxPrice: null,
        sortBy: '',
        sortOrder: '',
        page: 1,
        search: '',
    });

    const { data, isLoading } = useFilteredProducts(filters);


    return (
        <main className='bg-background p-4 text-dark'>
            <div className="bg-light p-4 py-10 shadow mb-6">
                <div className="grid md:grid-cols-5 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-dark">الفئة</label>
                        <select
                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            {categoriesLoading ? (
                                <option>جاري التحميل...</option>
                            ) : (
                                <>
                                    <option value="">الكل</option>
                                    {categories.map(category => (
                                        <option className='text-black bg-white' key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">أقل سعر</label>
                        <input
                            type="number"
                            placeholder="مثال: 100"
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">أعلى سعر</label>
                        <input
                            type="number"
                            placeholder="مثال: 5000"
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">بحث</label>
                        <input
                            type="text"
                            placeholder="ابحث باسم المنتج"
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    {/* sort */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-dark">الفئة</label>
                        <select
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option className='text-black bg-white ' value="">الفرز حسب</option>
                            <option className='text-black bg-white ' value="price">السعر</option>
                            <option className='text-black bg-white ' value="rating">التقييم</option>
                            <option className='text-black bg-white ' value="name">الاسم</option>
                        </select>
                    </div>

                </div>
            </div>

            {data?.length > 0 ? <ProductList products={data} /> : isLoading ? <SkeletonLoader isLoading={isLoading}><ProductList products={data} /></SkeletonLoader> : <div className='text-5xl text-center py-14 text-dark'>No products available</div>}


            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    disabled={filters.page === 1}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    السابق
                </button>
                <span className="px-4 py-2 font-medium">صفحة {filters.page}</span>
                <button
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    التالي
                </button>
            </div>
        </main>
    )
}
