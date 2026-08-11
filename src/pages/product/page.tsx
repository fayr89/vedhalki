import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { products, productVariants } from "@/mocks/products";
import { useCart } from "@/hooks/useCart";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, cart } = useCart();

  const [selectedForma, setSelectedForma] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [selectedStil, setSelectedStil] = useState("");

  const inCart = cart.find((item) => item.id === product?.id);
  const inCartQty = inCart?.quantity || 0;

  const variantPrice = useMemo(() => {
    let mod = 0;
    if (selectedForma) {
      const v = productVariants.forma.find((x) => x.id === selectedForma);
      if (v) mod += v.priceMod;
    }
    if (selectedFunction) {
      const v = productVariants.function.find((x) => x.id === selectedFunction);
      if (v) mod += v.priceMod;
    }
    if (selectedStil) {
      const v = productVariants.stil.find((x) => x.id === selectedStil);
      if (v) mod += v.priceMod;
    }
    return mod;
  }, [selectedForma, selectedFunction, selectedStil]);

  const finalPrice = product ? product.price + variantPrice : 0;

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-24 px-6 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-foreground-950 mb-4">Товар не найден</h1>
            <Link
              to="/catalog"
              className="font-label text-xs tracking-[0.12em] uppercase text-foreground-600 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Вернуться в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    const variantLabel = [selectedForma, selectedFunction, selectedStil]
      .map((vid) => {
        const all = [...productVariants.forma, ...productVariants.function, ...productVariants.stil];
        const found = all.find((v) => v.id === vid);
        return found?.label;
      })
      .filter(Boolean)
      .join(", ");

    addItem({
      id: product.id,
      name: product.name + (variantLabel ? ` (${variantLabel})` : ""),
      name_en: product.name_en,
      price: finalPrice,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const hasVariants = product.variants && (
    (product.variants.forma?.length ?? 0) > 0 ||
    (product.variants.function?.length ?? 0) > 0 ||
    (product.variants.stil?.length ?? 0) > 0
  );

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="px-6 md:px-10 py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto">
            <nav className="flex items-center gap-2 text-xs font-label text-foreground-400 mb-8 flex-wrap">
              <Link to="/" className="hover:text-foreground-700 transition-colors whitespace-nowrap">
                Главная
              </Link>
              <span>/</span>
              <Link to="/catalog" className="hover:text-foreground-700 transition-colors whitespace-nowrap">
                Каталог
              </Link>
              <span>/</span>
              <span className="text-foreground-700">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
              <div className="flex-1 flex flex-col sm:flex-row-reverse gap-4">
                <div className="flex-1 aspect-[4/5] bg-background-100 overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={`${product.name} — ${product.name_en}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="flex sm:flex-col gap-3 sm:w-20">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-20 sm:w-full sm:h-24 flex-shrink-0 overflow-hidden cursor-pointer transition-opacity ${
                          selectedImage === i ? "opacity-100 ring-1 ring-foreground-300" : "opacity-60 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} — вид ${i + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-[420px] flex flex-col">
                <p className="font-label text-xs tracking-[0.12em] uppercase text-foreground-400 mb-2">
                  {product.name_en}
                </p>
                <h1 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 mb-2">
                  {product.name}
                </h1>
                <p className="font-label text-sm text-foreground-500 mb-6">{product.category}</p>

                {hasVariants && product.variants && (
                  <div className="mb-6 space-y-4">
                    {product.variants.forma && product.variants.forma.length > 0 && (
                      <div>
                        <p className="font-label text-xs tracking-[0.12em] uppercase text-foreground-500 mb-2">
                          Форма
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.forma.map((vid) => {
                            const v = productVariants.forma.find((x) => x.id === vid);
                            if (!v) return null;
                            return (
                              <button
                                key={vid}
                                onClick={() => setSelectedForma(selectedForma === vid ? "" : vid)}
                                className={`px-4 py-2 text-xs font-label tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap border ${
                                  selectedForma === vid
                                    ? "bg-foreground-900 text-background-50 border-foreground-900"
                                    : "bg-background-50 text-foreground-700 border-background-200 hover:border-foreground-400"
                                }`}
                              >
                                {v.label}
                                {v.priceMod > 0 && (
                                  <span className="ml-1 text-[10px] opacity-70">+{v.priceMod} ₽</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {product.variants.function && product.variants.function.length > 0 && (
                      <div>
                        <p className="font-label text-xs tracking-[0.12em] uppercase text-foreground-500 mb-2">
                          Функция
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.function.map((vid) => {
                            const v = productVariants.function.find((x) => x.id === vid);
                            if (!v) return null;
                            return (
                              <button
                                key={vid}
                                onClick={() => setSelectedFunction(selectedFunction === vid ? "" : vid)}
                                className={`px-4 py-2 text-xs font-label tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap border ${
                                  selectedFunction === vid
                                    ? "bg-foreground-900 text-background-50 border-foreground-900"
                                    : "bg-background-50 text-foreground-700 border-background-200 hover:border-foreground-400"
                                }`}
                              >
                                {v.label}
                                {v.priceMod > 0 && (
                                  <span className="ml-1 text-[10px] opacity-70">+{v.priceMod} ₽</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {product.variants.stil && product.variants.stil.length > 0 && (
                      <div>
                        <p className="font-label text-xs tracking-[0.12em] uppercase text-foreground-500 mb-2">
                          Стиль
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.stil.map((vid) => {
                            const v = productVariants.stil.find((x) => x.id === vid);
                            if (!v) return null;
                            return (
                              <button
                                key={vid}
                                onClick={() => setSelectedStil(selectedStil === vid ? "" : vid)}
                                className={`px-4 py-2 text-xs font-label tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap border ${
                                  selectedStil === vid
                                    ? "bg-foreground-900 text-background-50 border-foreground-900"
                                    : "bg-background-50 text-foreground-700 border-background-200 hover:border-foreground-400"
                                }`}
                              >
                                {v.label}
                                {v.priceMod > 0 && (
                                  <span className="ml-1 text-[10px] opacity-70">+{v.priceMod} ₽</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-2xl md:text-3xl font-heading font-medium text-foreground-950 mb-8">
                  {finalPrice.toLocaleString("ru-RU")} ₽
                  {variantPrice > 0 && (
                    <span className="ml-2 text-sm font-label text-foreground-400 line-through">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground-700 leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h3 className="font-label text-xs tracking-[0.12em] uppercase text-foreground-500 mb-4">
                    Характеристики
                  </h3>
                  <ul className="space-y-2.5">
                    {product.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-foreground-700"
                      >
                        <div className="w-1 h-1 rounded-full bg-foreground-400 flex-shrink-0"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {inCartQty > 0 && (
                  <div className="mb-4 flex items-center gap-2 text-sm text-accent-600 font-label">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-shopping-cart-line text-sm"></i>
                    </div>
                    В корзине: {inCartQty} шт.
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 font-label text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    addedToCart
                      ? "bg-accent-500 text-background-50"
                      : "bg-primary-500 text-background-50 hover:bg-primary-600"
                  }`}
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-check-line text-sm"></i>
                      </div>
                      Добавлено в корзину
                    </span>
                  ) : (
                    "В корзину"
                  )}
                </button>

                <p className="mt-4 text-xs text-foreground-400 text-center">
                  Бесплатная доставка при заказе от 7 000 ₽
                </p>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="px-6 md:px-10 py-14 md:py-20 bg-background-100">
            <div className="max-w-[1400px] mx-auto">
              <h2 className="font-heading text-xl md:text-3xl font-medium text-foreground-950 mb-8 md:mb-12">
                Вам также может понравиться
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group block cursor-pointer"
                  >
                    <div className="overflow-hidden bg-background-200 aspect-[4/5]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-heading text-base font-medium text-foreground-950">
                        {p.name}
                      </h3>
                      <span className="font-label text-xs text-foreground-600">
                        {p.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.name} — ${product.name_en}`,
            description: product.description,
            image: product.images,
            category: product.category,
            offers: {
              "@type": "Offer",
              price: finalPrice,
              priceCurrency: "RUB",
              availability: "https://schema.org/InStock",
              url: `https://напольная-вешалка.рф/product/${product.id}`,
            },
            brand: {
              "@type": "Brand",
              name: "Напольная-вешалка.рф",
            },
          }),
        }}
      />

      <Footer />
    </>
  );
}