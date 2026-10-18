import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background-50 shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
          {isHome ? (
            <h1>
              <Link
                to="/"
                className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground-950 whitespace-nowrap"
              >
                Напольная-вешалка.рф
              </Link>
            </h1>
          ) : (
            <Link
              to="/"
              className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground-950 whitespace-nowrap"
            >
              Напольная-вешалка.рф
            </Link>
          )}

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/catalog"
              className="text-sm font-label tracking-wider uppercase text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Каталог
            </Link>
            <Link
              to="/orders"
              className="text-sm font-label tracking-wider uppercase text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Заказы
            </Link>
            <Link
              to="/login"
              className="text-sm font-label tracking-wider uppercase text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Войти
            </Link>
            <Link
              to="/cart"
              className="relative text-foreground-700 hover:text-foreground-950 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-bag-line text-xl"></i>
              </div>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-label">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              className="relative text-foreground-700 hover:text-foreground-950 transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-bag-line text-xl"></i>
              </div>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-label">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center text-foreground-900"
              aria-label="Меню"
            >
              <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="absolute top-16 left-0 right-0 bg-background-50 border-t border-background-200 p-6 flex flex-col gap-6">
            <Link
              to="/catalog"
              className="text-base font-label tracking-wider uppercase text-foreground-800 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Каталог
            </Link>
            <Link
              to="/orders"
              className="text-base font-label tracking-wider uppercase text-foreground-800 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Мои заказы
            </Link>
            <Link
              to="/login"
              className="text-base font-label tracking-wider uppercase text-foreground-800 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              Войти
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-base font-label tracking-wider uppercase text-foreground-800 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-bag-line text-lg"></i>
              </div>
              Корзина
              {count > 0 && (
                <span className="ml-1 text-xs bg-primary-500 text-background-50 px-2 py-0.5 rounded-full font-label">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}