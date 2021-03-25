# Задание 3. Найдите ошибки

В этом репозитории находятся материалы тестового задания «Найдите ошибки» для [17-й Школы разработки интерфейсов](https://yandex.ru/promo/academy/shri) (лето-2021, Москва).

Для работы приложения нужен [Node.JS](https://nodejs.org/en/) v12 или выше.

## Задание

В этом задании мы хотим проверить вашу способность разобраться в незнакомом коде и API, а также ваш навык отладки.

**Вам дан исходный код приложения. В нём есть ошибки: некоторые — стилистические, а другие даже не позволят запустить приложение. Вам нужно найти все ошибки и исправить их.**

В качестве решения укажите ссылку на форк этого репозитория с исправленными ошибками. Обратите внимание: репозиторий должен быть приватным, чтобы другие кандидаты не могли скопировать ваш код.

## Предметная область

Тестовое приложение — это плейер для отображения stories. На вход плейер получает список слайдов с их параметрами. Плейер рендерит слайды и показывает их по очереди.

- Плейер занимает весь экран:
  - есть кнопки для перехода к предыдущему и следующему слайдам;
  - есть кнопка перехода в начало.
- Если пользователь нажимает интерактивные элементы внутри слайдов, то происходит нужное действие.
- При переходе между слайдами есть анимация.
- Плейер может отображать слайды в тёмной и светлой темах:
  - по умолчанию используется тёмная тема;
  - темы переключаются при нажатии специальной кнопки.
- Плейер автоматически переходит на следующий слайд через семь секунд:
  - сверху отображается прогресс-бар, который показывает текущий слайд и оставшееся время до перехода к следующему;
  - после проигрывания последнего слайда отсчет времени останавливается.

Файл с описанием слайдов должен находиться в папке с файлами плейера и называться `data.ts`. Его формат соответствует формату, описанному в первом задании.

Содержимое слайдов формируется при помощи функции `renderTemplate(alias, data)`, которая получает на вход название шаблона слайда и его параметры, а возвращает строку с HTML-разметкой слайда. Интерактивные элементы должны быть размечены data-атрибутами.

Атрибут `data-action` задает действие, которое должно произойти при нажатии на элемент:

- `'go-prev'` — переход к предыдущему слайду;
- `'go-next'` — переход к следующему слайду;
- `'restart'` — переход в начало;
- `'update'` — изменение данных текущего слайда.

Если для слайда указано действие `'update'`, то необходимо дополнительно указать атрибут `data-params`, содержащий новые данные для слайда в формате JSON. Посмотрите [пример разметки](./public/stories.js) интерактивных элементов.

В качестве дополнительного задания подключите к плейеру стили и функцию шаблонизации из первого задания.

## Как запустить

1. Клонировать репозиторий

   ```sh
   git clone git@github.com:yndx-shri/shri-2021-task-3.git
   cd shri-2021-task-3
   ```

2. Установить зависимости

   ```sh
   npm ci
   ```

3. Запустить dev-сервер

   ```sh
   npm start
   ```

Должен открыться плейер в браузере.

## Выполнение задания

Пожалуйста, опишите в коде или файле README ход ваших мыслей: какие ошибки и как вы нашли, почему они возникли, какие способы их исправления существуют.

Мы не ограничиваем вас в использовании сторонних инструментов и библиотек, но будем ждать от вас комментария — что и зачем вы использовали.

Мы будем благодарны, если вы логически сгруппируете сделанные изменения по коммитам.