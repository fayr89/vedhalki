import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order } from "@/hooks/useOrders";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { getOrders, formatOrderDate, getStatusLabel, getStatusColor } from "@/hooks/useOrders";

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getOrders()
      .then((orders) => {
        if (alive) {
          setOrder(orders.find((o) => o.id === id) ?? null);
          setLoading(false);
        }
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-[60vh] flex items-center justify-center">
          <div className="w-6 h-6 flex items-center justify-center animate-spin text-foreground-400">
            <i className="ri-loader-4-line text-2xl"></i>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-heading text-2xl text-foreground-950 mb-4">Заказ не найден</h1>
            <Link
              to="/orders"
              className="font-label text-xs tracking-[0.12em] uppercase text-foreground-600 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              История заказов
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <section className="px-6 md:px-10 py-10 md:py-16">
          <div className="max-w-[700px] mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 rounded-full bg-accent-100">
                <div className="w-8 h-8 flex items-center justify-center text-accent-600">
                  <i className="ri-check-double-line text-2xl md:text-3xl"></i>
                </div>
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 mb-3">
                Заказ оформлен!
              </h1>
              <p className="text-sm text-foreground-500 max-w-md mx-auto leading-relaxed">
                Спасибо за покупку! Мы отправили подтверждение на{" "}
                <strong className="text-foreground-800">{order.customer.email}</strong>.{" "}
                С вами свяжется менеджер для уточнения деталей.
              </p>
            </div>

            <div className="bg-background-50 border border-background-200 p-6 md:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-background-200">
                <div>
                  <p className="text-xs font-label text-foreground-400 mb-1">Номер заказа</p>
                  <p className="text-lg font-heading font-medium text-foreground-950">{order.id}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs font-label text-foreground-400 mb-1">Статус</p>
                  <span className={`inline-block px-3 py-1 text-xs font-label tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-label text-foreground-400 mb-1">Дата</p>
                  <p className="text-sm text-foreground-800 font-label">{formatOrderDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-label text-foreground-400 mb-1">Получатель</p>
                  <p className="text-sm text-foreground-800 font-label">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-label text-foreground-400 mb-1">Телефон</p>
                  <p className="text-sm text-foreground-800 font-label">{order.customer.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-label text-foreground-400 mb-1">Адрес доставки</p>
                  <p className="text-sm text-foreground-800 font-label">
                    {order.customer.city}, {order.customer.address}
                    {order.customer.apartment ? `, ${order.customer.apartment}` : ""}
                  </p>
                </div>
              </div>

              <div className="h-px bg-background-200 mb-6"></div>

              <h3 className="font-heading text-base font-medium text-foreground-950 mb-4">
                Товары
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
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
                        {item.quantity} шт. × {item.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground-800 font-label whitespace-nowrap">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-background-200 my-6"></div>

              <div className="flex justify-between items-center">
                <span className="font-label font-medium text-foreground-900">Итого</span>
                <span className="font-heading text-xl font-medium text-foreground-950">
                  {order.finalTotal.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/orders"
                className="flex-1 text-center px-6 py-3.5 bg-foreground-900 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-foreground-800 transition-colors whitespace-nowrap"
              >
                История заказов
              </Link>
              <Link
                to="/catalog"
                className="flex-1 text-center px-6 py-3.5 border border-background-300 text-foreground-800 font-label text-xs tracking-[0.15em] uppercase hover:bg-background-100 transition-colors whitespace-nowrap"
              >
                Продолжить покупки
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}