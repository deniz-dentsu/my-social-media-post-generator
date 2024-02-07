<template>
  <div>
    <select v-model="selectedShape">
      <!-- Add options dynamically if there are many shapes -->
      <option value="polygon1">Polygon 1</option>
    </select>
    
    <input type="color" v-model="selectedColor" />

    <!-- This is where the selected mask will be displayed -->
    <div v-if="selectedShape">
      <svg :style="{ 'color': selectedColor }">
        <!-- Include the SVG path here -->
        <!-- This is a placeholder, use your actual SVG content -->
        <use :href="`#${selectedShape}`" />
      </svg>
    </div>
  </div>


</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CutoutSelector extends Vue {
  selectedShape: string = 'polygon1'; // Default shape
  selectedColor: string = '#ff0000'; // Default color
}
</script>



<style scoped>
.cutout-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Add space between elements */
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
