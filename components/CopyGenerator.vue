<template>
    <div>
      <select v-model="tone">
        <option value="friendly">Friendly</option>
        <option value="professional">Professional</option>
        <option value="informative">Informative</option>
      </select>
      <button @click="generateCopy">Generate Copy</button>
      <p v-if="generatedCopy">{{ generatedCopy }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import axios from 'axios';
  
  @Component
  export default class CopyGenerator extends Vue {
    tone: string = 'friendly';
    generatedCopy: string = '';
  
    async generateCopy() {
      try {
        const response = await axios.post('/api/generate-copy', {
          tone: this.tone,
        });
        this.generatedCopy = response.data.copy;
      } catch (error) {
        console.error('Error generating copy:', error);
      }
    }
  }
  </script>
  