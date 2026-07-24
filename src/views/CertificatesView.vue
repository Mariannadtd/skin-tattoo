<script setup>
import card from '@/assets/img/card.png'
import cat from '@/assets/img/cat.png'
import heart from '@/assets/img/heart.png'
import skyBg from '@/assets/img/sky-bg.jpg'

const certificates = [
  {
    number: '01',
    image: card,
    price: '2.000',
    text: 'для знакомого',
    alt: 'Подарочный сертификат с картой',
    mod: 'card'
  },
  {
    number: '02',
    image: heart,
    price: '5.000',
    text: 'для друга',
    alt: 'Подарочный сертификат с сердцем',
    mod: 'heart'
  },
  {
    number: '03',
    image: cat,
    price: '10.000',
    text: 'для кореша',
    alt: 'Подарочный сертификат с котами',
    mod: 'cat'
  }
]
</script>

<template>
  <main>
    <section class="certificates" aria-labelledby="certificates-title">
      <img class="certificates__bg" :src="skyBg" alt="" aria-hidden="true" />

      <div class="certificates__inner">
        <h1 class="certificates__title" id="certificates-title">СЕРТИФИКАТЫ</h1>

        <article
          v-for="item in certificates"
          :key="item.number"
          class="certificates__item"
          :class="`certificates__item--${item.mod}`"
        >
          <img class="certificates__image" :src="item.image" :alt="item.alt" />

          <div class="certificates__content">
            <span>{{ item.number }}</span>
            <strong>{{ item.price }}р</strong>
            <small>{{ item.text }}</small>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.certificates
  position: relative
  min-height: calc(100vh - 11.8rem)
  border-bottom: $border
  overflow: hidden
  background: #6ab7f2

  &__bg
    position: absolute
    inset: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center

  &__inner
    position: relative
    z-index: 1
    width: min(132rem, calc(100% - 9.6rem))
    min-height: calc(100vh - 11.8rem)
    margin: 0 auto

  &__title
    position: absolute
    left: 54%
    top: 53%
    transform: translate(-50%, -50%)
    margin: 0
    min-width: min(58rem, 90vw)
    min-height: 9.8rem
    border: 0.1rem solid rgba(246, 246, 246, .95)
    border-radius: $radius-round
    color: $white
    display: flex
    align-items: center
    justify-content: center
    padding: 0 5rem
    font-size: clamp(3.8rem, 3.6vw, 6.6rem)
    line-height: 1
    font-weight: 400
    letter-spacing: 0
    font-family: $font-heading
    white-space: nowrap

  &__item
    position: absolute
    color: $white
    display: block

    &--card
      left: 7rem
      top: 8rem
      width: 46rem

      .certificates__image
        width: 23rem
        transform: rotate(-2deg)

      .certificates__content
        position: absolute
        left: 23rem
        top: 24rem

    &--heart
      right: 7rem
      top: 7rem
      width: 46rem

      .certificates__image
        width: 24rem
        margin-left: auto

      .certificates__content
        position: absolute
        left: -8rem
        top: 2.6rem

    &--cat
      right: 10rem
      bottom: 2rem
      width: 45rem

      .certificates__image
        width: 23rem
        margin-left: auto

      .certificates__content
        position: absolute
        left: -11rem
        top: 8.8rem

  &__image
    display: block
    height: auto
    filter: drop-shadow(0 1.2rem 1.8rem rgba(29, 57, 216, .18))

  &__content
    display: grid
    grid-template-columns: 5.4rem 1fr
    grid-template-areas: "number price" ". text"
    align-items: center
    gap: .3rem 1.6rem

    span
      grid-area: number
      width: 5.4rem
      height: 5.4rem
      border: 0.1rem solid rgba(246, 246, 246, .95)
      border-radius: $radius-full
      display: flex
      align-items: center
      justify-content: center
      font-size: $fs-lg
      line-height: 1
      font-family: $font-heading

    strong
      grid-area: price
      font-size: clamp(4rem, 3.8vw, 6.4rem)
      line-height: .9
      font-weight: 600
      font-family: $font-heading
      white-space: nowrap

    small
      grid-area: text
      font-size: $fs-xl
      line-height: 1
      font-family: $font-body

@media (max-width: $x-large)
  .certificates
    &__inner
      width: min(100%, calc(100% - 4rem))

    &__item
      &--card
        left: 2rem

      &--heart
        right: 2rem

      &--cat
        right: 3rem

@media (max-width: $large)
  .certificates
    &__title
      top: 52%
      left: 54%
      min-width: min(48rem, 88vw)

    &__item
      &--card
        left: 1rem
        top: 7rem

        .certificates__image
          width: 19rem

        .certificates__content
          left: 19rem
          top: 20rem

      &--heart
        right: 0
        width: 38rem

        .certificates__image
          width: 20rem

      &--cat
        right: 0
        width: 37rem

        .certificates__image
          width: 20rem

@media (max-width: $medium)
  .certificates
    min-height: auto
    padding: 5rem 0

    &__inner
      width: calc(100% - 2.4rem)
      min-height: auto
      display: flex
      flex-direction: column
      gap: 3rem

    &__title
      position: relative
      left: auto
      top: auto
      transform: none
      order: 2
      min-width: 0
      width: 100%
      min-height: 7rem
      padding: 0 2rem
      font-size: 3.2rem

    &__item
      position: relative
      left: auto !important
      right: auto !important
      top: auto !important
      bottom: auto !important
      width: 100% !important
      grid-template-columns: 11rem 1fr
      gap: 1.4rem
      display: grid

      &--card
        order: 1

      &--heart
        order: 3

      &--cat
        order: 4

      &--card,
      &--heart,
      &--cat
        .certificates__image
          order: 1
          width: 11rem
          margin: 0
          transform: none

        .certificates__content
          position: static
          order: 2
          justify-self: start
          align-self: center
          padding: 0

    &__content
      grid-template-columns: 4.6rem 1fr
      gap: .3rem 1.2rem

      span
        width: 4.6rem
        height: 4.6rem
        font-size: $fs-sm

      strong
        font-size: 3.2rem

      small
        font-size: $fs-md
</style>
