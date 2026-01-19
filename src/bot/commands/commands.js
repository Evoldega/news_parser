import { mainKeyboard } from '../keyboards/keyboards.js';

export const start = async (ctx) => {
  const name = ctx.from.first_name || 'друг';
  
  await ctx.reply(
    `Привет, ${name}!`,
    mainKeyboard
  );
};