import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ProductCard from "@/components/base/ProductCard";
import PartnerFormModal from "@/pages/home/components/PartnerFormModal";
import { products, reviews } from "@/mocks/products";

const featuredIds = [
  "np-minimal",
  "np-monolith",
  "np-loft",
  "np-graphite",
  "np-geometria",
  "np-balance",
];

const featuredProducts = products.filter((p) => featuredIds.includes(p.id));

const faqItems = [
  {
    q: "Какие напольные вешалки подойдут для маленькой прихожей?",
    a: "Для компактных пространств отлично подходят модели Минимал, Аскет и Эстет — они занимают минимум места, но при этом вмещают достаточно одежды. Рекомендуем выбирать вешалки высотой 165–175 см с узким основанием.",
  },
  {
    q: "Насколько устойчивы напольные вешалки и стойки для одежды?",
    a: "Все наши напольные вешалки проходят тестирование на устойчивость. Модели с мраморным или утяжелённым основанием (Монолит, Графит) выдерживают нагрузку до 40 кг. Даже лёгкие модели имеют продуманную геометрию основания, исключающую опрокидывание.",
  },
  {
    q: "Какой срок доставки по Москве и России?",
    a: "По Москве доставка занимает 1–2 рабочих дня. В регионы России — от 3 до 10 дней в зависимости от удалённости. При заказе от 7 000 ₽ доставка бесплатна по всей стране.",
  },
  {
    q: "Можно ли заказать напольную вешалку для гостиницы оптом?",
    a: "Да, мы работаем с гостиницами, базами отдыха и управляющими компаниями. Предлагаем специальные оптовые цены, индивидуальное брендирование и усиленные конструкции для коммерческой эксплуатации. Свяжитесь с нами по почте b2b@napolnaya-veshalka.ru.",
  },
  {
    q: "Какие материалы используются в напольных вешалках?",
    a: "Мы используем сталь с порошковым или матовым покрытием, натуральную древесину (дуб, ясень), мрамор для премиум-моделей и переработанную сталь в линейке Эко. Все материалы сертифицированы и безопасны для использования в жилых помещениях.",
  },
  {
    q: "Есть ли гарантия на напольные вешалки?",
    a: "Да, мы предоставляем расширенную гарантию 2 года на все модели напольных вешалок и стоек для одежды. В случае производственного дефекта заменим изделие или вернём деньги.",
  },
];

