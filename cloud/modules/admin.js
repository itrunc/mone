var _ = require('underscore'),
  uds = require('underscore.string'),
  ModelList = require('cloud/conf/objects.js');

function shouldLogin(req, res, next) {
  if(req.AV.user) {
    next();
  } else if(req.route.method == 'get' && req.route.path == '/admin') {
    res.redirect('/user#signin');
  } else {
    res.status(401).send('您还没有登录！');
  }
}

var render = function(req, res) {
  res.render('main', {
    title: '',
    appname: 'admin'
  });
};

function filterData(req, res, next) {
  var data = {
    objectName: uds.classify(req.params.model),
    objectId: req.params.id,
    body: req.body,
    unique: []
  };
  var RelObject, chkItem;
  var model = _.findWhere(ModelList, {name: data.objectName});
  switch(req.route.method) {
    case 'get':
      data.body = {
        index: req.query.index || 0,
        size: req.query.size || 10,
        rel: {},
        columns: []
      };
      if(model) {
        if(model.get.columns.length > 0) data.body.columns = model.get.columns;
        if(_.has(model, 'rel')) {
          data.body.rel = _.extend(model.rel, {value: req.query.rel});
        }
      } else {
        res.status(404).send('找不到对象');
        return;
      }
      break;
    case 'post':
      if(model) {
        data.body = _.pick(data.body, model.post.columns);
        if(_.has(model.post, 'unique')) data.unique = model.post.unique;
        if(_.has(model.post, 'convert')) {
          model.post.convert.forEach(function(item){
            data.body[item.key] = item.func(data.body[item.key]);
          });
        }
        if(_.has(model.post, 'check')) {
          for(var i in model.post.check) {
            chkItem = model.post.check[i];
            chkItem = _.extend({
              func: _.isEmpty,
              reverse: false
            }, chkItem);
            if(chkItem.reverse) {
              if(!chkItem.func(data.body[chkItem.key])) {
                res.status(400).send(chkItem.message);
                return;
              }
            } else {
              if(chkItem.func(data.body[chkItem.key])) {
                res.status(400).send(chkItem.message);
                return;
              }
            }
          }
        }
        if(_.has(model.post, 'fixed')) {
          model.post.fixed.forEach(function(item){
            data.body[item.key] = item.value;
          });
        }
        if(_.has(model, 'rel')) {
          RelObject = AV.Object.extend(model.rel.name);
          data.body[model.rel.column] = new RelObject;
          data.body[model.rel.column].id = data.body[model.rel.id];
        }
      } else {
        res.status(404).send('找不到对象'+data.objectName);
        return;
      }
      break;
    case 'put':
      if(model) {
        data.body = _.pick(data.body, model.put.columns);
        if(_.has(model.put, 'convert')) {
          model.put.convert.forEach(function(item){
            data.body[item.key] = item.func(data.body[item.key]);
          });
        }
        if(_.has(model.put, 'check')) {
          for(var i in model.put.check) {
            chkItem = model.put.check[i];
            chkItem = _.extend({
              func: _.isEmpty,
              reverse: false
            }, chkItem);
            if(chkItem.reverse) {
              if(!chkItem.func(data.body[chkItem.key])) {
                res.status(400).send(chkItem.message);
                return;
              }
            } else {
              if(chkItem.func(data.body[chkItem.key])) {
                res.status(400).send(chkItem.message);
                return;
              }
            }
          }
        }
      } else {
        res.status(404).send('找不到对象');
        return;
      }
      break;
    case 'delete':
      break;
    default:
      break;
  }
  req.wenode_data = data;
  next();
}

function fetchModels(req, res) {
  var data = req.wenode_data;
  var AVObject = AV.Object.extend(data.objectName);
  var query = new AV.Query(AVObject);
  query.equalTo('owner', req.AV.user);
  if(!_.isEmpty(data.body.rel)) {
    var AVRelObject = AV.Object.extend(data.body.rel.name),
      relObject = new AVRelObject;
    relObject.id = data.body.rel.value;
    query.equalTo(data.body.rel.column, relObject);
  }
  if(!_.isEmpty(data.body.columns)) {
    query.select(data.body.columns);
  }
  query.limit(data.body.size);
  query.skip(data.body.index * data.body.size);
  query.descending('createdAt');
  query.find({
    success: function(results) {
      res.status(200).json(results);
    },
    error: function(err) {
      res.status(500).send(err.message);
    }
  });
}

function createModel(req, res) {
  var data = req.wenode_data;

  var AVObject = AV.Object.extend(data.objectName),
    ACL = new AV.ACL(req.AV.user),
    object = new AVObject;

  ACL.setPublicReadAccess(true);

  object.setACL(ACL);
  data.body.owner = req.AV.user;
  object.set(data.body);

  if(_.isEmpty(data.unique)) {
    object.save(null).then(function(obj) {
      res.status(200).json(obj);
    }, function(err) {
      res.status(500).send(err.message);
    });
  } else {
    var query = new AV.Query(AVObject);
    for(var i in data.unique) {
      var column = data.unique[i];
      query.equalTo(column, data.body[column]);
    }
    query.count().then(function(count){
      if(count > 0) {
        res.status(403).send('违反唯一约束：' + uds.toSentence(data.unique));
      } else {
        object.save(null).then(function(obj) {
          res.status(200).json(obj);
        }, function(err) {
          res.status(500).send(err.message);
        });
      }
    }, function(err){
      res.status(500).send(err.message);
    });
  }
}

function updateModel(req, res) {
  var data = req.wenode_data;

  var AVObject = AV.Object.extend(data.objectName),
    object = new AVObject;
  object.id = data.objectId;
  object.set(data.body);
  object.save(null).then(function(obj) {
    res.status(200).json(obj);
  }, function(err) {
    res.status(500).send(err.message);
  });
}

function destroyModel(req, res) {
  var data = req.wenode_data;
  var AVObject = AV.Object.extend(data.objectName),
    object = new AVObject;
  object.id = data.objectId;
  object.destroy().then(function(obj){
    res.status(200).json(obj);
  }, function(err) {
    res.status(500).send(err.message);
  });
}

module.exports = {
  render: render,
  shouldLogin: shouldLogin,
  filterData: filterData,
  createModel: createModel,
  fetchModels: fetchModels,
  updateModel: updateModel,
  destroyModel: destroyModel
};