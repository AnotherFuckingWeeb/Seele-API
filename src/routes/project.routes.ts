import { IRoute, Router } from 'express';
import { ProjectController } from '../controllers/projectController'
//import router from './user.routes';


export class ProjectRoutes {
    private controller: ProjectController = new ProjectController();
    public router: Router = Router();

    constructor() {
        this.projectsMainRoute();
        this.userIdRoute();
        this.projectIdRoute();
        this.projectTitleRoute();
    }

    public projectsMainRoute() : IRoute {
        return this.router.route('/')
            .get(this.controller.getProjects)
            .post(this.controller.createProject);
    }

    public userIdRoute() : IRoute {
        return this.router.route('/user_id=:userID')
            .get(this.controller.getProjectsByUserId);
    }

    public projectIdRoute() : IRoute {
        return this.router.route('/:projectID')
            .get(this.controller.getProjectById)
            .put(this.controller.updateProject)
            .delete(this.controller.deleteProject)
    }

    public projectTitleRoute(): IRoute {
        return this.router.route('/title=:projectTitle')
            .post(this.controller.getProjectsByTitle)
    }

}
