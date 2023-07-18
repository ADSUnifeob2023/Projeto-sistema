$(document).ready(function () {
  const addProductAutoComplete = (items = {}) => {
    let item = document.createElement("li");
    item.setAttribute("class", "list-group-item");
    item.appendChild(
      document.createTextNode(
        `${items[0].codigoProduct} - 
        ${items[0].name} -
        R$ ${items[0].preco}`
      )
    );
    return item;
  };

  const removeProductsAutoComplete = (selector = "listProduct") => {
    const item = document.getElementById(selector);

    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  };

  const searchProductAutoComplete = async (nameProduct) => {
    const data = {
      nameProduct: nameProduct,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Promise(function (resolve, reject) {
      axios
        .post("http://localhost:3310/sales/listProduct", data, options)
        .then((res) => {
          resolve(res.data.data);
          removeProductsAutoComplete();
        })
        .catch((err) => {
          reject(`Erro: ${err}`);
        });
    });
  };

  const OptionItemsSales = (items) => {
    const option = items.getElementsByTagName("td");
    return {
      price: option[2].innerText,
      amount: option[3].getElementsByTagName("input")[0].value,
    };
  };

  const totalProductsSales = async (qts = 1) => {
    let subtotal = [];
    const items = document.querySelector("table#content tbody").children;

    [].forEach.call(items, function (item) {
      const price = OptionItemsSales(item).price;
      const amount = OptionItemsSales(item).amount;
      const total = price * amount;
      subtotal.push(total);
    });

    if (subtotal.length > 0) {
      subtotal = subtotal
        .reduce((item, a = 0) => {
          return item + a;
        })
        .toFixed(2);
    }

    document.getElementsByClassName("total")[0].innerText = `Total:${subtotal}`;
  };

  const removeProductSales = (item) => {
    return document.querySelector(`table#content tbody tr[data-id='${item}']`);
  };

  const AmountProductSales = (event) => {
    if (!!event.target.value != 0) {
      console.log(event.target);
    }
  };

  /**
   * Events Product
   */

  const nomeProd = document.querySelector("input[name=nomeProd]");
  nomeProd.addEventListener("keyup", function (event) {
    removeProductsAutoComplete();
    if (event.target.value != "") {
      const nameProduct = event.target.value;

      searchProductAutoComplete(nameProduct).then(function (data) {
        data.forEach((item) => {
          document.getElementById("listProduct").appendChild(
            addProductAutoComplete([
              {
                codigoProduct: item.codigoProduct,
                name: item.name,
                preco: item.preco,
              },
            ])
          );
        });
      });
    }
  });

  const list = document.querySelector("ul#listProduct");
  list.addEventListener("click", function (event) {
    let itemSelected = event.target.innerText;
    itemSelected = itemSelected.split("-");

    searchProductAutoComplete(itemSelected[1].trim()).then(function (data) {
      data.forEach((item) => {
        let { id, name, codigoProduct, preco } = item;
        preco = preco.replace(",", ".");
        $("table#content").append(`<tr data-id="${id}">
        <td data-name="name" class="text-center">${name}</td>
        <td data-name="codproduct" class="text-center">${codigoProduct}</td>
        <td data-name="price" class="text-center">${preco}</td>
        <td data-name="amount" class="text-center"><input type="number" id="qtd" name="qtd" value="1"></td>
        <td class="text-center"><a href="${id}"><img class="remove-item" src="/assets/image/icons/remove-product.svg"></a></td>
        </tr>`);
      });
    });

    document.getElementById("nomeProd").value = "";
    removeProductsAutoComplete();

    setTimeout(totalProductsSales, 500);
  });

  /*const search = document.querySelector("img#search");
  search.addEventListener("click", function () {
    const nameProduct = document.getElementById("nomeProd").value;

    if (document.querySelectorAll("ul.product > li").length == 0) {
      searchProductAutoComplete(nameProduct);
    }
    removeProductsAutoComplete();
  });*/

  const table = document.querySelector("table#content > tbody");
  table.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.className === "remove-item") {
      let { href } = event.target.parentNode;
      const removeId = href.split("/").pop();
      // const removeItem = removeProductSales(removeId);
      removeProductsAutoComplete("table#content");

      /*if (removeItem) {
        removeItem.remove();
      }*/

      totalProductsSales();
    }
  });

  document
    .querySelector("#content > tbody")
    .addEventListener("change", AmountProductSales, false);
});
