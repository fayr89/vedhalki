import { Link } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "@/hooks/useCart";

interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, nameEn, price, image }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, name_en: nameEn, price, image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group">
      <Link
        to={`/product/${id}`}
        className="block cursor-pointer"
        data-product-shop
      >
        <div className="relative overflow-hidden bg-background-100 aspect-[4/5]">
          <img
            src={image}
            alt={`${name} — ${nameEn}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="mt-4 px-0.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-label text-xs tracking-[0.12em] uppercase text-foreground-400 mb-1">
                {nameEn}
              </p>
              <h3 className="font-heading text-lg md:text-xl font-medium text-foreground-950 leading-tight">
                {name}
              </h3>
            </div>
            <span className="font-label text-sm font-medium text-foreground-800 whitespace-nowrap mt-0.5">
              {price.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAdd}
        className={`w-full mt-3 py-2.5 font-label text-xs tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
          justAdded
            ? "bg-accent-500 text-background-50"
            : "bg-foreground-900 text-background-50 hover:bg-foreground-800"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {justAdded ? (
            <>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-check-line text-sm"></i>
              </div>
              Добавлено
            </>
          ) : (
            <>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-add-line text-sm"></i>
              </div>
              В корзину
            </>
          )}
        </span>
      </button>
    </div>
  );
}