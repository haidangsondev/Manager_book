import publisherModel from "../models/publisher.model.js";

export const getPublisherId = async (id) => {
  return await publisherModel.findById(id);
};

export const addPublisher = async (data) => {
  return await publisherModel.create(data);
};
export const getAllPublisher = async (query) => {
  return await publisherModel.find(query);
};
export const updateIsPublisher = async (_id, updateData) => {
  return await publisherModel.findByIdAndUpdate(_id, updateData, { new: true });
};
export const deleteIsPublisher = async (publisherId) => {
  return await publisherModel.findByIdAndDelete(publisherId);
};
