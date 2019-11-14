import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../userModel';
import message from '../../messages/messages';

const userRegister = async (req, res) => {
  const { password, phone, name, email } = req.body;

  const isUserExists = await checkIsUserExist(email);

  if (isUserExists) {
    return res.status(409).json(message.fail('User with this e-mail exists'));
  }

  const createdUser = await createUser({
    email,
    password,
    phone,
    name,
  });

  if (createdUser.success) {
    return res
      .status(200)
      .json(
        message.success(
          'User created successfully. Please check your email and verify it',
        ),
      );
  } else {
    return res.status(400).json(message.fail('User was not created'));
  }
};

export default userRegister;

function checkIsUserExist(email) {
  return User.findOne({ email: email })
    .exec()
    .then(doc => !!doc)
    .catch(() => false);
}

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

async function createUser({ email, password, phone, name }) {
  const userId = new mongoose.Types.ObjectId();

  const user = new User({
    _id: userId,
    email,
    phone,
    name,
    password: hashPassword(password),
  });

  return user
    .save()
    .then(() => {
      return message.success('User created successfully');
    })
    .catch(error => {
      return message.fail('Error user', error);
    });
}
