<template>
    <div class="sidebar">
      <input type="text" id="topic" autocomplete="off" v-model="topic" @input="updateTopic" placeholder="Enter a topic, e.g., 'new feature'" />

      <input type="file" @change="onFileChange" />
         <div v-if="selectedImage" class="image-preview">
         <img :src="selectedImage" alt="Image preview" />
         </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
    data() {
      return {
        topic: '',
        selectedImage: '', // Changed from null to string to match the FileReader result type
      };
    },
    methods: {
      onFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(input.files[0]);
          fileReader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              this.selectedImage = e.target.result as string; // Cast result to string
              // Emit an event with the selected image to the parent
              this.$emit('image-selected', this.selectedImage);
            }
          };
        }
      },
      updateTopic() {
        console.log('Topic updated:', this.topic); 
        this.$emit('topic-updated', this.topic);
      },
    },
  });
  </script>
  

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust spacing between elements */
  padding: 20px;
  background-color: #f4f4f4; /* Match this color to your mockup */
  border-right: 1px solid #ddd; /* Consider the color and style of the border */
  width: 300px; /* Adjust width as needed */
}

.sidebar input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc; /* Match to your mockup */
  border-radius: 4px; /* Rounded borders */
}

.sidebar input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc; /* Match to your mockup */
  border-radius: 4px; /* Rounded borders */
  cursor: pointer; /* Hand cursor on hover */
}

.image-preview img {
  max-width: 100%; /* Ensure the image is not bigger than its container */
  border-radius: 4px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: if you want shadow */
}
</style>