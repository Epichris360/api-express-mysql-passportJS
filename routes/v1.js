const express = require('express');
const router  = express.Router();

const UserController    = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController    = require('../controllers/home.controller');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path     = require('path');

//================================
// User routes====================
//================================
router.post('/users',   UserController.create); //create
router.get('/users',    passport.authenticate('jwt', {session: false}), UserController.get); //Read
router.put('/users',    passport.authenticate('jwt', {session: false}), UserController.update); //update
router.delete('/users', passport.authenticate('jwt', {session: false}), UserController.remove); //delete
//login
router.post('/user/login', UserController.login);

//========================================
// Company routes=========================
//========================================
router.post('/companies', passport.authenticate('jwt', {session: false}), CompanyController.create);
router.get('/companies',  passport.authenticate('jwt', {session: false}), CompanyController.getAll);

router.get('/companies/:company_id',    passport.authenticate('jwt', {session: false}), CompanyController.get);
router.put('/companies/:company_id',    passport.authenticate('jwt', {session: false}), CompanyController.update);
router.delete('/companies/:company_id', passport.authenticate('jwt', {session: false}), CompanyController.remove);

module.exports = router;
