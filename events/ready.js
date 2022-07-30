const express = require(`express`);
const app = express()
const port = '0'
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const commands = []

const data = new SlashCommandBuilder()
.setName(`help`)
.setDescription(`❓ | Need Help?`)

commands.push(data.toJSON())

const fs = require('fs');
module.exports = {
	once: true,
	async execute(client) {
		const rest = new REST({ version: '9' }).setToken(process.env.token);
		console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
		console.log(`[ Database ] ~ Connected to sqlite database`)
		console.log(`[ Client ] ~ Connected to ${client.user.tag}`)
		await rest.put(
			Routes.applicationCommands(`969589877987483728`),
			{body: commands}
		)
		console.log(`[ Slash Command ] ~ Added help command to ${client.guilds.cache.size} servers .`)
		await app.listen(3000, async () => {
			await console.log(`[ Host ] ~ Listening on port 3000, http://127.0.0.1:3000`)
		})
		app.get('*', (req,res) => {
			res.send(`Official host site for ${client.user.tag}!`)
		})
		console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
	},
};