<template>
  <div class="cutout-selector">
    <div class="cutouts">
      <div v-for="(cutout, index) in cutouts" :key="index" class="cutout" @click="selectCutout(cutout)">
        <img :src="cutout.image" :alt="`Cutout ${index}`" />
      </div>
    </div>
    <input type="color" v-model="selectedColor" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface Cutout {
  image: string;
  color: string;
}

@Component
export default class CutoutSelector extends Vue {
  cutouts: Cutout[] = [
    { image: 'cutout1.png', color: '#FFFFFF' },
    // ... other cutouts ...
  ];

  selectedColor: string = '#FFFFFF';
  selectedCutout: Cutout | null = null;

  selectCutout(cutout: Cutout) {
    this.selectedCutout = cutout;
    // Apply the selected color to the cutout
    // You might need to adjust this logic based on how you plan to apply the colors
  }
}
</script>


<style scoped>
.cutout-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #f4f4f4; /* Replace with your desired background color */
  border-radius: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.cutouts {
  display: flex;
  justify-content: space-between; /* Distribute cutouts evenly */
  width: 100%; /* Full width to contain cutouts */
  margin-bottom: 16px; /* Spacing between cutouts and color picker */
}

.cutout {
  height: 100px; /* Fixed height for cutouts */
  width: 100px; /* Fixed width for cutouts */
  background-size: cover; /* Cover the area without stretching */
  background-position: center; /* Center the image within the cutout */
  cursor: pointer; /* Pointer cursor on hover */
  border: 2px solid transparent; /* Transparent border for spacing and visual feedback */
  border-radius: 8px; /* Rounded corners for the cutouts */
}

.cutout:hover, .cutout.selected {
  border-color: #007bff; /* Highlight color for hover/selected state */
}

.color-picker {
  border: none; /* Remove default border */
  height: 36px; /* Fixed height for the color picker */
  cursor: pointer; /* Pointer cursor on hover */
}
</style>
