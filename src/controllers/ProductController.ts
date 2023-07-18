const express = require("express");
import { ProductService } from "../services/ProductService";
import { CategoryService } from "../services/CategoryService";

export class ProductController {
  private category: CategoryService;
  private product: ProductService;

  constructor() {
    this.category = new CategoryService();
    this.product = new ProductService();
  }

  async create(request, response) {
    const { name, codigoProd, idCategory, preco, status, descricao } =
      request.body;

    const data = {
      name,
      codigoProd,
      idCategory,
      preco,
      descricao,
      status,
    };

    const register = await this.product.create(data);

    if (register instanceof Error) {
      request.flash("error_message", "Erro no Cadastro");
      return response.redirect("/product/register");
    }

    request.flash("sucess_message", "Cadastro Realizado com Sucesso");
    return response.redirect("/product/register");
  }

  public async list(request, response) {
    const list = await this.product.list();

    if (list instanceof Error) {
      return response.status(404).json(list.message);
    }

    return response.render("productList", {
      categorylist: Object.values(JSON.parse(JSON.stringify(list))),
    });
  }

  private async listCategory(request, response) {
    const listCategory = await this.category.list(["id", "name"]);
    if (listCategory instanceof Error) {
      return response.status(404).json(listCategory.message);
    }
    return Object.values(JSON.parse(JSON.stringify(listCategory)));
  }

  async listByOne(request, response) {
    const { id } = request.params;

    const listByOne = await this.product.listByOne(id);

    if (listByOne instanceof Error) {
      return response.status(404).json(listByOne.message);
    }

    return {
      id: listByOne.id,
      name: listByOne.name,
      codigoProd: listByOne.codigoProd,
      idCategory: listByOne.idCategory.id,
      preco: listByOne.preco.toString().replace(".", ","),
      descricao: listByOne.descricao,
      status: listByOne.status,
      opcoes: ["Ativo", "Inativo"],
    };
  }

  public async createCategoryList(request, response) {
    const categoryList = await this.listCategory(request, response);
    return response.render("productRegister", {
      categorylist: categoryList,
    });
  }

  public async updateList(request, response) {
    const categoryList = await this.listCategory(request, response);
    const productList = await this.listByOne(request, response);

    return response.render("productUpdate", {
      id: productList.id,
      name: productList.name,
      codigoProd: productList.codigoProd,
      idCategory: productList.idCategory,
      preco: productList.preco,
      descricao: productList.descricao,
      status: productList.status,
      opcoes: ["Ativo", "Inativo"],
      categorylist: categoryList,
    });
  }

  public async update(request, response) {
    const { id } = request.params;

    const { name, codigoProd, idCategory, preco, descricao, status } =
      request.body;

    const data = {
      id,
      name,
      codigoProd,
      idCategory,
      preco,
      descricao,
      status,
    };

    const update = await this.product.update(data);

    if (update instanceof Error) {
      request.flash("error_message", "Erro no Cadastro");
      return response.redirect(`/product/update/${id}`);
    }

    request.flash("sucess_message", "Produto Alterado com Sucesso");
    return response.redirect(`/product/update/${id}`);
  }

  public async delete(request, response) {
    const { id } = request.params;

    const deleteProd = await this.product.delete(id);
    if (deleteProd instanceof Error) {
      return response.status(404).json(deleteProd.message);
    }
    return response.redirect("/product/list");
  }
}
