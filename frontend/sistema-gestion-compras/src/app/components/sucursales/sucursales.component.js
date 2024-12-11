// Seleccionar elementos del DOM
const btnSucursales = document.getElementById('btn-sucursales');
const btnClientes = document.getElementById('btn-clientes');
const sucursalesSection = document.getElementById('sucursales-section');
const clientesSection = document.getElementById('clientes-section');

// Función para alternar entre secciones
btnSucursales.addEventListener('click', () => {
    sucursalesSection.classList.remove('d-none');
    clientesSection.classList.add('d-none');
    btnSucursales.classList.add('btn-primary');
    btnSucursales.classList.remove('btn-secondary');
    btnClientes.classList.add('btn-secondary');
    btnClientes.classList.remove('btn-primary');
});

btnClientes.addEventListener('click', () => {
    clientesSection.classList.remove('d-none');
    sucursalesSection.classList.add('d-none');
    btnClientes.classList.add('btn-primary');
    btnClientes.classList.remove('btn-secondary');
    btnSucursales.classList.add('btn-secondary');
    btnSucursales.classList.remove('btn-primary');
});

// Función para cargar datos de sucursales
async function cargarSucursales() {
    try {
        const response = await fetch('https://api.example.com/sucursales'); // Reemplaza con la URL de tu backend
        const sucursales = await response.json();

        const sucursalesBody = document.getElementById('sucursales-body');
        sucursalesBody.innerHTML = ''; // Limpiar tabla

        sucursales.forEach(sucursal => {
            const row = `
        <tr>
        <td>${sucursal.nombre}</td>
        <td>${sucursal.direccion}</td>
        <td>${sucursal.ciudad}</td>
        <td>${sucursal.telefono}</td>
        <td><a href="https://www.google.com/maps?q=${sucursal.lat},${sucursal.lng}" target="_blank">Ver en Mapa</a></td>
        </tr>
    `;
            sucursalesBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error cargando sucursales:', error);
    }
}

// Función para cargar datos de clientes
async function cargarClientes() {
    try {
        const response = await fetch('https://api.example.com/clientes'); // Reemplaza con la URL de tu backend
        const clientes = await response.json();

        const clientesBody = document.getElementById('clientes-body');
        clientesBody.innerHTML = ''; // Limpiar tabla

        clientes.forEach(cliente => {
            const row = `
        <tr>
        <td>${cliente.nombre}</td>
        <td>${cliente.direccion}</td>
        <td>${cliente.ciudad}</td>
        <td>${cliente.telefono}</td>
        <td><a href="https://www.google.com/maps?q=${cliente.lat},${cliente.lng}" target="_blank">Ver en Mapa</a></td>
        </tr>
    `;
            clientesBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error cargando clientes:', error);
    }
}

// Llamar las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSucursales();
    cargarClientes();
});