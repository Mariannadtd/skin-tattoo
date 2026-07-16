<script setup>
import { computed, ref } from 'vue'
import dragon from '../assets/img/dragon.png'

const props = defineProps({
  masters: {
    type: Array,
    required: true
  }
})

const selectedRole = ref(props.masters[0]?.role || '')
const selectedPerson = ref(props.masters[0]?.list[0]?.name || '')
const selectedType = ref('')
const selectedDuration = ref('')
const selectedTime = ref('')

const openSection = ref('master')
const isDurationOpen = ref(false)

const selectedGroup = computed(() => {
  return props.masters.find((group) => group.role === selectedRole.value)
})

const tattooTypes = [
  {
    label: 'Мини тату',
    value: 'mini',
    basePriceText: 'от 4000р',
    durations: []
  },
  {
    label: 'Эксклюзивные',
    value: 'exclusive',
    durations: [
      { label: '2ч', value: '2h', price: 5000 },
      { label: '3ч', value: '3h', price: 6500 },
      { label: '4ч', value: '4h', price: 8000 },
      { label: '5ч', value: '5h', price: 9500 },
      { label: '6ч', value: '6h', price: 11000 },
      { label: '7ч', value: '7h', price: 12500 }
    ]
  },
  {
    label: 'Тату хэнд',
    value: 'hand',
    durations: [
      { label: '2ч', value: '2h', price: 3500 },
      { label: '3ч', value: '3h', price: 4500 },
      { label: '4ч', value: '4h', price: 5500 },
      { label: '5ч', value: '5h', price: 6500 },
      { label: '6ч', value: '6h', price: 7500 },
      { label: '7ч', value: '7h', price: 8500 }
    ]
  },
  {
    label: 'Тату машинкой',
    value: 'machine',
    durations: [
      { label: '2ч', value: '2h', price: 4000 },
      { label: '3ч', value: '3h', price: 5000 },
      { label: '4ч', value: '4h', price: 6000 },
      { label: '5ч', value: '5h', price: 7000 },
      { label: '6ч', value: '6h', price: 8000 },
      { label: '7ч', value: '7h', price: 9000 }
    ]
  },
  {
    label: 'Хендпоук',
    value: 'handpoke',
    durations: [
      { label: '2ч', value: '2h', price: 3000 },
      { label: '3ч', value: '3h', price: 4000 },
      { label: '4ч', value: '4h', price: 5000 },
      { label: '5ч', value: '5h', price: 6000 },
      { label: '6ч', value: '6h', price: 7000 },
      { label: '7ч', value: '7h', price: 8000 }
    ]
  },
  {
    label: 'Шрамирование',
    value: 'scar',
    durations: [
      { label: '2ч', value: '2h', price: 6000 },
      { label: '3ч', value: '3h', price: 7500 },
      { label: '4ч', value: '4h', price: 9000 },
      { label: '5ч', value: '5h', price: 10500 },
      { label: '6ч', value: '6h', price: 12000 },
      { label: '7ч', value: '7h', price: 13500 }
    ]
  }
]

const selectedTypeData = computed(() => {
  return tattooTypes.find((item) => item.value === selectedType.value)
})

const selectedDurationData = computed(() => {
  if (!selectedTypeData.value) return null
  return selectedTypeData.value.durations.find((item) => item.value === selectedDuration.value)
})

const formattedPrice = computed(() => {
  if (!selectedTypeData.value) return '0р'

  if (selectedTypeData.value.value === 'mini') {
    return selectedTypeData.value.basePriceText
  }

  if (!selectedDurationData.value) return '0р'

  return `${selectedDurationData.value.price.toLocaleString('ru-RU')}р`
})

const monthNames = [
  'ЯНВАРЬ',
  'ФЕВРАЛЬ',
  'МАРТ',
  'АПРЕЛЬ',
  'МАЙ',
  'ИЮНЬ',
  'ИЮЛЬ',
  'АВГУСТ',
  'СЕНТЯБРЬ',
  'ОКТЯБРЬ',
  'НОЯБРЬ',
  'ДЕКАБРЬ'
]

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const timeOptions = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
]

