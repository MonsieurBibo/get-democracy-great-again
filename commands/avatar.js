module.exports = {
    name: "avatar",
    description: "show avatar",
    execute(message, args){
        if(message.mentions.users.first()){
            message.channel.send(message.mentions.users.first().avatarURL({format: "png", dynamic: true, size: 2048}));
        } else {
            message.channel.send(message.author.avatarURL({format: "png", dynamic: true, size: 2048}));
        }
    }
}










