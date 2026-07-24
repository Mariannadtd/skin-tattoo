<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  navLeft: {
    type: Array,
    default: () => []
  },
  navRight: {
    type: Array,
    default: () => []
  }
})

const route = useRoute()
const isMenuOpen = ref(false)
const mobileNavItems = computed(() => [...props.navLeft, ...props.navRight])

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  }
)
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

      <button
        class="header__menu-toggle"
        type="button"
        aria-controls="mobile-menu"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? 'Свернуть меню' : 'Открыть меню'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="mobile-menu"
        class="header__mobile"
        :class="{ 'header__mobile--open': isMenuOpen }"
        aria-label="Мобильная навигация"
      >
        <ul class="header__mobile-list">
          <li v-for="item in mobileNavItems" :key="item.label">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
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
    grid-template-columns: 5.2rem 1fr auto 1fr
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
      white-space: nowrap

  &__menu-toggle,
  &__mobile
    display: none

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

@media (min-width: 769px)
  .header
    &__inner
      min-height: 11.8rem
      grid-template-columns: 5.2rem 1fr auto 1fr
      gap: $space-lg

    &__nav
      display: block

    &__logo
      justify-self: center

      span
        font-size: clamp(9.2rem, 9vw, 15.2rem)

      small
        font-size: $fs-xl

    &__menu-toggle,
    &__mobile
      display: none

@media (max-width: 768px)
  .header
    position: relative
    z-index: 20

    &__inner
      position: relative

    &__logo
      justify-self: center

      span
        font-size: clamp(5.4rem, 17vw, 6.4rem)

      small
        font-size: $fs-md

    &__menu-toggle
      width: 3.6rem
      height: 3.6rem
      border: $border
      border-radius: $radius-round
      background: $bg
      color: $text
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      gap: .4rem
      justify-self: end
      padding: 0

      span
        width: 1.6rem
        height: .1rem
        background: currentColor
        display: block

    &__mobile
      position: absolute
      top: calc(100% + .1rem)
      left: -1.2rem
      right: -1.2rem
      z-index: 10
      background: rgba(239, 239, 239, .98)
      border-top: $border
      border-bottom: $border
      padding: 2rem 2.4rem 2.4rem

      &--open
        display: block

    &__mobile-list
      display: grid
      grid-template-columns: 1fr
      gap: 1.4rem
      list-style: none
      margin: 0
      padding: 0

      a
        color: $text
        display: block
        font-family: $font-heading
        font-size: $fs-xl
        line-height: 1
        text-decoration: none
        text-transform: uppercase

@media (max-width: 576px)
  .header
    &__mobile
      padding-inline: 1.6rem

    &__mobile-list
      a
        font-size: $fs-lg
</style>
