import { CategoryProps as P } from '@mantissa/shared-types';

export default {
  'name': 'Без категории',
  'props': P.isBothAllowed | P.isSystemAccess,
  'children': [
    {
      'name': 'Корректировка',
      'props': P.isBothAllowed | P.isSystemAccess | P.isCorrection
    },
    {
      'name': 'Перевод',
      'props': P.isSystemAccess | P.isTransfer
    },
    { 'name': 'Зарплата', 'props': P.isDebitAllowed | P.isUserAccess },
    { 'name': 'Подработка', 'props': P.isDebitAllowed | P.isUserAccess },
    { 'name': 'Другие доходы', 'props': P.isDebitAllowed | P.isUserAccess },
    {
      'name': 'Питание',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Обеды на работе', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Продукты домой', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Кафе, рестораны', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Службы доставки', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Одежда',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Аксессуары', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Нижнее белье, купальники', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Медицина',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Аптека', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Анализы', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Консультации, больницы', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другая медицина', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Дом, дача',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Хозтовары', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Ремонт', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Ребенок', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Животные', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Предметы интерьера', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другое для дома, дачи', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Автомобиль',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Топливо', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Сервис', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Страховка', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Запчасти', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другие авто. расходы', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Транспорт',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Общественный транспорт', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Такси', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Ж/Д билеты', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Авиа билеты', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другой транспорт', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Платежи',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        {
          'name': 'Коммунальные платежи',
          'props': P.isCreditAllowed | P.isUserAccess,
          'children': [
            { 'name': 'Электричество', 'props': P.isCreditAllowed | P.isUserAccess },
            { 'name': 'Аренда', 'props': P.isCreditAllowed | P.isUserAccess },
            { 'name': 'Телефон', 'props': P.isCreditAllowed | P.isUserAccess },
            { 'name': 'Вода', 'props': P.isCreditAllowed | P.isUserAccess },
            { 'name': 'Газ', 'props': P.isCreditAllowed | P.isUserAccess }
          ]
        },
        { 'name': 'Сотовая связь', 'props': P.isCreditAllowed | P.isUserAccess },
        {
          'name': 'Интернет',
          'props': P.isCreditAllowed | P.isUserAccess,
          'children': [
            { 'name': 'Абонетская плата', 'props': P.isCreditAllowed | P.isUserAccess },
            { 'name': 'Сервисы', 'props': P.isCreditAllowed | P.isUserAccess }
          ]
        },
        { 'name': 'Телевидение', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Учеба', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Гос. услуги', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Банковское обслуживание', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Подписки', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другие платежи', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    {
      'name': 'Техника',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Бытовая техника', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Мобильные гаджеты', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Компьютерная техника', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Инструменты', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Другая техника', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    },
    { 'name': 'Спортивные товары', 'props': P.isCreditAllowed | P.isUserAccess },
    {
      'name': 'Другие траты',
      'props': P.isCreditAllowed | P.isUserAccess,
      'children': [
        { 'name': 'Подарки, праздники', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Отдых, развлечения', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Разовые траты', 'props': P.isCreditAllowed | P.isUserAccess },
        { 'name': 'Уход за собой', 'props': P.isCreditAllowed | P.isUserAccess }
      ]
    }
  ]
}
