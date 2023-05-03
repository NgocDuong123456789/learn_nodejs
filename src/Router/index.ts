import  Express from 'express'
import authentication from './authentication'
import userRouter from './user'


const routerApp=(app:Express.Application)=>{
    app.use('/auth', authentication);
    app.use('/', userRouter);
}
export default routerApp