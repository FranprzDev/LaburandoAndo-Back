const bcrypt = require("bcryptjs");
const { categoryArray, userArray, workerArray } = require("./constants");
const Category = require("../models/category.model");
const Worker = require("../models/worker.model");
const User = require("../models/user.model");

function cryptPassword(password) {
  if(!password) return null;
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
}

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}

const fillCategories = () => {
  categoryArray.forEach((category) => {
    const newCategory = new Category({
      name: category.name,
    });

    newCategory.save();
  });
};

const fillUsers = () => {
  userArray.forEach((user) => {
    const newUser = new User({
      fullname: user.fullname,
      mail: user.mail,
      password: cryptPassword(user.password),
      role: user.role,
    });

    newUser.save();
  });
};

const fillWorkers = () => {
  workerArray.forEach((worker) => {
    const newWorker = new Worker({
      fullname: worker.fullname,
      mail: worker.mail,
      password: cryptPassword(worker.password),
      phone: worker.phone,
      address: worker.address,
    });

    newWorker.save();
  });
};

const fillDB = () => {
  Category.findOne().then((category) => {
    if (category === null) {
      fillCategories();
    }
  });

  User.findOne().then((user) => {
    if (user === null) {
      fillUsers();
    }
  });

  Worker.findOne().then((worker) => {
    if (worker === null) {
      fillWorkers();
    }
  });
};

module.exports = {
  cryptPassword,
  fillDB,
  comparePassword,
};
