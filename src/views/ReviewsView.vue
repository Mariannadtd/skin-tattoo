<script setup>
import ReviewCard from '@/components/cards/ReviewCard.vue'
import BaseSlider from '@/components/slider/BaseSlider.vue'
import reviews from '@/data/reviews'
</script>

<template>
  <main>
    <section class="reviews-page" id="reviews" aria-labelledby="reviews-title">
      <div class="container">
        <h1 class="section-subtitle section-subtitle--center" id="reviews-title">ОТЗЫВЫ</h1>

        <BaseSlider
          :items="reviews"
          :visible-count="3"
          auto-play
          :auto-play-delay="5000"
          :show-arrows="false"
          aria-label="Отзывы клиентов"
        >
          <template #default="{ item, active }">
            <ReviewCard :review="item" :active="active" />
          </template>
        </BaseSlider>
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
.reviews-page
  min-height: calc(100vh - 11.8rem)
  padding: 7rem 0 8rem
  border-bottom: $border
  display: flex
  align-items: center

  :deep(.base-slider__track)
    max-width: 132rem

@media (max-width: 992px)
  .reviews-page
    :deep(.base-slider__track)
      grid-template-columns: 1fr
      max-width: 52rem

    :deep(.base-slider__slide:not(.base-slider__slide--active))
      display: none

@media (max-width: 768px)
  .reviews-page
    min-height: auto
    padding: 5rem 0 6rem
</style>
