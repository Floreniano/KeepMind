const googleTranslateConfig = {
  /* Original language */
  lang: 'ru',

  /* Язык, на который переводим при первом посещении */
  /* langFirstVisit: 'en', */

  /* Если скрипт не работает или работает неправильно, раскомментируйте и укажите основной домен в свойстве domain */
};

document.addEventListener('DOMContentLoaded', (event) => {
  /* Подключаем виджет google translate */
  let script = document.createElement('script');
  script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
  document.getElementsByTagName('head')[0].appendChild(script);
});

async function TranslateWidgetIsLoaded() {
  TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
  if (config.langFirstVisit && !Cookies.get('googtrans')) {
    /* Если установлен язык перевода для первого посещения и куки не назначены */
    TranslateCookieHandler('/auto/' + config.langFirstVisit);
  }

  let code = TranslateGetCode(config);

  TranslateHtmlHandler(code);

  if (code == config.lang) {
    /* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
    TranslateCookieHandler(null, config.domain);
  }

  /* Инициализируем виджет с языком по умолчанию */
  new google.translate.TranslateElement({
    pageLanguage: config.lang,
  });

  /* Вешаем событие  клик на флаги */
  TranslateEventHandler('click', '[data-google-lang]', function (e) {
    TranslateCookieHandler(
      '/' + config.lang + '/' + e.getAttribute('data-google-lang'),
      config.domain,
    );
    /* Перезагружаем страницу */
    window.location.reload();
  });
}

function TranslateGetCode(config) {
  /* Если куки нет, то передаем дефолтный язык */
  let lang =
    Cookies.get('googtrans') != undefined && Cookies.get('googtrans') != 'null'
      ? Cookies.get('googtrans')
      : config.lang;
  return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
  /* Записываем куки /язык_который_переводим/язык_на_который_переводим */
  Cookies.set('googtrans', val);
  Cookies.set('googtrans', val, {
    domain: '.' + document.domain,
  });

  if (domain == 'undefined') return;
  /* записываем куки для домена, если он назначен в конфиге */
  Cookies.set('googtrans', val, {
    domain: domain,
  });

  Cookies.set('googtrans', val, {
    domain: '.' + domain,
  });
}

function TranslateEventHandler(event, selector, handler) {
  document.addEventListener(event, function (e) {
    let el = e.target.closest(selector);
    if (el) handler(el);
  });
}

function TranslateHtmlHandler(code) {
  /* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
  if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
    document
      .querySelector('[data-google-lang="' + code + '"]')
      .classList.add('language__img_active');
  }
}
