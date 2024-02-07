<template>
  <div>
    <!-- Components that make up your homepage -->
    <ImageUploader />
    <CopyGenerator />
    <CutoutSelector />
    <Sidebar />
    <SocialMediaPostButton />
    <!-- You can add more components as needed -->
  </div>



</template>


<script lang="ts">
import Vue from 'vue';
import ImageUploader from '~/components/ImageUploader.vue';
import CopyGenerator from '~/components/CopyGenerator.vue';
import CutoutSelector from '~/components/CutoutSelector.vue';
import Sidebar from '~/components/Sidebar.vue';
import SocialMediaPostButton from '~/components/SocialMediaPostButton.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: {
    ImageUploader,
    CopyGenerator,
    CutoutSelector,
    Sidebar,
    SocialMediaPostButton
  }
})
</script>
