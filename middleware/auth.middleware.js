const db = require('../database');
const jwt = require('jsonwebtoken');

const verifySession = async (req, res, next) => {
  try {
    const { session } = req.body;
    if (session) {
      const isValid = await db.SessionModel.isValid(session._token);
      if (!isValid) {
        throw 'inactive';
      }
      session.decoded = jwt.decode(session._token, { complete: true });
      next();
    } else {
      throw 'inactive';
    }
  } catch (err) {
    res.status(403).send({ status: 4, data: 'You session has expired, please login again' });
  }
};

module.exports = verifySession;