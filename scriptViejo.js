class Curso{
    constructor(id, nombre, precio, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio
        this.cantidad = cantidad
    }
}
const cursosGtrElec = new Curso(1, 'Curso de Guitarra Eléctrica', 12000, 1)
const cursosGtrEsp = new Curso(2, 'Curso de Guitarra Española', 10000, 1)
const cursosPiano = new Curso(3, 'Curso de Piano', 9000, 1)
const cursosBajo = new Curso(4, 'Curso de Bajo', 11000, 1)
const cursosCanto = new Curso(5, 'Curso de Canto', 7000, 1)
const cursosTrompeta = new Curso(6, 'Curso de Trompeta', 8000, 1)
const cursosFlauta = new Curso(7, 'Curso de Flauta', 8000, 1)
const cursosViolin = new Curso(8, 'Curso de Violin', 9500, 1)
const cursosCello = new Curso(9, 'Curso de Cello', 8500, 1)
const cursosSaxo = new Curso(10, 'Curso de Saxo', 9000, 1)
let arrayCursos = []
let arrayCompra = []
let arrayCompraa = []

const carritoBtn = document.querySelectorAll('.carritoBtn')
const cursos_boxes = document.getElementById('cursos_boxes')
let boxCarrito = document.querySelector('.boxCarrito')
const boxLista = document.getElementById('boxLista')
const boxTotal = document.getElementById('boxTotal')

arrayCursos.push(cursosGtrElec, cursosGtrEsp, cursosPiano, cursosBajo, cursosCanto, cursosTrompeta, cursosFlauta, cursosViolin, cursosCello, cursosSaxo)

// inicializacion
if (localStorage.getItem('cursos')) {
    let subTotalAlmacenado = []
    arrayCompra = JSON.parse(localStorage.getItem('cursos'))
    arrayCompra.forEach((value) => {
        boxLista.innerHTML += `
        <div class="boxCompra">
            <h4>${value.nombre}</h4>
            <h5>Subtotal: $ ${value.precio}</h5>
            <h5>Cantidad: ${value.cantidad}</h5>
            <button value="${value.id}" class="btnBorrar">Borrar</button>
        </div>
        <hr>
        `
        subTotalAlmacenado.push(value.precio)
        boxSubTotal.innerHTML = `
        <h4>Total: $ ${subTotalAlmacenado.reduce((a, b) => a + b, 0)}</h4>
        `
    })
} else {
    localStorage.setItem('cursos', JSON.stringify(arrayCompra))
}

// event listener para mostrar el carrito, si no hay nada sale el sweet alert
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

// const comprarCursos = () =>{
//     cursos_boxes.addEventListener('click', (e) => {
//         if(e.target.value){
//             let finder = arrayCursos.find((el) => el.id == e.target.value)
//             if (!arrayCompra.some((el) => el.id == e.target.value)) {
//                 arrayCompra.push(finder)
//                 localStorage.setItem('cursos', JSON.stringify(arrayCompra))
//                 mostrarCursos()
//                 Total()
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Se ha añadido al carrito',
//                     text: 'Gracias!',
//                 })
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Ya elegiste ese curso',
//                     text: 'Elige alguno de los otros!',
//                 })
//             }
//         }
//     })
// }
// localStorage.clear()
const comprarCursos = () =>{
    cursos_boxes.addEventListener('click', (e) => {
        if(e.target.value){
            if (arrayCompra.some((el) => el.id == e.target.value)) {
                let carrito = JSON.parse(localStorage.getItem('cursos'))
                let cursoEncontrado = carrito.find((el) => el.id == e.target.value)
                let cursoRepetido = new Curso(cursoEncontrado.id, cursoEncontrado.nombre, cursoEncontrado.precio * cursoEncontrado.cantidad, cursoEncontrado.cantidad++)
                arrayCompra = arrayCompra.filter((el) => el.id != cursoEncontrado.id)
                arrayCompra.push(cursoRepetido)  
                localStorage.setItem('cursos', JSON.stringify(arrayCompra))        
            } 
            if (!arrayCompra.some((el) => el.id == e.target.value)) {
                let finder = arrayCursos.find((el) => el.id == e.target.value)
                arrayCompra.push(finder)
                localStorage.setItem('cursos', JSON.stringify(arrayCompra))        
            }
            mostrarCursos()
            Total()
            Swal.fire({
                icon: 'success',
                title: 'Se ha añadido al carrito',
                text: 'Gracias!',
            })
        }
    })
}

