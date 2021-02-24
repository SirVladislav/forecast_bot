global.fetch = require("node-fetch");
const {api_key, bot, users, city} = require("./bot_settings")
const {getWeather,getPickedCity, generate_message} = require("./bot_controller")

//const api = https://api.openweathermap.org/data/2.5/forecast?q=${users[index].city}&appid=${api_key}    

bot.on("callback_query", (msg)=>{
    const index = users.findIndex(user=>user.id === msg.from.id)
    if (index===-1) {
        users.push({
            id: msg.from.id,
            city: msg.data
        }) 
    }else{
        users[index].city = msg.data
    }
    console.log(users)
    bot.sendMessage(msg.from.id,"Город выбран!")
})

bot.onText(/\/start/,(msg)=>{
    const buttons = getPickedCity(city)   
    bot.sendMessage(msg.from.id, buttons.text, buttons.options)
})

function start_forecast (){
     users.forEach(user => {
        console.log(`Forecast send !: ${user}`)
        const api = `https://api.openweathermap.org/data/2.5/forecast?q=${user.city}&appid=${api_key}`
        send_forecast(api, user)
    });
}

async function send_forecast(api, user){
    await getWeather(api)
        .then(data => generate_message(data, user))
        .then(custom_mess => bot.sendMessage(user.id,custom_mess))
}

// setInterval(() => {
//     const curent_date = new Date()
//     if(curent_date.getHours()===13&&curent_date.getMinutes()===3){
//         start_forecast(users)
//     }

// }, 60000);

setInterval(() => {
    if(users.length){
        start_forecast(users)
    }
}, 6000); //600000 10 mnt