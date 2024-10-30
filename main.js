console.log("connected");

//variable to store value from search input
let city = "nigeria";

//assigning days
const date = new Date();
const day = date.getDay();

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const upcomingDaysCards = document.querySelectorAll(".upcoming-days-card");

console.log("Today is " + weekday[day] + " btw.");

async function fetchWeatherData(location) {
  //const apiKey = "LEGCF2F4CGZC2HDWQ6RL9AZ23";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`,
      { mode: "cors" }
    );
    const data = await response.json();

    // Assign variables and update DOM

    //information for main column on the left

    document.getElementById("icon").src =
      "assets/weather-icons/" + data.days[0].icon + ".svg";

    document.getElementById("temp").innerText = data.days[0].temp + " °c";

    document.getElementById("description").innerText = data.description;

    document.getElementById("datetime").innerText = data.days[0].datetime;

    document.getElementById("resolvedAddress").innerText = data.resolvedAddress;

    //information for the next 6 days on the weather forecast card
    //looping through each card

    upcomingDaysCards.forEach((card, index) => {
      if (data.days[index + 1]) {
        const dayIndex = (day + index + 1) % 7;
        const dayName = weekday[dayIndex];

        // Looping through weekly forcast cards

        card.querySelector(".day-name").innerText = dayName;
        card.querySelector(".weather-icon").src =
          "assets/weather-icons/" + data.days[index + 1].icon + ".svg";
        card.querySelector(".temperature").innerText =
          data.days[index + 1].temp + " °C";
      } else {
        console.warn(`Data for day ${weekday[index + 1]} is missing`);
      }
    });

    //Wind
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call the async function
fetchWeatherData(city);

// async function fetchLocationImage(location) {
//   const apiKey = "9caRb20kCPktHlMAfCpuq1K0vU_BvOkVpLxyQ4Y8OEw";
//   try {
//     const response = await fetch(
//       `https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`
//     );
//     const data = await response.json();
//     const imageUrl = data.results[0]?.urls?.regular; // Select the first image

//     if (imageUrl) {
//       document.querySelector("#location-image").src = imageUrl; // Assuming you have an <img id="location-image">
//     } else {
//       console.error("No image found for the specified location.");
//     }
//   } catch (error) {
//     console.error("Error fetching location image:", error);
//   }
// }

// // Example usage
// fetchLocationImage(city + "+city");

console.log("The bottom was reached.");
