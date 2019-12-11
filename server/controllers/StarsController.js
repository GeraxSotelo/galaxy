import express from "express";
import starsService from "../services/StarsService";

export default class StarsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:name", this.getByName)
      .post("", this.create)
      .put("/:name", this.edit)
      .delete("/:name", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await starsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req, res, next) {
    try {
      let data = await starsService.getByName(req.params.name);
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let data = await starsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await starsService.edit(req.params.name, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await starsService.delete(req.params.name);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error)
    }
  }

}
