const { MessageEmbed } = require("discord.js")


module.exports = {
    name: `ping`, 
    description: `Shows the bot ping and latency.`,

    run(client, message, args) {
        message.reply(`:ping_pong: Pong..`).then(msg => {
            const ping = (msg.createdTimestamp - message.createdTimestamp) - 100
            const pingemb = new MessageEmbed()
            .setTitle(`:ping_pong: Pong..`)
            .setDescription(`:hourglass: **Ping:** ${ping}ms\n :stopwatch: **WS:** ${client.ws.ping}ms`)
            .setColor("#7efa02")
            .setTimestamp()

            msg.edit({content: `_ _`, embeds: [pingemb]})
        })

    }
}