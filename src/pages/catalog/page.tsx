import { useState, useMemo } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ProductCard from "@/components/base/ProductCard";
import { products } from "@/mocks/products";

const categories = ["Все", "Вешалка напольная", "Стойка для одежды", "Вешалка-стойка", "Стойка", "Вешалка", "Напольная вешалка"];

const sortOptions = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "name", label: "По названию" },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === "Все"
      ? products
      : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "ru"));
      default:
        return filtered;
    }
  }, [activeCategory, sortBy]);

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-[1400px] mx-auto">
            <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3">
              Каталог
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950 mb-2">
              Напольные вешалки
            </h1>
            <p className="text-sm text-foreground-600 max-w-lg">
              {products.length} моделей — от минималистичных до премиальных решений для вашего гардероба.
            </p>

            <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-label tracking-wider uppercase rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary-500 text-background-50"
                        : "bg-background-100 text-foreground-600 hover:bg-background-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-background-100 rounded-full text-xs font-label tracking-wider uppercase text-foreground-700 whitespace-nowrap cursor-pointer"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-filter-3-line text-sm"></i>
                </div>
                {activeCategory === "Все" ? "Категории" : activeCategory}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-foreground-400 font-label whitespace-nowrap">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-label bg-background-100 border border-background-200 rounded-full px-4 py-2 text-foreground-700 cursor-pointer outline-none focus:border-foreground-300 transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {mobileFilterOpen && (
              <div className="md:hidden mt-4 flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 text-[11px] font-label tracking-wider uppercase rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary-500 text-background-50"
                        : "bg-background-100 text-foreground-600 hover:bg-background-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8" data-product-shop>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  nameEn={product.name_en}
                  price={product.price}
                  image={product.images[0]}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-foreground-400 font-label text-sm">Товаров в этой категории пока нет</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: filteredProducts.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: `${product.name} — ${product.name_en}`,
                description: product.description,
                image: product.images[0],
                offers: {
                  "@type": "Offer",
                  price: product.price,
                  priceCurrency: "RUB",
                  availability: "https://schema.org/InStock",
                },
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}