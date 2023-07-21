import { SalesService } from "../services/SalesService";

export class SalesController {
  private sales: SalesService;
  private formatter: any;

  constructor() {
    this.sales = new SalesService();

    this.formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  async ListComplete(request, response) {
    let data = [];
    const { nameProduct } = request.body;

    let listComplete = await this.sales.listComplete(nameProduct);

    if (listComplete instanceof Error) {
      return response.status(404).json(listComplete.message);
    }

    Object.keys(listComplete).map((objectKey, index) => {
      const { id, name, codigoProd, preco } = listComplete[objectKey];

      data[index] = {
        id: id,
        name: name,
        codigoProduct: codigoProd,
        preco: this.formatter.format(preco),
      };
    });

    return response.end(JSON.stringify({ data: data }));
  }

  async ListByOneProduct(request, response) {
    let data = {};
    const { codProduct } = request.body;

    let listByOneProduct = await this.sales.listByOneProduct(codProduct);

    if (listByOneProduct instanceof Error) {
      return response.status(404).json(listByOneProduct.message);
    }

    data = {
      id: listByOneProduct.id,
      name: listByOneProduct.name,
      codigoProduct: listByOneProduct.codigoProd,
      preco: this.formatter.format(listByOneProduct.preco),
    };

    return response.end(JSON.stringify({ data: data }));
  }
}
