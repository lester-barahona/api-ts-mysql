"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const database_1 = require("../database"); //para la conecion a base de datos
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield database_1.connect();
        const posts = yield con.query('SELECT * FROM posts;');
        return res.json(posts[0]);
    });
}
exports.getPosts = getPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const con = yield database_1.connect();
        yield con.query('INSERT INTO posts SET ?', [newPost]);
        return res.json({ message: 'Post Created' });
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postID = req.params.postId;
        const con = yield database_1.connect();
        const post = yield con.query('SELECT * FROM posts WHERE id=?;', [postID]);
        return res.json(post[0]);
    });
}
exports.getPost = getPost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postID = req.params.postId;
        const con = yield database_1.connect();
        const post = yield con.query('DELETE FROM posts WHERE id=?;', [postID]);
        return res.json({ message: 'Post Deleted' });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postID = req.params.postId;
        const updatePost = req.body;
        const con = yield database_1.connect();
        const post = yield con.query('UPDATE posts SET ? WHERE id=?;', [updatePost, postID]);
        return res.json({ message: 'Post UPDATED' });
    });
}
exports.updatePost = updatePost;
