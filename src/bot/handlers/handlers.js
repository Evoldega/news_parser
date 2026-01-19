import { analyzeKeyboard } from '../keyboards/keyboards.js';
import { PublicChannelParser } from '../../parsers/TelegramParser.js';
import Parser from 'rss-parser';

export const handleText = async (ctx) => {
  const text = ctx.message.text;
  
  switch (text) {
    case '📰 Получить новости': 
      const parser = new PublicChannelParser('rbc_news');
      const messages = await parser.parseLastMessages(50);
      
      for (const message of messages) {
        await ctx.reply(message, analyzeKeyboard);
      }

      break;
    case '⚙️ Настройки':
      break;
    case 'test':
      try {
        const parser = new Parser();
        const news = await parser.parseURL('https://lenta.ru/rss');
        news.items.forEach(item => {
          console.log(item.title, item.link);
        });
        console.log('✅news✅', news );
        
      } catch (error) {
        
      }

      
      break;
    default:
      await ctx.reply(`Вы написали: "${text}"`);
  }
};