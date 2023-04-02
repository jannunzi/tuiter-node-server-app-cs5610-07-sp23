import tuitsModel from "./tuits-model.js";

export const findAllTuits = () => tuitsModel.find();

export const findTuitById = (tuitId) => tuitsModel.findById(tuitId);

export const createTuit = (tuit) => tuitsModel.create(tuit);

export const updateTuit = (tuitId, tuit) =>
  tuitsModel.updateOne({ _id: tuitId }, tuit);

export const deleteTuit = (tuitId) => tuitsModel.deleteOne({ _id: tuitId });
