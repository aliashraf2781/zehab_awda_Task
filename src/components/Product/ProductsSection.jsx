'use client'
import React from 'react'
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductList  from '@/components/Product/ProductList';

export default function ProductsSection() {
    const { data, isLoading } = useFilteredProducts({})

  return (
    <div>
      <ProductList products={data} isLoading={isLoading} />
    </div>
  )
}
