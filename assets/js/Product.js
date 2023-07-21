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

  const SearchProduct = async (url, params = {}) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise(function (resolve, reject) {
      axios
        .post(url, params, options)
        .then((response) => {
          resolve(response.data.data);
          clearSearchAutoComplete();
        })
        .catch((error) => {
          reject(`Erro: ${error}`);
        });
    });
  };

  const clearSearchAutoComplete = () => {
    const item = document.getElementById("listProduct");

    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  };

  const totalSales = async (qtd = 1) => {
    let subtotal = [];
    const items = document.querySelector("table#content tbody").children;

    [].forEach.call(items, function (item) {
      const price = item.getElementsByTagName("input")[2].value;
      const amount = item.getElementsByTagName("input")[3].value ?? qtd;
      const total = price * amount;
      subtotal.push(total);
    });

    if (subtotal.length > 0) {
      subtotal = subtotal.reduce((item, a = 0) => {
        return item + a;
      });
      subtotal = subtotal.toFixed(2);
    }

    document.getElementsByClassName("total")[0].innerText = `Total:${subtotal}`;
  };

  /**
   * Events Sales
   */

  const nomeProd = document.querySelector("#nomeProd");
  nomeProd.addEventListener("keyup", function (event) {
    clearSearchAutoComplete();
    if (event.target.value != "") {
      const nameProduct = event.target.value;

      SearchProduct("http://localhost:3310/sales/listProduct", {
        nameProduct: nameProduct,
      }).then((data) => {
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

    SearchProduct("http://localhost:3310/sales/listByOneProduct", {
      codProduct: itemSelected[0],
    }).then((data) => {
      [data].forEach((item) => {
        let { id, name, codigoProduct, preco } = item;
        preco = preco.replace(",", ".");
        $("table#content").append(`<tr id="${id}">
          <td data-name="name" class="text-center"><input class="text-center border-0" type="text" id="name" name="name" value="${name}" disabled></td>
          <td data-name="codproduct" class="text-center"><input class="text-center border-0" type="text" id="codigoProduct" name="codigoProduct" value="${codigoProduct}" disabled></td>
          <td data-name="price" class="text-center"><input class="text-center border-0" type="text" id="price" name="price" value="${preco}" disabled></td>
          <td data-name="amount" class="text-center"><input type="number" min="0" id="amount" name="amount" value="1"></td>
          <td class="text-center"><a id="${id}"><img class="remove-item" src="/assets/image/icons/remove-product.svg"></a></td>
          </tr>`);
      });
    });

    document.getElementById("nomeProd").value = "";
    clearSearchAutoComplete();

    setTimeout(totalSales, 500);
  });

  const itemRemoveSale = document.querySelector("table#content > tbody");
  itemRemoveSale.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.className === "remove-item") {
      event.target.closest("tr").remove();
      totalSales();
    }
  });

  const amountItemSale = document.querySelector("table#content > tbody");
  amountItemSale.addEventListener("keyup", (event) => {
    if (event.target.value == 0) {
      event.target.closest("tr").remove();
      totalSales();
    }
    const amount = event.target.value;
    totalSales(amount);
  });

  const cancelSales = document.querySelector("button#cancelsales");
  cancelSales.addEventListener("click", () => {
    const table = document.querySelector("table#content tbody");

    while (table.rows.length > 0) {
      table.deleteRow(0);
    }

    totalSales();
  });
});
