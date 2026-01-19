import { Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import 'dotenv/config';

// Импорт модулей
import * as actions from './actions/actions.js';
import * as commands from './commands/commands.js';
import * as handlers from './handlers/handlers.js';
import * as middlewares from './middlewares/middlewares.js';

export class Bot {
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.setupMiddlewares();
    this.setupHandlers();
  }

  setupMiddlewares() {
    this.bot.use(session());
    
    this.bot.use(middlewares.logger);
    
    this.bot.use(middlewares.adminOnly);
    
    this.bot.use(middlewares.analytics);
  }

  setupHandlers() {
    // Экшены
    this.bot.action('analyze_message', actions.analyzeMessage);
    // Команды
    this.bot.command('start', commands.start);
    
    // Обработка текстовых сообщений с фильтрацией
    this.bot.on(message('text'), handlers.handleText);
    
    // Обработка ошибок
    this.bot.catch((err, ctx) => {
      console.error(`Error for ${ctx.updateType}:`, err);
      ctx.reply('Произошла ошибка. Попробуйте позже.');
    });
  }

  async launch() {
    try {
      await this.bot.launch()
      console.log('🤖 Бот запущен!');      
    } catch (error) {
      console.error('Ошибка запуска бота:', error);
    }

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}