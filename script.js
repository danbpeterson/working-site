const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

const media = window.matchMedia("(width < 750px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e){
    const isMobile = e.matches
    console.log(isMobile)
    if(isMobile){
        navbar.setAttribute('inert', '')
    }
    else{
        navbar.removeAttribute('inert')
    }
}

function openSidebar(){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
}

function closeSidebar(){
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expanded', 'false')
}
updateNavbar(media)

document.addEventListener("DOMContentLoaded", () => {
    const phrases = document.querySelectorAll("header h2");
    let index = 0;

    // Set the first one active
    phrases[index].classList.add("active");

    setInterval(() => {
        phrases[index].classList.remove("active");
        index = (index + 1) % phrases.length;
        phrases[index].classList.add("active");
    }, 3000);
});
