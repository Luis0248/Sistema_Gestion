const devoluciones = [
    { producto: 'Teclado mecánico', motivo: 'Producto defectuoso', estado: 'Pendiente', fecha: '01/12/2024' },
    { producto: 'Audífonos', motivo: 'No me gusta', estado: 'Aprobada', fecha: '02/12/2024' }
];

const inventario = [
    { nombre: 'Teclado mecánico', estado: 'En stock' },
    { nombre: 'Audífonos', estado: 'No disponible' }
];

const reportes = [
    { producto: 'Teclado mecánico', motivo: 'Producto defectuoso', estado: 'Aprobada', fecha: '01/12/2024', cantidad: 1 },
    { producto: 'Audífonos', motivo: 'No me gusta', estado: 'Rechazada', fecha: '02/12/2024', cantidad: 2 }
];

function switchView(view) {
    document.getElementById('devoluciones-section').classList.add('d-none');
    document.getElementById('inventario-section').classList.add('d-none');
    document.getElementById('reportes-section').classList.add('d-none');

    document.getElementById(`${view}-section`).classList.remove('d-none');


    if (view === 'devoluciones') loadDevoluciones();
    if (view === 'inventario') loadInventario();
    if (view === 'reportes') loadReportes();
}

function loadDevoluciones() {
    const table = document.getElementById('devoluciones-table');
    table.innerHTML = '';
    devoluciones.forEach(item => {
        table.innerHTML += `
        <tr>
        <td>${item.producto}</td>
        <td>${item.motivo}</td>
        <td>${item.estado}</td>
        <td>${item.fecha}</td>
        <td>
            ${item.estado === 'Pendiente' ? '<button class="btn btn-primary">Ver detalles</button>' : ''}
            ${item.estado === 'Aprobada' ? '<button class="btn btn-success">Procesar devolución</button>' : ''}
        </td>
        </tr>
    `;
    });
}

function loadInventario() {
    const table = document.getElementById('inventario-table');
    table.innerHTML = '';
    inventario.forEach(item => {
        table.innerHTML += `
        <tr>
        <td>${item.nombre}</td>
        <td>${item.estado}</td>
        <td>
            ${item.estado === 'En stock' ? '<button class="btn btn-warning">Restablecer cantidad</button>' : ''}
            ${item.estado === 'No disponible' ? '<button class="btn btn-danger">Aceptar devolución</button>' : ''}
        </td>
        </tr>
    `;
    });
}

function loadReportes() {
    const table = document.getElementById('reportes-table');
    table.innerHTML = '';
    reportes.forEach(item => {
        table.innerHTML += `
        <tr>
        <td>${item.producto}</td>
        <td>${item.motivo}</td>
        <td>${item.estado}</td>
        <td>${item.fecha}</td>
        <td>${item.cantidad}</td>
        </tr>
    `;
    });
}

// Inicialización
switchView('devoluciones');