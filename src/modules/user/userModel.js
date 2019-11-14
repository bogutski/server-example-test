import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },

    name: {
      type: String,
      unique: false,
      trim: true,
      default: '',
    },

    password: {
      type: String,
      select: false,
      required: true,
    },
  },

  { timestamps: {}, versionKey: false },
);

export default mongoose.model('User', userSchema);
