# Проект Mesto фронтенд + бэкенд

Целью проекта является подготовка сервера с базой данных, по аналогу с сервером проекта Mesto на фронтенде.

## Функционал:

#### users:

- /users/ GET-запрос возвращает всех пользователей из базы данных;
- /users/:userId GET-запрос возвращает пользователя по переданному \_id;
- /users/me/ POST-запрос создаёт пользователя с переданными в теле запроса name, about, avatar;
- /users/me/avatar PATCH-запрос обновляет информацию о пользователе и его аватар;

#### cards:

- /cards GET запрос возвращает все карточки из базы данных;
- /cards POST-запрос создает новую карточку по переданным параметрам;
- /cards/:cardId DELETE-запрос удаляет карточку по \_id;
- /cards/:cardId/likes PUT-запрос добавляет лайк карточке. DELETE-запрос удаляет лайк с карточки.

## Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает сервер с hot-reload
