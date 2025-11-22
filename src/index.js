import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Токен бота из переменной окружения
const token = process.env.TELEGRAM_BOT_TOKEN;

// URL веб-приложения из переменной окружения
const webAppUrl = process.env.WEB_APP_URL || 'https://your-app-url.com';

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
  const firstName = msg.from.first_name || 'Пользователь';
  
  // Отправляем приветственное сообщение с кнопкой для запуска Web App
  bot.sendMessage(chatId, `Привет, ${firstName}! Добро пожаловать в наш сервис проката автомобилей.`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть админ-панель',
            web_app: {
              url: webAppUrl
            }
          }
        ]
      ]
    }
  });
});

// Обрабатываем команду /menu
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'Пользователь';
  
  // Отправляем меню с кнопкой для запуска Web App
  bot.sendMessage(chatId, `${firstName}, выберите действие:`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Управление автомобилями',
            web_app: {
              url: webAppUrl
            }
          }
        ]
      ]
    }
  });
});

console.log('Telegram bot запущен и готов к работе!');