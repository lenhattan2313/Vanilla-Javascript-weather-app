window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      let proxy = "https://cors-anywhere.herokuapp.com/";
      let api = `${proxy}https://api.darksky.net/forecast/65704c146969e9bcf8e186511faa8cde/${latitude},${longitude}`;
      fetch(api)
        .then(res => res.json())
        .then(data => {
          const {
            temperature,
            icon,
            summary,
            humidity,
            windSpeed
          } = data.currently;
          const city = data.timezone;
          console.log(icon);
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          document.querySelector(".city").textContent = city;
          document.querySelector(".temperature-degree").textContent = celsius;
          document.querySelector(".status").textContent = summary;
          setIcon(icon, document.querySelector("#icon"));
          document
            .querySelector(".degree-section")
            .addEventListener("click", () => {
              if (
                document.querySelector(".typeOfTemperature").textContent === "C"
              ) {
                document.querySelector(
                  ".temperature-degree"
                ).textContent = temperature;
                document.querySelector(".typeOfTemperature").textContent = "F";
              } else {
                document.querySelector(
                  ".temperature-degree"
                ).textContent = celsius;
                document.querySelector(".typeOfTemperature").textContent = "C";
              }
            });
        });
      function setIcon(icon, iconId) {
        let iconID = icon.replace(/-/g, "_").toUpperCase();
        const skycons = new Skycons({ color: "white" });
        skycons.play();
        return skycons.set(iconId, Skycons[iconID]);
      }
    });
  } else {
    document.querySelector(".city").textContent = "Can't find your location!";
  }
});
