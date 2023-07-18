const express = require("express");
import { UserService } from "../services/UserService";

export class UserController {
  async create(request, response) {
    const { name, cpf, telefone, status, complemento } = request.body;

    const data = {
      name,
      cpf,
      telefone,
      status,
      complemento,
    };

    const service = new UserService();

    const register = await service.create(data);

    if (register instanceof Error) {
      request.flash("error_message", register.message);
      return response.redirect("/user/register");
    }

    request.flash("sucess_message", "Cadastro Realizado com Sucesso");
    response.redirect("/user/register");
  }
  async list(request, response) {
    const service = new UserService();

    const list = await service.list();

    let result = Object.values(JSON.parse(JSON.stringify(list)));

    if (list instanceof Error) {
      return response.status(404).json(list.message);
    }

    return response.render("userList", { userlist: result });
  }

  async listByOne(request, response) {
    const { id } = request.params;

    const service = new UserService();

    const listByOne = await service.listByOne(id);

    if (listByOne instanceof Error) {
      return response.status(404).json(listByOne.message);
    }

    response.render("userUpdate", {
      id: id,
      name: listByOne.name,
      cpf: listByOne.cpf,
      telefone: listByOne.telefone,
      complemento: listByOne.complemento,
      status: listByOne.status,
      opcoes: ["Ativo", "Inativo"],
    });
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, cpf, telefone, status, complemento } = request.body;

    const data = {
      id,
      name,
      cpf,
      telefone,
      complemento,
      status,
    };

    const service = new UserService();

    const update = await service.update(data);

    if (update instanceof Error) {
      request.flash("error_message", update.message);
      return response.redirect(`/user/update/${id}`);
    }

    request.flash("sucess_message", "Usuário Atualizada com Sucesso");
    return response.redirect(`/user/update/${id}`);
  }

  async delete(request, response) {
    const { id } = request.params;

    const service = new UserService();

    const deleteCat = await service.delete(id);

    if (deleteCat instanceof Error) {
      return response.status(404).json(deleteCat.message);
    }
    return response.redirect("/user/list");
  }
}
