
// numberDisplay
const numberDisplay = (num, el, expired, flip) => {

  let prevDateNum = num - 1
  let prevDateNumMin = prevDateNum < 0 ? 59 : prevDateNum
  let prevDate = (prevDateNumMin < 10) ? `0${prevDateNumMin}` : prevDateNumMin
  let date = (num < 10) ? `0${num}` : num

  document.querySelector(el).innerHTML = `
    <div class="countnum-backtop">${expired ? '00' : prevDate}</div>
    <div class="countnum-backbottom">${expired ? '00' : prevDate}</div>
    <div class="countnum-top">${expired ? '00' : date}</div>
    <div class="countnum-bottom">${expired ? '00' : date}</div>
    <div class="countnum-line"></div>
  `

  if (flip) {
    document.querySelector(el).classList.add('animate')
  } else {
    document.querySelector(el).classList.remove('animate')
  }
}

const interval = setInterval(() => updateTimer(), 1000)

// updateTimer
const updateTimer = () => {
  const targetDate = new Date('October 31, 2023 00:00:00'),
        currentdate = new Date(),
        difference = targetDate - currentdate,
        expired = difference < 0

  const days = Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours = Math.floor(difference / (1000 * 60 * 60)),
        minutes = Math.floor(difference / (1000 * 60)),
        seconds = Math.floor(difference / 1000),
        
        d = days,
        h = hours - days * 24,
        m = minutes - hours * 60,
        s = seconds - minutes * 60

  numberDisplay(d, '#blockDays', expired, h === 0 && m === 0 && s === 0)
  numberDisplay(h, '#blockHours', expired, m === 0 && s === 0)
  numberDisplay(m, '#blockMinutes', expired, s === 0)
  numberDisplay(s, '#blockSeconds', expired, true)

  if (expired) {
    clearInterval(interval)
    const div = document.createElement('div')
    div.setAttribute('class', 'counter-error')
    div.textContent = 'The date has already expired'
    document.querySelector('.counter').after(div)
  }
}

// Elements
updateTimer()
