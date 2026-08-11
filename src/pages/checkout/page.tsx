import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/hooks/useOrders";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  terms?: string;
}

export default function Checkout() {
  const { cart, total, clearAll } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    apartment: "",
    comment: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const freeShippingThreshold = 7000;
  const shippingCost = total >= freeShippingThreshold ? 0 : 490;
  const finalTotal = total + shippingCost;

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-20 md:pt-24 min-h-[60vh] flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 text-foreground-300">
              <i className="ri-shopping-bag-line text-4xl"></i>
            </div>
            <h1 className="font-heading text-2xl text-foreground-950 mb-3">Корзина пуста</h1>
            <p className="text-sm text-foreground-500 mb-8">
              Добавьте товары, чтобы оформить заказ.
            </p>
            <Link
              to="/catalog"
              className="inline-block px-8 py-3.5 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Перейти в каталог
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Введите имя";
    if (!form.lastName.trim()) newErrors.lastName = "Введите фамилию";
    if (!form.phone.trim()) {
      newErrors.phone = "Введите телефон";
    } else if (!/^\+?[\d\s()-]{7,20}$/.test(form.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }
    if (!form.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!form.city.trim()) newErrors.city = "Введите город";
    if (!form.address.trim()) newErrors.address = "Введите адрес";
    if (!agreed) newErrors.terms = "Необходимо согласие";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...(prev || {}), [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const order = await createOrder({
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shipping: shippingCost,
        finalTotal,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          city: form.city,
          address: form.address,
          apartment: form.apartment || undefined,
          comment: form.comment || undefined,
        },
      });

      clearAll();
      navigate(`/order-success/${order.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-background-50 border ${
      errors[field as keyof FormErrors]
        ? "border-red-400"
        : "border-background-200"
    } text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors font-body`;

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-[1100px] mx-auto">
            <nav className="flex items-center gap-2 text-xs font-label text-foreground-400 mb-8 flex-wrap">
              <Link to="/" className="hover:text-foreground-700 transition-colors whitespace-nowrap">
                Главная
              </Link>
              <span>/</span>
              <Link to="/cart" className="hover:text-foreground-700 transition-colors whitespace-nowrap">
                Корзина
              </Link>
              <span>/</span>
              <span className="text-foreground-700">Оформление</span>
            </nav>

            <h1 className="font-heading text-3xl md:text-4xl font-medium text-foreground-950 mb-10">
              Оформление заказа
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              <form onSubmit={handleSubmit} className="flex-1 space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-medium text-foreground-950 mb-5">
                    Контактные данные
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className={inputClass("firstName")}
                        placeholder="Иван"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className={inputClass("lastName")}
                        placeholder="Иванов"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={inputClass("phone")}
                        placeholder="+7 (999) 000-00-00"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={inputClass("email")}
                        placeholder="ivan@mail.ru"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-background-200"></div>

                <div>
                  <h2 className="font-heading text-xl font-medium text-foreground-950 mb-5">
                    Адрес доставки
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Город *
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className={inputClass("city")}
                        placeholder="Москва"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Адрес (улица, дом) *
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className={inputClass("address")}
                        placeholder="ул. Пушкина, д. 10"
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Квартира / офис
                      </label>
                      <input
                        type="text"
                        value={form.apartment}
                        onChange={(e) => handleChange("apartment", e.target.value)}
                        className={inputClass("apartment")}
                        placeholder="кв. 42"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-label text-foreground-500 mb-2">
                        Комментарий к заказу
                      </label>
                      <textarea
                        value={form.comment}
                        onChange={(e) => handleChange("comment", e.target.value)}
                        className={`${inputClass("comment")} resize-none`}
                        rows={3}
                        maxLength={500}
                        placeholder="Дополнительная информация для курьера..."
                      />
                      <p className="text-xs text-foreground-400 mt-1 text-right">
                        {form.comment.length}/500
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-background-200"></div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={() => {
                      setAgreed(!agreed);
                      if (errors.terms) setErrors((p) => ({ ...p, terms: undefined }));
                    }}
                    className="mt-1 w-4 h-4 cursor-pointer accent-foreground-900"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground-600 leading-relaxed cursor-pointer">
                    Я согласен с{" "}
                    <span className="text-foreground-800 underline">условиями обработки персональных данных</span>{" "}
                    и{" "}
                    <span className="text-foreground-800 underline">политикой конфиденциальности</span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500">{errors.terms}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-10 py-4 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center animate-spin">
                        <i className="ri-loader-4-line text-sm"></i>
                      </div>
                      Оформляем...
                    </span>
                  ) : (
                    "Подтвердить заказ"
                  )}
                </button>
              </form>

              <div className="lg:w-[360px]">
                <div className="sticky top-24 bg-background-50 border border-background-200 p-6 md:p-8">
                  <h3 className="font-heading text-lg font-medium text-foreground-950 mb-6">
                    Ваш заказ
                  </h3>

                  <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-14 h-16 flex-shrink-0 bg-background-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground-900 truncate font-heading">
                            {item.name}
                          </p>
                          <p className="text-xs text-foreground-500 font-label mt-0.5">
                            {item.quantity} шт.
                          </p>
                        </div>
                        <span className="text-sm font-medium text-foreground-800 font-label whitespace-nowrap">
                          {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-background-200 mb-6"></div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600 font-label">Товары</span>
                      <span className="font-medium text-foreground-900 font-label">
                        {total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-600 font-label">Доставка</span>
                      <span className={`font-medium font-label ${shippingCost === 0 ? "text-accent-600" : "text-foreground-900"}`}>
                        {shippingCost === 0 ? "Бесплатно" : `${shippingCost} ₽`}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-background-200 mb-6"></div>

                  <div className="flex justify-between">
                    <span className="font-label font-medium text-foreground-900">Итого</span>
                    <span className="font-heading text-xl font-medium text-foreground-950">
                      {finalTotal.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}