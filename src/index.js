const TelegramBot = require('node-telegram-bot-api');

// Токен бота
const token = '8036247117:AAF6XNOrDqmBvOIX6zsI8Fbafv9Z8lCAl94';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обрабатываем команду /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Отправляем приветственное сообщение
  bot.sendMessage(chatId, 'Привет! Добро пожаловать в наш сервис проката автомобилей.');
});

console.log('Telegram bot запущен и готов к работе!');