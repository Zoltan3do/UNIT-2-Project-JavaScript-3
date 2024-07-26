const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGViNmYyNjBjYzAwMTVjYzBkY2QiLCJpYXQiOjE3MjE5Nzg1NTAsImV4cCI6MTcyMzE4ODE1MH0.qfVpHFiuqK7P2KKIG58U9joWwpcziiSKkv031qTQpEI';
const prodContainer = document.getElementById('products-container');

window.onload = function () {
    getProducts();
}

async function getProducts() {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            headers: { 'Authorization': "Bearer " + apiKey }
        })

        if (!response.ok) {
            throw new Error(`HTTP error ! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        prodContainer.innerHTML = "";
        data.forEach(element => {
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = ` <div class="card mb-4 shadow-sm">
            <img src="${element.imageUrl}" class="bd-placeholder-img card-img-top" data-id="${element._id}"/>
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.price}€</p>
              <div class="d-flex justify-content-between align-items-center"> 
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-id="${element._id}" data-src="${element.imageUrl}"  data-alt="${element.name}">Edit</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-btn" data-id="${element._id}">Delete</button>
                </div>
              </div>
            </div>
          </div>`;
            prodContainer.appendChild(card);
        });

        const deletes = document.querySelectorAll(".btn-group button:last-of-type");
        const edites = document.querySelectorAll(".btn-group button:first-of-type");
        const images = document.querySelectorAll(".card img");

        deletes.forEach(d => {
            d.addEventListener("click", async function () {
                const id = d.dataset.id;
                await deleteProduct(id);
                getProducts();
            });
        })

        edites.forEach(e => {
            e.addEventListener("click", async function () {
                const id = e.dataset.id;
                location.assign(`./backoffice.html?cardId=${id}`);
            });
        })

        images.forEach(i => {
            i.addEventListener("click",async function(){
                const id = i.dataset.id;
                location.assign(`./details.html?imgId=${id}`)
            })
        })

    } catch (err) {
        console.log(err)
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': "Bearer " + apiKey
            },
        })
        if (response.ok) {
            console.log("La rimozione è andata a buon fine!")
        } else {
            throw new Error("Risposta non andata a buon fine!")
        }

    } catch (err) {
        console.log(err)
    }
}