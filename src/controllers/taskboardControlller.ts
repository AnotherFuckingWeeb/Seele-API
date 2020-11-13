import { Request, Response } from 'express';
import { connect } from '../database';
import { ITaskboard } from '../interfaces/TaskboardInterface'


export class TaskboardController {
    
    public async getTaskboards(req: Request, res: Response) : Promise<Response> {
        try {
            const conn = await connect();
            const taskboards = await conn.query('CALL getTaskboards()');
        
            return res.json(taskboards[0]);    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async getTaskboardsByProjectId(req: Request, res: Response) : Promise<Response> {
        try {
            const project_id = req.params.projectID;
            const conn = await connect();
            const taskboards = await conn.query('CALL getTaskboardsByProjectId(?)', [project_id]);
        
            return res.json(taskboards[0]);
        } 
        
        catch (error) {
            return res.json({
                error
            })   
        }
    }
    
    public async getTaskboardById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskboardID;
            const conn = await connect();
            const taskboards = await conn.query('CALL getTaskboardById(?)', [id]);
        
            return res.json(taskboards[0])    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async createTaskboard(req: Request, res: Response) : Promise<Response>  {
        try {
            const newTaskboard: ITaskboard = req.body;
            const conn = await connect();
            await conn.query('CALL insertTaskboard(?, ?)', [newTaskboard.project_id, newTaskboard.title]);
            
            
            return res.json({
                message: 'Taskboard Created Sucessfully'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async updateTaskboard(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskboardID;
            const taskboard: ITaskboard = req.body;
            const conn = await connect();
            await conn.query('CALL updateTaskboard(?, ?)', [id, taskboard.title]);
            
            
            return res.json({
                message: 'Taskboard Has Been Updated'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async deleteTaskboard(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.taskboardID;
            const conn = await connect();
            await conn.query('CALL deleteTaskboard(?)', [id])
        
            return res.json({
                message: 'Taskboard Has Been Deleted'
            })    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
    
    public async deleteTaskboardByProjectId(req: Request, res: Response) : Promise<Response>  {
        try {
            const projectId = req.params.projectID;
            const conn = await connect();
        
            await conn.query('CALL deleteTaskboardsByProjectId(?)', [projectId]);
        
            return res.json({
                message: 'Project Has Been Reseted'
            })    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
}


/*export async function getTaskboards(req: Request, res: Response) : Promise<Response> {
    const conn = await connect();
    const taskboards = await conn.query('CALL getTaskboards()');

    return res.json(taskboards[0]);
}

export async function getTaskboardsByProjectId(req: Request, res: Response) : Promise<Response> {
    const project_id = req.params.projectID;
    const conn = await connect();
    const taskboards = await conn.query('CALL getTaskboardsByProjectId(?)', [project_id]);

    return res.json(taskboards[0]);
}

export async function getTaskboardById(req: Request, res: Response) : Promise<Response> {
    const id = req.params.taskboardID;
    const conn = await connect();
    const taskboards = await conn.query('CALL getTaskboardById(?)', [id]);

    return res.json(taskboards[0])
}

export async function createTaskboard(req: Request, res: Response) : Promise<Response>  {
    const newTaskboard: ITaskboard = req.body;
    const conn = await connect();
    await conn.query('CALL insertTaskboard(?, ?)', [newTaskboard.project_id, newTaskboard.title]);
    
    
    return res.json({
        message: 'Taskboard Created Sucessfully'
    });
}

export async function updateTaskboard(req: Request, res: Response) : Promise<Response> {
    const id = req.params.taskboardID;
    const taskboard: ITaskboard = req.body;
    const conn = await connect();
    await conn.query('CALL updateTaskboard(?, ?)', [id, taskboard.title]);
    
    
    return res.json({
        message: 'Taskboard Has Been Updated'
    });
}

export async function deleteTaskboard(req: Request, res: Response) : Promise<Response> {
    const id = req.params.taskboardID;
    const conn = await connect();
    await conn.query('CALL deleteTaskboard(?)', [id])

    return res.json({
        message: 'Taskboard Has Been Deleted'
    })
}

export async function deleteTaskboardByProjectId(req: Request, res: Response) : Promise<Response>  {
    const projectId = req.params.projectID;
    const conn = await connect();

    await conn.query('CALL deleteTaskboardsByProjectId(?)', [projectId]);

    return res.json({
        message: 'Project Has Been Reseted'
    })
}*/