const url = "http://localhost:3000/api/v1/races/";
const contenedor = document.querySelector("tbody");
let resultados = "";

const modalCarrera = new bootstrap.Modal(document.getElementById('modal_carrera'));
const form = document.getElementById("form_carrera");
const tabla = document.getElementById("tabla_consultar");
const prix = document.getElementById("prix");
const fecha = document.getElementById("fecha");
const ganador = document.getElementById("ganador");
const equipoGanador = document.getElementById("equipo_ganador");
const vueltas = document.getElementById("vueltas");
const tiempo = document.getElementById("tiempo");
const btnCrear = document.getElementById("btn_crear");

let opcion = "";

btnCrear.addEventListener("click", () => {
    prix.disabled = false;
    prix.value = "";
    fecha.value = "";
    ganador.value = "";
    equipoGanador.value = "";
    vueltas.value = "";
    tiempo.value = "";
    modalCarrera.show();
    opcion = "crear";
});

// Procedimiento Mostrar
async function mostrar() {
    const response = await fetch(url);
    const races = await response.json();

    races.forEach(race => {
        resultados += `<tr>
                            <td>${race.prix}</td>
                            <td>${race.fecha}</td>
                            <td>${race.ganador}</td>
                            <td>${race.equipo}</td>
                            <td>${race.vueltas}</td>
                            <td>${race.tiempo}</td>
                            <td class="text-center"><a class="btnEditar btn-primary">Editar</a></td>
                            <td class="text-center"><a class="btnBorrar btn-danger">Borrar</a></td>
                       </tr>`
    });
    
    contenedor.innerHTML = resultados;

}

mostrar();

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
}

on(document, "click", ".btnBorrar", e => {
    const fila = e.target.parentNode.parentNode
    const prix = fila.firstElementChild.innerHTML
    console.log(prix);

    alertify.confirm(`¿Está seguro de eliminar al prix de ${prix}.`,
    function(){
        fetch(url+`${prix}`, {
            method: "DELETE"
        })
        .then(res => res.json)
        .then( () => location.reload() )

        alertify.success('Se ha realizado la eliminación');
    },
    function(){
        alertify.error('Cancel');
    });
})

//Procedimiento editar
let prixForm = "";
on(document, "click", ".btnEditar", e => {
    const fila = e.target.parentNode.parentNode;
    const prixForm = fila.firstElementChild.innerHTML;

    const fechaForm = fila.children[1].innerHTML;
    const ganadorForm = fila.children[2].innerHTML;
    const equipoForm = fila.children[3].innerHTML;
    const vueltasForm = fila.children[4].innerHTML;
    const tiempoForm = fila.children[5].innerHTML;

    prix.disabled = true;
    prix.value = prixForm;
    fecha.value = fechaForm;
    ganador.value = ganadorForm;
    equipoGanador.value = equipoForm;
    vueltas.value = vueltasForm;
    tiempo.value = tiempoForm;
    
    opcion = "editar";

    modalCarrera.show();
})

//Crear o editar
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (opcion === "crear") {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                prix: prix.value,
                fecha: fecha.value,
                ganador: ganador.value,
                equipo: equipoGanador.value,
                vueltas: vueltas.value,
                tiempo: tiempo.value
            })
        })
        .then( response => response.json())
        .then( data => {
            const nuevaCarrera= [];
            nuevaCarrera.push(data);
            mostrar(nuevaCarrera);
            alertify.confirm(`Se ha creado una nueva carrera`,
            function(){
                alertify.success('Ok');
            })
        })
        .catch(error => console.error(error));
        
    }

    if (opcion === "editar") {
        

        fetch(url+prix.value,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                prix: prix.value,
                fecha: fecha.value,
                ganador: ganador.value,
                equipo: equipoGanador.value,
                vueltas: vueltas.value,
                tiempo: tiempo.value
            })
        })
        .then( res => res.json())
        .then( res => location.reload())
        .catch(error => console.error(error))
        
    }

    modalCarrera.hide();
})