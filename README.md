# 💬RetroChat

RetroChat est un site web qui permet de discuter entre utilisateurs avec un systeme de salle. Il a été crée pour un projet de NSI. Vous pouvez le tester sur http://chat.gatiendev.tk
## Comment cela fonctionne ?
Ce site web est basé sur **Node.js**, il utilise le module `socket.io` afin de recevoir les messages en temps réel. Lorsque un message est envoyé, un évènement socket.io se déclénche et les autres ordinateurs connectés recoivent le message !
## Heberger chez soi RetroChat ?

Il est possible d'héberger RetroChat chez vous en quelques lignes de commande (vous devez avoir installer Node.js)

téléchargez le repo et mettez vous dans le dossier:
```
git clone https://github.com/GatienFrenchDev/RetroChat.git
cd RetroChat
```

puis installer les modules :
```
npm i
```

et enfin lancez le serveur :
```
node .
```
