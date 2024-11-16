// Calculadora de Calorías
document.getElementById("calorie-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const activityLevel = parseFloat(document.getElementById("activity-level").value);

    if (weight && height && age && activityLevel) {
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Fórmula para hombres
        const totalCalories = bmr * activityLevel;
        document.getElementById("calorie-result").textContent = 
            `Tu ingesta diaria recomendada es aproximadamente ${Math.round(totalCalories)} calorías.`;
    } else {
        document.getElementById("calorie-result").textContent = 
            "Por favor, completa todos los campos correctamente.";
    }
});

// Globo Terráqueo Interactivo
const globe = Globe()
    (document.getElementById('globe')) // Vincula el globo al contenedor #globe
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Textura de la Tierra
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png'); // Fondo del cielo nocturno

// Carga de datos de países
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(countries => {
        const countryList = countries.map(country => ({
            lat: country.latlng[0],
            lng: country.latlng[1],
            name: country.name.common
        }));

        // Punto de vista inicial del globo
        globe.pointOfView({ lat: 0, lng: 0, altitude: 2 });

        // Evento de clic para enfocar un país aleatorio
        document.getElementById("globe").addEventListener("click", () => {
            const selectedCountry = countryList[Math.floor(Math.random() * countryList.length)];
            globe.pointOfView({ lat: selectedCountry.lat, lng: selectedCountry.lng, altitude: 1.5 });

            // Obtención de la hora actual del país seleccionado
            fetch(`https://worldtimeapi.org/api/timezone/Etc/UTC`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById("country-time").textContent = 
                        `Hora actual en ${selectedCountry.name}: ${new Date(data.datetime).toLocaleTimeString()}`;
                })
                .catch(() => {
                    document.getElementById("country-time").textContent = 
                        `No se pudo obtener la hora para ${selectedCountry.name}.`;
                });
        });
    })
    .catch(error => {
        console.error("Error cargando los datos del globo:", error);
    });
