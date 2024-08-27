import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

//update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

//getAll Category
router.get("/get-category",categoryController)

//get single Category

router.get("/single-category/:slug",singleCategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router