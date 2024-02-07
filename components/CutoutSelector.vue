<template>
  <div>
    <!-- Shape Selector -->
    <div class="shape-selector">
    <div
      v-for="(cutout, index) in cutouts"
      :key="index"
      class="shape-option"
      :class="{ 'selected': selectedShape === cutout.name }"
      @click="selectShape(cutout.name)"
    >
      <img
        :class="{ 'masks': true, 'active': selectedShape === cutout.name }"
        :src="require(`@/assets/${cutout.image}`)"
        :alt="cutout.name"
      />
    </div>
  </div>

    <!-- Color Selector -->
    <div class="color-selector">
      <div
        v-for="(colorOption, index) in colorOptions"
        :key="index"
        class="color-option"
        :style="{ backgroundColor: colorOption }"
        @click="selectedColor = colorOption"
      ></div>
    </div>
  </div>
</template>

<script>
import Mask0 from '@/assets/Mask_0.png';
import Mask1 from '@/assets/Mask_1.png';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      selectedShape: 'shape1', // Initial selected shape
      selectedColor: '#000000', // Initial selected color
      cutouts: [
        { name: 'nomask', image: 'Mask_0.png' },
        { name: 'mask1', image: 'Mask_1.png' },
        { name: 'mask2', image: 'Mask_2.png' },
        { name: 'mask3', image: 'Mask_3.png' },
        { name: 'mask4', image: 'Mask_4.png' },
        // ...other cutouts
      ],
      colorOptions: [
        '#0000ff', '#00ff00', '#ff0000', // ... other colors ...
      ],
    };
  },

  methods: {
    selectShape(name) {
      this.selectedShape = name; // Set the selected shape
    },
  },

});
</script>

<style>
.shape-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem; /* Spacing between shape selector and color selector */
}

.shape-option {
  margin: 0 0.5rem; /* Space between shapes */
  padding: 0.5rem;
  cursor: pointer;
  border: 2px solid transparent; /* No border by default */
}

.shape-option.selected {
  border-color: #2d70ae90; /* Border to indicate selection */
  border-radius: 10%;
}

.color-selector {
  display: flex;
  justify-content: center;
}

.color-option {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin: 0 0.5rem; /* Space between colors */
  cursor: pointer;
  border: 2px solid #fff; /* White border for color options */
}

.masks {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  opacity: 0.6; 
}

.masks.active {
  /* Styles for the selected image */
  opacity: 1; /* Selected item has full opacity */
}

.selected {
  /* Additional styles to indicate selection, like a border */
  border: 2px solid blue;
}

.color-option:hover {
  border-color: #000; /* Border color on hover */
}
</style>
