import { Router, Request, Response, IRoute } from 'express';
import { UserController } from '../controllers/userController';



export class UserRoutes {
    private controller: UserController = new UserController();
    public router: Router = Router()

    constructor() {
        this.MainRoute();
        this.userIdRoutes();
        this.loginRoute();
        this.SendEmailRoute();
        this.UploadRoute();
    }

    public MainRoute() : IRoute {
        return this.router.route('/')
            .get(this.controller.getUsers)
            .post(this.controller.createUser);
    }

    public userIdRoutes() : IRoute {
        return this.router.route('/:userID')
            .get(this.controller.getUserById)
            .put(this.controller.updateUser)
            .delete(this.controller.deleteUser);
    }

    public loginRoute() : IRoute {
        return this.router.route('/login')
            .post(this.controller.getUserByUsernameAndPassword)
    }

    public SendEmailRoute() : IRoute {
        return this.router.route('/send-email')
            .post(this.controller.sendEmail)
    }

    public UploadRoute() : IRoute {
        return this.router.route('/upload')
            .post((req, res) => {
                console.log(req.file);
                res.send({
                    message: 'Photo Uploaded'
                })
            })
    }

}

/*const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userID')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/login')
.post(getUserByUsernameAndPassword);

router.route('/send-email')
    .post(sendEmail)

router.route('/upload')
    .post((req, res) => {
        console.log(req.file)
        res.end("uploaded")
    })

export default router;*/