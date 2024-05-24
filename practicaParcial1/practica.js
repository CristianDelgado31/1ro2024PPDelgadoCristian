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
    document.getElementById("id_registrar").value = randomId
    console.log("ID aleatorio: ", randomId)
}

function RegistrarPersona() {
    let id = document.getElementById("id_registrar").value;
    let nombre = document.getElementById("nombre_registrar").value;
    let apellido = document.getElementById("apellido_registrar").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento_registrar").value;
    fechaNacimiento = fechaNacimiento.substring(0, 4) + "-" + fechaNacimiento.substring(5, 7) + "-" + fechaNacimiento.substring(8, 10);
    let dni = document.getElementById("dni_registrar").value;
    let paisOrigen = document.getElementById("paisOrigen_registrar").value;
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
    addEventListener("click", MostrarFormularios());
    addEventListener("click", CancelarFormulario());
}

function ActualizarRegistro() {
    let id = document.getElementById("id_editar").value;
    id = parseInt(id);
    console.log(id)
    let nombre = document.getElementById("nombre_editar").value;
    let apellido = document.getElementById("apellido_editar").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento_editar").value;
    let dni = document.getElementById("dni_editar").value;
    let paisOrigen = document.getElementById("paisOrigen_editar").value;
    let valorTipo = document.getElementById("Tipo_editar").value;
    // Validar que se ingresen todos los datos necesarios
    if (!id || !nombre || !apellido || !fechaNacimiento || (valorTipo === "Ciudadano" && (!dni || dni <= 0)) || (valorTipo === "Extranjero" && !paisOrigen)) {
        alert("Por favor, complete todos los campos obligatorios correctamente.");
        return; // Salir de la función si faltan datos o el DNI es inválido
    }

    let ingresarPersona;
    if (valorTipo == "Ciudadano" && dni) {
        ingresarPersona = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
        document.getElementById("caja_ciudadano_editar").style.display = "none";
    } else if (valorTipo == "Extranjero" && paisOrigen) {
        ingresarPersona = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen);
        document.getElementById("caja_extranjero_editar").style.display = "none";
    }

    let index = resultado.findIndex(p => p.id == id);
    if (index != -1) {
        resultado[index] = ingresarPersona;
    }

    renderData(resultado);
    // addEventListener("click", MostrarActualizarRegistro());
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
function MostrarFormularios(){
    let element = document.getElementById("form_registrar");
    if (element.style.display === "none") {
        element.style.display = "flex";
        document.getElementById("tablaDatos").style.display = "none";
        document.getElementById("form_editar").style.display = "flex";
        document.getElementById("form_eliminar").style.display = "flex";
        document.getElementById("btnAgregar").style.display = "none";
        document.getElementById("btnCancelar").style.display = "flex";
        GenerarId()
    } else {
        element.style.display = "none";
    }
    
}
MostrarFormularios()



function CancelarFormulario(){
    document.getElementById("form_registrar").style.display = "none";
    document.getElementById("form_editar").style.display = "none";
    document.getElementById("form_eliminar").style.display = "none";
    document.getElementById("tablaDatos").style.display = "table";
    document.getElementById("btnCancelar").style.display = "none";
    document.getElementById("btnAgregar").style.display = "flex";
    document.getElementById("form_editar").reset(); // Limpiar el formulario
    document.getElementById("form_eliminar").reset();
}

// // Función para limpiar y mostrar datos en la tabla
function renderData(data) {
    LimpiarDatos();
    CancelarFormulario()
    MostrarDatos(data);
}

// //------------------



