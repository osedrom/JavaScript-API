let fs = require('fs');

const FILE_NAME = './assets/mercadorias.json';

let mercadoriaRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pie = JSON.parse(data).find(p => p.id == id);
        resolve(pie);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let pies = JSON.parse(data);
        // Perform search
        if (searchObject) {
          pies = pies.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.nome ? p.nome.toLowerCase().indexOf(searchObject.nome) >= 0 : true));
        }

        resolve(pies);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let mercadoria = JSON.parse(data);
        mercadoria.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(mercadoria), function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let mercadorias = JSON.parse(data);
        let mercadoria = mercadorias.find(p => p.id == id);
        if (mercadoria) {
          Object.assign(mercadoria, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(mercadorias), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let mercadorias = JSON.parse(data);
        let index = mercadorias.findIndex(p => p.id == id);
        if (index != -1) {
          mercadorias.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(mercadorias), function (err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          });
        }
      }
    });
  }
};

module.exports = mercadoriaRepo;
