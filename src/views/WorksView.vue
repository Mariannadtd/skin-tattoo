<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import tattoo1 from '../assets/img/tattoo-first.jpg'
import tattoo2 from '../assets/img/tattoo-second.jpg'
import tattoo3 from '../assets/img/tattoo-third.jpg'
import tattoo4 from '../assets/img/tattoo4.jpg'
import tattoo5 from '../assets/img/tattoo5.jpg'
import tattoo6 from '../assets/img/tattoo6.jpg'
import tattoo7 from '../assets/img/tattoo7.jpg'
import tattoo8 from '../assets/img/tattoo8.jpg'
import tattoo9 from '../assets/img/tattoo9.jpg'
import tattoo10 from '../assets/img/tattoo10.jpg'
import tattoo11 from '../assets/img/tattoo11.jpg'
import tattoo12 from '../assets/img/tattoo12.jpg'

const props = defineProps({
  works: {
    type: Array,
    required: true
  }
})

const imagePool = [
  tattoo1,
  tattoo2,
  tattoo3,
  tattoo4,
  tattoo5,
  tattoo6,
  tattoo7,
  tattoo8,
  tattoo9,
  tattoo10,
  tattoo11,
  tattoo12
]

const localWorks = ref([])

const visibleWorks = computed(() => localWorks.value.slice(0, 6))

const cloneWorks = () => {
  localWorks.value = props.works.map((item) => ({ ...item }))
}

const preloadImages = () => {
  imagePool.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

const getAvailableImages = (excludeIndex) => {
  const usedImages = visibleWorks.value
    .filter((_, index) => index !== excludeIndex)
    .map((item) => item.image)

  return imagePool.filter((img) => !usedImages.includes(img))
}

let intervalId = null

onMounted(() => {
  cloneWorks()
  preloadImages()

  intervalId = setInterval(() => {
    if (!visibleWorks.value.length) return

    const randomIndex = Math.floor(Math.random() * visibleWorks.value.length)
    const availableImages = getAvailableImages(randomIndex)

    if (!availableImages.length) return

    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)]

    localWorks.value[randomIndex] = {
      ...localWorks.value[randomIndex],
      image: randomImage
    }
  }, 1000)
})

watch(
  () => props.works,
  () => {
    cloneWorks()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <section class="works" id="works" aria-labelledby="works-title">
    <div class="container">
      <h2 class="section-subtitle" id="works-title">НАШИ РАБОТЫ</h2>

      <ul class="works__grid">
        <li
          v-for="item in visibleWorks"
          :key="`${item.mod}-${item.title}`"
          class="works__item"
          :class="`works__item--${item.mod}`"
        >
          <figure class="works__figure">
            <img class="works__image" :src="item.image" :alt="item.alt" />
            <figcaption class="works__label" v-html="item.title"></figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.works
  padding: $space-sm 0 9rem

  .section-subtitle
    margin-bottom: 1.8rem

  &__grid
    width: min(100%, 150rem)
    margin-left: auto
    display: grid
    grid-template-columns: 1.15fr 1fr 1fr 1fr
    grid-template-areas: "a b c d" "a e e f"
    gap: 1rem
    padding-bottom: 2rem

  &__item
    border: $border
    overflow: hidden
    background: #eceef7

    &--a
      grid-area: a
      height: 90rem

    &--b
      grid-area: b
      height: 44rem

    &--c
      grid-area: c
      height: 44rem

    &--d
      grid-area: d
      height: 44rem

    &--e
      grid-area: e
      height: 45rem

    &--f
      grid-area: f
      height: 45rem

  &__figure
    position: relative
    width: 100%
    height: 100%
    margin: 0

  &__image
    display: block
    width: 100%
    height: 100%
    object-fit: cover

  &__label
    position: absolute
    top: 1rem
    left: 1.2rem
    z-index: 2
    font-size: 1.5rem
    line-height: 1
    text-transform: uppercase
    font-family: $font-body

  &__item--b .works__label
    top: auto
    bottom: 1.2rem
    left: 1.2rem

  &__item--e .works__label
    top: 1rem
    left: 50%
    transform: translateX(-50%)

  &__item--f .works__label
    top: auto
    bottom: 1.2rem
    left: 1.2rem

@media (max-width: $x-large)
  .works
    padding-bottom: 7rem

    &__grid
      width: 100%
      grid-template-columns: repeat(2, 1fr)
      grid-template-areas: "a b" "c d" "e e" "f f"
      padding-bottom: 1.6rem

    &__item
      height: 44rem !important

@media (max-width: $medium)
  .works
    padding-bottom: 5rem

    &__grid
      grid-template-columns: 1fr
      grid-template-areas: none
      padding-bottom: 1.2rem

    &__item
      height: 34rem !important
</style>
