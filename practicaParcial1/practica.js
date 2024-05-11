class Persona {
    id
    nombre
    apellido
    fechaNacimiento

    constructor(id, nombre, apellido, fechaNacimiento) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.fechaNacimiento = fechaNacimiento
    }

    toString() {
        return `${this.id} - ${this.nombre} ${this.apellido} (${this.fechaNacimiento})`
    }

}


//Clase Ciudadano
class Ciudadano extends Persona {
    dni
    constructor(id, nombre, apellido, fechaNacimiento, dni) {
        super(id, nombre, apellido, fechaNacimiento)
        this.dni = dni
    }

    toString() {
        return `${super.toString()} - ${this.dni}`
    }
}

//Clase Extranjero
class Extranjero extends Persona {
    paisOrigen
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {
        super(id, nombre, apellido, fechaNacimiento)
        this.paisOrigen = paisOrigen
    }

    toString() {
        return `${super.toString()} - ${this.paisOrigen}`
    }
}


// 
const personas = JSON.parse(`
[
    {"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},
    {"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},
    {"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},
    {"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},
    {"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},
    {"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}
]
`);


const resultado = personas.map(p => p.dni 
    ? new Ciudadano(parseInt(p.id), p.nombre, p.apellido, ParsearFecha(p.fechaNacimiento), p.dni) 
    : new Extranjero(parseInt(p.id), p.nombre, p.apellido, ParsearFecha(p.fechaNacimiento), p.paisOrigen))

function ParsearFecha(fecha){
    let fechaString = fecha.toString()
    return fechaString.substring(0, 4) + "-" + fechaString.substring(4, 6) + "-" + fechaString.substring(6, 8)
}


//Cargar los elementos a la TABLA HTML
let tabla = document.getElementById("tablaDatos");
let tbody = tabla.getElementsByTagName("tbody")[0];

function MostrarDatos(resultado){
    for (let i = 0; i < resultado.length; i++){
        var fila = tbody.insertRow(i);
        var celda1 = fila.insertCell(0); //ID
        var celda2 = fila.insertCell(1); //Nombre
        var celda3 = fila.insertCell(2); //Apellido
        var celda4 = fila.insertCell(3); //Fecha de Nacimiento
        var celda5 = fila.insertCell(4); //Dni
        var celda6 = fila.insertCell(5); //PaisOrigen

        celda1.innerHTML = resultado[i].id;
        celda2.innerHTML = resultado[i].nombre;
        celda3.innerHTML = resultado[i].apellido;
        celda4.innerHTML = resultado[i].fechaNacimiento;
        celda5.innerHTML = resultado[i].dni ? resultado[i].dni : "";
        celda6.innerHTML = resultado[i].paisOrigen ? resultado[i].paisOrigen : "";
    }
}

function LimpiarDatos() {
    tbody.innerHTML = '';
}

MostrarDatos(resultado)

function GenerarId(){
    let listaId = resultado.map(p => p.id)
    let randomId;
    while(true)
    {
        randomId = Math.floor(Math.random() * 999999) + 1; 
        if(!listaId.includes(randomId)){
            break
        }
    }
    document.getElementById("id").value = randomId
    console.log("ID aleatorio: ", randomId)
}

function RegistrarPersona() {
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    fechaNacimiento = fechaNacimiento.substring(0, 4) + "-" + fechaNacimiento.substring(5, 7) + "-" + fechaNacimiento.substring(8, 10);
    let dni = document.getElementById("dni").value;
    let paisOrigen = document.getElementById("paisOrigen").value;
    let valorTipo = document.getElementById("Tipo").value;

    // Validar que se ingresen todos los datos necesarios
    if (!id || !nombre || !apellido || !fechaNacimiento || (valorTipo === "Ciudadano" && (!dni || dni <= 0)) || (valorTipo === "Extranjero" && !paisOrigen)) {
        alert("Por favor, complete todos los campos obligatorios correctamente.");
        return; // Salir de la función si faltan datos o el DNI es inválido
    }

    if (valorTipo == "Ciudadano" && dni) {
        let ingresarPersona = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
        resultado.push(ingresarPersona);
    } else if (valorTipo == "Extranjero" && paisOrigen) {
        let ingresarPersona = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen);
        resultado.push(ingresarPersona);
    }
    renderData(resultado);
    addEventListener("click", MostrarFormRegistro());
    addEventListener("click", CancelarFormulario());
}

