import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shipping: number;
  finalTotal: number;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    apartment?: string;
    comment?: string;
  };
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

const ORDERS_KEY = "np_veshalka_orders_v1";

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setOrdersStorage(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function getOrders(): Promise<Order[]> {
  if (isSupabaseConfigured) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("orders")
        .select("id, status, total, shipping, final_total, customer, created_at, order_items(product_slug, name, image, quantity, price)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((o: any) => ({
          id: o.id,
          items: (o.order_items || []).map((it: any) => ({
            id: it.product_slug || it.name,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
            image: it.image || "",
          })),
          total: o.total,
          shipping: o.shipping,
          finalTotal: o.final_total,
          customer: o.customer,
          status: o.status,
          createdAt: o.created_at,
        }));
      }
    }
  }
  return getLocalOrders();
}

export async function createOrder(order: Omit<Order, "id" | "status" | "createdAt">): Promise<Order> {
  if (isSupabaseConfigured) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: created, error } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id ?? null,
          status: "pending",
          total: order.total,
          shipping: order.shipping,
          final_total: order.finalTotal,
          customer: order.customer,
        })
        .select("id, created_at")
        .single();

      if (!error && created) {
        const items = order.items.map((it) => ({
          order_id: created.id,
          product_slug: it.id,
          name: it.name,
          image: it.image,
          quantity: it.quantity,
          price: it.price,
        }));
        await supabase.from("order_items").insert(items);
        return {
          ...order,
          id: created.id,
          status: "pending",
          createdAt: created.created_at,
        };
      }
    } catch {
      // fall through to local
    }
  }

  const newOrder: Order = {
    ...order,
    id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const orders = getLocalOrders();
  orders.unshift(newOrder);
  setOrdersStorage(orders);
  return newOrder;
}

export async function cancelOrder(id: string) {
  if (isSupabaseConfigured) {
    try {
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", id);
    } catch {
      // ignore
    }
  }
  const orders = getLocalOrders().map((o) =>
    o.id === id ? { ...o, status: "cancelled" as Order["status"] } : o
  );
  setOrdersStorage(orders);
}

export function formatOrderDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusLabel(status: Order["status"]): string {
  const labels: Record<string, string> = {
    pending: "В обработке",
    confirmed: "Подтверждён",
    shipped: "Отправлен",
    delivered: "Доставлен",
    cancelled: "Отменён",
  };
  return labels[status] || status;
}

export function getStatusColor(status: Order["status"]): string {
  const colors: Record<string, string> = {
    pending: "bg-secondary-100 text-secondary-800",
    confirmed: "bg-primary-100 text-primary-800",
    shipped: "bg-accent-100 text-accent-800",
    delivered: "bg-accent-100 text-accent-800",
    cancelled: "bg-red-50 text-red-700",
  };
  return colors[status] || "bg-background-100 text-foreground-600";
}
