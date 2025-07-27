'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import axiosInstance from '@/libs/axiosInstance'
import useCart from '@/hooks/useCart'
import ProductImageSlider from '@/components/Product/ProductSlider'

type Product = {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  stockQuantity: number
  brand: string
  category: {
    name: string
  }
  image: string
  images: string[]
  specifications: Record<string, string>
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}`)
        setProduct(response.data.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    if (id) fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
  }

  if (!product) return <div className="p-4 text-center">جاري التحميل...</div>

  return (
    <main className="grid md:grid-cols-2 gap-8 py-8 px-8 bg-background">
      <ProductImageSlider images={product.images} />

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary">{product.price} ج.م</span>
          <span className="line-through text-gray-400">{product.originalPrice} ج.م</span>
        </div>

        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} className="w-5 h-5" />
          ))}
          <span className="text-gray-500 text-sm">({product.reviewCount})</span>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h4 className="font-bold mb-2">المواصفات:</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(product.specifications).map(([key, value], i) => (
              <li key={i}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-500">العلامة التجارية: <span className="font-medium">{product.brand}</span></p>
        <p className="text-sm text-gray-500">التصنيف: <span className="font-medium">{product.category.name}</span></p>

        <div className="flex items-center gap-4 mt-4">
          <button className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition" onClick={handleAddToCart}>
            أضف للسلة
          </button>
          <span className="text-sm text-gray-600">الكمية المتاحة: {product.stockQuantity}</span>
        </div>
      </div>
    </main>
  )
}
