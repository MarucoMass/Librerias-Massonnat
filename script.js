class Curso{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio
    }
}
const cursosGtrElec = new Curso(1, 'Curso de Guitarra Eléctrica', 12000)
const cursosGtrEsp = new Curso(2, 'Curso de Guitarra Española', 10000)
const cursosPiano = new Curso(3, 'Curso de Piano', 9000)
const cursosBajo = new Curso(4, 'Curso de Bajo', 11000)
const cursosCanto = new Curso(5, 'Curso de Canto', 7000)
const cursosTrompeta = new Curso(6, 'Curso de Trompeta', 8000)
const cursosFlauta = new Curso(7, 'Curso de Flauta', 8000)
const cursosViolin = new Curso(8, 'Curso de Violin', 9500)
const cursosCello = new Curso(9, 'Curso de Cello', 8500)
const cursosSaxo = new Curso(10, 'Curso de Saxo', 9000)
let arrayCursos = []
let arrayCompra = []
// let newArray = []
let contador = document.getElementById('carritoContador')
let contadorDos = document.getElementById('carritoContadorDos')
let cuenta = 0
const carritoBtn = document.querySelectorAll('.carritoBtn')
const cursos_boxes = document.getElementById('cursos_boxes')
let boxCarrito = document.querySelector('.boxCarrito')
const boxLista = document.getElementById('boxLista')
// let boxes = document.querySelectorAll('.cursos_box')

if (localStorage.getItem('cursos')) {
    arrayCompra = JSON.parse(localStorage.getItem('cursos'))
    arrayCompra.forEach((value) => {
        boxLista.innerHTML += `
        <div class="boxCompra">
            <h4>${value.nombre}</h4>
            <h5>Precio: $ ${value.precio}</h5>
            <button value="${value.id}" class="btnBorrar">Borrar</button>
        </div>
        <hr>
        `
    })
} else {
    localStorage.setItem('cursos', JSON.stringify(arrayCompra))
}
arrayCursos.push(cursosGtrElec, cursosGtrEsp, cursosPiano, cursosBajo, cursosCanto, cursosTrompeta, cursosFlauta, cursosViolin, cursosCello, cursosSaxo)

const cargarCursos = () => {
    arrayCursos.forEach((value) => {
        cursos_boxes.innerHTML += `
        <div class="cursos_box" id="curso${value.id}">
        <h3>${value.nombre}</h3>
        <p>Este curso tiene un costo de $${value.precio}.</p>
        <button value="${value.id}">Agregar al carrito</button>
    </div>   `
    })
}

// localStorage.clear()
const comprarCursos = () =>{
    cursos_boxes.addEventListener('click', (e) => {
        if(e.target.value){
            let finder = arrayCursos.find((el) => el.id == e.target.value)
            let id = finder.id
            if (!arrayCompra.some((el) => el.id == id)) {
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha añadido al carrito',
                    text: 'Gracias!',
                })
                arrayCompra.push(finder)
                localStorage.setItem('cursos', JSON.stringify(arrayCompra))
                mostrarCursos()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ya elegiste ese curso',
                    text: 'Elige alguno de los otros!',
                })
            }
        }
    })
}

carritoBtn.forEach(el => el.addEventListener('click', () => {
    if (boxLista.innerHTML == '') {
        Swal.fire({
            icon: 'error',
            title: 'No hay cursos',
            text: 'Elige alguno de los cursos!',
        })
        boxCarrito.classList.remove('active')
    } else {
        boxCarrito.classList.toggle('active')
    }
}))

const mostrarCursos = () => {
    boxLista.innerHTML = ''
    let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
    cursoComprado.forEach((value) => {
        boxLista.innerHTML += `
        <div class="boxCompra">
            <h4>${value.nombre}</h4>
            <h5>Precio: $ ${value.precio}</h5>
            <button value="${value.id}" class="btnBorrar">Borrar</button>
        </div>
        <hr>
        `
    })
}
const borrarCursos = () => {
    boxLista.addEventListener('click', (e) => {
    if (boxLista.innerHTML != '') {
        boxLista.innerHTML = ''
        let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
        arrayCompra = cursoComprado.filter(el => el.id != e.target.value)
        localStorage.removeItem('cursos')
        localStorage.setItem('cursos', JSON.stringify(arrayCompra))
        arrayCompra.forEach((value) => {
            boxLista.innerHTML += `
            <div class="boxCompra">
                <h4>${value.nombre}</h4>
                <h5>Precio: $ ${value.precio}</h5>
                <button value="${value.id}" class="btnBorrar">Borrar</button>
            </div>
            <hr>
            `
        })
        if(boxLista.innerHTML == '') {
            boxCarrito.classList.remove('active')
        }
    } 
})
}


cargarCursos()
comprarCursos()
borrarCursos()


// ****************************************************************************************
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