const mostrarCursos = () => {
    boxLista.innerHTML = ''
    let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
    cursoComprado.forEach((value) => {
        boxLista.innerHTML += `
        <div class="boxCompra">
            <h4>${value.nombre}</h4>
            <h5>Subtotal: $ ${value.precio}</h5>
            <h5>Cantidad: ${value.cantidad}</h5>
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
        arrayCompra = cursoComprado.filter(el => el.id != e.target.value) // filtra todos los cursos no borrados
        localStorage.removeItem('cursos') // remueve el localStorage viejo
        localStorage.setItem('cursos', JSON.stringify(arrayCompra)) // agrega el localStorage nuevo con el array filtrado nuevo
        arrayCompra.forEach((value) => {
            boxLista.innerHTML += `
            <div class="boxCompra">
                <h4>${value.nombre}</h4>
                <h5>Subtotal: $ ${value.precio}</h5>
                <h5>Cantidad: ${value.cantidad}</h5>
                <button value="${value.id}" class="btnBorrar">Borrar</button>
            </div>
            <hr>
            `
        })
        // funcion que muestra el total 
        Total()
        // si no hay ningun curso que oculte el carrito
        if(boxLista.innerHTML == '') {
            boxCarrito.classList.remove('active')
        }
    } 
})
}

const Total = () => {
    let arrayPrecios = []
    let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
    for (const item of cursoComprado) {
        let precio = item.precio
        arrayPrecios.push(precio)
    }
    let Total = arrayPrecios.reduce((a, b) => a + b, 0)
    boxTotal.innerHTML = `
    <h4>Total: $ ${Total}</h4>
    `
}


cargarCursos()
comprarCursos()
borrarCursos()
// subTotal()


// ****************************************************************************************
// class Curso{
//     constructor(id, nombre, precio){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio
//     }
// }
// const cursosGtrElec = new Curso(1, 'Curso de Guitarra Eléctrica', 12000)
// const cursosGtrEsp = new Curso(2, 'Curso de Guitarra Española', 10000)
// const cursosPiano = new Curso(3, 'Curso de Piano', 9000)
// const cursosBajo = new Curso(4, 'Curso de Bajo', 11000)
// const cursosCanto = new Curso(5, 'Curso de Canto', 7000)
// const cursosTrompeta = new Curso(6, 'Curso de Trompeta', 8000)
// const cursosFlauta = new Curso(7, 'Curso de Flauta', 8000)
// const cursosViolin = new Curso(8, 'Curso de Violin', 9500)
// const cursosCello = new Curso(9, 'Curso de Cello', 8500)
// const cursosSaxo = new Curso(10, 'Curso de Saxo', 9000)
// let arrayCursos = []
// let arrayCompra = []
// // let newArray = []
// let contador = document.getElementById('carritoContador')
// let contadorDos = document.getElementById('carritoContadorDos')
// let cuenta = 0
// const carritoBtn = document.querySelectorAll('.carritoBtn')
// const cursos_boxes = document.getElementById('cursos_boxes')
// let boxCarrito = document.querySelector('.boxCarrito')
// const boxLista = document.getElementById('boxLista')
// const boxSubTotal = document.getElementById('boxSubTotal')

// arrayCursos.push(cursosGtrElec, cursosGtrEsp, cursosPiano, cursosBajo, cursosCanto, cursosTrompeta, cursosFlauta, cursosViolin, cursosCello, cursosSaxo)

// // inicializacion
// if (localStorage.getItem('cursos')) {
//     let subTotalAlmacenado = []
//     arrayCompra = JSON.parse(localStorage.getItem('cursos'))
//     arrayCompra.forEach((value) => {
//         boxLista.innerHTML += `
//         <div class="boxCompra">
//             <h4>${value.nombre}</h4>
//             <h5>Precio: $ ${value.precio}</h5>
//             <button value="${value.id}" class="btnBorrar">Borrar</button>
//         </div>
//         <hr>
//         `
//         subTotalAlmacenado.push(value.precio)
//         boxSubTotal.innerHTML = `
//         <h4> Subtotal: $ ${subTotalAlmacenado.reduce((a, b) => a + b, 0)}</h4>
//         `
//     })
// } else {
//     localStorage.setItem('cursos', JSON.stringify(arrayCompra))
// }

// const cargarCursos = () => {
//     arrayCursos.forEach((value) => {
//         cursos_boxes.innerHTML += `
//         <div class="cursos_box" id="curso${value.id}">
//         <h3>${value.nombre}</h3>
//         <p>Este curso tiene un costo de $${value.precio}.</p>
//         <button value="${value.id}">Agregar al carrito</button>
//     </div>   `
//     })
// }

// // localStorage.clear()
// const comprarCursos = () =>{
//     cursos_boxes.addEventListener('click', (e) => {
//         if(e.target.value){
//             let finder = arrayCursos.find((el) => el.id == e.target.value)
//             let id = finder.id
//             if (!arrayCompra.some((el) => el.id == id)) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Se ha añadido al carrito',
//                     text: 'Gracias!',
//                 })
//                 arrayCompra.push(finder)
//                 localStorage.setItem('cursos', JSON.stringify(arrayCompra))
//                 mostrarCursos()
//                 subTotal()
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Ya elegiste ese curso',
//                     text: 'Elige alguno de los otros!',
//                 })
//             }
//         }
//     })
// }

// carritoBtn.forEach(el => el.addEventListener('click', () => {
//     if (boxLista.innerHTML == '') {
//         Swal.fire({
//             icon: 'error',
//             title: 'No hay cursos',
//             text: 'Elige alguno de los cursos!',
//         })
//         boxCarrito.classList.remove('active')
//     } else {
//         boxCarrito.classList.toggle('active')
//     }
// }))

// const mostrarCursos = () => {
//     boxLista.innerHTML = ''
//     let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
//     cursoComprado.forEach((value) => {
//         boxLista.innerHTML += `
//         <div class="boxCompra">
//             <h4>${value.nombre}</h4>
//             <h5>Precio: $ ${value.precio}</h5>
//             <button value="${value.id}" class="btnBorrar">Borrar</button>
//         </div>
//         <hr>
//         `
//     })
// }
// const borrarCursos = () => {
//     boxLista.addEventListener('click', (e) => {
//     if (boxLista.innerHTML != '') {
//         boxLista.innerHTML = ''
//         let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
//         arrayCompra = cursoComprado.filter(el => el.id != e.target.value) // filtra todos los cursos no borrados
//         cursoBorrado = cursoComprado.find(el => el.id == e.target.value)
//         precioBorrado = cursoBorrado.precio
//         localStorage.removeItem('cursos') // remueve el localStorage viejo
//         localStorage.setItem('cursos', JSON.stringify(arrayCompra)) // agrega el localStorage nuevo
//         arrayCompra.forEach((value) => {
//             boxLista.innerHTML += `
//             <div class="boxCompra">
//                 <h4>${value.nombre}</h4>
//                 <h5>Precio: $ ${value.precio}</h5>
//                 <button value="${value.id}" class="btnBorrar">Borrar</button>
//             </div>
//             <hr>
//             `
//         })
//         subTotal()
//         // si no hay ningun curso que oculte el carrito
//         if(boxLista.innerHTML == '') {
//             boxCarrito.classList.remove('active')
//         }
//     } 
// })
// }

// const subTotal = () => {
//     let arrayPrecios = []
//     let cursoComprado = JSON.parse(localStorage.getItem('cursos'))
//     for (const item of cursoComprado) {
//         let precio = item.precio
//         arrayPrecios.push(precio)
//     }
//     let subTotal = arrayPrecios.reduce((a, b) => a + b, 0)
//     boxSubTotal.innerHTML = `
//     <h4> Subtotal: $ ${subTotal}</h4>
//     `
// }


// cargarCursos()
// comprarCursos()
// borrarCursos()
// // subTotal()