const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const currentMonthLabel = computed(() => {
  const month = currentDate.value.getMonth()
  const year = currentDate.value.getFullYear()
  return `${monthNames[month]} ${year}`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  let firstWeekDay = firstDayOfMonth.getDay()
  firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay

  const days = []

  for (let i = 1; i < firstWeekDay; i++) {
    days.push({
      day: '',
      fullDate: null
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = new Date(year, month, day)

    days.push({
      day,
      fullDate
    })
  }

  while (days.length % 7 !== 0) {
    days.push({
      day: '',
      fullDate: null
    })
  }

  return days
})

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value && !selectedTime.value) return 'ДАТА И ВРЕМЯ'

  let dateText = ''

  if (selectedDate.value) {
    const day = String(selectedDate.value.getDate()).padStart(2, '0')
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0')
    const year = selectedDate.value.getFullYear()
    dateText = `${day}.${month}.${year}`
  }

  if (selectedTime.value) {
    return dateText ? `${dateText}, ${selectedTime.value}` : selectedTime.value
  }

  return dateText || 'ДАТА И ВРЕМЯ'
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date) => {
  if (!date) return
  selectedDate.value = date
}

const isSelectedDate = (date) => {
  if (!date || !selectedDate.value) return false

  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  )
}

const toggleSection = (section) => {
  openSection.value = openSection.value === section ? '' : section
}

const selectTattooType = (typeValue) => {
  selectedType.value = typeValue
  selectedDuration.value = ''

  const currentType = tattooTypes.find((item) => item.value === typeValue)

  if (!currentType || currentType.value === 'mini') {
    isDurationOpen.value = false
    return
  }

  isDurationOpen.value = true
}
</script>

