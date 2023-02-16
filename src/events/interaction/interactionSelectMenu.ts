

import { BaseInteraction, Events, MessageComponentInteraction } from "discord.js"
import { fileURLToPath } from "url"
import Event from "../../interfaces/Event.js"
import path from "path"
import DiscordButton from "../../interfaces/DiscordButton.js"

export default new Event({
    name: Events.InteractionCreate,
    once: false,
    async execute(interactive: BaseInteraction) {
        if (!interactive.isAnySelectMenu()) return

        try {
            const __dirname: string = path.dirname(fileURLToPath(import.meta.url))

            const button: DiscordButton = (await import(path.join(__dirname, `../../button/${interactive.message.interaction.commandName.split(' ')[0]}Select.js`))).default as DiscordButton

            if (!button) return

            if (button?.execute) {
                await button.execute(interactive as MessageComponentInteraction)
            }

        } catch (err) {
            console.error(err as Error)

            await interactive.reply({
                content: "There was an error while executing this command!",
                ephemeral: true
            })
        }
    }
})