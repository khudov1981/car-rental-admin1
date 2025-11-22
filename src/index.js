import TelegramBot from 'node-telegram-bot-api';

// Токен бота из переменной окружения
const token = process.env.TELEGRAM_BOT_TOKEN;

// Проверяем наличие токена
if (!token) {
  console.error('Ошибка: Не найден токен бота. Установите переменную окружения TELEGRAM_BOT_TOKEN');
  process.exit(1);
}

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обрабатываем команду /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Отправляем приветственное сообщение
  bot.sendMessage(chatId, 'Привет! Добро пожаловать в наш сервис проката автомобилей.');
});

console.log('Telegram bot запущен и готов к работе!');