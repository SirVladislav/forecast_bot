const BotApi = require('node-telegram-bot-api')
global.fetch = require("node-fetch");

const TOKEN = '1674752339:AAFMrqPpy0xJ6liOyPEm-XvUqZCnA3IBQAk'
const bot = new BotApi(TOKEN, {polling: true})
const api_key = '60d2bffbec231d9ce2cf4f786442ef8b'

const users = []

const city = {
    text: 'Выбери город',
    buttons: [
        [{text: 'Киев', callback_data: 'Kyiv'}, {text: 'Житомир', callback_data: 'Zhytomyr'}]
    ]
}

module.exports = {
    bot,
    api_key,
    users,
    city
}