function EliminarRegistro(){
    let id = document.getElementById("id_eliminar").value;
    id = parseInt(id);
    let nombre = document.getElementById("nombre_eliminar").value;
    let apellido = document.getElementById("apellido_eliminar").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento_eliminar").value;
    let dni = document.getElementById("dni_eliminar").value;
    let paisOrigen = document.getElementById("paisOrigen_eliminar").value;

    if(!id){
        alert("Por favor, seleccione un registro a eliminar");
        return;
    }

    let index = resultado.findIndex(p => p.id == id);
    let persona = resultado[index];
    console.log(persona)

    let mensajeError = "No se pudo eliminar el registro";

    if(persona.id == id && persona.nombre == nombre && persona.apellido == apellido && persona.fechaNacimiento == fechaNacimiento){
        if(persona.constructor.name == "Ciudadano"){
            if(persona.dni == dni){
                resultado.splice(index, 1); // Esto elimina el elemento en la posición index
                renderData(resultado);
            }
            else {
                alert(mensajeError);
            }
        }
        else if(persona.constructor.name == "Extranjero"){
            if(persona.paisOrigen == paisOrigen){
                resultado.splice(index, 1);
                renderData(resultado);
            }
            else {
                alert(mensajeError);
            }
            
        }
    }
    else{
        alert(mensajeError);
    }

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

// Volver a registrar los eventos para los doble clics
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el tbody de la tabla
    let tbody = document.querySelector("#tablaDatos tbody");

    // Agregar un controlador de eventos de doble clic al tbody
    tbody.addEventListener("dblclick", function(event) {
        // Verificar si el clic ocurrió en una fila (tr)
        let fila = event.target.closest("tr"); // Devuelve el elemento más cercano que es un tr
        if (fila) {
            // Obtener el valor de la celda ID de la fila
            let idValue = fila.firstChild.textContent;
            // Realizar acciones aquí cuando se haga doble clic en una fila
            let persona = resultado.find(p => p.id == idValue);

            // Elimina el registro
            document.getElementById("id_eliminar").value = persona.id;
            document.getElementById("nombre_eliminar").value = persona.nombre;
            document.getElementById("apellido_eliminar").value = persona.apellido;
            document.getElementById("fechaNacimiento_eliminar").value = persona.fechaNacimiento;
            if(persona.constructor.name == "Ciudadano"){
                document.getElementById("dni_eliminar").value = persona.dni ? persona.dni : "";
            }
            else {
                document.getElementById("paisOrigen_eliminar").value = persona.paisOrigen ? persona.paisOrigen : "";
            }
            document.getElementById("Tipo_eliminar").value = persona.constructor.name;
            // MostrarElimnarRegistro();
            
            if(persona.constructor.name == "Ciudadano"){
                ModificarDisplay("caja_ciudadano_eliminar", "caja_extranjero_eliminar", "flex", "none");
            }
            else if(persona.constructor.name == "Extranjero"){
                ModificarDisplay("caja_ciudadano_eliminar", "caja_extranjero_eliminar", "none", "flex");
            }
            // Edita el registro
            document.getElementById("id_editar").value = persona.id;
            document.getElementById("nombre_editar").value = persona.nombre;
            document.getElementById("apellido_editar").value = persona.apellido;
            document.getElementById("fechaNacimiento_editar").value = persona.fechaNacimiento;
            if(persona.constructor.name == "Ciudadano"){
                document.getElementById("dni_editar").value = persona.dni ? persona.dni : "";
            }
            else {
                document.getElementById("paisOrigen_editar").value = persona.paisOrigen ? persona.paisOrigen : "";
            }
            document.getElementById("Tipo_editar").value = persona.constructor.name;
            MostrarFormularios();
            
            if(persona.constructor.name == "Ciudadano"){
                ModificarDisplay("caja_ciudadano_editar", "caja_extranjero_editar", "flex", "none");
            }
            else if(persona.constructor.name == "Extranjero"){
                ModificarDisplay("caja_ciudadano_editar", "caja_extranjero_editar", "none", "flex");
            }
            console.log("Se hizo doble clic en la fila:", idValue);
        }
    });
});



//ordenamiento
let ascending = true; // Variable para rastrear el orden ascendente/descendente

function ordenarPorColumna(column) {
    let table = document.getElementById("tablaDatos");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));

    let filterType = document.getElementById("filtrar").value;

    if(filterType == "Ciudadano" && column == 5 || filterType == "Extranjero" && column == 4){
        return
    }

    // Ordenar las filas según el contenido de la columna seleccionada
    rows.sort((a, b) => {
        let aValue = a.getElementsByTagName("td")[column].innerText.trim();
        let bValue = b.getElementsByTagName("td")[column].innerText.trim();

        // Manejar valores vacíos o nulos
        if (!aValue) return ascending ? 1 : -1;
        if (!bValue) return ascending ? -1 : 1;

        // Intentar convertir a número
        let aNumber = parseFloat(aValue);
        let bNumber = parseFloat(bValue);

        if (!isNaN(aNumber) && !isNaN(bNumber)) {
            // Si ambos son números, comparar como números
            return ascending ? aNumber - bNumber : bNumber - aNumber;
        } else {
            // Si no son números, comparar como cadenas
            if (aValue < bValue) {
                return ascending ? -1 : 1;
            }
            if (aValue > bValue) {
                return ascending ? 1 : -1;
            }
            return 0;
        }
    });

    // Reordenar las filas en el tbody según el orden determinado
    rows.forEach(row => tbody.appendChild(row));

    // Cambiar la dirección de ordenamiento para la próxima vez que se haga clic
    ascending = !ascending;
}


