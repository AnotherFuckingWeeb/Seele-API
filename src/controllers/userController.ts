import path from 'path'
import { Request, Response } from 'express';
import nodemailer from 'nodemailer'
import { connect } from '../database';
import { IUser } from '../interfaces/UserInterface';

const hbs = require('nodemailer-express-handlebars');


export class UserController {
   

   public async getUsers(req: Request, res: Response) : Promise<Response> {
      try {
         const conn = await connect();
         const users = await conn.query('CALL getUsers()');
         
         return res.json(users[0]);   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   } 
   
   public async getUserById(req: Request, res: Response) : Promise<Response> {
      try {
         const id = req.params.userID;
         const conn = await connect();
         const user = await conn.query('CALL getUserById(?)', [id]);
      
         return res.json(user[0]);   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async getUserByUsernameAndPassword(req: Request, res: Response) : Promise<Response> {
      try {
         const userRequested: IUser = req.body;
         const conn = await connect();
         const user = await conn.query('CALL getUserByUsernameAndPassword(?, ?)', [userRequested.username, userRequested.password])
         
         return res.json(user[0]);   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async createUser(req: Request, res: Response) : Promise<Response> {
      try {
         const newUser : IUser = req.body;
         const conn = await connect();
         await conn.query('CALL insertUser(?, ?, ?, ?, ?)', [newUser.username, newUser.name, newUser.lastname, newUser.email, newUser.password]);
         
         return res.json({
            message: 'User Created Sucessfully'
         });   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async updateUser(req: Request, res: Response) : Promise<Response> {
      try {
         const id = req.params.userID;
         const user : IUser = req.body;
         const conn = await connect();
         await conn.query('CALL updateUser(?, ?, ?, ?, ?, ?)', [id, user.username, user.name, user.lastname, user.email, user.profileImage]);
      
         return res.json({
            message: 'User Has Been Updated'
         });   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async updateUserPassword(req: Request, res: Response) : Promise<Response> {
      try {
         const id = req.params.userID;
         const user : IUser = req.body;
         const conn = await connect();
         await conn.query('CALL updateUserPassword(?, ?)', [id, user.password])
      
         return res.json({
            message: 'Password Has Been Updated'
         });   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async deleteUser(req: Request, res: Response) : Promise<Response> {
      try {
         const id = req.params.userID;
         const conn = await connect();
         await conn.query('CALL deleteUser(?)', [id]);
      
         return res.json({
            message: 'User Deleted Sucessfully'
         });   
      } 
      
      catch (error) {
         return res.json({
            error
         })
      }
   }
   
   public async sendEmail(req: Request, res: Response) : Promise<void> {
      try {
         const user: IUser = req.body
         const conn = await connect();
         const password = await conn.query('SELECT password FROM users WHERE email = ?', [user.email]) as any
      
         const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
               user: "yefersonsmarter@gmail.com",
               pass: "venezuela123"
            }
         })
      
         const handlebarOptions = {
            viewEngine: {
               extName: '.handlebars',
               partialsDir: path.resolve(__dirname, 'views'),
               defaultLayout: false
            },
            viewPath: path.resolve(__dirname, '../../views'),
            extName: ".handlebars"
         }
      
         transporter.use("compile", hbs(handlebarOptions))
      
         const mailOptions = {
            from: "Seele",
            to: user.email,
            subject: "Password Recovery",
            text: `your password is: `,
            template: 'password',
            context: {
               password: password[0][0].password
            }
         }
      
         transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
               return res.status(500).send(error.message)
            }
      
            else {
               res.status(200).jsonp(req.body)
            }
         })
      } 
      
      catch (error) {
         res.jsonp(error) 
      }
   }
}

/*export async function getUsers(req: Request, res: Response) : Promise<Response> {
   const conn = await connect();
   const users = await conn.query('CALL getUsers()');
   
   return res.json(users[0]);
} 

export async function getUserById(req: Request, res: Response) : Promise<Response> {
   const id = req.params.userID;
   const conn = await connect();
   const user = await conn.query('CALL getUserById(?)', [id]);

   return res.json(user[0]);
}

export async function getUserByUsernameAndPassword(req: Request, res: Response) : Promise<Response> {
   const userRequested: IUser = req.body;
   const conn = await connect();
   const user = await conn.query('CALL getUserByUsernameAndPassword(?, ?)', [userRequested.username, userRequested.password])
   return res.json(user[0]);
}

export async function createUser(req: Request, res: Response) : Promise<Response> {
   const newUser : IUser = req.body;
   const conn = await connect();
   await conn.query('CALL insertUser(?, ?, ?, ?, ?)', [newUser.username, newUser.name, newUser.lastname, newUser.email, newUser.password]);
   
   return res.json({
      message: 'User Created Sucessfully'
   });
}

export async function updateUser(req: Request, res: Response) : Promise<Response> {
   const id = req.params.userID;
   const user : IUser = req.body;
   const conn = await connect();
   await conn.query('CALL updateUser(?, ?, ?, ?, ?, ?)', [id, user.username, user.name, user.lastname, user.email, user.profileImage]);

   return res.json({
      message: 'User Has Been Updated'
   });
}

export async function updateUserPassword(req: Request, res: Response) : Promise<Response> {
   const id = req.params.userID;
   const user : IUser = req.body;
   const conn = await connect();
   await conn.query('CALL updateUserPassword(?, ?)', [id, user.password])

   return res.json({
      message: 'Password Has Been Updated'
   });
}

export async function deleteUser(req: Request, res: Response) : Promise<Response> {
   const id = req.params.userID;
   const conn = await connect();
   await conn.query('CALL deleteUser(?)', [id]);

   
   return res.json({
      message: 'User Deleted Sucessfully'
   });
}

export async function sendEmail(req: Request, res: Response) : Promise<void> {

   const user: IUser = req.body
   const conn = await connect();
   const password = await conn.query('SELECT password FROM users WHERE email = ?', [user.email]) as any

   const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: "yefersonsmarter@gmail.com",
         pass: "venezuela123"
      }
   })

   const handlebarOptions = {
      viewEngine: {
         extName: '.handlebars',
         partialsDir: path.resolve(__dirname, 'views'),
         defaultLayout: false
      },
      viewPath: path.resolve(__dirname, '../../views'),
      extName: ".handlebars"
   }

   transporter.use("compile", hbs(handlebarOptions))

   const mailOptions = {
      from: "Seele",
      to: user.email,
      subject: "Password Recovery",
      text: `your password is: `,
      template: 'password',
      context: {
         password: password[0][0].password
      }
   }

   transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
         return res.status(500).send(error.message)
      }

      else {
         res.status(200).jsonp(req.body)
      }
   })
}*/
