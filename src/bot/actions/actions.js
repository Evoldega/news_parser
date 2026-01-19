import { Gigachat } from '../../gigachat/Gigachat.js';
import { sendAsTextFile } from '../../utils/utils.js';

const chat = new Gigachat();

export const analyzeMessage = async (ctx) => { 
  const { text } = ctx;
  
  const format = ".txt";
  const filename = `Аналитика ${text.split(' ', 3).join(' ')}${format}`
  const sysPrompt = "Ты профессиональный политолог и социолог. Должен рассказать, что новость значит для рядового россиянина, должен ли он что-то сделать для подстраховки."; 
  
  const chatAnalytics = await chat.getAnswer(sysPrompt, text);
  await sendAsTextFile(ctx, chatAnalytics, { caption: text, filename });
  
  await ctx.answerCbQuery();
};