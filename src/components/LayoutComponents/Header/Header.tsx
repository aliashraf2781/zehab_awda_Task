"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useTheme from "../../../hooks/useTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname === "/home";
    return pathname === path;
  };

  return (
    <header className="bg-light text-dark shadow-md sticky top-0 z-50 px-8">
      <nav className="mx-auto flex justify-between">
        <div className="text-6xl py-2 text-primary font-light font-cairo">
          <Link href="/">PIXI</Link>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              href="/"
              className={
                isActive("/")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={
                isActive("/products")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }
            >
              Products
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-primary bg-light hover:text-dark transition-colors"
          >
            {!dark ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>

          <Link href="/cart" className="relative">
            <FaShoppingCart size={20} className="text-primary" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 py-4 bg-[var(--color-light)] border-t border-gray-200">
          <li>
            <Link
              href="/"
              className={
                isActive("/")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={
                isActive("/products")
                  ? "text-primary font-semibold"
                  : "hover:text-primary"
              }
            >
              Products
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
