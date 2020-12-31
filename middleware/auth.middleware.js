const db = require('../database');

const verifySession = async (req, res, next) => {
  try {
    const { session } = req.body;
    if (session) {
      const isValid = await db.SessionModel.isValid(session);
      if (!isValid) {
        throw 'inactive';
      }
      next();
    } else {
      throw 'inactive';
    }
  } catch (err) {
    res.status(403).send({ status: 4, data: 'You session has expired, please login again' });
  }
};

module.exports = verifySession;