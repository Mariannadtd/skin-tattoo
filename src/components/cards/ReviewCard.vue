<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <article class="review-card" :class="{ 'review-card--active': active }">
    <div class="review-card__avatar">
      <img :src="review.avatar" :alt="review.alt || review.name" />
    </div>

    <strong>{{ review.name }}</strong>
    <p>{{ review.text }}</p>
  </article>
</template>

<style lang="sass" scoped>
.review-card
  width: 100%
  min-height: 31.2rem
  padding: 4.4rem 3.8rem 3.4rem
  border: $border
  background: var(--review)
  color: $text
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
  transform: scale(.96)
  transition: background-color .25s ease, color .25s ease, transform .25s ease

  &--active
    background: $text
    color: $white
    transform: scale(1.04)

  &__avatar
    width: 4.8rem
    height: 4.8rem
    border-radius: $radius-full
    overflow: hidden
    border: 0.1rem solid rgba(246, 246, 246, .6)
    margin-bottom: 1.4rem
    flex-shrink: 0

    img
      width: 100%
      height: 100%
      object-fit: cover

  strong
    display: block
    margin-bottom: $space-md
    font-size: $fs-md
    font-family: $font-heading
    font-weight: 500

  p
    margin: 0
    font-size: $fs-sm
    line-height: 1.2
    font-family: $font-body

@media (max-width: $medium)
  .review-card
    transform: none

    &--active
      transform: none
</style>
