const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обрабатываем команду /start
bot.onText(/\\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Отправляем приветственное сообщение
  bot.sendMessage(chatId, 'Привет! Добро пожаловать в наш сервис проката автомобилей.');
});

console.log('Telegram bot запущен и готов к работе!');