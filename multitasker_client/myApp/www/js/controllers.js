angular.module('starter.controllers', [])

.controller('ListsCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope, UserService, $state, $timeout) {
  $scope.login = {};
  $scope.doLogin = function() {
    UserService.login($scope.login.email, $scope.login.password);
    $timeout(function() {
      $state.go('tab.lists');
    }, 500);
  };
})

.controller('ListsCtrl', function($scope, UserService, $state) {
  $scope.user = UserService.user;

  console.log($scope.user)
  console.log(UserService.user)

  $scope.newList = {};

  $scope.addList = function() {
    UserService.addList($scope.newList.listTitle);
    $state.go('tab.lists');
  };

})

.controller('TasksCtrl', function($scope, $stateParams, UserService) {
  $scope.newTask = {};
  $scope.list = UserService.user.lists.filter(function(list) {
    return list._id === $stateParams.listId;
  })[0];

  $scope.addTask = function() {
    UserService.addTask($scope.list, $scope.newTask.body);
  }
  
});