<template>
  <section class="booking" id="booking" aria-labelledby="booking-title">
    <div class="container">
      <h2 class="section-title section-title--form" id="booking-title">ФОРМА ЗАПИСИ</h2>

      <div class="booking__grid">
        <figure class="booking__dragon">
          <img :src="dragon" alt="Декоративный дракон" />
        </figure>

        <form class="booking__form">
          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{ 'field-select--open': openSection === 'master' }"
              @click="toggleSection('master')"
            >
              <span>МАСТЕР</span>
            </button>

            <div v-show="openSection === 'master'" class="booking__dropdown">
              <div
                v-for="master in masters"
                :key="master.role"
                class="booking__radio-group booking__radio-group--masters"
              >
                <label>
                  <input
                    v-model="selectedRole"
                    type="radio"
                    name="level"
                    :value="master.role"
                    @change="selectedPerson = master.list[0]?.name || ''"
                  />
                  <span>{{ master.role }}</span>
                </label>
              </div>

              <div
                v-if="selectedGroup"
                class="booking__avatars"
                :aria-label="`Список мастеров: ${selectedGroup.role}`"
              >
                <label
                  v-for="person in selectedGroup.list"
                  :key="selectedGroup.role + '-' + person.name"
                  class="booking__avatar-card"
                >
                  <input v-model="selectedPerson" type="radio" name="master" :value="person.name" />
                  <img :src="person.image" :alt="person.alt" />
                  <span>{{ person.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{ 'field-select--open': openSection === 'date' }"
              @click="toggleSection('date')"
            >
              <span>{{ formattedSelectedDate }}</span>
            </button>

            <div v-show="openSection === 'date'" class="booking__dropdown">
              <div class="booking__datetime">
                <div class="calendar-box" aria-label="Календарь">
                  <div class="calendar-box__head">
                    <button type="button" class="calendar-box__nav" @click="prevMonth">‹</button>
                    <span>{{ currentMonthLabel }}</span>
                    <button type="button" class="calendar-box__nav" @click="nextMonth">›</button>
                  </div>

                  <div class="calendar-box__weekdays">
                    <span v-for="dayName in weekDays" :key="dayName">{{ dayName }}</span>
                  </div>

                  <div class="calendar-box__grid">
                    <button
                      v-for="(item, index) in calendarDays"
                      :key="index"
                      type="button"
                      class="calendar-box__day"
                      :class="{
                        'calendar-box__day--empty': !item.day,
                        'calendar-box__day--selected': isSelectedDate(item.fullDate)
                      }"
                      :disabled="!item.day"
                      @click="selectDate(item.fullDate)"
                    >
                      {{ item.day }}
                    </button>
                  </div>
                </div>

                <div class="time-box">
                  <div class="time-box__title">ВРЕМЯ</div>

                  <div class="time-box__list">
                    <label v-for="time in timeOptions" :key="time" class="time-box__item">
                      <input v-model="selectedTime" type="radio" name="time" :value="time" />
                      <span>{{ time }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{ 'field-select--open': openSection === 'type' }"
              @click="toggleSection('type')"
            >
              <span>ВИД ТАТУ</span>
            </button>

            <div v-show="openSection === 'type'" class="booking__dropdown">
              <div class="booking__radio-group booking__radio-group--types">
                <label v-for="type in tattooTypes" :key="type.value">
                  <input
                    v-model="selectedType"
                    type="radio"
                    name="type"
                    :value="type.value"
                    @change="selectTattooType(type.value)"
                  />
                  <span>{{ type.label }}</span>
                </label>
              </div>

              <div
                v-if="selectedTypeData && selectedTypeData.value !== 'mini'"
                class="booking__duration"
              >
                <button
                  type="button"
                  class="field-select"
                  :class="{ 'field-select--open': isDurationOpen }"
                  @click="isDurationOpen = !isDurationOpen"
                >
                  <span>{{ selectedDurationData ? selectedDurationData.label : 'ВРЕМЯ' }}</span>
                </button>

                <div v-show="isDurationOpen" class="booking__dropdown">
                  <div class="booking__radio-group booking__radio-group--durations">
                    <label
                      v-for="duration in selectedTypeData.durations"
                      :key="selectedTypeData.value + '-' + duration.value"
                    >
                      <input
                        v-model="selectedDuration"
                        type="radio"
                        name="duration"
                        :value="duration.value"
                        @change="isDurationOpen = false"
                      />
                      <span
                        >{{ duration.label }} — {{ duration.price.toLocaleString('ru-RU') }}р</span
                      >
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field-select field-select--static booking__price-title">СТОИМОСТЬ</div>

          <div class="booking__bottom">
            <strong>{{ formattedPrice }}</strong>
            <button type="submit" class="btn-outline">ЗАПИСАТЬСЯ</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.booking
  padding-bottom: 8.6rem
  background: #fff

  &__grid
    display: grid
    grid-template-columns: 30% 45%
    justify-content: center
    align-items: start
    gap: 8.6rem

  &__dragon
    img
      max-width: 38rem
      margin: 0 auto

  &__form
    border: $border
    padding: 2.8rem 2.8rem 3.4rem
    background: var(--card)

  &__section
    margin-bottom: 1.8rem

  &__dropdown
    padding-top: 1.4rem

  &__radio-group
    display: flex
    flex-wrap: wrap
    gap: 1.8rem 3.6rem
    margin: 0 0 1.8rem

    label
      display: inline-flex
      align-items: center
      gap: 1rem
      font-size: $fs-xs
      font-family: $font-body
      cursor: pointer

    input
      appearance: none
      width: 1.2rem
      height: 1.2rem
      border: $border
      border-radius: $radius-full
      position: relative
      flex-shrink: 0

      &:checked::after
        content: ''
        position: absolute
        inset: 0.2rem
        border-radius: $radius-full
        background: $text

  &__avatars
    display: grid
    grid-template-columns: repeat(4, 1fr)
    gap: $space-lg
    margin-bottom: 1rem

  &__avatar-card
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    cursor: pointer
    font-family: $font-body
    font-size: $fs-2xs
    position: relative

    input
      position: absolute
      opacity: 0
      pointer-events: none

    img
      width: 8rem
      height: 8rem
      object-fit: cover
      border-radius: $radius-full
      border: $border
      display: block
      margin-bottom: 1rem
      transition: transform .2s ease, outline .2s ease

    span
      display: block

    &:hover img
      transform: scale(1.03)

    input:checked + img
      outline: 0.2rem solid $text
      outline-offset: 0.3rem

  &__datetime
    display: grid
    grid-template-columns: 30rem 1fr
    gap: 1.6rem
    align-items: start

  &__duration
    margin-top: 1.2rem

  &__price-title
    margin-top: 2.4rem

  &__bottom
    display: flex
    align-items: center
    justify-content: space-between
    gap: $space-xl
    margin-top: 0.8rem

    strong
      font-size: clamp(3.6rem, 3vw, 5.6rem)
      line-height: 1
      font-weight: 800
      font-family: $font-heading

.field-select
  min-height: 5.8rem
  border: $border
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 1.8rem
  font-size: $fs-md
  line-height: 1
  position: relative
  width: 100%
  font-family: $font-heading
  background: transparent
  cursor: pointer
  text-align: left

  &::after
    content: '⌄'
    font-size: $fs-lg
    transition: transform .2s ease

  &--open::after
    transform: rotate(180deg)

  &--static
    cursor: default

    &::after
      display: none

.calendar-box
  width: 30rem
  border: $border
  padding: 1.4rem
  margin: 0

  &__head
    display: grid
    grid-template-columns: 3rem 1fr 3rem
    align-items: center
    gap: 1rem
    font-size: $fs-xs
    margin-bottom: 1.4rem
    font-family: $font-body
    text-align: center

  &__nav
    border: $border
    background: transparent
    height: 3rem
    cursor: pointer
    font-size: 1.6rem
    line-height: 1

  &__weekdays
    display: grid
    grid-template-columns: repeat(7, 1fr)
    gap: 0.9rem
    margin-bottom: 0.9rem

    span
      text-align: center
      font-size: 1rem
      font-family: $font-body

  &__grid
    display: grid
    grid-template-columns: repeat(7, 1fr)
    gap: 0.9rem

  &__day
    width: 100%
    aspect-ratio: 1
    display: flex
    align-items: center
    justify-content: center
    font-size: 1.1rem
    border-radius: $radius-full
    font-family: $font-body
    border: $border
    background: transparent
    cursor: pointer

    &--empty
      border: none
      cursor: default

    &--selected
      background: $text
      color: #fff

.time-box
  border: $border
  padding: 1.4rem
  min-height: 100%

  &__title
    font-size: $fs-xs
    font-family: $font-body
    margin-bottom: 1.4rem

  &__list
    display: grid
    grid-template-columns: repeat(2, 1fr)
    gap: 1rem

  &__item
    display: flex
    align-items: center
    gap: 0.8rem
    cursor: pointer
    font-family: $font-body
    font-size: $fs-xs

    input
      appearance: none
      width: 1.2rem
      height: 1.2rem
      border: $border
      border-radius: $radius-full
      position: relative
      flex-shrink: 0

      &:checked::after
        content: ''
        position: absolute
        inset: 0.2rem
        border-radius: $radius-full
        background: $text

@media (max-width: 900px)
  .booking
    &__grid
      grid-template-columns: 1fr
      gap: 4rem

    &__datetime
      grid-template-columns: 1fr

    &__avatars
      grid-template-columns: repeat(2, 1fr)

    &__bottom
      flex-direction: column
      align-items: flex-start

  .calendar-box
    width: 100%
</style>
