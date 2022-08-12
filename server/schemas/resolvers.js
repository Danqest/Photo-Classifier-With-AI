const { User, Collection, Subfolder } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("collections");
    },
    collections: async () => {
      return await Collection.find({}).populate("subfolders");
    },
    subfolders: async () => {
      return await Subfolder.find({});
    },
  },
};

module.exports = resolvers;
