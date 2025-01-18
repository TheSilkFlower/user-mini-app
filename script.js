const userBlock = document.querySelector('.wrapper')
const userTheme = document.querySelector('.user-block__info-theme')
const userNotif = document.querySelector('.user-block__info-notif')
const notCookie = document.querySelector('.user-block__info-not-cookie')
const theme = document.querySelector('#user-block__theme')
const notif = document.querySelector('#user-block__notifications')
const btnReset = document.querySelector('.btn_reset')

// отображаемый текст по умолчанию
userTheme.innerHTML = 'Выберите тему'
userNotif.innerHTML = 'Выберите уровень уведомлений'

// запрашиваем информацию о cookie при загрузке страницы
window.onload = function() {
    try {
        const cookies = document.cookie

        // получаем массив cookie
        const cookieArray = cookies.split('; ')

        // получаем значение по имени cookie
        const cookieValueTheme = cookieArray.find(cookie => cookie.startsWith('theme='))
        const cookieValueNotif = cookieArray.find(cookie => cookie.startsWith('notif='))

        // получаем информацию о теме
        if(cookieValueTheme) {
            const getTheme = cookieValueTheme.split('=')[1]
            switch(getTheme) {
                case 'light':
                    userTheme.innerHTML = 'Выбрана тема: светлая'
                    userBlock.style.background = '#fff'
                    userTheme.style.color = 'black'
                    userNotif.style.color = 'black'
                    break
                case 'dark':
                    userTheme.innerHTML = 'Выбрана тема: тёмная'
                    userBlock.style.background = '#000702'
                    userTheme.style.color = 'white'
                    userNotif.style.color = 'white'
                    break
            }
        } 
        
        // получаем информацию об уведомлениях
        if(cookieValueNotif) {
            const getNotif = cookieValueNotif.split('=')[1]
            switch(getNotif) {
                case 'little':
                    userNotif.innerHTML = 'Выбран уровень уведомлений: малый'
                    break
                case 'middle':
                    userNotif.innerHTML = 'Выбран уровень уведомлений: средний'
                    break
                case 'big':
                    userNotif.innerHTML = 'Выбран уровень уведомлений: высокий'
                    break
                default:
                    userNotif.innerHTML = ''
            }
        }

    } catch (error) {
        console.log('Не удалось получить информацию о cookie')
    }
}

// функция для установки cookie
function setCookie(name, value) {
    // берём текущее время + 7 дней
    const date = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
    const expires = date.toUTCString()

    // устанавливаем cookie с защитой secure и samesite
    document.cookie = `${name}=${value};expires=${expires};path=/;secure;samesite=lax`
}

// функция для определения выбранного уровня уведомлений
function getValueFromSelectNotif() {
    notCookie.style.display = 'none'
    
    const selectedNotif = notif.value
    switch(selectedNotif) {
        case 'little':
            userNotif.innerHTML = 'Выбран уровень уведомлений: малый'
            break
        case 'middle':
            userNotif.innerHTML = 'Выбран уровень уведомлений: средний'
            break
        case 'big':
            userNotif.innerHTML = 'Выбран уровень уведомлений: высокий'
            break
        default:
            userNotif.innerHTML = ''
    }
    setCookie('notif', selectedNotif)
}

// функция для определения выбранной темы
function getValueFromSelectTheme() {
    notCookie.style.display = 'none'

    const selectedTheme = theme.value
    switch(selectedTheme) {
        case 'light':
            userTheme.innerHTML = 'Выбрана тема: светлая'
            userBlock.style.background = '#fff'
            userTheme.style.color = 'black'
            userNotif.style.color = 'black'
            break
        case 'dark':
            userTheme.innerHTML = 'Выбрана тема: тёмная'
            userBlock.style.background = '#000702'
            userTheme.style.color = 'white'
            userNotif.style.color = 'white'
            break
        default:
            userTheme.innerHTML = ''
    }
    setCookie('theme', selectedTheme)
}

// функция сброса cookie
function deleteCookie () {
    const cookies = document.cookie.split(';')

    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]

        const select = cookie.indexOf('=')
        const name = select > -1 ? cookie.substring(0, select) : cookie

        document.cookie = name + '=;max-age=0;path=/;'
    }

    userBlock.style.background = '#fff'

    // возвращаем в исходное состояние параметры select option
    theme.value = '0'
    notif.value = '0'

    // отображаем блок с информацией об отсутствии cookie
    notCookie.style.display = 'block'
    userNotif.innerHTML = ''
    userTheme.innerHTML = ''
}

// вешаем обработчики на изменение select option для темы и уведомлений
notif.addEventListener('change', getValueFromSelectNotif)
theme.addEventListener('change', getValueFromSelectTheme)

// вешаем событие клика на кнопку для удаления cookie
btnReset.addEventListener('click', deleteCookie)