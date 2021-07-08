let express = require('express');
let app = express();
let mercadoriaRepo = require('./repos/mercadoriaRepo');

let router = express.Router();

app.use(express.json());

// Create GET to return a list of all pies
router.get('/all', function (req, res, next) {
  mercadoriaRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Todas as mercadorias foram retornadas.",
      "data": data
    });
  }, function(err) {
    next(err);
  });
});

// Create GET/search?id=n&nome=str to search for pies by 'id' and/or 'nome'
router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "nome": req.query.name
  };

  mercadoriaRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Todas as mercadorias foram retornadas.",
      "data": data
    });
  }, function (err) {
    next(err);
  });
});

// Create GET/id to return a single pie
router.get('/:id', function (req, res, next) {
  mercadoriaRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Única mercadoria retornada.",
        "data": data
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada.",
        "error": {
          "code": "NOT_FOUND",
          "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada."
        }
      });
    }
  }, function(err) {
    next(err);
  });
});

router.post('/new', function (req, res, next) {
  mercadoriaRepo.insert(req.body, function(data) {
    res.status(201).json({
      "status": 201,
      "statusText": "Created",
      "message": "Nova mercadoria adicionada.",
      "data": data
    });
  }, function(err) {
    next(err);
  });
})

router.put('/:id', function (req, res, next) {
  mercadoriaRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      mercadoriaRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "Mercadoria '" + req.params.id + "' atualizada.",
          "data": data
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada.",
        "error": {
          "code": "NOT_FOUND",
          "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada."
        }
      });
    }
  }, function(err) {
    next(err);
  });
})

router.delete('/:id', function (req, res, next) {
  mercadoriaRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to delete the data
      mercadoriaRepo.delete(req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "A mercadoria '" + req.params.id + "' foi deletada.",
          "data": "Mercadoria '" + req.params.id + "' deletada."
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada.",
        "error": {
          "code": "NOT_FOUND",
          "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada."
        }
      });
    }
  }, function(err) {
    next(err);
  });
})

router.patch('/:id', function (req, res, next) {
  mercadoriaRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      mercadoriaRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "Mercadoria '" + req.params.id + "' corrigida.",
          "data": data
        });
      });
    }
    else {
      res.status(404).send({
        "status": 404,
        "statusText": "Not Found",
        "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada.",
        "error": {
          "code": "NOT_FOUND",
          "message": "A mercadoria '" + req.params.id + "' não pode ser encontrada."
        }
      });
    }
  }, function (err) {
    next(err);
  });
})

//Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

//Create server to listen on port 5000
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..');
});
