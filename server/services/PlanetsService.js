import mongoose from "mongoose";
import Planet from "../models/Planet";
import ApiError from "../utils/ApiError";
import starsService from "./StarsService"

const _repository = mongoose.model("Planet", Planet);

class PlanetsService {
  async getAll() {
    return await _repository.find({});
  }

  async getPlanetsByStarName(starName) {
    let data = await _repository.find({ starName: starName })
    if (!data) {
      throw new ApiError("Invalid Name")
    }
    return data
  }

  async getByName(name) {
    let data = await _repository.findOne({ name: name });
    if (!data) {
      throw new ApiError("Invalid Name")
    }
    return data;
  }

  async create(body) {
    await starsService.getByName(body.starName)
    let data = await _repository.create(body);
    return data;
  }

  async edit(name, update) {
    let data = await _repository.findOneAndUpdate({ name: name }, update, { new: true })
    if (!data) {
      throw new ApiError("Invalid Name")
    }
    return data
  }

  async delete(name) {
    let data = await _repository.findOneAndDelete({ name: name })
    if (!data) {
      throw new ApiError("Invalid Name", 400)
    }
  }
}

const planetsService = new PlanetsService();
export default planetsService;
