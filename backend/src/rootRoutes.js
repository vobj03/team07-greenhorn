import { Router } from 'express';
const jwt = require('jsonwebtoken');


import productRoutes from './modules/products/routes';
import contactFormRoutes from './modules/contact-form/routes';
import loginFormRoutes from './modules/login-form/routes';
import addUserFormRoutes from './modules/add-user-form/routes';
import userListRoutes from './modules/user-list/routes';
import newPassRoutes from './modules/new-pass/routes';
import resetPassRoutes from './modules/reset-pass/routes';
import updateUserFormRoutes from './modules/update-user-form/routes';
import departmentListRoutes from './modules/department-list/routes';
import taskListRoutes from './modules/task-list/routes';

const router = Router();


router.use('/api/auth', loginFormRoutes);
//dummy route in progress
router.use('*', (req, res, next) => {

  console.log(req.get('Authorization'));
  const x = jwt.verify(req.get('Authorization'), '2', (err, decoded) => {
    if(err) {
      console.log('unauthorized');
      res.status(401).send('unauthorized');

    } else {
      console.log(decoded);
      req.user = {
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        department: decoded.department
      }
      console.log(req.user);
      next();
    }
  });

});

router.use('/api/addUser', addUserFormRoutes);
router.use('/api/updateUser', updateUserFormRoutes);
router.use('/api/userList', userListRoutes);
router.use('/api/products', productRoutes);
router.use('/api/contactForm', contactFormRoutes);
router.use('/api/newPass', newPassRoutes);
router.use('/api/resetPass', resetPassRoutes);
router.use('/api/departmentList', departmentListRoutes);
<<<<<<< HEAD
router.use('/api/taskList', taskListRoutes);
router.use('/api/', () => {

=======
router.use('/api/', (req,res) => {
		res.json({
			status: true,
		})
>>>>>>> master
});


export default router;
