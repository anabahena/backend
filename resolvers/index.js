const tasks = [];

module.exports = {
  Query: {
    tasks: (parent, args, context) => tasks,
    task: (parent, args, context) => {
      const task = tasks.find((task) => task.id === args.id);
      return task;
    },
  },
  Mutation: {
    addTask: (parent, args, context) => {
      const newTask = {
        id: tasks.length,
        name: args.name,
        description: args.description,
        completed: args.completed,
      };

      tasks.push(newTask);
      return newTask;
    },
  },
};
