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
      editable: false,
      editedContent: "",
      allCompleted: false,
      isCompleted: false,
      todos: [],
      todo: "",
    };
  },
  methods: {
    addTodo() {
      if (this.todo.trim().length === 0) return;
      this.todos.push({
        id: IdGenerator.Generate(),
        content: this.todo,
        isCompleted: this.isCompleted,
        isEditable: this.editable,
      });
      this.todo = "";
      this.$refs[`todoElm`].focus();
    },
    removeTodo(id) {
      const todo = this.getTodoById(id);
      if (todo.isCompleted) {
        const ask = confirm(
          `Are you sure This task has already been completed`
        );
        if (!ask) return;
      }
      this.todos = this.todos.filter((x) => x.id !== id);
      this.$refs[`todoElm`].focus();
    },

    async enableEdit(id) {
      const todo = this.getTodoById(id);
      if (todo.isCompleted) {
        const ask = confirm(
          `Are you sure This task has already been completed`
        );
        if (!ask) return;
      }
      todo.isEditable = true;
      this.editedContent = todo.content;
      await Vue.nextTick();
      this.$refs[`editedElm`].focus();
    },

    cancelEdit(id) {
      this.getTodoById(id).isEditable = false;
      this.$refs[`todoElm`].focus();
    },
    saveChanges(id) {
      const todo = this.getTodoById(id);
      if (this.editedContent === "") {
        this.editedContent = todo.content;
      }
      todo.content = this.editedContent;
      todo.isEditable = false;
      this.editedContent = "";
      this.$refs[`todoElm`].focus();
    },
    getTodoById(id) {
      return this.todos.find((x) => x.id === id);
    },
    loadStoreItem() {
      if (localStorage.todos) {
        this.todos = JSON.parse(localStorage.todos);
        this.todos.forEach((x) => (x.isEditable = false));
      }
    },
  },

  watch: {
    allCompleted: function (val) {
      this.todos.forEach((x) => (x.isCompleted = val));
    },
    todos: {
      handler(newTodos) {
        localStorage.todos = JSON.stringify(newTodos);
      },
      deep: true,
    },
  },

  mounted() {
    setTimeout(() => {
      this.loadStoreItem();
    }, 200);
  },
});
