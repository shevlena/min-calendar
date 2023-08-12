fieldCalendar = document.querySelector('.wrapper')

const now = new Date()
// console.log(now);

const hoursDay = now.getHours()
const minutesDay = now.getMinutes()

let curentMonth = now.getMonth()
let curentYear = now.getFullYear()
// console.log(curentMonth, curentYear);

const monthIndexToName = {
    0: 'Січень',
    1: 'Лютий',
    2: 'Березень',
    3: 'Квітень',
    4: 'Травень',
    5: 'Червень',
    6: 'Липень',
    7: 'Серпень',
    8: 'Вересень',
    9: 'Жовтень',
    10: 'Листопад',
    11: 'Грудень',
}

// Глобальні змінні для доступу до функцій обробників
let todayHandler, firstSeptHandler, newYearHandler, birthdayHandler;

// На кожному елементі в масиві видаляються відповідні обробники
function removeEvents(arr) {
    arr.forEach( element => {
        element.removeEventListener('click', todayHandler);
        element.removeEventListener('click', firstSeptHandler);
        element.removeEventListener('click', newYearHandler);
        element.removeEventListener('click', birthdayHandler);
    })
}

const monthElement = document.querySelector('.month');
// console.log(monthElement);
const prevBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
const dateNumberElements = [...document.querySelectorAll('.date-number')]

prevBtn.addEventListener('click', () => {
    if (curentMonth === 0) {
        curentMonth = 11
        curentYear--
    } else {
        curentMonth--
    }
    removeEvents(dateNumberElements); // Видалення попередніх обробників
    renderMonth(curentMonth, curentYear)
})
nextBtn.addEventListener('click', () => {
    if (curentMonth === 11) {
        curentMonth = 0
        curentYear++
    } else {
        curentMonth++
    }
    removeEvents(dateNumberElements); // Видалення попередніх обробників
    renderMonth(curentMonth, curentYear)
})


const renderMonth = (monthIndex, year) => {

    monthElement.innerHTML = `${year} / ${monthIndexToName[monthIndex]}`

    const firstDate = new Date(year, monthIndex, 1)
    const numDaysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const firstDay = firstDate.getDay()


    dateNumberElements.forEach((item, i) => {
        const dateNumber = (i + 2) - firstDay
        item.innerHTML = (dateNumber > 0) && (dateNumber <= numDaysInMonth) ? dateNumber : ''

        const today = new Date() // сьогоднішня дата
        const hourToday = today.getHours() // години
        const minutesToday = today.getMinutes() // хвилини
        const secondsToday = today.getSeconds() // секунди

      
        if (today.getMonth() === monthIndex && today.getFullYear() === year && today.getDate() === dateNumber) { // для сьогоднішньої дати ...
            item.classList.add('today') // додається клас .today

            todayHandler = (e) => { // якщо по сьогоднішній даті відбувається клік ...

                let textAdd = document.createElement('span') // створюється span
                textAdd.classList.add('text') // до span додається клас .text
                e.target.append(textAdd) // до елемента, на якому відбувся клік, додається створений span

                textAdd.innerText = `До кінця дня \n ${24-hoursDay} год та ${60-minutesDay} хв` // в span додається текстове повідомлення
                finishTime(textAdd) // функція, яка видаляє доданий span через 2 сек
            }

            item.addEventListener('click', todayHandler);

        } else {
            item.classList.remove('specialdate') // видаляється клас .specialdate
            item.classList.remove('today') // видаляється клас .today
        }
    })
}

renderMonth(curentMonth, curentYear)


function finishTime(textMessage) { // функція завершення показу текстового вікна через 2 сек
    setTimeout(() => {
        textMessage.remove() // видаляється текстове вікно (в нашому випадку буде видалятися span)
    }, 2000)
}

function diffDays(day) { // функція знаходження різниці днів між певним та сьогоднішнім днями
    const diff = day.getTime() - now.getTime() // різниця в мілісекундах між часом певної дати і сьогоднішньої дати
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) // мілісекунди перераховується у дні
    return days
}