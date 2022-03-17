// header
const hamburguer = document.querySelector('.header .nav-bar .nav-list .nav-burguer');
const hamburguerA = document.querySelector('.header .nav-bar .nav-list .nav-burguer .active');
const mobile = document.querySelector('.header .nav-bar .nav-list ul');
const mobileA = document.querySelector('.header .nav-bar .nav-list ul .active');
const item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburguer.addEventListener("click", ()=>{
    hamburguer.classList.toggle("active");
    mobile.classList.toggle("active");
})

item.forEach(selectItem => selectItem.addEventListener("click", ()=>{
    if ((mobile.classList = "active") || (hamburguer.classList = "active")) {
        hamburguer.classList.toggle("active");
        mobile.classList.toggle("active");     
    }
}))