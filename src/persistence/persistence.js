import config from "../config/config.js";
import { __dirname } from "../utils.js";

// MongoDB
import CartDaoMongoDB from "./daos/mongodb/cart/cart.dao.js";
import ChatDaoMongoDB from "./daos/mongodb/chat/chat.dao.js";
import ProductDaoMongoDB from "./daos/mongodb/product/product.dao.js";
import UserDaoMongoDB from "./daos/mongodb/user/user.dao.js";
import { initMongoDB } from "../config/connection.js";

// Filesystem
import CartDaoFS from "./daos/filesystem/cart.dao.js";
import ProductDaoFS from "./daos/filesystem/product.dao.js";

let cartDao;
let chatDao;
let prodDao;
let userDao;
const persistence = config.PERSISTENCE;

switch (persistence) {
  case "FS":
    cartDao = new CartDaoFS(__dirname + "/daos/filesystem/data/carts.json");
    prodDao = new ProductDaoFS(
      __dirname + "/daos/filesystem/data/products.json"
    );
    console.log("Persistence is : ", persistence);
    break;
  case "MONGO":
    await initMongoDB();
    cartDao = new CartDaoMongoDB();
    chatDao = new ChatDaoMongoDB();
    prodDao = new ProductDaoMongoDB();
    userDao = new UserDaoMongoDB();
    console.log("Persistence is : ", persistence);
    break;
  default:
    cartDao = new CartDaoFS(__dirname + "/daos/filesystem/data/carts.json");
    prodDao = new ProductDaoFS(
      __dirname + "/daos/filesystem/data/products.json"
    );
    console.log("Persistence is : ", persistence);
    break;
}

export { cartDao, chatDao, prodDao, userDao };