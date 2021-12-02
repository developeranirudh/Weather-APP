const loc = document.querySelector(".location");
const displaytime = document.querySelector("#time");
const icon = document.querySelector("#icon");
const minmax = document.querySelector("#minmax");
const background = document.body;
const temp = document.querySelector("#temp");
const con = document.querySelector("#conditions");
///function for Calling api
function weather(value) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=5babc5498e87eb8a8514cf59bf97d03d`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ///adding Location
      const country = data.sys.country;
      const place = data.name;
      loc.innerHTML = `${place},${country}`;


      //create date  time with time zone of that place
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=63e0ba773c1f48cab08fb5207ed83498`
      )
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          const timezone = resp.results[0].annotations.timezone.name;
          const dateandtime = new Date().toLocaleString("en-US", {
            timeZone: timezone,
          });
          let hours = new Date(dateandtime).getHours();
          let h = new Date(dateandtime).getHours();
          let mins = new Date(dateandtime).getMinutes();
          const date = new Date(dateandtime);
          let day;
          switch (date.getDay()) {
            case 1:
              day = "Mon";
              break;
            case 2:
              day = "Tue";
              break;
            case 3:
              day = "Wed";
              break;
            case 4:
              day = "Thu";
              break;
            case 5:
              day = "Fri";
              break;
            case 6:
              day = "Sat";
              break;
            case 0:
              day = "Sun";
              break;
          }
          console.log(day);
          // console.log(h);
          let periods;
          if (h > 11) {
            periods = "PM";
          } else {
            periods = "AM";
          }
          if (h > 12) {
            h -= 12;
          }
          if (mins < 10) {
            mins = "0" + mins;
          }
          const time = `${date.getDate()}||${day}||${h}:${mins}${periods}`;
          displaytime.innerHTML = time;
          //adding icon
          icon.innerHTML = " ";
          const condition = data.weather[0].main.toLowerCase();
          if (condition === "clear"&&(hours > 19 || hours < 6)) {   
              icon.innerHTML = `<img src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-night-weather-justicon-flat-justicon-2.png"/>`;
          }
         else if (condition === "clear") {
            icon.innerHTML = `<img src='https://img.icons8.com/color/80/000000/sun--v2.png'/>`;
          } else if (condition === "mist") {
            icon.innerHTML = `<img src="https://img.icons8.com/dusk/64/000000/foggy-night-1.png"/>`;
          } else {
            icon.innerHTML = `<img src='https://img.icons8.com/color/80/000000/${condition}--v2.png'/>`;
          }
          //adding background image
          if (condition === "clear"&&(hours > 19 || hours < 6)){
              background.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1574723507225-6d4bdb5707be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80')";
            }
          else if (condition === "clear") {
            background.style.backgroundImage =
              "url('https://images.pexels.com/photos/592658/pexels-photo-592658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
          } else if (condition === "haze") {
            background.style.backgroundImage =
              "url('https://images.unsplash.com/36/STzPBJUsSza3mzUxiplj_DSC09775.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=742&q=80')";
          } else if (condition === "rain") {
            background.style.backgroundImage =
              "url('https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80')";
          } else if (condition === "clouds") {
            background.style.backgroundImage =
              "url('https://images.unsplash.com/photo-1530743373890-f3c506b0b5b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80')";
          } else if (condition === "mist") {
            background.style.backgroundImage =
              "url('https://images.unsplash.com/photo-1575918748665-fbade67a07ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')";
          } else if (condition === "snow") {
            background.style.backgroundImage =
              "url('https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
          }
          con.innerHTML = `${condition}`;
        });
      //converting kel to celsius & adding
      const kel = data.main.temp;
      celsius = parseInt(kel - 273.15);
      temp.innerHTML = `${celsius}&#8451`;
      const minkel = data.main.temp_min;
      const maxkel = data.main.temp_max;
      const mincel = parseInt(minkel - 273.15);
      const maxcel = parseInt(maxkel - 273.15);
      minmax.innerHTML = `${mincel}&#8451(min)|${maxcel}&#8451(max)`;
    }) //error message
    .catch((err) => {
      alert(
        "SomeThing Went Wrong🚨,Please Enter Some Value😎 Or Correct Value🚦"
      );
    });
    
}
//calling function with eventlistener
const button = document
  .querySelector("button")
  .addEventListener("click", () => {
    const value = document.querySelector(".value").value;
    weather(value);
  });

document.addEventListener("keypress", (e) => {
  const key = e.key;
  if (key === "Enter") {
    const value = document.querySelector(".value").value;
    weather(value);
  }
});
function finduserlocation() {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      const logitude = success.coords.longitude;
      const latitude = success.coords.latitude;
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${logitude}&key=63e0ba773c1f48cab08fb5207ed83498`
      )
        .then((data) => {
          return data.json();
        })
        .then((results) => {
          const location = results.results[0].components.state;
          weather(location);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (error) => {
      console.log(error);
    }
  );
}
finduserlocation();
