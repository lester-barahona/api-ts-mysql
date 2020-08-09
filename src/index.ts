/*import express from 'express';
const app=express();
app.listen(3000,()=>console.log('Server on port 3000')
);*/

import { App } from './app';

async function main(){

    const app=new App(3000);
    await app.listen();

}

main();