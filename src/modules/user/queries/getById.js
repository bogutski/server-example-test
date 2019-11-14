import User from '../userModel';
import message from '../../messages/messages';

const userGetByIdQuery = userId => {
  return User.findById(userId)
    .select('-__v')
    .exec()
    .then(user => {
      if (user) {
        return message.success('User get by id OK', user);
      } else {
        return message.fail('No User for provided id');
      }
    })
    .catch(err => {
      return message.fail('Get User by id ERROR', err);
    });
};

export default userGetByIdQuery;
