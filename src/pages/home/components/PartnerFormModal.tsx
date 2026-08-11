import { useState, useRef, FormEvent } from "react";

const SUBMIT_URL = "https://readdy.ai/api/form/d9lmkpkit35ii3jdlad0";

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerFormModal({ isOpen, onClose }: PartnerFormModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get("phone_alt") as string || "").trim();
    if (honeypot) {
      setStatus("success");
      form.reset();
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2500);
      return;
    }
    formData.delete("phone_alt");

    setStatus("loading");

    try {
      const urlEncoded = new URLSearchParams();
      formData.forEach((value, key) => {
        urlEncoded.append(key, value.toString());
      });

      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncoded.toString(),
      });

      const responseText = await response.text();
      let parsed: any = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // response is not JSON
      }

      if (response.ok && parsed?.code === "OK") {
        setStatus("success");
        form.reset();
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2500);
      } else {
        const serverMsg =
          parsed?.meta?.message ||
          parsed?.message ||
          parsed?.meta?.detail ||
          responseText ||
          "Произошла ошибка при отправке формы";
        setStatus("error");
        setErrorMessage(serverMsg);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Не удалось отправить форму. Проверьте соединение и попробуйте снова.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-background-50 w-full max-w-[560px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-background-200">
          <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground-950">
            Стать партнёром
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-foreground-400 hover:text-foreground-800 transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 md:px-8 py-12 text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 text-accent-500">
              <i className="ri-checkbox-circle-fill text-5xl"></i>
            </div>
            <h4 className="font-heading text-xl font-medium text-foreground-950 mb-2">
              Заявка отправлена!
            </h4>
            <p className="text-sm text-foreground-600 leading-relaxed">
              Спасибо за интерес к сотрудничеству. Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            data-readdy-form
            className="px-6 md:px-8 py-6 md:py-8"
          >
            <p className="text-sm text-foreground-600 leading-relaxed mb-6">
              Заполните форму, и мы обсудим индивидуальные условия сотрудничества для вашего бизнеса.
            </p>

            {status === "error" && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-error-warning-line"></i>
                </div>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="partner-name" className="block font-label text-xs tracking-[0.08em] uppercase text-foreground-600 mb-2">
                  Имя <span className="text-red-500">*</span>
                </label>
                <input
                  id="partner-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 text-sm border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label htmlFor="partner-company" className="block font-label text-xs tracking-[0.08em] uppercase text-foreground-600 mb-2">
                  Компания
                </label>
                <input
                  id="partner-company"
                  name="company"
                  type="text"
                  className="w-full px-4 py-3 text-sm border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors"
                  placeholder="ООО «Гостиничный комплекс»"
                />
              </div>

              <div>
                <label htmlFor="partner-email" className="block font-label text-xs tracking-[0.08em] uppercase text-foreground-600 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="partner-email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 text-sm border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors"
                  placeholder="partner@company.ru"
                />
              </div>

              <div>
                <label htmlFor="partner-phone" className="block font-label text-xs tracking-[0.08em] uppercase text-foreground-600 mb-2">
                  Телефон
                </label>
                <input
                  id="partner-phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3 text-sm border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label htmlFor="partner-message" className="block font-label text-xs tracking-[0.08em] uppercase text-foreground-600 mb-2">
                  Сообщение <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="partner-message"
                  name="message"
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-400 transition-colors resize-none"
                  placeholder="Опишите ваш проект, количество номеров, интересующие модели..."
                ></textarea>
                <p className="text-xs text-foreground-400 mt-1">Не более 500 символов</p>
              </div>

              <div className="partner-hp-field" aria-hidden="true">
                <label htmlFor="partner-phone-alt">Phone alt</label>
                <input
                  id="partner-phone-alt"
                  name="phone_alt"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  readOnly
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 w-full px-8 py-3.5 bg-foreground-950 text-background-50 font-label text-xs tracking-[0.15em] uppercase hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-background-50/30 border-t-background-50 rounded-full animate-spin"></span>
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}