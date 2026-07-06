const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

const media = window.matchMedia('(max-width: 900px)')

media.addEventListener('change', updateNavbar)

function updateNavbar(e) {
    const isMobile = e.matches

    if (isMobile) {
        navbar.removeAttribute('inert')
        closeSidebar()
    } else {
        navbar.removeAttribute('inert')
        navbar.classList.remove('show')
        openButton.setAttribute('aria-expanded', 'false')
    }
}

function openSidebar() {
    navbar.classList.add('show')
    navbar.removeAttribute('inert')
    openButton.setAttribute('aria-expanded', 'true')
}

function closeSidebar() {
    navbar.classList.remove('show')
    navbar.removeAttribute('inert')
    openButton.setAttribute('aria-expanded', 'false')
}

Array.from(document.querySelectorAll('nav a')).forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            closeSidebar()
        }
    })
})

updateNavbar(media)

document.addEventListener('DOMContentLoaded', () => {
    const phrases = document.querySelectorAll('header h2')

    if (!phrases.length) {
        return
    }

    let index = 0
    phrases[index].classList.add('active')

    setInterval(() => {
        phrases[index].classList.remove('active')
        index = (index + 1) % phrases.length
        phrases[index].classList.add('active')
    }, 3000)
})
