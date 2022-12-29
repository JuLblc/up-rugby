const { connectToDatabase } = require("../../../utils/mongodb");

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import User from "../../../models/User.model";

const bcrypt = require("bcryptjs");

export default NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // console.log('callbacks jwt: ', { token, user })
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log('callbacks session: ', { session, token })
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.role = token.role;

      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 1,
    secret: process.env.NEXTAUTH_SECRET, // 1 jour
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({
          $and: [{ email: credentials.email }, { isEmailVerified: true }],
        });

        const bcryptValidation = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (bcryptValidation && user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        // If you return null or false then the credentials will be rejected
        return null;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profile: async (profile) => {
        await connectToDatabase();

        const profileFromFB = {
          email: profile.email,
          firstName: profile.first_name,
          id: profile.id,
          image: profile.picture.data.url,
          lastName: profile.last_name,
        };

        // 1. Check if user with FB_id already in DB
        // eslint-disable-next-line immutable/no-let
        let user = await User.findOne({ facebookID: profileFromFB.id });

        if (user) {
          return user;
        }

        //2. Check if email from FB has been utilized to create an account
        user = await User.findOne({ email: profileFromFB.email });
        if (user) {
          user.facebookID = profileFromFB.id;
          user.firstName
            ? user.firstName
            : (user.firstName = profileFromFB.firstName);
          user.lastName
            ? user.lastName
            : (user.lastName = profileFromFB.lastName);
          await user.save();

          return user;
        }

        //3. Create user
        const newUser = await User.create({
          email: profileFromFB.email,
          facebookID: profileFromFB.id,
          firstName: profileFromFB.firstName,
          isEmailVerified: true,
          lastName: profileFromFB.lastName,
        });

        return newUser;
      },

      userinfo: {
        params: {
          fields: "id,email,first_name,last_name,picture",
        },
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      profile: async (profile) => {
        await connectToDatabase();

        const profileFromGoogle = {
          email: profile.email,
          firstName: profile.given_name,
          id: profile.sub,
          image: profile.picture,
          lastName: profile.family_name,
        };

        // 1. Check if user with Google_id already in DB
        // eslint-disable-next-line immutable/no-let
        let user = await User.findOne({ googleID: profileFromGoogle.id });

        if (user) {
          return user;
        }

        //2. Check if email from Google has been utilized to create an account
        user = await User.findOne({ email: profileFromGoogle.email });
        if (user) {
          user.googleID = profileFromGoogle.id;
          user.firstName
            ? user.firstName
            : (user.firstName = profileFromGoogle.firstName);
          user.lastName
            ? user.lastName
            : (user.lastName = profileFromGoogle.lastName);
          await user.save();

          return user;
        }

        //3. Create user
        const newUser = await User.create({
          email: profileFromGoogle.email,
          firstName: profileFromGoogle.firstName,
          googleID: profileFromGoogle.id,
          isEmailVerified: true,
          lastName: profileFromGoogle.lastName,
        });

        return newUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24 * 1, // 1 jour
  },
});
