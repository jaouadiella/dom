let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
 
//open cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
  };
  //close cart
  closeCart.onclick =()=>{
    cart.classList.remove("active");
  };



  //cart working
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
  } else{
    ready();
  }
  function ready(){


    //remove items 
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0 ; i< removeCartButtons.length; i++){
      var button=removeCartButtons[i];
      button.addEventListener("click",removeCartItem );
    }


    // quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(i=0 ; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantitychanged);
  }
}



//add to cart 
var cartItems = document.getElementsByClassName("cart-content")[0];
var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
function addCartClicked(event){
  var button = event.target;
  var prod = button.parentElement;
  var title = prod.getElementsByClassName("product-title")[0].innerText;
  var price = prod.getElementsByClassName("price")[0].innerText;
  var imageSrc = prod.getElementsByClassName("product-img")[0].src;
  addProductToCart(title , price , imageSrc);
  console.log(title , price , imageSrc);
  updatetotale();
}
function addProductToCart(title , price , imageSrc){
  var box = document.createElement('div');
  box.classList.add("cart-box");
  var cartBoxContent = `
  <img src="${imageSrc}" alt="" class="cart-img">
  <div class="detail-box">
  <div class="cart-product-title"> ${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity">
  </div>
  <i class='bx bxs-trash cart-remove'></i> `;

  
box.innerHTML= cartBoxContent
cartItems.append(box);
box.getElementsByClassName("cart-remove")[0]
.addEventListener("click",removeCartItem);
box.getElementsByClassName("cart-quantity")[0]
.addEventListener("change", quantitychanged);  

}
  //add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for(let i=0 ; i< addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  
  function removeCartItem(event){
    var buttonclicked = event.target;
    buttonclicked.parentElement.remove();
    updatetotale();
  }

  //quantity changes
  function quantitychanged(event){
    var input = event.target;
    if (isNaN (input.value) || input.value <=0){
        input.value= 1;
    }
    updatetotale()
  }

  
  //update total
  function updatetotale(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0 ; i< cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        
        var quantity = quantityElement.value;
        total = total + price*quantity ;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    }
 //if price contain some cents value
 total = Math.round(total * 100) / 100;

 document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }