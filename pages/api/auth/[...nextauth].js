const { connectToDatabase } = require('../../../utils/mongodb');

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";

import User from '../../../models/User.model'

const bcrypt = require('bcryptjs');

export default NextAuth({
  providers: [
    CredentialsProvider({

      async authorize(credentials, req) {

        await connectToDatabase()

        const user = await User.findOne({
          $and:[
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
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 1, // 1 jour
  },
  session:{
    maxAge: 60 * 60 * 24 * 1, // 1 jour
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('callbacks jwt: ', { token, user })
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      // console.log('callbacks session: ', { session, token })
      session.user.id = token.id
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})