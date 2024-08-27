import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,
    updateProductController, productFiltersController, productCountController, productListController, braintreeTokenController,brainreePaymentController} from '../controllers/productController.js';
import formidable from 'express-formidable' 


const router = express.Router();

//create product

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

// update product

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);


//get products
router.get('/get-products', getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController);

//get photo

router.get('/product-photo/:pid',productPhotoController)

//delete product

router.delete('/delete-product/:id',deleteProductController)

//filter product

router.post('/product-filters',productFiltersController)

//product count 

router.get('/product-count', productCountController)


//product per page

router.get('/product-list/:page',productListController)

//payments routes
//token
router.get('/braintree/token',braintreeTokenController)

//payments

router.post('/braintree/payment',requireSignIn,brainreePaymentController)

export default router;