<script setup>
import { RouterLink } from 'vue-router'
import heroLeft from '@/assets/img/hero-left.jpg'
</script>

<template>
  <main>
    <section class="hero" id="hero">
      <div class="hero__grid">
        <figure class="hero__photo">
          <img :src="heroLeft" alt="Интерьер и атмосфера Skin Tattoo" />
        </figure>

        <div class="hero__content">
          <h1 id="hero-title">ABOUT SKIN TATTOO PARLOR</h1>
          <p>
            Если вы решились воплотить мечту в художественную профессиональную студию в
            Санкт-Петербурге, вы на правильном пути.
          </p>
          <RouterLink class="btn-outline" to="/booking">ЗАПИСАТЬСЯ</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.hero
  border-bottom: $border

  &__grid
    display: grid
    grid-template-columns: 58% 42%
    min-height: calc(100vh - 11.8rem)

  &__photo
    min-height: calc(100vh - 11.8rem)
    max-height: calc(100vh - 11.8rem)
    border-right: $border
    background: $bg
    display: flex
    align-items: center
    justify-content: center
    overflow: hidden

    img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center center

  &__content
    min-height: calc(100vh - 11.8rem)
    max-height: calc(100vh - 11.8rem)
    padding: 4.6rem 3.8rem 3rem
    display: flex
    flex-direction: column
    justify-content: space-between

    h1
      margin: 0
      max-width: 56rem
      font-size: clamp(5.2rem, 4.8vw, 9.2rem)
      line-height: .9
      font-weight: 500
      letter-spacing: -.04em

    p
      margin: 0
      max-width: 47rem
      font-size: $fs-md
      line-height: 1.16

  &__text
    display: flex
    flex-direction: column
    gap: 1.4rem

.btn-outline
  display: inline-flex
  align-items: center
  justify-content: center
  min-width: 20.2rem
  min-height: 5.2rem
  border: $border
  border-radius: $radius-round
  text-decoration: none
  color: $text
  font-size: $fs-lg
  line-height: 1
  font-weight: 500
  padding: 0 2.8rem
  background: var(--card-strong)
  font-family: $font-body

@media (max-width: 1200px)
  .hero
    &__grid
      grid-template-columns: 1fr
      min-height: auto

    &__photo
      min-height: 52rem
      max-height: none
      border-right: 0
      border-bottom: $border

      img
        object-fit: cover

    &__content
      min-height: auto
      max-height: none
      gap: 3rem
      padding: 3rem 2rem 3.4rem

      h1
        max-width: 74rem

      p
        max-width: 58rem

@media (max-width: 768px)
  .hero
    &__photo
      min-height: 38rem

    &__content
      h1
        font-size: clamp(3.8rem, 12vw, 5.2rem)
        letter-spacing: -.03em

      p
        font-size: 1.5rem

  .btn-outline
    width: 100%
    min-width: 0

@media (max-width: 576px)
  .hero
    &__photo
      min-height: 32rem

    &__content
      padding: 2.4rem 1.2rem 3rem
</style>
