const Container = document.getElementById("container");
const Details = document.getElementById("details");
const Content = document.getElementById("inner_content");
const Title = document.getElementById("modal_title");

//**** STARS ****/
function AddStar(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5-fullStars;
    let Star = "";
    for (let i=0;i<fullStars;i++) {
        Star +="<div>★</div>";
    }
    for (let i=0;i<emptyStars;i++) {
        Star += "<div>☆</div>";
    }
    return Star;
}

//**** CARDS ****//
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
    products.forEach(product =>{
        const card = document.createElement("div");
        card.classList.add("product_card");
        card.innerHTML=`
        <img src = "${product.image}"/>
        <h2>${product.title}</h2>
        <p>${product.price}$</p>
        <button>Add to shopping bag</button>
        `;
        card.addEventListener("click",()=>{
            openModal(product.id);
        });
        Container.append(card);
    });
});

//**** MODAL ****//

function openModal(productId){
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        Title.textContent = product.title;
        Content.innerHTML=`
        <img src="${product.image}"/>
        <p>${product.description}</p>
        <div class="stars">${AddStar(product.rating.rate)}</div>
        <p>Rate: ${product.rating.rate}(${product.rating.count} vote)</p>
        <p class=price>${product.price}$</p>
        `;
        Details.style.display = "block";
    });
}

function closeModal(){
    Details.style.display = "none";
}


