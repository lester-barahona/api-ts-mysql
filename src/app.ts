
import express,{ Application } from 'express';
import morgan from 'morgan';

/**Routes */
import indexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';


export class App{

    private app:Application;
    private port?:number | string;

    constructor(port?:number | string){
        this.app=express();
        this.port=port;
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port',this.port|| process.env.PORT ||3000);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json()); //para datos de forms: express.urlencoded(extended:false)
    }

    routes(){
        this.app.use(indexRoutes);
        this.app.use('/posts',PostRoutes);
    }
    
    async listen(){
      await this.app.listen(this.app.get('port')); 
      console.log('Server on port ',this.app.get('port'));
    }


}