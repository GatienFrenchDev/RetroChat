const socket = io()

const formulaire = document.getElementById('message-form')


socket.on('message', msg =>{
    afficher(msg)
})

formulaire.addEventListener('submit', (e) =>{
    e.preventDefault()
    const msg = e.target.elements.test.value
    document.getElementById('test').value = null
    msg.trim()
    socket.emit('NewMessage', msg)
})


function afficher(msg){
    console.log(msg)
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="pseudo">Gatien :</p><p class="contenu">${msg}</p>`
    document.querySelector('.contenu').appendChild(div)
}