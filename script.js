document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value

    if(input !== '') {
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=a464da50d4be3b08f03a5fa0000e3945&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200) {

        } else {
            showWarning("Não encontramos a sua cidade :(")
        }
    }
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}