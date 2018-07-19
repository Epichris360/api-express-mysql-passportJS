const { Company }     = require('../models');
const { to, ReE, ReS} = require('../services/util.service.js');

const create = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  let err, company;
  let user = req.user;

  let company_info = req.body;
  [err, company] = await to(Company.create(company_info));
  if(err) return ReE(res, err, 422);

  company.addUser(uses, {through: { status: 'started' }});

  [err, company] = await to(company.save());
  if(err) return ReE(res, err, 422);

  let company_json   = comapany.toWeb();
  company_json.users = [{user: user.id}];

  return ReS(res, {company: company_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
  res.setHeader('Content-Type', 'Application/json');
  let user = req.user;
  let err, companies;

  [err, companies] = await to(user.getCompanies());

  let companies_json = [];
  for(let i in companies){
    let company      = companies[i];
    let users        = await company.getUsers();
    let company_info = company.toWeb();
    let user_info    = [];
    for(let i in users){
      let user = users[i];
      // let user_info = user.toJSON();
      users_info.push({user: user.id});
    }
    company_info.users = user_info;
    company_json.push(company_info);
  }

  return ReS(res, {companies: companies_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
  res.setHeader('Content-Type', 'Application/json');
  let company = req.company;

  return ReS(res, {company: company.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
  let err, company, data;
  company = req.company;
  data    = req.body;
  company.set(data);

  [err, comapany] = await to(company.save());
  if(err){
    return ReE(res, err);
  }
  return ReS(res, {company: company.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
  let company, err;
  company = req.company;

  [err, comapany] = await to(comapany.destroy());
  if(err) return ReE(res, 'error occured when trying to delete the comapany');

  return ReS(res, {message: "Deleted comapany"}, 204);
}
module.exports.remove = remove;
