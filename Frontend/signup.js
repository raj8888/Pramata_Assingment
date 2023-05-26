const signupUsernameInput = document.getElementById('signupUsernameInput');
const signupPasswordInput = document.getElementById('signupPasswordInput');
const form =document.querySelector("form")
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  signup()
})
const signup = async () => {
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
     alert("User Registered Successfully")
     window.location='signin.html'

    }else{
      alert("User already exist")
      console.log(response)
    }
  };