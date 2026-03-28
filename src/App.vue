<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

import firstMaster from './assets/img/first-master.jpg'
import secondMaster from './assets/img/second-master.jpg'
import thirdMaster from './assets/img/third-master.jpg'

import karina from './assets/img/karina.jpg'
import nikita from './assets/img/nikita.jpg'
import kolya from './assets/img/kolya.jpg'

import andy from './assets/img/andy.jpg'
import antonina from './assets/img/antonina.jpg'
import vesenya from './assets/img/vesenya.jpg'

import mirana from './assets/img/mirana.jpg'
import anna from './assets/img/anna.jpg'
import olga from './assets/img/olga.jpg'

import tattoo1 from './assets/img/tattoo-first.jpg'
import tattoo2 from './assets/img/tattoo-second.jpg'
import tattoo3 from './assets/img/tattoo-third.jpg'
import tattoo4 from './assets/img/tattoo4.jpg'
import tattoo5 from './assets/img/tattoo5.jpg'
import tattoo6 from './assets/img/tattoo6.jpg'
import tattoo7 from './assets/img/tattoo7.jpg'
import tattoo8 from './assets/img/tattoo8.jpg'
import tattoo9 from './assets/img/tattoo9.jpg'
import tattoo10 from './assets/img/tattoo10.jpg'
import tattoo11 from './assets/img/tattoo11.jpg'
import tattoo12 from './assets/img/tattoo12.jpg'

const navLeft = [
  { to: '/about', label: 'О нас' },
  { to: '/principles', label: 'Принципы' },
  { to: '/masters', label: 'Мастера' },
  { to: '/works', label: 'Работы' }
]

