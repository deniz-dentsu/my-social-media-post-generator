<template>
  <div class="container">
    <Sidebar @image-selected="handleImageSelected" @topic-updated="handleTopicUpdate" />
    <div class="content">
      <CopyGenerator :topic="topic" @captions-generated="handleCaptionsGenerated" />
      <CutoutSelector @mask-selected="handleMaskSelected" />
             <!-- Display the result with the applied mask -->
      <div v-if="uploadedImage">
        <img :src="uploadedImage" alt="Uploaded Image" class="uploaded-image" />
        <!-- The mask will be applied here -->
        <svg v-if="mask" class="mask-overlay" :style="{ 'fill': maskColor }">
          <use :href="`#${mask}`" />
        </svg>
      <!-- Include other components as necessary -->
    </div>
    <!-- Include the ResultDisplay component here if needed -->
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '~/components/Sidebar.vue';
import CopyGenerator from '~/components/CopyGenerator.vue';
import CutoutSelector from '~/components/CutoutSelector.vue';

export default defineComponent({
  components: {
    Sidebar,
    CopyGenerator,
    CutoutSelector,
    // ... other components ...
  },

  data() {
    return {
      topic: '', // This will hold the topic entered in the sidebar
      uploadedImage: '', // Will hold the base64 string of the uploaded image
      mask: '', // Will hold the id of the svg mask to apply
      maskColor: '', // Will hold the color for the mask
      // ... other data properties ...
    };
  },
  methods: {
    handleImageSelected(imageData: string) {
      // Handle the selected image here
      // Possibly set it to a data property or emit it to a child component
    },
    handleTopicUpdate(newTopic: string) {
      console.log('Received new topic:', newTopic); // Add this line for debugging
      this.topic = newTopic; // Update the topic data property
    },
    handleCaptionsGenerated(captions: string[]) {
      // Handle the generated captions here, if necessary
    },
    handleMaskSelected(maskDetails: { id: string; color: string; }) {
      // Set the selected mask id and color
      this.mask = maskDetails.id;
      this.maskColor = maskDetails.color;
    },
    // ... other methods ...
  },
});
</script>




<style>

.container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

</style>