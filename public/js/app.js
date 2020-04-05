const webForm = document.querySelector("form");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
const inputLocation = document.querySelector("#location");

webForm.addEventListener("submit", (event) => {
  event.preventDefault();

  message1.textContent = "Loading...";
  message2.textContent = "";

  const location = inputLocation.value;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.forecast;
        message2.textContent = data.address;
      }
    });
  });
});
