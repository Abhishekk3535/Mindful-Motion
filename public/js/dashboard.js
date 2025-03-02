const API_URL = "http://localhost:5000/api/asana/";
const token = localStorage.getItem("token");

async function logAsana() {
    
  const token = localStorage.getItem("token"); // Get token

  if (!token) {
    alert("You must be logged in!");
    window.location.href = "signup.html";
    return;
  }
  const name = document.getElementById("asanaName").value;
  const difficulty = document.getElementById("difficulty").value;

  const res = await fetch(API_URL + "log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, difficulty })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Asana logged!");
    fetchAsanas();
    fetchLeaderboard();
  } else {
    alert(data.message);
  }
}

async function fetchAsanas() {
  const res = await fetch(API_URL + "my-asanas", {
    headers: { "Authorization": "Bearer " + token }
  });

  const asanas = await res.json();
  document.getElementById("asanaList").innerHTML = asanas
    .map(a => `<li>${a.name} - Difficulty: ${a.difficulty}</li>`)
    .join("");
}

async function fetchLeaderboard() {
  const res = await fetch(API_URL + "leaderboard", {
    headers: { "Authorization": "Bearer " + token }
  });

  const users = await res.json();
  document.getElementById("leaderboard").innerHTML = users
    .map(u => `<li>${u.name} - Asanas: ${u.asanaCount}</li>`)
    .join("");
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html"; 
}

fetchAsanas();
fetchLeaderboard();
