const { TE, to } = require('../services/util.service');

module.exports = (sequilize, DataTypes) => {
  let Model = sequilize.define('Company',{
    name: DataTypes.STRING,
  });

  Model.associate = function(models){
    this.Users = this.belongsToMany(models.user, {through: 'UserCompany'});
  };

  Model.prototype.toWeb = function(pw){
    let json = this.toJSON();
    return json;
  }
  
  return Model;
}
