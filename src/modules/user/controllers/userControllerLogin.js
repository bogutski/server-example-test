import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import User from '../userModel';
import message from '../../messages/messages';

const userLogin = (req, res) => {
  const email = get(req, 'body.email', '')
    .trim()
    .toLowerCase();

  User.findOne({ email: email })
    .select('+password')
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
          if (err) {
            return res.status(401).json(message.fail('Auth failed'));
          } else if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              },
            );

            user.password = null;

            return res.status(200).json({
              message: 'Auth success',
              token,
              user: user,
              userId: user._id,
            });
          } else {
            res.status(401).json(message.fail('Auth failed'));
          }
        });
      } else {
        res.status(401).json(message.fail('Auth failed'));
      }
    })
    .catch(error => {
      res.status(400).json(message.fail('Auth failed. Error', error));
    });
};

export default userLogin;
