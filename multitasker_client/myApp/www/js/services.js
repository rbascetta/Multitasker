angular.module('starter.services', [])

.constant('serverHost', 'http://localhost:3000')

.factory('UserService', function($http, serverHost) {
  var service = {};
  var user = {};

  service.login = function(email, password) {
    $http.post(serverHost + '/api/login', {email: email, password: password})
      .then(function(req) {
        service.user = req.data;
        if (!service.user.lists) service.user.lists = [];
        console.log(user);
      });
  };

  service.addList = function(listTitle) {
    $http.post(serverHost + '/api/lists', {
      userId: service.user._id,
      title: listTitle,
      tasks: []
    }).then(function(res) {
      service.user.lists.push(res.data);
    })
  };

  service.addTask = function(list, body) {
    $http.post(serverHost + '/api/lists/' + list._id + '/tasks', {
      userId: service.user._id,
      body: body
    }).then(function(res) {
      list.tasks.push(res.data);
    })
  };

  return service;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
