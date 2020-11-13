import { Request, Response } from 'express';
import Pool from 'mysql2/typings/mysql/lib/Pool';
import { connect } from '../database';
import { IProject } from '../interfaces/ProjectInterface'
 

export class ProjectController {

    public async getProjects(req: Request, res: Response) : Promise<Response> {
        try {
            const conn = await connect();
            const projects = await conn.query('CALL getProjects()');
            return res.json(projects[0])    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async getProjectById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.projectID;
            const conn = await connect();
            const project = await conn.query('CALL getProjectById(?)', [id]);
        
            return res.json(project[0]);    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async getProjectsByUserId(req: Request, res: Response) : Promise<Response> {
        try {
            const user_id = req.params.userID;
            const conn = await connect();
            const projects = await conn.query('CALL getProjectsByUserId(?)', [user_id]);
            
            return res.json(projects[0]);
        } 
        
        catch (error) {
            return res.json({
                error
            })   
        }
    }

    public async getProjectsByTitle(req: Request, res: Response) : Promise<Response> {
        try {
            const project: IProject = req.body;
            const conn = await connect();
            const projects = await conn.query('call getProjectsByTitle(?)', [project.title]);
        
            return res.json(projects[0]);    
        } 
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async createProject(req: Request, res: Response) : Promise<Response> {
        try {
            const newProject: IProject = req.body;
            const conn = await connect();
            await conn.query('CALL insertProject(?, ?)', [newProject.user_id, newProject.title]);
        
            return res.json({
                message: 'Project has been created'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async updateProject(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.projectID;
            const project : IProject = req.body;
            const conn = await connect();
            await conn.query('CALL updateProject(?, ?)', [id, project.title]);
        
            return res.json({
                message: 'Project Has Been Updated'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }

    public async deleteProject(req: Request, res: Response) : Promise<Response> {
        try {
            const id = req.params.projectID;
            const conn = await connect();
            await conn.query('CALL deleteProject(?)', [id]);
        
            return res.json({
                message: 'Project Has Been Deleted'
            });    
        } 
        
        catch (error) {
            return res.json({
                error
            })
        }
    }
}