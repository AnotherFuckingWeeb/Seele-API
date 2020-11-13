import { Request, Response } from 'express';
import { connect } from '../database';
import { ITask } from '../interfaces/TaskInterface'

export class TaskController {
    public async getTasks(req: Request, res: Response) : Promise<Response> {
        try {
            const conn = await connect();
            const tasks = await conn.query('CALL getTasks()');
            
            return res.json(tasks[0]);    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async getTasksByTaskboardId(req: Request, res: Response) : Promise<Response> {
        try {
            const taskboardID = req.params.taskboardID;
            const conn = await connect();
            const tasks = await conn.query('CALL getTasksByTaskboardId(?)', [taskboardID]);
                
            return res.json(tasks[0]);
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async getTaskById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskID;
            const conn = await connect();
            const task = await conn.query('CALL getTaskById(?)', [id]);
            
            return res.json(task[0]);
        } 
        
        catch (error) {
            return res.json({
                error
            })    
        }
    }
    
    public async createTask(req: Request, res: Response) : Promise<Response> {
        try {
            const newTask: ITask = req.body;
            const conn = await connect();
            await conn.query('CALL insertTask(?, ?)', [newTask.taskboard_id, newTask.title]);
            
            return res.json({
                message: 'Task Created Sucessfully'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    } 
    
    public async updateTask(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskID;
            const task: ITask = req.body;
            const conn = await connect();
            await conn.query('CALL updateTask(?, ?, ?, ?, ?)', [id, task.title, task.description, task.status, task.done]);
        
            return res.json({
                message: 'Task has been updated'
            });
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async deleteTask(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskID;
            const conn = await connect();
            await conn.query('CALL deleteTask(?)', [id]);
            
            return res.json({
                message: 'Task Has Been Deleted'
            });
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
}
