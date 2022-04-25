const carritoBtn = document.querySelectorAll(".carritoBtn")
const cursos_boxes = document.getElementById("cursos_boxes")
const boxCarrito = document.querySelector(".boxCarrito")
const carritoBox = document.getElementById("carritoBox")
const boxLista = document.getElementById("boxLista")
const boxTotal = document.getElementById("boxTotal")
const btnComprar = document.getElementById("btnComprar")

fetch("./json/cursos.json")
.then(res => res.json())
.then(cursos => {
    cursos.forEach((value) => {
        cursos_boxes.innerHTML += `
        <div class="cursos_box" id="curso${value.id}">
        <h3 class="nombre">${value.nombre}</h3>
        <p class="precio">Este curso tiene un costo de $ <span>${value.precio}</span></p>
        <button class="btnAgregar" data-id="${value.id}">Agregar al carrito</button>
    </div>   `
    })

    const btnAgregar = document.querySelectorAll(".btnAgregar")
    btnAgregar.forEach((e) =>
      e.addEventListener("click", (e) => {
        let cardPadre = e.target.parentElement
        agregarAlCarrito(cardPadre)
      })
    )
})

let carrito = JSON.parse(localStorage.getItem("cursos")) || [];

carritoBtn.forEach(el => el.addEventListener("click", () => {
    if (boxLista.innerHTML == '') {
        Swal.fire({
            icon: 'error',
            title: 'No hay cursos en el carrito',
            text: 'Elige alguno de los cursos!',
        })
        boxCarrito.classList.remove("active")
    } else {
        boxCarrito.classList.toggle("active")
    }
}))

const agregarAlCarrito = (cardPadre) => {
    let curso = {
      nombre: cardPadre.querySelector(".nombre").textContent,
      precio: Number(cardPadre.querySelector(".precio span").textContent),
      cantidad: 1,
      id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
    }
  
    let cursoEncontrado = carrito.find((element) => element.id === curso.id)
  
    cursoEncontrado ? cursoEncontrado.cantidad++ : carrito.push(curso)
    mostrarCarrito()
    Swal.fire({
      icon: 'success',
      title: `${curso.nombre} se ha añadido al carrito`,
      text: 'Gracias!',
      })
  };

  const mostrarCarrito = () => {
    boxLista.innerHTML = ""
    carrito.forEach((element) => {
      let {nombre, precio, cantidad, id } = element
      boxLista.innerHTML += `
        <div class="boxCompra">
            <h4 class="nombre">${nombre}</h4>
            <h5>Cantidad: ${cantidad}</h5>
            <h5>Subtotal: $<span> ${precio * cantidad}</span></h5>
            <div id="boxBtn">
            <button class="btnRestar" data-id="${id}">-</button>
            <button class="btnBorrar" data-id="${id}">Borrar</button>
            </div>
        </div>
        <hr>
        `
    })
    localStorage.setItem("cursos", JSON.stringify(carrito))
    boxTotal.innerHTML = `
    <h4>Total: $ ${total()}</h4>
    `
  }

  const restarProducto = (cursoRestar) => {
    let cursoEncontrado = carrito.find((element) => element.id === Number(cursoRestar))
    if (cursoEncontrado) {
      cursoEncontrado.cantidad--
      if (cursoEncontrado.cantidad === 0) {
        cursoEncontrado.cantidad = 1
      }
    }
    mostrarCarrito()
  }

  const borrarProducto = (cursoBorrar) => {
    carrito = carrito.filter((element) => element.id !== Number(cursoBorrar))
    mostrarCarrito()
  }

  const botonesCarrito = () => {
    boxLista.addEventListener("click", (e) => {
      if (e.target.classList.contains("btnRestar")) {
        restarProducto(e.target.getAttribute("data-id"))
      }
      if (e.target.classList.contains("btnBorrar")) {
        borrarProducto(e.target.getAttribute("data-id"))
      }
      if(boxLista.innerHTML == "") {
        boxCarrito.classList.remove("active")
    }
    })
  }

  const total = () => {
    let arrayPrecios = []
    let cursosComprado = JSON.parse(localStorage.getItem("cursos"))
    for (const item of cursosComprado) {
        let total = item.precio * item.cantidad
        arrayPrecios.push(total)
    }
    let sumaTotal = arrayPrecios.reduce((a, b) => a + b, 0)
    return sumaTotal
  };

  
  
// esto es para sacar el carrito al clickear sobre el DOM
document.addEventListener("click", (e) => {
  if (e.target.tagName == 'DIV' || e.target.tagName == 'H1' || e.target.tagName == 'H2' || e.target.tagName == 'P') {
    boxCarrito.classList.remove("active")
  }
})

// funcion para flujo de salida
function checkout() { 
btnComprar.addEventListener("click", () => {
  Swal.fire({
    icon: 'success',
    title: `El total es $ ${total()}`,
    text: 'Gracias por su compra!',
  })
  localStorage.removeItem("cursos");
  carrito = [];
  boxLista.innerHTML = "";
  boxCarrito.classList.remove("active");
})
}


botonesCarrito();
checkout();