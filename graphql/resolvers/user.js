const { PrismaClient, Prisma } = require('../../src/generated/client')
const { errorName, successName } = require('../../utils/constants');
const { hashPassword, comparePassword, errorGenerator, validateEmail } = require('../../helper/helper')
const { generateToken } = require('../../helper/jwtHelper')
const auth = require('../../context/authorization');
const upload = require('../../upload/upload');
const EmailController = require('../../email/index');

const prisma = new PrismaClient({
    errorFormat: 'pretty'
})

const userResolver = {
    Query: {

        getUser: async (parent, args, { id }) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
                return user

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        getAllUsers: async (parent, { input }, { id }) => {
            try {
                let filter = {}
                if (input?.roleId) filter = input
                const user = await prisma.user.findMany({
                    where: filter
                })
                return user

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        }

    },

    Mutation: {

        register: async (parent, { input }, ctx) => {
            try {
                const { email, password, roleId } = input
                validateEmail(email)
                const hashedPassword = await hashPassword(password)
                const user = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        roleId
                    }
                })
                const id = user.id
                const token = await generateToken({ id })

                return {
                    data: {
                        ...user,
                        token
                    },
                    message: successName.REGISTER
                }

            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') return errorGenerator(errorName.EMAILALREADYEXIST)
                    else if (err.code === 'P2003') return errorGenerator(errorName.ROLEIDINVALID)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        login: async (parent, { input }, ctx) => {
            try {
                // console.log("ctx",ctx.req.headers);
                const { email, password } = input
                validateEmail(email)
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user || ! await comparePassword(password, user.password)) {
                    return errorGenerator(errorName.INVALIDEMAILPASSWORD)
                }
                const id = user.id
                const token = await generateToken({ id })
                delete user.password
                delete user.type
                return {
                    data: {
                        ...user,
                        token
                    },
                    message: successName.LOGIN
                }

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        forgetPassword: async (parent, { input }, { id }) => {
            try {
                const { email } = input
                validateEmail(email)
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user) {
                    return errorGenerator(errorName.EMAILNOTREGISTERED)
                }
                const generateOTP = Math.floor(1000 + Math.random() * 9000);
                const now = new Date();
                const otpExpiry = new Date(now.getTime() + 1 * 60000);
                const data = {
                    userId: user.id,
                    otp: generateOTP,
                    otpExpiry: otpExpiry,
                    used: false
                }
                const otpExist = await prisma.otp.findUnique({
                    where: {
                        userId: user.id
                    }
                })
                if (otpExist) {
                    await prisma.otp.update({
                        where: {
                            userId: user.id
                        },
                        data
                    })
                } else await prisma.otp.create({ data })

                // let body = `Your OTP is ${generateOTP}`;
                // EmailController.sendOTP(email, 'OTP', body).then(() => {
                //     return checkEmail
                // })

                return {
                    message: successName.OTPSEND,
                    data: {
                        email
                    }
                }

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        verifyCode: async (parent, { input }, { id }) => {
            try {
                const { otp, email } = input
                const now = new Date();
                const otpVerify = await prisma.otp.findUnique({
                    where: {
                        userId: id,
                        otp,
                        used: false
                    }
                })
                if (!otpVerify || otpVerify.otpExpiry <= now) return errorGenerator(errorName.EXPIREDOTP)
                await prisma.otp.update({
                    where: {
                        id: otpVerify.id
                    },
                    data: {
                        used: true
                    }
                })

                return {
                    message: successName.OTPVERIFIED,
                    data: {
                        email
                    }
                }

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        resetPassword: async (parent, { input }, { id }) => {
            try {
                const { password, email } = input
                const now = new Date();
                const otpVerify = await prisma.otp.findUnique({
                    where: {
                        userId: id,
                        otp,
                        used: true
                    }
                })
                if (otpVerify.otpExpiry > now) return errorGenerator(errorName.EXPIREDOTP)
                const hashedPassword = await hashPassword(password)
                const user = await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        password: hashedPassword
                    }
                })
                const token = await generateToken({ email })

                delete user.password
                delete user.type

                return {
                    message: successName.RESETPASSWORD,
                    data: {
                        ...user,
                        token
                    }
                }

            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') return errorGenerator(errorName.INVALIDEMAILPASSWORD)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }

                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        updateUser: async (parent, { input, profilePic }, { id }) => {
            try {
                let data = input
                if (profilePic != undefined) {
                    data = {
                        ...input,
                        profilePic: await upload.uploadImage(profilePic.file, "profile")
                    }
                }
                const user = await prisma.user.update({
                    where: {
                        id
                    },
                    data
                })
                delete user.password
                delete user.type

                return {
                    data: user,
                    message: successName.UPDATEUSER
                }

            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') return errorGenerator(errorName.NORECORDFOUND)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }

                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        verifyAuthToken: async (parent, { input }, { id }) => {
            try {
                const { accessToken, type, roleId } = input
                let email = ''
                if (type === 'google') email = await auth.googleTokenVerify(accessToken)
                else if (type === 'facebook') email = await auth.facebookTokenVerify(accessToken)
                else if (type === 'apple') email = await auth.googleTokenVerify(accessToken)

                let id;
                let token;

                const existUserWithSameType = await prisma.user.findUnique({
                    where: {
                        email,
                        type
                    }
                })

                id = existUserWithSameType.id
                token = await generateToken({ id })

                if (existUserWithSameType) {
                    delete existUserWithSameType.password
                    delete existUserWithSameType.type
                    return {
                        data: {
                            ...existUserWithSameType,
                            token
                        },
                        message: successName.LOGIN
                    }
                }

                const user = await prisma.user.create({
                    data: {
                        email,
                        type,
                        roleId
                    }
                })

                id = user.id
                token = await generateToken({ id })

                delete user.password
                delete user.type

                return {
                    data: {
                        ...user,
                        token
                    },
                    message: successName.LOGIN
                }


            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') return errorGenerator(errorName.EMAILALREADYEXIST)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }

                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

    },

};


module.exports = userResolver;