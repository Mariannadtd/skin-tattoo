<script setup>
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
          <a class="btn-outline" href="#booking">ЗАПИСАТЬСЯ</a>
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
</style>
