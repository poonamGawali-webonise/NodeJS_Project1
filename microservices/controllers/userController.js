var util = require('util');
var userHelper = require('../helpers/userHelper');
const logger = require('../config/logger.config');

//  Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  logger.info('Fetching all users');
  userHelper.findAll().then((userData) => {
    logger.info('Users get successfully');
    res.status(200).json({ status: 200, message: 'Users get successfully', data: userData });
  }).catch((err) => {
    logger.error(err.message || 'Some error occurred while getting the User');
    res.status(500).json({ status: 500, message: err.message || 'Some error occurred while getting the User' });
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  logger.info('Fetching single user with ID ', req.params.userId);
  userHelper.findOne(req.params.userId).then((userData) => {
    if (!util.isNullOrUndefined(userData)) {
      logger.info('User get successfully');
      res.status(200).json({ status: 200, message: 'User get successfully', data: userData });
    }
    else {
      logger.warn('User not found with ID ', req.params.userId);
      res.status(404).json({ status: 404, message: `User not found with ID ${req.params.userId}` });
    }
  }).catch((err) => {
    if (err.kind === 'ObjectId') {
      logger.warn('User not found with ID ', req.params.userId);
      return res.status(404).send({ status: 404, message: `User not found with ID ${req.params.userId}` });
    }
    logger.error(err.message || 'Some error occurred while getting the User');
    return res.status(500).json({ status: 500, message: err.message || 'Some error occurred while getting the User' });
  });
};

// Create and Save a new User
exports.create = (req, res) => {
  logger.info('Creating a new user');
  // Validate request
  if (Object.keys(req.body).length > 0) {
    userHelper.create(req.body).then((userData) => {
      logger.info('User added successfully');
      res.status(200).json({ status: 200, message: 'User added successfully', data: userData });
    }).catch((err) => {
      if (err.code === 11000) {
        logger.warn('Username already exist');
        res.status(409).json({ status: 409, message: 'Username already exist' });
      }
      else {
        logger.error(err.message || 'Some error occurred while creating the User');
        res.status(500).json({ status: 500, message: err.message || 'Some error occurred while creating the User' });
      }
    });
  }
  else {
    logger.error('User content can not be empty');
    res.status(400).json({ status: 400, message: 'User content can not be empty' });
  }
};

// Update a user identified by the user Id in the request
exports.update = (req, res) => {
  logger.info('Updating existing user with ID ', req.params.userId);
  // Validate request
  if (Object.keys(req.body).length > 0) {
    userHelper.update(req.params.userId, req.body).then((userData) => {
      if (!util.isNullOrUndefined(userData)) {
        logger.info('User updated successfully');
        res.status(200).json({ status: 200, message: 'User updated successfully', data: userData });
      }
      else {
        logger.warn('User not found with ID ', req.params.userId);
        res.status(404).json({ status: 404, message: `User not found with ID ${req.params.userId}` });
      }
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        logger.warn('User not found with ID ', req.params.userId);
        return res.status(404).send({ status: 404, message: `User not found with ID ${req.params.userId}` });
      }

      if (err.code === 11000) {
        logger.warn('Username already exist');
        return res.status(409).json({ status: 409, message: 'Username already exist' });
      }
      logger.error(err.message || 'Some error occurred while updating the User');
      return res.status(500).send({ status: 500, message: `Error updating user with ID ${req.params.userId}` });
    });
  }
  else {
    logger.error('User content can not be empty');
    res.status(400).json({ status: 400, message: 'User content can not be empty' });
  }
};

exports.patch = (req, res) => {
  logger.info('Patching existing user with ID ', req.params.userId);
  // Validate request
  if (Object.keys(req.body).length > 0) {
    userHelper.patch(req.params.userId, req.body).then((userData) => {
      if (!util.isNullOrUndefined(userData)) {
        logger.info('User updated successfully');
        res.status(200).json({ status: 200, message: 'User updated successfully', data: userData });
      }
      else {
        logger.warn('User not found with ID ', req.params.userId);
        res.status(404).json({ status: 404, message: `User not found with ID ${req.params.userId}` });
      }
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        logger.warn('User not found with ID ', req.params.userId);
        return res.status(404).send({ status: 404, message: `User not found with ID ${req.params.userId}` });
      }

      if (err.code === 11000) {
        logger.warn('Username already exist');
        return res.status(409).json({ status: 409, message: 'Username already exist' });
      }
      logger.error(err.message || 'Some error occurred while updating the User');
      return res.status(500).send({ status: 500, message: `Error updating user with ID ${req.params.userId}` });
    });
  }
  else {
    logger.error('User content can not be empty');
    res.status(400).json({ status: 400, message: 'User content can not be empty' });
  }
};

// Delete a single user with the specified user Id in the request
exports.deleteOne = (req, res) => {
  logger.info('Deleting single user with ID ', req.params.userId);
  userHelper.deleteOne(req.params.userId).then((data) => {
    if (!util.isNullOrUndefined(data)) {
      logger.info('User deleted successfully');
      res.status(200).json({ status: 200, message: 'User deleted successfully' });
    }
    else {
      logger.warn('User not found with ID ', req.params.userId);
      res.status(404).json({ status: 404, message: `User not found with ID ${req.params.userId}` });
    }
  }).catch((err) => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      logger.warn('User not found with ID ', req.params.userId);
      return res.status(404).send({ message: `User not found with ID ${req.params.userId}` });
    }
    logger.error(err.message || 'Some error occurred while deleting the User');
    return res.status(500).sendatad({ status: 500, message: `Could not delete user with ID ${req.params.userId}` });
  });
};

// Delete multiple user with the specified user Id in the request
exports.deleteMany = (req, res) => {
  logger.info('Deleting multiple users');
  userHelper.deleteMany(req.body).then((data) => {
    if (data.deletedCount !== 0) {
      res.status(200).json({ status: 200, message: 'Users deleted successfully' });
    }
    else {
      logger.warn('User not found with ID ', req.body);
      res.status(404).json({ status: 404, message: `User not found with ID ${req.body}` });
    }
  }).catch((err) => {
    logger.warn('User not found with ID ', req.body);
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({ message: `User not found with ID ${req.body}` });
    }
    logger.error(err.message || 'Some error occurred while deleting the User');
    return res.status(500).send({ status: 500, message: `Could not delete user with ID ${req.body}` });
  });
};
