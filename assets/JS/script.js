const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGViNmYyNjBjYzAwMTVjYzBkY2QiLCJpYXQiOjE3MjE5Nzg1NTAsImV4cCI6MTcyMzE4ODE1MH0.qfVpHFiuqK7P2KKIG58U9joWwpcziiSKkv031qTQpEI';
const prodContainer = document.getElementById('products-container');

window.onload = function () {
    getProducts();
}

async function getProducts(id) {
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
            <img src="${element.imageUrl}" class="bd-placeholder-img card-img-top"/>
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

        deletes.forEach(d => {
            d.addEventListener("click", async function () {
                const id = d.dataset.id;
                await deleteProduct(id);
                getProducts();
            });
        })

        edites.forEach(d => {
            d.addEventListener("click", async function () {
                const id = d.dataset.id;
                location.assign(`./backoffice.html?cardId=${id}`);
            });
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