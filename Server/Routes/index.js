"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Controllers/index");
router.get('/home', index_1.DisplayHomePage);
router.get('/register', index_1.DisplayRegisterPage);
router.post('/register', index_1.ProcessRegisterPage);
//# sourceMappingURL=index.js.map