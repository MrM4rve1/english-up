/** English Up 9.0: manually authored educational scenarios, not AI-generated answers. */
export type Stage='A1'|'A2'|'B1'|'B2';
export type Phrase={en:string;ru:string;tip:string};
export type DialogueLine={speaker:string;en:string;ru:string};
export type UnitQuestion={q:string;choices:string[];answer:number;why:string};
export type ScenarioUnit={category:'america'|'work';id:string;level:Stage;title:string;goal:string;scene:string;culture:string;phrases:Phrase[];dialogue:DialogueLine[];questions:UnitQuestion[];practice:{prompt:string;model:string;translation:string}};
export const scenarioUnits:ScenarioUnit[]=[
  {
    "category": "america",
    "id": "intro",
    "level": "A1",
    "title": "Знакомство и small talk",
    "goal": "Представиться и задать простой встречный вопрос",
    "scene": "Новый сосед здоровается в лифте.",
    "culture": "В США How are you? часто служит приветствием, а не просьбой подробно рассказать о проблемах.",
    "phrases": [
      {
        "en": "Nice to meet you.",
        "ru": "Приятно познакомиться.",
        "tip": "Уместно при первом знакомстве."
      },
      {
        "en": "I just moved here.",
        "ru": "Я только что переехал сюда.",
        "tip": "Just подчёркивает недавнее действие."
      },
      {
        "en": "How about you?",
        "ru": "А ты? / А у тебя?",
        "tip": "Короткий встречный вопрос."
      }
    ],
    "dialogue": [
      {
        "speaker": "Neighbor",
        "en": "Hi! I haven't seen you before.",
        "ru": "Привет! Раньше тебя не видел."
      },
      {
        "speaker": "You",
        "en": "I just moved here. I'm Alex.",
        "ru": "Я только что переехал. Я Алекс."
      },
      {
        "speaker": "Neighbor",
        "en": "Nice to meet you, Alex. I'm Sam.",
        "ru": "Приятно познакомиться, Алекс. Я Сэм."
      },
      {
        "speaker": "You",
        "en": "Nice to meet you too.",
        "ru": "Мне тоже приятно познакомиться."
      }
    ],
    "practice": {
      "prompt": "Представься новому соседу, скажи, что недавно переехал, и задай встречный вопрос.",
      "model": "Hi, I’m Alex. I just moved here. Nice to meet you! How about you?",
      "translation": "Привет, я Алекс. Недавно переехал. Приятно познакомиться! А ты?"
    },
    "questions": [
      {
        "q": "Что лучше сказать в ответ на Nice to meet you?",
        "choices": [
          "Nice to meet you too.",
          "Give me your passport.",
          "I refuse.",
          "Never mind the weather."
        ],
        "answer": 0,
        "why": "В ответ при знакомстве естественно сказать Nice to meet you too."
      },
      {
        "q": "Как сказать по-английски: «Приятно познакомиться.»?",
        "choices": [
          "I just moved here.",
          "How about you?",
          "Nice to meet you.",
          "Can I get a latte?"
        ],
        "answer": 2,
        "why": "Уместно при первом знакомстве."
      },
      {
        "q": "Что означает выражение «How about you?»?",
        "choices": [
          "Я только что переехал сюда.",
          "Приятно познакомиться.",
          "А ты? / А у тебя?",
          "Можно мне латте?"
        ],
        "answer": 2,
        "why": "Короткий встречный вопрос."
      }
    ]
  },
  {
    "category": "america",
    "id": "coffee",
    "level": "A1",
    "title": "Кофейня: заказ",
    "goal": "Сделать простой вежливый заказ",
    "scene": "Ты заказываешь кофе с собой.",
    "culture": "Can I get…? — обычная разговорная форма заказа в США. Она не грубая, если говорить дружелюбно.",
    "phrases": [
      {
        "en": "Can I get a latte?",
        "ru": "Можно мне латте?",
        "tip": "Вежливый заказ в кафе."
      },
      {
        "en": "To go, please.",
        "ru": "С собой, пожалуйста.",
        "tip": "В США часто говорят to go."
      },
      {
        "en": "That's all, thanks.",
        "ru": "Это всё, спасибо.",
        "tip": "Завершает заказ."
      }
    ],
    "dialogue": [
      {
        "speaker": "Barista",
        "en": "Hi! What can I get for you?",
        "ru": "Привет! Что вам приготовить?"
      },
      {
        "speaker": "You",
        "en": "Can I get a small latte, please?",
        "ru": "Можно маленький латте, пожалуйста?"
      },
      {
        "speaker": "Barista",
        "en": "For here or to go?",
        "ru": "Здесь или с собой?"
      },
      {
        "speaker": "You",
        "en": "To go, please. That's all, thanks.",
        "ru": "С собой, пожалуйста. Это всё, спасибо."
      }
    ],
    "practice": {
      "prompt": "Закажи небольшой американо с собой и вежливо заверши заказ.",
      "model": "Can I get a small Americano, please? To go, please. That’s all, thanks.",
      "translation": "Можно маленький американо, пожалуйста? С собой. Это всё, спасибо."
    },
    "questions": [
      {
        "q": "Бариста спрашивает For here or to go? Ты хочешь унести напиток. Как ответить?",
        "choices": [
          "To go, please.",
          "Here is my address.",
          "I am at work.",
          "It is broken."
        ],
        "answer": 0,
        "why": "To go означает «с собой» для еды и напитков."
      },
      {
        "q": "Как сказать по-английски: «Можно мне латте?»?",
        "choices": [
          "To go, please.",
          "That's all, thanks.",
          "Can I get a latte?",
          "Nice to meet you."
        ],
        "answer": 2,
        "why": "Вежливый заказ в кафе."
      },
      {
        "q": "Что означает выражение «That's all, thanks.»?",
        "choices": [
          "С собой, пожалуйста.",
          "Можно мне латте?",
          "Это всё, спасибо.",
          "Приятно познакомиться."
        ],
        "answer": 2,
        "why": "Завершает заказ."
      }
    ]
  },
  {
    "category": "america",
    "id": "grocery",
    "level": "A1",
    "title": "Магазин: найти товар",
    "goal": "Спросить, где лежит нужный продукт",
    "scene": "Ты ищешь молоко в супермаркете.",
    "culture": "В американском магазине aisle — проход между стеллажами. Сотрудники обычно готовы подсказать номер прохода.",
    "phrases": [
      {
        "en": "Where can I find milk?",
        "ru": "Где я могу найти молоко?",
        "tip": "Полезный универсальный вопрос."
      },
      {
        "en": "In aisle five.",
        "ru": "В пятом проходе.",
        "tip": "Aisle произносится примерно как «айл»."
      },
      {
        "en": "Thanks for your help.",
        "ru": "Спасибо за помощь.",
        "tip": "Вежливая благодарность."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Excuse me, where can I find milk?",
        "ru": "Извините, где найти молоко?"
      },
      {
        "speaker": "Employee",
        "en": "It's in aisle five, near the eggs.",
        "ru": "В пятом проходе рядом с яйцами."
      },
      {
        "speaker": "You",
        "en": "Great. Thanks for your help!",
        "ru": "Отлично. Спасибо за помощь!"
      }
    ],
    "practice": {
      "prompt": "Спроси сотрудника, где найти хлеб, и поблагодари за помощь.",
      "model": "Excuse me, where can I find bread? Thanks for your help!",
      "translation": "Извините, где можно найти хлеб? Спасибо за помощь!"
    },
    "questions": [
      {
        "q": "Сотрудник говорит It’s in aisle five. Куда идти?",
        "choices": [
          "К пятому проходу.",
          "К пятой кассе.",
          "На пятый этаж.",
          "К пятому входу."
        ],
        "answer": 0,
        "why": "Aisle — проход между рядами стеллажей, не касса и не этаж."
      },
      {
        "q": "Как сказать по-английски: «Где я могу найти молоко?»?",
        "choices": [
          "In aisle five.",
          "Thanks for your help.",
          "Where can I find milk?",
          "Nice to meet you."
        ],
        "answer": 2,
        "why": "Полезный универсальный вопрос."
      },
      {
        "q": "Что означает выражение «Thanks for your help.»?",
        "choices": [
          "В пятом проходе.",
          "Где я могу найти молоко?",
          "Спасибо за помощь.",
          "Приятно познакомиться."
        ],
        "answer": 2,
        "why": "Вежливая благодарность."
      }
    ]
  },
  {
    "category": "america",
    "id": "directions",
    "level": "A1",
    "title": "Как спросить дорогу",
    "goal": "Понять простое указание направления",
    "scene": "Тебе нужно найти автобусную остановку.",
    "culture": "В США люди часто говорят block — квартал между улицами. Go straight означает «идите прямо».",
    "phrases": [
      {
        "en": "Is there a bus stop nearby?",
        "ru": "Здесь поблизости есть остановка?",
        "tip": "Nearby = поблизости."
      },
      {
        "en": "Go straight ahead.",
        "ru": "Идите прямо.",
        "tip": "Указание направления."
      },
      {
        "en": "Turn right at the corner.",
        "ru": "Поверните направо на углу.",
        "tip": "Right = направо."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Excuse me, is there a bus stop nearby?",
        "ru": "Извините, рядом есть остановка?"
      },
      {
        "speaker": "Local",
        "en": "Go straight ahead for one block.",
        "ru": "Идите прямо один квартал."
      },
      {
        "speaker": "Local",
        "en": "Then turn right at the corner.",
        "ru": "Потом поверните направо на углу."
      },
      {
        "speaker": "You",
        "en": "Thank you!",
        "ru": "Спасибо!"
      }
    ],
    "practice": {
      "prompt": "Спроси, есть ли поблизости аптека, и попроси показать дорогу.",
      "model": "Excuse me, is there a pharmacy nearby? Could you tell me how to get there?",
      "translation": "Извините, поблизости есть аптека? Можете подсказать дорогу?"
    },
    "questions": [
      {
        "q": "Какой поворот нужен после одного квартала?",
        "choices": [
          "Направо.",
          "Налево.",
          "Развернуться.",
          "Не поворачивать."
        ],
        "answer": 0,
        "why": "Turn right — повернуть направо."
      },
      {
        "q": "Как сказать по-английски: «Здесь поблизости есть остановка?»?",
        "choices": [
          "Go straight ahead.",
          "Turn right at the corner.",
          "Is there a bus stop nearby?",
          "Nice to meet you."
        ],
        "answer": 2,
        "why": "Nearby = поблизости."
      },
      {
        "q": "Что означает выражение «Turn right at the corner.»?",
        "choices": [
          "Идите прямо.",
          "Здесь поблизости есть остановка?",
          "Поверните направо на углу.",
          "Приятно познакомиться."
        ],
        "answer": 2,
        "why": "Right = направо."
      }
    ]
  },
  {
    "category": "america",
    "id": "rent",
    "level": "A2",
    "title": "Аренда квартиры",
    "goal": "Уточнить коммунальные платежи и срок аренды",
    "scene": "Ты пишешь арендодателю по объявлению.",
    "culture": "В США utilities обычно включают электричество, газ, воду и другие услуги; состав зависит от договора.",
    "phrases": [
      {
        "en": "Are utilities included?",
        "ru": "Коммунальные услуги включены?",
        "tip": "Не предполагай, что включены в rent."
      },
      {
        "en": "What's the security deposit?",
        "ru": "Какой залог?",
        "tip": "Deposit возвращают по условиям договора."
      },
      {
        "en": "Is the lease month-to-month?",
        "ru": "Договор помесячный?",
        "tip": "Договор может быть на фиксированный срок."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Hi, is the apartment still available?",
        "ru": "Здравствуйте, квартира ещё свободна?"
      },
      {
        "speaker": "Landlord",
        "en": "Yes, the rent is $1,400 a month.",
        "ru": "Да, аренда 1400 долларов в месяц."
      },
      {
        "speaker": "You",
        "en": "Are utilities included? What's the security deposit?",
        "ru": "Коммунальные услуги включены? Какой залог?"
      },
      {
        "speaker": "Landlord",
        "en": "Utilities are separate. The deposit is one month's rent.",
        "ru": "Коммунальные отдельно. Залог — месячная аренда."
      }
    ],
    "practice": {
      "prompt": "Напиши арендодателю и спроси, свободна ли квартира, включены ли коммунальные и какой залог.",
      "model": "Hello, is the apartment still available? Are utilities included in the rent, and how much is the security deposit?",
      "translation": "Здравствуйте, квартира ещё свободна? Коммунальные входят в аренду и каков залог?"
    },
    "questions": [
      {
        "q": "Что ты узнал из фразы Utilities are separate?",
        "choices": [
          "Коммунальные оплачиваются отдельно.",
          "Коммунальные входят в аренду.",
          "Квартира без мебели.",
          "Договор уже подписан."
        ],
        "answer": 0,
        "why": "Separate означает, что платежи за коммунальные услуги не входят в названную аренду."
      },
      {
        "q": "Как сказать по-английски: «Коммунальные услуги включены?»?",
        "choices": [
          "What's the security deposit?",
          "Is the lease month-to-month?",
          "Are utilities included?",
          "Could we get the check?"
        ],
        "answer": 2,
        "why": "Не предполагай, что включены в rent."
      },
      {
        "q": "Что означает выражение «Is the lease month-to-month?»?",
        "choices": [
          "Какой залог?",
          "Коммунальные услуги включены?",
          "Договор помесячный?",
          "Можно нам счёт?"
        ],
        "answer": 2,
        "why": "Договор может быть на фиксированный срок."
      }
    ]
  },
  {
    "category": "america",
    "id": "restaurant",
    "level": "A2",
    "title": "Ресторан и счёт",
    "goal": "Вежливо запросить счёт и уточнить состав блюда",
    "scene": "После ужина ты хочешь оплатить заказ.",
    "culture": "В ресторанах США check — счёт за еду. Tip — чаевые; правила и ожидания зависят от места и сервиса.",
    "phrases": [
      {
        "en": "Could we get the check?",
        "ru": "Можно нам счёт?",
        "tip": "В США естественнее check, чем bill в ресторане."
      },
      {
        "en": "Does it contain nuts?",
        "ru": "В нём есть орехи?",
        "tip": "При аллергии уточняй состав заранее."
      },
      {
        "en": "Can we split the check?",
        "ru": "Можно разделить счёт?",
        "tip": "Уточняет раздельную оплату."
      }
    ],
    "dialogue": [
      {
        "speaker": "Server",
        "en": "How was everything?",
        "ru": "Как вам всё понравилось?"
      },
      {
        "speaker": "You",
        "en": "Great, thanks. Could we get the check?",
        "ru": "Отлично, спасибо. Можно нам счёт?"
      },
      {
        "speaker": "Server",
        "en": "Of course. Together or separate?",
        "ru": "Конечно. Вместе или отдельно?"
      },
      {
        "speaker": "You",
        "en": "Can we split the check?",
        "ru": "Можно разделить счёт?"
      }
    ],
    "practice": {
      "prompt": "Спроси, содержит ли салат орехи, и попроси отдельный счёт.",
      "model": "Does the salad contain nuts? Also, could we split the check, please?",
      "translation": "В салате есть орехи? И можно разделить счёт, пожалуйста?"
    },
    "questions": [
      {
        "q": "Официант спрашивает Together or separate? О чём речь?",
        "choices": [
          "Об одном счёте или раздельной оплате.",
          "О еде с собой.",
          "О количестве столиков.",
          "О выборе напитка."
        ],
        "answer": 0,
        "why": "Together or separate — выбор между общей и раздельной оплатой."
      },
      {
        "q": "Как сказать по-английски: «Можно нам счёт?»?",
        "choices": [
          "Does it contain nuts?",
          "Can we split the check?",
          "Could we get the check?",
          "Are utilities included?"
        ],
        "answer": 2,
        "why": "В США естественнее check, чем bill в ресторане."
      },
      {
        "q": "Что означает выражение «Can we split the check?»?",
        "choices": [
          "В нём есть орехи?",
          "Можно нам счёт?",
          "Можно разделить счёт?",
          "Коммунальные услуги включены?"
        ],
        "answer": 2,
        "why": "Уточняет раздельную оплату."
      }
    ]
  },
  {
    "category": "america",
    "id": "return",
    "level": "A2",
    "title": "Возврат товара",
    "goal": "Объяснить причину возврата без конфликта",
    "scene": "Ты возвращаешь неработающие наушники.",
    "culture": "Правила возврата в США зависят от магазина, срока и вида товара. Лучше уточнить политику магазина, а не требовать гарантированного возврата.",
    "phrases": [
      {
        "en": "I'd like to return this.",
        "ru": "Я хотел(а) бы вернуть это.",
        "tip": "Мягче, чем I want a refund."
      },
      {
        "en": "It doesn't work properly.",
        "ru": "Это работает неправильно.",
        "tip": "Нейтральное описание проблемы."
      },
      {
        "en": "Do I need the receipt?",
        "ru": "Нужен ли чек?",
        "tip": "Receipt — чек о покупке."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Hi, I'd like to return these headphones.",
        "ru": "Здравствуйте, я хотел бы вернуть эти наушники."
      },
      {
        "speaker": "Clerk",
        "en": "Is there something wrong with them?",
        "ru": "С ними что-то не так?"
      },
      {
        "speaker": "You",
        "en": "Yes, they don't work properly. Do I need the receipt?",
        "ru": "Да, они работают неправильно. Нужен ли чек?"
      },
      {
        "speaker": "Clerk",
        "en": "Let me check our return policy.",
        "ru": "Сейчас проверю условия возврата."
      }
    ],
    "practice": {
      "prompt": "Объясни продавцу, что устройство не работает, и спроси о возврате.",
      "model": "Hi, I’d like to return this device. It doesn’t work properly. Could you explain your return policy?",
      "translation": "Здравствуйте, я хотел бы вернуть устройство. Оно работает неправильно. Можете объяснить правила возврата?"
    },
    "questions": [
      {
        "q": "Что обещает продавец фразой Let me check our return policy?",
        "choices": [
          "Проверить правила возврата.",
          "Немедленно вернуть деньги.",
          "Выдать новый товар бесплатно.",
          "Закрыть магазин."
        ],
        "answer": 0,
        "why": "Продавец обещает проверить правила, а не результат возврата."
      },
      {
        "q": "Как сказать по-английски: «Я хотел(а) бы вернуть это.»?",
        "choices": [
          "It doesn't work properly.",
          "Do I need the receipt?",
          "I'd like to return this.",
          "Are utilities included?"
        ],
        "answer": 2,
        "why": "Мягче, чем I want a refund."
      },
      {
        "q": "Что означает выражение «Do I need the receipt?»?",
        "choices": [
          "Это работает неправильно.",
          "Я хотел(а) бы вернуть это.",
          "Нужен ли чек?",
          "Коммунальные услуги включены?"
        ],
        "answer": 2,
        "why": "Receipt — чек о покупке."
      }
    ]
  },
  {
    "category": "america",
    "id": "doctor",
    "level": "A2",
    "title": "Визит к врачу",
    "goal": "Описать симптомы и записаться на приём",
    "scene": "Ты записываешься в клинику, потому что болит горло.",
    "culture": "В США appointment — заранее назначенный приём. При неотложной угрозе здоровью не полагайся на учебный диалог.",
    "phrases": [
      {
        "en": "I'd like to make an appointment.",
        "ru": "Я хотел(а) бы записаться на приём.",
        "tip": "Appointment = запись/приём."
      },
      {
        "en": "I've had a sore throat for two days.",
        "ru": "Горло болит уже два дня.",
        "tip": "Present Perfect для продолжающегося состояния."
      },
      {
        "en": "Is there an earlier opening?",
        "ru": "Есть время пораньше?",
        "tip": "Opening — свободное время в расписании."
      }
    ],
    "dialogue": [
      {
        "speaker": "Receptionist",
        "en": "How can I help you?",
        "ru": "Чем могу помочь?"
      },
      {
        "speaker": "You",
        "en": "I'd like to make an appointment.",
        "ru": "Хочу записаться на приём."
      },
      {
        "speaker": "Receptionist",
        "en": "What's going on?",
        "ru": "Что вас беспокоит?"
      },
      {
        "speaker": "You",
        "en": "I've had a sore throat for two days.",
        "ru": "У меня уже два дня болит горло."
      }
    ],
    "practice": {
      "prompt": "Попроси записать тебя на приём и объясни, что у тебя кашель уже три дня.",
      "model": "Hello, I’d like to make an appointment. I’ve had a cough for three days.",
      "translation": "Здравствуйте, хочу записаться на приём. У меня уже три дня кашель."
    },
    "questions": [
      {
        "q": "Что означает for two days в описании симптомов?",
        "choices": [
          "Симптом продолжается два дня.",
          "Симптом начнётся через два дня.",
          "Запись через два месяца.",
          "Симптом бывает дважды в день."
        ],
        "answer": 0,
        "why": "For + период показывает длительность состояния."
      },
      {
        "q": "Как сказать по-английски: «Я хотел(а) бы записаться на приём.»?",
        "choices": [
          "I've had a sore throat for two days.",
          "Is there an earlier opening?",
          "I'd like to make an appointment.",
          "Are utilities included?"
        ],
        "answer": 2,
        "why": "Appointment = запись/приём."
      },
      {
        "q": "Что означает выражение «Is there an earlier opening?»?",
        "choices": [
          "Горло болит уже два дня.",
          "Я хотел(а) бы записаться на приём.",
          "Есть время пораньше?",
          "Коммунальные услуги включены?"
        ],
        "answer": 2,
        "why": "Opening — свободное время в расписании."
      }
    ]
  },
  {
    "category": "america",
    "id": "bank",
    "level": "B1",
    "title": "Банковский счёт и комиссии",
    "goal": "Выяснить комиссии без передачи секретных данных",
    "scene": "Ты сравниваешь условия банковского счёта.",
    "culture": "Банковские тарифы различаются. Никогда не сообщай сотруднику через случайный чат PIN, пароль или код подтверждения.",
    "phrases": [
      {
        "en": "Is there a monthly maintenance fee?",
        "ru": "Есть ежемесячная комиссия?",
        "tip": "Maintenance fee — плата за обслуживание."
      },
      {
        "en": "Can the fee be waived?",
        "ru": "Можно отменить комиссию при условиях?",
        "tip": "Waive = отменить взимание."
      },
      {
        "en": "What are the withdrawal limits?",
        "ru": "Какие лимиты снятия?",
        "tip": "Withdrawal — снятие денег."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Is there a monthly maintenance fee?",
        "ru": "Есть комиссия за ежемесячное обслуживание?"
      },
      {
        "speaker": "Banker",
        "en": "Yes, but it may be waived with direct deposit.",
        "ru": "Да, но её могут отменить при прямом зачислении зарплаты."
      },
      {
        "speaker": "You",
        "en": "What are the withdrawal limits?",
        "ru": "Какие лимиты на снятие денег?"
      },
      {
        "speaker": "Banker",
        "en": "Let me show you the account terms.",
        "ru": "Покажу вам условия счёта."
      }
    ],
    "practice": {
      "prompt": "Спроси у сотрудника банка про месячную комиссию и лимиты снятия.",
      "model": "Could you tell me whether there is a monthly maintenance fee and what the withdrawal limits are?",
      "translation": "Подскажите, есть ли ежемесячная комиссия и какие лимиты снятия денег?"
    },
    "questions": [
      {
        "q": "Что означает fee may be waived with direct deposit?",
        "choices": [
          "Комиссию могут отменить при соблюдении условия.",
          "Комиссию обязательно удвоят.",
          "Счёт откроется автоматически.",
          "Снятие денег запрещено."
        ],
        "answer": 0,
        "why": "May be waived = может не взиматься при определённом условии."
      },
      {
        "q": "Как сказать по-английски: «Есть ежемесячная комиссия?»?",
        "choices": [
          "Can the fee be waived?",
          "What are the withdrawal limits?",
          "Is there a monthly maintenance fee?",
          "How was your weekend?"
        ],
        "answer": 2,
        "why": "Maintenance fee — плата за обслуживание."
      },
      {
        "q": "Что означает выражение «What are the withdrawal limits?»?",
        "choices": [
          "Можно отменить комиссию при условиях?",
          "Есть ежемесячная комиссия?",
          "Какие лимиты снятия?",
          "Как прошли выходные?"
        ],
        "answer": 2,
        "why": "Withdrawal — снятие денег."
      }
    ]
  },
  {
    "category": "america",
    "id": "job-talk",
    "level": "B1",
    "title": "Разговор с коллегами",
    "goal": "Поддержать естественный рабочий small talk",
    "scene": "Коллега спрашивает о выходных.",
    "culture": "В американском офисе дружелюбный small talk полезен, но делиться личными подробностями не обязательно.",
    "phrases": [
      {
        "en": "How was your weekend?",
        "ru": "Как прошли выходные?",
        "tip": "Типичный нейтральный вопрос."
      },
      {
        "en": "I just took it easy.",
        "ru": "Я просто отдыхал(а).",
        "tip": "Разговорное выражение о спокойном отдыхе."
      },
      {
        "en": "That sounds nice.",
        "ru": "Звучит здорово.",
        "tip": "Поддерживает беседу."
      }
    ],
    "dialogue": [
      {
        "speaker": "Colleague",
        "en": "Hey, how was your weekend?",
        "ru": "Привет, как прошли выходные?"
      },
      {
        "speaker": "You",
        "en": "Pretty good. I just took it easy.",
        "ru": "Неплохо. Просто отдыхал."
      },
      {
        "speaker": "Colleague",
        "en": "That sounds nice. I went hiking.",
        "ru": "Здорово. А я ходил в поход."
      },
      {
        "speaker": "You",
        "en": "Oh, where did you go?",
        "ru": "О, куда ходил?"
      }
    ],
    "practice": {
      "prompt": "Ответь коллеге, что выходные прошли спокойно, и спроси про его выходные.",
      "model": "It was pretty relaxing. I just took it easy. How about you?",
      "translation": "Было довольно спокойно. Просто отдыхал. А у тебя?"
    },
    "questions": [
      {
        "q": "Как продолжить small talk после рассказа коллеги о походе?",
        "choices": [
          "Спросить, куда он ходил.",
          "Потребовать отчёт о расходах.",
          "Молча сменить тему.",
          "Сказать, что его выходные не важны."
        ],
        "answer": 0,
        "why": "Нейтральный открытый вопрос помогает поддержать беседу."
      },
      {
        "q": "Как сказать по-английски: «Как прошли выходные?»?",
        "choices": [
          "I just took it easy.",
          "That sounds nice.",
          "How was your weekend?",
          "Is there a monthly maintenance fee?"
        ],
        "answer": 2,
        "why": "Типичный нейтральный вопрос."
      },
      {
        "q": "Что означает выражение «That sounds nice.»?",
        "choices": [
          "Я просто отдыхал(а).",
          "Как прошли выходные?",
          "Звучит здорово.",
          "Есть ежемесячная комиссия?"
        ],
        "answer": 2,
        "why": "Поддерживает беседу."
      }
    ]
  },
  {
    "category": "america",
    "id": "appointments",
    "level": "B1",
    "title": "Перенос встречи",
    "goal": "Вежливо перенести назначенное время",
    "scene": "У тебя встреча с менеджером квартиры, но ты опаздываешь.",
    "culture": "Нейтральная формулировка Sorry for the short notice уместна, когда предупреждаешь незадолго до события.",
    "phrases": [
      {
        "en": "Could we reschedule?",
        "ru": "Можем перенести встречу?",
        "tip": "Reschedule = назначить другое время."
      },
      {
        "en": "I'm running late.",
        "ru": "Я опаздываю.",
        "tip": "Разговорная формула."
      },
      {
        "en": "Sorry for the short notice.",
        "ru": "Простите за позднее предупреждение.",
        "tip": "Вежливое извинение."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Hi, I'm running late because of traffic.",
        "ru": "Здравствуйте, опаздываю из-за пробок."
      },
      {
        "speaker": "Manager",
        "en": "How late do you expect to be?",
        "ru": "Насколько вы задержитесь?"
      },
      {
        "speaker": "You",
        "en": "About 20 minutes. Could we reschedule?",
        "ru": "Минут на двадцать. Можем перенести встречу?"
      },
      {
        "speaker": "Manager",
        "en": "Sure, how about 3 p.m.?",
        "ru": "Конечно, как насчёт 15:00?"
      }
    ],
    "practice": {
      "prompt": "Напиши короткое сообщение, что опаздываешь на 15 минут, и предложи перенести встречу.",
      "model": "I’m running about 15 minutes late. Sorry for the short notice. Could we reschedule for 3:30?",
      "translation": "Я опаздываю примерно на 15 минут. Простите за позднее предупреждение. Можем перенести на 15:30?"
    },
    "questions": [
      {
        "q": "Что лучше сделать, если понимаешь, что опаздываешь?",
        "choices": [
          "Предупредить и предложить новое время.",
          "Не отвечать на сообщения.",
          "Потребовать ждать сколько нужно.",
          "Отменить без объяснения."
        ],
        "answer": 0,
        "why": "Своевременное предупреждение с альтернативой — вежливая практика."
      },
      {
        "q": "Как сказать по-английски: «Можем перенести встречу?»?",
        "choices": [
          "I'm running late.",
          "Sorry for the short notice.",
          "Could we reschedule?",
          "Is there a monthly maintenance fee?"
        ],
        "answer": 2,
        "why": "Reschedule = назначить другое время."
      },
      {
        "q": "Что означает выражение «Sorry for the short notice.»?",
        "choices": [
          "Я опаздываю.",
          "Можем перенести встречу?",
          "Простите за позднее предупреждение.",
          "Есть ежемесячная комиссия?"
        ],
        "answer": 2,
        "why": "Вежливое извинение."
      }
    ]
  },
  {
    "category": "america",
    "id": "transport",
    "level": "B1",
    "title": "Транспорт и пересадки",
    "goal": "Уточнить маршрут и время пересадки",
    "scene": "Ты едешь из аэропорта в центр на общественном транспорте.",
    "culture": "Transfer может означать пересадку между линиями. Fare — стоимость проезда.",
    "phrases": [
      {
        "en": "Do I need to transfer?",
        "ru": "Мне нужно делать пересадку?",
        "tip": "Transfer = пересесть."
      },
      {
        "en": "How often does it run?",
        "ru": "Как часто он ходит?",
        "tip": "Run о транспорте означает ходить по маршруту."
      },
      {
        "en": "What's the fare?",
        "ru": "Сколько стоит проезд?",
        "tip": "Fare = стоимость поездки."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Does this train go downtown?",
        "ru": "Этот поезд идёт в центр?"
      },
      {
        "speaker": "Staff",
        "en": "Yes, but you'll need to transfer at Central Station.",
        "ru": "Да, но нужно пересесть на Центральной станции."
      },
      {
        "speaker": "You",
        "en": "How often does the next train run?",
        "ru": "Как часто ходит следующий поезд?"
      },
      {
        "speaker": "Staff",
        "en": "Every fifteen minutes.",
        "ru": "Каждые пятнадцать минут."
      }
    ],
    "practice": {
      "prompt": "Уточни, идёт ли автобус в центр, нужна ли пересадка и сколько стоит билет.",
      "model": "Does this bus go downtown? Will I need to transfer, and what is the fare?",
      "translation": "Этот автобус едет в центр? Нужна ли пересадка и сколько стоит проезд?"
    },
    "questions": [
      {
        "q": "Что нужно сделать на Central Station?",
        "choices": [
          "Пересесть на другую линию.",
          "Выйти из аэропорта пешком.",
          "Купить билет на самолёт.",
          "Вернуться домой."
        ],
        "answer": 0,
        "why": "Need to transfer означает, что требуется пересадка."
      },
      {
        "q": "Как сказать по-английски: «Мне нужно делать пересадку?»?",
        "choices": [
          "How often does it run?",
          "What's the fare?",
          "Do I need to transfer?",
          "Is there a monthly maintenance fee?"
        ],
        "answer": 2,
        "why": "Transfer = пересесть."
      },
      {
        "q": "Что означает выражение «What's the fare?»?",
        "choices": [
          "Как часто он ходит?",
          "Мне нужно делать пересадку?",
          "Сколько стоит проезд?",
          "Есть ежемесячная комиссия?"
        ],
        "answer": 2,
        "why": "Fare = стоимость поездки."
      }
    ]
  },
  {
    "category": "america",
    "id": "slang",
    "level": "B2",
    "title": "Американские разговорные выражения",
    "goal": "Уместно использовать распространённый casual English",
    "scene": "Друг предлагает сходить в кино.",
    "culture": "I’m down уместно в неформальной речи («я за»), но не подходит для официального письма работодателю.",
    "phrases": [
      {
        "en": "I'm down.",
        "ru": "Я за / Я согласен.",
        "tip": "Неформальное согласие."
      },
      {
        "en": "That works for me.",
        "ru": "Мне подходит.",
        "tip": "Нейтрально для планов."
      },
      {
        "en": "Let's play it by ear.",
        "ru": "Решим по обстоятельствам.",
        "tip": "Не планировать всё жёстко."
      }
    ],
    "dialogue": [
      {
        "speaker": "Friend",
        "en": "Want to grab dinner on Friday?",
        "ru": "Хочешь поужинать в пятницу?"
      },
      {
        "speaker": "You",
        "en": "I'm down! What time?",
        "ru": "Я за! Во сколько?"
      },
      {
        "speaker": "Friend",
        "en": "Maybe seven, but let's play it by ear.",
        "ru": "Может, в семь, но решим по обстоятельствам."
      },
      {
        "speaker": "You",
        "en": "Sounds good.",
        "ru": "Отлично."
      }
    ],
    "practice": {
      "prompt": "Согласись на неформальную встречу и предложи решить точное время позднее.",
      "model": "I’m down! Saturday works for me. Let’s play it by ear on the exact time.",
      "translation": "Я за! Суббота подходит. Точное время решим по обстоятельствам."
    },
    "questions": [
      {
        "q": "В каком контексте I’m down естественнее всего?",
        "choices": [
          "В переписке с друзьями.",
          "В официальном уведомлении о нарушении закона.",
          "В медицинском диагнозе.",
          "В юридическом договоре."
        ],
        "answer": 0,
        "why": "I’m down — разговорное выражение, а не формальный деловой стиль."
      },
      {
        "q": "Как сказать по-английски: «Я за / Я согласен.»?",
        "choices": [
          "That works for me.",
          "Let's play it by ear.",
          "I'm down.",
          "I appreciate your help."
        ],
        "answer": 2,
        "why": "Неформальное согласие."
      },
      {
        "q": "Что означает выражение «Let's play it by ear.»?",
        "choices": [
          "Мне подходит.",
          "Я за / Я согласен.",
          "Решим по обстоятельствам.",
          "Благодарю за помощь."
        ],
        "answer": 2,
        "why": "Не планировать всё жёстко."
      }
    ]
  },
  {
    "category": "america",
    "id": "complaint",
    "level": "B2",
    "title": "Спокойное решение конфликта",
    "goal": "Вежливо объяснить проблему и предложить выход",
    "scene": "Ты получил повреждённый товар по доставке.",
    "culture": "Вежливость не означает отказ от своих прав. Объясни факты, спроси о возможных решениях и зафиксируй детали.",
    "phrases": [
      {
        "en": "I appreciate your help.",
        "ru": "Благодарю за помощь.",
        "tip": "Поддерживает нейтральный тон."
      },
      {
        "en": "This wasn't what I expected.",
        "ru": "Это не то, чего я ожидал.",
        "tip": "Мягкая формулировка недовольства."
      },
      {
        "en": "What options are available?",
        "ru": "Какие есть варианты решения?",
        "tip": "Не предполагает заранее определённый результат."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "The package arrived damaged, and this wasn't what I expected.",
        "ru": "Посылка пришла повреждённой, это не то, чего я ожидал."
      },
      {
        "speaker": "Agent",
        "en": "I'm sorry to hear that. Could you describe the damage?",
        "ru": "Мне жаль. Можете описать повреждение?"
      },
      {
        "speaker": "You",
        "en": "The screen is cracked. What options are available?",
        "ru": "Экран треснул. Какие есть варианты решения?"
      },
      {
        "speaker": "Agent",
        "en": "Let me review your order and the policy.",
        "ru": "Проверю заказ и условия."
      }
    ],
    "practice": {
      "prompt": "Напиши о повреждённом товаре с вежливым запросом вариантов решения.",
      "model": "My order arrived damaged, and the screen is cracked. I appreciate your help. Could you let me know what options are available?",
      "translation": "Заказ пришёл повреждённым, экран треснул. Спасибо за помощь. Подскажите, какие есть варианты решения?"
    },
    "questions": [
      {
        "q": "Почему What options are available? полезно при жалобе?",
        "choices": [
          "Позволяет узнать возможные решения без преждевременных требований.",
          "Гарантирует полный возврат.",
          "Даёт право не описывать проблему.",
          "Заменяет проверку заказа."
        ],
        "answer": 0,
        "why": "Вопрос запрашивает доступные варианты, не гарантируя исход."
      },
      {
        "q": "Как сказать по-английски: «Благодарю за помощь.»?",
        "choices": [
          "This wasn't what I expected.",
          "What options are available?",
          "I appreciate your help.",
          "I'm down."
        ],
        "answer": 2,
        "why": "Поддерживает нейтральный тон."
      },
      {
        "q": "Что означает выражение «What options are available?»?",
        "choices": [
          "Это не то, чего я ожидал.",
          "Благодарю за помощь.",
          "Какие есть варианты решения?",
          "Я за / Я согласен."
        ],
        "answer": 2,
        "why": "Не предполагает заранее определённый результат."
      }
    ]
  },
  {
    "category": "america",
    "id": "housing",
    "level": "B2",
    "title": "Проблема с арендой",
    "goal": "Сообщить о неисправности и согласовать ремонт",
    "scene": "В квартире перестало работать отопление.",
    "culture": "Нужно сообщить о проблеме фактически, указать серьёзность и попросить сроки ответа. Реальные обязанности сторон зависят от местного права и договора.",
    "phrases": [
      {
        "en": "The heating has stopped working.",
        "ru": "Отопление перестало работать.",
        "tip": "Present Perfect с актуальным результатом."
      },
      {
        "en": "Could you arrange a repair?",
        "ru": "Могли бы организовать ремонт?",
        "tip": "Вежливая просьба."
      },
      {
        "en": "What's the expected timeline?",
        "ru": "Какие ожидаются сроки?",
        "tip": "Запрос оценочных сроков."
      }
    ],
    "dialogue": [
      {
        "speaker": "Tenant",
        "en": "The heating stopped working last night.",
        "ru": "Отопление не работает со вчерашнего вечера."
      },
      {
        "speaker": "Manager",
        "en": "Thanks for letting me know. I'll contact maintenance.",
        "ru": "Спасибо за сообщение. Свяжусь со службой ремонта."
      },
      {
        "speaker": "Tenant",
        "en": "Could you arrange a repair as soon as possible?",
        "ru": "Можете организовать ремонт как можно скорее?"
      },
      {
        "speaker": "Manager",
        "en": "I'll update you once I have a timeline.",
        "ru": "Сообщу, когда узнаю сроки."
      }
    ],
    "practice": {
      "prompt": "Составь сообщение арендодателю о проблеме с отоплением и попроси приблизительный срок ремонта.",
      "model": "Hello, the heating stopped working last night. Could you arrange a repair and let me know the expected timeline? Thank you.",
      "translation": "Здравствуйте, отопление не работает со вчерашней ночи. Можете организовать ремонт и сообщить примерные сроки? Спасибо."
    },
    "questions": [
      {
        "q": "Что менеджер обещает в ответе I’ll update you once I have a timeline?",
        "choices": [
          "Сообщить сроки, когда они станут известны.",
          "Отремонтировать всё за час.",
          "Вернуть аренду в полном объёме.",
          "Игнорировать заявку."
        ],
        "answer": 0,
        "why": "Он обещает обновление информации, а не конкретную дату или компенсацию."
      },
      {
        "q": "Как сказать по-английски: «Отопление перестало работать.»?",
        "choices": [
          "Could you arrange a repair?",
          "What's the expected timeline?",
          "The heating has stopped working.",
          "I'm down."
        ],
        "answer": 2,
        "why": "Present Perfect с актуальным результатом."
      },
      {
        "q": "Что означает выражение «What's the expected timeline?»?",
        "choices": [
          "Могли бы организовать ремонт?",
          "Отопление перестало работать.",
          "Какие ожидаются сроки?",
          "Я за / Я согласен."
        ],
        "answer": 2,
        "why": "Запрос оценочных сроков."
      }
    ]
  },
  {
    "category": "america",
    "id": "idioms",
    "level": "B2",
    "title": "Идиомы и подтекст",
    "goal": "Понять разговорные фразы без дословного перевода",
    "scene": "Коллеги обсуждают сложную неделю и планы.",
    "culture": "Идиомы часто означают не то же самое, что сумма слов. В официальном письме лучше выбирать более прямые формулировки.",
    "phrases": [
      {
        "en": "Let's call it a day.",
        "ru": "На сегодня закончим.",
        "tip": "Завершение работы."
      },
      {
        "en": "I'm swamped.",
        "ru": "Я по уши в делах.",
        "tip": "Неформальное описание загруженности."
      },
      {
        "en": "Keep me in the loop.",
        "ru": "Держи меня в курсе.",
        "tip": "Можно в рабочем чате."
      }
    ],
    "dialogue": [
      {
        "speaker": "Colleague",
        "en": "I'm swamped with requests today.",
        "ru": "Сегодня я завален заявками."
      },
      {
        "speaker": "You",
        "en": "Same here. Let's call it a day after this one.",
        "ru": "Я тоже. Давай закончим после этой."
      },
      {
        "speaker": "Colleague",
        "en": "Sure. Keep me in the loop about tomorrow.",
        "ru": "Хорошо. Держи меня в курсе насчёт завтра."
      },
      {
        "speaker": "You",
        "en": "Will do.",
        "ru": "Сделаю."
      }
    ],
    "practice": {
      "prompt": "Напиши коллеге, что загружен и просишь держать тебя в курсе.",
      "model": "I’m pretty swamped today, but I’ll check the updates later. Please keep me in the loop.",
      "translation": "Сегодня я очень занят, но позже проверю обновления. Держи меня в курсе."
    },
    "questions": [
      {
        "q": "Коллега пишет I’m swamped. Что это значит?",
        "choices": [
          "У него очень много дел.",
          "Он в отпуске.",
          "Его компьютер сломан.",
          "Он уже закончил рабочий день."
        ],
        "answer": 0,
        "why": "Swamped — «очень занят, завален делами», а не буквальное описание воды."
      },
      {
        "q": "Как сказать по-английски: «На сегодня закончим.»?",
        "choices": [
          "I'm swamped.",
          "Keep me in the loop.",
          "Let's call it a day.",
          "I'm down."
        ],
        "answer": 2,
        "why": "Завершение работы."
      },
      {
        "q": "Что означает выражение «Keep me in the loop.»?",
        "choices": [
          "Я по уши в делах.",
          "На сегодня закончим.",
          "Держи меня в курсе.",
          "Я за / Я согласен."
        ],
        "answer": 2,
        "why": "Можно в рабочем чате."
      }
    ]
  },
  {
    "category": "work",
    "id": "support-greeting",
    "level": "A1",
    "title": "Первое сообщение клиенту",
    "goal": "Открыть чат вежливо и ясно",
    "scene": "Клиент только что открыл чат поддержки.",
    "culture": "В поддержке лучше простые, понятные фразы без обещаний результата.",
    "phrases": [
      {
        "en": "How can I help you today?",
        "ru": "Чем могу помочь сегодня?",
        "tip": "Открывает обращение."
      },
      {
        "en": "Thanks for reaching out.",
        "ru": "Спасибо, что написали.",
        "tip": "Вежливое начало переписки."
      },
      {
        "en": "Let me check that for you.",
        "ru": "Позвольте это проверить.",
        "tip": "Не обещает исход."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Hi, I have a question about my payment.",
        "ru": "Здравствуйте, у меня вопрос по платежу."
      },
      {
        "speaker": "Agent",
        "en": "Thanks for reaching out. How can I help you today?",
        "ru": "Спасибо, что написали. Чем могу помочь?"
      },
      {
        "speaker": "Customer",
        "en": "The payment is still pending.",
        "ru": "Платёж всё ещё в обработке."
      },
      {
        "speaker": "Agent",
        "en": "Let me check that for you.",
        "ru": "Позвольте это проверить."
      }
    ],
    "practice": {
      "prompt": "Поздоровайся, поблагодари клиента и предложи помощь.",
      "model": "Hello! Thanks for reaching out. How can I help you today?",
      "translation": "Здравствуйте! Спасибо, что написали. Чем могу помочь?"
    },
    "questions": [
      {
        "q": "Как лучше начать первый ответ в чате?",
        "choices": [
          "Thanks for reaching out. How can I help?",
          "Stop messaging us.",
          "You must be wrong.",
          "Give me your password."
        ],
        "answer": 0,
        "why": "Вежливое приветствие и предложение помощи — стандартный старт."
      },
      {
        "q": "Как сказать по-английски: «Чем могу помочь сегодня?»?",
        "choices": [
          "Thanks for reaching out.",
          "Let me check that for you.",
          "How can I help you today?",
          "Could you explain what happened?"
        ],
        "answer": 2,
        "why": "Открывает обращение."
      },
      {
        "q": "Что означает выражение «Let me check that for you.»?",
        "choices": [
          "Спасибо, что написали.",
          "Чем могу помочь сегодня?",
          "Позвольте это проверить.",
          "Можете объяснить, что произошло?"
        ],
        "answer": 2,
        "why": "Не обещает исход."
      }
    ]
  },
  {
    "category": "work",
    "id": "clarify",
    "level": "A1",
    "title": "Уточняющий вопрос",
    "goal": "Уточнить детали без раскрытия секретов",
    "scene": "Клиент описал ошибку очень кратко.",
    "culture": "Нельзя запрашивать пароли, CVV или одноразовые коды. Для учебной ситуации используй вымышленные данные.",
    "phrases": [
      {
        "en": "Could you explain what happened?",
        "ru": "Можете объяснить, что произошло?",
        "tip": "Открытый вопрос."
      },
      {
        "en": "What error do you see?",
        "ru": "Какую ошибку вы видите?",
        "tip": "Уточняет сообщение интерфейса."
      },
      {
        "en": "Thank you for the details.",
        "ru": "Спасибо за подробности.",
        "tip": "Подтверждает получение информации."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "It doesn't work.",
        "ru": "Не работает."
      },
      {
        "speaker": "Agent",
        "en": "Sorry to hear that. What error do you see?",
        "ru": "Сожалею. Какую ошибку вы видите?"
      },
      {
        "speaker": "Customer",
        "en": "It says Payment failed.",
        "ru": "Пишет «Платёж не выполнен»."
      },
      {
        "speaker": "Agent",
        "en": "Thank you for the details.",
        "ru": "Спасибо за подробности."
      }
    ],
    "practice": {
      "prompt": "Попроси клиента описать ошибку на экране.",
      "model": "Could you please tell me what error message you see on your screen?",
      "translation": "Не могли бы вы уточнить, какую ошибку видите на экране?"
    },
    "questions": [
      {
        "q": "Клиент пишет It doesn’t work. Что лучше спросить?",
        "choices": [
          "What error do you see?",
          "What is your account password?",
          "Can you send your PIN?",
          "Why are you angry?"
        ],
        "answer": 0,
        "why": "Нужен уточняющий вопрос, а не запрос секрета."
      },
      {
        "q": "Как сказать по-английски: «Можете объяснить, что произошло?»?",
        "choices": [
          "What error do you see?",
          "Thank you for the details.",
          "Could you explain what happened?",
          "How can I help you today?"
        ],
        "answer": 2,
        "why": "Открытый вопрос."
      },
      {
        "q": "Что означает выражение «Thank you for the details.»?",
        "choices": [
          "Какую ошибку вы видите?",
          "Можете объяснить, что произошло?",
          "Спасибо за подробности.",
          "Чем могу помочь сегодня?"
        ],
        "answer": 2,
        "why": "Подтверждает получение информации."
      }
    ]
  },
  {
    "category": "work",
    "id": "status",
    "level": "A1",
    "title": "Статус платежа",
    "goal": "Объяснить базовые статусы транзакции",
    "scene": "Клиент хочет узнать, прошёл ли платёж.",
    "culture": "Pending — статус обработки, не обещание успеха. Failed — неуспешная попытка, completed — завершённая операция в конкретной системе.",
    "phrases": [
      {
        "en": "The payment is pending.",
        "ru": "Платёж обрабатывается.",
        "tip": "Не равно completed."
      },
      {
        "en": "The payment failed.",
        "ru": "Платёж не прошёл.",
        "tip": "Нужна проверка причины."
      },
      {
        "en": "The payment was completed.",
        "ru": "Платёж завершён.",
        "tip": "Только при подтверждённом статусе."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Did my payment go through?",
        "ru": "Мой платёж прошёл?"
      },
      {
        "speaker": "Agent",
        "en": "The status is still pending.",
        "ru": "Статус пока «в обработке»."
      },
      {
        "speaker": "Customer",
        "en": "Does that mean it failed?",
        "ru": "Это значит, что он не прошёл?"
      },
      {
        "speaker": "Agent",
        "en": "Not necessarily. I'll check the details.",
        "ru": "Не обязательно. Я проверю детали."
      }
    ],
    "practice": {
      "prompt": "Объясни, что платёж в обработке и ты уточнишь детали.",
      "model": "Your payment is currently pending. That doesn’t necessarily mean it failed. Let me check the details.",
      "translation": "Ваш платёж сейчас обрабатывается. Это не обязательно означает ошибку. Проверю детали."
    },
    "questions": [
      {
        "q": "Статус pending — это…",
        "choices": [
          "Обработка ещё не завершена.",
          "Гарантированный возврат.",
          "Подтверждение мошенничества.",
          "Точно завершённый платёж."
        ],
        "answer": 0,
        "why": "Pending означает незавершённую обработку, а не итоговый результат."
      },
      {
        "q": "Как сказать по-английски: «Платёж обрабатывается.»?",
        "choices": [
          "The payment failed.",
          "The payment was completed.",
          "The payment is pending.",
          "How can I help you today?"
        ],
        "answer": 2,
        "why": "Не равно completed."
      },
      {
        "q": "Что означает выражение «The payment was completed.»?",
        "choices": [
          "Платёж не прошёл.",
          "Платёж обрабатывается.",
          "Платёж завершён.",
          "Чем могу помочь сегодня?"
        ],
        "answer": 2,
        "why": "Только при подтверждённом статусе."
      }
    ]
  },
  {
    "category": "work",
    "id": "handoff",
    "level": "A1",
    "title": "Передача обращения",
    "goal": "Правильно сообщить о передаче кейса",
    "scene": "Нужна помощь другой команды.",
    "culture": "Не обещай точного времени, если его ещё не согласовали с другой командой.",
    "phrases": [
      {
        "en": "I'll forward your request.",
        "ru": "Я передам ваш запрос.",
        "tip": "Forward = переслать."
      },
      {
        "en": "Our team will review it.",
        "ru": "Наша команда проверит это.",
        "tip": "Review = рассмотреть."
      },
      {
        "en": "I'll keep you updated.",
        "ru": "Я буду держать вас в курсе.",
        "tip": "Обновления без сроков."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Can you fix this right now?",
        "ru": "Можете исправить это сейчас?"
      },
      {
        "speaker": "Agent",
        "en": "I'll forward your request to our payments team.",
        "ru": "Передам запрос платёжной команде."
      },
      {
        "speaker": "Customer",
        "en": "How long will it take?",
        "ru": "Сколько это займёт?"
      },
      {
        "speaker": "Agent",
        "en": "I don't have an exact timeline yet, but I'll keep you updated.",
        "ru": "Точного срока пока нет, но я буду держать вас в курсе."
      }
    ],
    "practice": {
      "prompt": "Объясни, что передаёшь запрос команде платежей и сообщишь новости.",
      "model": "I’ll forward your request to our payments team and keep you updated.",
      "translation": "Передам запрос платёжной команде и буду держать вас в курсе."
    },
    "questions": [
      {
        "q": "Если срок решения неизвестен, какая формулировка корректна?",
        "choices": [
          "I don’t have an exact timeline yet.",
          "It will be fixed in two minutes.",
          "We never make mistakes.",
          "You should stop asking."
        ],
        "answer": 0,
        "why": "Нельзя придумывать сроки, которых нет."
      },
      {
        "q": "Как сказать по-английски: «Я передам ваш запрос.»?",
        "choices": [
          "Our team will review it.",
          "I'll keep you updated.",
          "I'll forward your request.",
          "How can I help you today?"
        ],
        "answer": 2,
        "why": "Forward = переслать."
      },
      {
        "q": "Что означает выражение «I'll keep you updated.»?",
        "choices": [
          "Наша команда проверит это.",
          "Я передам ваш запрос.",
          "Я буду держать вас в курсе.",
          "Чем могу помочь сегодня?"
        ],
        "answer": 2,
        "why": "Обновления без сроков."
      }
    ]
  },
  {
    "category": "work",
    "id": "refunds",
    "level": "A2",
    "title": "Возвраты средств",
    "goal": "Объяснить этапы возврата без обещания срока",
    "scene": "Клиент спрашивает о возврате после отмены заказа.",
    "culture": "Refund requested не всегда означает refund processed. Время зачисления зависит от провайдера и способа оплаты.",
    "phrases": [
      {
        "en": "Your refund request is under review.",
        "ru": "Запрос на возврат рассматривается.",
        "tip": "Не означает подтверждение."
      },
      {
        "en": "The refund has been processed.",
        "ru": "Возврат обработан.",
        "tip": "Не равно зачислению на карту."
      },
      {
        "en": "The arrival time may vary.",
        "ru": "Срок поступления может отличаться.",
        "tip": "Зависит от метода."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "I canceled my order. Where is my refund?",
        "ru": "Я отменил заказ. Где возврат?"
      },
      {
        "speaker": "Agent",
        "en": "I can see that your refund request is under review.",
        "ru": "Вижу, что запрос рассматривается."
      },
      {
        "speaker": "Customer",
        "en": "When will I receive the money?",
        "ru": "Когда придут деньги?"
      },
      {
        "speaker": "Agent",
        "en": "The arrival time may vary depending on the payment provider.",
        "ru": "Срок зависит от платёжного провайдера."
      }
    ],
    "practice": {
      "prompt": "Ответь клиенту, что запрос на возврат рассматривается, а сроки могут зависеть от провайдера.",
      "model": "Your refund request is currently under review. The arrival time may vary depending on the payment provider.",
      "translation": "Запрос на возврат рассматривается. Срок зачисления зависит от платёжного провайдера."
    },
    "questions": [
      {
        "q": "Что важнее указать клиенту, если возврат ещё рассматривается?",
        "choices": [
          "Текущий подтверждённый статус.",
          "Точный срок без проверки.",
          "Гарантию мгновенного возврата.",
          "Предположение, что виноват банк."
        ],
        "answer": 0,
        "why": "Сообщай только подтверждённый статус и избегай гарантий без данных."
      },
      {
        "q": "Как сказать по-английски: «Запрос на возврат рассматривается.»?",
        "choices": [
          "The refund has been processed.",
          "The arrival time may vary.",
          "Your refund request is under review.",
          "Could you share the transaction ID?"
        ],
        "answer": 2,
        "why": "Не означает подтверждение."
      },
      {
        "q": "Что означает выражение «The arrival time may vary.»?",
        "choices": [
          "Возврат обработан.",
          "Запрос на возврат рассматривается.",
          "Срок поступления может отличаться.",
          "Можете сообщить ID транзакции?"
        ],
        "answer": 2,
        "why": "Зависит от метода."
      }
    ]
  },
  {
    "category": "work",
    "id": "transaction-id",
    "level": "A2",
    "title": "Поиск транзакции",
    "goal": "Запросить безопасный идентификатор операции",
    "scene": "Клиент говорит, что перевод не пришёл.",
    "culture": "Transaction ID безопаснее запрашивать в проверенном защищённом канале поддержки; никогда не проси полный номер карты или CVV.",
    "phrases": [
      {
        "en": "Could you share the transaction ID?",
        "ru": "Можете сообщить ID транзакции?",
        "tip": "Идентификатор, не пароль."
      },
      {
        "en": "I'll look into this.",
        "ru": "Я разберусь в ситуации.",
        "tip": "Обещание проверить, не исправить."
      },
      {
        "en": "I need to verify the status.",
        "ru": "Мне нужно проверить статус.",
        "tip": "Объясняет действие."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "My transfer hasn't arrived.",
        "ru": "Перевод не поступил."
      },
      {
        "speaker": "Agent",
        "en": "Could you share the transaction ID through this secure support channel?",
        "ru": "Можете сообщить ID операции через этот защищённый канал поддержки?"
      },
      {
        "speaker": "Customer",
        "en": "Sure, it's TX-1234.",
        "ru": "Конечно, TX-1234."
      },
      {
        "speaker": "Agent",
        "en": "Thanks. I'll look into this and verify the status.",
        "ru": "Спасибо. Проверю детали и статус."
      }
    ],
    "practice": {
      "prompt": "Попроси безопасный ID операции в официальном канале и пообещай проверить статус.",
      "model": "Could you share your transaction ID through our secure support channel? I’ll verify the status for you.",
      "translation": "Можете сообщить ID операции через защищённый канал? Я проверю статус."
    },
    "questions": [
      {
        "q": "Какие данные нельзя просить в обычном чате поддержки?",
        "choices": [
          "PIN и CVV карты.",
          "Учебный ID транзакции.",
          "Описание ошибки.",
          "Время операции."
        ],
        "answer": 0,
        "why": "PIN и CVV — секретные данные; не запрашивай их в переписке."
      },
      {
        "q": "Как сказать по-английски: «Можете сообщить ID транзакции?»?",
        "choices": [
          "I'll look into this.",
          "I need to verify the status.",
          "Could you share the transaction ID?",
          "Your refund request is under review."
        ],
        "answer": 2,
        "why": "Идентификатор, не пароль."
      },
      {
        "q": "Что означает выражение «I need to verify the status.»?",
        "choices": [
          "Я разберусь в ситуации.",
          "Можете сообщить ID транзакции?",
          "Мне нужно проверить статус.",
          "Запрос на возврат рассматривается."
        ],
        "answer": 2,
        "why": "Объясняет действие."
      }
    ]
  },
  {
    "category": "work",
    "id": "chargeback",
    "level": "A2",
    "title": "Chargeback и спор",
    "goal": "Объяснить различие между возвратом и оспариванием",
    "scene": "Клиент спрашивает, почему открыт спор по операции.",
    "culture": "Chargeback — процесс оспаривания операции через платёжную систему; refund — возврат, инициируемый продавцом/сервисом. Сроки и правила различаются.",
    "phrases": [
      {
        "en": "A dispute was opened.",
        "ru": "Был открыт спор.",
        "tip": "Спор не равен доказанному мошенничеству."
      },
      {
        "en": "The chargeback is being reviewed.",
        "ru": "Чарджбэк рассматривается.",
        "tip": "Исход ещё неизвестен."
      },
      {
        "en": "We'll need supporting documents.",
        "ru": "Понадобятся подтверждающие документы.",
        "tip": "Только разрешённые форматы и защищённый канал."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Is a chargeback the same as a refund?",
        "ru": "Чарджбэк — это то же, что возврат?"
      },
      {
        "speaker": "Agent",
        "en": "Not exactly. A chargeback is a disputed card transaction.",
        "ru": "Не совсем. Чарджбэк — оспариваемая карточная операция."
      },
      {
        "speaker": "Customer",
        "en": "What happens next?",
        "ru": "Что будет дальше?"
      },
      {
        "speaker": "Agent",
        "en": "The dispute will be reviewed under the provider's rules.",
        "ru": "Спор рассмотрят по правилам провайдера."
      }
    ],
    "practice": {
      "prompt": "Объясни простыми словами, что запрос chargeback находится на рассмотрении.",
      "model": "The chargeback request is currently being reviewed. We’ll share an update when we have confirmed information.",
      "translation": "Запрос чарджбэка рассматривается. Сообщим новости, когда появится подтверждённая информация."
    },
    "questions": [
      {
        "q": "Что отличает chargeback от обычного refund?",
        "choices": [
          "Оспаривание через карточную систему.",
          "Выбор языка интерфейса.",
          "Автоматическая скидка.",
          "Покупка подарочной карты."
        ],
        "answer": 0,
        "why": "Chargeback связан с процессом оспаривания карточной операции."
      },
      {
        "q": "Как сказать по-английски: «Был открыт спор.»?",
        "choices": [
          "The chargeback is being reviewed.",
          "We'll need supporting documents.",
          "A dispute was opened.",
          "Your refund request is under review."
        ],
        "answer": 2,
        "why": "Спор не равен доказанному мошенничеству."
      },
      {
        "q": "Что означает выражение «We'll need supporting documents.»?",
        "choices": [
          "Чарджбэк рассматривается.",
          "Был открыт спор.",
          "Понадобятся подтверждающие документы.",
          "Запрос на возврат рассматривается."
        ],
        "answer": 2,
        "why": "Только разрешённые форматы и защищённый канал."
      }
    ]
  },
  {
    "category": "work",
    "id": "escalation",
    "level": "A2",
    "title": "Эскалация жалобы",
    "goal": "Передать сложное обращение с контекстом",
    "scene": "Клиент недоволен прошлым ответом поддержки.",
    "culture": "Escalation полезна, когда решение требует полномочий старшего специалиста; не звучит как наказание клиента.",
    "phrases": [
      {
        "en": "I understand your frustration.",
        "ru": "Понимаю ваше разочарование.",
        "tip": "Эмпатия без признания неустановленной вины."
      },
      {
        "en": "I'll escalate your case.",
        "ru": "Я передам ваш кейс на следующий уровень.",
        "tip": "Эскалация."
      },
      {
        "en": "We'll review the previous steps.",
        "ru": "Мы проверим предыдущие действия.",
        "tip": "Не предполагай ошибку коллег."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "I've contacted support three times already!",
        "ru": "Я уже трижды писал в поддержку!"
      },
      {
        "speaker": "Agent",
        "en": "I understand your frustration.",
        "ru": "Понимаю ваше недовольство."
      },
      {
        "speaker": "Customer",
        "en": "Can someone else review this?",
        "ru": "Может кто-нибудь другой проверить?"
      },
      {
        "speaker": "Agent",
        "en": "I'll escalate your case and include the previous steps.",
        "ru": "Передам кейс специалистам и приложу историю действий."
      }
    ],
    "practice": {
      "prompt": "Напиши клиенту, что понимаешь недовольство и передашь кейс с историей обращений.",
      "model": "I understand your frustration. I’ll escalate your case and include the previous support history for review.",
      "translation": "Понимаю недовольство. Передам кейс на проверку вместе с историей обращений."
    },
    "questions": [
      {
        "q": "Какая реакция лучше на повторную жалобу?",
        "choices": [
          "Признать неудобство и предложить эскалацию.",
          "Обвинить клиента.",
          "Удалить предыдущие сообщения.",
          "Обещать произвольную компенсацию."
        ],
        "answer": 0,
        "why": "Эмпатия и прозрачное дальнейшее действие помогают работать с жалобой."
      },
      {
        "q": "Как сказать по-английски: «Понимаю ваше разочарование.»?",
        "choices": [
          "I'll escalate your case.",
          "We'll review the previous steps.",
          "I understand your frustration.",
          "Your refund request is under review."
        ],
        "answer": 2,
        "why": "Эмпатия без признания неустановленной вины."
      },
      {
        "q": "Что означает выражение «We'll review the previous steps.»?",
        "choices": [
          "Я передам ваш кейс на следующий уровень.",
          "Понимаю ваше разочарование.",
          "Мы проверим предыдущие действия.",
          "Запрос на возврат рассматривается."
        ],
        "answer": 2,
        "why": "Не предполагай ошибку коллег."
      }
    ]
  },
  {
    "category": "work",
    "id": "merchant",
    "level": "B1",
    "title": "Мерчант и платёжный провайдер",
    "goal": "Уточнить роли участников платежа",
    "scene": "Платёж от покупателя не отображается у мерчанта.",
    "culture": "Merchant — продавец/принимающая платежи компания; payment provider — сервис обработки. Роли могут пересекаться в конкретной системе.",
    "phrases": [
      {
        "en": "The merchant hasn't confirmed it.",
        "ru": "Мерчант ещё не подтвердил это.",
        "tip": "Не равно неуспешному платежу."
      },
      {
        "en": "We're checking the processor logs.",
        "ru": "Мы проверяем логи процессинга.",
        "tip": "Только если это действительно делается."
      },
      {
        "en": "I'll reconcile the records.",
        "ru": "Я сверю записи.",
        "tip": "Reconcile = свести данные."
      }
    ],
    "dialogue": [
      {
        "speaker": "Merchant",
        "en": "We can't see the customer's payment.",
        "ru": "Мы не видим платёж клиента."
      },
      {
        "speaker": "Agent",
        "en": "We'll compare the merchant record with the processor status.",
        "ru": "Сверим запись мерчанта со статусом процессинга."
      },
      {
        "speaker": "Merchant",
        "en": "Could it still be pending?",
        "ru": "Он может ещё обрабатываться?"
      },
      {
        "speaker": "Agent",
        "en": "Possibly, but we need to verify the transaction record.",
        "ru": "Возможно, но нужно проверить запись операции."
      }
    ],
    "practice": {
      "prompt": "Сообщи мерчанту, что сравнишь статусы у него и процессинга.",
      "model": "I’ll compare the merchant record with the processor status and update you once the transaction is verified.",
      "translation": "Сверю запись мерчанта со статусом процессинга и сообщу результат после проверки."
    },
    "questions": [
      {
        "q": "Почему нельзя утверждать, что платёж пропал, до сверки?",
        "choices": [
          "Статусы разных систем могут обновляться с задержкой.",
          "Мерчанты никогда не ошибаются.",
          "Все платежи всегда мгновенные.",
          "Записи процессинга не нужны."
        ],
        "answer": 0,
        "why": "Расхождения возможны из-за задержки синхронизации или разных стадий обработки."
      },
      {
        "q": "Как сказать по-английски: «Мерчант ещё не подтвердил это.»?",
        "choices": [
          "We're checking the processor logs.",
          "I'll reconcile the records.",
          "The merchant hasn't confirmed it.",
          "The transaction was flagged."
        ],
        "answer": 2,
        "why": "Не равно неуспешному платежу."
      },
      {
        "q": "Что означает выражение «I'll reconcile the records.»?",
        "choices": [
          "Мы проверяем логи процессинга.",
          "Мерчант ещё не подтвердил это.",
          "Я сверю записи.",
          "Операция отмечена для проверки."
        ],
        "answer": 2,
        "why": "Reconcile = свести данные."
      }
    ]
  },
  {
    "category": "work",
    "id": "fraud",
    "level": "B1",
    "title": "Подозрительные операции",
    "goal": "Корректно описать риск и дальнейшие действия",
    "scene": "Проверка выявила необычный паттерн транзакции.",
    "culture": "Suspicious — повод для проверки, но не доказательство преступления. Реальные antifraud-процедуры зависят от компании и юрисдикции.",
    "phrases": [
      {
        "en": "The transaction was flagged.",
        "ru": "Операция отмечена для проверки.",
        "tip": "Flagged ≠ confirmed fraud."
      },
      {
        "en": "We need additional verification.",
        "ru": "Нужна дополнительная проверка.",
        "tip": "Не проси коды и пароли."
      },
      {
        "en": "We can't confirm the outcome yet.",
        "ru": "Мы пока не можем подтвердить результат.",
        "tip": "Точный, безопасный ответ."
      }
    ],
    "dialogue": [
      {
        "speaker": "Colleague",
        "en": "Why was this transfer flagged?",
        "ru": "Почему перевод помечен?"
      },
      {
        "speaker": "Analyst",
        "en": "An automated rule detected an unusual pattern.",
        "ru": "Автоматическое правило выявило необычный паттерн."
      },
      {
        "speaker": "Colleague",
        "en": "So it's fraud?",
        "ru": "Значит, это мошенничество?"
      },
      {
        "speaker": "Analyst",
        "en": "Not necessarily. We need additional verification.",
        "ru": "Не обязательно. Нужна дополнительная проверка."
      }
    ],
    "practice": {
      "prompt": "Вежливо объясни клиенту, что операция требует дополнительной проверки и итог ещё неизвестен.",
      "model": "The transaction requires additional verification. We can’t confirm the outcome yet, but we’ll update you when the review is complete.",
      "translation": "Операция требует дополнительной проверки. Итог пока не подтверждён; сообщим после завершения."
    },
    "questions": [
      {
        "q": "Операция flagged. Можно ли утверждать, что мошенничество доказано?",
        "choices": [
          "Нет, флаг означает необходимость проверки.",
          "Да, это окончательный вердикт.",
          "Да, без каких-либо доказательств.",
          "Флаг значит, что возврат завершён."
        ],
        "answer": 0,
        "why": "Пометка на проверку не доказывает мошенничество."
      },
      {
        "q": "Как сказать по-английски: «Операция отмечена для проверки.»?",
        "choices": [
          "We need additional verification.",
          "We can't confirm the outcome yet.",
          "The transaction was flagged.",
          "The merchant hasn't confirmed it."
        ],
        "answer": 2,
        "why": "Flagged ≠ confirmed fraud."
      },
      {
        "q": "Что означает выражение «We can't confirm the outcome yet.»?",
        "choices": [
          "Нужна дополнительная проверка.",
          "Операция отмечена для проверки.",
          "Мы пока не можем подтвердить результат.",
          "Мерчант ещё не подтвердил это."
        ],
        "answer": 2,
        "why": "Точный, безопасный ответ."
      }
    ]
  },
  {
    "category": "work",
    "id": "reconciliation",
    "level": "B1",
    "title": "Сверка операций",
    "goal": "Сообщить о расхождении и запрашиваемых данных",
    "scene": "В отчётах провайдера и мерчанта суммы не совпадают.",
    "culture": "Reconciliation — сверка записей из разных систем. Перед изменением балансов следует установить причину расхождения.",
    "phrases": [
      {
        "en": "There's a discrepancy.",
        "ru": "Есть расхождение.",
        "tip": "Нейтральнее обвинения в ошибке."
      },
      {
        "en": "The records don't match.",
        "ru": "Записи не совпадают.",
        "tip": "Не делай вывод о причине заранее."
      },
      {
        "en": "Let's trace the transaction.",
        "ru": "Давайте проследим операцию.",
        "tip": "Проверить путь и статусы."
      }
    ],
    "dialogue": [
      {
        "speaker": "Analyst",
        "en": "The settlement report shows a different total.",
        "ru": "В отчёте по расчётам другая сумма."
      },
      {
        "speaker": "Agent",
        "en": "There seems to be a discrepancy.",
        "ru": "Похоже, есть расхождение."
      },
      {
        "speaker": "Analyst",
        "en": "What should we check first?",
        "ru": "Что проверим сначала?"
      },
      {
        "speaker": "Agent",
        "en": "Let's trace the transaction IDs and compare the records.",
        "ru": "Сопоставим ID операций и сравним записи."
      }
    ],
    "practice": {
      "prompt": "Сообщи коллеге, что отчёты не совпадают, и предложи сверку ID.",
      "model": "There seems to be a discrepancy between the reports. Let’s compare the transaction IDs and trace the records before making changes.",
      "translation": "Похоже, отчёты расходятся. Сверим ID и записи перед изменениями."
    },
    "questions": [
      {
        "q": "Что сделать до ручного исправления расхождения?",
        "choices": [
          "Сверить ID и источники данных.",
          "Изменить баланс наугад.",
          "Удалить отчёт.",
          "Скрыть расхождение от коллег."
        ],
        "answer": 0,
        "why": "Сначала устанавливают источник расхождения по журналам и идентификаторам."
      },
      {
        "q": "Как сказать по-английски: «Есть расхождение.»?",
        "choices": [
          "The records don't match.",
          "Let's trace the transaction.",
          "There's a discrepancy.",
          "The merchant hasn't confirmed it."
        ],
        "answer": 2,
        "why": "Нейтральнее обвинения в ошибке."
      },
      {
        "q": "Что означает выражение «Let's trace the transaction.»?",
        "choices": [
          "Записи не совпадают.",
          "Есть расхождение.",
          "Давайте проследим операцию.",
          "Мерчант ещё не подтвердил это."
        ],
        "answer": 2,
        "why": "Проверить путь и статусы."
      }
    ]
  },
  {
    "category": "work",
    "id": "handover",
    "level": "B1",
    "title": "Передача смены",
    "goal": "Оставить понятный handover следующей смене",
    "scene": "Ночная смена заканчивается, несколько тикетов ещё открыты.",
    "culture": "Передача смены должна содержать подтверждённый статус, выполненные действия, следующие шаги и владельца запроса.",
    "phrases": [
      {
        "en": "This ticket is still open.",
        "ru": "Тикет ещё открыт.",
        "tip": "Не выдавать за решённый."
      },
      {
        "en": "Here's the current status.",
        "ru": "Вот текущий статус.",
        "tip": "Краткий контекст."
      },
      {
        "en": "The next step is to verify.",
        "ru": "Следующий шаг — проверить.",
        "tip": "Действие, не догадка."
      }
    ],
    "dialogue": [
      {
        "speaker": "Agent A",
        "en": "Any open tickets before you log off?",
        "ru": "Остались открытые тикеты перед выходом?"
      },
      {
        "speaker": "Agent B",
        "en": "Yes, ticket 104 is still waiting for merchant confirmation.",
        "ru": "Да, тикет 104 ждёт подтверждения мерчанта."
      },
      {
        "speaker": "Agent A",
        "en": "What's the next step?",
        "ru": "Какой следующий шаг?"
      },
      {
        "speaker": "Agent B",
        "en": "Follow up with the merchant and update the customer.",
        "ru": "Связаться с мерчантом и обновить клиента."
      }
    ],
    "practice": {
      "prompt": "Напиши передачу смены: тикет открыт, ожидается подтверждение мерчанта, затем обновить клиента.",
      "model": "Ticket 104 is still open and waiting for merchant confirmation. Next step: follow up with the merchant, then update the customer.",
      "translation": "Тикет 104 открыт, ожидается подтверждение мерчанта. Далее связаться с ним и обновить клиента."
    },
    "questions": [
      {
        "q": "Что обязательно полезно в handover открытого тикета?",
        "choices": [
          "Текущий статус и следующий шаг.",
          "Только эмоциональная оценка клиента.",
          "Личный пароль оператора.",
          "Неподтверждённая причина ошибки."
        ],
        "answer": 0,
        "why": "Следующая смена должна понимать, где остановилась работа и что делать."
      },
      {
        "q": "Как сказать по-английски: «Тикет ещё открыт.»?",
        "choices": [
          "Here's the current status.",
          "The next step is to verify.",
          "This ticket is still open.",
          "The merchant hasn't confirmed it."
        ],
        "answer": 2,
        "why": "Не выдавать за решённый."
      },
      {
        "q": "Что означает выражение «The next step is to verify.»?",
        "choices": [
          "Вот текущий статус.",
          "Тикет ещё открыт.",
          "Следующий шаг — проверить.",
          "Мерчант ещё не подтвердил это."
        ],
        "answer": 2,
        "why": "Действие, не догадка."
      }
    ]
  },
  {
    "category": "work",
    "id": "sla",
    "level": "B2",
    "title": "SLA и ожидания клиента",
    "goal": "Объяснить сроки без гарантий и противоречий",
    "scene": "Клиент спрашивает, почему ответ задерживается.",
    "culture": "SLA — согласованные показатели обслуживания; их следует проверять по конкретному договору. Не придумывай обещанных сроков.",
    "phrases": [
      {
        "en": "We're working within our SLA.",
        "ru": "Мы работаем в пределах SLA.",
        "tip": "Только если фактически соблюдается."
      },
      {
        "en": "I can share an update, not a guarantee.",
        "ru": "Могу дать обновление, не гарантию.",
        "tip": "Разделяет факт и прогноз."
      },
      {
        "en": "We're awaiting confirmation.",
        "ru": "Мы ожидаем подтверждения.",
        "tip": "Указывает блокирующую зависимость."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "You promised this would be fixed today.",
        "ru": "Вы обещали исправить сегодня."
      },
      {
        "speaker": "Agent",
        "en": "I’m sorry for the confusion. We're still awaiting confirmation from the provider.",
        "ru": "Извините за недопонимание. Мы ещё ждём подтверждения провайдера."
      },
      {
        "speaker": "Customer",
        "en": "Can you guarantee it'll be resolved by noon?",
        "ru": "Гарантируете решение к полудню?"
      },
      {
        "speaker": "Agent",
        "en": "I can't guarantee that yet, but I can share the next verified update.",
        "ru": "Пока не могу гарантировать, но сообщу следующую проверенную информацию."
      }
    ],
    "practice": {
      "prompt": "Составь ответ клиенту: ждём провайдера, срок не подтверждён, обновим статус.",
      "model": "We’re awaiting confirmation from the provider. I can’t give a confirmed resolution time yet, but I’ll share an update as soon as we have verified information.",
      "translation": "Ждём подтверждения провайдера. Точного срока пока нет; сообщу, когда появится проверенная информация."
    },
    "questions": [
      {
        "q": "Если провайдер не дал срок, как ответить?",
        "choices": [
          "Отделить подтверждённый статус от прогноза.",
          "Гарантировать ближайший час.",
          "Указать случайную дату.",
          "Закрыть тикет без ответа."
        ],
        "answer": 0,
        "why": "Нельзя обещать сроки без данных или согласованных обязательств."
      },
      {
        "q": "Как сказать по-английски: «Мы работаем в пределах SLA.»?",
        "choices": [
          "I can share an update, not a guarantee.",
          "We're awaiting confirmation.",
          "We're working within our SLA.",
          "We need to distinguish a hold from a charge."
        ],
        "answer": 2,
        "why": "Только если фактически соблюдается."
      },
      {
        "q": "Что означает выражение «We're awaiting confirmation.»?",
        "choices": [
          "Могу дать обновление, не гарантию.",
          "Мы работаем в пределах SLA.",
          "Мы ожидаем подтверждения.",
          "Нужно отличить блокировку от списания."
        ],
        "answer": 2,
        "why": "Указывает блокирующую зависимость."
      }
    ]
  },
  {
    "category": "work",
    "id": "complex-dispute",
    "level": "B2",
    "title": "Сложный dispute",
    "goal": "Построить нейтральный ответ при противоречащих данных",
    "scene": "Клиент утверждает, что сумма списана дважды, но журнал пока неполный.",
    "culture": "Отличай authorization hold от окончательного списания. Не диагностируй дублирование без статусов обеих операций.",
    "phrases": [
      {
        "en": "We need to distinguish a hold from a charge.",
        "ru": "Нужно отличить блокировку от списания.",
        "tip": "Два видимых события не всегда два платежа."
      },
      {
        "en": "We'll investigate both references.",
        "ru": "Проверим оба идентификатора.",
        "tip": "Не обобщай."
      },
      {
        "en": "We can't confirm duplication yet.",
        "ru": "Пока не можем подтвердить дублирование.",
        "tip": "Не делает преждевременных выводов."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "I was charged twice for one purchase!",
        "ru": "С меня дважды списали за покупку!"
      },
      {
        "speaker": "Agent",
        "en": "I understand your concern. We'll check both transaction references.",
        "ru": "Понимаю беспокойство. Проверим оба ID."
      },
      {
        "speaker": "Customer",
        "en": "But I see two amounts in my app.",
        "ru": "Но у меня в приложении две суммы."
      },
      {
        "speaker": "Agent",
        "en": "One entry may be an authorization hold; we need to verify both statuses.",
        "ru": "Одна запись может быть блокировкой; нужно проверить оба статуса."
      }
    ],
    "practice": {
      "prompt": "Ответь клиенту о возможном двойном списании, не подтверждая его без проверки.",
      "model": "I understand your concern about the two entries. One may be an authorization hold. We’ll verify both transaction references before confirming whether a duplicate charge occurred.",
      "translation": "Понимаю беспокойство из-за двух записей. Одна может быть блокировкой. Проверим оба ID перед выводом о дубле."
    },
    "questions": [
      {
        "q": "Почему две строки в банковском приложении не всегда означают двойное списание?",
        "choices": [
          "Одна из них может быть предварительной блокировкой.",
          "Любая строка — доказательство мошенничества.",
          "Банки никогда не показывают блокировки.",
          "Дублировать платёж технически невозможно."
        ],
        "answer": 0,
        "why": "Предавторизация и окончательное списание могут отображаться отдельно."
      },
      {
        "q": "Как сказать по-английски: «Нужно отличить блокировку от списания.»?",
        "choices": [
          "We'll investigate both references.",
          "We can't confirm duplication yet.",
          "We need to distinguish a hold from a charge.",
          "We're working within our SLA."
        ],
        "answer": 2,
        "why": "Два видимых события не всегда два платежа."
      },
      {
        "q": "Что означает выражение «We can't confirm duplication yet.»?",
        "choices": [
          "Проверим оба идентификатора.",
          "Нужно отличить блокировку от списания.",
          "Пока не можем подтвердить дублирование.",
          "Мы работаем в пределах SLA."
        ],
        "answer": 2,
        "why": "Не делает преждевременных выводов."
      }
    ]
  },
  {
    "category": "work",
    "id": "incident",
    "level": "B2",
    "title": "Инцидент и обновления",
    "goal": "Написать краткий статус инцидента коллегам",
    "scene": "Есть задержка обработки платежей у провайдера.",
    "culture": "Профессиональный incident update содержит влияние, подтверждённые факты, действия и следующее обновление без домыслов.",
    "phrases": [
      {
        "en": "We're investigating the impact.",
        "ru": "Мы изучаем масштаб влияния.",
        "tip": "Только подтверждённые факты."
      },
      {
        "en": "No confirmed root cause yet.",
        "ru": "Причина пока не подтверждена.",
        "tip": "Не выдавай гипотезу за факт."
      },
      {
        "en": "Next update at 3 p.m.",
        "ru": "Следующее обновление в 15:00.",
        "tip": "Обещай обновление, не решение."
      }
    ],
    "dialogue": [
      {
        "speaker": "Lead",
        "en": "Do we know what's causing the delay?",
        "ru": "Мы знаем причину задержки?"
      },
      {
        "speaker": "Analyst",
        "en": "Not yet. We're investigating the impact with the provider.",
        "ru": "Пока нет. Изучаем влияние совместно с провайдером."
      },
      {
        "speaker": "Lead",
        "en": "When will the team hear more?",
        "ru": "Когда команда узнает подробности?"
      },
      {
        "speaker": "Analyst",
        "en": "We'll send the next status update at 3 p.m.",
        "ru": "Следующее обновление отправим в 15:00."
      }
    ],
    "practice": {
      "prompt": "Напиши внутреннее обновление: есть задержки, причина неизвестна, расследуем с провайдером, новый статус в 15:00.",
      "model": "We’re seeing payment processing delays. The root cause is not confirmed yet. We’re investigating with the provider, and the next update is scheduled for 3 p.m.",
      "translation": "Наблюдаем задержки обработки. Причина пока неизвестна. Проверяем вместе с провайдером; следующее обновление в 15:00."
    },
    "questions": [
      {
        "q": "Чем хорош next update at 3 p.m. в incident-сообщении?",
        "choices": [
          "Обещает время информации, а не гарантированное решение.",
          "Доказывает устранение инцидента.",
          "Заменяет расследование.",
          "Отменяет уведомления."
        ],
        "answer": 0,
        "why": "Срок следующего обновления отличается от срока решения проблемы."
      },
      {
        "q": "Как сказать по-английски: «Мы изучаем масштаб влияния.»?",
        "choices": [
          "No confirmed root cause yet.",
          "Next update at 3 p.m.",
          "We're investigating the impact.",
          "We're working within our SLA."
        ],
        "answer": 2,
        "why": "Только подтверждённые факты."
      },
      {
        "q": "Что означает выражение «Next update at 3 p.m.»?",
        "choices": [
          "Причина пока не подтверждена.",
          "Мы изучаем масштаб влияния.",
          "Следующее обновление в 15:00.",
          "Мы работаем в пределах SLA."
        ],
        "answer": 2,
        "why": "Обещай обновление, не решение."
      }
    ]
  },
  {
    "category": "work",
    "id": "risk-comms",
    "level": "B2",
    "title": "Проверка и конфиденциальность",
    "goal": "Объяснить необходимость проверки без раскрытия antifraud-правил",
    "scene": "Клиент настойчиво требует причину блокировки.",
    "culture": "Не раскрывай пороги антифрода, обходы проверки или данные других клиентов. Уточни официальный порядок прохождения верификации.",
    "phrases": [
      {
        "en": "We can't disclose internal risk criteria.",
        "ru": "Мы не можем раскрыть внутренние критерии риска.",
        "tip": "Не перечисляй пороги проверок."
      },
      {
        "en": "Please use the secure verification flow.",
        "ru": "Используйте защищённый процесс проверки.",
        "tip": "Не проси документы в стороннем чате."
      },
      {
        "en": "We'll notify you of the result.",
        "ru": "Мы сообщим результат.",
        "tip": "Только в пределах политики компании."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Tell me exactly which rule blocked my transfer.",
        "ru": "Назовите правило, заблокировавшее перевод."
      },
      {
        "speaker": "Agent",
        "en": "I can explain the verification process, but not internal risk criteria.",
        "ru": "Могу объяснить порядок проверки, но не внутренние критерии риска."
      },
      {
        "speaker": "Customer",
        "en": "What should I do?",
        "ru": "Что мне делать?"
      },
      {
        "speaker": "Agent",
        "en": "Please follow the secure verification steps in your account.",
        "ru": "Выполните защищённые шаги проверки в аккаунте."
      }
    ],
    "practice": {
      "prompt": "Объясни, что внутренние правила не раскрываются, но клиент может пройти защищённую проверку.",
      "model": "For security reasons, we can’t disclose internal risk criteria. Please complete the verification steps through your secure account. We’ll update you when the review is complete.",
      "translation": "По соображениям безопасности внутренние критерии не раскрываем. Пройдите проверку через защищённый аккаунт; после сообщим результат."
    },
    "questions": [
      {
        "q": "Как ответить на запрос внутренних antifraud-порогов?",
        "choices": [
          "Объяснить безопасный процесс проверки, не раскрывая порогов.",
          "Назвать точные пороги риска.",
          "Попросить клиента обойти проверку.",
          "Отправить пароль аналитика."
        ],
        "answer": 0,
        "why": "Объясняй легитимные действия без раскрытия внутренних правил контроля."
      },
      {
        "q": "Как сказать по-английски: «Мы не можем раскрыть внутренние критерии риска.»?",
        "choices": [
          "Please use the secure verification flow.",
          "We'll notify you of the result.",
          "We can't disclose internal risk criteria.",
          "We're working within our SLA."
        ],
        "answer": 2,
        "why": "Не перечисляй пороги проверок."
      },
      {
        "q": "Что означает выражение «We'll notify you of the result.»?",
        "choices": [
          "Используйте защищённый процесс проверки.",
          "Мы не можем раскрыть внутренние критерии риска.",
          "Мы сообщим результат.",
          "Мы работаем в пределах SLA."
        ],
        "answer": 2,
        "why": "Только в пределах политики компании."
      }
    ]
  },
  {
    "category": "america",
    "id": "phone",
    "level": "A1",
    "title": "Звонок и сообщение",
    "goal": "Ответить на звонок и попросить перезвонить",
    "scene": "Знакомый звонит в неудобный момент.",
    "culture": "Американское Can I call you back? — нейтральная просьба перезвонить. Важен тон, не дословный перевод.",
    "phrases": [
      {
        "en": "Can I call you back?",
        "ru": "Можно я тебе перезвоню?",
        "tip": "Для дружеского и нейтрального общения."
      },
      {
        "en": "I'm busy right now.",
        "ru": "Я сейчас занят(а).",
        "tip": "Right now подчёркивает текущий момент."
      },
      {
        "en": "Talk to you soon.",
        "ru": "Скоро созвонимся.",
        "tip": "Естественное завершение разговора."
      }
    ],
    "dialogue": [
      {
        "speaker": "Friend",
        "en": "Hey, is this a good time?",
        "ru": "Привет, удобно говорить?"
      },
      {
        "speaker": "You",
        "en": "I'm busy right now. Can I call you back?",
        "ru": "Я сейчас занят. Можно перезвоню?"
      },
      {
        "speaker": "Friend",
        "en": "Sure, no problem.",
        "ru": "Конечно, без проблем."
      },
      {
        "speaker": "You",
        "en": "Great. Talk to you soon!",
        "ru": "Отлично. Скоро созвонимся!"
      }
    ],
    "practice": {
      "prompt": "Скажи другу, что сейчас занят и перезвонишь через час.",
      "model": "I’m busy right now. Can I call you back in an hour? Talk to you soon!",
      "translation": "Я сейчас занят. Можно перезвоню через час? Скоро созвонимся!"
    },
    "questions": [
      {
        "q": "Как вежливо сказать, что сейчас неудобно говорить?",
        "choices": [
          "Can I call you back?",
          "Never call me again.",
          "You must wait forever.",
          "Speak louder now."
        ],
        "answer": 0,
        "why": "Can I call you back? — нейтральная просьба о повторном звонке."
      },
      {
        "q": "Как сказать по-английски: «Можно я тебе перезвоню?»?",
        "choices": [
          "I'm busy right now.",
          "Talk to you soon.",
          "Can I call you back?",
          "Nice to meet you."
        ],
        "answer": 2,
        "why": "Для дружеского и нейтрального общения."
      },
      {
        "q": "Что означает выражение «Talk to you soon.»?",
        "choices": [
          "Я сейчас занят(а).",
          "Можно я тебе перезвоню?",
          "Скоро созвонимся.",
          "Приятно познакомиться."
        ],
        "answer": 2,
        "why": "Естественное завершение разговора."
      }
    ]
  },
  {
    "category": "america",
    "id": "post-office",
    "level": "A2",
    "title": "Почта и доставка",
    "goal": "Уточнить срок доставки и отслеживание",
    "scene": "Ты отправляешь посылку в другой штат.",
    "culture": "В США ZIP code — почтовый индекс. Tracking number — номер для отслеживания, а не гарантия прибытия к определённой дате.",
    "phrases": [
      {
        "en": "I'd like to ship this package.",
        "ru": "Я хотел(а) бы отправить эту посылку.",
        "tip": "Ship = отправлять доставкой."
      },
      {
        "en": "Is tracking included?",
        "ru": "Отслеживание включено?",
        "tip": "Уточни услугу до оплаты."
      },
      {
        "en": "What's the estimated delivery date?",
        "ru": "Какая примерная дата доставки?",
        "tip": "Estimated — ориентировочная."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "I'd like to ship this package to Seattle.",
        "ru": "Хочу отправить посылку в Сиэтл."
      },
      {
        "speaker": "Clerk",
        "en": "Would you like standard or express shipping?",
        "ru": "Обычную или экспресс-доставку?"
      },
      {
        "speaker": "You",
        "en": "Standard, please. Is tracking included?",
        "ru": "Обычную. Отслеживание включено?"
      },
      {
        "speaker": "Clerk",
        "en": "Yes, we'll give you a tracking number.",
        "ru": "Да, выдадим номер отслеживания."
      }
    ],
    "practice": {
      "prompt": "Попроси отправить посылку стандартной доставкой и уточни отслеживание.",
      "model": "I’d like to ship this package using standard shipping. Is tracking included?",
      "translation": "Хочу отправить посылку обычной доставкой. Отслеживание включено?"
    },
    "questions": [
      {
        "q": "Что означает estimated в Estimated delivery date?",
        "choices": [
          "Дата приблизительная, не гарантированная.",
          "Доставка отменена.",
          "Услуга бесплатная.",
          "Дата уже прошла."
        ],
        "answer": 0,
        "why": "Estimated обозначает оценку или прогноз."
      },
      {
        "q": "Как сказать по-английски: «Я хотел(а) бы отправить эту посылку.»?",
        "choices": [
          "Is tracking included?",
          "What's the estimated delivery date?",
          "I'd like to ship this package.",
          "Are utilities included?"
        ],
        "answer": 2,
        "why": "Ship = отправлять доставкой."
      },
      {
        "q": "Что означает выражение «What's the estimated delivery date?»?",
        "choices": [
          "Отслеживание включено?",
          "Я хотел(а) бы отправить эту посылку.",
          "Какая примерная дата доставки?",
          "Коммунальные услуги включены?"
        ],
        "answer": 2,
        "why": "Estimated — ориентировочная."
      }
    ]
  },
  {
    "category": "america",
    "id": "documents",
    "level": "B1",
    "title": "Документы и запись в учреждение",
    "goal": "Вежливо уточнить список документов",
    "scene": "Ты записываешься на приём по административному вопросу.",
    "culture": "Правила выдачи документов в США различаются по штату и учреждению. Всегда проверяй требования на официальном сайте.",
    "phrases": [
      {
        "en": "What documents do I need to bring?",
        "ru": "Какие документы нужно принести?",
        "tip": "Bring = взять с собой."
      },
      {
        "en": "Do I need an appointment?",
        "ru": "Нужно записываться заранее?",
        "tip": "Appointment = назначенная встреча."
      },
      {
        "en": "Could you confirm the requirements?",
        "ru": "Можете подтвердить требования?",
        "tip": "Проверка актуальности условий."
      }
    ],
    "dialogue": [
      {
        "speaker": "You",
        "en": "Do I need an appointment to submit this form?",
        "ru": "Нужна запись, чтобы подать форму?"
      },
      {
        "speaker": "Clerk",
        "en": "Yes, please book a time online.",
        "ru": "Да, запишитесь через интернет."
      },
      {
        "speaker": "You",
        "en": "What documents do I need to bring?",
        "ru": "Какие документы взять с собой?"
      },
      {
        "speaker": "Clerk",
        "en": "Check the current list on our official website.",
        "ru": "Проверьте актуальный список на официальном сайте."
      }
    ],
    "practice": {
      "prompt": "Напиши в учреждение, спроси о записи и актуальном списке документов.",
      "model": "Hello, do I need an appointment to submit my form? Could you confirm which documents I need to bring?",
      "translation": "Здравствуйте, нужна ли запись для подачи формы? Можете уточнить список документов?"
    },
    "questions": [
      {
        "q": "Почему сотрудник направляет на официальный сайт?",
        "choices": [
          "Требования могут меняться и зависят от услуги.",
          "Документы вообще не нужны.",
          "Запись можно не делать.",
          "Все штаты имеют идентичные правила."
        ],
        "answer": 0,
        "why": "Официальный источник помогает проверить актуальные требования."
      },
      {
        "q": "Как сказать по-английски: «Какие документы нужно принести?»?",
        "choices": [
          "Do I need an appointment?",
          "Could you confirm the requirements?",
          "What documents do I need to bring?",
          "Is there a monthly maintenance fee?"
        ],
        "answer": 2,
        "why": "Bring = взять с собой."
      },
      {
        "q": "Что означает выражение «Could you confirm the requirements?»?",
        "choices": [
          "Нужно записываться заранее?",
          "Какие документы нужно принести?",
          "Можете подтвердить требования?",
          "Есть ежемесячная комиссия?"
        ],
        "answer": 2,
        "why": "Проверка актуальности условий."
      }
    ]
  },
  {
    "category": "america",
    "id": "fast-speech",
    "level": "B2",
    "title": "Быстрая американская речь",
    "goal": "Понимать разговорные сокращения и выбирать стиль",
    "scene": "Ты слушаешь неформальный разговор американских коллег.",
    "culture": "Gonna, wanna и gotta чаще встречаются в непринуждённой устной речи. В официальной переписке лучше писать going to, want to и have to.",
    "phrases": [
      {
        "en": "I'm gonna head out.",
        "ru": "Я собираюсь уходить.",
        "tip": "Неформальная устная форма going to."
      },
      {
        "en": "Wanna grab lunch?",
        "ru": "Хочешь сходить на обед?",
        "tip": "Wanna — разговорное want to."
      },
      {
        "en": "I've gotta run.",
        "ru": "Мне пора бежать.",
        "tip": "Gotta — сокращение got to в речи."
      }
    ],
    "dialogue": [
      {
        "speaker": "Friend",
        "en": "Hey, wanna grab lunch?",
        "ru": "Эй, хочешь на обед?"
      },
      {
        "speaker": "You",
        "en": "I'd love to, but I've gotta run.",
        "ru": "С радостью, но мне надо бежать."
      },
      {
        "speaker": "Friend",
        "en": "No worries. Maybe tomorrow?",
        "ru": "Без проблем. Может завтра?"
      },
      {
        "speaker": "You",
        "en": "Sounds good. I'm gonna text you.",
        "ru": "Отлично. Я тебе напишу."
      }
    ],
    "practice": {
      "prompt": "Напиши другу неформальное предложение пообедать, используя wanna.",
      "model": "Hey, wanna grab lunch tomorrow? I’m gonna be downtown around noon.",
      "translation": "Привет, хочешь пообедать завтра? Я буду в центре около полудня."
    },
    "questions": [
      {
        "q": "Как лучше написать в официальном письме I’m gonna check it?",
        "choices": [
          "I am going to check it.",
          "I’m gonna check it.",
          "I gotta check it, dude.",
          "Wanna I check it?"
        ],
        "answer": 0,
        "why": "В формальной переписке лучше использовать полную форму going to."
      },
      {
        "q": "Как сказать по-английски: «Я собираюсь уходить.»?",
        "choices": [
          "Wanna grab lunch?",
          "I've gotta run.",
          "I'm gonna head out.",
          "I'm down."
        ],
        "answer": 2,
        "why": "Неформальная устная форма going to."
      },
      {
        "q": "Что означает выражение «I've gotta run.»?",
        "choices": [
          "Хочешь сходить на обед?",
          "Я собираюсь уходить.",
          "Мне пора бежать.",
          "Я за / Я согласен."
        ],
        "answer": 2,
        "why": "Gotta — сокращение got to в речи."
      }
    ]
  },
  {
    "category": "work",
    "id": "ticket-close",
    "level": "A1",
    "title": "Закрытие тикета",
    "goal": "Вежливо завершить обращение без спешки",
    "scene": "Клиент подтверждает, что проблема решена.",
    "culture": "Прежде чем закрыть тикет, убедись, что клиент подтвердил результат или правила команды позволяют закрытие.",
    "phrases": [
      {
        "en": "Is there anything else?",
        "ru": "Есть ли ещё вопросы?",
        "tip": "Дружелюбный финальный вопрос."
      },
      {
        "en": "I'm glad we could help.",
        "ru": "Рад(а), что смогли помочь.",
        "tip": "Уместно после решения."
      },
      {
        "en": "Have a great day!",
        "ru": "Хорошего дня!",
        "tip": "Нейтральное завершение."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "It works now, thank you!",
        "ru": "Теперь работает, спасибо!"
      },
      {
        "speaker": "Agent",
        "en": "I'm glad we could help. Is there anything else?",
        "ru": "Рад, что помогли. Ещё вопросы есть?"
      },
      {
        "speaker": "Customer",
        "en": "No, that's all.",
        "ru": "Нет, это всё."
      },
      {
        "speaker": "Agent",
        "en": "Have a great day!",
        "ru": "Хорошего дня!"
      }
    ],
    "practice": {
      "prompt": "Поблагодари клиента за обращение и спроси, нужна ли ещё помощь.",
      "model": "Thank you for contacting us. Is there anything else I can help you with today?",
      "translation": "Спасибо за обращение. Могу ли помочь с чем-нибудь ещё?"
    },
    "questions": [
      {
        "q": "Что лучше написать после подтверждённого решения?",
        "choices": [
          "Is there anything else I can help with?",
          "Give me your PIN.",
          "This is not my job.",
          "Never contact us again."
        ],
        "answer": 0,
        "why": "Краткий вопрос о дополнительной помощи завершает обращение вежливо."
      },
      {
        "q": "Как сказать по-английски: «Есть ли ещё вопросы?»?",
        "choices": [
          "I'm glad we could help.",
          "Have a great day!",
          "Is there anything else?",
          "How can I help you today?"
        ],
        "answer": 2,
        "why": "Дружелюбный финальный вопрос."
      },
      {
        "q": "Что означает выражение «Have a great day!»?",
        "choices": [
          "Рад(а), что смогли помочь.",
          "Есть ли ещё вопросы?",
          "Хорошего дня!",
          "Чем могу помочь сегодня?"
        ],
        "answer": 2,
        "why": "Нейтральное завершение."
      }
    ]
  },
  {
    "category": "work",
    "id": "secure-docs",
    "level": "A2",
    "title": "Документы для верификации",
    "goal": "Направить клиента на защищённую загрузку",
    "scene": "Клиент спрашивает, куда отправить подтверждающие документы.",
    "culture": "Не проси паспорт или банковскую выписку в открытом чате или стороннем мессенджере. Следуй утверждённой политике верификации.",
    "phrases": [
      {
        "en": "Please use our secure upload page.",
        "ru": "Используйте нашу защищённую страницу загрузки.",
        "tip": "Не отправлять документы в чат."
      },
      {
        "en": "We'll review the submitted documents.",
        "ru": "Мы проверим загруженные документы.",
        "tip": "Не обещай одобрение."
      },
      {
        "en": "Your verification is still in progress.",
        "ru": "Проверка ещё продолжается.",
        "tip": "Нейтральный статус."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "Can I send my ID here in the chat?",
        "ru": "Могу отправить документ сюда в чат?"
      },
      {
        "speaker": "Agent",
        "en": "Please don't share your ID here. Use the secure upload page in your account.",
        "ru": "Не отправляйте документ сюда. Используйте защищённую загрузку в аккаунте."
      },
      {
        "speaker": "Customer",
        "en": "Will my account be approved today?",
        "ru": "Мой аккаунт одобрят сегодня?"
      },
      {
        "speaker": "Agent",
        "en": "We can't confirm the outcome yet.",
        "ru": "Мы пока не можем подтвердить результат."
      }
    ],
    "practice": {
      "prompt": "Объясни клиенту, что удостоверение нельзя отправлять в чат, и направь на защищённую страницу.",
      "model": "Please do not send your ID in this chat. Use the secure document upload page in your account.",
      "translation": "Не отправляйте документ в чат. Используйте защищённую страницу загрузки в аккаунте."
    },
    "questions": [
      {
        "q": "Как безопасно получить документы для проверки?",
        "choices": [
          "Через официальную защищённую загрузку.",
          "В обычном чате без защиты.",
          "Через личный мессенджер оператора.",
          "На публичном форуме."
        ],
        "answer": 0,
        "why": "Конфиденциальные документы передаются только по разрешённому защищённому каналу."
      },
      {
        "q": "Как сказать по-английски: «Используйте нашу защищённую страницу загрузки.»?",
        "choices": [
          "We'll review the submitted documents.",
          "Your verification is still in progress.",
          "Please use our secure upload page.",
          "Your refund request is under review."
        ],
        "answer": 2,
        "why": "Не отправлять документы в чат."
      },
      {
        "q": "Что означает выражение «Your verification is still in progress.»?",
        "choices": [
          "Мы проверим загруженные документы.",
          "Используйте нашу защищённую страницу загрузки.",
          "Проверка ещё продолжается.",
          "Запрос на возврат рассматривается."
        ],
        "answer": 2,
        "why": "Нейтральный статус."
      }
    ]
  },
  {
    "category": "work",
    "id": "igaming-payout",
    "level": "B1",
    "title": "iGaming: вывод средств",
    "goal": "Вежливо объяснить статус выплаты в игровом сервисе",
    "scene": "Пользователь спрашивает, почему запрос на вывод не завершён.",
    "culture": "В iGaming нужно соблюдать правила сервиса, KYC/AML и требования юрисдикции. Не подсказывай способы обходить проверки или ограничения.",
    "phrases": [
      {
        "en": "The withdrawal is under review.",
        "ru": "Заявка на вывод рассматривается.",
        "tip": "Не равно отказу."
      },
      {
        "en": "The payout hasn't been confirmed.",
        "ru": "Выплата ещё не подтверждена.",
        "tip": "Проверенный статус."
      },
      {
        "en": "We follow the verification policy.",
        "ru": "Мы следуем правилам проверки.",
        "tip": "Без раскрытия риск-критериев."
      }
    ],
    "dialogue": [
      {
        "speaker": "Customer",
        "en": "My withdrawal is still pending. Why?",
        "ru": "Вывод всё ещё в обработке. Почему?"
      },
      {
        "speaker": "Agent",
        "en": "The request is under review according to the verification policy.",
        "ru": "Запрос рассматривается согласно правилам проверки."
      },
      {
        "speaker": "Customer",
        "en": "Can you guarantee it'll arrive today?",
        "ru": "Гарантируете, что придёт сегодня?"
      },
      {
        "speaker": "Agent",
        "en": "I can't guarantee a time until the payout is confirmed.",
        "ru": "Не могу гарантировать срок до подтверждения выплаты."
      }
    ],
    "practice": {
      "prompt": "Объясни клиенту, что вывод проверяется и подтверждённого срока выплаты пока нет.",
      "model": "Your withdrawal request is currently under review. We cannot confirm the payout time yet, but we will update you when the status changes.",
      "translation": "Запрос на вывод проверяется. Время выплаты пока не подтверждено; сообщим об изменении статуса."
    },
    "questions": [
      {
        "q": "Как корректно описать незавершённую выплату?",
        "choices": [
          "Указать статус under review без гарантии срока.",
          "Обещать зачисление через минуту.",
          "Советовать обход верификации.",
          "Сообщать внутренние antifraud-пороги."
        ],
        "answer": 0,
        "why": "Нужно точно передавать статус и соблюдать правила верификации."
      },
      {
        "q": "Как сказать по-английски: «Заявка на вывод рассматривается.»?",
        "choices": [
          "The payout hasn't been confirmed.",
          "We follow the verification policy.",
          "The withdrawal is under review.",
          "The merchant hasn't confirmed it."
        ],
        "answer": 2,
        "why": "Не равно отказу."
      },
      {
        "q": "Что означает выражение «We follow the verification policy.»?",
        "choices": [
          "Выплата ещё не подтверждена.",
          "Заявка на вывод рассматривается.",
          "Мы следуем правилам проверки.",
          "Мерчант ещё не подтвердил это."
        ],
        "answer": 2,
        "why": "Без раскрытия риск-критериев."
      }
    ]
  },
  {
    "category": "work",
    "id": "stakeholder-email",
    "level": "B2",
    "title": "Обновление для руководителя",
    "goal": "Кратко сформулировать статус, риск и следующий шаг",
    "scene": "Менеджер просит отчёт о задержках международных платежей.",
    "culture": "Для руководителя полезнее всего краткая структура: факт — влияние — действие — следующий контрольный пункт.",
    "phrases": [
      {
        "en": "Here's the current situation.",
        "ru": "Вот текущая ситуация.",
        "tip": "Нейтральное начало."
      },
      {
        "en": "The main risk is delayed settlement.",
        "ru": "Основной риск — задержка расчётов.",
        "tip": "Указывай подтверждённый риск."
      },
      {
        "en": "We'll share the next update by noon.",
        "ru": "Следующее обновление будет к полудню.",
        "tip": "Срок обновления, не гарантия решения."
      }
    ],
    "dialogue": [
      {
        "speaker": "Manager",
        "en": "What's the status of the settlement delay?",
        "ru": "Каков статус задержки расчётов?"
      },
      {
        "speaker": "Agent",
        "en": "Here's the current situation: the provider is investigating.",
        "ru": "Ситуация такая: провайдер расследует проблему."
      },
      {
        "speaker": "Manager",
        "en": "What's the main risk?",
        "ru": "Какой основной риск?"
      },
      {
        "speaker": "Agent",
        "en": "Delayed settlement. We'll share the next update by noon.",
        "ru": "Задержка расчётов. Следующее обновление к полудню."
      }
    ],
    "practice": {
      "prompt": "Напиши руководителю: провайдер проверяет задержку расчётов, есть риск переноса выплат, обновление к полудню.",
      "model": "The provider is investigating the settlement delay. The main risk is postponed payouts. We will share the next confirmed update by noon.",
      "translation": "Провайдер расследует задержку расчётов. Основной риск — перенос выплат. Подтверждённое обновление к полудню."
    },
    "questions": [
      {
        "q": "Что лучше включить в статус для руководителя?",
        "choices": [
          "Подтверждённые факты, влияние и следующий шаг.",
          "Слухи без проверки.",
          "Пароли от внутренних систем.",
          "Обещание исправить всё за пять минут."
        ],
        "answer": 0,
        "why": "Структурированный и проверенный статус помогает принимать решения."
      },
      {
        "q": "Как сказать по-английски: «Вот текущая ситуация.»?",
        "choices": [
          "The main risk is delayed settlement.",
          "We'll share the next update by noon.",
          "Here's the current situation.",
          "We're working within our SLA."
        ],
        "answer": 2,
        "why": "Нейтральное начало."
      },
      {
        "q": "Что означает выражение «We'll share the next update by noon.»?",
        "choices": [
          "Основной риск — задержка расчётов.",
          "Вот текущая ситуация.",
          "Следующее обновление будет к полудню.",
          "Мы работаем в пределах SLA."
        ],
        "answer": 2,
        "why": "Срок обновления, не гарантия решения."
      }
    ]
  }
];
export const americanUnits=scenarioUnits.filter(x=>x.category==='america');
export const workUnits=scenarioUnits.filter(x=>x.category==='work');
export function scenarioResultKey(unit:ScenarioUnit){return `${unit.category}:${unit.id}`;}
export function scenarioDraftKey(unit:ScenarioUnit){return `w-${unit.category}-${unit.id}`;}
export function scenarioSuccess(score:number,total:number){return total>0&&score>=Math.ceil(total*2/3);}
export function validateScenarioUnit(unit:ScenarioUnit){
 return /^(?:america|work)$/.test(unit.category)&&/^[a-z0-9-]+$/.test(unit.id)&&['A1','A2','B1','B2'].includes(unit.level)&&unit.phrases.length===3&&unit.dialogue.length>=3&&unit.questions.length===3&&unit.questions.every(q=>q.choices.length===4&&new Set(q.choices).size===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.why.length>15)&&unit.practice.model.length>35;
}
