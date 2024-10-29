console.log("connected");
joijk;
let city = "dubai";
async function fetchWeatherData(location) {
  const apiKey = "K3JLS4FK6PRW6GNG3X2VLAK83";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`,
      { mode: "cors" }
    );
    const data = await response.json();

    // Assign variables and update DOM
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#temperature").innerHTML =
      data.currentConditions.temp;
    document.querySelector("#humidity").innerHTML =
      data.currentConditions.humidity;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call the async function
fetchWeatherData(city);

async function fetchLocationImage(location) {
  const apiKey = "9caRb20kCPktHlMAfCpuq1K0vU_BvOkVpLxyQ4Y8OEw";
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`
    );
    const data = await response.json();
    const imageUrl = data.results[0]?.urls?.regular; // Select the first image

    if (imageUrl) {
      document.querySelector("#location-image").src = imageUrl; // Assuming you have an <img id="location-image">
    } else {
      console.error("No image found for the specified location.");
    }
  } catch (error) {
    console.error("Error fetching location image:", error);
  }
}

// Example usage
fetchLocationImage(city + "+city");
