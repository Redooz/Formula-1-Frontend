const url = "http://localhost:3000/api/v1";
const contenedor = document.getElementById("tabla_consultar");
let resultados = "";

const modalCarrera = new bootstrap.Modal(document.getElementById('modal_carrera'));
const form = document.getElementById("form_carrera");
const prix = document.getElementById("prix");
const fecha = document.getElementById("fecha");
const ganador = document.getElementById("ganador");
const equipoGanador = document.getElementById("equipo_ganador");
const vueltas = document.getElementById("vueltas");
const tiempo = document.getElementById("tiempo");
const btnCrear = document.getElementById("btn_crear");

let opcion = "";

btnCrear.addEventListener("click", () => {
    prix.value = "";
    fecha.value = "";
    ganador.value = "";
    equipoGanador.value = "";
    vueltas.value = "";
    tiempo.value = "";

    modalCarrera.show();
});

// Procedimiento Mostrar
async function mostrar() {
    const response = await fetch(url+"/races");
    const races = await response.json();

    races.forEach(race => {
        resultados += `<tr>
                            <td>${race.prix}</td>
                            <td>${race.fecha}</td>
                            <td>${race.ganador}</td>
                            <td>${race.equipo}</td>
                            <td>${race.tiempo}</td>
                            <td class="text-center"><a class="btnEditar btn-primary">Editar</a></td>
                            <td class="text-center"><a class="btnBorrar btn-danger">Borrar</a></td>
                       </tr>`
    });
    
    contenedor.innerHTML = resultados;
                
}

mostrar();