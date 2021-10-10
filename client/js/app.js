const chatForm = document.getElementById('message-form') 
const chatMessages = document.querySelector('.contenu') 


const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true,}) 

const socket = io() 


socket.emit('joinRoom', { username, room }) 


socket.on('message', (message) => {
  outputMessage(message) 

  chatMessages.scrollTop = chatMessages.scrollHeight 
}) 


chatForm.addEventListener('submit', (e) => {
  e.preventDefault() 


  let msg = document.getElementById('msg').value

  msg = msg.trim() 

  if (!msg) {
    return false 
  }


  socket.emit('chatMessage', msg)


  document.getElementById('msg').value = null
  document.getElementById('msg').focus()
}) 


function outputMessage(message) {
  const div = document.createElement('div') 
  div.classList.add('message') 
  const p = document.createElement('p') 
  div.innerHTML = `<p class="pseudo">${message.username} [${message.time}]</p><p class="contenu">${message.text}</p>`
  document.querySelector('.contenu').appendChild(div) 
}