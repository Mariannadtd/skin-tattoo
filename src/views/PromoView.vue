<script setup>
import tattoo4 from '@/assets/img/tattoo4.jpg'

const offers = [
  {
    intro: 'Приведи друга и получи скидку',
    discount: '10%',
    caption: 'на следующий сеанс'
  },
  {
    intro: 'До конца февраля скидка',
    discount: '15%',
    caption: 'на парные татуировки в честь Дня Святого Валентина'
  }
]
</script>

<template>
  <main>
    <section class="promo-offers" id="promo" aria-labelledby="promo-title">
      <div class="promo-offers__shell">
        <figure class="promo-offers__photo">
          <img :src="tattoo4" alt="Красная татуировка на руке" />
        </figure>

        <article class="promo-offers__card">
          <span class="promo-offers__badge" aria-hidden="true">★</span>

          <h1 id="promo-title">АКЦИИ</h1>

          <ul class="promo-offers__list">
            <li v-for="offer in offers" :key="offer.discount" class="promo-offers__item">
              <p>{{ offer.intro }}</p>

              <div class="promo-offers__discount">
                <strong>{{ offer.discount }}</strong>
                <span>{{ offer.caption }}</span>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.promo-offers
  min-height: calc(100vh - 11.8rem)
  padding: 4.8rem 0 8.8rem
  border-bottom: $border
  overflow: hidden

  &__shell
    position: relative
    width: min(138rem, calc(100% - 9.6rem))
    min-height: 72rem
    margin: 0 auto
    display: grid
    grid-template-columns: 58% 42%
    align-items: start

  &__photo
    border: $border
    background: #fff
    overflow: hidden

    img
      width: 100%
      height: 72rem
      object-fit: cover
      object-position: center 54%

  &__card
    position: absolute
    left: calc(58% - 15rem)
    top: 18.4rem
    width: 52rem
    min-height: 35.6rem
    border: $border
    background: rgba(246, 246, 246, .97)
    padding: 4rem 4.8rem 3.8rem
    color: $text

  &__badge
    position: absolute
    left: -3.3rem
    top: 50%
    transform: translateY(-50%)
    width: 6.6rem
    height: 6.6rem
    border: $border
    border-radius: $radius-full
    background: $bg
    display: flex
    align-items: center
    justify-content: center
    font-size: 4.2rem
    line-height: 1
    font-family: $font-heading

  h1
    margin: 0 0 4.4rem
    font-size: 6.8rem
    line-height: .92
    font-weight: 500

  &__list
    display: flex
    flex-direction: column
    gap: 2.8rem

  &__item
    p
      margin: 0 0 .4rem
      font-size: 2rem
      line-height: 1.1
      font-family: $font-body

  &__discount
    display: flex
    align-items: flex-end
    gap: 1.2rem

    strong
      font-size: 6rem
      line-height: .82
      font-weight: 400
      font-family: $font-heading
      flex-shrink: 0

    span
      max-width: 27rem
      padding-bottom: .3rem
      font-size: 2rem
      line-height: 1.05
      font-family: $font-body

@media (max-width: 1200px)
  .promo-offers
    min-height: auto
    padding: 4rem 0 7rem

    &__shell
      width: min(100%, calc(100% - 4rem))
      min-height: auto
      display: block

    &__photo
      max-width: 76rem

      img
        height: 60rem

    &__card
      position: relative
      left: auto
      top: auto
      width: min(100%, 52rem)
      min-height: 0
      margin: -7.6rem 0 0 auto

@media (max-width: 768px)
  .promo-offers
    padding: 2.4rem 0 5rem

    &__shell
      width: calc(100% - 2.4rem)

    &__photo
      max-width: none

      img
        height: auto
        aspect-ratio: 4 / 5
        object-position: center 52%

    &__card
      width: 100%
      margin-top: 1.4rem
      padding: 4.4rem 2.2rem 2.8rem

    &__badge
      left: 1.8rem
      top: -2.6rem
      transform: none
      width: 5.2rem
      height: 5.2rem
      font-size: 3.2rem

    h1
      margin-bottom: 3rem
      font-size: 4.8rem

    &__list
      gap: 2.4rem

    &__item
      p
        font-size: 1.7rem

    &__discount
      align-items: flex-start
      gap: 1rem

      strong
        font-size: 5.2rem

      span
        padding-top: .4rem
        padding-bottom: 0
        font-size: 1.7rem
</style>
