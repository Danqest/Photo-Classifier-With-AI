const { AuthenticationError } = require("apollo-server-express");
const { User, Collection, Subfolder } = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("collections").populate({
        path: "collections",
        populate: "subfolders",
      });
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("collections").populate({
        path: "collections",
        populate: "subfolders",
      });
    },
    collections: async () => {
      return await Collection.find({}).populate("subfolders");
    },
    userCollections: async (parent, { collectionOwner }) => {
      return await Collection.find({ collectionOwner }).populate(
        "subfolders"
      );
    },
    subfolders: async () => {
      return await Subfolder.find({});
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCollection: async (parent, { collectionTitle }, context) => {
      if (context.user) {
        const collection = await Collection.create({
          collectionTitle,
          collectionOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { collections: collection._id } }
        );

        return collection;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addSubfolder: async (parent, { subfolderName }, context) => {
      if (context.collection) {
        const subfolder = await Subfolder.create({
          subfolderName,
          parentCollection: context.collection.collectionTitle,
        });

        await Collection.findOneAndUpdate(
          { _id: context.collection._id },
          { $addToSet: { subfolders: subfolder._id } }
        );

        return subfolder;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
