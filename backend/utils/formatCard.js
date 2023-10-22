const PopulationError = require('../errors/PopulationError');

const formatCard = (populatedCard) => {
  if (!populatedCard) {
    throw new PopulationError();
  }

  return {
    placeName: populatedCard.placeName,
    link: populatedCard.link,
    createdAt: populatedCard.createdAt,
    _id: populatedCard._id,
    likes: populatedCard.likes.map((like) => ({
      name: like.name,
      about: like.about,
      avatar: like.avatar,
      _id: like._id,
    })),
    owner: {
      name: populatedCard.owner.name,
      about: populatedCard.owner.about,
      avatar: populatedCard.owner.avatar,
      _id: populatedCard.owner._id,
    },
  };
};

module.exports = formatCard;
