import mongoose from "mongoose";
import Star from "../models/Star";
import ApiError from "../utils/ApiError"
import galaxiesService from "./GalaxiesService"

const _repository = mongoose.model("Star", Star);

class StarsService {
  async getAll() {
    return await _repository.find({});
  }

  async getStarsByGalaxyName(galaxyName) {
    let data = await _repository.find({ galaxyName: galaxyName })
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
    await galaxiesService.getByName(body.galaxyName)
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

const starsService = new StarsService();
export default starsService;
