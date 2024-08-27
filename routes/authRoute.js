import express from 'express'

import {registerController, loginController, forgotPasswordController, updateProfileController,getOrdersController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

//routing
//REGISTER || METHOD POST

router.post('/register',registerController);

//LOGIN || POST

router.post('/login',loginController);

// router.get('/test',requireSignIn,isAdmin,testController)

//Forgot Password || POST

router.post('/forgot-password', forgotPasswordController)

// protected Admin route auth

router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ ok: true });
})

//protected route path

router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ ok: true });
})

router.put('/profile',requireSignIn,updateProfileController);

//orders

router.get('/orders',requireSignIn,getOrdersController)


export default router;