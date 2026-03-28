<script setup>
import { ref } from 'vue'
import scribble from '../assets/img/scribble.png'

const props = defineProps({
  masters: {
    type: Array,
    required: true
  }
})

const activeMasterRole = ref(null)

const toggleMastersList = (role) => {
  activeMasterRole.value = activeMasterRole.value === role ? null : role
}

const closeMastersList = () => {
  activeMasterRole.value = null
}
</script>

<template>
  <section class="masters" id="masters" aria-labelledby="masters-title" @click="closeMastersList">
    <div class="container">
      <h2 class="section-title section-title--huge" id="masters-title">НАШИ<br />МАСТЕРА</h2>

      <ul class="masters__grid">
        <li class="masters__card" v-for="master in masters" :key="master.role">
          <article class="masters__entry" @click.stop>
            <div class="masters__image-link">
              <img class="masters__image" :src="master.image" :alt="master.alt" />

              <button
                type="button"
                class="masters__arrow"
                :class="{ 'masters__arrow--active': activeMasterRole === master.role }"
                :aria-label="`Показать список: ${master.role}`"
                @click.stop="toggleMastersList(master.role)"
              >
                ↘
              </button>

              <div v-if="activeMasterRole === master.role" class="masters__list">
                <article class="masters__person" v-for="person in master.list" :key="person.name">
                  <div class="masters__avatar">
                    <img :src="person.image" class="masters__list-image" :alt="person.alt" />
                  </div>
                  <div class="masters__person-content">
                    <h3 class="masters__name">{{ person.name }}</h3>
                    <p class="masters__bio">{{ person.descr }}</p>
                  </div>
                </article>
              </div>
            </div>

            <p class="masters__role">{{ master.role }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>

  <section class="skills" aria-labelledby="skills-title">
    <div class="container skills__inner">
      <figure class="skills__art">
        <img :src="scribble" alt="Эскиз татуировки" />
      </figure>

      <div class="skills__content">
        <h2 id="skills-title">
          МЫ УМЕЕМ НЕ ТОЛЬКО ДЕЛАТЬ,<br />
          НО И ДОДЕЛЫВАТЬ
        </h2>
        <p>
          Если у вас появились идеи, как дополнить ваш эскиз, мы с радостью поможем вам узнать обо
          всех нюансах.
        </p>
        <small>
          Мы работаем также с большими татуировками, которые вы можете набивать за несколько
          сеансов.
        </small>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.masters
  padding: 0 0 6.2rem

  .container
    position: relative

  &__grid
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: $space-sm

  &__entry
    display: flex
    flex-direction: column

  &__card
    &:nth-child(2) .masters__role
      text-align: center

    &:nth-child(3) .masters__role
      text-align: right

  &__image-link
    position: relative
    display: block
    border: $border
    overflow: hidden
    background: #fff

  &__image
    aspect-ratio: 560 / 560
    object-fit: cover

  &__arrow
    position: absolute
    top: 2rem
    right: 2rem
    width: 5rem
    height: 5rem
    border: 0.1rem solid $accent
    border-radius: $radius-full
    display: flex
    align-items: center
    justify-content: center
    background: $bg
    color: $accent
    font-size: $fs-xl
    line-height: 1
    z-index: 3
    font-family: $font-heading
    transition: transform .25s ease, background-color .25s ease, color .25s ease

    &--active
      transform: scaleX(-1)

  &__list
    position: absolute
    inset: 0
    z-index: 2
    background: rgba(255,255,255,.96)
    padding: 7rem 2rem 2rem
    display: flex
    flex-direction: column
    gap: 1.6rem
    overflow-y: auto

  &__person
    display: grid
    grid-template-columns: 9rem 1fr
    gap: 1.2rem
    align-items: start
    padding-bottom: 1.2rem
    border-bottom: 0.1rem solid rgba(0,0,0,.08)

    &:last-child
      border-bottom: 0
      padding-bottom: 0

  &__avatar
    width: 9rem
    height: 9rem
    border-radius: 50%
    border: 0.1rem solid $accent
    overflow: hidden
    flex-shrink: 0

  &__list-image
    display: block
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center top

  &__person-content
    display: flex
    flex-direction: column
    gap: .6rem

  &__name
    margin: 0
    font-size: 2rem
    line-height: 1
    font-family: $font-heading

  &__bio
    margin: 0
    font-size: 1.4rem
    line-height: 1.25
    font-family: $font-body

  &__role
    margin: 1rem 0 0
    font-size: 1.5rem
    line-height: 1
    text-transform: uppercase
    font-family: $font-body

.skills
  padding: 4.2rem 0 5.6rem
  background: #fff

  &__inner
    display: grid
    grid-template-columns: 36% 64%
    align-items: start
    gap: $space-xl

  &__art
    img
      max-width: 56rem

  &__content
    padding-top: 2.6rem

    h2
      margin: 0 0 2.8rem
      font-size: clamp(4.4rem, 4.2vw, 7.8rem)
      line-height: .9
      font-weight: 500
      text-align: right
      letter-spacing: -.04em

    p
      margin: 0 0 5.6rem auto
      max-width: 42rem
      font-size: $fs-lg
      line-height: 1.12
      text-align: right
      font-family: $font-body

    small
      display: block
      max-width: 33rem
      font-size: $fs-lg
      line-height: 1.12
      margin-left: 2.2rem
      font-family: $font-body
</style>
