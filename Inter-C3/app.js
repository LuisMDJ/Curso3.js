const API_URL = 'https://ergast.com/api/f1/2023/drivers.json';
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

const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

function displayDrivers(drivers) {
    dataContainer.innerHTML = '';
    if (!drivers || drivers.length === 0) {
        dataContainer.innerHTML = '<p class="loading">No se encontraron datos de pilotos.</p>';
        return;
    }
    drivers.sort((a, b) => a.permanentNumber - b.permanentNumber);
    drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card';
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
function handleError(error) {
    console.error('Error:', error);
    dataContainer.innerHTML = `
        <p class="loading" style="color: #e10600;">
            Error al obtener los datos: ${error.message}
        </p>
    `;
}
function showLoading() {
    dataContainer.innerHTML = '<p class="loading">Cargando datos...</p>';
}

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

fetchBtn.addEventListener('click', getDriversWithFetch);
axiosBtn.addEventListener('click', getDriversWithAxios);
