const { normalize, schema } = require('normalizr');

const userSchema = new schema.Entity('users', {
  idAttribute: (value) => value.user,
});

const userListSchema = new schema.Entity('messages', userSchema, {
  user: userSchema,
  idAttribute: (value) => {
    console.log(userSchema);
    return value._id ? value._id : value.id;
  },
});

const normalizedMessages = (data) => {
  return normalize(data, [userListSchema]);
};
module.exports = normalizedMessages;
