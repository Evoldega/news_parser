import { Bot } from './bot/index.js';
import { config } from './bot/config.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log('SSL проверка отключена');

if (!config.botToken) {
  console.error('❌ BOT_TOKEN не установлен в .env файле');
  process.exit(1);
}

console.log(`Запуск бота в режиме: ${config.isDev ? 'разработки' : 'продакшена'}`);

const bot = new Bot();
bot.launch();

// Логирование статуса бота
console.log('✅ Бот успешно инициализирован');
console.log(`Админ ID: ${config.adminId || 'не установлен'}`);