import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: [],
    model: {}
  },
});

export const mutableSource = dedent`<fluent-form [schemas]="schemas" [model]="model"></fluent-form>`;
export const immutableSource = dedent`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>`;