import { IRoute, Router } from 'express'
import { TaskboardController } from '../controllers/taskboardControlller'

export class TaskboardRoutes {

    private controller: TaskboardController = new TaskboardController();
    public router: Router = Router();

    constructor() {
        this.MainRoute();
        this.projectIdRoute();
        this.taskboardIdRoute();
    }

    public MainRoute() : IRoute {
        return this.router.route('/')
            .get(this.controller.getTaskboards)
            .post(this.controller.createTaskboard)
    }

    public projectIdRoute() : IRoute {
        return this.router.route('/project_id=:projectID')
            .get(this.controller.getTaskboardsByProjectId)
            .delete(this.controller.deleteTaskboardByProjectId)
    }

    public taskboardIdRoute() : IRoute {
        return this.router.route('/:taskboardID')
            .get(this.controller.getTaskboardById)
            .put(this.controller.updateTaskboard)
            .delete(this.controller.deleteTaskboard)
    }

}

/*const router = Router();

router.route('/')
    .get(getTaskboards)
    .post(createTaskboard)

router.route('/project_id=:projectID')
    .get(getTaskboardsByProjectId)
    .delete(deleteTaskboardByProjectId)

router.route('/:taskboardID')
    .get(getTaskboardById)
    .put(updateTaskboard)
    .delete(deleteTaskboard)

export default router;*/