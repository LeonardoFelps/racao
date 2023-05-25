import { Router } from "express";
import multer from 'multer';

//middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadconfig from './config/multer'

//rotas user
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

//rotas admin
import { CreateAdminController } from "../admin/src/controllers/user/CreateAdminController";
import { AuthAdminController } from "../admin/src/controllers/user/AuthAdminController";
import { DetailAdminController } from "../admin/src/controllers/user/DetailAdminController";

//rotas categorias
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

//rotas produtos
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";

//rotas pedidos
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailsOrderController } from "./controllers/order/DetailsOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


const router = Router();

const upload = multer(uploadconfig.upload("./tmp"))

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

router.post('/admin/session', new AuthAdminController().handle)
router.post('/admin/users', new CreateAdminController().handle)
router.get('/admin/me', isAuthenticated, new DetailAdminController().handle)

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/product', new ListProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailsOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };