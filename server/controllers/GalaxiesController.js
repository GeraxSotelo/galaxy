import express from "express";
import galaxiesService from "../services/GalaxiesService";

export default class GalaxiesController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:name", this.getByName)
      .post("", this.create)
      .put("/:name", this.edit);
  }

  async getAll(req, res, next) {
    try {
      let data = await galaxiesService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req, res, next) {
    try {
      let data = await galaxiesService.getByName(req.params.name);
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let data = await galaxiesService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await galaxiesService.edit(req.params.name, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await galaxiesService.delete(req.params.name);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error)
    }
  }

}
