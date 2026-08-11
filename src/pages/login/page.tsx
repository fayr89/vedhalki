import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Заполните email и пароль");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Введите имя");
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("np_user", JSON.stringify({ email, name: name || email }));
        navigate("/");
      }, 400);
      return;
    }

    try {
      if (mode === "register") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        localStorage.setItem("np_user", JSON.stringify({ email, name, id: data.user?.id }));
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        const displayName = (data.user?.user_metadata as any)?.name || email;
        localStorage.setItem("np_user", JSON.stringify({ email, name: displayName, id: data.user?.id }));
      }
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider: string) => {
    setError(`Авторизация через ${provider} пока не настроена в этом окружении.`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24 min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-medium text-foreground-950 mb-2">
              {mode === "login" ? "Вход в аккаунт" : "Регистрация"}
            </h1>
            <p className="text-sm text-foreground-500">
              {mode === "login"
                ? "Войдите, чтобы отслеживать заказы и сохранять избранное"
                : "Создайте аккаунт для быстрого оформления заказов"}
            </p>
          </div>

          <div className="flex rounded-md bg-background-100 p-1 mb-8">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 text-xs font-label tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                mode === "login"
                  ? "bg-background-50 text-foreground-950 shadow-sm"
                  : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 text-xs font-label tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                mode === "register"
                  ? "bg-background-50 text-foreground-950 shadow-sm"
                  : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-label text-foreground-500 mb-2">Имя *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors font-body"
                  placeholder="Иван"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-label text-foreground-500 mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors font-body"
                placeholder="you@mail.ru"
              />
            </div>
            <div>
              <label className="block text-xs font-label text-foreground-500 mb-2">Пароль *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors font-body"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-500 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center animate-spin">
                    <i className="ri-loader-4-line text-sm"></i>
                  </div>
                  {mode === "login" ? "Входим..." : "Регистрируем..."}
                </span>
              ) : (
                mode === "login" ? "Войти" : "Зарегистрироваться"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-background-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background-50 px-4 text-xs font-label text-foreground-400 uppercase tracking-wider">
                или через
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocial("Яндекс")}
              className="flex items-center justify-center gap-2 py-3 border border-background-200 text-sm text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-global-line text-lg"></i>
              </div>
              Яндекс
            </button>
            <button
              onClick={() => handleSocial("VK")}
              className="flex items-center justify-center gap-2 py-3 border border-background-200 text-sm text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-message-3-line text-lg"></i>
              </div>
              VK
            </button>
            <button
              onClick={() => handleSocial("Telegram")}
              className="flex items-center justify-center gap-2 py-3 border border-background-200 text-sm text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-telegram-line text-lg"></i>
              </div>
              Telegram
            </button>
            <button
              onClick={() => handleSocial("Google")}
              className="flex items-center justify-center gap-2 py-3 border border-background-200 text-sm text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-google-line text-lg"></i>
              </div>
              Google
            </button>
          </div>

          <p className="mt-8 text-xs text-foreground-400 text-center leading-relaxed">
            Для работы авторизации через Яндекс, VK и Telegram необходимо подключить Supabase.{" "}
            <span className="text-foreground-600 underline cursor-pointer" onClick={() => handleSocial("Supabase")}>
              Подробнее
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}