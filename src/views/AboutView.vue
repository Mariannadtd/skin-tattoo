<script setup>
import founderBg from '../assets/img/founder-bg.jpg'
</script>

<template>
  <section class="statement" aria-labelledby="statement-title">
    <div class="container statement__inner">
      <h2 id="statement-title">
        SKIN TATTOO — ЭТО ЕДИНСТВЕННОЕ МЕСТО,<br />
        ГДЕ ВЫ СМОЖЕТЕ ВОПЛОТИТЬ СВОИ<br />
        САМЫЕ ЗАВЕТНЫЕ МЕЧТЫ И ЖЕЛАНИЯ,<br />
        КАСАЕМО ТАТУИРОВКИ.
      </h2>

      <span class="statement-par">SKIN TATTOO, SINCE ©2006</span>
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
          уверены, что это направление единственно верное для достижения нашей цели — через новое
          видение татуировки раскрывать форму и материал.
        </p>
        <p>
          Наша студия открыта для творческого почерка мастеров. Это не просто рисунок. Это искусство
          на вашей коже.
        </p>
      </article>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.statement
  padding: 9rem 0 8rem

  &__inner
    text-align: center

  h2
    margin: 0
    font-size: clamp(3rem, 4.2vw, 7.4rem)
    line-height: .98
    font-weight: 800
    letter-spacing: -.03em

  p
    margin: 8.8rem auto 4.2rem
    max-width: 66rem
    font-size: $fs-sm
    line-height: 1.15
    font-family: $font-body

  span
    display: inline-block
    font-size: $fs-2xs
    line-height: 1.15
    font-family: $font-body

  &-par
    padding-top: 5rem

.founder
  position: relative

  &__inner
    position: relative
    min-height: 82rem
    overflow: hidden

  &__bg
    position: absolute
    inset: 0
    border-top: $border
    border-bottom: $border

    &::after
      content: ''
      position: absolute
      inset: 0
      background: rgba(29, 57, 216, .44)
      mix-blend-mode: multiply

    img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center
      filter: grayscale(.1) contrast(1.02) saturate(.8)

  &__title
    position: relative
    z-index: 1
    margin: 0
    padding: 4.6rem 0 0 5.2rem
    font-size: clamp(4.8rem, 4vw, 8.2rem)
    line-height: .94
    color: $white
    letter-spacing: -.03em

  &__card
    position: absolute
    z-index: 1
    right: 11rem
    top: 22rem
    width: 52rem
    background: rgba(246, 246, 246, .96)
    border: $border
    padding: $space-lg 1.8rem

    p
      margin: 0 0 1.4rem
      font-size: $fs-lg
      line-height: 1.1
      font-family: $font-body

      &:last-child
        margin-bottom: 0

  &__bottom
    position: absolute
    left: 50%
    bottom: 2.2rem
    transform: translateX(-50%)
    z-index: 1
    color: $white
    font-size: clamp(3.6rem, 3.6vw, 6.8rem)
    font-weight: 700
    line-height: .94
    white-space: nowrap
</style>
