<template>
    <div>
      <select v-model="selectedCutout">
        <option v-for="cutout in cutouts" :key="cutout" :value="cutout">
          {{ cutout }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
  
  @Component
  export default class CutoutSelector extends Vue {
    selectedCutout: string = '';
    cutouts: Array<string> = ['Cutout 1', 'Cutout 2', 'Cutout 3'];
  }
  </script>
  