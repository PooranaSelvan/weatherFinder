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
    console.log(data);
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

  // Display location Name
  const location = data.location;
  const locationInfo = `
    <h3 class="text-2xl font-bold mb-2 text-gray-900">Location</h3>
    <p class="text-lg mb-2 text-gray-700"><strong>Name:</strong> ${location.name}</p>
  `;
  results.innerHTML += locationInfo;

  
  const forecasts = data.timelines.daily;
  forecasts.forEach(forecast => {
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'm-4', 'transition-transform', 'transform', 'hover:scale-105');
    
    // console.log(forecast.values)
    const temperature = forecast.values.temperatureAvg || 'N/A'; // Adjust according to the actual field name
    const condition = forecast.values.windDirectionAvg || 'N/A'; // Adjust according to the actual field name

    const date = new Date(forecast.time).toLocaleDateString();
    forecastCard.innerHTML = `
      <h3 class="text-2xl font-bold mb-2 text-gray-900">Weather Forecast on ${date}</h3>
      <h5 class="text-lg mb-2 text-gray-700"><strong>Temperature:</strong> ${temperature}°C</h5>
      <h5 class="text-lg mb-2 text-gray-700"><strong>Condition:</strong> ${condition}</h5>
      <h5 class="text-lg mb-2 text-gray-700"><strong>Humidity:</strong> ${forecast.values.humidityAvg}</h5>
    `;

    results.appendChild(forecastCard);
  });
}
