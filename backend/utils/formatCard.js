const PopulationError = require('../errors/PopulationError');

const formatCard = (populatedCard) => {
  if (!populatedCard) {
    throw new PopulationError();
  }

  return {
    _id: populatedCard._id,
    name: populatedCard.name,
    link: populatedCard.link,
    createdAt: populatedCard.createdAt,
    likes: populatedCard.likes.map((like) => ({
      name: like.name,
      about: like.about,
      avatar: like.avatar,
      _id: like._id,
    })),
    owner: {
      _id: populatedCard.owner._id,
      name: populatedCard.owner.name,
      about: populatedCard.owner.about,
      avatar: populatedCard.owner.avatar,
    },
  };
};

module.exports = formatCard;
