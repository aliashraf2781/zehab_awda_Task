// app/category/[categoryId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductList from '@/components/Product/ProductList';
import SkeletonLoader from '@/components/Skeleton/SkeletonLoader';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.categoryId as string;

  const { data: products, isLoading } = useFilteredProducts({ category: categoryId });

  const categoryName = products?.[0]?.category?.nameEn || 'Category Name';

  return (
    <div className="p-4 bg-background">
      <h2 className="text-2xl font-bold mb-4 text-center text-dark">
        {categoryName}
      </h2>

      {products?.length > 0 ? (
        <ProductList products={products} />
      ) : isLoading ? (
        <SkeletonLoader isLoading={isLoading}>
          <ProductList products={products || []} />
        </SkeletonLoader>
      ) : (
        <div className="text-5xl text-center py-14 text-dark">
          No products available
        </div>
      )}
    </div>
  );
}
