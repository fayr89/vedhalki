import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { useCart } from "@/hooks/useCart";
import { products } from "@/mocks/products";

export default function Cart() {
  const { cart, count, total, removeItem, updateItemQuantity, clearAll } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const freeShippingThreshold = 7000;
  const remainingForFree = Math.max(0, freeShippingThreshold - total);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-20 md:pt-24 min-h-[60vh]">
          <section className="px-6 md:px-10 py-10 md:py-14">
            <div className="max-w-[900px] mx-auto">
              <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3">
                Корзина
              </p>
              <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950 mb-2">
                Ваша корзина
              </h1>

              <div className="mt-12 text-center py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 text-foreground-300">
                  <i className="ri-shopping-bag-line text-3xl md:text-4xl"></i>
                </div>
                <h2 className="font-heading text-xl text-foreground-700 mb-3">Корзина пока пуста</h2>
                <p className="text-sm text-foreground-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  Добавьте понравившиеся товары из каталога, и они появятся здесь.
                </p>
                <Link
                  to="/catalog"
                  className="inline-block px-8 py-3.5 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  Перейти в каталог
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24 min-h-[60vh]">
        <section className="px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3">
                  Корзина
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950">
                  Ваша корзина
                </h1>
                <p className="text-sm text-foreground-500 mt-2 font-label">
                  {count} {count === 1 ? "товар" : count < 5 ? "товара" : "товаров"}
                </p>
              </div>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-sm text-foreground-400 hover:text-foreground-700 transition-colors font-label tracking-wider cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                Очистить корзину
              </button>
            </div>

            {remainingForFree > 0 && (
              <div className="mb-8 bg-secondary-100/70 border border-secondary-200/60 px-5 py-4 flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-secondary-700">
                  <i className="ri-truck-line text-lg"></i>
                </div>
                <p className="text-sm text-secondary-800 font-label">
                  Добавьте товаров ещё на{" "}
                  <strong className="text-secondary-900">
                    {remainingForFree.toLocaleString("ru-RU")} ₽
                  </strong>{" "}
                  и получите бесплатную доставку
                </p>
              </div>
            )}

            {remainingForFree === 0 && (
              <div className="mb-8 bg-accent-100/70 border border-accent-200/60 px-5 py-4 flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-accent-700">
                  <i className="ri-check-line text-lg"></i>
                </div>
                <p className="text-sm text-accent-800 font-label">
                  Бесплатная доставка применена!
                </p>
              </div>
            )}

            <div className="border-t border-background-200">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-background-200"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full sm:w-28 md:w-32 flex-shrink-0 bg-background-100 aspect-[3/4] overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-heading text-lg md:text-xl font-medium text-foreground-950 hover:text-primary-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-foreground-400 font-label mt-1">
                          {item.name_en}
                        </p>
                        {product && (
                          <p className="text-xs text-foreground-400 mt-1">{product.category}</p>
                        )}
                        <p className="text-sm font-medium text-foreground-800 mt-3 font-label">
                          {item.price.toLocaleString("ru-RU")} ₽ / шт.
                        </p>

                        <div className="flex items-center gap-1 mt-4">
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                            className="w-9 h-9 flex items-center justify-center border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
                            aria-label="Уменьшить количество"
                          >
                            <i className="ri-subtract-line text-sm"></i>
                          </button>
                          <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-foreground-900 font-label">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                            className="w-9 h-9 flex items-center justify-center border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
                            aria-label="Увеличить количество"
                          >
                            <i className="ri-add-line text-sm"></i>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                        <p className="text-lg md:text-xl font-heading font-medium text-foreground-950">
                          {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-foreground-400 hover:text-red-500 transition-colors font-label tracking-wider cursor-pointer whitespace-nowrap"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <Link
                to="/catalog"
                className="font-label text-xs tracking-[0.12em] uppercase text-foreground-600 hover:text-foreground-950 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-sm"></i>
                </div>
                Продолжить покупки
              </Link>

              <div className="w-full sm:w-auto flex flex-col items-start sm:items-end gap-4">
                <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                  <span className="text-sm text-foreground-600 font-label">
                    Промежуточный итог
                  </span>
                  <span className="text-xl font-heading font-medium text-foreground-950">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                  <span className="text-sm text-foreground-600 font-label">
                    Доставка
                  </span>
                  <span className="text-sm font-heading font-medium text-accent-600">
                    {remainingForFree === 0 ? "Бесплатно" : "Рассчитается при оформлении"}
                  </span>
                </div>
                <div className="w-full h-px bg-background-200 my-1"></div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                  <span className="text-lg font-label font-medium text-foreground-900">
                    Итого
                  </span>
                  <span className="text-2xl md:text-3xl font-heading font-medium text-foreground-950">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full sm:w-auto px-10 py-4 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowClearConfirm(false)}
          ></div>
          <div className="relative bg-background-50 p-8 max-w-sm w-full">
            <h3 className="font-heading text-xl text-foreground-950 mb-3">
              Очистить корзину?
            </h3>
            <p className="text-sm text-foreground-600 mb-6 leading-relaxed">
              Все товары будут удалены. Это действие нельзя отменить.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 border border-background-300 text-foreground-700 font-label text-xs tracking-[0.12em] uppercase hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  clearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 py-3 bg-red-500 text-white font-label text-xs tracking-[0.12em] uppercase hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}