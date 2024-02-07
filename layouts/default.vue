<template>
  <div class="container">
    <Sidebar @image-selected="handleImageSelected" @topic-updated="handleTopicUpdate" />
    <div class="content">
      <CopyGenerator :topic="topic" @captions-generated="handleCaptionsGenerated" />
      <CutoutSelector @mask-selected="handleMaskSelected" />
             <!-- Display the result with the applied mask -->
      <div v-if="uploadedImage" class="image-preview">
        <img :src="uploadedImage" alt="Uploaded Image" class="uploaded-image" />
        <!-- The mask will be applied here -->
        <div v-if="selectedMask" class="svg-mask">
        <img :src="require(`@/assets/${selectedMask}`)" />
        </div>
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
      selectedMask: null, // This will hold the path to the selected SVG mask
      maskColor: '', // Will hold the color for the mask
      // ... other data properties ...
    };
  },
  methods: {
    handleImageSelected(imageData: string) {
      // Handle the selected image here
      // Possibly set it to a data property or emit it to a child component
      this.uploadedImage = imageData;

    },
    handleTopicUpdate(newTopic: string) {
      console.log('Received new topic:', newTopic); // Add this line for debugging
      this.topic = newTopic; // Update the topic data property
    },
    handleCaptionsGenerated(captions: string[]) {
      // Handle the generated captions here, if necessary
    },
    handleMaskSelected(svgPath: null) {
      this.selectedMask = svgPath;
    },
    // ... other methods ...
  },
});
</script>




<style>

.image-preview {
  position: relative;
}

.svg-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

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