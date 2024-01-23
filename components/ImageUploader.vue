<template>
  <!-- ... -->
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ImageUploader extends Vue {
  imageUrl: string | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Assert that the result is a string before assigning it to imageUrl
        if (typeof e.target?.result === 'string') {
          this.imageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
</script>
