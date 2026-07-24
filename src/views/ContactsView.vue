<script setup>
import footerBg from '@/assets/img/footer-bg.jpg'

const socials = ['INSTAGRAM', 'TELEGRAM', 'TIK TOK']
</script>

<template>
  <main>
    <section class="contacts-page" id="contacts" aria-labelledby="contacts-title">
      <img class="contacts-page__bg" :src="footerBg" alt="" aria-hidden="true" />

      <div class="contacts-page__inner">
        <nav class="contacts-page__policy" aria-label="Служебная информация">
          <a href="#">ПОЛИТИКА</a>
          <a href="#">КОНФИДЕНЦИАЛЬНОСТИ</a>
        </nav>

        <strong class="contacts-page__see">SEE U</strong>

        <div class="contacts-page__content">
          <section class="contacts-page__block contacts-page__block--phone">
            <h1 id="contacts-title">КОНТАКТЫ</h1>
            <a href="tel:+79232313231">+7 (923) 231-32-31</a>
          </section>

          <section class="contacts-page__block contacts-page__block--social">
            <h2>СОЦ.СЕТИ</h2>
            <ul>
              <li v-for="social in socials" :key="social">
                <a href="#">{{ social }}</a>
              </li>
            </ul>
          </section>

          <address class="contacts-page__block contacts-page__block--address">
            <h2>АДРЕС</h2>
            <p>ЛЕНИНСКИЙ ПРОСПЕКТ 21,<br />САНКТ-ПЕТЕРБУРГ</p>
          </address>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.contacts-page
  position: relative
  min-height: calc(100vh - 11.8rem)
  border-bottom: $border
  overflow: hidden
  background: #e7e7e7
  color: $text

  &__bg
    position: absolute
    inset: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    filter: grayscale(1) contrast(1.08)

  &::after
    content: ''
    position: absolute
    inset: 0
    background: linear-gradient(90deg, rgba(255, 255, 255, .02) 0%, rgba(255, 255, 255, .28) 62%, rgba(255, 255, 255, .5) 100%)
    pointer-events: none

  &__inner
    position: relative
    z-index: 1
    width: min(142rem, calc(100% - 9.6rem))
    min-height: calc(100vh - 11.8rem)
    margin: 0 auto

  &__content
    position: absolute
    right: 8rem
    top: 8rem
    width: 34rem
    display: flex
    flex-direction: column
    gap: 7rem

  &__block
    h1,
    h2
      margin: 0 0 1rem
      font-size: clamp(3rem, 2.8vw, 5rem)
      line-height: .94
      font-weight: 800
      font-family: $font-heading

    a,
    p
      display: block
      margin: 0
      color: inherit
      text-decoration: none
      font-size: clamp(1.7rem, 1.35vw, 2.2rem)
      line-height: 1.13
      font-family: $font-body
      font-weight: 400

    ul
      display: flex
      flex-direction: column
      gap: 1rem

  &__see
    position: absolute
    left: 50%
    top: 55%
    transform: translate(-50%, -50%)
    font-size: clamp(3.2rem, 2.8vw, 5rem)
    line-height: 1
    font-weight: 800
    font-family: $font-heading

  &__policy
    position: absolute
    left: 7rem
    bottom: 4.8rem
    display: flex
    flex-direction: column
    gap: .4rem

    a
      color: inherit
      text-decoration: none
      font-size: $fs-lg
      line-height: 1.08
      font-family: $font-body

@media (max-width: $x-large)
  .contacts-page
    &__inner
      width: min(100%, calc(100% - 4rem))

    &__content
      right: 3rem

    &__policy
      left: 3rem

@media (max-width: $medium)
  .contacts-page
    min-height: auto

    &__inner
      width: calc(100% - 2.4rem)
      min-height: 68rem
      padding: 4rem 0 3rem
      display: flex
      flex-direction: column

    &__content
      position: relative
      right: auto
      top: auto
      width: min(100%, 34rem)
      margin-left: auto
      gap: 3.4rem

    &__see
      position: relative
      left: auto
      top: auto
      transform: none
      margin: auto auto 8rem
      align-self: center

    &__policy
      position: relative
      left: auto
      bottom: auto
      margin-top: auto

      a
        font-size: $fs-md
</style>
