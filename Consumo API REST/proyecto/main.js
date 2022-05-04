const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=c05cc44c-fd43-4354-8115-ccece0a30b02"

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=2&api_key=c05cc44c-fd43-4354-8115-ccece0a30b02"

const spanError = document.getElementById("error")

async function loadRandomDog(){
    const res = await fetch(API_URL_RANDOM)
    data = await res.json()
    console.log("Random")
    console.log(data)

    if (res.status !== 200){
        spanError.innerHTML = "Ocurrió un error"
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        img1.src = data[0].url;
        img2.src = data[1].url;
    }

}

async function addFovoriteDog(){
    const res = await fetch(API_URL_FAVORITES)
    data = await res.json()
    console.log("Favorites")
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Ocurrió un error " + res.status + " " + data.message
    }
}

async function saveFavoriteDog(){
    const res = await fetch(API_URL_FAVORITES,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: "rP6KHS9yP"
        })
    })
    const data = await res.json()
    console.log("Guardar en favoritos")
    console.log(res)

    if(res.status !== 200){
        spanError.innerHTML = "Ocurrió un error " + res.status + " " + data.message
    }
}
loadRandomDog()
addFovoriteDog()