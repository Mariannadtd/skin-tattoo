<script setup>
import { ref, computed } from 'vue'
import aboutLeft from '../assets/img/about-left.jpg'

const props = defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeIndex = ref(0)

const activeParagraph = computed(() => {
  return props.features[activeIndex.value]?.paragraph || ''
})

const openDescr = (index) => {
  activeIndex.value = index
}
</script>

<template>
  <section class="features" id="about" aria-labelledby="features-title">
    <div class="container">
      <h2 class="section-subtitle">Принципы в работе</h2>

      <div class="features__grid">
        <figure class="features__visual">
          <img :src="aboutLeft" alt="Пространство и атмосфера студии" />

          <figcaption class="features__caption">
            <h2 id="features-title">ПОЧЕМУ НУЖНО ВЫБРАТЬ НАС</h2>

            <div class="features__caption-text">
              <p>{{ activeParagraph }}</p>
            </div>
          </figcaption>
        </figure>

        <ol class="features__list">
          <li
            v-for="(item, index) in features"
            :key="`${item.number}-${index}`"
            class="features__item"
            :class="{ 'features__item--active': activeIndex === index }"
            @click="openDescr(index)"
            @mouseenter="openDescr(index)"
          >
            <span v-html="item.title.replace('\n', '<br>')"></span>
            <b>{{ item.number }}</b>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.features
  padding-top: 3rem

  &__grid
    display: grid
    grid-template-columns: 40.5% 59.5%
    border: $border

  &__visual
    margin: 0
    border-right: $border
    background: rgba(255,255,255,.16)
    display: grid
    grid-template-rows: auto 19rem

    img
      display: block
      width: 100%
      aspect-ratio: 780 / 720
      object-fit: cover

  &__caption
    margin: 0
    padding: 1.2rem 1.6rem 1.6rem
    overflow: hidden

    h2
      margin: 0 0 .8rem
      font-size: clamp(2rem, 2vw, 3.2rem)
      line-height: 1.05

  &__caption-text
    height: 10.8rem
    overflow: hidden

    p
      margin: 0
      max-width: 50rem
      font-size: 1.8rem
      line-height: 1.2
      font-family: $font-body

  &__list
    display: grid
    grid-template-columns: 1fr
    margin: 0
    padding: 0
    list-style: none

  &__item
    border-bottom: $border
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem
    padding: 1.4rem 1.8rem
    cursor: pointer
    transition: background-color .25s ease

    &:last-child
      border-bottom: 0

    &:hover
      background: rgba(255,255,255,.08)

    span
      font-size: clamp(1.8rem, 2vw, 3.4rem)
      line-height: 1
      font-weight: 500
      font-family: $font-heading

    b
      font-size: clamp(2rem, 2vw, 3.6rem)
      line-height: 1
      font-weight: 500
      font-family: $font-heading

    &--active
      background: rgba(255,255,255,.12)

@media (max-width: 768px)
  .features
    &__grid
      grid-template-columns: 1fr

    &__visual
      border-right: 0
      border-bottom: $border
      grid-template-rows: auto 17rem

    &__caption-text
      height: 9.6rem

      p
        font-size: 1.6rem
</style>
