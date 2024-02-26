<template>
  <div class="copy-generator">
    
    <button class="button-56" @click="generateCaptions">Generate Captions</button>
    <div v-if="captions.length > 0" class="captions-container">
      <div
        v-for="(caption, index) in captions"
        :key="index"
        class="caption"
        :class="{ 'is-selected': selectedCaptionIndex === index }"
        @click="selectCaption(index)"
      >
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
  selectedCaptionIndex: number | null = null;


  @Watch('topic')
  onTopicChanged(newVal: string, oldVal: string) {
    console.log('Topic prop changed:', newVal);
  }

  selectCaption(index: number) {
    this.selectedCaptionIndex = index;
    // Here you can do additional things with the selected caption,
    // such as emitting an event or performing an action
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
            { role: "user", content: `Generate a caption of 3-4 sentences for ${this.topic}, for Lumion social media posts. You can add emojis and hashtags` }
          ],
          model: "ft:gpt-3.5-turbo-1106:dc-amsterdam::8q1QYlgk",
          max_tokens: 200,
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
        this.captions = data.choices.map((choice: { message: { content: string; }; }, index: number) => {
  // Take the entire content as one paragraph
  let contentAsParagraph = choice.message.content;
  // Ensure the content does not start with a number
  contentAsParagraph = contentAsParagraph.replace(/^\d+\.\s+/gm, '');
  // Prepend the index to the whole block of text (the entire choice)
  return `${index + 1}. ${contentAsParagraph}`;
});


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

/* CSS */
.button-56 {
  align-items: center;
  background-color: #fee6e3;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-56:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

.button-56:hover:after {
  transform: translate(0, 0);
}

.button-56:active {
  background-color: #ffdeda;
  outline: 0;
}

.button-56:hover {
  outline: 0;
}

@media (min-width: 768px) {
  .button-56 {
    padding: 0 40px;
  }
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

.caption:hover {
  background-color: #f0f0f0;
}

.is-selected {
  background-color: #007bff;
  color: white;
  border-color: #0056b3;
}
</style>
