<template>
  <div class="albums-container">
    <div class="albums">
      <div class="album-grid">
        <div v-for="album in albums" :key="album.id" class="album-item">
          <router-link :to="'/albums/' + album.id" class="album-link">{{ album.title }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../store/album';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const albumsStore = useAlbumsStore();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    return {
      albums,
    };
  },
});
</script>

<style scoped>
.albums-container {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid whitesmoke;
}

.albums {
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.album-item {
  background-color: transparent;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid whitesmoke;
}

.album-item:hover {
  background-color: #555;
  transform: translateY(-2px);
}

.album-link {
  text-decoration: none;
  color: #fff;
  font-size: 1.1rem;
}
</style>
