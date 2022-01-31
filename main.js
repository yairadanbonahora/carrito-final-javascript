let products = []; 

//para obtener info del json
const urlJson = "json/data.json";
$.getJSON (urlJson, (response, status)=> {
    let products = response;
    if (status === "success") {
       drawCards (products);
       addToCart (drawCards);
    }
});

//para generar las cards de los productos
drawCards = (products) => {
    products.forEach((product, index) => {
        $(".row").append(
            `<div class="card-body">
            <img src=${product.image} class="card-img-top" alt="${product.name}">
            <h5 class="card-title">${product.name}</h5>
            <p class="product-price" value="${product.price}">$${product.price}</p>
            <button class="btnBuy btn-primary data-open="modal" value="${product.id}">Comprar</button>
            </div>`  
        )
    })
}


//para añadir producto al carrito
addToCart = (drawCards) => {
    document.querySelectorAll(".btnBuy").forEach(el => {
        el.addEventListener("click", e => {
            //para cargar al LocalStorage
            localStorage.setItem(`${e.target.value}`, JSON.stringify(e.target.parentElement.textContent));
            const modalCart = [];

            $("#cart").show()
            let modalCartSquare = document.createElement ("div");
            modalCartSquare.innerHTML = `<div> 
            <p> ${e.target.parentElement.innerHTML} </p>
            <button id="addOne">+</button> <button id="deleteOne">-</button>
            <button class="btn btn-danger" id="remove-product" onClick="removeProduct()">Eliminar producto</button></div>`
            document.getElementsByClassName("name-carrito")[0].appendChild(modalCartSquare);

            let productAddedToCart = e.target.parentElement.textContent;
            modalCart.push(productAddedToCart);
            console.log(modalCart);
            finishBuying (); 
        })
    });
}

//para eliminar producto del carrito
removeProduct = () =>{
    document.querySelectorAll("#remove-product").forEach(el => {
        el.addEventListener("click", e => {
            let productDelete = e.target.parentElement
            productDelete.parentElement.removeChild (productDelete);
            localStorage.removeItem("Producto añadido al carrito", JSON.stringify(e.target.parentElement))
        })
    })
}

//para finalizar la compra
finishBuying = () => {
   let btnFinish = document.getElementById ("finishPurchase")
   btnFinish.onclick = () => {
        $("#cart").fadeOut();
        drawForm ();
   }
}


//para generar formulario final
drawForm = () => {
    $("#finalForm").show();
    const formulario = document.createElement ("div");
    formulario.innerHTML = 
    `<form id="finalFormInner" class="row g-3">
  <div class="col-md-6">
    <h3 class="titleForm">Datos personales</h3>
    <label for="inputName" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="inputName">
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Dirección</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Ciudad</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Provincia</label>
    <select id="inputState" class="form-select">
      <option selected>Elija...</option>
      <option>Buenos Aires</option>
      <option>Córdoba</option>
      <option>La Pampa</option>
      <option>Mendoza</option>
      <option>Misiones</option>
      <option>Tucumán</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary" id="sentInfo">Enviar</button>
  </div>
</form>`
    document.getElementById("finalForm").append(formulario);


    //para obtener datos del formulario y generar mensaje final 
    $("#sentInfo").click ((e)=> {
        e.preventDefault();
        namePerson = document.getElementById ("inputName").value;
        emailPerson = document.getElementById ("inputEmail4").value;
        $("#finalFormInner").fadeOut();
        let finalMessage = document.createElement("h5")
        finalMessage.innerHTML = `<h5>Gracias ${namePerson}! Le llegará su recibo de compra a: ${emailPerson}</h5>`;
        document.getElementById ("finalForm").append(finalMessage);
    })
}