'use client'

import React from 'react'
import useCategories from '../../hooks/useCategories'
import CategoryCard from './CategoryCard'
import CategorySkeleton from './../Skeleton/CategorySkeleton';

export default function CategoriesList() {
    // const {data: categories, isLoading} = useGetCategoriesQuery()
    const { data: categories, isLoading } = useCategories()

    if (isLoading) return <CategorySkeleton />;
    return (
        <div className="flex flex-wrap justify-center gap-6 py-4">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    )
}
