const ADMIN_USER="admin";
const ADMIN_PASS="admin2025";
let bookings = JSON.parse(localStorage.getItem("bookings"))||[];
let loggedIn = sessionStorage.getItem("loggedIn") === "true";

// LOGIN
function togglePassword(){
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type==="password"?"text":"password";
}

function login(){
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginBox = document.getElementById("loginBox");
  const app = document.getElementById("app");
  const loginMsg = document.getElementById("loginMsg");

  if(username.value===ADMIN_USER && password.value===ADMIN_PASS){
    loginBox.style.display="none";
    app.style.display="block";
    renderBookings();
    sessionStorage.setItem("loggedIn","true");
  } else{
    loginMsg.innerText="Login khaldan";
  }
}

// LOGOUT
function logout(){
  sessionStorage.setItem("loggedIn","false");
  document.getElementById("app").style.display="none";
  document.getElementById("loginBox").style.display="block";
}

// NAV
function showPage(id,el){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
  el.classList.add("active");
}

// PRICE
function calcPrice(){
  const hours = document.getElementById("hours").value || 0;
  document.getElementById("price").value = hours*10;
}

// BOOKING
function addBooking(){
  const client = document.getElementById("client").value;
  const phone = document.getElementById("phone").value;
  const day = document.getElementById("day").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const hours = document.getElementById("hours").value;
  const price = document.getElementById("price").value;

  if(!client || !phone || !day || !date || !time || !hours){
    alert("Buuxi dhammaan xogta");
    return;
  }
  if(bookings.find(b=>b.time===time)){
    alert("Waqtigan hore ayaa loo qaatay");
    return;
  }

  bookings.push({client, phone, day, date, time, hours, price});
  localStorage.setItem("bookings",JSON.stringify(bookings));
  renderBookings();
}

function renderBookings(){
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML="";
  bookings.forEach((b,i)=>{
    bookingList.innerHTML+=`
      <tr>
        <td>${i+1}</td><td>${b.client}</td><td>${b.phone}</td><td>${b.day}</td>
        <td>${b.date}</td><td>${b.time}</td><td>${b.hours}</td><td>$${b.price}</td>
        <td><button onclick="delBooking(${i})">X</button></td>
      </tr>`;
  });
}

function delBooking(i){
  bookings.splice(i,1);
  localStorage.setItem("bookings",JSON.stringify(bookings));
  renderBookings();
}

// SHOW LOGIN OR APP ON REFRESH
window.onload = function(){
  if(loggedIn){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("app").style.display="block";
    renderBookings();
  } else{
    document.getElementById("loginBox").style.display="block";
    document.getElementById("app").style.display="none";
  }
  document.getElementById("year").innerText = new Date().getFullYear();

};