const navRight = [
  { to: '/promo', label: 'Акции' },
  { to: '/booking', label: 'Запись' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' }
]

let features = [
  {
    number: '01',
    title: 'Стилистика работ',
    paragraph:
      'Мы не работаем по шаблону и не превращаем татуировку в потоковую услугу. Для нас важно, чтобы каждая работа выглядела цельно, подходила именно вам и сохраняла выразительность спустя годы. Мы учитываем анатомию, стиль, композицию и общее впечатление, чтобы татуировка выглядела как осознанный художественный выбор, а не случайный рисунок.'
  },
  {
    number: '02',
    title: 'Особенность и уникальность',
    paragraph:
      'Каждый человек приходит со своей историей, настроением и идеей, поэтому мы уделяем внимание индивидуальному подходу. Мы не просто переносим картинку на кожу, а помогаем адаптировать задумку, доработать детали и найти решение, которое будет ощущаться вашим. В результате работа получается не просто красивой, а действительно личной и уникальной.'
  },
  {
    number: '03',
    title: 'Оборудование',
    paragraph:
      'В работе мы используем профессиональное современное оборудование, которое позволяет добиваться точности, чистоты линий и комфортного процесса для клиента. Исправная техника, качественные расходники и внимание к деталям помогают мастеру работать уверенно, а вам — чувствовать себя спокойно на каждом этапе сеанса.'
  },
  {
    number: '04',
    title: 'Материалы',
    paragraph:
      'Мы выбираем только качественные материалы, потому что от них напрямую зависит и результат, и безопасность. Пигменты, расходники и сопутствующие средства подбираются с учетом надежности, стойкости и профессиональных стандартов. Это позволяет получать аккуратный результат, который хорошо выглядит сразу после сеанса и красиво заживает.'
  },
  {
    number: '05',
    title: 'Безопасность и стерильность',
    paragraph:
      'Безопасность для нас — не формальность, а обязательная основа работы. Мы строго соблюдаем санитарные нормы, используем одноразовые расходные материалы и внимательно следим за стерильностью инструментов и рабочего пространства. Вы можете быть уверены, что процедура проходит в чистых, контролируемых и профессионально организованных условиях.'
  },
  {
    number: '06',
    title: 'Пространство',
    paragraph:
      'Атмосфера студии так же важна, как и качество самой работы. Мы создаем пространство, в котором можно чувствовать себя спокойно, комфортно и уверенно, даже если это ваша первая татуировка. Уютная обстановка, внимание к деталям и уважительное отношение помогают снять напряжение и сделать весь процесс приятным и понятным.'
  }
]

const masters = [
  {
    role: 'Стажеры',
    image: firstMaster,
    alt: 'Мастера-стажеры',
    list: [
      {
        name: 'Карина',
        image: karina,
        descr:
          'Аккуратный начинающий мастер с хорошим чувством формы. Любит чистые линии, минимализм и внимательно относится к деталям.',
        alt: 'Мастер-1'
      },
      {
        name: 'Никита',
        image: nikita,
        descr:
          'Спокойный и вдумчивый мастер, который тщательно прорабатывает эскиз и помогает подобрать удачное решение под идею клиента.',
        alt: 'Мастер-2'
      },
      {
        name: 'Коля',
        image: kolya,
        descr:
          'Мастер с уверенной рукой и интересом к графике. Работает внимательно, стараясь сделать каждую работу чистой и выразительной.',
        alt: 'Мастер-3'
      }
    ]
  },
  {
    role: 'Специалисты',
    image: secondMaster,
    alt: 'Мастера-специалисты',
    list: [
      {
        name: 'Андрей',
        image: andy,
        descr:
          'Опытный мастер, который уверенно работает с разными стилями и помогает превратить идею в продуманную и гармоничную татуировку.',
        alt: 'Мастер-1'
      },
      {
        name: 'Антонина',
        image: antonina,
        descr:
          'Тонко чувствует композицию и эстетику работы. Любит аккуратные, выразительные татуировки с вниманием к настроению и подаче.',
        alt: 'Мастер-2'
      },
      {
        name: 'Весения',
        image: vesenya,
        descr:
          'Мастер с ярким художественным взглядом и вниманием к индивидуальности клиента. Делает работы, которые запоминаются характером.',
        alt: 'Мастер-3'
      },
      {
        name: 'Антонина',
        image: antonina,
        descr:
          'Тонко чувствует композицию и эстетику работы. Любит аккуратные, выразительные татуировки с вниманием к настроению и подаче.',
        alt: 'Мастер-2'
      }
    ]
  },
  {
    role: 'Профи',
    image: thirdMaster,
    alt: 'Мастера-профи',
    list: [
      {
        name: 'Мирана',
        image: mirana,
        descr:
          'Сильный мастер с большим опытом, уверенным стилем и точной подачей. Создает сложные, цельные работы с выразительным характером.',
        alt: 'Мастер-1'
      },
      {
        name: 'Анна',
        image: anna,
        descr:
          'Профессионал с тонким чувством композиции и высоким уровнем исполнения. Умеет делать татуировки эстетичными, чистыми и живыми.',
        alt: 'Мастер-2'
      },
      {
        name: 'Ольга',
        image: olga,
        descr:
          'Мастер высокого уровня, который сочетает технику, опыт и художественный взгляд. Работает точно, уверенно и с большим вниманием к качеству.',
        alt: 'Мастер-3'
      }
    ]
  }
]
// import heroLeft from './assets/img/hero-left.jpg'
//
// import aboutLeft from './assets/img/about-left.jpg'

// import footerBg from './assets/img/footer-bg.jpg'

// const masters = [
//   {
//     role: 'Стажеры',
//     image: firstMaster,
//     alt: 'Мастера-стажеры'
//   },
//   {
//     role: 'Специалисты',
//     image: secondMaster,
//     alt: 'Мастера-специалисты'
//   },
//   {
//     role: 'Профи',
//     image: thirdMaster,
//     alt: 'Мастера-профи'
//   }
// ]

const works = [
  {
    title: 'MINI TATY',
    image: tattoo1,
    alt: 'Мини тату',
    mod: 'a'
  },
  {
    title: 'ТАТУ<br>МАШИНКОЙ',
    image: tattoo2,
    alt: 'Тату машинкой',
    mod: 'b'
  },
  {
    title: 'ЭКСКЛЮЗИВНЫЕ',
    image: tattoo3,
    alt: 'Эксклюзивные тату',
    mod: 'c'
  },
  {
    title: 'ТАТУ ХНОЙ',
    image: tattoo4,
    alt: 'Тату хной',
    mod: 'd'
  },
  {
    title: 'СТИКЕРЫ',
    image: tattoo5,
    alt: 'Тату стикеры',
    mod: 'e'
  },
  {
    title: 'ШРАМИРО<br>ВАНИЕ',
    image: tattoo6,
    alt: 'Шрамирование',
    mod: 'f'
  },
  {
    title: 'MINI TATY',
    image: tattoo7,
    alt: 'Мини тату',
    mod: 'g'
  },
  {
    title: 'ГОТИКА',
    image: tattoo8,
    alt: 'ГОТИКА',
    mod: 'h'
  },
  {
    title: 'ЭКСКЛЮЗИВНЫЕ',
    image: tattoo9,
    alt: 'Эксклюзивные тату',
    mod: 'i'
  },
  {
    title: 'ТАТУ ХНОЙ',
    image: tattoo10,
    alt: 'Тату хной',
    mod: 'j'
  },
  {
    title: 'ХОРРОР',
    image: tattoo11,
    alt: 'ХОРРОР',
    mod: 'k'
  },
  {
    title: 'ШРАМИРО<br>ВАНИЕ',
    image: tattoo12,
    alt: 'Шрамирование',
    mod: 'l'
  }
]

// const certs = [
//   {
//     number: '01',
//     image: card,
//     price: '2.000',
//     text: 'для знакомого',
//     alt: 'Сертификат с картой',
//     mod: 'left'
//   },
//   {
//     number: '02',
//     image: heart,
//     price: '5.000',
//     text: 'для друга',
//     alt: 'Сертификат с сердцем',
//     mod: 'top'
//   },
//   {
//     number: '03',
//     image: cat,
//     price: '10.000',
//     text: 'для кореша',
//     alt: 'Сертификат с котами',
//     mod: 'right'
//   }
// ]

// const reviews = [
//   {
//     avatar: tattoo1,
//     name: 'Женя',
//     text: 'Хорошая студия! Постоянно делаю тату, эту уже мою многолетнюю мечту исполнили именно здесь. Рекомендую.'
//   },
//   {
//     avatar: tattoo2,
//     name: 'Саша',
//     text: 'Посещение было отличным удовольствием. Вежливые мастера, твердая рука и искусство передано филигранно.'
//   },
//   {
//     avatar: tattoo3,
//     name: 'Элина',
//     text: 'Впервые была в этой студии. У мастера Миши очень понравился подход, атмосфера и сам результат.'
//   }
// ]
</script>

<template>
  <div class="page">
    <AppHeader :nav-left="navLeft" :nav-right="navRight" />
    <RouterView v-slot="{ Component }">
      <component :is="Component" :features="features" :masters="masters" :works="works" />
    </RouterView>

    <!-- <main>
      <section class="hero" id="hero" aria-labelledby="hero-title">
        <div class="hero__grid">
          <figure class="hero__photo">
            <img :src="heroLeft" alt="Интерьер и атмосфера Skin Tattoo" />
          </figure>

          <div class="hero__content">
            <div>
              <h1 id="hero-title">ABOUT SKIN TATTOO PARLOR</h1>

              <div class="hero__text">
                <p>
                  Если вы решились воплотить мечту в художественной татуировке и выбрать
                  профессиональную студию в Санкт-Петербурге, вы нашли то, что искали.
                </p>

                <p>
                  Тату салон SKIN — это не просто место, где создают рисунки на коже. Это первая
                  студия в Северной столице, где татуировка получает художественную подачу и место в
                  культуре.
                </p>
              </div>
            </div>

            <a class="btn-outline" href="#booking">ЗАПИСАТЬСЯ</a>
          </div>
        </div>
      </section>

      <section class="statement" aria-labelledby="statement-title">
        <div class="container statement__inner">
          <h2 id="statement-title">
            SKIN TATTOO — ЭТО ЕДИНСТВЕННОЕ<br />
            МЕСТО, В КОТОРОМ ВЫ СМОЖЕТЕ<br />
            ВОПЛОТИТЬ СВОИ САМЫЕ<br />
            ЗАВЕТНЫЕ МЕЧТЫ<br />
            И ЖЕЛАНИЯ, КАСАЕМО<br />
            ТАТУИРОВКИ.
          </h2>

          <p>
            За 18 лет существования студии мы получили огромный опыт в искусстве татуирования и
            общении с людьми.
          </p>

          <span>SKIN TATTOO, SINCE<br />©2006</span>
        </div>
      </section>

      <section class="founder" aria-labelledby="founder-title">
        <div class="founder__inner">
          <div class="founder__bg">
            <img :src="founderBg" alt="Основатель студии Skin Tattoo" />
          </div>

          <h2 class="founder__title" id="founder-title">ОСНОВАТЕЛЬ</h2>

          <article class="founder__card">
            <p>
              Тату салон SKIN был открыт в 2006 году Александром Скином — мастером своего дела,
              лауреатом премий «WORLD TATTOO AWARDS», «PREMIUM SKIN».
            </p>
            <p>
              Мы единственная в России студия, которая двигается в направлении уникальности, и мы
              уверены, что это направление единственно верное для достижения нашей цели — через
              новое видение татуировки раскрывать форму и материал.
            </p>
            <p>
              Наша студия открыта для творческого почерка мастеров. Это не просто рисунок. Это
              искусство на вашей коже.
            </p>
          </article>

          <div class="founder__bottom">И ПРИНЦИПЫ В РАБОТЕ</div>
        </div>
      </section>

      <section class="features" id="about" aria-labelledby="features-title">
        <div class="container features__grid">
          <figure class="features__visual">
            <img :src="aboutLeft" alt="Пространство и атмосфера студии" />
            <figcaption class="features__caption">
              <h2 id="features-title">ПОЧЕМУ НУЖНО ВЫБРАТЬ НАС</h2>
              <p>
                Здесь вы можете подробнее ознакомиться с нашей уникальной студией, её особенностями,
                процессом работы и новым пространством.
              </p>
            </figcaption>
          </figure>

          <ol class="features__list">
            <li
              v-for="item in features"
              :key="item.number"
              class="features__item"
              :class="{ 'features__item--tall': item.tall }"
            >
              <span v-html="item.title.replace('\n', '<br>')"></span>
              <b>{{ item.number }}</b>
            </li>
          </ol>
        </div>
      </section>








      <section class="booking" id="booking" aria-labelledby="booking-title">
        <div class="container">
          <h2 class="section-title section-title--form" id="booking-title">ФОРМА ЗАПИСИ</h2>

          <div class="booking__grid">
            <figure class="booking__dragon">
              <img :src="dragon" alt="Декоративный дракон" />
            </figure>

            <form class="booking__form">
              <fieldset class="booking__fieldset">
                <legend class="field-select">МАСТЕР</legend>

                <div class="booking__radio-group booking__radio-group--masters">
                  <label><input type="radio" name="level" /> <span>Стажер</span></label>
                  <label><input type="radio" name="level" checked /> <span>Специалист</span></label>
                  <label><input type="radio" name="level" /> <span>Профи</span></label>
                </div>
              </fieldset>

              <div class="booking__avatars" aria-label="Список мастеров">
                <div>Миша</div>
                <div>Олег</div>
                <div>Саша</div>
                <div>Эля</div>
              </div>

              <fieldset class="booking__fieldset">
                <legend class="field-select">ДАТА</legend>

                <div class="calendar-box" aria-label="Календарь">
                  <div class="calendar-box__head">
                    <span>APRIL 2024</span>
                    <span>‹ ›</span>
                  </div>
                  <div class="calendar-box__grid">
                    <span v-for="n in 35" :key="n">{{ n <= 30 ? n : '' }}</span>
                  </div>
                </div>
              </fieldset>

              <fieldset class="booking__fieldset">
                <legend class="field-select">ВИД ТАТУ</legend>

                <div class="booking__radio-group booking__radio-group--types">
                  <label><input type="radio" name="type" /> <span>Мини тату</span></label>
                  <label><input type="radio" name="type" /> <span>Эксклюзивные</span></label>
                  <label><input type="radio" name="type" checked /> <span>Тату хэнд</span></label>
                  <label><input type="radio" name="type" /> <span>Тату машинкой</span></label>
                  <label><input type="radio" name="type" /> <span>Хендпоук</span></label>
                  <label><input type="radio" name="type" /> <span>Шрамирование</span></label>
                </div>
              </fieldset>

              <div class="field-select">СТОИМОСТЬ</div>

              <div class="booking__bottom">
                <strong>8.990р</strong>
                <button type="submit" class="btn-outline">ЗАПИСАТЬСЯ</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section class="promo" id="promo" aria-labelledby="promo-title">
        <div class="container promo__inner">
          <figure class="promo__image">
            <img :src="arm" alt="Татуировка на руке" />
          </figure>

          <article class="promo__card">
            <h2 id="promo-title">АКЦИИ</h2>
            <p>Приведи друга и получи скидку <strong>10%</strong> на следующий сеанс.</p>
            <p>
              До конца февраля скидка <strong>15%</strong> на парные татуировки в честь Дня Святого
              Валентина.
            </p>
          </article>
        </div>
      </section>

      <section class="certs" aria-labelledby="certs-title">
        <div class="certs__bg">
          <img :src="skyBg" alt="Фон секции сертификатов" />
        </div>

        <div class="container certs__inner">
          <h2 class="certs__title" id="certs-title">СЕРТИФИКАТЫ</h2>

          <article
            v-for="item in certs"
            :key="item.number"
            :class="`certs__badge certs__badge--${item.mod}`"
          >
            <img class="certs__image" :src="item.image" :alt="item.alt" />

            <div class="certs__meta">
              <span>{{ item.number }}</span>
              <strong>{{ item.price }}р</strong>
              <small>{{ item.text }}</small>
            </div>
          </article>
        </div>
      </section>

      <section class="reviews" id="reviews" aria-labelledby="reviews-title">
        <div class="container reviews__inner">
          <h2 class="section-subtitle section-subtitle--center" id="reviews-title">ОТЗЫВЫ</h2>

          <div class="reviews__grid">
            <article class="review" v-for="review in reviews" :key="review.name">
              <div class="review__avatar">
                <img :src="review.avatar" :alt="review.name" />
              </div>
              <strong>{{ review.name }}</strong>
              <p>{{ review.text }}</p>
            </article>
          </div>

          <div class="reviews__dots" aria-hidden="true">
            <span></span>
            <span class="is-active"></span>
            <span></span>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer" id="contacts">
      <div class="footer__bg">
        <img :src="footerBg" alt="Фон раздела контактов" />
      </div>

      <div class="container footer__inner">
        <nav class="footer__left" aria-label="Служебная информация">
          <a href="#">ПОЛИТИКА</a>
          <a href="#">КОНФИДЕНЦИАЛЬНОСТИ</a>
        </nav>

        <div class="footer__center">SEE U</div>

        <div class="footer__right">
          <section>
            <h2>КОНТАКТЫ</h2>
            <a href="tel:+79233213231">+7 (923) 231-32-31</a>
          </section>

          <section>
            <h2>СОЦ.СЕТИ</h2>
            <a href="#">INSTAGRAM</a>
            <a href="#">TELEGRAM</a>
            <a href="#">TIKTOK</a>
          </section>

          <address>
            <h2>АДРЕС</h2>
            <p>ЛЕНИНСКИЙ ПРОСПЕКТ 21,<br />САНКТ-ПЕТЕРБУРГ</p>
          </address>
        </div>
      </div>
    </footer> -->
  </div>
</template>
