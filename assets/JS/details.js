const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGViNmYyNjBjYzAwMTVjYzBkY2QiLCJpYXQiOjE3MjE5Nzg1NTAsImV4cCI6MTcyMzE4ODE1MH0.qfVpHFiuqK7P2KKIG58U9joWwpcziiSKkv031qTQpEI';
const barParameter = new URLSearchParams(location.search).get('imgId');
const dettaglio = document.querySelector(".container-fluid .row");

window.onload = function () {
    getProduct();
}

async function getProduct() {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${barParameter}`, {
            headers: { 'Authorization': "Bearer " + apiKey }
        })

        if (!response.ok) {
            throw new Error(`HTTP error ! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        dettaglio.innerHTML += `<div class="col-12 ">
                <h1 class="fw-bold text-center mb-0" id="name">${data.name}</h1>
            </div>
            <div class="col-12 text-center p-5 " id="dettaglio">
                <img src="${data.imageUrl}"
                    alt="ciao" class="w-100" id="image">
            </div>
            <div class="col-12 p-5 pt-0">
                <div class="row align-items-center container d-flex justify-content-between">
                    <div class="col-6 ">
                        <p id="description" class="text-success fw-bolder fs-2">${data.description}</p>
                    </div>
                    <div class="col-2">
                        <p class=" text-warning fs-2 fw-bold" id="brand">${data.brand}</p>
                    </div>
                    <div class="col-2">
                        <p class="text-danger fs-2 fw-bolder" id="price">${data.price}€</p>
                    </div>
                </div>
            </div>`;

    } catch (err) {
        console.log(err)
    }
}