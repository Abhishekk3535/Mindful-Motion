const API_URL = "http://localhost:5000/api/auth/";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  const res = await fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("signupError").textContent = data.message;
      }
    } catch (error) {
      document.getElementById("signupError").textContent = "Signup failed. Try again.";
    }
  });

  
  document.getElementById("logoutBtn")?.addEventListener("click", logout);


  function toggleSignup() {
    window.location.href = 'signup.html';
  }
  
