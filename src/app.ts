import express, { Application, Request } from 'express';
import path from 'path'
import morgan from "morgan";
import cors from 'cors'
import multer, { FileFilterCallback } from 'multer';
import { UserRoutes } from './routes/user.routes';
import { ProjectRoutes } from './routes/project.routes';
import { TaskboardRoutes } from './routes/taskboard.routes';
import { TaskRoutes } from './routes/task.routes'


export class App {
    
    private app: Application;
    
    private routes = {
        projectRouter: new ProjectRoutes().router,
        taskboardRouter: new TaskboardRoutes().router,
        userRouter: new UserRoutes().router,
        taskRouter: new TaskRoutes().router
    }

    private storage: multer.StorageEngine = multer.diskStorage({
        destination: 'public/uploads',
        filename: (req: Request, file: Express.Multer.File, callback) => {
            callback(null, file.originalname)
        }
    })

    constructor(private port? : number | string) {
        this.app = express();
        this.Settings();
        this.MiddleWares();
        this.Routes();
    }

    private Settings() : void {
        this.app.set('port', this.port || process.env || 4000);
    }

    private MiddleWares() : void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(multer({
            storage: this.storage,
            dest: 'public/uploads',
            fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) : void => {
                const fileTypes = /jpeg|jpg|png/
                const mimeType = fileTypes.test(file.mimetype);
                const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
            
                if (mimeType && extName) {
                    return callback(null, true)
                }

                callback(Error("File upload only supports the following filetypes - " + fileTypes))
            }
        }).single('file'))
        
        this.app.use(express.static('public'))
    }

    private Routes() : void {
        this.app.use('/users', this.routes.userRouter);
        this.app.use('/projects', this.routes.projectRouter);
        this.app.use('/taskboards', this.routes.taskboardRouter);
        this.app.use('/tasks', this.routes.taskRouter);
    }

    public async Listen() : Promise<void> {
        try {
            await this.app.listen(this.app.get('port'));
            console.log('Server has started on port', this.app.get('port'));    
        } 
        
        catch (error) {
            console.log(error)
        }
    }
}