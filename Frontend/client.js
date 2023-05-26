document.addEventListener('DOMContentLoaded', () => {
    const socket = io("http://localhost:3000",{transports:["websocket"]});
  
    let currentChannel = '';
    const urlParams = new URLSearchParams(window.location.search)
    var username=urlParams.get('username')
    var userId=urlParams.get('userId')
    
    const channelList = document.getElementById('channelList');
    const channelItem = document.getElementById('channelItems');
    const messageContainer = document.getElementById('messageContainer');
    const messageInput = document.getElementById('messageInput');


    socket.emit('joinChannel', { channelId: 'default', username:username });
    currentChannel = 'default';
  


    channelList.addEventListener('click', (event) => {
      

      if (event.target.classList.contains('channel')) {
        const channelId = event.target.dataset.channelId;
        if (channelId !== currentChannel) {
          socket.emit('leaveChannel', { channelId: currentChannel });
          
          currentChannel = channelId;
          messageContainer.innerHTML = '';
        }
      }
    });

    let buttonforchanne=document.getElementById("buttonforchanne")

    buttonforchanne.addEventListener("click",async(e)=>{
      e.preventDefault()
      const response = await fetch('http://localhost:3000/allchannel', {
        method: 'GET',
        headers:{
          authorization:`bearer ${localStorage.getItem("pramatatoken")}`
        }
      })
     let info=await response.json()
     console.log(info)
     if(response.ok){
      let main=info.allchannel
      let temp=main.map((elem)=>{
       return `
       <li>${ elem.channelname} <button data-id=${elem._id} class="allchans">Join Channel</button></li>
       `
      })
      channelItem.innerHTML=`
     ${ temp.join("")}
     <p>For creating channel <a href="" id="tempchanne"">click here</a>.</p>
      `
      let joinclass=document.querySelectorAll('.allchans')
      joinclass.forEach(elem=>{
          elem.addEventListener('click',(event)=>{
              let classid=event.target.dataset.id
              joinnewclass(classid)
          })
      })

      let tempchanne=document.getElementById("tempchanne")
       tempchanne.addEventListener("click",(e)=>{
         e.preventDefault()
         createChannel()
       })

     }else{
      channelItem.innerHTML=`
      <p>Sorry, Not any channel created yet</p>
      <p>For creating channel <a href=""  id="tempchanne">click here</a>.</p>
      `
      let tempchanne=document.getElementById("tempchanne")
      tempchanne.addEventListener("click",(e)=>{
        e.preventDefault()
        createChannel()
      })
      
     }
    })

async function joinnewclass(classid){
  const response = await fetch(`http://localhost:3000/channel/${classid}`, {
        method: 'GET',
        headers:{
          authorization:`bearer ${localStorage.getItem("pramatatoken")}`
        }
      })
     let info=await response.json()
     if(response.ok){
     let users=info.users
     if(info.channel.users.includes(userId)){
      let ans=alert("Already joined channel")
     }else{
      let ans= confirm("Confirm: If You want to join channel click on Yes.")
      if(ans){
        socket.emit('addMemberToChannel', { channelId:classid, username:username,userId: userId });
      }
     }
     }
}


async function createChannel(){
  let name=prompt("Enter Your channel name:")
  if(name!=null){
  const response = await fetch('http://localhost:3000/channels', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                   authorization:`bearer ${localStorage.getItem("pramatatoken")}`
                },
                body: JSON.stringify({ channelname:name, userId:userId })
              });
          
              if (response.ok) {
                alert("Channel created Successfully")
                location.reload();
              }
  }
}


    // Function to send a message
    const sendMessage = () => {
      const message = messageInput.value.trim();
      if (message !== '') {
        socket.emit('sendMessage', { channelId: currentChannel, username: username, message });
        messageInput.value = '';
      }
    };
  
    // Receive a message
    const receiveMessage = ({ username, message }) => {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.innerHTML = `<strong>${username}:</strong> ${message} <hr>`;
      messageContainer.appendChild(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    };
  
    // User joined a channel
    const userJoined = (username) => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `${username} joined the channel`;
      messageContainer.appendChild(userElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    };
  
    // User left a channel
    const userLeft = (username) => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `${username} left the channel`;
      messageContainer.appendChild(userElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    };
  
    // Event listeners
    socket.on('message', receiveMessage);
    socket.on('userJoined', userJoined);
    socket.on('userLeft', userLeft);
  
    window.signup = "signup.html";
    window.login = "signin.html";
    window.sendMessage = sendMessage;

})



    