const getPickedCity = (city) => {
    let text = city.text
    let options = {
            reply_markup: JSON.stringify({
            inline_keyboard: city.buttons,
            parse_mode: 'Markdown'
        })
    }
    return {text, options}
}

async function getWeather(api){
    let data = await fetch(api).then(res=>res.json())
    return data
}

function generate_message(data, user){
    let custom_mess = `${user.city}, погода на завтра:\n
    ${Math.round(data.list[0].main.temp - 274)} градусов\n
    Дата: ${data.list[0].dt_txt} `
    return custom_mess
}

async function send_forecast(api, user){
    await getWeather(api)
        .then(data => generate_message(data, user))
        .then(custom_mess => bot.sendMessage(user.id,custom_mess))
}

module.exports={
    send_forecast,
    getPickedCity,
    getWeather,
    generate_message
}