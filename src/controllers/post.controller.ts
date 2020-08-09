import {Request , Response} from 'express'; //express para el router o enrrutador
import {connect} from '../database'; //para la conecion a base de datos
import {Post} from '../interfaces/post.interface';//traer la interfase

export async function getPosts(req:Request,res:Response):Promise<Response>{
   const con= await connect();
   const posts= await con.query('SELECT * FROM posts;');
   return res.json(posts[0]);
}

export async function createPost(req:Request,res:Response):Promise<Response>{
    const newPost:Post=req.body;
    const con= await connect();
    await con.query('INSERT INTO posts SET ?',[newPost]);   
    return res.json({message:'Post Created'});
 }

 export async function getPost(req:Request,res:Response) : Promise<Response> {
    const postID=req.params.postId;
    const con= await connect();
    const post= await con.query('SELECT * FROM posts WHERE id=?;',[postID]);
    return res.json(post[0]);
 }
 
 export async function deletePost(req:Request,res:Response) : Promise<Response> {
    const postID=req.params.postId;
    const con= await connect();
    const post= await con.query('DELETE FROM posts WHERE id=?;',[postID]);
    return res.json({message:'Post Deleted'});
 }
 export async function updatePost(req:Request,res:Response) : Promise<Response> {
    const postID=req.params.postId;
    const updatePost:Post=req.body;
    const con= await connect();
    const post= await con.query('UPDATE posts SET ? WHERE id=?;',[updatePost,postID]);
    return res.json({message:'Post UPDATED'});
 }