const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const input = searchInput.value.trim().toLowerCase(); // Get user input
  if (!input) {
    alert('Please enter a valid location.');
    return;
  }

  try {
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${input}&apikey=ziV4EkN09dJ3EbtwLWM1jjkz1OYGIogR`);
    const data = await response.json();
    // console.log(data);
    displayResults(data);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    results.innerHTML = '<p>Please try again later.</p>';
  }
});



function displayResults(data) {
  results.innerHTML = ""; // Clear previous results

  if (!data || !data.location || !data.timelines || !data.timelines.daily || data.timelines.daily.length === 0) {
    results.innerHTML = "<p>No weather data found.</p>";
    return;
  }

  const location = data.location.name
  const forecasts = data.timelines.daily;
  forecasts.forEach(forecast => {
    const forecastCard = document.createElement('div');
    
    // console.log(forecast.values)
    const temperature = forecast.values.temperatureAvg || 'N/A'; // Adjust according to the actual field name
    const wind = forecast.values.windDirectionAvg != null
    ? (forecast.values.windDirectionAvg * 1).toFixed(2) + ' km/h'  // Replace * 1 with actual conversion if needed
    : 'N/A';

    const humidity = forecast.values.humidityAvg != null
    ? forecast.values.humidityAvg.toFixed(2) + '%'
    : 'N/A';

    const date = new Date(forecast.time).toLocaleDateString();
    // console.log(forecast)
    const name = location
    forecastCard.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">${name}</h1>
        <div class="flex flex-col items-center mb-4">
            <span class="text-6xl font-bold text-gray-800">${temperature}F</span>
            <div class="flex items-center mt-2">
                <svg class="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                </svg>
            </div>
        </div>
        <div class="flex justify-between text-gray-600 mb-4">
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <span>Humidity: ${humidity}</span>
            </div>
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <span>Wind: ${wind}</span>
            </div>
        </div>
        <div class="text-center text-gray-500 text-sm">
            Date: <span id="lastUpdated">${date}</span>
        </div>
    </div>
    `;

    results.appendChild(forecastCard);
  });
}
