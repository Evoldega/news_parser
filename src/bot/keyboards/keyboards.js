import { Markup } from 'telegraf';

export const analyzeKeyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Получить пояснение от нейросети', 'analyze_message'),
  ]
]);

export const mainKeyboard = Markup.keyboard([
  ['📰 Получить новости']
]).resize();
