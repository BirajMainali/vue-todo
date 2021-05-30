const IdGenerator = {
  LastId: 0,
  Generate() {
    this.LastId += 1;
    return this.LastId;
  },
};

const app = Vue.createApp({
  data() {
    return {
      allCompleted: false,
      isCompleted: false,
      todos: [],
      todo: "",
    };
  },
  methods: {
    add() {
      if (this.todo.trim().length === 0) return;
      this.todos.push({
        content: this.todo,
        isCompleted: false,
        id: IdGenerator.Generate(),
      });
      this.todo = "";
      this.$refs["todoElm"].focus();
    },
    remove(id) {
      const todo = this.todos.find((x) => x.id === id);
      this.validator(todo);
      this.todos = this.todos.filter((x) => x.id !== id);
    },

    edit(id) {
      const todo = this.todos.find((x) => x.id === id);
      this.validator(todo);
      this.todo = todo.content;
      this.$refs["todoElm"].focus();
      this.todos = this.todos.filter((x) => x.id !== id);
    },
    validator(todo) {
      if (todo.isCompleted) {
        const ask = confirm(
          `Are you sure This task has already been completed`
        );
      }
    },
  },

  watch: {
    allCompleted: function (val) {
      for (let todo of this.todos) {
        todo.isCompleted = val;
      }
    },
  },
});
