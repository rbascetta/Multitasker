console.log('JS loaded!');

_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

var taskContainer = _.template($('#taskContainer').html())
var taskContents  = _.template($('#taskContents').html())
var editTemplate  = _.template($('#taskEdit').html())

var rootUrl = '/api/todos/'
var container = $('body').find('ul.todos');


function TaskView (todo) {
  var self = this;
  this.task = task;
  this.$el = $(taskContainer({ id: this.task._id, contents: taskContents(this.task) }));

  this.$el.on('click', 'a.checkbox', function (event) {
    self.toggleComplete.call(self, event)
  });

  this.$el.on('click', 'a.edit-task', function(event) {
    self.$el.html(editTemplate(self.task))
  });

  this.$el.on('click', 'a.delete-task', function(event) {
    self.deleteTask.call(self, event)
  });

  this.$el.on('submit', 'form.task-update', function (event) {
    self.setTask.call(self, event)
  });


  container.append(this.$el);
}

$(document).ready(function () {
  $.get(rootUrl)
  .success(function(data){
    _.each(data, function (record) {
      new TaskView(record)
    });
  });

  $('#newTask').submit(function(event){
    event.preventDefault();
    var task = $(event.target).find('input[name="task"]');
    if(!task.val()) {
      return false;
    }

    $.post(rootUrl, { task: task.val(), completed: false }).success(function(data){
      new TaskView(data);
      task.val('');
    })
  });
});




TaskView.prototype.render = function() {
  this.$el.html(taskContents(this.task))
};

TaskView.prototype.toggleComplete = function(event){
  event.preventDefault();
  var self = this;

  var parent = $(event.target).parent();
  $.ajax({
    url: rootUrl + parent.data('id'),
    method: 'PUT',
    data: { completed: !self.task.completed }
  }).success(function(data){
    self.task = data;
    self.render();
  });
};

TaskView.prototype.setTask = function(event){
  event.preventDefault();
  var self = this;

  var form = $(event.target)
  var parent = form.parent()
  $.ajax({
    url: rootUrl + parent.data('id'),
    method: 'PUT',
    data: { task: form.find('input').val() }
  }).success(function(data){
    self.task = data;
    self.render();
  });
};

TaskView.prototype.deleteTask = function (event) {
  event.preventDefault();
  var self = this;
  var parent = $(event.target).parent()

  $.ajax({
    url: rootUrl + parent.data('id'),
    method: 'DELETE'
  }).success(function(data){
    parent.remove();
  });
}

