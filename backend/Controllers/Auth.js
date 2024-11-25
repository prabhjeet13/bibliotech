const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
exports.signUp = async(req,res) => {
    try {
        const {
            fullname,
            email,
            accountType,
            password,
            confirmPassword,
        } = req.body;
        if(!fullname|| !email || !password || !confirmPassword || !accountType)
        {   
        
            return res.status(404).json({
                success : false,
                message : 'enter your details',
             }); 
        }
    
        // check user is registered ?
        const exitUser = await User.findOne({email : email});
    
        if(exitUser)
        {
            return res.status(401).json({
                success : false,
                message : 'User is already registered',
             }); 
        }
    
        //verify password and confirm password
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success : false,
                message : 'password and confirm-password does not match',
             }); 
        }
        
        // password hashing using bcrypt
    
        const hashedPassword = await bcrypt.hash(password,10);
        // create the user
        const userdetails = await User.create({
            fullname,
            email,
            accountType,
            password: hashedPassword,
        });
    
        return res.status(200).json({
            success : true,
            message : 'registration successfull',
            userdetails,
        });
      }catch(error)
      {
        return res.status(500).json({
            success: false,
            message : 'error at registration side'
    
        })
      }
}


exports.signIn = async(req,res) => {

    try {

        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                success: false,
                message : 'enter all details',
            });
        }

        const existUser = await User.findOne({email : email}).populate("books").exec();


        if(!existUser) {
            return res.status(400).json({
                success: false,
                message : 'please do your registeration',
            }); 
        }

        if(await bcrypt.compare(password,existUser.password))  {
            // building token 
            const payload = {
                id : existUser._id,
                email : existUser.email,
                accountType : existUser.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "24h",
            });
            
            existUser.password = undefined;
            existUser.token = token;

            // building a cookie

            const options = {
                expires :  new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : false,
                sameSite:"none",
                secure:true
            }
            res.cookie("token",token,options).status(200).json({
                success: true,
                token,
                existUser,
                message: 'Login Successfully',
            })
        }else {
            return res.status(401).json({
                success: false,
                message: 'entered wrong password',
            }); 
        }
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message: 'error at signin part'
        })
    }
} 
