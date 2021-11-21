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
router.get('/registerSeeker', index_1.DisplayRegisterSeekerPage);
router.post('/registerSeeker', index_1.ProcessRegisterSeekerPage);
//# sourceMappingURL=index.js.map