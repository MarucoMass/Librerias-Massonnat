const formulario = document.getElementById("formDeContacto")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("apellido").value
    let email = document.getElementById("email").value
    let consulta = document.getElementById("consulta").value

    if (nombre && apellido && email && consulta) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            title: nombre + " " + apellido,
            body: consulta,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        
        Swal.fire({
            icon: 'success',
            title: 'Tu consulta ha sido enviada',
            text: 'Pronto te responderemos!',
            })

    } else {

        Swal.fire({
            icon: 'error',
            title: 'Te faltan completar campos',
            text: 'Completa los datos que faltan!',
        })
    }
    formulario.reset()
})