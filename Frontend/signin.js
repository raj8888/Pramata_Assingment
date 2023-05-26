

const loginUsernameInput = document.getElementById('loginUsernameInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const socket = io("http://localhost:3000",{transports:["websocket"]});
const form =document.querySelector("form")
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  login()
})
let currentChannel = '';

const login = async () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      const { userId,username } = data;
      loginUsernameInput.value = '';
      loginPasswordInput.value = '';
      localStorage.setItem("pramatatoken",JSON.stringify(data.token))
      alert("User Login Successfully")
      window.location.assign(`./chat.html?userId=${userId}&username=${username}`)
    }
  };