import userModel from "../models/userModel.js";
import orderModels from "../models/orderModels.js";
import { hashPassword, comparePassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req,res) => {
    try{
        const { name,email,password,phone,address,answer } = req.body;
        if(!name){
            return res.send({ message: 'Name is Required' });
        }
        if(!email){
            return res.send({ message: 'Email is Required' });
        }
        if(!password){
            return res.send({ message: 'Password is Required' });
        }
        if(!phone){
            return res.send({ message: 'Phone is Required' });
        }
        if(!address){
            return res.send({ message: 'Address is Required' });
        }
        if(!answer){
            return res.send({message: 'Answer is Required'});
        }
        
        

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already Register please login'
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = new userModel ({name,email,phone,address,answer,password: hashedPassword}).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

export const loginController = async (req,res) => {
    try{
        const { email,password } = req.body

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        const match = await comparePassword(password,user.password)

        if(!match){
            return res.status(404).send({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = await JWT.sign({ _id: user._id}, process.env.JWT_SECRET ,{ expiresIn: "7d" })

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

//forgotPasswordController

export const forgotPasswordController = async (req,res) => {
    try{
        const {email,answer,newPassword} = req.body

        if(!email){
            res.status(400).send({message: 'Email is required'})
        }

        if(!answer){
            res.status(400).send({message: 'Answer is required'})
        }

        if(!newPassword){
            res.status(400).send({message: 'New Password is required'})
        }

        const user = await userModel.findOne({email,answer});

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }

        const hashed = await hashPassword(newPassword)

        await userModel.findByIdAndUpdate(user._id,{password: hashed});

        res.status(200).send({
            success: true,
            message: 'Password Reset Succesfully'
        })

    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}


//update profile

export const updateProfileController = async (req, res) => {
    try {
      const { name, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  //orders

  export const getOrdersController = async (req,res) => {
    try{
        const orders = await orderModels.find({buyer: req.user._id}).populate("products","-photo").populate("buyer","name")
        res.json(orders)
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while get orders',
            error
        })
    }
  }

