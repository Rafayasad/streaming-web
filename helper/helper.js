const bcrypt = require('bcrypt');
const axios = require('axios');
const { GraphQLError } = require('graphql');
const getErrorCode = require('../utils/error')

const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        // Handle hashing error
        throw new Error('Error hashing password');
    }
};

// Compare a password with its hash
const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match; // true if passwords match, false otherwise
    } catch (error) {
        // Handle comparison error
        throw new Error('Error comparing passwords');
    }
};

const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        throw new Error('Email cannot be an empty string');
    }
};

const errorGenerator = (err) => {
    const error = getErrorCode(err)
    return new GraphQLError(error.message,
        {
            extensions: {
                code: error.message,
                http: {
                    status: error.statusCode,
                    headers: new Map([
                        ['some-header', 'it was bad'],
                        ['another-header', 'seriously'],
                    ]),
                },
            }
        }
    )
}

const facebookVerifyToken = async (input_token, access_token) => {
    try {
        const verify = await axios.get(`https://graph.facebook.com/v13.0/debug_token`, {
            params: {
                input_token,
                access_token // Your Facebook app access token
            }
        });
        return verify;
    } catch (error) {
        throw new Error('Token verification API error');
    }
};

const getFacebookUserEmail = async (access_token) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v13.0/me`, {
            params: {
                fields: 'email',
                access_token
            }
        });
        return response;
    } catch (error) {
        throw new Error('Fetching user email API error');
    }
};


module.exports = { hashPassword, comparePassword, errorGenerator, validateEmail, facebookVerifyToken, getFacebookUserEmail };