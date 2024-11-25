// after login, for persuing activities for authorized person
// token will verify here 
// checking the role of admin and coder basis on token
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.auth = async(req,res,next) => {
    try {
        const token = req.cookies.token || req.body.token;
        console.log(token);
        if(!token)
            {
                return res.status(400).json({
                    success : false,
                    message : 'token is missing',
                })
            }
            
            // verify token
            try {
            const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decodeToken;
        }catch(error){
            return res.status(401).json({
                success: false,
                message: 'token has not been decoded',
            });           
        }    
        
        next();

    }catch(error){
        return res.status(500).json({
            success: false,
            message : 'not a valid user',
        })
    }
}


exports.isAdmin = async(req,res,next) =>{
    try {

        if(req.user.accountType !== "Admin")
        {
            return res.status(400).json({
                success: false,
                message : 'protected route for admin only',
            });
        }
        next();
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'Admin role is not verified',
        })
    }
}

exports.isBuyer = async(req,res,next) =>{
    try {

        if(req.user.accountType !== "Buyer")
        {
            return res.status(400).json({
                success: false,
                message : 'protected route for Buyer only',
            });
        }

        next();
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message : 'coder role is not verified',
        })
    }
}