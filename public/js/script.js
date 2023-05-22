// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Ironhack-M2-Project JS imported successfully!");
});

async function saveFavorite(element, festivalId) {
  element.style.color = "rgb(109, 100, 132)";
  const url = "/favorites";
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ festivalId }),
  });
}