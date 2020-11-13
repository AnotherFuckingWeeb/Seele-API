import { IRoute, Router } from 'express';
import { TaskController } from '../controllers/taskController'

export class TaskRoutes {
    private controller: TaskController = new TaskController();
    public router: Router = Router();

    constructor() {
        this.mainRoute();
        this.taskboardIdRoute();
        this.taskIdRoute();
    }

    public mainRoute() : IRoute {
        return this.router.route('/')
            .get(this.controller.getTasks)
            .post(this.controller.createTask)
    }

    public taskboardIdRoute() : IRoute {
        return this.router.route('/taskboard_id=:taskboardID')
            .get(this.controller.getTasksByTaskboardId);
    }

    public taskIdRoute() : IRoute {
        return this.router.route('/:taskID')
            .get(this.controller.getTaskById)
            .put(this.controller.updateTask)
            .delete(this.controller.deleteTask)
    }
}


/*const router = Router();

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/taskboard_id=:taskboardID')
    .get(getTasksByTaskboardId);

router.route('/:taskID')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);
export default router;*/