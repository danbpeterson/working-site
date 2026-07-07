const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')
const mobileTopBar = document.querySelector('.mobile-top-bar')

const media = window.matchMedia('(max-width: 900px)')
let lastScrollY = window.scrollY
let ticking = false

function handleMobileHeaderScroll() {
    if (!mobileTopBar || window.innerWidth > 900) {
        mobileTopBar?.classList.remove('is-hidden')
        navbar?.classList.remove('is-top-offset')
        lastScrollY = window.scrollY
        ticking = false
        return
    }

    const currentScrollY = window.scrollY
    const scrollingDown = currentScrollY > lastScrollY + 8
    const scrollingUp = currentScrollY < lastScrollY - 8

    if (scrollingDown && currentScrollY > 80) {
        mobileTopBar.classList.add('is-hidden')
        navbar.classList.add('is-top-offset')
    } else if (scrollingUp || currentScrollY <= 40) {
        mobileTopBar.classList.remove('is-hidden')
        navbar.classList.remove('is-top-offset')
    }

    lastScrollY = currentScrollY
    ticking = false
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(handleMobileHeaderScroll)
        ticking = true
    }
}

media.addEventListener('change', updateNavbar)

function updateNavbar(e) {
    const isMobile = e.matches

    if (isMobile) {
        navbar.removeAttribute('inert')
        closeSidebar()
        mobileTopBar?.classList.remove('is-hidden')
        navbar.classList.remove('is-top-offset')
        lastScrollY = window.scrollY
    } else {
        navbar.removeAttribute('inert')
        navbar.classList.remove('show')
        openButton.setAttribute('aria-expanded', 'false')
        mobileTopBar?.classList.remove('is-hidden')
        navbar.classList.remove('is-top-offset')
    }
}

function openSidebar() {
    navbar.classList.add('show')
    navbar.removeAttribute('inert')
    openButton.setAttribute('aria-expanded', 'true')
    mobileTopBar?.classList.remove('is-hidden')
    navbar.classList.remove('is-top-offset')
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
window.addEventListener('scroll', onScroll, { passive: true })

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
