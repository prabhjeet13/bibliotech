const Book = require('../Models/BookModel');
const User = require('../Models/UserModel');
exports.storeBook = async(req,res) => {
    try {

        const file = req.file;
        const {
            ISBN,
            name,
            description,
            price,
            category,
            title,
            quantity,
        } = req.body;



        const userId = req.user.id;

        if(!ISBN || !name|| !price || !category || !title || !quantity || !file || !description)
        {   
            // console.log(file);
            return res.status(404).json({
                success : false,
                message : 'enter your details',
             }); 
        }
    
        // check user is registered ?
        const exitBook = await Book.findOne({ISBN : ISBN});
    
        if(exitBook)
        {
            return res.status(401).json({
                success : false,
                message : 'book is already stored',
             }); 
        }

        const bookdetails = await Book.create({
            ISBN,
            name,
            price,
            category,
            description,
            title,
            quantity,
            image : file.path,
        });

        const userDetails = await User.findByIdAndUpdate(
            {_id : userId},
            {
                $push : {
                    books : bookdetails._id,
                }
            },
            {new : true} 
        ).populate("books").exec();



    
        return res.status(200).json({
            success : true,
            message : 'book stored successfully',
            bookdetails,
            userDetails
        });
      }catch(error)
      {
        return res.status(500).json({
            success: false,
            message : 'error at registration side'
    
        })
      }
}

exports.getallbooks = async(req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            success : true,
            message : 'book stored successfully',
            books,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message : 'error at fectching books'
        })
    }
}
exports.getbook = async(req,res) => {
    try {
        console.log(req.body);
        const {bookId} = req.body;
        const book = await Book.findById(bookId);

        return res.status(200).json({
            success : true,
            message : 'book fetch successfully',
            book,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message : 'error at fectching book'
        })
    }
}

exports.order = async(req,res) => {
    try {
        const { items } = req.body;
        console.log(items);
        const userId = req.user.id;
        if(!items)
            {   
                // console.log(file);
                return res.status(404).json({
                    success : false,
                    message : 'enter your details',
                }); 
            }
            let userDetails;
            for(let item of items) {
                try {
                    let existBook = await Book.findByIdAndUpdate(
                        item._id,
                        { $inc: { quantity: -item.quantity } }, // Decrement the quantity
                        { new: true } // To return the updated document
                    );
                    userDetails = await User.findByIdAndUpdate(
                        {_id : userId},
                        {
                            $push : {
                                books : existBook._id,
                            }
                        },
                        {new : true} 
                    ).populate("books").exec();
                }catch(error)
                {
                    return res.status(500).json({
                        success: false,
                        message : 'error at order side'
                        
                    })
                }
            }  
        return res.status(200).json({
            success : true,
            message : 'book stored successfully',
            userDetails
        });
      }catch(error)
      {
        return res.status(500).json({
            success: false,
            message : 'error at order side'
    
        })
      }
}