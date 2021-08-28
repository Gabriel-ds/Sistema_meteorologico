document.querySelector('.busca').addEventListener('submit', async (event)=>{     //Seleciona  o botão de busca e previne o carregamento automático da página
    event.preventDefault();

    let input = document.querySelector('#searchInput').value

    if(input !== '') {
        clearInfo()

        showWarning('Carregando...')
                                                                                
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=a464da50d4be3b08f03a5fa0000e3945&units=metric&lang=pt_br`    //Consome a API do site OpenWeather  

        let results = await fetch(url)                                    
        let json = await results.json()                             //Grava as informações na variável json

        if(json.cod === 200) {                                      //Verifica se a localização buscada está correta através do cod 200
            showInfo({                                              //Organiza um objeto com as informações manipuladas da API
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()                                             //Função que limpa a tela caso o sistema não encontre a localização
            showWarning("Não encontramos a sua cidade  :(")
        }
    }else {
        clearInfo()
    }
})

function showInfo(json){                                           //Atribui as informações obtidas no json na tela dinamicamente.
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'


}

function showWarning(msg) {                                        //Função de aviso caso ocorra algum erro
    document.querySelector('.aviso').innerHTML = msg           
}

function clearInfo(){                                              //Função que limpa as informações da tela.
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}