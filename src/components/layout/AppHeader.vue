<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  navLeft: {
    type: Array,
    default: () => []
  },
  navRight: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink class="header__mark" to="/" aria-label="На главную">S</RouterLink>

      <nav class="header__nav header__nav--left" aria-label="Основная навигация слева">
        <ul class="header__nav-list">
          <li v-for="item in navLeft" :key="item.label">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <RouterLink class="header__logo" to="/" aria-label="Skin Tattoo">
        <span>SKIN</span>
        <small>TATTOO</small>
      </RouterLink>

      <nav class="header__nav header__nav--right" aria-label="Основная навигация справа">
        <ul class="header__nav-list">
          <li v-for="item in navRight" :key="item.label">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <button class="header__close" type="button" aria-label="Открыть меню">×</button>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  border-bottom: $border
  background: $bg

  &__inner
    min-height: 11.8rem
    display: grid
    grid-template-columns: 5.2rem 1fr auto 1fr 5.2rem
    align-items: center
    gap: $space-lg

  &__mark
    width: 3.4rem
    height: 3.4rem
    border: $border
    border-radius: $radius-round
    display: flex
    align-items: center
    justify-content: center
    text-decoration: none
    color: $text
    font-size: $fs-lg
    font-weight: 700
    font-family: $font-heading

  &__nav
    min-width: 0

    &--left
      .header__nav-list
        justify-content: flex-start

    &--right
      .header__nav-list
        justify-content: flex-end

  &__nav-list
    display: flex
    align-items: center
    gap: clamp(2.2rem, 2.4vw, 5.4rem)

    a
      text-decoration: none
      font-size: $fs-xs
      font-weight: 400
      letter-spacing: .01em
      line-height: 1
      font-family: $font-body
      color: $text

  &__logo
    display: flex
    align-items: flex-start
    gap: $space-xs
    text-decoration: none
    justify-self: center
    color: $text

    span
      font-size: clamp(9.2rem, 9vw, 15.2rem)
      font-weight: 900
      line-height: .72
      letter-spacing: -.075em
      font-family: $font-heading

    small
      writing-mode: vertical-rl
      transform: rotate(180deg)
      font-size: $fs-xl
      line-height: 1
      font-weight: 700
      margin-top: .6rem
      font-family: $font-heading

  &__close
    color: $text
    font-size: 3.8rem
    line-height: 1
    padding: 0
    justify-self: end
    background: transparent
    border: 0
    cursor: pointer
</style>
