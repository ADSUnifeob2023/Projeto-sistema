const express = require("express");
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  private category: CategoryService;

  constructor() {
    this.category = new CategoryService();
  }

  async create(request, response) {
    const { name, status } = request.body;

    const data = { name, status };

    const register = await this.category.create(data);

    if (register instanceof Error) {
      request.flash("error_message", "Erro no Cadastro");
      return response.redirect("/category/register");
    }

    request.flash("sucess_message", "Cadastro Realizado com Sucesso");
    return response.redirect("/category/register");
  }

  async list(request, response) {
    const list = await this.category.list();

    if (list instanceof Error) {
      return response.status(404).json(list.message);
    }

    return response.render("categoryList", {
      categorylist: Object.values(JSON.parse(JSON.stringify(list))),
    });
  }

  async listByOne(request, response) {
    const { id } = request.params;

    const { name, status } = request.body;

    const data = { id, name, status };

    const listByOne = await this.category.listByOne(data);

    if (listByOne instanceof Error) {
      return response.status(404).json(listByOne.message);
    }

    response.render("categoryUpdate", {
      id: id,
      name: listByOne.name,
      opcoes: ["Ativo", "Inativo"],
      status: listByOne.status,
    });
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, status } = request.body;

    const data = { id, name, status };

    const update = await this.category.update(data);

    if (update instanceof Error) {
      request.flash("error_message", "Erro ao Atualizar");
      return response.redirect(`/category/update/${id}`);
    }

    request.flash("sucess_message", "Categoria Atualizada com Sucesso");
    return response.redirect(`/category/update/${id}`);
  }

  async delete(request, response) {
    const { id } = request.params;

    const deleteCat = await this.category.delete(id);

    if (deleteCat instanceof Error) {
      return response.status(404).json(deleteCat.message);
    }
    return response.redirect("/category/list");
  }
}