function ActualizarRegistro() {
    let id = document.getElementById("id_editar").value;
    id = parseInt(id);
    let nombre = document.getElementById("nombre_editar").value;
    let apellido = document.getElementById("apellido_editar").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento_editar").value;
    let dni = document.getElementById("dni_editar").value;
    let paisOrigen = document.getElementById("paisOrigen_editar").value;

    // Validar que se ingresen todos los datos necesarios
    if (!id || !nombre || !apellido || !fechaNacimiento || (valorTipo === "Ciudadano" && (!dni || dni <= 0)) || (valorTipo === "Extranjero" && !paisOrigen)) {
        alert("Por favor, complete todos los campos obligatorios correctamente.");
        return; // Salir de la función si faltan datos o el DNI es inválido
    }

    let ingresarPersona;
    let valorTipo = document.getElementById("Tipo_editar").value;
    if (valorTipo == "Ciudadano" && dni) {
        ingresarPersona = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
    } else if (valorTipo == "Extranjero" && paisOrigen) {
        ingresarPersona = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen);
    }

    let index = resultado.findIndex(p => p.id == id);
    if (index != -1) {
        resultado[index] = ingresarPersona;
    }

    renderData(resultado);
    addEventListener("click", MostrarActualizarRegistro());
    addEventListener("click", CancelarFormulario());
}


function ValorDeTipo(id, cajaCiudadano, cajaExtranjero){
    let nameId = document.getElementById(id)
    console.log(nameId.id)
    let tipo = document.getElementById(id).value
    console.log(tipo)
    if(tipo == "Ciudadano"){
        ModificarDisplay(cajaCiudadano, cajaExtranjero, "flex", "none")
    }
    else if(tipo == "Extranjero"){
        ModificarDisplay(cajaCiudadano, cajaExtranjero, "none", "flex")
    }
    else{
        ModificarDisplay(cajaCiudadano, cajaExtranjero, "none", "none")
    }
}

function ModificarDisplay(cajaCiudadano, cajaExtranjero, displayCiudadano, displayExtranjero){
    document.getElementById(cajaCiudadano).style.display = displayCiudadano;
    document.getElementById(cajaExtranjero).style.display = displayExtranjero;
}

// Mostrar form registro
function MostrarFormRegistro(){
    toggleElementDisplay("form_registrar");
}
MostrarFormRegistro()


// //Actualizar registro
function MostrarActualizarRegistro(){
    toggleElementDisplay("form_editar");
}
MostrarActualizarRegistro()


function MostrarElimnarRegistro(){
    toggleElementDisplay("form_eliminar");
}
MostrarElimnarRegistro()

// Función para mostrar u ocultar un elemento basado en su ID
function toggleElementDisplay(elementId) {
    let element = document.getElementById(elementId);
    if (element.style.display === "none") {
        element.style.display = "flex";
        if(elementId == "form_registrar"){
            GenerarId()
            document.getElementById("tablaDatos").style.display = "none";
            document.getElementById("form_editar").style.display = "flex";
            document.getElementById("form_eliminar").style.display = "flex";
        }
    } else {
        element.style.display = "none";
    }
}

function CancelarFormulario(){
    document.getElementById("form_registrar").style.display = "none";
    document.getElementById("form_editar").style.display = "none";
    document.getElementById("form_eliminar").style.display = "none";
    document.getElementById("tablaDatos").style.display = "table";
}

// // Función para limpiar y mostrar datos en la tabla
function renderData(data) {
    LimpiarDatos();
    CancelarFormulario()
    MostrarDatos(data);
}

// //------------------



