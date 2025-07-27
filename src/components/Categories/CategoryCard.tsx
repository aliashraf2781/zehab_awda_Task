import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="flex flex-col items-center text-center space-y-2 w-24 cursor-pointer  transition-transform duration-200 "
    >
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow p-1 hover:p-0 transition-all duration-300 relative">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover rounded-full transition-all duration-300"
        />
      </div>
      <span className="text-sm font-medium text-dark">{category.nameEn}</span>
    </Link>
  );
}
