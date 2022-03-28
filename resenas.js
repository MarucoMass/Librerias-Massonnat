const resena = document.getElementById("resenaBox")
fetch("./json/generated.json")
.then(res => res.json())
.then(resenas => {
    resenas.forEach(value => {
        resena.innerHTML +=
        `<div class="somos_resena_box">
        <div><h3>${value.name}</h3></div>
        <div><h4>Estudiante de ${value.student}</h4></div>
        <div><p>${JSON.stringify(value.about)}</p></div>
        </div>
        `
    });


    let resenaBoxes = document.querySelectorAll(".somos_resena_box")
    let resenaLast = resenaBoxes[resenaBoxes.length -1]
    const btnLeftHome = document.getElementById("leftBtn")
    const btnRightHome = document.getElementById("rightBtn")
    

    eventListenersHome();
    function eventListenersHome(){
        btnRightHome.addEventListener("click", next)
        btnLeftHome.addEventListener("click", prev)
    }
    resena.insertAdjacentElement('afterbegin', resenaLast)
    
    function next() {
        let resenaFirst = document.querySelectorAll('.somos_resena_box')[0]
        resena.style.marginLeft = '-400vw'
        resena.style.transition = 'all 3s'
        setTimeout(() => {
        resena.style.transition = 'none'
        resena.insertAdjacentElement('beforeend', resenaFirst)    
        resena.style.marginLeft = '-200vw'
        }, 500)
    }
    function prev() {
        let resenaBoxes = document.querySelectorAll('.somos_resena_box')
        let resenaLast = resenaBoxes[resenaBoxes.length -1]
        resena.style.marginLeft = '0'
        resena.style.transition = 'all 3s'
        setTimeout(() => {
        resena.style.transition = 'none'
        resena.insertAdjacentElement('afterbegin', resenaLast)    
        resena.style.marginLeft = '-400vw'
        }, 500)
    }
    
    setInterval(() => {
        next();
    }, 5000);
})

