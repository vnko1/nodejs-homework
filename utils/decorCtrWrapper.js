const decorCtrWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = decorCtrWrapper;
