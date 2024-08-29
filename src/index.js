"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + '/../public'));
const port = 3000;
const registredUsers = [
    {
        username: "daniel",
        password: "123123"
    },
    {
        username: "admin",
        password: "admin"
    }
];
const logedUsers = [
// 
];
const findUser = (username, password) => {
    return registredUsers.find(user => user.username === username && user.password === password);
};
const findUserByToken = (token) => {
    const pos = parseInt(token);
    return logedUsers[pos];
};
const userAlreadyLoged = (username, password) => {
    return logedUsers.find(user => user.username === username && user.password === password);
};
const deleteToken = (token) => {
    const pos = parseInt(token);
    delete logedUsers[pos];
};
app.get("/check/:token", (req, res) => {
    const { token } = req.params;
    const user = findUserByToken(token);
    if (!user)
        return res.status(401).json({ error: "Token inválido" });
    return res.json({ message: "Usuário logado" });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (userAlreadyLoged(username, password))
        return res.status(401).json({ error: "Usuário já está logado" });
    const user = findUser(username, password);
    if (!user)
        return res.status(401).json({ error: "Usuário não encontrado" });
    logedUsers.push(user);
    const token = logedUsers.length - 1;
    return res.json({ token });
});
app.post("/logout/:token", (req, res) => {
    const { token } = req.params;
    const user = findUserByToken(token);
    if (!user)
        return res.status(401).json({ error: "Token inválido" });
    deleteToken(token);
    return res.json({ message: "Usuário deslogado" });
});
app.listen(port, () => console.log(`⚡ Server is running on port ${port}`));
