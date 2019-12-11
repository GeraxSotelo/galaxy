import mongoose from "mongoose";
import Galaxy from "../models/Galaxy";

const _repository = mongoose.model("Galaxy", Galaxy);

class GalaxiesService {
  async getAll() {
    return await _repository.find({});
  }

  async getByName(name) {
    let data = await _repository.findOne({ name: name });
    if (!data) {
      throw new Error("Invalid Name")
    }
    return data;
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }

  async edit(name, update) {
    let data = await _repository.findOneAndUpdate({ name: name }, update, { new: true })
    if (!data) {
      throw new Error("Invalid Name")
    }
    return data
  }

  async delete(name) {
    let data = await _repository.findOneAndDelete({ name: name })
    if (!data) {
      throw new Error("Invalid Name")
    }
  }
}

const galaxiesService = new GalaxiesService();
export default galaxiesService;