export default function Home() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-background-50">
          <Link to="/catalog" aria-label="Перейти к каталогу" className="block">
            <img
              src="/hero.jpg"
              alt="Строгая геометрия для интерьера — напольные вешалки Напольная-вешалка.рф"
              title="Напольная-вешалка.рф — собственное производство, сканди стиль"
              className="w-full h-auto block"
              width={1456}
              height={780}
            />
          </Link>
        </section>

        <section className="px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
              <div>
                <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3">
                  Избранное
                </p>
                <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950">
                  Бестселлеры коллекции
                </h2>
              </div>
              <Link
                to="/catalog"
                className="font-label text-xs tracking-[0.12em] uppercase text-foreground-600 hover:text-foreground-950 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                Весь каталог
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-sm"></i>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8" data-product-shop>
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  nameEn={product.name_en}
                  price={product.price}
                  image={product.images[0]}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background-100 px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3 text-center">
              Преимущества
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 text-center mb-12 md:mb-16">
              Почему выбирают <strong>Напольная-вешалка.рф</strong>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {[
                {
                  icon: "ri-shield-check-line",
                  title: "Гарантия 2 года",
                  text: "Каждая <strong>напольная вешалка</strong> проходит строгий контроль качества и имеет расширенную гарантию.",
                },
                {
                  icon: "ri-truck-line",
                  title: "Быстрая доставка",
                  text: "Доставляем <strong>напольные вешалки</strong> по всей России. Бесплатно при заказе от 7 000 ₽.",
                },
                {
                  icon: "ri-palette-line",
                  title: "Дизайн премиум",
                  text: "Сотрудничаем с европейскими дизайнерами для создания уникальных моделей <strong>стоек для одежды</strong>.",
                },
                {
                  icon: "ri-recycle-line",
                  title: "Эко-материалы",
                  text: "Используем переработанную сталь и сертифицированную древесину для <strong>дизайнерских вешалок</strong>.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mx-auto mb-5 text-foreground-800">
                    <i className={`${item.icon} text-2xl md:text-3xl`}></i>
                  </div>
                  <h3 className="font-heading text-lg font-medium text-foreground-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground-950 px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <p className="font-label text-xs tracking-[0.15em] uppercase text-white/40 mb-3">
                  Сотрудничество
                </p>
                <h2 className="font-heading text-2xl md:text-4xl font-medium text-white leading-tight mb-6">
                  <strong>Напольная-вешалка.рф</strong> для гостиниц и баз отдыха
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8 max-w-lg">
                  Мы создаём <strong>напольные вешалки</strong>, которые одинаково органично смотрятся в лобби пятизвёздочного отеля, уютном номере базы отдыха или дизайнерском бутик-хостеле. Чёрный и белый — универсальные цвета, которые вписываются в любой интерьер: от строгой классики до смелого лофта, от скандинавского минимализма до восточного ваби-саби.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: "ri-building-line",
                      title: "Оптовые поставки",
                      text: "Специальные условия для гостиничных сетей и управляющих компаний. Гибкие объёмы.",
                    },
                    {
                      icon: "ri-brush-line",
                      title: "Любой дизайн интерьера",
                      text: "Наши вешалки универсальны: от классики до хай-тека, от шале до минимализма.",
                    },
                    {
                      icon: "ri-award-line",
                      title: "Повышенная износостойкость",
                      text: "Усиленные конструкции для интенсивной эксплуатации в коммерческих помещениях.",
                    },
                    {
                      icon: "ri-paint-line",
                      title: "Индивидуальное брендирование",
                      text: "Возможность кастомизации под фирменный стиль вашего объекта размещения.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-white/60 mt-0.5">
                        <i className={`${item.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="font-label text-sm font-medium text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-foreground-950 font-label text-xs tracking-[0.15em] uppercase hover:bg-background-100 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Стать партнёром
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-up-line text-sm"></i>
                  </div>
                </button>
              </div>

              <div className="w-full lg:w-1/2 hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Black%20minimalist%20floor%20clothes%20rack%20in%20luxurious%20hotel%20room%20interior%20with%20white%20bedding%20warm%20ambient%20lighting%20marble%20accents%20elegant%20hospitality%20design%20professional%20photography%20clean%20composition&width=500&height=667&seq=b2b-hotel-room-01&orientation=portrait"
                        alt="Вешалка Напольная-вешалка.рф в гостиничном номере"
                        title="Напольная вешалка в интерьере гостиничного номера — Напольная-вешалка.рф"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Designer%20black%20coat%20stand%20in%20modern%20resort%20reception%20area%20with%20natural%20wood%20elements%20large%20windows%20mountain%20view%20cozy%20mountain%20retreat%20aesthetic%20professional%20interior%20photography&width=500&height=500&seq=b2b-resort-01&orientation=squarish"
                        alt="Вешалка в зоне ресепшн базы отдыха"
                        title="Стойка для одежды на базе отдыха — Напольная-вешалка.рф"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Sleek%20floor%20standing%20clothes%20rack%20in%20boutique%20hotel%20lobby%20with%20white%20walls%20black%20accents%20contemporary%20design%20plants%20natural%20light%20elegant%20space%20professional%20interior%20photography&width=500&height=500&seq=b2h-boutique-01&orientation=squarish"
                        alt="Вешалка в бутик-отеле"
                        title="Дизайнерская напольная вешалка в бутик-отеле — Напольная-вешалка.рф"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Black%20clothing%20rack%20in%20spa%20resort%20dressing%20room%20white%20towels%20zen%20atmosphere%20minimalist%20wellness%20design%20natural%20stone%20walls%20soft%20lighting%20professional%20interior%20photography&width=500&height=667&seq=b2b-spa-01&orientation=portrait"
                        alt="Вешалка в спа-зоне"
                        title="Напольная вешалка в спа-зоне отеля — Напольная-вешалка.рф"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background-50 px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3 text-center">
              Универсальность
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 text-center mb-4">
              <strong>Напольная вешалка</strong> подходит к любому дизайну
            </h2>
            <p className="text-sm md:text-base text-foreground-600 text-center max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
              Чёрный и белый — два цвета, которые никогда не выходят из моды. Наши <strong>напольные вешалки</strong> одинаково элегантно дополнят любой интерьер, независимо от стиля и концепции.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
              {[
                {
                  image: "https://readdy.ai/api/search-image?query=Minimalist%20Scandinavian%20hotel%20room%20interior%20with%20black%20floor%20clothes%20rack%20white%20walls%20light%20wood%20floors%20natural%20light%20calm%20atmosphere%20hygge%20design%20professional%20interior%20photography&width=400&height=500&seq=style-scandi&orientation=portrait",
                  label: "Скандинавский",
                },
                {
                  image: "https://readdy.ai/api/search-image?query=Industrial%20loft%20style%20hotel%20interior%20with%20exposed%20brick%20black%20metal%20floor%20clothes%20rack%20concrete%20walls%20warm%20lighting%20urban%20aesthetic%20professional%20interior%20photography&width=400&height=500&seq=style-loft&orientation=portrait",
                  label: "Лофт",
                },
                {
                  image: "https://readdy.ai/api/search-image?query=Classic%20elegant%20hotel%20room%20with%20black%20designer%20clothes%20rack%20white%20crown%20molding%20high%20ceiling%20chandelier%20traditional%20luxury%20interior%20professional%20photography&width=400&height=500&seq=style-classic&orientation=portrait",
                  label: "Классика",
                },
                {
                  image: "https://readdy.ai/api/search-image?query=Modern%20minimalist%20hotel%20interior%20with%20white%20floor%20clothes%20rack%20clean%20lines%20neutral%20palette%20zen%20atmosphere%20Japanese%20wabi%20sabi%20aesthetic%20professional%20interior%20photography&width=400&height=500&seq=style-minimal&orientation=portrait",
                  label: "Минимализм",
                },
                {
                  image: "https://readdy.ai/api/search-image?query=Contemporary%20resort%20room%20interior%20with%20black%20designer%20clothes%20rack%20warm%20wood%20tones%20tropical%20plants%20natural%20textures%20boho%20chic%20aesthetic%20professional%20photography&width=400&height=500&seq=style-boho&orientation=portrait",
                  label: "Бохо",
                },
                {
                  image: "https://readdy.ai/api/search-image?query=High%20tech%20modern%20hotel%20room%20with%20sleek%20black%20floor%20clothes%20rack%20glass%20walls%20LED%20lighting%20futuristic%20design%20clean%20surfaces%20professional%20interior%20photography&width=400&height=500&seq=style-hitech&orientation=portrait",
                  label: "Хай-тек",
                },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={`Вешалка Напольная-вешалка.рф в интерьере ${item.label}`}
                      title={`Напольная вешалка в интерьере ${item.label} — Напольная-вешалка.рф`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center font-label text-xs tracking-[0.1em] uppercase text-foreground-700">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[1000px] mx-auto">
            <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3 text-center">
              Отзывы
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 text-center mb-12 md:mb-16">
              Что говорят наши клиенты
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-background-50 border border-background-200 p-6 md:p-7"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 flex items-center justify-center">
                        <i
                          className={`text-sm ${
                            i < review.rating
                              ? "ri-star-fill text-foreground-900"
                              : "ri-star-line text-foreground-300"
                          }`}
                        ></i>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-foreground-700 leading-relaxed mb-5">
                    {review.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-label text-xs font-medium text-foreground-900">
                      {review.name}
                    </span>
                    <span className="text-xs text-foreground-400 font-label">{review.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background-100 px-6 md:px-10 py-14 md:py-24">
          <div className="max-w-[900px] mx-auto">
            <p className="font-label text-xs tracking-[0.15em] uppercase text-foreground-400 mb-3 text-center">
              Часто задаваемые вопросы
            </p>
            <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground-950 text-center mb-12 md:mb-16">
              FAQ — <strong>напольные вешалки</strong> и стойки для одежды
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-background-50 border border-background-200 overflow-hidden cursor-pointer">
                  <summary className="flex items-center justify-between px-6 py-5 text-sm md:text-base font-medium text-foreground-900 list-none">
                    <span>{item.q}</span>
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 ml-4 text-foreground-400 group-open:rotate-45 transition-transform duration-300">
                      <i className="ri-add-line text-lg"></i>
                    </div>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-foreground-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />

      <PartnerFormModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

      <Footer />
    </>
  );
}