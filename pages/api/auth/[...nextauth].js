const { connectToDatabase } = require('../../../utils/mongodb');

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import User from '../../../models/User.model'

const bcrypt = require('bcryptjs');

export default NextAuth({
  providers: [
    CredentialsProvider({

      async authorize(credentials, req) {

        await connectToDatabase()

        const user = await User.findOne({
          $and: [
            { email: credentials.email },
            { isEmailVerified: true }
          ]
        })

        const bcryptValidation = await bcrypt.compare(credentials.password, user.password);

        if (bcryptValidation && user) {
          console.log('login OK')
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          console.log('login Not OK')
          return null
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      userinfo: {
        params: {
          fields: "id,email,first_name,last_name,picture"
        }
      },

      profile: async (profile) => {

        await connectToDatabase()

        const profileFromFB = {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          image: profile.picture.data.url
        }

        let user = await User.findOne({ facebookID: profileFromFB.id })

        // 1. Check if user with FB_id already in DB
        if (user) {
          return profileFromFB;
        }
        else {

          user = await User.findOne({ email: profileFromFB.email })

          //2. Check if email from FB has been utilized to create an account
          if (user) {
            user.facebookID = profileFromFB.id;
            user.firstName ? user.firstName : user.firstName = profileFromFB.firstName
            user.lastName ? user.lastName : user.lastName = profileFromFB.lastName
            await user.save();
            
          } else {

            await User.create({
              facebookID: profileFromFB.id,
              email: profileFromFB.email,
              firstName: profileFromFB.firstName,
              lastName: profileFromFB.lastName,
              isEmailVerified: true
            })
          }
          return profileFromFB;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      profile: (profile) => {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture
        };
      },
    })
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 1, // 1 jour
  },
  session: {
    maxAge: 60 * 60 * 24 * 1, // 1 jour
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('callbacks jwt: ', { token, user })
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token
    },
    async session({ session, token }) {
      // console.log('callbacks session: ', { session, token })
      session.user.id = token.id
      session.user.firstName = token.firstName
      session.user.lastName = token.lastName
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})