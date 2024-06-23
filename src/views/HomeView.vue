<template>
  <div class="todo-list">
    <h1>TODOLIST</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Input Data..." />
      <button type="submit" class="tambahkan">Tambahkan</button>
    </form>
    <h2>List Item</h2>
    <div class="tengah">
      <table>
        <thead>
          <tr>
            <th width="100">Done</th>
            <th>Task</th>
            <th width="173">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in filteredTodos" :key="index">
            <td><input type="checkbox" v-model="todo.done" /></td>
            <td>
              <span v-if="!todo.editing" :class="{ 'done': todo.done }">{{ todo.text }}</span>
              <input v-else type="text" v-model="todo.text" @blur="saveEditedTodo(index)" />
            </td>
            <td>
              <button @click="toggleEdit(index)" :class="todo.editing ? 'save' : 'edit'">{{ todo.editing ? 'Save' : 'Edit' }}</button>
              <button @click="removeTodo(index)" class="remove">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showActive" class="filter">Tampilkan hanya yang belum selesai</button>
      <button @click="showCompleted" class="filter">Tampilkan yang sudah selesai</button>
    </div>
  </div>
  <footer>
    <p>&copy; Aldi Kuncruk</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
        editing: false
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleEdit(index) {
      this.todos[index].editing = !this.todos[index].editing;
    },
    saveEditedTodo(index) {
      this.todos[index].editing = false;
    },
    showActive() {
      this.filter = 'active';
    },
    showCompleted() {
      this.filter = 'completed';
    }
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background-color: #444;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  margin-top: 50px;
}

h1 {
  text-align: center;
  color: whitesmoke;
  font-size: 42px;
  font-weight: bold;
}

form {
  display: flex;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  background-color: #555;
  color: #fff;
}

button {
  padding: 8px 8px;
  font-size: 16px;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.tambahkan {
  background-color: #333;
  color: #fff;
  margin-left: 10px;
}

button.tambahkan:hover {
  background-color: #555;
}

h2 {
  color: #fff;
  font-size: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead th {
  text-align: center;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: 1px solid whitesmoke;
}

tbody td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

tbody td input[type="text"] {
  width: 100%;
}

span.done {
  text-decoration: line-through;
  color: #999;
}

button.edit, button.save, button.remove, button.filter {
  background-color: #333;
  color: #fff;
  margin-right: 10px;
}

button.edit:hover, button.save:hover, button.remove:hover, button.filter:hover {
  background-color: #555;
}

footer {
  text-align: center;
  color: #fff;
  border: 1px solid whitesmoke;
  width: 200px;
  border-radius: 10px;
  margin: 30px auto;
}

footer p {
  margin-top: 10px;
}
</style>
