// URL de la API de Fórmula 1 (Ergast Developer API)
const API_URL = 'https://ergast.com/api/f1/2023/drivers.json';

// Mapeo de colores de equipos (simplificado)
const TEAM_COLORS = {
    "Red Bull": "#0600ef",
    "Ferrari": "#e10600",
    "Mercedes": "#00d2be",
    "Alpine": "#0090ff",
    "McLaren": "#ff8700",
    "Aston Martin": "#006f62",
    "Alfa Romeo": "#900000",
    "Haas": "#ffffff",
    "AlphaTauri": "#2b4562",
    "Williams": "#005aff"
};

// Elementos del DOM
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

// Función para mostrar los pilotos en el contenedor
function displayDrivers(drivers) {
    // Limpiar el contenedor antes de mostrar nuevos datos
    dataContainer.innerHTML = '';
    
    // Verificar si hay pilotos
    if (!drivers || drivers.length === 0) {
        dataContainer.innerHTML = '<p class="loading">No se encontraron datos de pilotos.</p>';
        return;
    }
    
    // Ordenar pilotos por número
    drivers.sort((a, b) => a.permanentNumber - b.permanentNumber);
    
    // Crear una tarjeta para cada piloto
    drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card';
        
        // Obtener color del equipo
        const teamColor = TEAM_COLORS[driver.Constructor.name] || "#cccccc";
        
        driverCard.innerHTML = `
            <h3>
                <span class="driver-number">${driver.permanentNumber}</span>
                ${driver.givenName} ${driver.familyName}
            </h3>
            <p>
                <span class="team-color" style="background-color: ${teamColor}"></span>
                <strong>Equipo:</strong> ${driver.Constructor.name}
            </p>
            <p><strong>Nacionalidad:</strong> ${driver.nationality}</p>
            <p><strong>Fecha de nacimiento:</strong> ${driver.dateOfBirth}</p>
            <p><strong>Código:</strong> ${driver.code || 'N/A'}</p>
            <p><a href="${driver.url}" target="_blank">Más información</a></p>
        `;
        
        dataContainer.appendChild(driverCard);
    });
}

// Función para manejar errores
function handleError(error) {
    console.error('Error:', error);
    dataContainer.innerHTML = `
        <p class="loading" style="color: #e10600;">
            Error al obtener los datos: ${error.message}
        </p>
    `;
}

// Mostrar estado de carga
function showLoading() {
    dataContainer.innerHTML = '<p class="loading">Cargando datos...</p>';
}

// Obtener pilotos con Fetch
async function getDriversWithFetch() {
    showLoading();
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers.map(driver => {
            return {
                ...driver,
                Constructor: {
                    name: data.MRData.DriverTable.Drivers.find(d => d.driverId === driver.driverId)?.Constructor?.name || "Desconocido"
                }
            };
        });
        displayDrivers(drivers);
    } catch (error) {
        handleError(error);
    }
}

// Obtener pilotos con Axios
async function getDriversWithAxios() {
    showLoading();
    try {
        const response = await axios.get(API_URL);
        const drivers = response.data.MRData.DriverTable.Drivers.map(driver => {
            return {
                ...driver,
                Constructor: {
                    name: response.data.MRData.DriverTable.Drivers.find(d => d.driverId === driver.driverId)?.Constructor?.name || "Desconocido"
                }
            };
        });
        displayDrivers(drivers);
    } catch (error) {
        handleError(error);
    }
}

// Event listeners para los botones
fetchBtn.addEventListener('click', getDriversWithFetch);
axiosBtn.addEventListener('click', getDriversWithAxios);