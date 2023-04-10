import reviewsModel from "./reviews-model.js";

export const findAllReviews = async () => {
  return await reviewsModel.find();
};

export const findReviewsByAlbumId = async (albumId) => {
  return await reviewsModel.find({ albumId: albumId });
};

export const findReviewsByUserId = async (userId) => {
  return await reviewsModel.find({ user: userId });
};

export const createReview = async (review) => {
  return await reviewsModel.create(review);
};

export const deleteReview = async (reviewId) => {
  return await reviewsModel.deleteOne({ _id: reviewId });
};

export const updateReview = async (reviewId, review) => {
  return await reviewsModel.updateOne({ _id: reviewId }, { $set: review });
};
