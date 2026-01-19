export const config = {
    botToken: process.env.BOT_TOKEN,
    adminId: process.env.ADMIN_ID || null,
    isDev: process.env.NODE_ENV === 'development',
    
    // Настройки базы данных
    // db: {
    //   uri: process.env.DB_URI || 'mongodb://localhost:27017/bot',
    //   options: {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   }
    // },
    
    // Настройки бота
    botSettings: {
      parseMode: 'HTML',
      disableWebPagePreview: true,
      disableNotification: false
    },
    
    // Фильтры для команд
    filters: {
      allowedCommands: ['start', 'help', 'settings', 'stats'],
      adminCommands: ['admin', 'broadcast', 'users']
    }
  };
  
  // Хелпер для проверки фильтров
  export const filters = {
    isAllowedCommand: (command) => {
      return config.filters.allowedCommands.includes(command.replace('/', ''));
    },
    
    isAdminCommand: (command) => {
      return config.filters.adminCommands.includes(command.replace('/', ''));
    },
    
    isPrivateChat: (ctx) => {
      return ctx.chat?.type === 'private';
    },
    
    isGroupChat: (ctx) => {
      return ['group', 'supergroup'].includes(ctx.chat?.type);
    }
  };