<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  visibleCount: {
    type: Number,
    default: 3
  },
  startIndex: {
    type: Number,
    default: 0
  },
  loop: {
    type: Boolean,
    default: true
  },
  showArrows: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: Boolean,
    default: true
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  autoPlayDelay: {
    type: Number,
    default: 5000
  },
  ariaLabel: {
    type: String,
    default: 'Слайдер'
  }
})

const emit = defineEmits(['update:activeIndex', 'change'])

const activeIndex = ref(props.startIndex)
let autoPlayTimer = null

const itemCount = computed(() => props.items.length)
const hasMultipleItems = computed(() => itemCount.value > 1)

const normalizeIndex = (index) => {
  if (!itemCount.value) return 0

  if (props.loop) {
    return ((index % itemCount.value) + itemCount.value) % itemCount.value
  }

  return Math.min(Math.max(index, 0), itemCount.value - 1)
}

const setActiveIndex = (index) => {
  const nextIndex = normalizeIndex(index)

  if (nextIndex === activeIndex.value) return

  activeIndex.value = nextIndex
  emit('update:activeIndex', nextIndex)
  emit('change', nextIndex)
}

const prev = () => {
  if (!hasMultipleItems.value) return

  setActiveIndex(activeIndex.value - 1)
}

const next = () => {
  if (!hasMultipleItems.value) return

  setActiveIndex(activeIndex.value + 1)
}

const stopAutoPlay = () => {
  clearInterval(autoPlayTimer)
  autoPlayTimer = null
}

const startAutoPlay = () => {
  stopAutoPlay()

  if (!props.autoPlay || !hasMultipleItems.value) return

  autoPlayTimer = setInterval(() => {
    next()
  }, props.autoPlayDelay)
}

const normalizedVisibleCount = computed(() => {
  if (!itemCount.value) return 0

  const count = Math.max(1, Math.floor(props.visibleCount))
  const oddCount = count % 2 === 0 ? count + 1 : count

  return Math.min(oddCount, itemCount.value)
})

const visibleSlides = computed(() => {
  const count = normalizedVisibleCount.value

  if (!count) return []

  if (!props.loop) {
    const maxStart = Math.max(0, itemCount.value - count)
    const start = Math.min(Math.max(activeIndex.value - Math.floor(count / 2), 0), maxStart)

    return Array.from({ length: count }, (_, position) => {
      const index = start + position

      return {
        item: props.items[index],
        index,
        position,
        active: index === activeIndex.value
      }
    })
  }

  const startOffset = -Math.floor(count / 2)

  return Array.from({ length: count }, (_, position) => {
    const offset = startOffset + position
    const index = normalizeIndex(activeIndex.value + offset)

    return {
      item: props.items[index],
      index,
      position,
      active: offset === 0
    }
  })
})

const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prev()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

watch(
  () => props.startIndex,
  (index) => {
    setActiveIndex(index)
  }
)

watch(
  () => props.items.length,
  () => {
    activeIndex.value = normalizeIndex(activeIndex.value)
    startAutoPlay()
  },
  { immediate: true }
)

watch(
  () => [props.autoPlay, props.autoPlayDelay],
  () => {
    startAutoPlay()
  }
)

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<template>
  <section
    class="base-slider"
    :aria-label="ariaLabel"
    tabindex="0"
    @focusin="stopAutoPlay"
    @focusout="startAutoPlay"
    @keydown="handleKeydown"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <button
      v-if="showArrows && hasMultipleItems"
      type="button"
      class="base-slider__arrow base-slider__arrow--prev"
      aria-label="Предыдущий слайд"
      @click="prev"
    >
      ‹
    </button>

    <ul class="base-slider__track" :style="{ '--slides-count': visibleSlides.length }">
      <li
        v-for="slide in visibleSlides"
        :key="`${slide.index}-${slide.position}`"
        class="base-slider__slide"
        :class="{ 'base-slider__slide--active': slide.active }"
      >
        <slot
          :item="slide.item"
          :index="slide.index"
          :position="slide.position"
          :active="slide.active"
        />
      </li>
    </ul>

    <button
      v-if="showArrows && hasMultipleItems"
      type="button"
      class="base-slider__arrow base-slider__arrow--next"
      aria-label="Следующий слайд"
      @click="next"
    >
      ›
    </button>

    <div v-if="showDots && hasMultipleItems" class="base-slider__dots" aria-label="Навигация по слайдам">
      <button
        v-for="(_, index) in items"
        :key="index"
        type="button"
        class="base-slider__dot"
        :class="{ 'base-slider__dot--active': index === activeIndex }"
        :aria-label="`Показать слайд ${index + 1}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="setActiveIndex(index)"
      ></button>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.base-slider
  position: relative
  width: 100%
  outline: none

  &:focus-visible
    outline: 0.2rem solid $text
    outline-offset: 1rem

  &__track
    display: grid
    grid-template-columns: repeat(var(--slides-count), minmax(0, 1fr))
    align-items: center
    width: var(--slider-width, 100%)
    max-width: var(--slider-max-width, none)
    gap: var(--slider-gap, 0)
    margin: 0 auto

  &__slide
    min-width: 0
    display: flex
    justify-content: center
    transition: opacity .25s ease, transform .25s ease
    z-index: 1

    &--active
      z-index: 2

  &__arrow
    position: absolute
    top: 50%
    z-index: 3
    width: 4.8rem
    height: 4.8rem
    border: $border
    border-radius: $radius-full
    background: $bg
    color: $text
    font-size: 3.6rem
    line-height: 1
    display: flex
    align-items: center
    justify-content: center
    transform: translateY(-50%)

    &--prev
      left: 0

    &--next
      right: 0

  &__dots
    display: flex
    justify-content: center
    gap: 1rem
    margin-top: 2.4rem

  &__dot
    width: .8rem
    height: .8rem
    border-radius: $radius-full
    background: rgba(29, 57, 216, .35)
    padding: 0

    &--active
      background: $text

@media (max-width: $medium)
  .base-slider
    &__track
      grid-template-columns: 1fr

    &__slide:not(.base-slider__slide--active)
      display: none

    &__arrow
      top: calc(100% + 2.8rem)

      &--prev
        left: calc(50% - 6rem)

      &--next
        right: calc(50% - 6rem)
</style>
