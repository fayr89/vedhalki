import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background-950 text-background-200">
      <div className="px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          <div className="flex-1">
            <Link
              to="/"
              className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-background-50"
            >
              Напольная-вешалка.рф
            </Link>
            <p className="mt-4 text-sm text-background-400 max-w-xs leading-relaxed">
              Дизайнерские напольные вешалки и стойки для одежды. Минимализм, качество, стиль.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 lg:gap-20">
            <div>
              <h4 className="font-label text-xs tracking-[0.15em] uppercase text-background-300 mb-5">
                Магазин
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/catalog"
                    className="text-sm text-background-400 hover:text-background-100 transition-colors whitespace-nowrap"
                  >
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-sm text-background-400 hover:text-background-100 transition-colors whitespace-nowrap"
                  >
                    Корзина
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-label text-xs tracking-[0.15em] uppercase text-background-300 mb-5">
                Контакты
              </h4>
              <ul className="space-y-3 text-sm text-background-400">
                <li>hello@napolnaya-veshalka.ru</li>
                <li>+7 (999) 123-45-67</li>
                <li className="max-w-[180px] leading-relaxed">Москва, ул. Дизайнеров, 15</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-background-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background-500">
            &copy; {new Date().getFullYear()} Напольная-вешалка.рф. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background-400 hover:text-background-100 transition-colors" aria-label="Telegram" rel="nofollow">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-telegram-line text-lg"></i>
              </div>
            </a>
            <a href="#" className="text-background-400 hover:text-background-100 transition-colors" aria-label="WhatsApp" rel="nofollow">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-whatsapp-line text-lg"></i>
              </div>
            </a>
            <a href="#" className="text-background-400 hover:text-background-100 transition-colors" aria-label="Instagram" rel="nofollow">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-instagram-line text-lg"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}