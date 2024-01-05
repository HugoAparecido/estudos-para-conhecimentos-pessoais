let slide1 = document.getElementById('slide1')
let slide2 = document.getElementById('slide2')
window.addEventListener("scroll", function () {
    slide1.style.left = window.scrollY + 'px'
    slide2.style.left = -window.scrollY + 'px'
})