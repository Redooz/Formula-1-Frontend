const prixSelect = document.getElementById("prix_select");
const table = document.getElementById("tabla_consultar");

const getRacesAPI = "http://localhost:3000/api/v1/races";

let getRaceAPI = "";

async function getRacesAndFillTableAndPrixSelect(url) {
    const tableBody = table.querySelector("tbody");
    

    const response = await fetch(url);
    const races = await response.json();

    console.log(races[0]);

    //Limpiar tabla
    tableBody.innerHTML = "";
    
    for (let i = 0; i < races.length; i++) {
        const obj = Object.values(races[i]);
        const rowElement = document.createElement("tr");
        
        for (const cellText of obj) {
            const cellElement = document.createElement("td");
            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }

    races.forEach(race => {
        const selectOption = document.createElement("option")
        selectOption.textContent = race.prix;
        selectOption.value = race.prix;

        prixSelect.appendChild(selectOption);
    });

    
}

async function getRaceAndFillTable(url) {
    
    const tableBody = table.querySelector("tbody");

    const response = await fetch(url);
    const races = await response.json();

    console.log(races[0]);

    //Limpiar tabla
    tableBody.innerHTML = "";
    
    for (let i = 0; i < races.length; i++) {
        const obj = Object.values(races[i]);
        const rowElement = document.createElement("tr");
        
        for (const cellText of obj) {
            const cellElement = document.createElement("td");
            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }

}

prixSelect.onchange = () => {
    getRaceAPI = `http://localhost:3000/api/v1/races/${prixSelect.value}`;
    getRaceAndFillTable(getRaceAPI,table);
}

getRacesAndFillTableAndPrixSelect(getRacesAPI,document.getElementById("tabla_consultar"));