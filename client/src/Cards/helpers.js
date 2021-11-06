module.exports.cardHelpers = {
  findReviewAverage: function (input) {
    var totalReviews = 0;

    var totalStars = 0;
    for (var key in input) {
      totalReviews += JSON.parse(input[key]);
      totalStars += JSON.parse(key) * JSON.parse(input[key]);
    }
    if (totalReviews === 0) {
      return 0;
    }
    return totalStars / totalReviews;
  },
};
