<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
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
const clientName = ref('')
const isSubmitted = ref(false)
const isThankYouVisible = ref(false)

const openSection = ref('master')
const isDurationOpen = ref(false)
const isSubmitAttempted = ref(false)
let thankYouTimer = null

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

const normalizedClientName = computed(() => {
  return clientName.value.trim().replace(/\s+/g, ' ')
})

const todayStart = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
})

const currentMonthStart = computed(() => {
  return new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
})

const canGoPrevMonth = computed(() => {
  const todayMonth = new Date(todayStart.value.getFullYear(), todayStart.value.getMonth(), 1)
  return currentMonthStart.value > todayMonth
})

const normalizeDate = (date) => {
  if (!date) return null

  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)
  return normalizedDate
}

const isPastDate = (date) => {
  const normalizedDate = normalizeDate(date)
  return Boolean(normalizedDate && normalizedDate < todayStart.value)
}

const validationErrors = computed(() => {
  const errors = {}

  if (!normalizedClientName.value) {
    errors.name = 'Введите имя'
  }

  if (!selectedRole.value || !selectedPerson.value) {
    errors.master = 'Выберите мастера'
  }

  if (!selectedDate.value) {
    errors.date = 'Выберите дату'
  } else if (isPastDate(selectedDate.value)) {
    errors.date = 'Нельзя выбрать прошедшую дату'
  }

  if (!selectedTime.value) {
    errors.time = 'Выберите время'
  }

  if (!selectedType.value) {
    errors.type = 'Выберите вид тату'
  }

  if (
    selectedTypeData.value &&
    selectedTypeData.value.value !== 'mini' &&
    !selectedDuration.value
  ) {
    errors.duration = 'Выберите длительность сеанса'
  }

  return errors
})

const visibleErrors = computed(() => {
  return isSubmitAttempted.value ? validationErrors.value : {}
})

const errorList = computed(() => {
  return Object.values(visibleErrors.value)
})

