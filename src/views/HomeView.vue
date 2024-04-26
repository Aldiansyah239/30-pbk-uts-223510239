<template>
  <div class="todo-list">
    <h1>TODOLIST</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Input Data..." />
      <button type="submit" class="tambahkan">Tambahkan</button>
    </form>
    <h2>List Item</h2>
    <div class="tengah">
      <ul>
        <li v-for="(todo, index) in filteredTodos" :key="index">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
          <button @click="removeTodo(index)">Remove</button>
        </li>
      </ul>
      <button @click="showActive">Tampilkan hanya yang belum selesai</button>  </div>
  </div>
  <footer>
    <p>Copyright@ &copy;Aldi</p>
  </footer>
</template>




<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      showCompleted: false, // Removed, replaced with filter logic
      filter: 'all', // Default filter to show all tasks
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
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    showActive() {
      this.filter = 'active'; // Filter to show only active (unfinished) tasks
    },
    // ... other methods (showAll, showCompleted) can be removed if not needed
  },
  computed: {
    filteredTodos() { // Use filter based on the current filter state
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

<style>
*{
  color: black;
}
/* General Styles */
body {
  font-family: sans-serif;
  margin: 0;
  background-color: #f5f5f5; /* Light background for better contrast */
}

/* Todo List Container */
.todo-list {
  max-width: 600px;
  margin: 40px auto; /* Center the list horizontally and vertically */
  padding: 40px;
  border-radius: 10px; /* Rounded corners for a softer look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #fff; /* White background for clear text */
}

/* Heading */
.todo-list h1 {
  text-align: center;
  color: #333; /* Darker text for better readability */
  font-size: 2rem; /* Larger heading size */
  margin-bottom: 20px;
}

/* Input Form */
.todo-list form {
  display: flex;
  margin-bottom: 20px;
}

.todo-list input[type=text] {
  flex: 1;
  padding: 10px; /* Increased padding for better spacing */
  font-size: 1.2rem;
  border: 1px solid #ddd; /* Light border for separation */
  border-radius: 5px; /* Rounded corners for a more modern look */
  outline: none; /* Remove default outline */
}

.todo-list button[type=submit] {
  margin-left: 10px;
  padding: 10px 20px; /* Increased padding for better button size */
  font-size: 1.2rem;
  background-color: #4CAF50; /* Green color for adding tasks */
  color: #fff; /* White text for better contrast */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Task List */
.todo-list ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space out items evenly */
  margin-bottom: 10px;
}

.todo-list input[type=checkbox] {
  margin-right: 10px;
}

.todo-list .done {
  text-decoration: line-through;
  color: #ccc; /* Lighter color for completed tasks */
}

.todo-list button {
  margin-left: 10px;
  padding: 8px 12px; /* Consistent padding for buttons */
  background-color: #3498db; /* Blue color for removing tasks */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem; /* Slightly smaller font for buttons */
}

/* Footer */
footer {
  text-align: center;
  margin-top: 20px; /* Add some space after the list */
}


</style>