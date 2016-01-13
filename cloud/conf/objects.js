var _ = require('underscore'),
  uds = require('underscore.string');

function toKeyword(keywords) {
  var kws = keywords || [];
  if(_.isString(kws)) kws = kws.split(/[,\s]+/);
  if(kws.length <= 0) {
    kws = [];
  } else {
    kws = _.uniq(_.without(kws, ''));
  }
  return kws;
}

module.exports = [{
  name: 'TodoList',
  get: {
    columns: []
  },
  post: {
    columns: ['type','title','status','priority','plan_time_begin','plan_time_end','comments','is_private'],
    unique: [],
    fixed: [],
    check: []
  },
  put: {
    columns: ['type','title','status','priority','plan_time_begin','plan_time_end','comments','is_private']
  }
},{
  name: 'Products',
  get: {
    columns: []
  },
  post: {
    columns: ['title','comments'],
    unique: [],
    fixed: [],
    check: []
  },
  put: {
    columns: ['title','comments']
  }
},{
  name: 'wxAccountList',
  get: {
    columns: ['sourceid','code','name','type','intro','appid','appSecret','token','encodingAESKey','method']
  },
  post: {
    columns: ['sourceid','code','name','type','intro','appid','appSecret','token','encodingAESKey','method'],
    unique: ['sourceid'],
    fixed: [{
      key: 'token',
      value: 'wenode.avosapps.com'
    }],
    check: [{
      key: 'sourceid',
      message: '原始ID不能为空'
    }]
  },
  put: {
    columns: ['intro','appSecret','encodingAESKey','method']
  }
}, {
  name: 'wxFollowerList',
  rel: {
    name: 'wxAccountList',
    column: 'account',
    id: 'accountid'
  },
  get: {
    columns: ['sourceid','email','phone','name','time','openid','status']
  },
  put: {
    columns: ['name','email','phone']
  }
}, {
  name: 'wxTextList',
  rel: {
    name: 'wxAccountList',
    column: 'account',
    id: 'accountid'
  },
  get: {
    columns: ['accountid','content','keywords'],
  },
  post: {
    columns: ['accountid','content','keywords'],
    check: [{
      key: 'accountid',
      message: '必须关联公众号'
    },{
      key: 'content',
      message: '消息内容不能为空'
    }],
    convert: [{
      key: 'keywords',
      func: toKeyword
    }]
  },
  put: {
    columns: ['content','keywords'],
    check: [{
      key: 'content',
      message: '消息内容不能为空'
    }],
    convert: [{
      key: 'keywords',
      func: toKeyword
    }]
  }
}, {
  name: 'wxNewsList',
  rel: {
    name: 'wxAccountList',
    column: 'account',
    id: 'accountid'
  },
  get: {
    columns: ['accountid','items','keywords']
  },
  post: {
    columns: ['accountid','items','keywords'],
    check: [{
      key: 'accountid',
      message: '必须关联公众号'
    },{
      key: 'items',
      message: '图文消息不能为空'
    },{
      key: 'items',
      message: '图文消息格式不对',
      func: _.isArray,
      reverse: true
    }],
    convert: [{
      key: 'keywords',
      func: toKeyword
    }]
  },
  put: {
    columns: ['items','keywords'],
    check: [{
      key: 'items',
      message: '图文消息不能为空'
    },{
      key: 'items',
      message: '图文消息格式不对',
      func: _.isArray,
      reverse: true
    }],
    convert: [{
      key: 'keywords',
      func: toKeyword
    }]
  }
}, {
  name: 'wxBlogList',
  get: {
    columns: ['title','content','tags']
  },
  post: {
    columns: ['title','content','tags'],
    convert: [{
      key: 'tags',
      func: toKeyword
    }]
  },
  put: {
    columns: ['title','content','tags'],
    convert: [{
      key: 'tags',
      func: toKeyword
    }]
  }
}, {
  name: 'wxQuestionGroupList',
  get: {
    columns: ['title','detail','tags']
  },
  post: {
    columns: ['title','detail','tags'],
    convert: [{
      key: 'tags',
      func: toKeyword
    }]
  },
  put: {
    columns: ['title','detail','tags'],
    convert: [{
      key: 'tags',
      func: toKeyword
    }]
  }
}, {
  name: 'wxQuestionChoice',
  rel: {
    name: 'wxQuestionGroupList',
    column: 'group',
    id: 'groupid'
  },
  get: {
    columns: ['groupid','topic','items']
  },
  post: {
    columns: ['groupid','topic','items'],
    check: [{
      key: 'groupid',
      message: '必须关联题库'
    }, {
      key: 'topic',
      message: '题纲内容不能为空'
    }, {
      key: 'items',
      message: '选项不能为空'
    }]
  },
  put: {
    columns: ['topic','items'],
    check: [{
      key: 'topic',
      message: '题纲内容不能为空'
    }, {
      key: 'items',
      message: '选项不能为空'
    }]
  }
}];