const hasValidationErrors = computed(() => {
  return Object.keys(validationErrors.value).length > 0
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

const clearThankYouTimer = () => {
  clearTimeout(thankYouTimer)
  thankYouTimer = null
}

watch(
  [clientName, selectedRole, selectedPerson, selectedType, selectedDuration, selectedTime, selectedDate],
  () => {
    isSubmitted.value = false
    isThankYouVisible.value = false
    clearThankYouTimer()
  }
)

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
  if (!canGoPrevMonth.value) return

  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date) => {
  if (!date || isPastDate(date)) return

  selectedDate.value = date
  isSubmitted.value = false
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
  isSubmitted.value = false

  const currentType = tattooTypes.find((item) => item.value === typeValue)

  if (!currentType || currentType.value === 'mini') {
    isDurationOpen.value = false
    return
  }

  isDurationOpen.value = true
}

const closeThankYou = () => {
  clearThankYouTimer()
  isThankYouVisible.value = false
}

const showThankYou = () => {
  clearThankYouTimer()
  isThankYouVisible.value = true
  thankYouTimer = setTimeout(closeThankYou, 7000)
}

const submitBooking = () => {
  isSubmitAttempted.value = true
  isSubmitted.value = false

  if (hasValidationErrors.value) {
    if (validationErrors.value.master) {
      openSection.value = 'master'
    } else if (validationErrors.value.date || validationErrors.value.time) {
      openSection.value = 'date'
    } else {
      openSection.value = 'type'
      isDurationOpen.value = Boolean(validationErrors.value.duration)
    }

    return
  }

  isSubmitted.value = true
  showThankYou()
}

onBeforeUnmount(() => {
  clearThankYouTimer()
})
</script>

<template>
  <section class="booking" id="booking" aria-labelledby="booking-title">
    <div class="container">
      <h2 class="section-title section-title--form" id="booking-title">ФОРМА ЗАПИСИ</h2>

      <div class="booking__grid">
        <figure class="booking__dragon">
          <img :src="dragon" alt="Декоративный дракон" />
        </figure>

        <form class="booking__form" novalidate @submit.prevent="submitBooking">
          <div v-if="errorList.length" class="booking__errors" role="alert">
            <strong>Проверьте поля</strong>
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="booking__section">
            <label class="booking__field" :class="{ 'booking__field--error': visibleErrors.name }">
              <span>ИМЯ</span>
              <input
                id="booking-client-name"
                v-model="clientName"
                type="text"
                name="clientName"
                autocomplete="name"
                placeholder="Ваше имя"
                :aria-invalid="Boolean(visibleErrors.name)"
                :aria-describedby="visibleErrors.name ? 'booking-name-error' : undefined"
              />
            </label>

            <p v-if="visibleErrors.name" id="booking-name-error" class="booking__error">
              {{ visibleErrors.name }}
            </p>
          </div>

          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{
                'field-select--open': openSection === 'master',
                'field-select--error': visibleErrors.master
              }"
              :aria-invalid="Boolean(visibleErrors.master)"
              :aria-describedby="visibleErrors.master ? 'booking-master-error' : undefined"
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

            <p v-if="visibleErrors.master" id="booking-master-error" class="booking__error">
              {{ visibleErrors.master }}
            </p>
          </div>

          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{
                'field-select--open': openSection === 'date',
                'field-select--error': visibleErrors.date || visibleErrors.time
              }"
              :aria-invalid="Boolean(visibleErrors.date || visibleErrors.time)"
              :aria-describedby="
                [
                  visibleErrors.date ? 'booking-date-error' : '',
                  visibleErrors.time ? 'booking-time-error' : ''
                ]
                  .filter(Boolean)
                  .join(' ') || undefined
              "
              @click="toggleSection('date')"
            >
              <span>{{ formattedSelectedDate }}</span>
            </button>

            <div v-show="openSection === 'date'" class="booking__dropdown">
              <div class="booking__datetime">
                <div class="calendar-box" aria-label="Календарь">
                  <div class="calendar-box__head">
                    <button
                      type="button"
                      class="calendar-box__nav"
                      :disabled="!canGoPrevMonth"
                      aria-label="Предыдущий месяц"
                      @click="prevMonth"
                    >
                      ‹
                    </button>
                    <span>{{ currentMonthLabel }}</span>
                    <button
                      type="button"
                      class="calendar-box__nav"
                      aria-label="Следующий месяц"
                      @click="nextMonth"
                    >
                      ›
                    </button>
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
                        'calendar-box__day--selected': isSelectedDate(item.fullDate),
                        'calendar-box__day--disabled': isPastDate(item.fullDate)
                      }"
                      :disabled="!item.day || isPastDate(item.fullDate)"
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

            <p v-if="visibleErrors.date" id="booking-date-error" class="booking__error">
              {{ visibleErrors.date }}
            </p>
            <p v-if="visibleErrors.time" id="booking-time-error" class="booking__error">
              {{ visibleErrors.time }}
            </p>
          </div>

          <div class="booking__section">
            <button
              type="button"
              class="field-select"
              :class="{
                'field-select--open': openSection === 'type',
                'field-select--error': visibleErrors.type
              }"
              :aria-invalid="Boolean(visibleErrors.type)"
              :aria-describedby="visibleErrors.type ? 'booking-type-error' : undefined"
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
                  :class="{
                    'field-select--open': isDurationOpen,
                    'field-select--error': visibleErrors.duration
                  }"
                  :aria-invalid="Boolean(visibleErrors.duration)"
                  :aria-describedby="visibleErrors.duration ? 'booking-duration-error' : undefined"
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

                <p
                  v-if="visibleErrors.duration"
                  id="booking-duration-error"
                  class="booking__error"
                >
                  {{ visibleErrors.duration }}
                </p>
              </div>
            </div>

            <p v-if="visibleErrors.type" id="booking-type-error" class="booking__error">
              {{ visibleErrors.type }}
            </p>
          </div>

          <div class="field-select field-select--static booking__price-title">СТОИМОСТЬ</div>

          <div class="booking__bottom">
            <strong>{{ formattedPrice }}</strong>
            <button type="submit" class="btn-outline">ЗАПИСАТЬСЯ</button>
          </div>

          <p v-if="isSubmitted" class="booking__status" role="status">
            Заявка подготовлена. Для подтверждения записи свяжитесь со студией.
          </p>
        </form>

        <Transition name="booking-thanks">
          <div
            v-if="isThankYouVisible"
            class="booking__thanks"
            role="status"
            aria-live="polite"
          >
            <button type="button" aria-label="Закрыть окно благодарности" @click="closeThankYou">
              ×
            </button>
            <strong>Спасибо за запись, {{ normalizedClientName }}!</strong>
            <span>Мы приняли заявку и скоро свяжемся для подтверждения.</span>
          </div>
        </Transition>
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

  &__errors
    margin: 0 0 1.8rem
    padding: 1.4rem 1.6rem
    border: 0.1rem solid #d43f3a
    color: #d43f3a
    font-family: $font-body
    font-size: $fs-xs
    line-height: 1.2

    strong
      display: block
      margin-bottom: .8rem
      font-family: $font-heading
      font-size: $fs-sm
      line-height: 1

    ul
      display: grid
      gap: .4rem
      margin: 0
      padding: 0
      list-style: none

  &__field
    display: grid
    gap: .8rem
    font-family: $font-heading
    font-size: $fs-md
    line-height: 1

    span
      display: block

    input
      width: 100%
      min-height: 5.8rem
      border: $border
      background: transparent
      color: $text
      padding: 0 1.8rem
      font-family: $font-body
      font-size: $fs-md
      line-height: 1
      outline: none

      &::placeholder
        color: rgba(29, 57, 216, .45)

      &:focus
        outline: 0.2rem solid rgba(29, 57, 216, .18)
        outline-offset: 0.2rem

    &--error
      color: #d43f3a

      input
        border-color: #d43f3a
        color: #d43f3a

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

  &__status
    margin: 1.6rem 0 0
    font-size: $fs-xs
    line-height: 1.2
    font-family: $font-body

  &__error
    margin: .8rem 0 0
    color: #d43f3a
    font-size: $fs-xs
    line-height: 1.2
    font-family: $font-body

  &__thanks
    position: fixed
    right: 2.4rem
    bottom: 2.4rem
    z-index: 50
    width: min(38rem, calc(100% - 2.4rem))
    border: $border
    background: var(--card-strong)
    color: $text
    padding: 2rem 4.8rem 2rem 2rem
    display: grid
    gap: .8rem
    box-shadow: 0 1.4rem 3.2rem rgba(29, 57, 216, .18)
    font-family: $font-body

    button
      position: absolute
      top: .8rem
      right: .8rem
      width: 3.2rem
      height: 3.2rem
      border: $border
      border-radius: $radius-full
      color: inherit
      font-size: 2rem
      line-height: 1

    strong
      font-family: $font-heading
      font-size: $fs-lg
      line-height: 1

    span
      font-size: $fs-xs
      line-height: 1.2

.booking-thanks-enter-active,
.booking-thanks-leave-active
  transition: opacity .25s ease, transform .25s ease

.booking-thanks-enter-from,
.booking-thanks-leave-to
  opacity: 0
  transform: translateY(1.2rem)

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

  &--error
    border-color: #d43f3a
    color: #d43f3a

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

    &:disabled
      opacity: .35
      cursor: default

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

    &--disabled
      opacity: .35
      cursor: default

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

@media (max-width: 576px)
  .booking
    padding-bottom: 5rem

    &__form
      padding: 1.6rem

    &__radio-group
      gap: 1.2rem 1.8rem

      label
        font-size: $fs-2xs

    &__avatars
      gap: 1.6rem 1.2rem

    &__avatar-card
      img
        width: 6.8rem
        height: 6.8rem

    &__bottom
      gap: 1.6rem

      strong
        font-size: 3.4rem

  .field-select
    min-height: 5.2rem
    padding: 0 1.2rem
    font-size: $fs-sm

  .calendar-box
    padding: 1rem

    &__head
      gap: .6rem

    &__weekdays,
    &__grid
      gap: .4rem

  .time-box
    padding: 1rem

    &__list
      grid-template-columns: 1fr
</style>
