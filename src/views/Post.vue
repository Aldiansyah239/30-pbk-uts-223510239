<template>
  <div class="post-container">
    <div class="profile">
      <h1>Daftar Postingan</h1>
      <div class="user-selection">
        <select id="users" v-model="selectedUserId" @change="loadUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="user-posts">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in userPosts" :key="post.id">
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
                <td><button @click="deletePost(post.id)" class="delete-button">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      userPosts: [],
      loading: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    loadUserPosts() {
      if (!this.selectedUserId) return;
      this.loading = true;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then(response => response.json())
        .then(data => {
          this.userPosts = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching user posts:', error);
          this.loading = false;
        });
    },
    deletePost(postId) {
      if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) return;
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Gagal menghapus postingan');
          }
          // Hapus dari tampilan
          this.userPosts = this.userPosts.filter(post => post.id !== postId);
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  }
};
</script>

<style scoped>
.post-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 20px;
  border: 1px dotted gray;
  width: 900px;
  border-radius: 10px;
}

.profile {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  color: #fff;
}

.profile h1 {
  color: whitesmoke;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: -5px;
}

.user-selection {
  margin-bottom: 20px;
  text-align: center;
}

.user-selection select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid whitesmoke;
}

.user-posts .loading {
  text-align: center;
  color: whitesmoke;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #555;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #444;
  color: #fff;
}

td {
  background-color: #333;
  color: #fff;
}

.delete-button {
  background-color: transparent;
  color: #fff;
  border: 1px solid whitesmoke;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  font-weight: bold;
}
</style>
