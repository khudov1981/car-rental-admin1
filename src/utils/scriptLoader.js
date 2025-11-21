/**
 * Утилита для безопасной загрузки внешних скриптов
 */

/**
 * Загрузка внешнего скрипта
 * @param {string} src - URL скрипта
 * @param {object} options - опции загрузки
 * @returns {Promise} промис, разрешающийся при загрузке скрипта
 */
export function loadScript(src, options = {}) {
  return new Promise((resolve, reject) => {
    // Проверка, не загружен ли уже скрипт
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    
    // Установка атрибутов из опций
    if (options.async !== undefined) script.async = options.async;
    if (options.defer !== undefined) script.defer = options.defer;
    if (options.crossOrigin) script.crossOrigin = options.crossOrigin;
    if (options.integrity) script.integrity = options.integrity;
    
    script.onload = () => resolve();
    script.onerror = (error) => reject(new Error(`Ошибка загрузки скрипта: ${src}`));
    
    document.head.appendChild(script);
  });
}

/**
 * Загрузка нескольких скриптов последовательно
 * @param {string[]} scripts - массив URL скриптов
 * @returns {Promise} промис, разрешающийся при загрузке всех скриптов
 */
export async function loadScriptsSequentially(scripts) {
  for (const src of scripts) {
    await loadScript(src);
  }
}

/**
 * Загрузка нескольких скриптов параллельно
 * @param {string[]} scripts - массив URL скриптов
 * @returns {Promise} промис, разрешающийся при загрузке всех скриптов
 */
export function loadScriptsParallel(scripts) {
  return Promise.all(scripts.map(src => loadScript(src)));
}

/**
 * Удаление скрипта по URL
 * @param {string} src - URL скрипта
 */
export function removeScript(src) {
  const script = document.querySelector(`script[src="${src}"]`);
  if (script) {
    script.remove();
  }
}

export default {
  loadScript,
  loadScriptsSequentially,
  loadScriptsParallel,
  removeScript
};