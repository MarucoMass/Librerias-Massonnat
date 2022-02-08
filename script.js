const hamburguer = document.querySelector('.header .nav-bar .nav-list .nav-burguer');
const hamburguerA = document.querySelector('.header .nav-bar .nav-list .nav-burguer .active');
const mobile = document.querySelector('.header .nav-bar .nav-list ul');
const mobileA = document.querySelector('.header .nav-bar .nav-list ul .active');
const item = document.querySelector('.header .nav-bar .nav-list ul li');
const header = document.querySelector('.header.container');

hamburguer.addEventListener("click", ()=>{
    hamburguer.classList.toggle("active");
    mobile.classList.toggle("active");
})

item.addEventListener("click", () =>{
    hamburguer.classList.toggle("active");
    mobile.classList.toggle("active");
})