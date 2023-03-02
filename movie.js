const inputField = document.querySelector("#search-input");

inputField.addEventListener("keypress", (event) => {
  var code = event.keyCode ? event.keyCode : event.which;
  if (code == 13) {
    //Enter keycode
    console.log(inputField.value);

    const searchTerm = inputField.value;

    showLoader();

    const moviePromise = fetch(
      "http://www.omdbapi.com/?apikey=3193c5c&t=" + searchTerm
    );

    moviePromise
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        renderContent(data);
      })
      .catch((error) => console.error(error));

    inputField.value = "";
  }
});

function showLoader() {
  const $name = document.querySelector("#name");
  const $year = document.querySelector("#year");
  const $poster = document.querySelector("#poster");
  const $details = document.querySelector("#details");
  const $loader = document.querySelector("#loader");

  $loader.classList.remove("hidden");
  $name.innerHTML = "";
  $year.innerHTML = "";
  $details.innerHTML = "";
  $poster.src = "";
}

function renderContent(data) {
  const $name = document.querySelector("#name");
  const $year = document.querySelector("#year");
  const $poster = document.querySelector("#poster");
  const $details = document.querySelector("#details");
  const $loader = document.querySelector("#loader");

  $loader.classList.add("hidden");
  $name.innerHTML = data.Title;
  $year.innerHTML = data.Year;
  $details.innerHTML = data.Plot;
  $poster.src = data.Poster;
}
