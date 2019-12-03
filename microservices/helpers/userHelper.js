var userModel = require('../models/user.model');

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    userModel.find().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.findOne = (userId) => {
  return new Promise((resolve, reject) => {
    userModel.findById(userId).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.create = (userData) => {
  return new Promise((resolve, reject) => {
  // Create a User
    const User = new userModel(userData);
    // Save User in the database
    User.save().then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.update = (userId, userData) => {
  return new Promise((resolve, reject) => {
    // Update User in the database
    userModel.findByIdAndUpdate(userId, userData, { new: true }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.patch = (userId, userData) => {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndUpdate(userId, userData, { new: true }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.deleteOne = (userId) => {
  return new Promise((resolve, reject) => {
  // Delete User in the database
    userModel.findByIdAndRemove(userId).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.deleteMany = (userIds) => {
  return new Promise((resolve, reject) => {
  // Delete User in the database
    userModel.remove({ _id: userIds }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
};
