const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=c05cc44c-fd43-4354-8115-ccece0a30b02"

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?api_key=c05cc44c-fd43-4354-8115-ccece0a30b02"

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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteDog(data[0].id)
        btn2.onclick = () => saveFavoriteDog(data[1].id)
    }

}

async function loadFavoriteDog(){
    const res = await fetch(API_URL_FAVORITES)
    data = await res.json()
    console.log("Favorites")
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Ocurrió un error " + res.status + " " + data.message
    }else{
        data.forEach(dog => {

            const section = document.getElementById("favoriteDoggos")
            const article = document.createElement("article")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const btnText = document.createTextNode("Quitar de favoritos")


            btn.appendChild(btnText);
            img.src = dog.image.url
            img.width = 150
            article.appendChild(img)
            article.appendChild(btn)

            section.appendChild(article)
        })
    }
}

async function saveFavoriteDog(id){
    const res = await fetch(API_URL_FAVORITES,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json()
    console.log("Guardar en favoritos")
    console.log(res)

    if(res.status !== 200){
        spanError.innerHTML = "Ocurrió un error " + res.status + " " + data.message
    }
}
loadRandomDog()
loadFavoriteDog()