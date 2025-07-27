'use client';

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";

type Product = {
  nameEn: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  brand: string;
};

type Props = {
  product: Product;
  onClick: (product: Product) => void;
};

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  const {
    nameEn,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    inStock,
    brand,
  } = product;

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-yellow-400 text-sm" />
        ))}
      </>
    );
  };

  return (
    <div className="bg-light text-dark rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between h-[450px]">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="w-full h-full relative rounded-t-xl overflow-hidden">
          <Image
            src={image}
            alt={nameEn}
            fill
            // sizes="(max-width: 768px) 100vw, 33vw"
            className="W-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 justify-between p-4">
          <div className="flex flex-col flex-1 justify-between">
            <div className="mb-2 min-h-[60px]">
              <h3 className="text-lg font-bold text-dark line-clamp-2">{nameEn}</h3>
              <p className="text-xs text-gray-400 mt-1">Brand: {brand}</p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {renderStars()}
              <span className="text-xs text-gray-500">{reviewCount}</span>
            </div>

            <div className="mb-3">
              <span className="text-[--color-primary] text-xl font-bold">{price.toFixed(2)} EGP</span>
              <span className="line-through text-sm text-gray-400 ml-2">
                {originalPrice.toFixed(2)} EGP
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className={`text-sm ${inStock ? "text-green-600" : "text-red-500"}`}>
              {inStock ? "متوفر" : "غير متوفر"}
            </span>
            <button
              className="bg-primary text-light px-4 py-3 text-lg rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition cursor-pointer"
              disabled={!inStock}
              onClick={(e) => {
                e.preventDefault();
                onClick(product);
              }}
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
