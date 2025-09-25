document.addEventListener("DOMContentLoaded", function () {
  const phones = JSON.parse(localStorage.getItem("phones")) || [];

  render(phones);
  //show menu
  var bar = document.getElementsByClassName("hamberger");
  const menu = document.getElementsByClassName("menu")[0];
  for (let i = 0; i < bar.length; i++) {
    bar[i].onclick = () => {
      menu.classList.toggle("menu-out");
    };
  }

  //show search
  const btn_search = document.getElementsByClassName("btn-search")[0];
  const search = document.getElementsByClassName("search")[0];

  btn_search.onclick = () => {
    search.classList.toggle("search-out");
  };
  document.getElementById("close").onclick = () => {
    search.classList.remove("search-out");
  };

  //slideshow
  const image = document.getElementsByClassName("image");
  console.log(image);
  const next = document.getElementById("caret-right");
  const pre = document.getElementById("caret-left");
  var a = 0;
  var b;
  next.onclick = () => {
    AutoNext();
    clearTimeout(b);
  };
  function AutoNext() {
    a += 1;
    console.log("a la" + a);
    for (let i = 0; i < image.length; i++) {
      if (a < image.length) {
        image[i].classList.remove("slide-active");
        image[a].classList.add("slide-active");
      } else if ((a = image.length)) {
        a = 0;
      }
    }
    b = setTimeout(AutoNext, 3000);
  }
  pre.onclick = () => {
    a -= 1;
    console.log("a la" + a);
    for (let i = 0; i < image.length; i++) {
      if (a < 0) {
        a = image.length - 1;
      } else if (a < image.length) {
        image[i].classList.remove("slide-active");
        image[a].classList.add("slide-active");
      }
    }
  };
  //setTimeout(AutoNext,3000)
  //star rate
  const addtocart = document.getElementsByClassName("add");
  var star = document.getElementsByClassName("star");
  var stars = document.getElementsByClassName("stars");
  for (let i = 0; i < stars.length; i++) {
    starRate(stars[i].children);
  }
  //scroll to top
  const totop = document.getElementsByClassName("totop")[0];
  var trangthai = "duoi400";
  window.addEventListener("scroll", function () {
    var x = pageYOffset;
    if (x < 400) {
      if (trangthai == "duoi400") {
        trangthai = "tren400";
        totop.style.display = "none";
      }
    } else {
      if (trangthai == "tren400") {
        totop.style.display = "block";
        trangthai = "duoi400";
      }
    }
  });
  totop.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //shopping cart
  const btn_bag = document.getElementsByClassName("bag")[0];
  const cart = document.querySelector(".container-shopping");
  const close_cart = document.getElementById("back");
  btn_bag.onclick = () => {
    cart.style.display = "block";
  };
  close_cart.onclick = () => {
    cart.style.display = "none";
  };
});

function starRate(star) {
  for (let i = 0; i < 5; i++) {
    star[i].onclick = () => {
      for (let j = 0; j < 5; j++) {
        if (j <= i) {
          star[j].style.color = "orange";
        }
        if (j > i) {
          star[j].style.color = "gray";
        }
      }
      //star.forEach(function(k,key){
      //key<=i ? k.classList.add('yellow') : k.classList.remove("yellow")
      //})
    };
  }
}

const items = [
  {
    product: "./assets/images/phone1.png",
    name: "Apple IPhone XR",
    price: 500,
    quantity: 1,
  },
  {
    product: "./assets/images/phone2.png",
    name: "Honor 10 Lite",
    price: 600,
    quantity: 1,
  },
  {
    product: "./assets/images/phone3.png",
    name: "XOLO ERA 4X",
    price: 700,
    quantity: 1,
  },
  {
    product: "./assets/images/phone4.png",
    name: "LG V40 ThinQ",
    price: 800,
    quantity: 1,
  },
];
const menu = [];
function render(phones) {
  const html = items
    .map(
      (item) =>
        `<div class="panel d-flex align-items col-sm-3 col-sm-6 col-sm-12 pd-3">
        <div class="one-phone">
      <div class="one-phone-image">
          <img src="${item.product}" alt="">
          <div class="addtocart d-flex">
              <p class="quick-view">quick view</p>
              <p class="add">add to cart</p>
          </div>
      </div>
      <div class="one-phone-name">
          <p>${item.name}</p>
          <div class="pricee">${item.price}</div>
          <div class="stars">
              <i class="fas fa-star star"></i>
              <i class="fas fa-star star"></i>
              <i class="fas fa-star star"></i>
              <i class="fas fa-star star"></i>
              <i class="fas fa-star star"></i>
          </div>
      </div>

  </div>
  </div>`
    )
    .join("");

  //menu shopping
  document.querySelector(".phones").innerHTML = html;
  var subtotal = 0;
  menu.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  document.getElementById("subtotal").innerText = "Tổng tiền :" +subtotal +"$";

  console.log("total " + subtotal);

  const list = menu
    .map(
      (item) =>
        `<li class="item-cart d-flex align-items justify-bettween">
        <div class="product">
          <img src="${item.product}" alt="" />
          <div class="name">${item.name}</div>
          
        </div>
        <div class="price d-flex"><h4>Gía tiền :</h4><span>${item.price}</span>$</div>
        <div class="input d-flex ">
          <h4>Số lượng :</h4>
          <i class="fas fa-minus-square"></i>
          <input type="text" value="${item.quantity
        }" class="quantity" />
          <i class="fas fa-plus-square"></i>
        </div>
        <div class="price-right d-flex">
          <div class="total">Tổng tiền :${item.price * item.quantity} $</div>
          <div class="remove">
            <i class="fas fa-trash"></i>
          </div>
        </div>
        
      </li>`
    )
    .join("");

  document.getElementById('carts').innerHTML = list;

  // add phone
  const add = document.getElementsByClassName("add");
  for (let i = 0; i < items.length; i++) {
    add[i].onclick = () => {
      add_item(i);
      alert("ban da them mot san pham !!")
    };
  }

  //remove item & update
  const dlt = document.getElementsByClassName("remove");

  const plus = document.getElementsByClassName("fa-plus-square");
  const minus = document.getElementsByClassName("fa-minus-square");
  for (let i = 0; i < dlt.length; i++) {
    dlt[i].onclick = () => {
      remove(i);
    };
    plus[i].onclick = () => {
      quantity = menu[i].quantity + 1;
      update(menu[i], quantity);
    };
    minus[i].onclick = () => {
      quantity = menu[i].quantity - 1;
      update(menu[i], quantity);
    };
  }

  //number-bag
  document.getElementById("number").innerText = dlt.length;
}
function add_item(i) {
  menu.push({
    product: items[i].product,
    name: items[i].name,
    price: items[i].price,
    quantity: items[i].quantity,
  });
  render();
}
function remove(index) {
  menu.splice(index, 1);
  render();
}
function update(item, quantity) {
  if (quantity < 1) {
    return;
  }
  item.quantity = quantity;
  render();
}


