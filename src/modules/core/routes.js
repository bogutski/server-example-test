import userRouter from '../user/userRoutes';
import infoRouter from '../info/infoRoutes';

export default function routes(app) {
  app.use('/user', userRouter);
  app.use('/info', infoRouter);
}
