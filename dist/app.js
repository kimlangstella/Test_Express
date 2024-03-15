"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const student_route_1 = require("./routes/student.route");
const user_route_1 = require("./routes/user.route");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello from express!!!");
});
app.get("/hi", (req, res) => {
    res.send("hi");
});
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, 'views'));
app.use("/student", student_route_1.studentRouter);
app.use("user", user_route_1.userRouter);
app.listen(5000, () => {
    console.log(`now listening node helo`);
});
