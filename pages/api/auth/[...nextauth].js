const { connectToDatabase } = require('../../../lib/mongodb');

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from '../../../models/User.model'

const bcrypt = require('bcryptjs');

export default NextAuth({
    providers: [
        CredentialsProvider({
           
            async authorize(credentials, req) {
                
                await connectToDatabase()

                const user = await User.findOne({ email: credentials.email })
                const bcryptValidation = await bcrypt.compare(credentials.password, user.password);                

                if (bcryptValidation && user ) {
                    console.log('login OK')
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null or false then the credentials will be rejected
                    console.log('login Not OK')
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
    ]
})