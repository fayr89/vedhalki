import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order } from "@/hooks/useOrders";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { getOrders, cancelOrder, formatOrderDate, getStatusLabel, getStatusColor } from "@/hooks/useOrders";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);

  const refreshOrders = () => {
    getOrders().then(setOrders).catch(() => setOrders([]));
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const handleCancel = async (id: string) => {
    await cancelOrder(id);
    refreshOrders();
    setCancelConfirm(null);
  };

  const empty = orders.length === 0;

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24 min-h-[60vh]">
        <section className="px-6 md:px-10 py-10 md:py-14">
          <div className="max-w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3">
                  Личный кабинет
                </p>
                <h1 className="font-heading text-3xl md:text-5xl font-medium text-foreground-950">
                  Мои заказы
                </h1>
              </div>
              {!empty && (
                <span className="text-sm text-foreground-500 font-label">
                  {orders.length} {orders.length === 1 ? "заказ" : orders.length < 5 ? "заказа" : "заказов"}
                </span>
              )}
            </div>

            {empty && (
              <div className="text-center py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6 text-foreground-300">
                  <i className="ri-file-list-line text-3xl md:text-4xl"></i>
                </div>
                <h2 className="font-heading text-xl text-foreground-700 mb-3">
                  Заказов пока нет
                </h2>
                <p className="text-sm text-foreground-500 mb-8 max-w-sm mx-auto leading-relaxed">
                  Ваши оформленные заказы будут отображаться здесь.
                </p>
                <Link
                  to="/catalog"
                  className="inline-block px-8 py-3.5 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  Перейти в каталог
                </Link>
              </div>
            )}

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-background-50 border border-background-200 p-5 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-background-200">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs font-label text-foreground-400 mb-1">
                          Заказ
                        </p>
                        <Link
                          to={`/order-success/${order.id}`}
                          className="text-base font-heading font-medium text-foreground-950 hover:text-primary-600 transition-colors"
                        >
                          {order.id}
                        </Link>
                      </div>
                      <span className={`px-3 py-1 text-xs font-label tracking-wider ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-foreground-400 font-label">{formatOrderDate(order.createdAt)}</p>
                      <p className="text-lg font-heading font-medium text-foreground-950">
                        {order.finalTotal.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    {order.items.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        className="w-14 h-16 bg-background-100 overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </Link>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-14 h-16 bg-background-100 flex items-center justify-center text-xs text-foreground-500 font-label">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/order-success/${order.id}`}
                      className="text-xs font-label tracking-[0.12em] uppercase text-foreground-600 hover:text-foreground-950 transition-colors whitespace-nowrap flex items-center gap-1"
                    >
                      Подробнее
                      <div className="w-3 h-3 flex items-center justify-center">
                        <i className="ri-arrow-right-line text-xs"></i>
                      </div>
                    </Link>
                    {order.status === "pending" && (
                      <button
                        onClick={() => setCancelConfirm(order.id)}
                        className="text-xs text-foreground-400 hover:text-red-500 transition-colors font-label tracking-wider cursor-pointer whitespace-nowrap"
                      >
                        Отменить
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {cancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCancelConfirm(null)}
          ></div>
          <div className="relative bg-background-50 p-8 max-w-sm w-full">
            <h3 className="font-heading text-xl text-foreground-950 mb-3">
              Отменить заказ?
            </h3>
            <p className="text-sm text-foreground-600 mb-6 leading-relaxed">
              Заказ будет отменён. Это действие нельзя отменить.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelConfirm(null)}
                className="flex-1 py-3 border border-background-300 text-foreground-700 font-label text-xs tracking-[0.12em] uppercase hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                Нет
              </button>
              <button
                onClick={() => handleCancel(cancelConfirm)}
                className="flex-1 py-3 bg-red-500 text-white font-label text-xs tracking-[0.12em] uppercase hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Да, отменить
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}