function EliminarRegistro(){
    let id = document.getElementById("id_eliminar").value
    id = parseInt(id)
    let index = resultado.findIndex(p => p.id == id)
    if(index != -1){
        resultado.splice(index, 1)
    }
    renderData(resultado)
    addEventListener("click",MostrarElimnarRegistro())
    addEventListener("click", CancelarFormulario());
    
}


// // Checkboxes

function handleCheckboxChange(index) {
    let tabla = document.getElementById("tablaDatos");
    let checkboxes = document.querySelectorAll(".caja_checkbox input[type=checkbox]");
  
    let checkbox = checkboxes[index];
    let columna = tabla.rows[0].cells[index]; // Encabezado de la columna, la i es la columna
    if (checkbox.checked) {
        columna.style.display = "table-cell";
    } else {
        columna.style.display = "none";
    }

    for (let i = 0; i < resultado.length; i++){
        let fila = tbody.rows[i];
        let celda = fila.cells[index];
        if (checkboxes[index].checked) {
            celda.style.display = "table-cell";
        } else {
            celda.style.display = "none";
        }
    }

}

let checkboxes = document.querySelectorAll(".caja_checkbox input[type=checkbox]")
checkboxes.forEach(function(checkbox) {
    checkbox.checked = true; 
});


// //Filtrar por tipo
function FiltrarPorTipo(){
    let tipo = document.getElementById("filtrar").value

    if(tipo == "Todos"){
        renderData(resultado)
        return
    }
    let listaFiltrada = resultado.filter(p => p.constructor.name == tipo)
    renderData(listaFiltrada)

}

// Calcular el promedio de edad del tipo seleccionado
function CalcularPromedioEdad(){
    let tipo = document.getElementById("filtrar").value
    let promedio;
    if(tipo == "Todos"){
        promedio = resultado.reduce((acc, p) => acc + calcularEdad(p.fechaNacimiento), 0) / resultado.length
    }
    else{
        let listaFiltrada = resultado.filter(p => p.constructor.name == tipo)
        promedio = listaFiltrada.reduce((acc, p) => acc + calcularEdad(p.fechaNacimiento), 0) / listaFiltrada.length
    }
    document.getElementById("promedio").value = promedio.toFixed(1)

}

function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let cumpleaños = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleaños.getFullYear();
    let mesActual = hoy.getMonth();
    let mesCumpleaños = cumpleaños.getMonth();

    // Verificar si todavía no ha pasado el cumpleaños de este año
    if (mesActual < mesCumpleaños || (mesActual === mesCumpleaños && hoy.getDate() < cumpleaños.getDate())) {
        edad--;
    }

    return edad;
}


//
document.addEventListener("DOMContentLoaded", function() {
    // Obtener todas las celdas de la columna ID
    let idCells = document.querySelectorAll(".tabla_datos tbody td:first-child");

    // Agregar un controlador de eventos de clic a cada celda de ID
    idCells.forEach(function(cell) {
        cell.addEventListener("click", function() {
            // Obtener el valor de la celda clicada
            let idValue = cell.textContent;
            // Mostrar el valor en la consola (puedes hacer lo que desees con él)
            console.log("Valor de la celda ID:", idValue);
            document.getElementById("id_editar").value = idValue
            document.getElementById("id_eliminar").value = idValue

        });
    });
});


//Dudodo forma de ordenar
let ascending = true; // Variable global para rastrear el orden ascendente/descendente

function ordenarPorColumna(columna) {
    let table = document.getElementById("tablaDatos");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));

    rows.sort((a, b) => {
        let aValue = a.getElementsByTagName("td")[columna].innerText.toLowerCase();
        let bValue = b.getElementsByTagName("td")[columna].innerText.toLowerCase();
        
        if (isNaN(aValue)) {
            return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
            return ascending ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
        }
    });

    // Reordenar las filas en el tbody según el orden determinado
    rows.forEach(row => tbody.appendChild(row));

    // Cambiar la dirección de ordenamiento para la próxima vez que se haga clic
    ascending = !ascending;
}

