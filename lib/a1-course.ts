// A1 course: authored Russian explanations and verified English tasks.
// Keep legacy lesson IDs unchanged to retain localStorage completions.
export type A1Section={title:string;body:string;model:string};
export type A1SentenceTask={answer?:string;prompt?:string;source?:string;answers?:string[];why:string};
export type A1Choice={q:string;choices:string[];answer:number;why:string};
export type A1Unit={id:string;title:string;desc:string;formula:string;sections:A1Section[];examples:[string,string][];blanks:{prompt:string;answers:string[];why:string}[];orders:{answer:string;prompt:string;why:string}[];fixes:{source:string;answers:string[];why:string}[];translations:{prompt:string;answers:string[];why:string}[];choices:A1Choice[];markers:string[];pitfalls:{wrong:string;right:string;why:string}[]};
export const A1_ORDER:readonly string[] = ["pronouns", "be", "extra-1", "plurals", "extra-2", "have-has", "word-order", "present-simple", "present-cont", "past-simple", "future-simple", "extra-3", "prepositions", "questions", "negatives", "extra-4", "much-many"];
export const A1_UNITS:Record<string,A1Unit> = {
  "pronouns": {
    "id": "pronouns",
    "title": "Местоимения: I, you, he, she, it, we, they",
    "desc": "Кто выполняет действие и кому что принадлежит",
    "formula": "I / you / he / she / it / we / they\nmy / your / his / her / its / our / their",
    "sections": [
      {
        "title": "Кто выполняет действие",
        "body": "Личные местоимения заменяют имя или название предмета. I — я, you — ты или вы, he — он, she — она, it — оно или предмет, we — мы, they — они.",
        "model": "Maria is here. She is ready."
      },
      {
        "title": "Как сказать «мой»",
        "body": "Перед существительным ставь притяжательное слово: my job, your phone, his car, her desk, its name, our team, their office.",
        "model": "This is our team."
      },
      {
        "title": "Не путай her и she",
        "body": "She — подлежащее, her — «её» перед существительным. His означает «его» и не меняется по роду предмета.",
        "model": "She likes her job."
      },
      {
        "title": "I всегда с большой буквы",
        "body": "Местоимение I в английском всегда пишется с заглавной буквы — даже в середине предложения.",
        "model": "Anna and I work here."
      }
    ],
    "examples": [
      [
        "I am at home.",
        "Я дома."
      ],
      [
        "You are my friend.",
        "Ты мой друг."
      ],
      [
        "He works in a store.",
        "Он работает в магазине."
      ],
      [
        "She likes her new job.",
        "Ей нравится новая работа."
      ],
      [
        "It is a small cat.",
        "Это маленький кот."
      ],
      [
        "We study English together.",
        "Мы вместе изучаем английский."
      ],
      [
        "They live in New York.",
        "Они живут в Нью-Йорке."
      ],
      [
        "This is my notebook.",
        "Это моя тетрадь."
      ],
      [
        "Our manager is here.",
        "Наш руководитель здесь."
      ],
      [
        "Their office is open.",
        "Их офис открыт."
      ]
    ],
    "blanks": [
      {
        "prompt": "___ am ready to start.",
        "answers": [
          "I"
        ],
        "why": "Для себя используй I."
      },
      {
        "prompt": "Maria is tired. ___ is going home.",
        "answers": [
          "She"
        ],
        "why": "Maria — женщина; заменяем имя на she."
      },
      {
        "prompt": "John is new. ___ is my colleague.",
        "answers": [
          "He"
        ],
        "why": "John — мужчина; местоимение he."
      },
      {
        "prompt": "This is ___ laptop (мой).",
        "answers": [
          "my"
        ],
        "why": "Перед предметом нужна форма my."
      },
      {
        "prompt": "We love ___ city (наш).",
        "answers": [
          "our"
        ],
        "why": "Притяжательное слово от we — our."
      },
      {
        "prompt": "The workers know ___ schedule (их).",
        "answers": [
          "their"
        ],
        "why": "От they образуется their."
      }
    ],
    "orders": [
      {
        "answer": "She is my friend.",
        "prompt": "Она моя подруга.",
        "why": "Подлежащее she идёт перед is."
      },
      {
        "answer": "Our office is open.",
        "prompt": "Наш офис открыт.",
        "why": "Our ставим перед существительным office."
      },
      {
        "answer": "They are at home.",
        "prompt": "Они дома.",
        "why": "They сочетается с are."
      }
    ],
    "fixes": [
      {
        "source": "Her is my teacher.",
        "answers": [
          "She is my teacher."
        ],
        "why": "Подлежащее — she, а не her."
      },
      {
        "source": "We like we job.",
        "answers": [
          "We like our job."
        ],
        "why": "Перед существительным job нужна форма our."
      }
    ],
    "translations": [
      {
        "prompt": "Это моя сестра.",
        "answers": [
          "This is my sister."
        ],
        "why": "Перед sister ставим my."
      },
      {
        "prompt": "Они наши друзья.",
        "answers": [
          "They are our friends."
        ],
        "why": "They are + our перед существительным."
      }
    ],
    "choices": [
      {
        "q": "___ are my friends.",
        "choices": [
          "They",
          "Their",
          "Them"
        ],
        "answer": 0,
        "why": "Перед are нужен субъект they."
      },
      {
        "q": "This is ___ bag.",
        "choices": [
          "her",
          "she",
          "hers"
        ],
        "answer": 0,
        "why": "Her перед существительным означает «её»."
      },
      {
        "q": "___ is from Boston.",
        "choices": [
          "He",
          "His",
          "Him"
        ],
        "answer": 0,
        "why": "He — местоимение-подлежащее."
      },
      {
        "q": "We work with ___ manager.",
        "choices": [
          "our",
          "we",
          "ours"
        ],
        "answer": 0,
        "why": "Our стоит перед существительным."
      },
      {
        "q": "The dog is happy. ___ is playing.",
        "choices": [
          "It",
          "He",
          "They"
        ],
        "answer": 0,
        "why": "Животное можно назвать it, если пол неизвестен."
      },
      {
        "q": "Is this ___ phone?",
        "choices": [
          "your",
          "you",
          "yours"
        ],
        "answer": 0,
        "why": "Your + существительное."
      },
      {
        "q": "I love ___ parents.",
        "choices": [
          "my",
          "mine",
          "me"
        ],
        "answer": 0,
        "why": "My ставят перед parents."
      }
    ],
    "markers": [
      "you",
      "he",
      "she",
      "it",
      "my",
      "your",
      "our",
      "their"
    ],
    "pitfalls": [
      {
        "wrong": "She have a laptop.",
        "right": "She has a laptop.",
        "why": "С she нужен has, но это уже правило have/has."
      },
      {
        "wrong": "I likes English.",
        "right": "I like English.",
        "why": "После I в Present Simple окончание -s не нужно."
      }
    ]
  },
  "be": {
    "id": "be",
    "title": "Глагол to be",
    "desc": "Кто я, где нахожусь и в каком состоянии",
    "formula": "(+) I am / he is / we are\n(-) I am not / she is not / they are not\n(?) Am I...? / Is she...? / Are they...?",
    "sections": [
      {
        "title": "Зачем нужен to be",
        "body": "В русском можно сказать «я студент» без глагола. В английском в настоящем обязательно: I am a student. To be соединяет человека или предмет с описанием, профессией, местом.",
        "model": "I am a student."
      },
      {
        "title": "Выбирай форму по подлежащему",
        "body": "I → am; he, she, it → is; you, we, they → are. Смысл слова be — «быть / находиться».",
        "model": "She is busy. We are online."
      },
      {
        "title": "Как отрицать",
        "body": "Добавь not после am/is/are. Разговорные сокращения: isn't, aren't, I'm not. Не используй don't с to be.",
        "model": "He isn't here."
      },
      {
        "title": "Как спросить",
        "body": "Для вопроса перенеси am/is/are перед подлежащим: Are you ready? Короткий ответ: Yes, I am. / No, I'm not.",
        "model": "Are you okay?"
      }
    ],
    "examples": [
      [
        "I am in the office.",
        "Я в офисе."
      ],
      [
        "She is a manager.",
        "Она менеджер."
      ],
      [
        "They are from Chicago.",
        "Они из Чикаго."
      ],
      [
        "We are not late.",
        "Мы не опаздываем."
      ],
      [
        "Are you okay?",
        "Ты в порядке?"
      ],
      [
        "Is the store open?",
        "Магазин открыт?"
      ],
      [
        "It isn't cold today.",
        "Сегодня не холодно."
      ],
      [
        "My phone is new.",
        "У меня новый телефон."
      ],
      [
        "I'm ready for work.",
        "Я готов к работе."
      ],
      [
        "The documents are here.",
        "Документы здесь."
      ]
    ],
    "blanks": [
      {
        "prompt": "I ___ a student.",
        "answers": [
          "am"
        ],
        "why": "С I используется am."
      },
      {
        "prompt": "They ___ at home.",
        "answers": [
          "are"
        ],
        "why": "С they — are."
      },
      {
        "prompt": "This ___ my laptop.",
        "answers": [
          "is"
        ],
        "why": "This — единственное число, нужна is."
      },
      {
        "prompt": "She ___ not tired.",
        "answers": [
          "is"
        ],
        "why": "She is not = она не устала."
      },
      {
        "prompt": "___ you from Texas?",
        "answers": [
          "Are"
        ],
        "why": "В вопросе are перед you."
      },
      {
        "prompt": "We ___ ready now.",
        "answers": [
          "are"
        ],
        "why": "We требует are."
      }
    ],
    "orders": [
      {
        "answer": "I am very tired.",
        "prompt": "Я очень устал.",
        "why": "I + am + описание."
      },
      {
        "answer": "Is your manager here?",
        "prompt": "Твой менеджер здесь?",
        "why": "Вопрос начинается с is."
      },
      {
        "answer": "They are not late.",
        "prompt": "Они не опоздали.",
        "why": "Отрицание: are + not."
      }
    ],
    "fixes": [
      {
        "source": "You is my friend.",
        "answers": [
          "You are my friend."
        ],
        "why": "You всегда требует are."
      },
      {
        "source": "He don't busy.",
        "answers": [
          "He isn't busy.",
          "He is not busy."
        ],
        "why": "С be отрицание через not, не через don't."
      }
    ],
    "translations": [
      {
        "prompt": "Мы готовы.",
        "answers": [
          "We are ready."
        ],
        "why": "We + are + прилагательное."
      },
      {
        "prompt": "Она не дома.",
        "answers": [
          "She is not at home.",
          "She isn't at home."
        ],
        "why": "Отрицание через is not / isn't."
      }
    ],
    "choices": [],
    "markers": [
      "am / is / are",
      "isn’t / aren’t",
      "Are you...?",
      "Is she...?"
    ],
    "pitfalls": [
      {
        "wrong": "I is a student.",
        "right": "I am a student.",
        "why": "С I используем am."
      },
      {
        "wrong": "Are she here?",
        "right": "Is she here?",
        "why": "С she нужна форма is."
      }
    ]
  },
  "extra-1": {
    "id": "extra-1",
    "title": "Артикли a, an, the",
    "desc": "Как сказать «какой-то» и «тот самый»",
    "formula": "a + согласный звук\nan + гласный звук\nthe + известный объект",
    "sections": [
      {
        "title": "A / an = один из многих",
        "body": "Артикль a/an ставим перед исчисляемым существительным в единственном числе, когда называем его впервые или как одного из многих.",
        "model": "I need a pen."
      },
      {
        "title": "Выбирай по звуку, не по букве",
        "body": "An перед гласным звуком, a перед согласным: an hour (h не произносят), a university (звучит как /juː/).",
        "model": "She is an engineer."
      },
      {
        "title": "The = известный предмет",
        "body": "The используют, когда собеседнику понятно, о каком конкретном предмете речь, или когда объект уникален.",
        "model": "The laptop on the desk is mine."
      },
      {
        "title": "Когда без артикля",
        "body": "Обычно не ставим артикль перед множественным числом и неисчисляемым существительным, если говорим в целом.",
        "model": "I like coffee. Dogs are friendly."
      }
    ],
    "examples": [
      [
        "I have a question.",
        "У меня есть вопрос."
      ],
      [
        "She is an artist.",
        "Она художница."
      ],
      [
        "I saw a dog yesterday.",
        "Вчера я увидел собаку."
      ],
      [
        "The dog was friendly.",
        "Та собака была дружелюбной."
      ],
      [
        "He works at a university.",
        "Он работает в университете."
      ],
      [
        "I waited for an hour.",
        "Я ждал час."
      ],
      [
        "The sun is bright today.",
        "Сегодня яркое солнце."
      ],
      [
        "We need some water.",
        "Нам нужна вода."
      ],
      [
        "Books are expensive.",
        "Книги дорогие."
      ],
      [
        "Please close the door.",
        "Пожалуйста, закрой дверь."
      ]
    ],
    "blanks": [
      {
        "prompt": "I have ___ idea.",
        "answers": [
          "an"
        ],
        "why": "Idea начинается с гласного звука."
      },
      {
        "prompt": "We need ___ taxi.",
        "answers": [
          "a"
        ],
        "why": "Taxi начинается с согласного звука."
      },
      {
        "prompt": "___ moon looks beautiful.",
        "answers": [
          "The"
        ],
        "why": "Луна уникальна в данном контексте."
      },
      {
        "prompt": "He is ___ honest man.",
        "answers": [
          "an"
        ],
        "why": "В honest не произносится h."
      },
      {
        "prompt": "She works at ___ university.",
        "answers": [
          "a"
        ],
        "why": "University начинается со звука /j/."
      },
      {
        "prompt": "This is ___ actor.",
        "answers": [
          "an"
        ],
        "why": "Перед actor — an, потому что первый звук гласный."
      }
    ],
    "orders": [
      {
        "answer": "I need a new phone.",
        "prompt": "Мне нужен новый телефон.",
        "why": "A стоит перед новым упоминанием предмета."
      },
      {
        "answer": "The phone is on the desk.",
        "prompt": "Телефон на столе.",
        "why": "The — предмет уже известен."
      },
      {
        "answer": "She is an engineer.",
        "prompt": "Она инженер.",
        "why": "Engineer начинается с гласного звука."
      }
    ],
    "fixes": [
      {
        "source": "I have an car.",
        "answers": [
          "I have a car."
        ],
        "why": "Car начинается с согласного звука."
      },
      {
        "source": "She is a actress.",
        "answers": [
          "She is an actress."
        ],
        "why": "Actress начинается с гласного звука."
      }
    ],
    "translations": [
      {
        "prompt": "Это интересная книга.",
        "answers": [
          "This is an interesting book."
        ],
        "why": "Перед interesting нужен an."
      },
      {
        "prompt": "Где книга?",
        "answers": [
          "Where is the book?"
        ],
        "why": "Речь о конкретной книге: the book."
      }
    ],
    "choices": [
      {
        "q": "I want ___ orange.",
        "choices": [
          "an",
          "a",
          "the"
        ],
        "answer": 0,
        "why": "Orange начинается с гласного звука."
      },
      {
        "q": "___ books on this shelf are mine.",
        "choices": [
          "The",
          "A",
          "An"
        ],
        "answer": 0,
        "why": "Уточнение on this shelf делает книги конкретными."
      }
    ],
    "markers": [
      "a",
      "an",
      "the",
      "без артикля"
    ],
    "pitfalls": [
      {
        "wrong": "an university",
        "right": "a university",
        "why": "Выбираем по звуку /juː/, не по первой букве."
      },
      {
        "wrong": "a hour",
        "right": "an hour",
        "why": "Начальный h не читается."
      }
    ]
  },
  "plurals": {
    "id": "plurals",
    "title": "Множественное число",
    "desc": "Один предмет и несколько: -s, -es, irregular",
    "formula": "one book → two books\nbox → boxes\nchild → children",
    "sections": [
      {
        "title": "Обычно добавляй -s",
        "body": "К большинству исчисляемых существительных прибавляется -s: one ticket → two tickets. У глагола тут нет связи с окончанием.",
        "model": "one file → two files"
      },
      {
        "title": "Когда нужно -es",
        "body": "После -s, -sh, -ch, -x, часто -o, добавляем -es: boxes, dishes, watches. У слов на согласную + y: city → cities.",
        "model": "one bus → two buses"
      },
      {
        "title": "Неправильное множественное число",
        "body": "Некоторые слова меняются по особым правилам: man → men, woman → women, child → children, person → people, mouse → mice.",
        "model": "One child, two children."
      },
      {
        "title": "Согласование с глаголом",
        "body": "С множественным числом употребляй are / have и без -s в обычном Present Simple: The students are here. They work.",
        "model": "The tickets are ready."
      }
    ],
    "examples": [
      [
        "I have two cats.",
        "У меня две кошки."
      ],
      [
        "There are three boxes.",
        "Там три коробки."
      ],
      [
        "The children are outside.",
        "Дети на улице."
      ],
      [
        "Two women are waiting.",
        "Две женщины ждут."
      ],
      [
        "Five people work here.",
        "Здесь работают пять человек."
      ],
      [
        "We have four classes today.",
        "Сегодня у нас четыре занятия."
      ],
      [
        "The cities are big.",
        "Города большие."
      ],
      [
        "These watches are expensive.",
        "Эти часы дорогие."
      ],
      [
        "My feet are cold.",
        "У меня мёрзнут ноги."
      ],
      [
        "The men are talking.",
        "Мужчины разговаривают."
      ]
    ],
    "blanks": [
      {
        "prompt": "One ticket, two ___.",
        "answers": [
          "tickets"
        ],
        "why": "В обычном случае добавляем -s."
      },
      {
        "prompt": "One box, three ___.",
        "answers": [
          "boxes"
        ],
        "why": "После x добавляем -es."
      },
      {
        "prompt": "One child, two ___.",
        "answers": [
          "children"
        ],
        "why": "Child имеет особую форму children."
      },
      {
        "prompt": "One city, many ___.",
        "answers": [
          "cities"
        ],
        "why": "После согласной y меняется на ies."
      },
      {
        "prompt": "One woman, two ___.",
        "answers": [
          "women"
        ],
        "why": "Неправильная форма women."
      },
      {
        "prompt": "The people ___ here.",
        "answers": [
          "are"
        ],
        "why": "People — множественное число."
      }
    ],
    "orders": [
      {
        "answer": "The children are happy.",
        "prompt": "Дети счастливы.",
        "why": "Children — уже множественное число."
      },
      {
        "answer": "I have two boxes.",
        "prompt": "У меня две коробки.",
        "why": "После x добавляем -es."
      },
      {
        "answer": "Three people work here.",
        "prompt": "Здесь работают три человека.",
        "why": "People — множественное число."
      }
    ],
    "fixes": [
      {
        "source": "I have two childs.",
        "answers": [
          "I have two children."
        ],
        "why": "Child → children."
      },
      {
        "source": "The boxes is heavy.",
        "answers": [
          "The boxes are heavy."
        ],
        "why": "Множественное число требует are."
      }
    ],
    "translations": [
      {
        "prompt": "У меня две собаки.",
        "answers": [
          "I have two dogs."
        ],
        "why": "Dogs с окончанием -s."
      },
      {
        "prompt": "Эти дети здесь.",
        "answers": [
          "These children are here."
        ],
        "why": "Children — множественное число, are."
      }
    ],
    "choices": [
      {
        "q": "One dish, two ___.",
        "choices": [
          "dishes",
          "dishs",
          "dishies"
        ],
        "answer": 0,
        "why": "После sh добавляется -es."
      },
      {
        "q": "One person, two ___.",
        "choices": [
          "people",
          "persons'",
          "peoples"
        ],
        "answer": 0,
        "why": "Обычное множественное число person — people."
      },
      {
        "q": "One baby, two ___.",
        "choices": [
          "babies",
          "babys",
          "babyes"
        ],
        "answer": 0,
        "why": "Согласная + y превращается в ies."
      },
      {
        "q": "The ___ are sleeping.",
        "choices": [
          "cats",
          "cat's",
          "cat"
        ],
        "answer": 0,
        "why": "Множественное число cats без апострофа."
      },
      {
        "q": "My ___ hurt.",
        "choices": [
          "feet",
          "foots",
          "feets"
        ],
        "answer": 0,
        "why": "Foot → feet."
      },
      {
        "q": "Three ___ are in the room.",
        "choices": [
          "men",
          "mans",
          "man"
        ],
        "answer": 0,
        "why": "Man → men."
      },
      {
        "q": "They have two ___.",
        "choices": [
          "watches",
          "watchs",
          "watchies"
        ],
        "answer": 0,
        "why": "После -ch добавляем -es."
      }
    ],
    "markers": [
      "one / two",
      "many",
      "these / those"
    ],
    "pitfalls": [
      {
        "wrong": "two childs",
        "right": "two children",
        "why": "Child → children, не childs."
      },
      {
        "wrong": "three boxs",
        "right": "three boxes",
        "why": "После x добавляется -es."
      }
    ]
  },
  "extra-2": {
    "id": "extra-2",
    "title": "There is / There are",
    "desc": "Как сказать, что что-то находится где-то",
    "formula": "(+) There is a book / There are books\n(-) There isn't / There aren't\n(?) Is there...? / Are there...?",
    "sections": [
      {
        "title": "Существование, а не принадлежность",
        "body": "There is / there are означает «есть, находится». Это не то же самое, что have (иметь).",
        "model": "There is a pharmacy nearby."
      },
      {
        "title": "Выбор по числу",
        "body": "There is + единственное число или неисчисляемое; there are + множественное. There is water, но there are bottles.",
        "model": "There are two buses."
      },
      {
        "title": "Вопрос и отрицание",
        "body": "В вопросе выносим is/are вперёд; в отрицании добавляем not, часто any с множественным числом.",
        "model": "Is there a problem? There aren't any problems."
      },
      {
        "title": "Место в конце",
        "body": "Часто добавляем обстоятельство места: on the table, in the room, near the station.",
        "model": "There is a cafe near my home."
      }
    ],
    "examples": [
      [
        "There is a bank near here.",
        "Рядом есть банк."
      ],
      [
        "There are two chairs in the room.",
        "В комнате два стула."
      ],
      [
        "Is there a problem?",
        "Есть проблема?"
      ],
      [
        "There isn't any milk.",
        "Молока нет."
      ],
      [
        "Are there any tickets left?",
        "Остались билеты?"
      ],
      [
        "There is some water on the table.",
        "На столе есть вода."
      ],
      [
        "There are many people outside.",
        "На улице много людей."
      ],
      [
        "There is an email for you.",
        "Для тебя есть письмо."
      ],
      [
        "There aren't any buses today.",
        "Сегодня автобусов нет."
      ],
      [
        "Is there a pharmacy nearby?",
        "Рядом есть аптека?"
      ]
    ],
    "blanks": [
      {
        "prompt": "There ___ a store nearby.",
        "answers": [
          "is"
        ],
        "why": "Единственное число a store."
      },
      {
        "prompt": "There ___ two stores.",
        "answers": [
          "are"
        ],
        "why": "Two stores — множественное число."
      },
      {
        "prompt": "___ there any questions?",
        "answers": [
          "Are"
        ],
        "why": "С questions нужна форма are."
      },
      {
        "prompt": "There ___ not a problem.",
        "answers": [
          "is"
        ],
        "why": "A problem — один предмет."
      },
      {
        "prompt": "There is ___ water in the glass.",
        "answers": [
          "some"
        ],
        "why": "В утверждении с water часто some."
      },
      {
        "prompt": "There ___ any rooms available.",
        "answers": [
          "aren't",
          "are not"
        ],
        "why": "Множественное отрицание: there aren't."
      }
    ],
    "orders": [
      {
        "answer": "There is a shop nearby.",
        "prompt": "Поблизости есть магазин.",
        "why": "There is + singular."
      },
      {
        "answer": "Are there any questions?",
        "prompt": "Есть вопросы?",
        "why": "Вопрос с множественным числом."
      },
      {
        "answer": "There are three files.",
        "prompt": "Есть три файла.",
        "why": "There are + plural."
      }
    ],
    "fixes": [
      {
        "source": "There is two chairs.",
        "answers": [
          "There are two chairs."
        ],
        "why": "Two chairs требует are."
      },
      {
        "source": "There are a problem.",
        "answers": [
          "There is a problem."
        ],
        "why": "A problem — единственное число."
      }
    ],
    "translations": [
      {
        "prompt": "В комнате есть кошка.",
        "answers": [
          "There is a cat in the room."
        ],
        "why": "Единственное число → there is."
      },
      {
        "prompt": "Остались вопросы?",
        "answers": [
          "Are there any questions left?"
        ],
        "why": "Вопрос с множественным числом → are there."
      }
    ],
    "choices": [
      {
        "q": "There ___ some milk in the fridge.",
        "choices": [
          "is",
          "are",
          "have"
        ],
        "answer": 0,
        "why": "Milk неисчисляемо, поэтому there is."
      },
      {
        "q": "___ there three desks?",
        "choices": [
          "Are",
          "Is",
          "Do"
        ],
        "answer": 0,
        "why": "С plural desks вопрос начинается с Are there...?"
      }
    ],
    "markers": [
      "nearby",
      "in the room",
      "on the table",
      "any"
    ],
    "pitfalls": [
      {
        "wrong": "There is two cars.",
        "right": "There are two cars.",
        "why": "После two нужно are."
      },
      {
        "wrong": "Is there many people?",
        "right": "Are there many people?",
        "why": "People — множественное число."
      }
    ]
  },
  "have-has": {
    "id": "have-has",
    "title": "Have / Has",
    "desc": "Как говорить о вещах, семье, опыте и отношениях",
    "formula": "I / you / we / they have\nhe / she / it has\nDo you have...? / Does she have...?",
    "sections": [
      {
        "title": "Have означает «иметь»",
        "body": "Говорим о вещах, семье, занятиях и возможностях: I have a car; I have a question. В разговорной речи I have часто означает «у меня есть».",
        "model": "We have a small apartment."
      },
      {
        "title": "С he/she/it употребляй has",
        "body": "В утвердительном Present Simple: She has a brother, He has a phone. После других подлежащих — have.",
        "model": "She has a new laptop."
      },
      {
        "title": "Вопрос через do/does",
        "body": "Do you have a minute? Does he have a car? После does всегда have, не has.",
        "model": "Does she have a key?"
      },
      {
        "title": "Отрицание через don't/doesn't",
        "body": "I don't have time; She doesn't have a car. После doesn't — have.",
        "model": "He doesn't have a ticket."
      }
    ],
    "examples": [
      [
        "I have a question.",
        "У меня есть вопрос."
      ],
      [
        "She has a brother.",
        "У неё есть брат."
      ],
      [
        "He has two cats.",
        "У него две кошки."
      ],
      [
        "We have a meeting today.",
        "Сегодня у нас встреча."
      ],
      [
        "They have a new car.",
        "У них новая машина."
      ],
      [
        "Do you have a minute?",
        "У тебя есть минутка?"
      ],
      [
        "Does she have a key?",
        "У неё есть ключ?"
      ],
      [
        "I don't have cash.",
        "У меня нет наличных."
      ],
      [
        "He doesn't have a ticket.",
        "У него нет билета."
      ],
      [
        "My friend has a job.",
        "У моего друга есть работа."
      ]
    ],
    "blanks": [
      {
        "prompt": "I ___ a problem.",
        "answers": [
          "have"
        ],
        "why": "С I используется have."
      },
      {
        "prompt": "She ___ a dog.",
        "answers": [
          "has"
        ],
        "why": "She требует has."
      },
      {
        "prompt": "___ you have a pen?",
        "answers": [
          "Do"
        ],
        "why": "Вопрос с you начинается с Do."
      },
      {
        "prompt": "Does he ___ a car?",
        "answers": [
          "have"
        ],
        "why": "После does ставим have."
      },
      {
        "prompt": "We don't ___ time.",
        "answers": [
          "have"
        ],
        "why": "После don't остаётся have."
      },
      {
        "prompt": "My mother ___ two jobs.",
        "answers": [
          "has"
        ],
        "why": "Подлежащее my mother = she."
      }
    ],
    "orders": [
      {
        "answer": "She has a new phone.",
        "prompt": "У неё новый телефон.",
        "why": "She + has."
      },
      {
        "answer": "Do you have a question?",
        "prompt": "У тебя есть вопрос?",
        "why": "Вопрос Do + you + have."
      },
      {
        "answer": "He doesn't have a car.",
        "prompt": "У него нет машины.",
        "why": "После doesn't — have."
      }
    ],
    "fixes": [
      {
        "source": "He have a car.",
        "answers": [
          "He has a car."
        ],
        "why": "В утверждении he has."
      },
      {
        "source": "Does she has a pen?",
        "answers": [
          "Does she have a pen?"
        ],
        "why": "После does — have."
      }
    ],
    "translations": [
      {
        "prompt": "У меня есть брат.",
        "answers": [
          "I have a brother."
        ],
        "why": "I have — «у меня есть»."
      },
      {
        "prompt": "У неё нет машины.",
        "answers": [
          "She doesn't have a car.",
          "She does not have a car."
        ],
        "why": "После doesn't используется have."
      }
    ],
    "choices": [
      {
        "q": "My brother ___ a bike.",
        "choices": [
          "has",
          "have",
          "having"
        ],
        "answer": 0,
        "why": "My brother = he, поэтому has."
      },
      {
        "q": "___ they have a question?",
        "choices": [
          "Do",
          "Does",
          "Are"
        ],
        "answer": 0,
        "why": "Вопрос с they начинается с do."
      },
      {
        "q": "She doesn't ___ time.",
        "choices": [
          "have",
          "has",
          "having"
        ],
        "answer": 0,
        "why": "Doesn't уже выражает третье лицо."
      },
      {
        "q": "I ___ two sisters.",
        "choices": [
          "have",
          "has",
          "am"
        ],
        "answer": 0,
        "why": "I + have."
      },
      {
        "q": "___ he have a passport?",
        "choices": [
          "Does",
          "Do",
          "Has"
        ],
        "answer": 0,
        "why": "В вопросе Does he have...?"
      },
      {
        "q": "My friends ___ new phones.",
        "choices": [
          "have",
          "has",
          "haves"
        ],
        "answer": 0,
        "why": "My friends = they → have."
      },
      {
        "q": "Does your boss ___ a minute?",
        "choices": [
          "have",
          "has",
          "having"
        ],
        "answer": 0,
        "why": "После does базовая форма have."
      }
    ],
    "markers": [
      "have / has",
      "do / does",
      "don’t / doesn’t"
    ],
    "pitfalls": [
      {
        "wrong": "Does she has time?",
        "right": "Does she have time?",
        "why": "После does — have."
      },
      {
        "wrong": "He don't have a bike.",
        "right": "He doesn't have a bike.",
        "why": "С he используется doesn't."
      }
    ]
  },
  "word-order": {
    "id": "word-order",
    "title": "Порядок слов",
    "desc": "Кто + что делает + с чем и где",
    "formula": "(+) Subject + Verb + Object + Place + Time\n(?) Auxiliary + Subject + Verb...?\n(-) Subject + do/does not + Verb",
    "sections": [
      {
        "title": "В английском важен порядок",
        "body": "Обычное утверждение начинается с подлежащего (кто?), затем глагол (что делает?), затем объект действия. В русском порядок свободнее.",
        "model": "She reads emails."
      },
      {
        "title": "Когда добавлять место и время",
        "body": "Место чаще ставим перед временем: I work at home every day. Короткие наречия частоты обычно перед смысловым глаголом.",
        "model": "I work in Boston on weekdays."
      },
      {
        "title": "Прилагательное перед предметом",
        "body": "В английском прилагательное стоит перед существительным: a new job, an important message.",
        "model": "I have a new laptop."
      },
      {
        "title": "Не строй вопрос как утверждение",
        "body": "Обычный вопрос требует вспомогательного do/does/did или перестановки be/can: Do you work here? / Are you ready?",
        "model": "Does he speak English?"
      }
    ],
    "examples": [
      [
        "I read books every day.",
        "Я читаю книги каждый день."
      ],
      [
        "She works at home.",
        "Она работает дома."
      ],
      [
        "We need your help.",
        "Нам нужна твоя помощь."
      ],
      [
        "He has a new job.",
        "У него новая работа."
      ],
      [
        "They play soccer on Sundays.",
        "Они играют в футбол по воскресеньям."
      ],
      [
        "I study English in the evening.",
        "Я учу английский вечером."
      ],
      [
        "My sister likes coffee.",
        "Моя сестра любит кофе."
      ],
      [
        "The manager checks the report.",
        "Руководитель проверяет отчёт."
      ],
      [
        "She writes emails at work.",
        "Она пишет письма на работе."
      ],
      [
        "We have an important meeting today.",
        "Сегодня у нас важная встреча."
      ]
    ],
    "blanks": [
      {
        "prompt": "She ___ emails every day. (пишет)",
        "answers": [
          "writes"
        ],
        "why": "Глагол идёт сразу за подлежащим."
      },
      {
        "prompt": "We ___ English at home. (учим)",
        "answers": [
          "study"
        ],
        "why": "We + study + объект."
      },
      {
        "prompt": "I have a ___ laptop. (новый)",
        "answers": [
          "new"
        ],
        "why": "Прилагательное стоит перед существительным."
      },
      {
        "prompt": "The manager ___ the report. (проверяет)",
        "answers": [
          "checks"
        ],
        "why": "После подлежащего стоит глагол."
      },
      {
        "prompt": "They play soccer ___ Sundays.",
        "answers": [
          "on"
        ],
        "why": "Время часто идёт в конце."
      },
      {
        "prompt": "___ you work here?",
        "answers": [
          "Do"
        ],
        "why": "Вопрос требует вспомогательного глагола."
      }
    ],
    "orders": [
      {
        "answer": "I study English every day.",
        "prompt": "Я учу английский каждый день.",
        "why": "Кто + действие + объект + время."
      },
      {
        "answer": "She has a new phone.",
        "prompt": "У неё новый телефон.",
        "why": "Прилагательное new перед phone."
      },
      {
        "answer": "We work in the office today.",
        "prompt": "Сегодня мы работаем в офисе.",
        "why": "Место перед временем."
      }
    ],
    "fixes": [
      {
        "source": "Every day English I study.",
        "answers": [
          "I study English every day."
        ],
        "why": "Подлежащее + глагол + объект + время."
      },
      {
        "source": "She likes very coffee.",
        "answers": [
          "She likes coffee very much."
        ],
        "why": "Объект coffee ставим после likes."
      }
    ],
    "translations": [
      {
        "prompt": "Я работаю дома.",
        "answers": [
          "I work at home."
        ],
        "why": "I + work + at home."
      },
      {
        "prompt": "Она читает книги вечером.",
        "answers": [
          "She reads books in the evening."
        ],
        "why": "Глагол после she, время в конце."
      }
    ],
    "choices": [
      {
        "q": "Which sentence is correct?",
        "choices": [
          "I work every day.",
          "Work I every day.",
          "Every day work I"
        ],
        "answer": 0,
        "why": "Нормальный порядок — I work every day."
      },
      {
        "q": "Which order is correct?",
        "choices": [
          "She has a new car.",
          "She a new has car.",
          "Has she a car new."
        ],
        "answer": 0,
        "why": "Прилагательное перед существительным."
      },
      {
        "q": "Where is the time phrase usually?",
        "choices": [
          "At the end.",
          "Before the subject always.",
          "Inside the verb."
        ],
        "answer": 0,
        "why": "Часто обстоятельство времени ставится в конце."
      },
      {
        "q": "Choose the correct sentence.",
        "choices": [
          "We need your help.",
          "We your need help.",
          "Need we your help."
        ],
        "answer": 0,
        "why": "Subject + verb + object."
      },
      {
        "q": "Which is a correct question?",
        "choices": [
          "Do you work here?",
          "You work here do?",
          "Work here you do?"
        ],
        "answer": 0,
        "why": "Do + subject + verb."
      },
      {
        "q": "Choose the normal order.",
        "choices": [
          "I study English at home.",
          "At home English study I.",
          "English I at home study."
        ],
        "answer": 0,
        "why": "I + study + English + place."
      },
      {
        "q": "Where does 'new' go?",
        "choices": [
          "a new job",
          "a job new",
          "new a job"
        ],
        "answer": 0,
        "why": "Прилагательное до существительного."
      }
    ],
    "markers": [
      "subject",
      "verb",
      "object",
      "place",
      "time"
    ],
    "pitfalls": [
      {
        "wrong": "I every day work.",
        "right": "I work every day.",
        "why": "Наречие времени в таком предложении обычно в конце."
      },
      {
        "wrong": "She a book reads.",
        "right": "She reads a book.",
        "why": "Глагол перед дополнением."
      }
    ]
  },
  "present-simple": {
    "id": "present-simple",
    "title": "Present Simple",
    "desc": "Регулярные действия, факты и расписания",
    "formula": "(+) I/you/we/they work; he/she/it works\n(-) I do not work; she does not work\n(?) Do you work? Does she work?",
    "sections": [
      {
        "title": "Когда использовать",
        "body": "Present Simple описывает привычки, регулярные действия, общие факты, расписания. Обычно это не действие именно в данную секунду.",
        "model": "I work five days a week."
      },
      {
        "title": "Окончание -s с he/she/it",
        "body": "Только в утверждении с he/she/it добавляй -s/-es: work → works; watch → watches; study → studies.",
        "model": "He studies every day."
      },
      {
        "title": "Отрицание через don't/doesn't",
        "body": "I/you/we/they don't + базовая форма; he/she/it doesn't + базовая форма. С -s после doesn't уже не пишем.",
        "model": "She doesn't work on Sundays."
      },
      {
        "title": "Вопрос через do / does",
        "body": "В начало обычного вопроса поставь do/does. После does сам смысловой глагол остаётся в базовой форме.",
        "model": "Does he speak English?"
      },
      {
        "title": "Подсказки времени",
        "body": "Usually, often, sometimes, always, never, every day, on Mondays. Эти маркеры часто говорят о регулярности.",
        "model": "I usually drink tea."
      }
    ],
    "examples": [
      [
        "I work every weekday.",
        "Я работаю каждый будний день."
      ],
      [
        "She speaks English.",
        "Она говорит по-английски."
      ],
      [
        "He doesn't like cold weather.",
        "Он не любит холодную погоду."
      ],
      [
        "Do you work remotely?",
        "Ты работаешь удалённо?"
      ],
      [
        "Does she study at night?",
        "Она занимается ночью?"
      ],
      [
        "We often cook at home.",
        "Мы часто готовим дома."
      ],
      [
        "The bank opens at nine.",
        "Банк открывается в девять."
      ],
      [
        "My cat sleeps a lot.",
        "Мой кот много спит."
      ],
      [
        "They don't live in Dallas.",
        "Они не живут в Далласе."
      ],
      [
        "I always check my email.",
        "Я всегда проверяю почту."
      ]
    ],
    "blanks": [
      {
        "prompt": "My sister ___ (work) from home.",
        "answers": [
          "works"
        ],
        "why": "После she добавляем -s."
      },
      {
        "prompt": "He ___ (watch) TV after dinner.",
        "answers": [
          "watches"
        ],
        "why": "После -ch прибавляем -es."
      },
      {
        "prompt": "They ___ (study) English.",
        "answers": [
          "study"
        ],
        "why": "They + базовая форма."
      },
      {
        "prompt": "Does she ___ (like) coffee?",
        "answers": [
          "like"
        ],
        "why": "После does окончание -s не нужно."
      },
      {
        "prompt": "I ___ (not / work) on Sunday.",
        "answers": [
          "don't work",
          "do not work"
        ],
        "why": "Отрицание с I строится через don't."
      },
      {
        "prompt": "We ___ (usually / eat) at home.",
        "answers": [
          "usually eat"
        ],
        "why": "Usually стоит перед смысловым глаголом."
      }
    ],
    "orders": [
      {
        "answer": "She works every morning.",
        "prompt": "Она работает каждое утро.",
        "why": "She + works + время."
      },
      {
        "answer": "Do you like tea?",
        "prompt": "Ты любишь чай?",
        "why": "Do + you + like."
      },
      {
        "answer": "He doesn't play tennis.",
        "prompt": "Он не играет в теннис.",
        "why": "Doesn't + базовая форма."
      }
    ],
    "fixes": [
      {
        "source": "She don't work here.",
        "answers": [
          "She doesn't work here."
        ],
        "why": "С she — doesn't."
      },
      {
        "source": "Does he likes coffee?",
        "answers": [
          "Does he like coffee?"
        ],
        "why": "После does нужна базовая форма."
      }
    ],
    "translations": [
      {
        "prompt": "Он работает каждый день.",
        "answers": [
          "He works every day."
        ],
        "why": "С he в утверждении work → works."
      },
      {
        "prompt": "Ты пьёшь кофе по утрам?",
        "answers": [
          "Do you drink coffee in the morning?"
        ],
        "why": "Вопрос с you начинается с do."
      }
    ],
    "choices": [],
    "markers": [
      "every day",
      "usually",
      "often",
      "sometimes",
      "never",
      "on Mondays"
    ],
    "pitfalls": [
      {
        "wrong": "He work on Fridays.",
        "right": "He works on Fridays.",
        "why": "С he в утверждении нужна -s."
      },
      {
        "wrong": "Does she works?",
        "right": "Does she work?",
        "why": "После does используем базовую форму."
      }
    ]
  },
  "present-cont": {
    "id": "present-cont",
    "title": "Present Continuous",
    "desc": "Что происходит сейчас и какие ситуации временные",
    "formula": "(+) I am working / she is working / they are working\n(-) She isn't working\n(?) Are they working?",
    "sections": [
      {
        "title": "Действие прямо сейчас",
        "body": "Present Continuous — процесс, происходящий в момент речи: now, right now, at the moment. Формула: am/is/are + V-ing.",
        "model": "I am reading right now."
      },
      {
        "title": "Временная ситуация",
        "body": "Действие не обязано идти именно в эту секунду: I'm working on a project this week означает временную занятость.",
        "model": "I'm staying with a friend this month."
      },
      {
        "title": "Правописание -ing",
        "body": "Обычно +ing; make → making (убрать e), run → running (удвоить согласную), lie → lying.",
        "model": "She is making dinner."
      },
      {
        "title": "Чем отличается от Simple",
        "body": "I work at a bank — факт о работе; I'm working today — процесс сегодня. Некоторые состояния, например know или like, обычно не ставят в Continuous.",
        "model": "I know the answer."
      }
    ],
    "examples": [
      [
        "I am studying now.",
        "Я сейчас занимаюсь."
      ],
      [
        "She is cooking dinner.",
        "Она готовит ужин."
      ],
      [
        "They are talking outside.",
        "Они разговаривают на улице."
      ],
      [
        "We aren't working today.",
        "Сегодня мы не работаем."
      ],
      [
        "Are you listening?",
        "Ты слушаешь?"
      ],
      [
        "The phone is ringing.",
        "Телефон звонит."
      ],
      [
        "I'm looking for my keys.",
        "Я ищу ключи."
      ],
      [
        "He is staying in Boston this week.",
        "Он живёт в Бостоне на этой неделе."
      ],
      [
        "It is raining right now.",
        "Прямо сейчас идёт дождь."
      ],
      [
        "She is not sleeping.",
        "Она не спит."
      ]
    ],
    "blanks": [
      {
        "prompt": "He ___ (work) now.",
        "answers": [
          "is working",
          "'s working"
        ],
        "why": "He + is + -ing."
      },
      {
        "prompt": "I ___ (read) at the moment.",
        "answers": [
          "am reading",
          "'m reading"
        ],
        "why": "I am + глагол-ing."
      },
      {
        "prompt": "They ___ (not / study) today.",
        "answers": [
          "aren't studying",
          "are not studying"
        ],
        "why": "They are not + -ing."
      },
      {
        "prompt": "___ you working now?",
        "answers": [
          "Are"
        ],
        "why": "Are + you + V-ing?"
      },
      {
        "prompt": "The cat is ___ (sleep).",
        "answers": [
          "sleeping"
        ],
        "why": "После is идёт -ing форма."
      },
      {
        "prompt": "She is ___ (make) dinner.",
        "answers": [
          "making"
        ],
        "why": "В make убираем конечную e."
      }
    ],
    "orders": [
      {
        "answer": "I am working right now.",
        "prompt": "Я прямо сейчас работаю.",
        "why": "Am + -ing показывает процесс."
      },
      {
        "answer": "Are they coming today?",
        "prompt": "Они сегодня придут?",
        "why": "Are + they + -ing."
      },
      {
        "answer": "She is not sleeping.",
        "prompt": "Она не спит.",
        "why": "Is not + -ing."
      }
    ],
    "fixes": [
      {
        "source": "I working right now.",
        "answers": [
          "I am working right now."
        ],
        "why": "Нельзя пропускать am."
      },
      {
        "source": "He is runing now.",
        "answers": [
          "He is running now."
        ],
        "why": "В run удваивается n."
      }
    ],
    "translations": [
      {
        "prompt": "Я сейчас читаю.",
        "answers": [
          "I am reading now.",
          "I'm reading now."
        ],
        "why": "I am + reading."
      },
      {
        "prompt": "Она не работает сегодня.",
        "answers": [
          "She isn't working today.",
          "She is not working today."
        ],
        "why": "She is not + -ing."
      }
    ],
    "choices": [],
    "markers": [
      "now",
      "right now",
      "at the moment",
      "this week",
      "Look!"
    ],
    "pitfalls": [
      {
        "wrong": "She working now.",
        "right": "She is working now.",
        "why": "Continuous требует is."
      },
      {
        "wrong": "I am knowing him.",
        "right": "I know him.",
        "why": "Know обычно не используют в Continuous."
      }
    ]
  },
  "past-simple": {
    "id": "past-simple",
    "title": "Past Simple",
    "desc": "Что уже случилось: вчера, в прошлом году",
    "formula": "(+) I worked / she went\n(-) I did not work\n(?) Did you work?",
    "sections": [
      {
        "title": "Законченное действие в прошлом",
        "body": "Past Simple относится к завершённым событиям: yesterday, last week, two days ago, in 2020.",
        "model": "I visited my friend yesterday."
      },
      {
        "title": "Правильные и неправильные глаголы",
        "body": "Regular verbs: work → worked, play → played. Неправильные формы нужно учить: go → went, see → saw, buy → bought.",
        "model": "We went to Boston."
      },
      {
        "title": "Отрицание через didn't",
        "body": "Используй didn't + базовая форма глагола: didn't go (не didn't went).",
        "model": "She didn't call me."
      },
      {
        "title": "Вопрос через did",
        "body": "Did + подлежащее + базовая форма: Did you see him? Специальный вопрос: Where did you go?",
        "model": "Did they arrive yesterday?"
      },
      {
        "title": "Глагол be в прошлом",
        "body": "Was с I/he/she/it; were с you/we/they. С be не нужен did: Was she here?",
        "model": "I was tired."
      }
    ],
    "examples": [
      [
        "I called yesterday.",
        "Я звонил вчера."
      ],
      [
        "She went home early.",
        "Она рано ушла домой."
      ],
      [
        "We watched a movie last night.",
        "Вчера вечером мы смотрели фильм."
      ],
      [
        "Did you finish the task?",
        "Ты закончил задачу?"
      ],
      [
        "He didn't come to work.",
        "Он не пришёл на работу."
      ],
      [
        "They bought a car in 2022.",
        "Они купили машину в 2022 году."
      ],
      [
        "I was at home on Sunday.",
        "В воскресенье я был дома."
      ],
      [
        "Were you tired?",
        "Ты устал?"
      ],
      [
        "My sister studied yesterday.",
        "Моя сестра вчера занималась."
      ],
      [
        "We didn't see the message.",
        "Мы не видели сообщение."
      ]
    ],
    "blanks": [
      {
        "prompt": "I ___ (go) home early yesterday.",
        "answers": [
          "went"
        ],
        "why": "Past Simple go → went."
      },
      {
        "prompt": "She ___ (work) last night.",
        "answers": [
          "worked"
        ],
        "why": "Правильный глагол +ed."
      },
      {
        "prompt": "Did he ___ (call) you?",
        "answers": [
          "call"
        ],
        "why": "После did используем V1."
      },
      {
        "prompt": "We ___ (not / see) the movie.",
        "answers": [
          "didn't see",
          "did not see"
        ],
        "why": "После didn't — see, не saw."
      },
      {
        "prompt": "They ___ (buy) a laptop.",
        "answers": [
          "bought"
        ],
        "why": "Buy → bought."
      },
      {
        "prompt": "I ___ tired yesterday.",
        "answers": [
          "was"
        ],
        "why": "В прошлом с I — was."
      }
    ],
    "orders": [
      {
        "answer": "We went home yesterday.",
        "prompt": "Вчера мы пошли домой.",
        "why": "Went — прошедшая форма go."
      },
      {
        "answer": "Did she call you?",
        "prompt": "Она тебе звонила?",
        "why": "Did + she + базовый глагол."
      },
      {
        "answer": "He didn't work on Friday.",
        "prompt": "Он не работал в пятницу.",
        "why": "Didn't + work."
      }
    ],
    "fixes": [
      {
        "source": "Did you went home?",
        "answers": [
          "Did you go home?"
        ],
        "why": "После did используется go."
      },
      {
        "source": "She goed to school.",
        "answers": [
          "She went to school."
        ],
        "why": "Go — неправильный глагол: went."
      }
    ],
    "translations": [
      {
        "prompt": "Я вчера работал.",
        "answers": [
          "I worked yesterday."
        ],
        "why": "Work → worked."
      },
      {
        "prompt": "Она не купила билет.",
        "answers": [
          "She didn't buy a ticket.",
          "She did not buy a ticket."
        ],
        "why": "Didn't + buy."
      }
    ],
    "choices": [],
    "markers": [
      "yesterday",
      "last week",
      "two days ago",
      "in 2020",
      "ago"
    ],
    "pitfalls": [
      {
        "wrong": "I go yesterday.",
        "right": "I went yesterday.",
        "why": "Для законченного прошлого нужен went."
      },
      {
        "wrong": "Did she called?",
        "right": "Did she call?",
        "why": "После did базовая форма."
      }
    ]
  },
  "future-simple": {
    "id": "future-simple",
    "title": "Future Simple (will)",
    "desc": "Будущее, решения в момент речи и обещания",
    "formula": "(+) I will help / I’ll help\n(-) I will not help / I won't help\n(?) Will you help?",
    "sections": [
      {
        "title": "Решение прямо сейчас",
        "body": "Will часто выражает быстрое решение, обещание, предложение помочь: The phone is ringing — I'll answer it.",
        "model": "I'll help you."
      },
      {
        "title": "Прогноз или мнение",
        "body": "Will подходит для предположений без явных доказательств: I think it will rain tomorrow.",
        "model": "I think you'll like it."
      },
      {
        "title": "Одна форма для всех",
        "body": "I/he/she/we/they will + базовая форма. После will не ставим -s, to и -ing.",
        "model": "She will call later."
      },
      {
        "title": "Вопрос и отрицание",
        "body": "Отрицание: won't (will not). Вопрос: Will + подлежащее + глагол? Короткий ответ: Yes, I will / No, I won't.",
        "model": "Will you be here tomorrow?"
      }
    ],
    "examples": [
      [
        "I'll call you tomorrow.",
        "Я позвоню тебе завтра."
      ],
      [
        "She will help us.",
        "Она нам поможет."
      ],
      [
        "I think it will snow.",
        "Думаю, пойдёт снег."
      ],
      [
        "We won't be late.",
        "Мы не опоздаем."
      ],
      [
        "Will you come tonight?",
        "Ты придёшь сегодня вечером?"
      ],
      [
        "He will send the email.",
        "Он отправит письмо."
      ],
      [
        "I'll open the door.",
        "Я открою дверь."
      ],
      [
        "They will arrive soon.",
        "Они скоро прибудут."
      ],
      [
        "Will it be expensive?",
        "Это будет дорого?"
      ],
      [
        "I won't forget your birthday.",
        "Я не забуду твой день рождения."
      ]
    ],
    "blanks": [
      {
        "prompt": "I ___ call you tonight.",
        "answers": [
          "will"
        ],
        "why": "Will + начальная форма."
      },
      {
        "prompt": "She will ___ (help) you.",
        "answers": [
          "help"
        ],
        "why": "После will базовая форма."
      },
      {
        "prompt": "We ___ be late. (не будем)",
        "answers": [
          "won't",
          "will not"
        ],
        "why": "Отрицание через won't."
      },
      {
        "prompt": "___ you open the window?",
        "answers": [
          "Will"
        ],
        "why": "Вопрос начинается с Will."
      },
      {
        "prompt": "They will ___ (arrive) soon.",
        "answers": [
          "arrive"
        ],
        "why": "После will инфинитив без to."
      },
      {
        "prompt": "I think he ___ like it.",
        "answers": [
          "will"
        ],
        "why": "Прогноз с I think часто через will."
      }
    ],
    "orders": [
      {
        "answer": "I will call you tomorrow.",
        "prompt": "Я позвоню завтра.",
        "why": "Will + call."
      },
      {
        "answer": "Will you help me?",
        "prompt": "Ты поможешь мне?",
        "why": "Will перед подлежащим."
      },
      {
        "answer": "They won't be late.",
        "prompt": "Они не опоздают.",
        "why": "Won't + be."
      }
    ],
    "fixes": [
      {
        "source": "She will goes home.",
        "answers": [
          "She will go home."
        ],
        "why": "После will нет -s."
      },
      {
        "source": "I will to help you.",
        "answers": [
          "I will help you."
        ],
        "why": "После will инфинитив без to."
      }
    ],
    "translations": [
      {
        "prompt": "Я помогу тебе.",
        "answers": [
          "I will help you.",
          "I'll help you."
        ],
        "why": "Will + help."
      },
      {
        "prompt": "Ты придёшь завтра?",
        "answers": [
          "Will you come tomorrow?"
        ],
        "why": "Вопрос Will + you + come."
      }
    ],
    "choices": [
      {
        "q": "She ___ arrive tomorrow.",
        "choices": [
          "will",
          "is",
          "do"
        ],
        "answer": 0,
        "why": "Future Simple: will + базовая форма."
      },
      {
        "q": "Will they ___ on time?",
        "choices": [
          "be",
          "are",
          "being"
        ],
        "answer": 0,
        "why": "После will — be."
      },
      {
        "q": "I ___ forget it. (не забуду)",
        "choices": [
          "won't",
          "don't",
          "am not"
        ],
        "answer": 0,
        "why": "Will not → won't."
      },
      {
        "q": "___ you help me?",
        "choices": [
          "Will",
          "Do",
          "Are"
        ],
        "answer": 0,
        "why": "О будущем вопрос с Will."
      },
      {
        "q": "I think it ___ rain.",
        "choices": [
          "will",
          "is",
          "does"
        ],
        "answer": 0,
        "why": "Прогноз — will."
      },
      {
        "q": "He will ___ you later.",
        "choices": [
          "call",
          "calls",
          "called"
        ],
        "answer": 0,
        "why": "После will base verb."
      },
      {
        "q": "Choose the correct sentence.",
        "choices": [
          "They will come.",
          "They will to come.",
          "They will coming."
        ],
        "answer": 0,
        "why": "После will — V1 без to."
      }
    ],
    "markers": [
      "tomorrow",
      "soon",
      "later",
      "I think",
      "I promise"
    ],
    "pitfalls": [
      {
        "wrong": "He will goes.",
        "right": "He will go.",
        "why": "После will нет -s."
      },
      {
        "wrong": "Will she to call?",
        "right": "Will she call?",
        "why": "После will не нужен to."
      }
    ]
  },
  "extra-3": {
    "id": "extra-3",
    "title": "Can / Can’t",
    "desc": "Умения, возможности и вежливые просьбы",
    "formula": "(+) I can swim\n(-) She cannot / can’t swim\n(?) Can you swim?",
    "sections": [
      {
        "title": "Can — могу / умею",
        "body": "Can выражает способность или возможность. Для всех лиц форма одинаковая: I can, she can, they can. После него не нужен to.",
        "model": "She can speak Spanish."
      },
      {
        "title": "Вопросы и просьбы",
        "body": "Просто поставь can перед подлежащим: Can you help me? Это может быть вопрос о способности или вежливая просьба.",
        "model": "Can I ask a question?"
      },
      {
        "title": "Отрицание can't / cannot",
        "body": "Используй can't или cannot, а не don't can. Can not в обычном отрицании обычно пишут как cannot.",
        "model": "I can't drive."
      },
      {
        "title": "Не добавляй -s и -ing",
        "body": "После can всегда базовая форма смыслового глагола: can work, can go, can speak.",
        "model": "He can work tonight."
      }
    ],
    "examples": [
      [
        "I can swim.",
        "Я умею плавать."
      ],
      [
        "She can speak English.",
        "Она умеет говорить по-английски."
      ],
      [
        "Can you help me?",
        "Ты можешь мне помочь?"
      ],
      [
        "He can't drive.",
        "Он не умеет водить."
      ],
      [
        "Can I sit here?",
        "Можно здесь сесть?"
      ],
      [
        "We can finish today.",
        "Мы можем закончить сегодня."
      ],
      [
        "They cannot come tomorrow.",
        "Они не могут прийти завтра."
      ],
      [
        "My sister can cook.",
        "Моя сестра умеет готовить."
      ],
      [
        "Can you open the door?",
        "Можешь открыть дверь?"
      ],
      [
        "I can't hear you.",
        "Я тебя не слышу."
      ]
    ],
    "blanks": [
      {
        "prompt": "He can ___ (speak) English.",
        "answers": [
          "speak"
        ],
        "why": "После can базовая форма."
      },
      {
        "prompt": "___ you help me?",
        "answers": [
          "Can"
        ],
        "why": "Can ставится перед you."
      },
      {
        "prompt": "We ___ swim. (не умеем)",
        "answers": [
          "can't",
          "cannot"
        ],
        "why": "Отрицание с can — can't / cannot."
      },
      {
        "prompt": "She can ___ (drive) a car.",
        "answers": [
          "drive"
        ],
        "why": "Без to и -s."
      },
      {
        "prompt": "___ I ask a question?",
        "answers": [
          "Can"
        ],
        "why": "Вежливое разрешение через Can I...?"
      },
      {
        "prompt": "I ___ hear you. (не могу)",
        "answers": [
          "can't",
          "cannot"
        ],
        "why": "Используй can't, не don't can."
      }
    ],
    "orders": [
      {
        "answer": "Can you help me?",
        "prompt": "Можешь мне помочь?",
        "why": "Can + you + help."
      },
      {
        "answer": "She can't drive.",
        "prompt": "Она не умеет водить.",
        "why": "Can't + базовая форма."
      },
      {
        "answer": "We can speak English.",
        "prompt": "Мы умеем говорить по-английски.",
        "why": "Can не меняется по лицу."
      }
    ],
    "fixes": [
      {
        "source": "She cans speak English.",
        "answers": [
          "She can speak English."
        ],
        "why": "После she can, без -s."
      },
      {
        "source": "I don't can swim.",
        "answers": [
          "I can't swim.",
          "I cannot swim."
        ],
        "why": "Can образует отрицание без don't."
      }
    ],
    "translations": [
      {
        "prompt": "Я умею плавать.",
        "answers": [
          "I can swim."
        ],
        "why": "Can + swim."
      },
      {
        "prompt": "Ты можешь мне помочь?",
        "answers": [
          "Can you help me?"
        ],
        "why": "Can стоит перед you."
      }
    ],
    "choices": [
      {
        "q": "He ___ play the piano.",
        "choices": [
          "can",
          "cans",
          "can to"
        ],
        "answer": 0,
        "why": "После he can, без окончания -s."
      },
      {
        "q": "___ I open the window?",
        "choices": [
          "Can",
          "Do can",
          "Am can"
        ],
        "answer": 0,
        "why": "Can I...? — просьба разрешить действие."
      }
    ],
    "markers": [
      "can",
      "can’t",
      "Can I...?",
      "Can you...?"
    ],
    "pitfalls": [
      {
        "wrong": "He can speaks.",
        "right": "He can speak.",
        "why": "После can базовая форма."
      },
      {
        "wrong": "I don't can help.",
        "right": "I can't help.",
        "why": "С can нет don't."
      }
    ]
  },
  "prepositions": {
    "id": "prepositions",
    "title": "Предлоги места и времени",
    "desc": "In, on, at и простые направления",
    "formula": "at 8:00 / on Monday / in July\nin the room / on the desk / at work",
    "sections": [
      {
        "title": "In / on / at для времени",
        "body": "At — точное время (at 7:30); on — конкретный день (on Monday); in — месяц, год, время суток (in July, in 2026, in the morning).",
        "model": "I start work at nine."
      },
      {
        "title": "In / on / at для места",
        "body": "In — внутри, on — на поверхности, at — точка/место деятельности. Сравни in the room, on the desk, at work.",
        "model": "My keys are on the table."
      },
      {
        "title": "Движение и направление",
        "body": "To показывает направление: go to school; from — источник; into — движение внутрь, out of — наружу.",
        "model": "We go to work by bus."
      },
      {
        "title": "Устойчивые сочетания",
        "body": "Есть исключения: at night, on the weekend (AmE), in the morning, at home. Их полезно запоминать готовыми фразами.",
        "model": "I'm at home on weekends."
      }
    ],
    "examples": [
      [
        "I wake up at seven.",
        "Я просыпаюсь в семь."
      ],
      [
        "We meet on Friday.",
        "Мы встречаемся в пятницу."
      ],
      [
        "She was born in July.",
        "Она родилась в июле."
      ],
      [
        "The keys are on the table.",
        "Ключи на столе."
      ],
      [
        "My phone is in my bag.",
        "Телефон у меня в сумке."
      ],
      [
        "He is at work.",
        "Он на работе."
      ],
      [
        "I study in the morning.",
        "Я занимаюсь по утрам."
      ],
      [
        "They travel to Boston.",
        "Они едут в Бостон."
      ],
      [
        "She comes from Canada.",
        "Она из Канады."
      ],
      [
        "We stay home at night.",
        "Ночью мы остаёмся дома."
      ]
    ],
    "blanks": [
      {
        "prompt": "I start ___ eight.",
        "answers": [
          "at"
        ],
        "why": "At — точное время."
      },
      {
        "prompt": "We meet ___ Monday.",
        "answers": [
          "on"
        ],
        "why": "On — дни недели."
      },
      {
        "prompt": "She was born ___ March.",
        "answers": [
          "in"
        ],
        "why": "In — месяцы."
      },
      {
        "prompt": "My notebook is ___ the desk.",
        "answers": [
          "on"
        ],
        "why": "On — на поверхности."
      },
      {
        "prompt": "He is ___ the office.",
        "answers": [
          "in"
        ],
        "why": "In — внутри помещения."
      },
      {
        "prompt": "I work ___ night.",
        "answers": [
          "at"
        ],
        "why": "Готовое выражение at night."
      }
    ],
    "orders": [
      {
        "answer": "We meet on Tuesday.",
        "prompt": "Мы встречаемся во вторник.",
        "why": "On + день недели."
      },
      {
        "answer": "The cat is in the room.",
        "prompt": "Кошка в комнате.",
        "why": "In — внутри."
      },
      {
        "answer": "I wake up at six.",
        "prompt": "Я просыпаюсь в шесть.",
        "why": "At + точное время."
      }
    ],
    "fixes": [
      {
        "source": "I work in Monday.",
        "answers": [
          "I work on Monday."
        ],
        "why": "День недели → on."
      },
      {
        "source": "We meet at July.",
        "answers": [
          "We meet in July."
        ],
        "why": "Месяц → in."
      }
    ],
    "translations": [
      {
        "prompt": "Я работаю по пятницам.",
        "answers": [
          "I work on Fridays."
        ],
        "why": "On + дни недели."
      },
      {
        "prompt": "Книга на столе.",
        "answers": [
          "The book is on the table."
        ],
        "why": "On — на поверхности."
      }
    ],
    "choices": [
      {
        "q": "My class is ___ 10 a.m.",
        "choices": [
          "at",
          "on",
          "in"
        ],
        "answer": 0,
        "why": "Точное время — at."
      },
      {
        "q": "I was born ___ 2005.",
        "choices": [
          "in",
          "at",
          "on"
        ],
        "answer": 0,
        "why": "Год — in."
      },
      {
        "q": "I work ___ Tuesday.",
        "choices": [
          "on",
          "in",
          "at"
        ],
        "answer": 0,
        "why": "День недели — on."
      },
      {
        "q": "The bag is ___ the chair (на стуле).",
        "choices": [
          "on",
          "in",
          "at"
        ],
        "answer": 0,
        "why": "Поверхность — on."
      },
      {
        "q": "She is ___ home.",
        "choices": [
          "at",
          "in",
          "on"
        ],
        "answer": 0,
        "why": "Устойчиво: at home."
      },
      {
        "q": "We go ___ school by bus.",
        "choices": [
          "to",
          "on",
          "from"
        ],
        "answer": 0,
        "why": "Направление — to."
      },
      {
        "q": "He works ___ the morning.",
        "choices": [
          "in",
          "at",
          "on"
        ],
        "answer": 0,
        "why": "Утро — in the morning."
      }
    ],
    "markers": [
      "at 7",
      "on Monday",
      "in July",
      "in the morning",
      "at night"
    ],
    "pitfalls": [
      {
        "wrong": "in Monday",
        "right": "on Monday",
        "why": "On + день недели."
      },
      {
        "wrong": "at 2026",
        "right": "in 2026",
        "why": "In + год."
      }
    ]
  },
  "questions": {
    "id": "questions",
    "title": "Вопросительные предложения",
    "desc": "Yes/No и who, what, where, when, why, how",
    "formula": "Do / Does + subject + verb?\nAm / Is / Are + subject...?\nQuestion word + auxiliary + subject + verb?",
    "sections": [
      {
        "title": "Вопрос с do/does",
        "body": "Для обычных действий в Present Simple сначала ставим Do/Does, затем подлежащее и глагол. После does — базовая форма.",
        "model": "Do you work here?"
      },
      {
        "title": "Вопрос с to be",
        "body": "Если в предложении am/is/are, просто перенеси его в начало; не добавляй do. Are you ready? Is she busy?",
        "model": "Is your colleague online?"
      },
      {
        "title": "Вопросительные слова",
        "body": "Who — кто, what — что, where — где, when — когда, why — почему, how — как. Обычно ставим их перед do/does или am/is/are.",
        "model": "Where do you live?"
      },
      {
        "title": "Короткие ответы",
        "body": "Do you like it? — Yes, I do. / No, I don't. Are you ready? — Yes, I am. Ответ зависит от вспомогательного глагола.",
        "model": "Yes, I do."
      }
    ],
    "examples": [
      [
        "Do you speak English?",
        "Ты говоришь по-английски?"
      ],
      [
        "Does she work here?",
        "Она здесь работает?"
      ],
      [
        "Are you tired?",
        "Ты устал?"
      ],
      [
        "Is it expensive?",
        "Это дорого?"
      ],
      [
        "Where do you live?",
        "Где ты живёшь?"
      ],
      [
        "What does he do?",
        "Чем он занимается?"
      ],
      [
        "When do they start?",
        "Когда они начинают?"
      ],
      [
        "Why are you late?",
        "Почему ты опаздываешь?"
      ],
      [
        "How do you spell your name?",
        "Как пишется твоё имя?"
      ],
      [
        "Who is your manager?",
        "Кто твой руководитель?"
      ]
    ],
    "blanks": [
      {
        "prompt": "___ you work here?",
        "answers": [
          "Do"
        ],
        "why": "Обычный вопрос с you — Do."
      },
      {
        "prompt": "___ she speak English?",
        "answers": [
          "Does"
        ],
        "why": "С she — Does."
      },
      {
        "prompt": "Where ___ you live?",
        "answers": [
          "do"
        ],
        "why": "Вопрос с where и you — do."
      },
      {
        "prompt": "___ they ready?",
        "answers": [
          "Are"
        ],
        "why": "Если сказуемое — ready, нужен be."
      },
      {
        "prompt": "What ___ he do?",
        "answers": [
          "does"
        ],
        "why": "С he смысловой глагол требует does."
      },
      {
        "prompt": "___ is your name?",
        "answers": [
          "What"
        ],
        "why": "What = что / какой."
      }
    ],
    "orders": [
      {
        "answer": "Do you like coffee?",
        "prompt": "Ты любишь кофе?",
        "why": "Do + you + like."
      },
      {
        "answer": "Where does she live?",
        "prompt": "Где она живёт?",
        "why": "Where + does + she + live."
      },
      {
        "answer": "Are they ready?",
        "prompt": "Они готовы?",
        "why": "Are + they + ready."
      }
    ],
    "fixes": [
      {
        "source": "Where you live?",
        "answers": [
          "Where do you live?"
        ],
        "why": "С Present Simple нужен do."
      },
      {
        "source": "Does he works here?",
        "answers": [
          "Does he work here?"
        ],
        "why": "После does базовая форма."
      }
    ],
    "translations": [
      {
        "prompt": "Где ты работаешь?",
        "answers": [
          "Where do you work?"
        ],
        "why": "Where + do + you + work."
      },
      {
        "prompt": "Она готова?",
        "answers": [
          "Is she ready?"
        ],
        "why": "Is перед she."
      }
    ],
    "choices": [
      {
        "q": "___ you like tea?",
        "choices": [
          "Do",
          "Does",
          "Are"
        ],
        "answer": 0,
        "why": "Вопрос с обычным глаголом и you — Do."
      },
      {
        "q": "___ he work in a bank?",
        "choices": [
          "Does",
          "Do",
          "Is"
        ],
        "answer": 0,
        "why": "He + does."
      },
      {
        "q": "Where ___ she live?",
        "choices": [
          "does",
          "do",
          "is"
        ],
        "answer": 0,
        "why": "Where + does + she + V1."
      },
      {
        "q": "___ you tired?",
        "choices": [
          "Are",
          "Do",
          "Does"
        ],
        "answer": 0,
        "why": "С прилагательным нужен to be."
      },
      {
        "q": "What ___ your name?",
        "choices": [
          "is",
          "does",
          "do"
        ],
        "answer": 0,
        "why": "What is your name?"
      },
      {
        "q": "___ are you from?",
        "choices": [
          "Where",
          "When",
          "Why"
        ],
        "answer": 0,
        "why": "Where — откуда / где."
      },
      {
        "q": "How ___ you spell this?",
        "choices": [
          "do",
          "does",
          "are"
        ],
        "answer": 0,
        "why": "How do you spell...?"
      }
    ],
    "markers": [
      "who",
      "what",
      "where",
      "when",
      "why",
      "how"
    ],
    "pitfalls": [
      {
        "wrong": "You work here?",
        "right": "Do you work here?",
        "why": "В нейтральном вопросе Present Simple нужен do."
      },
      {
        "wrong": "What she does?",
        "right": "What does she do?",
        "why": "What + does + she + do."
      }
    ]
  },
  "negatives": {
    "id": "negatives",
    "title": "Отрицательные предложения",
    "desc": "Как сказать «не» с be, do/does, did, can и will",
    "formula": "be + not\ndon’t / doesn’t + verb\ndidn’t + verb\ncan’t / won’t + verb",
    "sections": [
      {
        "title": "Если есть to be",
        "body": "Добавь not сразу после am/is/are: I am not tired, She isn't here, They aren't ready. Не добавляй don't.",
        "model": "She isn't at home."
      },
      {
        "title": "Обычные действия в настоящем",
        "body": "I/you/we/they + don't + базовый глагол; he/she/it + doesn't + базовый глагол.",
        "model": "He doesn't work on Mondays."
      },
      {
        "title": "Прошлое время",
        "body": "Didn't + базовая форма: I didn't go, She didn't call. Не ставь went/called после didn't.",
        "model": "We didn't work yesterday."
      },
      {
        "title": "Модальные глаголы",
        "body": "Can → can't; will → won't. С ними не нужен do/did, и глагол после них в базовой форме.",
        "model": "I can't come. I won't be late."
      }
    ],
    "examples": [
      [
        "I am not tired.",
        "Я не устал."
      ],
      [
        "She isn't at home.",
        "Её нет дома."
      ],
      [
        "We aren't ready.",
        "Мы не готовы."
      ],
      [
        "I don't drink coffee.",
        "Я не пью кофе."
      ],
      [
        "He doesn't work here.",
        "Он здесь не работает."
      ],
      [
        "They don't like the movie.",
        "Им не нравится фильм."
      ],
      [
        "I didn't go yesterday.",
        "Я вчера не ходил."
      ],
      [
        "She didn't call me.",
        "Она мне не позвонила."
      ],
      [
        "I can't drive.",
        "Я не умею водить."
      ],
      [
        "We won't be late.",
        "Мы не опоздаем."
      ]
    ],
    "blanks": [
      {
        "prompt": "She ___ (not / be) home.",
        "answers": [
          "isn't",
          "is not"
        ],
        "why": "С she + be отрицание isn't."
      },
      {
        "prompt": "I ___ like coffee.",
        "answers": [
          "don't",
          "do not"
        ],
        "why": "Обычный глагол с I — don't."
      },
      {
        "prompt": "He ___ work here.",
        "answers": [
          "doesn't",
          "does not"
        ],
        "why": "С he — doesn't."
      },
      {
        "prompt": "We ___ go yesterday.",
        "answers": [
          "didn't",
          "did not"
        ],
        "why": "Для прошлого — didn't."
      },
      {
        "prompt": "She ___ speak French.",
        "answers": [
          "can't",
          "cannot"
        ],
        "why": "С can отрицание can't."
      },
      {
        "prompt": "They ___ be late tomorrow.",
        "answers": [
          "won't",
          "will not"
        ],
        "why": "С will отрицание won't."
      }
    ],
    "orders": [
      {
        "answer": "I don't like milk.",
        "prompt": "Мне не нравится молоко.",
        "why": "Don't + like."
      },
      {
        "answer": "She isn't a teacher.",
        "prompt": "Она не учитель.",
        "why": "Is not + дополнение."
      },
      {
        "answer": "We didn't go yesterday.",
        "prompt": "Мы не ходили вчера.",
        "why": "Didn't + go."
      }
    ],
    "fixes": [
      {
        "source": "He don't work here.",
        "answers": [
          "He doesn't work here."
        ],
        "why": "He + doesn't."
      },
      {
        "source": "She didn't went home.",
        "answers": [
          "She didn't go home."
        ],
        "why": "После didn't нужна базовая форма."
      }
    ],
    "translations": [
      {
        "prompt": "Я не люблю кофе.",
        "answers": [
          "I don't like coffee.",
          "I do not like coffee."
        ],
        "why": "Don't + like."
      },
      {
        "prompt": "Он не пришёл вчера.",
        "answers": [
          "He didn't come yesterday.",
          "He did not come yesterday."
        ],
        "why": "Didn't + come, не came."
      }
    ],
    "choices": [
      {
        "q": "She ___ at work.",
        "choices": [
          "isn't",
          "doesn't",
          "don't"
        ],
        "answer": 0,
        "why": "С местом используем to be: isn't."
      },
      {
        "q": "He ___ like tea.",
        "choices": [
          "doesn't",
          "don't",
          "isn't"
        ],
        "answer": 0,
        "why": "С he обычный глагол отрицается через doesn't."
      },
      {
        "q": "We ___ go yesterday.",
        "choices": [
          "didn't",
          "don't",
          "wasn't"
        ],
        "answer": 0,
        "why": "Вчера → didn't + go."
      },
      {
        "q": "I ___ swim. (не умею)",
        "choices": [
          "can't",
          "don't can",
          "am not can"
        ],
        "answer": 0,
        "why": "Can образует отрицание как can't."
      },
      {
        "q": "We ___ be late tomorrow.",
        "choices": [
          "won't",
          "don't",
          "aren't"
        ],
        "answer": 0,
        "why": "Будущее will not → won't."
      },
      {
        "q": "I ___ a manager.",
        "choices": [
          "am not",
          "don't",
          "doesn't"
        ],
        "answer": 0,
        "why": "С I + be отрицание am not."
      },
      {
        "q": "They ___ work on weekends.",
        "choices": [
          "don't",
          "doesn't",
          "isn't"
        ],
        "answer": 0,
        "why": "They + don't."
      }
    ],
    "markers": [
      "not",
      "don’t",
      "doesn’t",
      "didn’t",
      "can’t",
      "won’t"
    ],
    "pitfalls": [
      {
        "wrong": "He don't want it.",
        "right": "He doesn't want it.",
        "why": "He + doesn't."
      },
      {
        "wrong": "I didn't knew.",
        "right": "I didn't know.",
        "why": "После didn't — начальная форма."
      }
    ]
  },
  "extra-4": {
    "id": "extra-4",
    "title": "Some / Any",
    "desc": "Как говорить о неопределённом количестве",
    "formula": "some + plural / uncountable (обычно +)\nany + plural / uncountable (обычно ? / -)",
    "sections": [
      {
        "title": "Some — некоторое количество",
        "body": "Some употребляется в утверждениях с множественными исчисляемыми или неисчисляемыми предметами: some apples, some water.",
        "model": "I need some help."
      },
      {
        "title": "Any в вопросах и отрицаниях",
        "body": "Do you have any questions? / I don't have any questions. После any часто не уточняют точное количество.",
        "model": "Is there any milk?"
      },
      {
        "title": "Some в вежливых предложениях",
        "body": "Когда предлагаешь или просишь что-то и ожидаешь положительный ответ, some нормально и в вопросе: Would you like some tea?",
        "model": "Would you like some water?"
      },
      {
        "title": "С единственным числом",
        "body": "Some и any перед исчисляемым единственным обычно не ставим, если имеем в виду неопределённое количество. Нужен a/an: I need a pen.",
        "model": "I have a pen."
      }
    ],
    "examples": [
      [
        "I need some help.",
        "Мне нужна помощь."
      ],
      [
        "We have some apples.",
        "У нас есть яблоки."
      ],
      [
        "Do you have any questions?",
        "У тебя есть вопросы?"
      ],
      [
        "There isn't any milk.",
        "Молока нет."
      ],
      [
        "Would you like some tea?",
        "Хочешь чаю?"
      ],
      [
        "I don't have any money.",
        "У меня нет денег."
      ],
      [
        "She bought some books.",
        "Она купила несколько книг."
      ],
      [
        "Are there any tickets?",
        "Есть билеты?"
      ],
      [
        "Can I have some water?",
        "Можно мне воды?"
      ],
      [
        "We don't need any help.",
        "Нам не нужна помощь."
      ]
    ],
    "blanks": [
      {
        "prompt": "I need ___ help.",
        "answers": [
          "some"
        ],
        "why": "Утверждение — some."
      },
      {
        "prompt": "Do you have ___ questions?",
        "answers": [
          "any"
        ],
        "why": "Вопрос об обычном наличии — any."
      },
      {
        "prompt": "There isn't ___ water.",
        "answers": [
          "any"
        ],
        "why": "Отрицание — any."
      },
      {
        "prompt": "Would you like ___ tea?",
        "answers": [
          "some"
        ],
        "why": "В предложениях часто some."
      },
      {
        "prompt": "We have ___ new files.",
        "answers": [
          "some"
        ],
        "why": "Утвердительное множество — some."
      },
      {
        "prompt": "I don't have ___ free time.",
        "answers": [
          "any"
        ],
        "why": "Отрицательное предложение — any."
      }
    ],
    "orders": [
      {
        "answer": "I have some questions.",
        "prompt": "У меня есть несколько вопросов.",
        "why": "Утвердительное some."
      },
      {
        "answer": "Do you have any water?",
        "prompt": "У тебя есть вода?",
        "why": "Обычный вопрос any."
      },
      {
        "answer": "We don't need any help.",
        "prompt": "Нам не нужна помощь.",
        "why": "Отрицание any."
      }
    ],
    "fixes": [
      {
        "source": "We don't have some milk.",
        "answers": [
          "We don't have any milk."
        ],
        "why": "В отрицании обычно any."
      },
      {
        "source": "We don't have some tickets.",
        "answers": [
          "We don't have any tickets."
        ],
        "why": "В обычном отрицании нужно any."
      }
    ],
    "translations": [
      {
        "prompt": "У меня есть несколько вопросов.",
        "answers": [
          "I have some questions."
        ],
        "why": "Some в утверждении."
      },
      {
        "prompt": "У тебя есть деньги?",
        "answers": [
          "Do you have any money?"
        ],
        "why": "Any в обычном вопросе."
      }
    ],
    "choices": [
      {
        "q": "I have ___ questions.",
        "choices": [
          "some",
          "any",
          "a"
        ],
        "answer": 0,
        "why": "В утверждении с questions обычно some."
      },
      {
        "q": "Would you like ___ coffee?",
        "choices": [
          "some",
          "any",
          "a"
        ],
        "answer": 0,
        "why": "В предложении угощения обычно some."
      }
    ],
    "markers": [
      "some",
      "any",
      "Would you like...?",
      "Do you have...?"
    ],
    "pitfalls": [
      {
        "wrong": "I don't have some time.",
        "right": "I don't have any time.",
        "why": "Отрицание → any."
      },
      {
        "wrong": "Would you like any tea?",
        "right": "Would you like some tea?",
        "why": "В предложении угощения обычно some."
      }
    ]
  },
  "much-many": {
    "id": "much-many",
    "title": "Much / Many / A lot of",
    "desc": "Сколько предметов и сколько вещества",
    "formula": "many + countable plural\nmuch + uncountable\na lot of + both",
    "sections": [
      {
        "title": "Countable или uncountable",
        "body": "Many употребляется с предметами, которые можно посчитать: many books / many tickets. Much с неисчисляемым: much water / much time / much money.",
        "model": "How many tickets?"
      },
      {
        "title": "How much / How many",
        "body": "How many people? — сколько людей; How much water? — сколько воды. How much также используется для цены.",
        "model": "How much is it?"
      },
      {
        "title": "A lot of",
        "body": "A lot of подходит и к исчисляемым, и к неисчисляемым, особенно в обычных утверждениях: a lot of friends / a lot of work.",
        "model": "I have a lot of work."
      },
      {
        "title": "Мало / немного",
        "body": "A few + исчисляемое (a few minutes), a little + неисчисляемое (a little time).",
        "model": "I need a little water."
      }
    ],
    "examples": [
      [
        "How many tickets do you need?",
        "Сколько билетов тебе нужно?"
      ],
      [
        "How much water do you drink?",
        "Сколько воды ты пьёшь?"
      ],
      [
        "I have a lot of work today.",
        "Сегодня у меня много работы."
      ],
      [
        "She has many friends.",
        "У неё много друзей."
      ],
      [
        "We don't have much time.",
        "У нас мало времени."
      ],
      [
        "There are a few chairs.",
        "Там есть несколько стульев."
      ],
      [
        "I have a little money.",
        "У меня есть немного денег."
      ],
      [
        "How much does it cost?",
        "Сколько это стоит?"
      ],
      [
        "Do you have many questions?",
        "У тебя много вопросов?"
      ],
      [
        "We need a lot of information.",
        "Нам нужно много информации."
      ]
    ],
    "blanks": [
      {
        "prompt": "How ___ books do you have?",
        "answers": [
          "many"
        ],
        "why": "Books — исчисляемое множественное число."
      },
      {
        "prompt": "How ___ water do we need?",
        "answers": [
          "much"
        ],
        "why": "Water неисчисляемо."
      },
      {
        "prompt": "I have a ___ of friends.",
        "answers": [
          "lot"
        ],
        "why": "A lot of подходит для количества."
      },
      {
        "prompt": "We don't have ___ time.",
        "answers": [
          "much"
        ],
        "why": "Time — неисчисляемое."
      },
      {
        "prompt": "She has a ___ minutes.",
        "answers": [
          "few"
        ],
        "why": "A few + исчисляемое множество."
      },
      {
        "prompt": "I need a ___ water.",
        "answers": [
          "little"
        ],
        "why": "A little + неисчисляемое."
      }
    ],
    "orders": [
      {
        "answer": "How many cats do you have?",
        "prompt": "Сколько у тебя кошек?",
        "why": "Many + countable plural."
      },
      {
        "answer": "We don't have much time.",
        "prompt": "У нас мало времени.",
        "why": "Much + uncountable."
      },
      {
        "answer": "I have a lot of work.",
        "prompt": "У меня много работы.",
        "why": "A lot of + uncountable."
      }
    ],
    "fixes": [
      {
        "source": "How much books do you have?",
        "answers": [
          "How many books do you have?"
        ],
        "why": "Books исчисляемы — many."
      },
      {
        "source": "How many money do you need?",
        "answers": [
          "How much money do you need?"
        ],
        "why": "Money неисчисляемо — much."
      }
    ],
    "translations": [
      {
        "prompt": "Сколько воды тебе нужно?",
        "answers": [
          "How much water do you need?"
        ],
        "why": "Much + water."
      },
      {
        "prompt": "У неё много друзей.",
        "answers": [
          "She has a lot of friends.",
          "She has many friends."
        ],
        "why": "A lot of или many + friends."
      }
    ],
    "choices": [
      {
        "q": "How ___ questions do you have?",
        "choices": [
          "many",
          "much",
          "a lot"
        ],
        "answer": 0,
        "why": "Вопросы можно посчитать."
      },
      {
        "q": "How ___ time do we have?",
        "choices": [
          "much",
          "many",
          "few"
        ],
        "answer": 0,
        "why": "Time неисчисляемо."
      },
      {
        "q": "She has ___ friends.",
        "choices": [
          "many",
          "much",
          "little"
        ],
        "answer": 0,
        "why": "Friends можно посчитать."
      },
      {
        "q": "I need a ___ of help.",
        "choices": [
          "lot",
          "many",
          "much"
        ],
        "answer": 0,
        "why": "A lot of help."
      },
      {
        "q": "We have a ___ minutes.",
        "choices": [
          "few",
          "little",
          "much"
        ],
        "answer": 0,
        "why": "A few + plural."
      },
      {
        "q": "There is a ___ milk left.",
        "choices": [
          "little",
          "few",
          "many"
        ],
        "answer": 0,
        "why": "A little + uncountable."
      },
      {
        "q": "How much ___ the ticket?",
        "choices": [
          "is",
          "are",
          "do"
        ],
        "answer": 0,
        "why": "How much is the ticket? — цена."
      }
    ],
    "markers": [
      "How many...?",
      "How much...?",
      "a lot of",
      "a few",
      "a little"
    ],
    "pitfalls": [
      {
        "wrong": "How many money?",
        "right": "How much money?",
        "why": "Money неисчисляемо."
      },
      {
        "wrong": "I have much friends.",
        "right": "I have many friends.",
        "why": "Friends можно посчитать."
      }
    ]
  }
};
export function getA1Unit(id:string):A1Unit|undefined{return A1_UNITS[id];}
export function getA1Order(id:string):number{const n=A1_ORDER.indexOf(id);return n<0?999:n;}
export type A1Exercise={id:string;type:'choice'|'fill'|'order'|'fix'|'translate';prompt:string;why:string;choices?:string[];correctIndex?:number;answers:string[];source?:string;words?:string[]};
export function normalizedAnswer(answer:string):string {return answer.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g,'').replace(/\s+/g,' ').trim();}
export function checkA1Answer(answer:string,acceptable:readonly string[]):boolean{return acceptable.some(expected=>normalizedAnswer(answer)===normalizedAnswer(expected));}
function shuffledTokens(sentence:string,seed:number):string[]{
 const tokens=sentence.split(/\s+/);const out=[...tokens];
 // Predictable scramble, stable across rerenders and safe for duplicate words.
 for(let i=out.length-1;i>0;i--){const j=(i*7+seed*13+3)%(i+1);[out[i],out[j]]=[out[j],out[i]];}
 if(out.join(' ')===tokens.join(' '))out.reverse();
 return out;
}
export function buildA1Exercises(lesson:{id:string;questions:A1Choice[]}):A1Exercise[]{
 const unit=getA1Unit(lesson.id);if(!unit)return[];
 const multiple=[...lesson.questions,...unit.choices].slice(0,7);
 const result:A1Exercise[]=[];
 multiple.forEach((q,i)=>result.push({id:`${unit.id}-choice-${i}`,type:'choice',prompt:q.q,why:q.why,choices:q.choices,correctIndex:q.answer,answers:[q.choices[q.answer]]}));
 unit.blanks.forEach((q,i)=>result.push({id:`${unit.id}-fill-${i}`,type:'fill',prompt:q.prompt,why:q.why,answers:q.answers}));
 unit.orders.forEach((q,i)=>result.push({id:`${unit.id}-order-${i}`,type:'order',prompt:'Собери предложение: '+q.prompt,why:q.why,answers:[q.answer],words:shuffledTokens(q.answer,i)}));
 unit.fixes.forEach((q,i)=>result.push({id:`${unit.id}-fix-${i}`,type:'fix',prompt:'Исправь грамматическую ошибку:',source:q.source,why:q.why,answers:q.answers}));
 unit.translations.forEach((q,i)=>result.push({id:`${unit.id}-translate-${i}`,type:'translate',prompt:'Переведи на английский: '+q.prompt,why:q.why,answers:q.answers}));
 return result;
}
// The nine missing A1 subjects are supplied as regular lessons in the existing data model.
export const A1_ADDITIONAL_LESSONS = A1_ORDER
 .filter(id=>!['be','present-simple','present-cont','past-simple','extra-1','extra-2','extra-3','extra-4'].includes(id))
 .map(id=>{
  const unit=A1_UNITS[id];
  return {id:unit.id,level:'A1' as const,title:unit.title,desc:unit.desc,rule:unit.sections[0].body,formula:unit.formula,examples:unit.examples,questions:unit.choices};
 });
