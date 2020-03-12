class User {
  constructor(attrs){
    this._name = attrs.name;
    this._id = attrs.id;
  };

  get name(){
    return this._name;
  }

  get id(){
    return this._id;
  }

  static all() {
    return User.storedData;
  }

  static findById(id) {
    return User.storedData.find((u) => u.id == id);
  }

  static create(attrs) {
    attrs.id = User.storedData.length; 
    User.storedData.push(new User(attrs));
    return true;
  }

  destroy() {
    User.storedData = User.storedData.filter((u) => u != this);
    return true;
  }


  updateAttributes(newAttrs) {
    this._name = newAttrs.name;
    return true;
  }
}

User.storedData = [];

User.create({ id: 1, name: 'Homer' })
User.create({ id: 2, name: 'Lisa' })
User.create({ id: 3, name: 'Bart' })

module.exports = User;
