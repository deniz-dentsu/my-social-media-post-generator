<template>
  <div class="copy-generator">
    <button @click="generateCaptions">Generate Captions</button>
    <div v-if="captions.length > 0" class="captions-list">
      <div v-for="(caption, index) in captions" :key="index" class="caption">
        {{ caption }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

const openaiApiKey = process.env.OPENAI_API_KEY;


@Component
export default class CopyGenerator extends Vue {
  @Prop({ default: '' }) readonly topic!: string;
  captions: string[] = [];

  @Watch('topic')
  onTopicChanged(newVal: string, oldVal: string) {
    console.log('Topic prop changed:', newVal);
  }

  async generateCaptions() {
    console.log('Generating captions for topic:', this.topic);
    if (!this.topic) {
      alert('Please enter a topic.');
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Generate captions for ${this.topic}, for Lumion social media posts` }
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 50,
          n: 3
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response data structure contains choices
      if (data && Array.isArray(data.choices)) {
        // Extract captions from assistant's choices
        this.captions = data.choices.map((choice: any) => choice.message.content.split('\n')[0]);
      } else {
        alert('Invalid response data structure.');
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      alert('An error occurred while generating captions.');
    }
  }
}
</script>



<style scoped>
.copy-generator {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.captions-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.caption {
  background-color: #e9e9e9;
  padding: 10px;
  border-radius: 5px;
}
</style>
