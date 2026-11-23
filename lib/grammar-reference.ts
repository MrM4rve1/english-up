/** Original Russian-language grammar reference, independently authored for English Up. */
import type {Level} from './storage.ts';
import {extraContexts} from './rule-deep-context.ts';
export type RuleCategory='Артикли и существительные'|'Местоимения'|'Количество'|'Основы предложения'|'Предлоги'|'Похожие слова'|'Прилагательные и наречия'|'Глагольные конструкции'|'Времена и планы'|'Сложные предложения';
export type RuleTask={id:string;type:'choice'|'fill'|'fix'|'translate'|'order'|'dictation';prompt:string;options?:string[];answer:string;why:string;hint?:string;accepted?:string[];tokens?:string[]};
export type GrammarRule={id:string;level:Level;category:RuleCategory;title:string;brief:string;notes:string[];uses:{label:string;detail:string;example:string}[];examples:{en:string;ru:string}[];mistake:{wrong:string;right:string;why:string};tasks:RuleTask[]};
const BASE_GRAMMAR_RULES:GrammarRule[]=[
 {
  "id": "articles-a-an",
  "level": "A1",
  "category": "Артикли и существительные",
  "title": "A / An — когда нужен неопределённый артикль",
  "brief": "Перед одним исчисляемым предметом, если говорим о нём впервые или не уточняем, какой именно.",
  "notes": [
   "Артикль определяется первым ЗВУКОМ следующего слова: an hour (h не звучит), a university (звук /j/).",
   "Нельзя использовать a/an перед множественным числом и обычными неисчисляемыми существительными: water, information."
  ],
  "uses": [
   {
    "label": "a",
    "detail": "Перед согласным звуком",
    "example": "a client, a university"
   },
   {
    "label": "an",
    "detail": "Перед гласным звуком",
    "example": "an email, an hour"
   },
   {
    "label": "без a/an",
    "detail": "Множественное или неисчисляемое",
    "example": "I need information."
   }
  ],
  "examples": [
   {
    "en": "I received an email.",
    "ru": "Я получил письмо."
   },
   {
    "en": "She works in a bank.",
    "ru": "Она работает в банке."
   },
   {
    "en": "We need a solution.",
    "ru": "Нам нужно решение."
   },
   {
    "en": "It took an hour.",
    "ru": "Это заняло час."
   }
  ],
  "mistake": {
   "wrong": "She sent a email.",
   "right": "She sent an email.",
   "why": "Email начинается с гласного звука, поэтому an."
  },
  "tasks": [
   {
    "id": "articles-a-an-c1",
    "type": "choice",
    "prompt": "I need ___ answer.",
    "options": [
     "a",
     "an",
     "the"
    ],
    "answer": "an",
    "why": "Answer начинается с гласного звука."
   },
   {
    "id": "articles-a-an-c2",
    "type": "choice",
    "prompt": "She is ___ manager.",
    "options": [
     "an",
     "a",
     "some"
    ],
    "answer": "a",
    "why": "Manager — исчисляемое существительное в единственном числе."
   },
   {
    "id": "articles-a-an-c3",
    "type": "choice",
    "prompt": "It is ___ university.",
    "options": [
     "an",
     "a",
     "—"
    ],
    "answer": "a",
    "why": "University начинается со звука /j/, поэтому a."
   },
   {
    "id": "articles-a-an-f1",
    "type": "fill",
    "prompt": "I waited for ___ hour.",
    "answer": "an",
    "why": "У hour первый звук гласный."
   },
   {
    "id": "articles-a-an-f2",
    "type": "fill",
    "prompt": "He has ___ new job.",
    "answer": "a",
    "why": "Job — исчисляемое единственное число, звук /dʒ/."
   },
   {
    "id": "articles-a-an-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: She sent a email.",
    "answer": "She sent an email.",
    "why": "Email начинается с гласного звука, поэтому an."
   }
  ]
 },
 {
  "id": "articles-the-zero",
  "level": "A1",
  "category": "Артикли и существительные",
  "title": "The и нулевой артикль",
  "brief": "The указывает на известный, конкретный объект. Без артикля часто говорим об общем понятии.",
  "notes": [
   "Используй the, если понятно, о чём речь: I sent a file. The file is ready.",
   "Не ставь the автоматически перед названиями языков, большинством стран и неисчисляемыми словами в общем смысле."
  ],
  "uses": [
   {
    "label": "the",
    "detail": "Конкретный, уже известный объект",
    "example": "The customer called again."
   },
   {
    "label": "без артикля",
    "detail": "Обобщение во множественном числе",
    "example": "Customers need support."
   },
   {
    "label": "the",
    "detail": "Уникальный объект",
    "example": "The sun is shining."
   }
  ],
  "examples": [
   {
    "en": "I like coffee.",
    "ru": "Мне нравится кофе (вообще)."
   },
   {
    "en": "The coffee on the table is cold.",
    "ru": "Кофе на столе холодный."
   },
   {
    "en": "English is useful at work.",
    "ru": "Английский полезен для работы."
   },
   {
    "en": "The report you sent is clear.",
    "ru": "Отчёт, который ты отправил, понятный."
   }
  ],
  "mistake": {
   "wrong": "I speak the English.",
   "right": "I speak English.",
   "why": "Названия языков обычно употребляют без артикля."
  },
  "tasks": [
   {
    "id": "articles-the-zero-c1",
    "type": "choice",
    "prompt": "___ sun is bright today.",
    "options": [
     "A",
     "The",
     "—"
    ],
    "answer": "The",
    "why": "Речь об уникальном объекте."
   },
   {
    "id": "articles-the-zero-c2",
    "type": "choice",
    "prompt": "I like ___ music.",
    "options": [
     "the",
     "a",
     "—"
    ],
    "answer": "—",
    "why": "Music в общем значении без артикля."
   },
   {
    "id": "articles-the-zero-c3",
    "type": "choice",
    "prompt": "Please open ___ file I sent.",
    "options": [
     "the",
     "a",
     "—"
    ],
    "answer": "the",
    "why": "Речь об определённом файле."
   },
   {
    "id": "articles-the-zero-f1",
    "type": "fill",
    "prompt": "She lives in ___ United States.",
    "answer": "the",
    "why": "В названии the United States артикль обязателен."
   },
   {
    "id": "articles-the-zero-f2",
    "type": "fill",
    "prompt": "The book is on ___ table by the door.",
    "answer": "the",
    "why": "Из контекста ясно, о каком столе речь."
   },
   {
    "id": "articles-the-zero-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I speak the English.",
    "answer": "I speak English.",
    "why": "Названия языков обычно употребляют без артикля."
   }
  ]
 },
 {
  "id": "countable",
  "level": "A1",
  "category": "Артикли и существительные",
  "title": "Исчисляемые / неисчисляемые",
  "brief": "Исчисляемые можно посчитать: one ticket, two tickets. Неисчисляемые обычно нельзя считать поштучно.",
  "notes": [
   "Advice, information, furniture, equipment, homework обычно неисчисляемые.",
   "Для количества используй a piece of advice, some information, two pieces of equipment."
  ],
  "uses": [
   {
    "label": "countable",
    "detail": "Считается поштучно",
    "example": "three tickets"
   },
   {
    "label": "uncountable",
    "detail": "Не ставим a/an",
    "example": "some information"
   },
   {
    "label": "a piece of",
    "detail": "Одна единица неисчисляемого",
    "example": "a piece of advice"
   }
  ],
  "examples": [
   {
    "en": "I have two questions.",
    "ru": "У меня два вопроса."
   },
   {
    "en": "We need some information.",
    "ru": "Нам нужна информация."
   },
   {
    "en": "This equipment is new.",
    "ru": "Это оборудование новое."
   },
   {
    "en": "She gave me useful advice.",
    "ru": "Она дала мне полезный совет."
   }
  ],
  "mistake": {
   "wrong": "He gave me an advice.",
   "right": "He gave me some advice.",
   "why": "Advice неисчисляемое; an advice не используется."
  },
  "tasks": [
   {
    "id": "countable-c1",
    "type": "choice",
    "prompt": "Which noun is usually uncountable?",
    "options": [
     "ticket",
     "advice",
     "message"
    ],
    "answer": "advice",
    "why": "Advice не считают как one advice."
   },
   {
    "id": "countable-c2",
    "type": "choice",
    "prompt": "We need ___ information.",
    "options": [
     "an",
     "some",
     "a"
    ],
    "answer": "some",
    "why": "Information — неисчисляемое."
   },
   {
    "id": "countable-c3",
    "type": "choice",
    "prompt": "She bought two ___.",
    "options": [
     "furnitures",
     "chairs",
     "advices"
    ],
    "answer": "chairs",
    "why": "Chair — исчисляемое."
   },
   {
    "id": "countable-f1",
    "type": "fill",
    "prompt": "We need one ___ of advice.",
    "answer": "piece",
    "why": "Одна единица advice — a piece of advice."
   },
   {
    "id": "countable-f2",
    "type": "fill",
    "prompt": "I have three ___. (вопроса)",
    "answer": "questions",
    "why": "Question — исчисляемое, множественное число."
   },
   {
    "id": "countable-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: He gave me an advice.",
    "answer": "He gave me some advice.",
    "why": "Advice неисчисляемое; an advice не используется."
   }
  ]
 },
 {
  "id": "personal-pronouns",
  "level": "A1",
  "category": "Местоимения",
  "title": "I / Me, He / Him, She / Her",
  "brief": "Подлежащее выполняет действие; объект получает действие.",
  "notes": [
   "После глагола или предлога обычно нужен объектный падеж: help me, for him, with us.",
   "В английском подлежащее не опускают: It is raining, а не Is raining."
  ],
  "uses": [
   {
    "label": "subject",
    "detail": "Кто действует",
    "example": "She called."
   },
   {
    "label": "object",
    "detail": "Кого? кому?",
    "example": "I called her."
   },
   {
    "label": "after preposition",
    "detail": "После предлога",
    "example": "for me / with them"
   }
  ],
  "examples": [
   {
    "en": "They work with us.",
    "ru": "Они работают с нами."
   },
   {
    "en": "He sent it to me.",
    "ru": "Он отправил это мне."
   },
   {
    "en": "We help customers.",
    "ru": "Мы помогаем клиентам."
   },
   {
    "en": "I know her.",
    "ru": "Я знаю её."
   }
  ],
  "mistake": {
   "wrong": "Please help I.",
   "right": "Please help me.",
   "why": "После help нужен объектный падеж me."
  },
  "tasks": [
   {
    "id": "personal-pronouns-c1",
    "type": "choice",
    "prompt": "Can you call ___?",
    "options": [
     "I",
     "me",
     "my"
    ],
    "answer": "me",
    "why": "После call требуется объект."
   },
   {
    "id": "personal-pronouns-c2",
    "type": "choice",
    "prompt": "___ is online now.",
    "options": [
     "Him",
     "His",
     "He"
    ],
    "answer": "He",
    "why": "В роли подлежащего — he."
   },
   {
    "id": "personal-pronouns-c3",
    "type": "choice",
    "prompt": "This is for ___.",
    "options": [
     "they",
     "them",
     "their"
    ],
    "answer": "them",
    "why": "После for — объект them."
   },
   {
    "id": "personal-pronouns-f1",
    "type": "fill",
    "prompt": "She sent the message to ___. (мне)",
    "answer": "me",
    "why": "После to — me."
   },
   {
    "id": "personal-pronouns-f2",
    "type": "fill",
    "prompt": "___ are ready to start. (мы)",
    "answer": "We",
    "why": "В роли подлежащего — we."
   },
   {
    "id": "personal-pronouns-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Please help I.",
    "answer": "Please help me.",
    "why": "После help нужен объектный падеж me."
   }
  ]
 },
 {
  "id": "possessive-pronouns",
  "level": "A1",
  "category": "Местоимения",
  "title": "My / Mine, Your / Yours",
  "brief": "My, your, his, her стоят перед существительным; mine, yours, hers заменяют существительное.",
  "notes": [
   "His и its имеют особенности: his употребляется в обеих ролях; its (притяжательное) без апострофа.",
   "It’s означает it is или it has; its означает «его/её» о предмете или животном."
  ],
  "uses": [
   {
    "label": "my / your",
    "detail": "Перед существительным",
    "example": "my phone / your file"
   },
   {
    "label": "mine / yours",
    "detail": "Без следующего существительного",
    "example": "This phone is mine."
   },
   {
    "label": "its / it’s",
    "detail": "Притяжательное / сокращение it is",
    "example": "its name / it’s ready"
   }
  ],
  "examples": [
   {
    "en": "This is my laptop.",
    "ru": "Это мой ноутбук."
   },
   {
    "en": "The laptop is mine.",
    "ru": "Ноутбук мой."
   },
   {
    "en": "Is this your order?",
    "ru": "Это твой заказ?"
   },
   {
    "en": "That order is hers.",
    "ru": "Тот заказ принадлежит ей."
   }
  ],
  "mistake": {
   "wrong": "This is mine laptop.",
   "right": "This is my laptop.",
   "why": "Перед существительным нужен my, не mine."
  },
  "tasks": [
   {
    "id": "possessive-pronouns-c1",
    "type": "choice",
    "prompt": "This ticket is ___.",
    "options": [
     "my",
     "mine",
     "me"
    ],
    "answer": "mine",
    "why": "Без существительного — mine."
   },
   {
    "id": "possessive-pronouns-c2",
    "type": "choice",
    "prompt": "Is this ___ phone?",
    "options": [
     "you",
     "your",
     "yours"
    ],
    "answer": "your",
    "why": "Перед phone — your."
   },
   {
    "id": "possessive-pronouns-c3",
    "type": "choice",
    "prompt": "___ account is blocked.",
    "options": [
     "Their",
     "Theirs",
     "Them"
    ],
    "answer": "Their",
    "why": "Перед account — their."
   },
   {
    "id": "possessive-pronouns-f1",
    "type": "fill",
    "prompt": "The keys are ___. (наши)",
    "answer": "ours",
    "why": "Без существительного — ours."
   },
   {
    "id": "possessive-pronouns-f2",
    "type": "fill",
    "prompt": "___ name is Max. (его)",
    "answer": "His",
    "why": "Перед name — his."
   },
   {
    "id": "possessive-pronouns-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: This is mine laptop.",
    "answer": "This is my laptop.",
    "why": "Перед существительным нужен my, не mine."
   }
  ]
 },
 {
  "id": "reflexive",
  "level": "A2",
  "category": "Местоимения",
  "title": "Myself / Yourself / Each other",
  "brief": "Возвратные местоимения показывают, что действие направлено на самого деятеля; each other — взаимное действие.",
  "notes": [
   "I fixed it myself = я сделал это сам. I hurt myself = я поранил себя.",
   "Не используй myself вместо me в обычных фразах: Please contact me."
  ],
  "uses": [
   {
    "label": "myself",
    "detail": "Я сам / себя",
    "example": "I checked it myself."
   },
   {
    "label": "yourself",
    "detail": "Ты сам / себя",
    "example": "Help yourself."
   },
   {
    "label": "each other",
    "detail": "Друг друга",
    "example": "They help each other."
   }
  ],
  "examples": [
   {
    "en": "I taught myself English.",
    "ru": "Я учил английский самостоятельно."
   },
   {
    "en": "She introduced herself.",
    "ru": "Она представилась."
   },
   {
    "en": "We support each other.",
    "ru": "Мы поддерживаем друг друга."
   },
   {
    "en": "He fixed the issue himself.",
    "ru": "Он сам исправил проблему."
   }
  ],
  "mistake": {
   "wrong": "Please call myself tomorrow.",
   "right": "Please call me tomorrow.",
   "why": "Для обычного дополнения нужен me, а не myself."
  },
  "tasks": [
   {
    "id": "reflexive-c1",
    "type": "choice",
    "prompt": "She made it ___.",
    "options": [
     "herself",
     "her",
     "each other"
    ],
    "answer": "herself",
    "why": "Подчёркиваем, что она сделала сама."
   },
   {
    "id": "reflexive-c2",
    "type": "choice",
    "prompt": "They helped ___.",
    "options": [
     "themselves",
     "each other",
     "himself"
    ],
    "answer": "each other",
    "why": "Взаимное действие — each other."
   },
   {
    "id": "reflexive-c3",
    "type": "choice",
    "prompt": "I looked at ___ in the mirror.",
    "options": [
     "me",
     "my",
     "myself"
    ],
    "answer": "myself",
    "why": "Глядеть на самого себя — myself."
   },
   {
    "id": "reflexive-f1",
    "type": "fill",
    "prompt": "We did it ___. (сами)",
    "answer": "ourselves",
    "why": "Действие самостоятельно — ourselves."
   },
   {
    "id": "reflexive-f2",
    "type": "fill",
    "prompt": "He introduced ___. (себя)",
    "answer": "himself",
    "why": "He → himself."
   },
   {
    "id": "reflexive-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Please call myself tomorrow.",
    "answer": "Please call me tomorrow.",
    "why": "Для обычного дополнения нужен me, а не myself."
   }
  ]
 },
 {
  "id": "this-that",
  "level": "A1",
  "category": "Местоимения",
  "title": "This / That / These / Those",
  "brief": "Эти слова помогают указать на предметы рядом или далеко, в единственном и множественном числе.",
  "notes": [
   "This/that — единственное число; these/those — множественное.",
   "This is… / These are…: согласуй глагол и количество предметов."
  ],
  "uses": [
   {
    "label": "this / these",
    "detail": "Рядом",
    "example": "this email / these emails"
   },
   {
    "label": "that / those",
    "detail": "Дальше от говорящего",
    "example": "that building / those buildings"
   },
   {
    "label": "these are",
    "detail": "Множественное число",
    "example": "These are my keys."
   }
  ],
  "examples": [
   {
    "en": "This message is important.",
    "ru": "Это сообщение важно."
   },
   {
    "en": "Those houses are expensive.",
    "ru": "Те дома дорогие."
   },
   {
    "en": "Are these your documents?",
    "ru": "Это твои документы?"
   },
   {
    "en": "That was a good idea.",
    "ru": "Это была хорошая идея."
   }
  ],
  "mistake": {
   "wrong": "This are my notes.",
   "right": "These are my notes.",
   "why": "Notes — множественное число, поэтому these are."
  },
  "tasks": [
   {
    "id": "this-that-c1",
    "type": "choice",
    "prompt": "___ documents are on my desk. (рядом)",
    "options": [
     "This",
     "These",
     "That"
    ],
    "answer": "These",
    "why": "Documents — множественное число."
   },
   {
    "id": "this-that-c2",
    "type": "choice",
    "prompt": "___ building over there is new.",
    "options": [
     "These",
     "That",
     "Those"
    ],
    "answer": "That",
    "why": "Один удалённый объект — that."
   },
   {
    "id": "this-that-c3",
    "type": "choice",
    "prompt": "___ is my seat.",
    "options": [
     "These",
     "Those",
     "This"
    ],
    "answer": "This",
    "why": "Один близкий предмет — this."
   },
   {
    "id": "this-that-f1",
    "type": "fill",
    "prompt": "___ are my friends. (эти)",
    "answer": "These",
    "why": "Множественное рядом — these."
   },
   {
    "id": "this-that-f2",
    "type": "fill",
    "prompt": "___ cars across the road are red. (те)",
    "answer": "Those",
    "why": "Множественное вдали — those."
   },
   {
    "id": "this-that-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: This are my notes.",
    "answer": "These are my notes.",
    "why": "Notes — множественное число, поэтому these are."
   }
  ]
 },
 {
  "id": "some-any",
  "level": "A1",
  "category": "Количество",
  "title": "Some / Any / No",
  "brief": "Some часто встречается в утверждениях и предложениях, any — в вопросах и отрицаниях.",
  "notes": [
   "В вежливых предложениях можно использовать some: Would you like some tea?",
   "No + существительное значит «никаких»: We have no updates. В стандартном английском не добавляй ещё not."
  ],
  "uses": [
   {
    "label": "some",
    "detail": "Утверждение и предложение",
    "example": "I have some questions."
   },
   {
    "label": "any",
    "detail": "Вопрос / отрицание",
    "example": "Do you have any questions?"
   },
   {
    "label": "no",
    "detail": "Отсутствие чего-либо",
    "example": "There are no messages."
   }
  ],
  "examples": [
   {
    "en": "Do you have any questions?",
    "ru": "У тебя есть вопросы?"
   },
   {
    "en": "I have some good news.",
    "ru": "У меня хорошие новости."
   },
   {
    "en": "We do not have any updates.",
    "ru": "У нас нет обновлений."
   },
   {
    "en": "Would you like some water?",
    "ru": "Хочешь воды?"
   }
  ],
  "mistake": {
   "wrong": "I do not have no time.",
   "right": "I do not have any time.",
   "why": "В стандартном нейтральном отрицании not + any."
  },
  "tasks": [
   {
    "id": "some-any-c1",
    "type": "choice",
    "prompt": "Do you have ___ questions?",
    "options": [
     "some",
     "any",
     "no"
    ],
    "answer": "any",
    "why": "Обычный вопрос — any."
   },
   {
    "id": "some-any-c2",
    "type": "choice",
    "prompt": "I need ___ help.",
    "options": [
     "some",
     "any",
     "no"
    ],
    "answer": "some",
    "why": "Утверждение — some."
   },
   {
    "id": "some-any-c3",
    "type": "choice",
    "prompt": "Would you like ___ coffee?",
    "options": [
     "some",
     "any",
     "no"
    ],
    "answer": "some",
    "why": "В предложении еды/напитка обычно some."
   },
   {
    "id": "some-any-f1",
    "type": "fill",
    "prompt": "There are ___ updates. (никаких)",
    "answer": "no",
    "why": "No updates = обновлений нет."
   },
   {
    "id": "some-any-f2",
    "type": "fill",
    "prompt": "We do not have ___ new tickets.",
    "answer": "any",
    "why": "После отрицания — any."
   },
   {
    "id": "some-any-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I do not have no time.",
    "answer": "I do not have any time.",
    "why": "В стандартном нейтральном отрицании not + any."
   }
  ]
 },
 {
  "id": "much-many",
  "level": "A1",
  "category": "Количество",
  "title": "Much / Many / A lot of",
  "brief": "Many сочетается с исчисляемым множественным числом, much — с неисчисляемым, a lot of — с обоими.",
  "notes": [
   "How many emails? How much time?",
   "В обычных утверждениях a lot of часто звучит естественнее, чем much: I have a lot of work."
  ],
  "uses": [
   {
    "label": "many",
    "detail": "Исчисляемое множественное",
    "example": "many requests"
   },
   {
    "label": "much",
    "detail": "Неисчисляемое",
    "example": "much time"
   },
   {
    "label": "a lot of",
    "detail": "Оба типа",
    "example": "a lot of work / a lot of emails"
   }
  ],
  "examples": [
   {
    "en": "How many users are online?",
    "ru": "Сколько пользователей онлайн?"
   },
   {
    "en": "How much time do we have?",
    "ru": "Сколько у нас времени?"
   },
   {
    "en": "I have a lot of work.",
    "ru": "У меня много работы."
   },
   {
    "en": "There are many options.",
    "ru": "Есть много вариантов."
   }
  ],
  "mistake": {
   "wrong": "How much messages do you have?",
   "right": "How many messages do you have?",
   "why": "Messages — исчисляемое множественное число."
  },
  "tasks": [
   {
    "id": "much-many-c1",
    "type": "choice",
    "prompt": "How ___ money do you need?",
    "options": [
     "many",
     "much",
     "few"
    ],
    "answer": "much",
    "why": "Money — неисчисляемое."
   },
   {
    "id": "much-many-c2",
    "type": "choice",
    "prompt": "How ___ calls did you receive?",
    "options": [
     "many",
     "much",
     "little"
    ],
    "answer": "many",
    "why": "Calls можно посчитать."
   },
   {
    "id": "much-many-c3",
    "type": "choice",
    "prompt": "We have ___ information.",
    "options": [
     "many",
     "a lot of",
     "a few"
    ],
    "answer": "a lot of",
    "why": "A lot of с неисчисляемым."
   },
   {
    "id": "much-many-f1",
    "type": "fill",
    "prompt": "How ___ water is left?",
    "answer": "much",
    "why": "Water — неисчисляемое."
   },
   {
    "id": "much-many-f2",
    "type": "fill",
    "prompt": "How ___ tickets are open?",
    "answer": "many",
    "why": "Tickets — исчисляемое множественное число."
   },
   {
    "id": "much-many-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: How much messages do you have?",
    "answer": "How many messages do you have?",
    "why": "Messages — исчисляемое множественное число."
   }
  ]
 },
 {
  "id": "few-little",
  "level": "A2",
  "category": "Количество",
  "title": "Few / A few / Little / A little",
  "brief": "Few/little означают «мало, почти нет». A few/a little — «немного, но есть».",
  "notes": [
   "Few и a few с исчисляемым множественным; little и a little — с неисчисляемым.",
   "A few friends = несколько друзей (положительный оттенок); few friends = почти нет друзей."
  ],
  "uses": [
   {
    "label": "a few",
    "detail": "Несколько исчисляемых",
    "example": "a few tickets"
   },
   {
    "label": "a little",
    "detail": "Немного неисчисляемого",
    "example": "a little time"
   },
   {
    "label": "few / little",
    "detail": "Недостаточно, почти нет",
    "example": "few replies / little money"
   }
  ],
  "examples": [
   {
    "en": "I have a few minutes.",
    "ru": "У меня есть несколько минут."
   },
   {
    "en": "We have little time.",
    "ru": "У нас почти нет времени."
   },
   {
    "en": "She made a few mistakes.",
    "ru": "Она сделала несколько ошибок."
   },
   {
    "en": "There is a little milk left.",
    "ru": "Осталось немного молока."
   }
  ],
  "mistake": {
   "wrong": "We have a few time.",
   "right": "We have a little time.",
   "why": "Time неисчисляемое, поэтому a little."
  },
  "tasks": [
   {
    "id": "few-little-c1",
    "type": "choice",
    "prompt": "I need ___ advice.",
    "options": [
     "a few",
     "a little",
     "many"
    ],
    "answer": "a little",
    "why": "Advice неисчисляемое."
   },
   {
    "id": "few-little-c2",
    "type": "choice",
    "prompt": "She has ___ friends here. (несколько)",
    "options": [
     "a little",
     "a few",
     "little"
    ],
    "answer": "a few",
    "why": "Friends — исчисляемое."
   },
   {
    "id": "few-little-c3",
    "type": "choice",
    "prompt": "There is ___ hope. (почти нет)",
    "options": [
     "few",
     "little",
     "many"
    ],
    "answer": "little",
    "why": "Hope в таком значении неисчисляемое."
   },
   {
    "id": "few-little-f1",
    "type": "fill",
    "prompt": "Just ___ minutes, please.",
    "answer": "a few",
    "why": "Minutes — исчисляемое множественное."
   },
   {
    "id": "few-little-f2",
    "type": "fill",
    "prompt": "I have ___ patience left. (немного)",
    "answer": "a little",
    "why": "Patience неисчисляемое."
   },
   {
    "id": "few-little-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: We have a few time.",
    "answer": "We have a little time.",
    "why": "Time неисчисляемое, поэтому a little."
   }
  ]
 },
 {
  "id": "there-is-are",
  "level": "A1",
  "category": "Основы предложения",
  "title": "There is / There are",
  "brief": "Используй для «есть/находится» при введении нового предмета или факта.",
  "notes": [
   "There is a problem. There are three problems.",
   "Не путай there («там» / формальное подлежащее) и their («их»)."
  ],
  "uses": [
   {
    "label": "there is",
    "detail": "Единственное / неисчисляемое",
    "example": "There is a delay."
   },
   {
    "label": "there are",
    "detail": "Множественное число",
    "example": "There are two options."
   },
   {
    "label": "is there / are there",
    "detail": "Вопрос",
    "example": "Are there any updates?"
   }
  ],
  "examples": [
   {
    "en": "There is a new message.",
    "ru": "Есть новое сообщение."
   },
   {
    "en": "There are two reasons.",
    "ru": "Есть две причины."
   },
   {
    "en": "Is there any news?",
    "ru": "Есть новости?"
   },
   {
    "en": "There is some water here.",
    "ru": "Здесь есть вода."
   }
  ],
  "mistake": {
   "wrong": "There are a problem.",
   "right": "There is a problem.",
   "why": "A problem — единственное число."
  },
  "tasks": [
   {
    "id": "there-is-are-c1",
    "type": "choice",
    "prompt": "There ___ three tickets.",
    "options": [
     "is",
     "are",
     "am"
    ],
    "answer": "are",
    "why": "Three tickets — множественное число."
   },
   {
    "id": "there-is-are-c2",
    "type": "choice",
    "prompt": "___ there an update?",
    "options": [
     "Are",
     "Is",
     "Do"
    ],
    "answer": "Is",
    "why": "An update — единственное число."
   },
   {
    "id": "there-is-are-c3",
    "type": "choice",
    "prompt": "There ___ some information.",
    "options": [
     "is",
     "are",
     "were"
    ],
    "answer": "is",
    "why": "Information неисчисляемое."
   },
   {
    "id": "there-is-are-f1",
    "type": "fill",
    "prompt": "___ there any questions?",
    "answer": "Are",
    "why": "Questions — множественное число."
   },
   {
    "id": "there-is-are-f2",
    "type": "fill",
    "prompt": "There ___ no time.",
    "answer": "is",
    "why": "Time — неисчисляемое."
   },
   {
    "id": "there-is-are-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: There are a problem.",
    "answer": "There is a problem.",
    "why": "A problem — единственное число."
   }
  ]
 },
 {
  "id": "word-order",
  "level": "A1",
  "category": "Основы предложения",
  "title": "Порядок слов SVO",
  "brief": "В нейтральном английском утверждении обычно подлежащее → глагол → дополнение.",
  "notes": [
   "Обстоятельства частоты (usually, often) обычно стоят перед смысловым глаголом, но после be: She often works; She is often busy.",
   "Место обычно ставим перед временем: I work at home every day."
  ],
  "uses": [
   {
    "label": "S + V + O",
    "detail": "Кто → действие → объект",
    "example": "She checks payments."
   },
   {
    "label": "adverb frequency",
    "detail": "Частота перед обычным глаголом",
    "example": "He often works late."
   },
   {
    "label": "after be",
    "detail": "Частота после be",
    "example": "She is always polite."
   }
  ],
  "examples": [
   {
    "en": "I answer emails every day.",
    "ru": "Я отвечаю на письма каждый день."
   },
   {
    "en": "She usually works at night.",
    "ru": "Она обычно работает ночью."
   },
   {
    "en": "They are often busy.",
    "ru": "Они часто заняты."
   },
   {
    "en": "We meet at the office on Fridays.",
    "ru": "Мы встречаемся в офисе по пятницам."
   }
  ],
  "mistake": {
   "wrong": "I every day check emails.",
   "right": "I check emails every day.",
   "why": "Обычный порядок: действие + дополнение + время."
  },
  "tasks": [
   {
    "id": "word-order-c1",
    "type": "choice",
    "prompt": "Choose the natural word order.",
    "options": [
     "She checks often email.",
     "She often checks email.",
     "Often she checks email every."
    ],
    "answer": "She often checks email.",
    "why": "Often обычно перед смысловым глаголом."
   },
   {
    "id": "word-order-c2",
    "type": "choice",
    "prompt": "Which is correct?",
    "options": [
     "They always are busy.",
     "They are always busy.",
     "They are busy always."
    ],
    "answer": "They are always busy.",
    "why": "После be наречие частоты."
   },
   {
    "id": "word-order-c3",
    "type": "choice",
    "prompt": "Choose the correct sentence.",
    "options": [
     "We speak English at work.",
     "We English speak at work.",
     "Speak we English at work."
    ],
    "answer": "We speak English at work.",
    "why": "Порядок subject–verb–object."
   },
   {
    "id": "word-order-f1",
    "type": "fill",
    "prompt": "She ___ answers quickly. (обычно)",
    "answer": "usually",
    "why": "Перед смысловым глаголом — usually."
   },
   {
    "id": "word-order-f2",
    "type": "fill",
    "prompt": "I work from home every ___.",
    "answer": "day",
    "why": "Every day — обстоятельство частоты."
   },
   {
    "id": "word-order-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I every day check emails.",
    "answer": "I check emails every day.",
    "why": "Обычный порядок: действие + дополнение + время."
   }
  ]
 },
 {
  "id": "do-does",
  "level": "A1",
  "category": "Основы предложения",
  "title": "Do / Does / Did в вопросах",
  "brief": "Для вопросов и отрицаний с обычными глаголами в Simple нужны do/does/did.",
  "notes": [
   "После does/did смысловой глагол стоит в базовой форме: Does she work? Did she call?",
   "С be и модальными глаголами do не нужен: Is she ready? Can you help?"
  ],
  "uses": [
   {
    "label": "do",
    "detail": "I / you / we / they",
    "example": "Do you work here?"
   },
   {
    "label": "does",
    "detail": "he / she / it",
    "example": "Does it work?"
   },
   {
    "label": "did",
    "detail": "Прошедшее для всех лиц",
    "example": "Did they reply?"
   }
  ],
  "examples": [
   {
    "en": "Do you like this job?",
    "ru": "Тебе нравится эта работа?"
   },
   {
    "en": "Does he work remotely?",
    "ru": "Он работает удалённо?"
   },
   {
    "en": "Did you send the file?",
    "ru": "Ты отправил файл?"
   },
   {
    "en": "She does not know.",
    "ru": "Она не знает."
   }
  ],
  "mistake": {
   "wrong": "Does she works here?",
   "right": "Does she work here?",
   "why": "После does используем базовую форму work."
  },
  "tasks": [
   {
    "id": "do-does-c1",
    "type": "choice",
    "prompt": "___ she speak English?",
    "options": [
     "Do",
     "Does",
     "Is"
    ],
    "answer": "Does",
    "why": "С she и обычным глаголом — does."
   },
   {
    "id": "do-does-c2",
    "type": "choice",
    "prompt": "Did he ___ yesterday?",
    "options": [
     "called",
     "calls",
     "call"
    ],
    "answer": "call",
    "why": "После did — call."
   },
   {
    "id": "do-does-c3",
    "type": "choice",
    "prompt": "___ you ready?",
    "options": [
     "Do",
     "Are",
     "Does"
    ],
    "answer": "Are",
    "why": "С be вопрос без do."
   },
   {
    "id": "do-does-f1",
    "type": "fill",
    "prompt": "___ they work on weekends?",
    "answer": "Do",
    "why": "Для they используем вспомогательный глагол do."
   },
   {
    "id": "do-does-f2",
    "type": "fill",
    "prompt": "She does not ___ the answer.",
    "answer": "know",
    "why": "После does not — начальная форма."
   },
   {
    "id": "do-does-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Does she works here?",
    "answer": "Does she work here?",
    "why": "После does используем базовую форму work."
   }
  ]
 },
 {
  "id": "in-on-at-time",
  "level": "A1",
  "category": "Предлоги",
  "title": "In / On / At — время",
  "brief": "At — точный момент, on — день/дата, in — большой промежуток.",
  "notes": [
   "At 8:30, on Monday, in November, in 2026.",
   "Обычные устойчивые сочетания: at night, in the morning, on weekends (AmE), at the weekend (BrE)."
  ],
  "uses": [
   {
    "label": "at",
    "detail": "Часы / точное время",
    "example": "at 7 PM"
   },
   {
    "label": "on",
    "detail": "День / дата",
    "example": "on Friday / on May 2"
   },
   {
    "label": "in",
    "detail": "Месяц / год / часть дня",
    "example": "in June / in 2026 / in the evening"
   }
  ],
  "examples": [
   {
    "en": "The meeting starts at nine.",
    "ru": "Встреча начинается в девять."
   },
   {
    "en": "I work on Mondays.",
    "ru": "Я работаю по понедельникам."
   },
   {
    "en": "We moved in 2025.",
    "ru": "Мы переехали в 2025-м."
   },
   {
    "en": "I study English in the evening.",
    "ru": "Я учу английский вечером."
   }
  ],
  "mistake": {
   "wrong": "We will meet in Monday.",
   "right": "We will meet on Monday.",
   "why": "С днями недели употребляется on."
  },
  "tasks": [
   {
    "id": "in-on-at-time-c1",
    "type": "choice",
    "prompt": "The call starts ___ 10 AM.",
    "options": [
     "in",
     "on",
     "at"
    ],
    "answer": "at",
    "why": "Точное время — at."
   },
   {
    "id": "in-on-at-time-c2",
    "type": "choice",
    "prompt": "I was born ___ March.",
    "options": [
     "in",
     "on",
     "at"
    ],
    "answer": "in",
    "why": "Месяц — in."
   },
   {
    "id": "in-on-at-time-c3",
    "type": "choice",
    "prompt": "We meet ___ Tuesday.",
    "options": [
     "at",
     "on",
     "in"
    ],
    "answer": "on",
    "why": "День недели — on."
   },
   {
    "id": "in-on-at-time-f1",
    "type": "fill",
    "prompt": "The course begins ___ September.",
    "answer": "in",
    "why": "Месяц — in."
   },
   {
    "id": "in-on-at-time-f2",
    "type": "fill",
    "prompt": "See you ___ 6:30.",
    "answer": "at",
    "why": "Точный момент — at."
   },
   {
    "id": "in-on-at-time-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: We will meet in Monday.",
    "answer": "We will meet on Monday.",
    "why": "С днями недели употребляется on."
   }
  ]
 },
 {
  "id": "in-on-at-place",
  "level": "A1",
  "category": "Предлоги",
  "title": "In / On / At — место",
  "brief": "In — внутри пространства, on — на поверхности, at — точка или место как адрес/локация.",
  "notes": [
   "Сравни in the office (в помещении) и at the office (на работе/в офисе как месте).",
   "Устойчивые сочетания нужно запоминать: at home, on the bus, in a car."
  ],
  "uses": [
   {
    "label": "in",
    "detail": "Внутри",
    "example": "in the room / in a car"
   },
   {
    "label": "on",
    "detail": "На поверхности / транспорте",
    "example": "on the table / on a bus"
   },
   {
    "label": "at",
    "detail": "Точка / локация",
    "example": "at the door / at home"
   }
  ],
  "examples": [
   {
    "en": "My laptop is on the desk.",
    "ru": "Ноутбук лежит на столе."
   },
   {
    "en": "She is at home.",
    "ru": "Она сейчас находится дома."
   },
   {
    "en": "They are in the meeting room.",
    "ru": "Они в переговорной."
   },
   {
    "en": "I am on the train.",
    "ru": "Я в поезде."
   }
  ],
  "mistake": {
   "wrong": "I am in home.",
   "right": "I am at home.",
   "why": "Устойчивое выражение: at home."
  },
  "tasks": [
   {
    "id": "in-on-at-place-c1",
    "type": "choice",
    "prompt": "The keys are ___ the table.",
    "options": [
     "at",
     "on",
     "in"
    ],
    "answer": "on",
    "why": "Поверхность — on."
   },
   {
    "id": "in-on-at-place-c2",
    "type": "choice",
    "prompt": "He is ___ the office right now.",
    "options": [
     "in",
     "on",
     "to"
    ],
    "answer": "in",
    "why": "Внутри помещения — in."
   },
   {
    "id": "in-on-at-place-c3",
    "type": "choice",
    "prompt": "She is ___ the bus.",
    "options": [
     "in",
     "at",
     "on"
    ],
    "answer": "on",
    "why": "Для автобуса обычно on."
   },
   {
    "id": "in-on-at-place-f1",
    "type": "fill",
    "prompt": "We are ___ home.",
    "answer": "at",
    "why": "Устойчивое at home."
   },
   {
    "id": "in-on-at-place-f2",
    "type": "fill",
    "prompt": "The book is ___ the bag.",
    "answer": "in",
    "why": "Внутри сумки — in."
   },
   {
    "id": "in-on-at-place-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I am in home.",
    "answer": "I am at home.",
    "why": "Устойчивое выражение: at home."
   }
  ]
 },
 {
  "id": "to-into-onto",
  "level": "A2",
  "category": "Предлоги",
  "title": "To / Into / Onto / From",
  "brief": "To обозначает направление к цели, into — движение внутрь, onto — движение на поверхность, from — исходную точку.",
  "notes": [
   "Go home — обычно без to. Go to work, go to school.",
   "Into описывает движение внутрь; in — положение внутри: walk into the room, be in the room."
  ],
  "uses": [
   {
    "label": "to",
    "detail": "Куда / к кому",
    "example": "go to the bank"
   },
   {
    "label": "into",
    "detail": "Движение внутрь",
    "example": "walk into the room"
   },
   {
    "label": "onto",
    "detail": "Движение на поверхность",
    "example": "put it onto the shelf"
   }
  ],
  "examples": [
   {
    "en": "I am going to the office.",
    "ru": "Я иду в офис."
   },
   {
    "en": "She walked into the room.",
    "ru": "Она вошла в комнату."
   },
   {
    "en": "Move the file from A to B.",
    "ru": "Перемести файл из A в B."
   },
   {
    "en": "He jumped onto the platform.",
    "ru": "Он прыгнул на платформу."
   }
  ],
  "mistake": {
   "wrong": "She went to home.",
   "right": "She went home.",
   "why": "Home после go обычно без to."
  },
  "tasks": [
   {
    "id": "to-into-onto-c1",
    "type": "choice",
    "prompt": "She ran ___ the building. (внутрь)",
    "options": [
     "to",
     "into",
     "on"
    ],
    "answer": "into",
    "why": "Into — внутрь."
   },
   {
    "id": "to-into-onto-c2",
    "type": "choice",
    "prompt": "I got a message ___ my manager.",
    "options": [
     "from",
     "into",
     "onto"
    ],
    "answer": "from",
    "why": "From обозначает источник."
   },
   {
    "id": "to-into-onto-c3",
    "type": "choice",
    "prompt": "Please send it ___ me.",
    "options": [
     "from",
     "to",
     "into"
    ],
    "answer": "to",
    "why": "Кому отправить — to."
   },
   {
    "id": "to-into-onto-f1",
    "type": "fill",
    "prompt": "He walked ___ the kitchen. (внутрь)",
    "answer": "into",
    "why": "Движение внутрь — into."
   },
   {
    "id": "to-into-onto-f2",
    "type": "fill",
    "prompt": "I am going ___ work.",
    "answer": "to",
    "why": "Go to work."
   },
   {
    "id": "to-into-onto-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: She went to home.",
    "answer": "She went home.",
    "why": "Home после go обычно без to."
   }
  ]
 },
 {
  "id": "for-since-during",
  "level": "A2",
  "category": "Предлоги",
  "title": "For / Since / During / While",
  "brief": "For — длительность, since — начальная точка, during — в течение события, while — пока происходит действие.",
  "notes": [
   "Since 2020; for three years; during the meeting; while I was working.",
   "After since обычно указывают начальную дату/событие, а после for — продолжительность."
  ],
  "uses": [
   {
    "label": "for",
    "detail": "Как долго",
    "example": "for two hours"
   },
   {
    "label": "since",
    "detail": "С какого момента",
    "example": "since Monday"
   },
   {
    "label": "during / while",
    "detail": "Существительное / предложение",
    "example": "during the call / while I was calling"
   }
  ],
  "examples": [
   {
    "en": "I have worked here for two years.",
    "ru": "Я работаю здесь два года."
   },
   {
    "en": "She has lived here since 2020.",
    "ru": "Она живёт здесь с 2020 года."
   },
   {
    "en": "Do not talk during the test.",
    "ru": "Не разговаривай во время теста."
   },
   {
    "en": "I listened while she explained.",
    "ru": "Я слушал, пока она объясняла."
   }
  ],
  "mistake": {
   "wrong": "I have been here since three hours.",
   "right": "I have been here for three hours.",
   "why": "Три часа — длительность, нужен for."
  },
  "tasks": [
   {
    "id": "for-since-during-c1",
    "type": "choice",
    "prompt": "I have known him ___ 2021.",
    "options": [
     "since",
     "for",
     "during"
    ],
    "answer": "since",
    "why": "2021 — начальная точка."
   },
   {
    "id": "for-since-during-c2",
    "type": "choice",
    "prompt": "The call lasted ___ an hour.",
    "options": [
     "since",
     "for",
     "while"
    ],
    "answer": "for",
    "why": "Один час — длительность."
   },
   {
    "id": "for-since-during-c3",
    "type": "choice",
    "prompt": "I took notes ___ the meeting.",
    "options": [
     "while",
     "since",
     "during"
    ],
    "answer": "during",
    "why": "После during — существительное."
   },
   {
    "id": "for-since-during-f1",
    "type": "fill",
    "prompt": "We have waited ___ 30 minutes.",
    "answer": "for",
    "why": "Длительность — for."
   },
   {
    "id": "for-since-during-f2",
    "type": "fill",
    "prompt": "I was studying ___ she was sleeping.",
    "answer": "while",
    "why": "После while — часть предложения."
   },
   {
    "id": "for-since-during-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I have been here since three hours.",
    "answer": "I have been here for three hours.",
    "why": "Три часа — длительность, нужен for."
   }
  ]
 },
 {
  "id": "by-with-for",
  "level": "A2",
  "category": "Предлоги",
  "title": "By / With / For — средство, способ и цель",
  "brief": "By часто указывает способ или исполнителя; with — инструмент; for — назначение или получателя.",
  "notes": [
   "By email, by bus, by Monday = не позднее понедельника.",
   "With a pen, for the customer, for two hours."
  ],
  "uses": [
   {
    "label": "by",
    "detail": "Способ / крайний срок",
    "example": "by email / by Friday"
   },
   {
    "label": "with",
    "detail": "Инструмент",
    "example": "with a keyboard"
   },
   {
    "label": "for",
    "detail": "Для кого / зачем",
    "example": "for my team"
   }
  ],
  "examples": [
   {
    "en": "Please reply by email.",
    "ru": "Ответь по электронной почте."
   },
   {
    "en": "I wrote it with a pen.",
    "ru": "Я написал это ручкой."
   },
   {
    "en": "This message is for you.",
    "ru": "Это сообщение для тебя."
   },
   {
    "en": "Finish the report by Friday.",
    "ru": "Закончи отчёт к пятнице."
   }
  ],
  "mistake": {
   "wrong": "I go to work with bus.",
   "right": "I go to work by bus.",
   "why": "Способ передвижения обычно by bus."
  },
  "tasks": [
   {
    "id": "by-with-for-c1",
    "type": "choice",
    "prompt": "Please finish it ___ Monday. (не позже)",
    "options": [
     "on",
     "by",
     "with"
    ],
    "answer": "by",
    "why": "By — крайний срок."
   },
   {
    "id": "by-with-for-c2",
    "type": "choice",
    "prompt": "I fixed it ___ a screwdriver.",
    "options": [
     "with",
     "by",
     "for"
    ],
    "answer": "with",
    "why": "Инструмент — with."
   },
   {
    "id": "by-with-for-c3",
    "type": "choice",
    "prompt": "This gift is ___ you.",
    "options": [
     "by",
     "with",
     "for"
    ],
    "answer": "for",
    "why": "Получатель — for."
   },
   {
    "id": "by-with-for-f1",
    "type": "fill",
    "prompt": "Send it ___ email.",
    "answer": "by",
    "why": "By email — способ связи."
   },
   {
    "id": "by-with-for-f2",
    "type": "fill",
    "prompt": "I typed it ___ my keyboard.",
    "answer": "with",
    "why": "Инструмент — with."
   },
   {
    "id": "by-with-for-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I go to work with bus.",
    "answer": "I go to work by bus.",
    "why": "Способ передвижения обычно by bus."
   }
  ]
 },
 {
  "id": "verb-prepositions",
  "level": "A2",
  "category": "Предлоги",
  "title": "Глагол + предлог",
  "brief": "Некоторые английские глаголы требуют определённый предлог. Его нужно учить вместе с глаголом.",
  "notes": [
   "Listen to, wait for, depend on, look at, apologize for.",
   "Сравни arrive in + город/страна и arrive at + конкретное место."
  ],
  "uses": [
   {
    "label": "listen to",
    "detail": "Слушать кого-то/что-то",
    "example": "listen to music"
   },
   {
    "label": "wait for / depend on",
    "detail": "Ждать / зависеть",
    "example": "wait for a reply"
   },
   {
    "label": "arrive in / at",
    "detail": "Город / точная точка",
    "example": "arrive in Boston / at the station"
   }
  ],
  "examples": [
   {
    "en": "We are waiting for a reply.",
    "ru": "Мы ждём ответа."
   },
   {
    "en": "Listen to the customer carefully.",
    "ru": "Внимательно слушай клиента."
   },
   {
    "en": "It depends on the bank.",
    "ru": "Это зависит от банка."
   },
   {
    "en": "We arrived at the airport.",
    "ru": "Мы прибыли в аэропорт."
   }
  ],
  "mistake": {
   "wrong": "I am waiting your reply.",
   "right": "I am waiting for your reply.",
   "why": "После wait нужен for перед объектом."
  },
  "tasks": [
   {
    "id": "verb-prepositions-c1",
    "type": "choice",
    "prompt": "Please listen ___ me.",
    "options": [
     "at",
     "to",
     "for"
    ],
    "answer": "to",
    "why": "Listen to somebody."
   },
   {
    "id": "verb-prepositions-c2",
    "type": "choice",
    "prompt": "It depends ___ the situation.",
    "options": [
     "on",
     "from",
     "with"
    ],
    "answer": "on",
    "why": "После depend используется предлог on."
   },
   {
    "id": "verb-prepositions-c3",
    "type": "choice",
    "prompt": "We arrived ___ Chicago.",
    "options": [
     "to",
     "at",
     "in"
    ],
    "answer": "in",
    "why": "С городом arrive in."
   },
   {
    "id": "verb-prepositions-f1",
    "type": "fill",
    "prompt": "They are waiting ___ the manager.",
    "answer": "for",
    "why": "После wait нужен предлог for."
   },
   {
    "id": "verb-prepositions-f2",
    "type": "fill",
    "prompt": "She looked ___ the document.",
    "answer": "at",
    "why": "После look перед объектом нужен at."
   },
   {
    "id": "verb-prepositions-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I am waiting your reply.",
    "answer": "I am waiting for your reply.",
    "why": "После wait нужен for перед объектом."
   }
  ]
 },
 {
  "id": "adjective-prepositions",
  "level": "A2",
  "category": "Предлоги",
  "title": "Good at / Interested in / Afraid of",
  "brief": "После прилагательных часто нужны устойчивые предлоги.",
  "notes": [
   "Good at English; interested in technology; afraid of dogs; responsible for payments.",
   "Прилагательное + предлог лучше запоминать целым выражением, а не переводить по слову."
  ],
  "uses": [
   {
    "label": "good at",
    "detail": "Хорош в чём-то",
    "example": "good at solving problems"
   },
   {
    "label": "interested in",
    "detail": "Интересуется",
    "example": "interested in IT"
   },
   {
    "label": "responsible for",
    "detail": "Отвечает за",
    "example": "responsible for the report"
   }
  ],
  "examples": [
   {
    "en": "I am good at English.",
    "ru": "Я хорошо знаю английский."
   },
   {
    "en": "She is interested in finance.",
    "ru": "Она интересуется финансами."
   },
   {
    "en": "He is afraid of mistakes.",
    "ru": "Он боится ошибок."
   },
   {
    "en": "I am responsible for customer tickets.",
    "ru": "Я отвечаю за обращения клиентов."
   }
  ],
  "mistake": {
   "wrong": "I am interested on technology.",
   "right": "I am interested in technology.",
   "why": "После interested нужен in."
  },
  "tasks": [
   {
    "id": "adjective-prepositions-c1",
    "type": "choice",
    "prompt": "She is good ___ math.",
    "options": [
     "at",
     "in",
     "on"
    ],
    "answer": "at",
    "why": "После good при обозначении навыка — at."
   },
   {
    "id": "adjective-prepositions-c2",
    "type": "choice",
    "prompt": "Are you interested ___ this role?",
    "options": [
     "on",
     "in",
     "for"
    ],
    "answer": "in",
    "why": "Interested in."
   },
   {
    "id": "adjective-prepositions-c3",
    "type": "choice",
    "prompt": "He is responsible ___ verification.",
    "options": [
     "to",
     "with",
     "for"
    ],
    "answer": "for",
    "why": "Responsible for."
   },
   {
    "id": "adjective-prepositions-f1",
    "type": "fill",
    "prompt": "I am afraid ___ spiders.",
    "answer": "of",
    "why": "После afraid используется предлог of."
   },
   {
    "id": "adjective-prepositions-f2",
    "type": "fill",
    "prompt": "We are proud ___ our team.",
    "answer": "of",
    "why": "После proud нужен предлог of."
   },
   {
    "id": "adjective-prepositions-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I am interested on technology.",
    "answer": "I am interested in technology.",
    "why": "После interested нужен in."
   }
  ]
 },
 {
  "id": "say-tell-speak-talk",
  "level": "A2",
  "category": "Похожие слова",
  "title": "Say / Tell / Speak / Talk",
  "brief": "Say — произнести слова; tell — передать информацию кому-то; speak — язык или формальный разговор; talk — беседа.",
  "notes": [
   "Say something; say hello; say to someone. Tell someone something; tell the truth, tell a story.",
   "Speak English; speak to someone; talk to/with someone about something. Speak и talk во многих контекстах взаимозаменяемы, но не во всех."
  ],
  "uses": [
   {
    "label": "say",
    "detail": "Акцент на произнесённых словах",
    "example": "She said hello."
   },
   {
    "label": "tell",
    "detail": "Адресат или сообщение",
    "example": "Tell me the truth."
   },
   {
    "label": "speak",
    "detail": "Язык / формальная речь",
    "example": "I speak English."
   },
   {
    "label": "talk",
    "detail": "Разговаривать / обсуждать",
    "example": "Let’s talk about work."
   }
  ],
  "examples": [
   {
    "en": "He said he was busy.",
    "ru": "Он сказал, что занят."
   },
   {
    "en": "Please tell me your name.",
    "ru": "Скажи мне своё имя."
   },
   {
    "en": "She speaks Spanish.",
    "ru": "Она говорит по-испански."
   },
   {
    "en": "We talked about the interview.",
    "ru": "Мы обсуждали собеседование."
   }
  ],
  "mistake": {
   "wrong": "Tell to me the answer.",
   "right": "Tell me the answer.",
   "why": "Tell + кому (без to) + что."
  },
  "tasks": [
   {
    "id": "say-tell-speak-talk-c1",
    "type": "choice",
    "prompt": "Can you ___ English?",
    "options": [
     "say",
     "speak",
     "tell"
    ],
    "answer": "speak",
    "why": "Speak a language."
   },
   {
    "id": "say-tell-speak-talk-c2",
    "type": "choice",
    "prompt": "Please ___ me the result.",
    "options": [
     "tell",
     "say",
     "talk"
    ],
    "answer": "tell",
    "why": "Tell somebody something."
   },
   {
    "id": "say-tell-speak-talk-c3",
    "type": "choice",
    "prompt": "She ___ hello and smiled.",
    "options": [
     "told",
     "talked",
     "said"
    ],
    "answer": "said",
    "why": "Устойчивое сочетание — say hello."
   },
   {
    "id": "say-tell-speak-talk-f1",
    "type": "fill",
    "prompt": "Let’s ___ about the plan.",
    "answer": "talk",
    "why": "Talk about something."
   },
   {
    "id": "say-tell-speak-talk-f2",
    "type": "fill",
    "prompt": "He did not ___ anything.",
    "answer": "say",
    "why": "Say something/anything."
   },
   {
    "id": "say-tell-speak-talk-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Tell to me the answer.",
    "answer": "Tell me the answer.",
    "why": "Tell + кому (без to) + что."
   }
  ]
 },
 {
  "id": "make-do",
  "level": "A2",
  "category": "Похожие слова",
  "title": "Make / Do",
  "brief": "Make обычно о создании результата; do — о действии, работе или задании.",
  "notes": [
   "Make a decision, make a mistake, make money, make a phone call.",
   "Do homework, do work, do business, do the dishes. Устойчивые сочетания важнее общего правила."
  ],
  "uses": [
   {
    "label": "make",
    "detail": "Результат / создание",
    "example": "make a decision"
   },
   {
    "label": "do",
    "detail": "Дело / задание",
    "example": "do homework"
   },
   {
    "label": "make / do",
    "detail": "Устойчивые сочетания",
    "example": "make progress / do business"
   }
  ],
  "examples": [
   {
    "en": "I made a mistake.",
    "ru": "Я совершил ошибку."
   },
   {
    "en": "She made a decision.",
    "ru": "Она приняла решение."
   },
   {
    "en": "We do business worldwide.",
    "ru": "Мы ведём бизнес по всему миру."
   },
   {
    "en": "I need to do my homework.",
    "ru": "Мне нужно сделать домашнее задание."
   }
  ],
  "mistake": {
   "wrong": "I did a mistake.",
   "right": "I made a mistake.",
   "why": "Устойчивое выражение make a mistake."
  },
  "tasks": [
   {
    "id": "make-do-c1",
    "type": "choice",
    "prompt": "Please ___ your homework.",
    "options": [
     "make",
     "do",
     "take"
    ],
    "answer": "do",
    "why": "Do homework."
   },
   {
    "id": "make-do-c2",
    "type": "choice",
    "prompt": "We need to ___ a decision.",
    "options": [
     "do",
     "make",
     "take"
    ],
    "answer": "make",
    "why": "Make a decision."
   },
   {
    "id": "make-do-c3",
    "type": "choice",
    "prompt": "She ___ a phone call.",
    "options": [
     "made",
     "did",
     "took"
    ],
    "answer": "made",
    "why": "Make a phone call."
   },
   {
    "id": "make-do-f1",
    "type": "fill",
    "prompt": "Try not to ___ mistakes.",
    "answer": "make",
    "why": "Make mistakes."
   },
   {
    "id": "make-do-f2",
    "type": "fill",
    "prompt": "We ___ business with this company.",
    "answer": "do",
    "why": "Do business."
   },
   {
    "id": "make-do-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I did a mistake.",
    "answer": "I made a mistake.",
    "why": "Устойчивое выражение make a mistake."
   }
  ]
 },
 {
  "id": "look-see-watch",
  "level": "A2",
  "category": "Похожие слова",
  "title": "Look / See / Watch",
  "brief": "Look (at) — направить взгляд, see — увидеть, watch — наблюдать за процессом.",
  "notes": [
   "Look at the screen! I can see the error. Watch the video.",
   "Hear — слышать, listen to — слушать намеренно."
  ],
  "uses": [
   {
    "label": "look at",
    "detail": "Направить взгляд",
    "example": "Look at this screen."
   },
   {
    "label": "see",
    "detail": "Замечать зрением",
    "example": "I can see a problem."
   },
   {
    "label": "watch",
    "detail": "Наблюдать действие",
    "example": "watch a movie"
   }
  ],
  "examples": [
   {
    "en": "Look at the message.",
    "ru": "Посмотри на сообщение."
   },
   {
    "en": "I can see two errors.",
    "ru": "Я вижу две ошибки."
   },
   {
    "en": "We watched a movie.",
    "ru": "Мы смотрели фильм."
   },
   {
    "en": "Did you see the notification?",
    "ru": "Ты видел уведомление?"
   }
  ],
  "mistake": {
   "wrong": "Look this picture.",
   "right": "Look at this picture.",
   "why": "Если после look идёт объект, обычно нужен at."
  },
  "tasks": [
   {
    "id": "look-see-watch-c1",
    "type": "choice",
    "prompt": "Please ___ at the screen.",
    "options": [
     "see",
     "watch",
     "look"
    ],
    "answer": "look",
    "why": "После look перед объектом нужен at."
   },
   {
    "id": "look-see-watch-c2",
    "type": "choice",
    "prompt": "I can ___ the station from here.",
    "options": [
     "see",
     "watch",
     "look"
    ],
    "answer": "see",
    "why": "See — воспринимать зрением."
   },
   {
    "id": "look-see-watch-c3",
    "type": "choice",
    "prompt": "Let’s ___ the match tonight.",
    "options": [
     "look",
     "watch",
     "see at"
    ],
    "answer": "watch",
    "why": "Watch a match."
   },
   {
    "id": "look-see-watch-f1",
    "type": "fill",
    "prompt": "___ at this chart, please.",
    "answer": "Look",
    "why": "Направить взгляд — look at."
   },
   {
    "id": "look-see-watch-f2",
    "type": "fill",
    "prompt": "I can ___ your message.",
    "answer": "see",
    "why": "See — видеть/замечать."
   },
   {
    "id": "look-see-watch-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Look this picture.",
    "answer": "Look at this picture.",
    "why": "Если после look идёт объект, обычно нужен at."
   }
  ]
 },
 {
  "id": "hear-listen",
  "level": "A2",
  "category": "Похожие слова",
  "title": "Hear / Listen",
  "brief": "Hear — непроизвольно слышать звук; listen to — сознательно слушать.",
  "notes": [
   "I heard a noise. I listened to the podcast.",
   "Важна конструкция: listen to music; hear music."
  ],
  "uses": [
   {
    "label": "hear",
    "detail": "Слышать звук",
    "example": "I heard a sound."
   },
   {
    "label": "listen to",
    "detail": "Внимательно слушать",
    "example": "Listen to the instructions."
   },
   {
    "label": "can hear",
    "detail": "Способность слышать",
    "example": "Can you hear me?"
   }
  ],
  "examples": [
   {
    "en": "I can hear you clearly.",
    "ru": "Я хорошо тебя слышу."
   },
   {
    "en": "Listen to this message.",
    "ru": "Послушай это сообщение."
   },
   {
    "en": "I heard a strange noise.",
    "ru": "Я услышал странный шум."
   },
   {
    "en": "She listens to podcasts.",
    "ru": "Она слушает подкасты."
   }
  ],
  "mistake": {
   "wrong": "I listen music every day.",
   "right": "I listen to music every day.",
   "why": "После listen перед объектом обычно нужен to."
  },
  "tasks": [
   {
    "id": "hear-listen-c1",
    "type": "choice",
    "prompt": "Can you ___ me?",
    "options": [
     "listen",
     "hear",
     "watch"
    ],
    "answer": "hear",
    "why": "Can you hear me? — проверка связи."
   },
   {
    "id": "hear-listen-c2",
    "type": "choice",
    "prompt": "Please ___ to the teacher.",
    "options": [
     "hear",
     "listen",
     "see"
    ],
    "answer": "listen",
    "why": "Сознательно слушать — listen to."
   },
   {
    "id": "hear-listen-c3",
    "type": "choice",
    "prompt": "I ___ a loud noise last night.",
    "options": [
     "heard",
     "listened",
     "watched"
    ],
    "answer": "heard",
    "why": "Услышать звук — hear."
   },
   {
    "id": "hear-listen-f1",
    "type": "fill",
    "prompt": "I ___ a voice behind me. (услышал)",
    "answer": "heard",
    "why": "Past Simple от hear — heard."
   },
   {
    "id": "hear-listen-f2",
    "type": "fill",
    "prompt": "Please listen ___ the recording.",
    "answer": "to",
    "why": "Перед объектом после listen ставится to."
   },
   {
    "id": "hear-listen-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I listen music every day.",
    "answer": "I listen to music every day.",
    "why": "После listen перед объектом обычно нужен to."
   }
  ]
 },
 {
  "id": "borrow-lend",
  "level": "A2",
  "category": "Похожие слова",
  "title": "Borrow / Lend / Bring / Take",
  "brief": "Borrow — взять взаймы, lend — дать взаймы. Bring — принести сюда, take — отнести оттуда.",
  "notes": [
   "Can I borrow your pen? Can you lend me a pen?",
   "Bring this to me. Take this to the office. Точка отсчёта зависит от контекста."
  ],
  "uses": [
   {
    "label": "borrow",
    "detail": "Взять временно",
    "example": "borrow a book"
   },
   {
    "label": "lend",
    "detail": "Дать временно",
    "example": "lend me a pen"
   },
   {
    "label": "bring / take",
    "detail": "Сюда / от себя",
    "example": "bring it here / take it there"
   }
  ],
  "examples": [
   {
    "en": "Can I borrow your charger?",
    "ru": "Можно одолжить зарядку?"
   },
   {
    "en": "Will you lend me your pen?",
    "ru": "Ты одолжишь мне ручку?"
   },
   {
    "en": "Bring your ID tomorrow.",
    "ru": "Принеси удостоверение завтра."
   },
   {
    "en": "Take this package to reception.",
    "ru": "Отнеси посылку на ресепшен."
   }
  ],
  "mistake": {
   "wrong": "Can you borrow me your pen?",
   "right": "Can you lend me your pen?",
   "why": "Тот, кто даёт предмет, lends it; тот, кто берёт, borrows it."
  },
  "tasks": [
   {
    "id": "borrow-lend-c1",
    "type": "choice",
    "prompt": "Can I ___ your book?",
    "options": [
     "lend",
     "borrow",
     "take to"
    ],
    "answer": "borrow",
    "why": "Я беру взаймы — borrow."
   },
   {
    "id": "borrow-lend-c2",
    "type": "choice",
    "prompt": "Please ___ me your charger.",
    "options": [
     "lend",
     "borrow",
     "get"
    ],
    "answer": "lend",
    "why": "Ты даёшь мне — lend."
   },
   {
    "id": "borrow-lend-c3",
    "type": "choice",
    "prompt": "Please ___ this document here.",
    "options": [
     "bring",
     "take away",
     "lend"
    ],
    "answer": "bring",
    "why": "Принести сюда — bring."
   },
   {
    "id": "borrow-lend-f1",
    "type": "fill",
    "prompt": "Can I ___ your umbrella?",
    "answer": "borrow",
    "why": "Взять у тебя временно — borrow."
   },
   {
    "id": "borrow-lend-f2",
    "type": "fill",
    "prompt": "Please ___ this to the post office.",
    "answer": "take",
    "why": "Отнести куда-то — take."
   },
   {
    "id": "borrow-lend-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Can you borrow me your pen?",
    "answer": "Can you lend me your pen?",
    "why": "Тот, кто даёт предмет, lends it; тот, кто берёт, borrows it."
   }
  ]
 },
 {
  "id": "comparatives",
  "level": "A2",
  "category": "Прилагательные и наречия",
  "title": "Сравнительные и превосходные степени",
  "brief": "Comparative сравнивает два объекта; superlative выделяет один из группы.",
  "notes": [
   "Короткие прилагательные часто получают -er/-est: faster/the fastest. Длинные — more/most: more useful/the most useful.",
   "Irregular: good–better–best, bad–worse–worst. После comparative часто than."
  ],
  "uses": [
   {
    "label": "comparative",
    "detail": "-er / more + adjective",
    "example": "faster than / more reliable than"
   },
   {
    "label": "superlative",
    "detail": "the -est / the most",
    "example": "the fastest / the most useful"
   },
   {
    "label": "irregular",
    "detail": "Особые формы",
    "example": "good — better — best"
   }
  ],
  "examples": [
   {
    "en": "This plan is cheaper than that one.",
    "ru": "Этот план дешевле того."
   },
   {
    "en": "She is the most experienced agent.",
    "ru": "Она самый опытный специалист."
   },
   {
    "en": "Today is better than yesterday.",
    "ru": "Сегодня лучше, чем вчера."
   },
   {
    "en": "This is the fastest option.",
    "ru": "Это самый быстрый вариант."
   }
  ],
  "mistake": {
   "wrong": "This solution is more better.",
   "right": "This solution is better.",
   "why": "Better уже сравнительная форма good; more не нужен."
  },
  "tasks": [
   {
    "id": "comparatives-c1",
    "type": "choice",
    "prompt": "This is the ___ option. (самый быстрый)",
    "options": [
     "faster",
     "fastest",
     "more fast"
    ],
    "answer": "fastest",
    "why": "Fastest — превосходная степень."
   },
   {
    "id": "comparatives-c2",
    "type": "choice",
    "prompt": "This role is ___ than before.",
    "options": [
     "more interesting",
     "most interesting",
     "interestingest"
    ],
    "answer": "more interesting",
    "why": "Long adjective → more."
   },
   {
    "id": "comparatives-c3",
    "type": "choice",
    "prompt": "Today is ___ than yesterday.",
    "options": [
     "gooder",
     "the best",
     "better"
    ],
    "answer": "better",
    "why": "Good → better."
   },
   {
    "id": "comparatives-f1",
    "type": "fill",
    "prompt": "This is the ___ useful tool.",
    "answer": "most",
    "why": "С длинными прилагательными most."
   },
   {
    "id": "comparatives-f2",
    "type": "fill",
    "prompt": "My new laptop is ___ than my old one. (быстрее)",
    "answer": "faster",
    "why": "Fast → faster."
   },
   {
    "id": "comparatives-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: This solution is more better.",
    "answer": "This solution is better.",
    "why": "Better уже сравнительная форма good; more не нужен."
   }
  ]
 },
 {
  "id": "adjective-adverb",
  "level": "A2",
  "category": "Прилагательные и наречия",
  "title": "Adjective / Adverb",
  "brief": "Прилагательное описывает существительное, наречие — обычно действие, признак или другое наречие.",
  "notes": [
   "She is careful. She works carefully.",
   "Наречия не всегда с -ly: fast, hard. Hardly означает «едва», а не «усердно»."
  ],
  "uses": [
   {
    "label": "adjective",
    "detail": "Какой?",
    "example": "a quick response"
   },
   {
    "label": "adverb",
    "detail": "Как?",
    "example": "respond quickly"
   },
   {
    "label": "good / well",
    "detail": "Прилагательное / наречие",
    "example": "a good worker / work well"
   }
  ],
  "examples": [
   {
    "en": "She is a careful driver.",
    "ru": "Она осторожный водитель."
   },
   {
    "en": "She drives carefully.",
    "ru": "Она водит осторожно."
   },
   {
    "en": "You did a good job.",
    "ru": "Ты хорошо справился."
   },
   {
    "en": "He works hard.",
    "ru": "Он усердно работает."
   }
  ],
  "mistake": {
   "wrong": "She speaks English good.",
   "right": "She speaks English well.",
   "why": "Для описания действия speak нужно наречие well."
  },
  "tasks": [
   {
    "id": "adjective-adverb-c1",
    "type": "choice",
    "prompt": "Please speak ___.",
    "options": [
     "slow",
     "slowly",
     "slowness"
    ],
    "answer": "slowly",
    "why": "Как говорить? Наречие slowly."
   },
   {
    "id": "adjective-adverb-c2",
    "type": "choice",
    "prompt": "This is a ___ answer.",
    "options": [
     "clear",
     "clearly",
     "clearness"
    ],
    "answer": "clear",
    "why": "Перед существительным — прилагательное."
   },
   {
    "id": "adjective-adverb-c3",
    "type": "choice",
    "prompt": "He works ___.",
    "options": [
     "hardly",
     "hard",
     "hardness"
    ],
    "answer": "hard",
    "why": "Hard = усердно; hardly = едва."
   },
   {
    "id": "adjective-adverb-f1",
    "type": "fill",
    "prompt": "You explained it very ___.",
    "answer": "well",
    "why": "Хорошо объяснил — well."
   },
   {
    "id": "adjective-adverb-f2",
    "type": "fill",
    "prompt": "She is a ___ student. (хорошая)",
    "answer": "good",
    "why": "Перед student — good."
   },
   {
    "id": "adjective-adverb-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: She speaks English good.",
    "answer": "She speaks English well.",
    "why": "Для описания действия speak нужно наречие well."
   }
  ]
 },
 {
  "id": "too-enough",
  "level": "A2",
  "category": "Количество",
  "title": "Too / Enough / So / Such",
  "brief": "Too — чрезмерно; enough — достаточно; so и such усиливают высказывание.",
  "notes": [
   "Too + adjective: too late. Adjective + enough: fast enough. Enough + noun: enough time.",
   "So + adjective/adverb; such + (a/an) + adjective + noun: so difficult / such a difficult task."
  ],
  "uses": [
   {
    "label": "too",
    "detail": "Слишком",
    "example": "too expensive"
   },
   {
    "label": "enough",
    "detail": "Достаточно",
    "example": "quick enough / enough time"
   },
   {
    "label": "so / such",
    "detail": "Настолько / такой",
    "example": "so useful / such a useful app"
   }
  ],
  "examples": [
   {
    "en": "It is too late to call.",
    "ru": "Слишком поздно звонить."
   },
   {
    "en": "We have enough time.",
    "ru": "У нас достаточно времени."
   },
   {
    "en": "The connection is not fast enough.",
    "ru": "Соединение недостаточно быстрое."
   },
   {
    "en": "It was such a good interview.",
    "ru": "Это было такое хорошее собеседование."
   }
  ],
  "mistake": {
   "wrong": "We have time enough.",
   "right": "We have enough time.",
   "why": "Перед существительным enough стоит до него."
  },
  "tasks": [
   {
    "id": "too-enough-c1",
    "type": "choice",
    "prompt": "This task is ___ difficult. (слишком)",
    "options": [
     "too",
     "enough",
     "such"
    ],
    "answer": "too",
    "why": "Too + adjective."
   },
   {
    "id": "too-enough-c2",
    "type": "choice",
    "prompt": "We have ___ money.",
    "options": [
     "enough",
     "many",
     "so"
    ],
    "answer": "enough",
    "why": "Enough перед существительным."
   },
   {
    "id": "too-enough-c3",
    "type": "choice",
    "prompt": "It was ___ a great day.",
    "options": [
     "so",
     "such",
     "too"
    ],
    "answer": "such",
    "why": "Such a + adjective + noun."
   },
   {
    "id": "too-enough-f1",
    "type": "fill",
    "prompt": "She is not old ___ to drive.",
    "answer": "enough",
    "why": "Прилагательное + enough."
   },
   {
    "id": "too-enough-f2",
    "type": "fill",
    "prompt": "The instructions are ___ confusing. (слишком)",
    "answer": "too",
    "why": "Too + adjective."
   },
   {
    "id": "too-enough-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: We have time enough.",
    "answer": "We have enough time.",
    "why": "Перед существительным enough стоит до него."
   }
  ]
 },
 {
  "id": "modals",
  "level": "A2",
  "category": "Глагольные конструкции",
  "title": "Must / Have to / Should / Mustn’t",
  "brief": "Must/have to — обязанность; should — совет; mustn’t — запрет; don’t have to — нет необходимости.",
  "notes": [
   "Mustn’t НЕ равно don’t have to: You mustn’t share passwords (запрет), You don’t have to call (необязательно).",
   "После модального глагола обычно начальная форма без to: must check, should ask."
  ],
  "uses": [
   {
    "label": "must / have to",
    "detail": "Нужно, обязан",
    "example": "You must verify this."
   },
   {
    "label": "should",
    "detail": "Совет",
    "example": "You should rest."
   },
   {
    "label": "mustn’t / don’t have to",
    "detail": "Нельзя / необязательно",
    "example": "mustn’t share / don’t have to go"
   }
  ],
  "examples": [
   {
    "en": "You must keep this private.",
    "ru": "Ты обязан держать это в секрете."
   },
   {
    "en": "You should ask for clarification.",
    "ru": "Тебе стоит уточнить."
   },
   {
    "en": "You mustn’t share passwords.",
    "ru": "Нельзя делиться паролями."
   },
   {
    "en": "You don’t have to work tonight.",
    "ru": "Сегодня тебе необязательно работать."
   }
  ],
  "mistake": {
   "wrong": "You must to check the file.",
   "right": "You must check the file.",
   "why": "После must используется инфинитив без to."
  },
  "tasks": [
   {
    "id": "modals-c1",
    "type": "choice",
    "prompt": "You ___ share a client’s password.",
    "options": [
     "mustn’t",
     "don’t have to",
     "should"
    ],
    "answer": "mustn’t",
    "why": "Это запрет."
   },
   {
    "id": "modals-c2",
    "type": "choice",
    "prompt": "It is optional. You ___ join.",
    "options": [
     "must",
     "don’t have to",
     "mustn’t"
    ],
    "answer": "don’t have to",
    "why": "Действие необязательно."
   },
   {
    "id": "modals-c3",
    "type": "choice",
    "prompt": "You look tired. You ___ rest.",
    "options": [
     "should",
     "mustn’t",
     "have"
    ],
    "answer": "should",
    "why": "Совет — should."
   },
   {
    "id": "modals-f1",
    "type": "fill",
    "prompt": "You ___ not disclose the PIN.",
    "answer": "must",
    "why": "Строгий запрет — must not."
   },
   {
    "id": "modals-f2",
    "type": "fill",
    "prompt": "You ___ ask your manager for help. (совет)",
    "answer": "should",
    "why": "Рекомендация — should."
   },
   {
    "id": "modals-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: You must to check the file.",
    "answer": "You must check the file.",
    "why": "После must используется инфинитив без to."
   }
  ]
 },
 {
  "id": "gerund-infinitive",
  "level": "B1",
  "category": "Глагольные конструкции",
  "title": "Gerund / Infinitive — -ing или to",
  "brief": "После одних глаголов нужен -ing, после других — to + инфинитив; иногда форма меняет значение.",
  "notes": [
   "Enjoy doing, avoid doing, suggest doing. Want to do, decide to do, hope to do.",
   "Stop smoking = бросить курить; stop to smoke = остановиться, чтобы покурить. Remember doing ≠ remember to do."
  ],
  "uses": [
   {
    "label": "verb + -ing",
    "detail": "После enjoy, avoid",
    "example": "enjoy learning"
   },
   {
    "label": "verb + to",
    "detail": "После want, decide",
    "example": "decide to apply"
   },
   {
    "label": "stop doing / stop to do",
    "detail": "Остановить процесс / остановиться с целью",
    "example": "stop talking / stop to talk"
   }
  ],
  "examples": [
   {
    "en": "I enjoy learning English.",
    "ru": "Мне нравится учить английский."
   },
   {
    "en": "She decided to apply.",
    "ru": "Она решила подать заявку."
   },
   {
    "en": "He avoided making a mistake.",
    "ru": "Он избежал ошибки."
   },
   {
    "en": "I stopped to answer the call.",
    "ru": "Я остановился, чтобы ответить на звонок."
   }
  ],
  "mistake": {
   "wrong": "I enjoy to learn English.",
   "right": "I enjoy learning English.",
   "why": "После enjoy используется -ing."
  },
  "tasks": [
   {
    "id": "gerund-infinitive-c1",
    "type": "choice",
    "prompt": "I decided ___ a new job.",
    "options": [
     "apply for",
     "to apply for",
     "applying for"
    ],
    "answer": "to apply for",
    "why": "Decide + to + verb."
   },
   {
    "id": "gerund-infinitive-c2",
    "type": "choice",
    "prompt": "She enjoys ___ books.",
    "options": [
     "read",
     "to read",
     "reading"
    ],
    "answer": "reading",
    "why": "Enjoy + -ing."
   },
   {
    "id": "gerund-infinitive-c3",
    "type": "choice",
    "prompt": "We avoided ___ the data.",
    "options": [
     "sharing",
     "to share",
     "share"
    ],
    "answer": "sharing",
    "why": "Avoid + -ing."
   },
   {
    "id": "gerund-infinitive-f1",
    "type": "fill",
    "prompt": "He wants ___ English. (учить)",
    "answer": "to learn",
    "why": "После want нужен инфинитив с to."
   },
   {
    "id": "gerund-infinitive-f2",
    "type": "fill",
    "prompt": "Please stop ___ while I explain. (говорить)",
    "answer": "talking",
    "why": "Stop doing = прекратить действие."
   },
   {
    "id": "gerund-infinitive-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I enjoy to learn English.",
    "answer": "I enjoy learning English.",
    "why": "После enjoy используется -ing."
   }
  ]
 },
 {
  "id": "used-to",
  "level": "B1",
  "category": "Глагольные конструкции",
  "title": "Used to / Be used to / Get used to",
  "brief": "Used to + глагол — привычка в прошлом. Be used to + -ing — привык. Get used to + -ing — привыкать.",
  "notes": [
   "I used to work nights (раньше работал). I am used to working nights (привык).",
   "После be/get used to слово to является предлогом, поэтому дальше -ing или существительное."
  ],
  "uses": [
   {
    "label": "used to + V",
    "detail": "Раньше, больше не обязательно сейчас",
    "example": "I used to drive."
   },
   {
    "label": "be used to + -ing",
    "detail": "Привык",
    "example": "I am used to driving."
   },
   {
    "label": "get used to + -ing",
    "detail": "Привыкать",
    "example": "I am getting used to driving."
   }
  ],
  "examples": [
   {
    "en": "I used to live in Boston.",
    "ru": "Раньше я жил в Бостоне."
   },
   {
    "en": "I am used to working remotely.",
    "ru": "Я привык работать удалённо."
   },
   {
    "en": "She is getting used to the schedule.",
    "ru": "Она привыкает к графику."
   },
   {
    "en": "Did you use to travel often?",
    "ru": "Раньше ты часто путешествовал?"
   }
  ],
  "mistake": {
   "wrong": "I am used to work at night.",
   "right": "I am used to working at night.",
   "why": "После be used to глагол с -ing."
  },
  "tasks": [
   {
    "id": "used-to-c1",
    "type": "choice",
    "prompt": "I ___ play soccer when I was a child.",
    "options": [
     "am used to",
     "used to",
     "get used to"
    ],
    "answer": "used to",
    "why": "Привычка в прошлом — used to."
   },
   {
    "id": "used-to-c2",
    "type": "choice",
    "prompt": "She is used to ___ early.",
    "options": [
     "get up",
     "getting up",
     "to get up"
    ],
    "answer": "getting up",
    "why": "Be used to + -ing."
   },
   {
    "id": "used-to-c3",
    "type": "choice",
    "prompt": "It took time to get used ___ the job.",
    "options": [
     "for",
     "on",
     "to"
    ],
    "answer": "to",
    "why": "Get used to something."
   },
   {
    "id": "used-to-f1",
    "type": "fill",
    "prompt": "I ___ to live in Texas. (раньше)",
    "answer": "used",
    "why": "Used to + V."
   },
   {
    "id": "used-to-f2",
    "type": "fill",
    "prompt": "She is used to ___ remotely.",
    "answer": "working",
    "why": "Be used to + -ing."
   },
   {
    "id": "used-to-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I am used to work at night.",
    "answer": "I am used to working at night.",
    "why": "После be used to глагол с -ing."
   }
  ]
 },
 {
  "id": "going-to-will",
  "level": "A2",
  "category": "Времена и планы",
  "title": "Will / Be going to",
  "brief": "Will часто для решения в момент речи, обещаний и прогнозов; going to — план и прогноз по видимым признакам.",
  "notes": [
   "I will help you (решение сейчас). I am going to apply for a new job (план заранее).",
   "Обе формы могут выражать прогноз; различие зависит от ситуации, поэтому не всегда одна форма строго исключает другую."
  ],
  "uses": [
   {
    "label": "will",
    "detail": "Спонтанное решение / обещание",
    "example": "I’ll check it now."
   },
   {
    "label": "be going to",
    "detail": "Заранее намеченный план",
    "example": "I’m going to study tonight."
   },
   {
    "label": "going to",
    "detail": "Наблюдаемые признаки",
    "example": "Look at the clouds. It’s going to rain."
   }
  ],
  "examples": [
   {
    "en": "I’ll answer the phone!",
    "ru": "Я отвечу на звонок!"
   },
   {
    "en": "She is going to apply next week.",
    "ru": "Она собирается подать заявку на следующей неделе."
   },
   {
    "en": "I think it will work.",
    "ru": "Думаю, это сработает."
   },
   {
    "en": "Look! The glass is going to fall.",
    "ru": "Смотри! Стакан сейчас упадёт."
   }
  ],
  "mistake": {
   "wrong": "I going to study tonight.",
   "right": "I am going to study tonight.",
   "why": "С going to требуется am/is/are."
  },
  "tasks": [
   {
    "id": "going-to-will-c1",
    "type": "choice",
    "prompt": "I have made a plan. I ___ study tonight.",
    "options": [
     "am going to",
     "will to",
     "going"
    ],
    "answer": "am going to",
    "why": "Заранее принятое решение — going to."
   },
   {
    "id": "going-to-will-c2",
    "type": "choice",
    "prompt": "The phone is ringing. I ___ get it!",
    "options": [
     "am going to",
     "will",
     "will to"
    ],
    "answer": "will",
    "why": "Спонтанное решение — will."
   },
   {
    "id": "going-to-will-c3",
    "type": "choice",
    "prompt": "Look at the sky! It ___ rain.",
    "options": [
     "will to",
     "going",
     "is going to"
    ],
    "answer": "is going to",
    "why": "Видимые признаки — going to."
   },
   {
    "id": "going-to-will-f1",
    "type": "fill",
    "prompt": "She is going ___ visit her family.",
    "answer": "to",
    "why": "Be going to + verb."
   },
   {
    "id": "going-to-will-f2",
    "type": "fill",
    "prompt": "I ___ help you with that right now.",
    "answer": "will",
    "why": "Сейчас обещаю помочь — will."
   },
   {
    "id": "going-to-will-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I going to study tonight.",
    "answer": "I am going to study tonight.",
    "why": "С going to требуется am/is/are."
   }
  ]
 },
 {
  "id": "present-perfect-markers",
  "level": "A2",
  "category": "Времена и планы",
  "title": "Just / Already / Yet / Still / Ever",
  "brief": "Just — только что, already — уже, yet — ещё/уже (в вопросах и отрицаниях), still — всё ещё.",
  "notes": [
   "I have already sent it. Have you sent it yet? I haven’t sent it yet.",
   "Still usually precedes the main verb: I still work here. Ever in experience questions: Have you ever…?"
  ],
  "uses": [
   {
    "label": "already",
    "detail": "Уже",
    "example": "I have already finished."
   },
   {
    "label": "yet",
    "detail": "Ещё / уже — вопрос, отрицание",
    "example": "Have you replied yet?"
   },
   {
    "label": "still",
    "detail": "Всё ещё",
    "example": "She is still waiting."
   },
   {
    "label": "just",
    "detail": "Только что",
    "example": "He has just arrived."
   }
  ],
  "examples": [
   {
    "en": "I have just finished the task.",
    "ru": "Я только что закончил задачу."
   },
   {
    "en": "Have you called yet?",
    "ru": "Ты уже позвонил?"
   },
   {
    "en": "She is still waiting.",
    "ru": "Она всё ещё ждёт."
   },
   {
    "en": "I have never been there.",
    "ru": "Я никогда там не был."
   }
  ],
  "mistake": {
   "wrong": "I have not sent it already.",
   "right": "I have not sent it yet.",
   "why": "В нейтральном отрицании «ещё не» обычно yet."
  },
  "tasks": [
   {
    "id": "present-perfect-markers-c1",
    "type": "choice",
    "prompt": "Have you finished ___?",
    "options": [
     "already",
     "yet",
     "still"
    ],
    "answer": "yet",
    "why": "Обычный вопрос о завершении — yet."
   },
   {
    "id": "present-perfect-markers-c2",
    "type": "choice",
    "prompt": "I have ___ sent the email. (уже)",
    "options": [
     "already",
     "yet",
     "ever"
    ],
    "answer": "already",
    "why": "Already — уже."
   },
   {
    "id": "present-perfect-markers-c3",
    "type": "choice",
    "prompt": "They are ___ waiting. (всё ещё)",
    "options": [
     "yet",
     "just",
     "still"
    ],
    "answer": "still",
    "why": "Still — состояние продолжается."
   },
   {
    "id": "present-perfect-markers-f1",
    "type": "fill",
    "prompt": "Have you ___ visited Chicago?",
    "answer": "ever",
    "why": "Вопрос об опыте — ever."
   },
   {
    "id": "present-perfect-markers-f2",
    "type": "fill",
    "prompt": "The ticket has ___ been resolved. (только что)",
    "answer": "just",
    "why": "Just — недавно совершённое действие."
   },
   {
    "id": "present-perfect-markers-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I have not sent it already.",
    "answer": "I have not sent it yet.",
    "why": "В нейтральном отрицании «ещё не» обычно yet."
   }
  ]
 },
 {
  "id": "conditionals",
  "level": "B1",
  "category": "Сложные предложения",
  "title": "Zero / First / Second Conditional",
  "brief": "Zero — общие закономерности; First — реальное будущее; Second — маловероятная или воображаемая ситуация.",
  "notes": [
   "If + Present, Present: If water freezes, it expands.",
   "If + Present, will: If you call, I will answer. If + Past, would: If I had time, I would travel."
  ],
  "uses": [
   {
    "label": "Zero",
    "detail": "Факт / закономерность",
    "example": "If you heat ice, it melts."
   },
   {
    "label": "First",
    "detail": "Возможное будущее",
    "example": "If it rains, I will stay home."
   },
   {
    "label": "Second",
    "detail": "Воображаемое сейчас/будущее",
    "example": "If I knew, I would tell you."
   }
  ],
  "examples": [
   {
    "en": "If you press this button, the screen lights up.",
    "ru": "Если нажать эту кнопку, экран загорается."
   },
   {
    "en": "If we finish early, we will leave.",
    "ru": "Если закончим рано, уйдём."
   },
   {
    "en": "If I spoke French, I would apply.",
    "ru": "Если бы я знал французский, подал бы заявку."
   },
   {
    "en": "If I were you, I would ask.",
    "ru": "На твоём месте я бы спросил."
   }
  ],
  "mistake": {
   "wrong": "If I will have time, I will call.",
   "right": "If I have time, I will call.",
   "why": "В обычном First Conditional после if используется Present Simple."
  },
  "tasks": [
   {
    "id": "conditionals-c1",
    "type": "choice",
    "prompt": "If she ___ early, we will start.",
    "options": [
     "will arrive",
     "arrives",
     "arrived"
    ],
    "answer": "arrives",
    "why": "После if в First Conditional — Present Simple."
   },
   {
    "id": "conditionals-c2",
    "type": "choice",
    "prompt": "If I had money, I ___ buy it.",
    "options": [
     "will",
     "would",
     "can"
    ],
    "answer": "would",
    "why": "Second Conditional — would."
   },
   {
    "id": "conditionals-c3",
    "type": "choice",
    "prompt": "If you heat water to 100°C at sea level, it ___.",
    "options": [
     "boiled",
     "will boiled",
     "boils"
    ],
    "answer": "boils",
    "why": "Zero Conditional — Present + Present."
   },
   {
    "id": "conditionals-f1",
    "type": "fill",
    "prompt": "If I ___ more time, I would learn Spanish.",
    "answer": "had",
    "why": "Second Conditional — Past form."
   },
   {
    "id": "conditionals-f2",
    "type": "fill",
    "prompt": "If it ___ tomorrow, we will stay home.",
    "answer": "rains",
    "why": "First Conditional — Present Simple."
   },
   {
    "id": "conditionals-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: If I will have time, I will call.",
    "answer": "If I have time, I will call.",
    "why": "В обычном First Conditional после if используется Present Simple."
   }
  ]
 },
 {
  "id": "relative-clauses",
  "level": "B1",
  "category": "Сложные предложения",
  "title": "Who / Which / That / Whose",
  "brief": "Относительные местоимения соединяют предложение и уточнение о человеке или предмете.",
  "notes": [
   "Who — о людях, which — о предметах/животных, whose — принадлежность. That в определительных придаточных часто подходит и к людям, и к вещам.",
   "В non-defining clause с запятыми that не используется: My manager, who lives here, …"
  ],
  "uses": [
   {
    "label": "who",
    "detail": "О человеке",
    "example": "The agent who helped me…"
   },
   {
    "label": "which / that",
    "detail": "О предмете",
    "example": "The file which I sent…"
   },
   {
    "label": "whose",
    "detail": "Принадлежность",
    "example": "A person whose phone…"
   }
  ],
  "examples": [
   {
    "en": "The woman who called is my manager.",
    "ru": "Женщина, которая звонила, — мой руководитель."
   },
   {
    "en": "This is the file that I sent.",
    "ru": "Вот файл, который я отправил."
   },
   {
    "en": "I met a man whose son lives here.",
    "ru": "Я встретил мужчину, чей сын живёт здесь."
   },
   {
    "en": "My phone, which is old, still works.",
    "ru": "Мой телефон, который старый, всё ещё работает."
   }
  ],
  "mistake": {
   "wrong": "The man which works here is kind.",
   "right": "The man who works here is kind.",
   "why": "О человеке — who (или that в определительном придаточном)."
  },
  "tasks": [
   {
    "id": "relative-clauses-c1",
    "type": "choice",
    "prompt": "The person ___ emailed me is in HR.",
    "options": [
     "which",
     "who",
     "whose"
    ],
    "answer": "who",
    "why": "Человек — who."
   },
   {
    "id": "relative-clauses-c2",
    "type": "choice",
    "prompt": "The app ___ I use is free.",
    "options": [
     "who",
     "whose",
     "that"
    ],
    "answer": "that",
    "why": "Предмет — that/which."
   },
   {
    "id": "relative-clauses-c3",
    "type": "choice",
    "prompt": "The client ___ account was locked called.",
    "options": [
     "whose",
     "which",
     "who"
    ],
    "answer": "whose",
    "why": "Принадлежность — whose."
   },
   {
    "id": "relative-clauses-f1",
    "type": "fill",
    "prompt": "The man ___ helped me was polite.",
    "answer": "who",
    "why": "Люди — who."
   },
   {
    "id": "relative-clauses-f2",
    "type": "fill",
    "prompt": "The company ___ office is nearby is hiring.",
    "answer": "whose",
    "why": "Чей офис — whose."
   },
   {
    "id": "relative-clauses-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: The man which works here is kind.",
    "answer": "The man who works here is kind.",
    "why": "О человеке — who (или that в определительном придаточном)."
   }
  ]
 },
 {
  "id": "indirect-questions",
  "level": "B1",
  "category": "Основы предложения",
  "title": "Косвенные и вежливые вопросы",
  "brief": "Внутри косвенного вопроса порядок слов обычно как в утверждении, а не как в прямом вопросе.",
  "notes": [
   "Where is the bank? → Could you tell me where the bank is?",
   "Do you know if/whether the payment has arrived? После if/whether используем порядок подлежащее + глагол."
  ],
  "uses": [
   {
    "label": "direct",
    "detail": "Прямой вопрос",
    "example": "Where is the bank?"
   },
   {
    "label": "indirect wh-",
    "detail": "Порядок утверждения",
    "example": "Do you know where the bank is?"
   },
   {
    "label": "indirect yes/no",
    "detail": "If / whether",
    "example": "Could you tell me if it is ready?"
   }
  ],
  "examples": [
   {
    "en": "Could you tell me where the office is?",
    "ru": "Не могли бы вы сказать, где офис?"
   },
   {
    "en": "Do you know if she is available?",
    "ru": "Ты знаешь, свободна ли она?"
   },
   {
    "en": "I wonder why he left.",
    "ru": "Интересно, почему он ушёл."
   },
   {
    "en": "Could you explain how this works?",
    "ru": "Не могли бы вы объяснить, как это работает?"
   }
  ],
  "mistake": {
   "wrong": "Can you tell me where is the station?",
   "right": "Can you tell me where the station is?",
   "why": "Внутри косвенного вопроса порядок подлежащее + сказуемое."
  },
  "tasks": [
   {
    "id": "indirect-questions-c1",
    "type": "choice",
    "prompt": "Do you know where ___?",
    "options": [
     "is the manager",
     "the manager is",
     "does the manager"
    ],
    "answer": "the manager is",
    "why": "Внутри вопроса порядок утверждения."
   },
   {
    "id": "indirect-questions-c2",
    "type": "choice",
    "prompt": "Can you tell me ___ it is open?",
    "options": [
     "if",
     "do",
     "is"
    ],
    "answer": "if",
    "why": "Да/нет — if/whether."
   },
   {
    "id": "indirect-questions-c3",
    "type": "choice",
    "prompt": "I wonder why ___ late.",
    "options": [
     "is he",
     "he does",
     "he is"
    ],
    "answer": "he is",
    "why": "В косвенном вопросе he is."
   },
   {
    "id": "indirect-questions-f1",
    "type": "fill",
    "prompt": "Do you know what time the train ___?",
    "answer": "leaves",
    "why": "После what time — прямой порядок."
   },
   {
    "id": "indirect-questions-f2",
    "type": "fill",
    "prompt": "Could you tell me ___ I can pay? (как)",
    "answer": "how",
    "why": "Косвенный вопрос о способе — how."
   },
   {
    "id": "indirect-questions-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Can you tell me where is the station?",
    "answer": "Can you tell me where the station is?",
    "why": "Внутри косвенного вопроса порядок подлежащее + сказуемое."
   }
  ]
 },
 {
  "id": "linking-words",
  "level": "B1",
  "category": "Сложные предложения",
  "title": "Because / Although / However / Despite",
  "brief": "Because объясняет причину; although противопоставляет; however связывает отдельные высказывания; despite + существительное/-ing.",
  "notes": [
   "Because + clause: because I was sick. Because of + noun: because of the weather.",
   "Although + clause; despite + noun/-ing. However часто отделяется запятой."
  ],
  "uses": [
   {
    "label": "because",
    "detail": "Причина — предложение",
    "example": "because it was late"
   },
   {
    "label": "although",
    "detail": "Хотя — предложение",
    "example": "although it was raining"
   },
   {
    "label": "despite",
    "detail": "Несмотря на + noun/-ing",
    "example": "despite the delay"
   },
   {
    "label": "however",
    "detail": "Однако — связка предложений",
    "example": "It was hard. However, we finished."
   }
  ],
  "examples": [
   {
    "en": "We left because it was late.",
    "ru": "Мы ушли, потому что было поздно."
   },
   {
    "en": "Although it was difficult, we finished.",
    "ru": "Хотя было сложно, мы закончили."
   },
   {
    "en": "Despite the rain, we went out.",
    "ru": "Несмотря на дождь, мы вышли."
   },
   {
    "en": "The system was slow. However, it worked.",
    "ru": "Система была медленной. Однако она работала."
   }
  ],
  "mistake": {
   "wrong": "Despite it was raining, we went out.",
   "right": "Although it was raining, we went out.",
   "why": "После despite нужно существительное или -ing, после although — предложение."
  },
  "tasks": [
   {
    "id": "linking-words-c1",
    "type": "choice",
    "prompt": "We stayed home ___ it was cold.",
    "options": [
     "because",
     "despite",
     "however"
    ],
    "answer": "because",
    "why": "Причина + предложение — because."
   },
   {
    "id": "linking-words-c2",
    "type": "choice",
    "prompt": "___ the delay, the customer was patient.",
    "options": [
     "Although",
     "Despite",
     "Because"
    ],
    "answer": "Despite",
    "why": "После despite — существительное."
   },
   {
    "id": "linking-words-c3",
    "type": "choice",
    "prompt": "It was expensive. ___, we bought it.",
    "options": [
     "Because",
     "Despite",
     "However"
    ],
    "answer": "However",
    "why": "Новая фраза с противопоставлением — however."
   },
   {
    "id": "linking-words-f1",
    "type": "fill",
    "prompt": "___ it was raining, we went out. (хотя)",
    "answer": "Although",
    "why": "Although + clause."
   },
   {
    "id": "linking-words-f2",
    "type": "fill",
    "prompt": "We stopped ___ of the weather.",
    "answer": "because",
    "why": "Because of + noun."
   },
   {
    "id": "linking-words-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Despite it was raining, we went out.",
    "answer": "Although it was raining, we went out.",
    "why": "После despite нужно существительное или -ing, после although — предложение."
   }
  ]
 },
 {
  "id": "both-either-neither",
  "level": "B1",
  "category": "Количество",
  "title": "Both / Either / Neither",
  "brief": "Both — оба; either — любой из двух; neither — ни один из двух.",
  "notes": [
   "Both options work. Either option is fine. Neither option works.",
   "Neither is обычно с утвердительной формой глагола: Neither answer is correct."
  ],
  "uses": [
   {
    "label": "both",
    "detail": "Оба",
    "example": "Both files are ready."
   },
   {
    "label": "either",
    "detail": "Любой один из двух",
    "example": "Either answer is acceptable."
   },
   {
    "label": "neither",
    "detail": "Ни один из двух",
    "example": "Neither answer is correct."
   }
  ],
  "examples": [
   {
    "en": "Both users are online.",
    "ru": "Оба пользователя онлайн."
   },
   {
    "en": "Either day works for me.",
    "ru": "Мне подходит любой из двух дней."
   },
   {
    "en": "Neither answer is correct.",
    "ru": "Ни один ответ не верен."
   },
   {
    "en": "Both of them speak English.",
    "ru": "Оба говорят по-английски."
   }
  ],
  "mistake": {
   "wrong": "Neither answer is not correct.",
   "right": "Neither answer is correct.",
   "why": "Neither уже содержит отрицание."
  },
  "tasks": [
   {
    "id": "both-either-neither-c1",
    "type": "choice",
    "prompt": "___ options are available. (оба)",
    "options": [
     "Both",
     "Either",
     "Neither"
    ],
    "answer": "Both",
    "why": "Both — оба."
   },
   {
    "id": "both-either-neither-c2",
    "type": "choice",
    "prompt": "___ answer is acceptable. (любой из двух)",
    "options": [
     "Neither",
     "Either",
     "Both"
    ],
    "answer": "Either",
    "why": "Either — один из двух на выбор."
   },
   {
    "id": "both-either-neither-c3",
    "type": "choice",
    "prompt": "___ candidate passed. (ни один из двух)",
    "options": [
     "Both",
     "Either",
     "Neither"
    ],
    "answer": "Neither",
    "why": "Neither — ни один."
   },
   {
    "id": "both-either-neither-f1",
    "type": "fill",
    "prompt": "___ of them is ready. (ни один)",
    "answer": "Neither",
    "why": "Neither of them."
   },
   {
    "id": "both-either-neither-f2",
    "type": "fill",
    "prompt": "___ tickets are closed. (оба)",
    "answer": "Both",
    "why": "Both + plural."
   },
   {
    "id": "both-either-neither-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Neither answer is not correct.",
    "answer": "Neither answer is correct.",
    "why": "Neither уже содержит отрицание."
   }
  ]
 },
 {
  "id": "passive-voice",
  "level": "B1",
  "category": "Сложные предложения",
  "title": "Passive Voice — пассивный залог",
  "brief": "В пассиве важнее действие над объектом. Используй be в нужном времени + V3.",
  "notes": [
   "Present: is checked. Past: was checked. Future: will be checked.",
   "By + agent можно использовать, если важно, кто сделал: was approved by the manager."
  ],
  "uses": [
   {
    "label": "present",
    "detail": "am/is/are + V3",
    "example": "The order is processed."
   },
   {
    "label": "past",
    "detail": "was/were + V3",
    "example": "The order was processed."
   },
   {
    "label": "future",
    "detail": "will be + V3",
    "example": "The order will be processed."
   }
  ],
  "examples": [
   {
    "en": "Payments are processed daily.",
    "ru": "Платежи обрабатывают ежедневно."
   },
   {
    "en": "The refund was approved.",
    "ru": "Возврат одобрили."
   },
   {
    "en": "Your request will be reviewed.",
    "ru": "Ваш запрос рассмотрят."
   },
   {
    "en": "The email was written by Anna.",
    "ru": "Письмо написала Анна."
   }
  ],
  "mistake": {
   "wrong": "Your request will reviewed.",
   "right": "Your request will be reviewed.",
   "why": "Future Passive: will be + V3."
  },
  "tasks": [
   {
    "id": "passive-voice-c1",
    "type": "choice",
    "prompt": "The email ___ sent yesterday.",
    "options": [
     "was",
     "is",
     "be"
    ],
    "answer": "was",
    "why": "Past Simple Passive — was sent."
   },
   {
    "id": "passive-voice-c2",
    "type": "choice",
    "prompt": "The tickets are ___ daily.",
    "options": [
     "check",
     "checked",
     "checking"
    ],
    "answer": "checked",
    "why": "Для пассива используется be + V3."
   },
   {
    "id": "passive-voice-c3",
    "type": "choice",
    "prompt": "The report will ___ finished.",
    "options": [
     "is",
     "was",
     "be"
    ],
    "answer": "be",
    "why": "Will be + V3."
   },
   {
    "id": "passive-voice-f1",
    "type": "fill",
    "prompt": "The payment ___ approved yesterday.",
    "answer": "was",
    "why": "Past Passive."
   },
   {
    "id": "passive-voice-f2",
    "type": "fill",
    "prompt": "The documents are ___ every week.",
    "answer": "checked",
    "why": "Are + V3 checked."
   },
   {
    "id": "passive-voice-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Your request will reviewed.",
    "answer": "Your request will be reviewed.",
    "why": "Future Passive: will be + V3."
   }
  ]
 },
 {
  "id": "reported-speech",
  "level": "B1",
  "category": "Сложные предложения",
  "title": "Reported Speech — косвенная речь",
  "brief": "При передаче слов с глаголом в прошлом часто сдвигаем время назад: am → was, have → had, will → would.",
  "notes": [
   "“I am tired,” he said → He said (that) he was tired.",
   "Сдвиг времени зависит от контекста: при всё ещё актуальном факте возможна исходная форма. Tell обычно требует адресата."
  ],
  "uses": [
   {
    "label": "say (that)",
    "detail": "Передача высказывания",
    "example": "She said that she was ready."
   },
   {
    "label": "tell someone (that)",
    "detail": "С адресатом",
    "example": "She told me she was ready."
   },
   {
    "label": "ask if",
    "detail": "Косвенный вопрос",
    "example": "He asked if I was ready."
   }
  ],
  "examples": [
   {
    "en": "She said she was busy.",
    "ru": "Она сказала, что занята."
   },
   {
    "en": "He told me the truth.",
    "ru": "Он сказал мне правду."
   },
   {
    "en": "They asked if I could help.",
    "ru": "Они спросили, могу ли я помочь."
   },
   {
    "en": "She said she had finished.",
    "ru": "Она сказала, что закончила."
   }
  ],
  "mistake": {
   "wrong": "He told that he was late.",
   "right": "He said that he was late.",
   "why": "Tell без адресата в такой конструкции неверно; say that подходит."
  },
  "tasks": [
   {
    "id": "reported-speech-c1",
    "type": "choice",
    "prompt": "“I am busy,” she said. → She said she ___ busy.",
    "options": [
     "is",
     "was",
     "be"
    ],
    "answer": "was",
    "why": "Обычный backshift: am → was."
   },
   {
    "id": "reported-speech-c2",
    "type": "choice",
    "prompt": "He ___ me that he was late.",
    "options": [
     "said",
     "told",
     "talked"
    ],
    "answer": "told",
    "why": "Tell + кому."
   },
   {
    "id": "reported-speech-c3",
    "type": "choice",
    "prompt": "“I will call,” he said → He said he ___ call.",
    "options": [
     "would",
     "will to",
     "had"
    ],
    "answer": "would",
    "why": "Will → would при сдвиге."
   },
   {
    "id": "reported-speech-f1",
    "type": "fill",
    "prompt": "She ___ me that she was ready.",
    "answer": "told",
    "why": "С адресатом — told me."
   },
   {
    "id": "reported-speech-f2",
    "type": "fill",
    "prompt": "He said that he ___ finished. (уже завершил)",
    "answer": "had",
    "why": "Backshift Present Perfect → Past Perfect."
   },
   {
    "id": "reported-speech-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: He told that he was late.",
    "answer": "He said that he was late.",
    "why": "Tell без адресата в такой конструкции неверно; say that подходит."
   }
  ]
 },
 {
  "id": "question-tags",
  "level": "B1",
  "category": "Основы предложения",
  "title": "Question tags — хвостики вопросов",
  "brief": "К утвердительному высказыванию обычно добавляем отрицательный хвостик, к отрицательному — утвердительный.",
  "notes": [
   "You work here, don’t you? She isn’t here, is she?",
   "Хвостик повторяет вспомогательный глагол и местоимение подлежащего. Для I am: aren’t I?"
  ],
  "uses": [
   {
    "label": "affirmative",
    "detail": "Отрицательный хвостик",
    "example": "She works here, doesn’t she?"
   },
   {
    "label": "negative",
    "detail": "Положительный хвостик",
    "example": "He isn’t tired, is he?"
   },
   {
    "label": "modal",
    "detail": "Повтор модального",
    "example": "You can drive, can’t you?"
   }
  ],
  "examples": [
   {
    "en": "You work remotely, don’t you?",
    "ru": "Ты работаешь удалённо, верно?"
   },
   {
    "en": "She isn’t ready, is she?",
    "ru": "Она не готова, верно?"
   },
   {
    "en": "They have arrived, haven’t they?",
    "ru": "Они приехали, не так ли?"
   },
   {
    "en": "He can swim, can’t he?",
    "ru": "Он умеет плавать, верно?"
   }
  ],
  "mistake": {
   "wrong": "She works here, isn’t she?",
   "right": "She works here, doesn’t she?",
   "why": "Для Present Simple без be в хвостике нужен does."
  },
  "tasks": [
   {
    "id": "question-tags-c1",
    "type": "choice",
    "prompt": "You like this job, ___?",
    "options": [
     "do you",
     "don’t you",
     "aren’t you"
    ],
    "answer": "don’t you",
    "why": "Утверждение → отрицательный хвостик don’t you."
   },
   {
    "id": "question-tags-c2",
    "type": "choice",
    "prompt": "She isn’t home, ___?",
    "options": [
     "is she",
     "isn’t she",
     "does she"
    ],
    "answer": "is she",
    "why": "Отрицательное be → is she."
   },
   {
    "id": "question-tags-c3",
    "type": "choice",
    "prompt": "He can help, ___?",
    "options": [
     "doesn’t he",
     "can he",
     "can’t he"
    ],
    "answer": "can’t he",
    "why": "Модальный can повторяется."
   },
   {
    "id": "question-tags-f1",
    "type": "fill",
    "prompt": "It is cold, ___?",
    "answer": "isn’t it",
    "why": "Утвердительное is → isn’t it."
   },
   {
    "id": "question-tags-f2",
    "type": "fill",
    "prompt": "They didn’t call, ___?",
    "answer": "did they",
    "why": "Отрицание did not → did they."
   },
   {
    "id": "question-tags-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: She works here, isn’t she?",
    "answer": "She works here, doesn’t she?",
    "why": "Для Present Simple без be в хвостике нужен does."
   }
  ]
 },
 {
  "id": "phrasal-verbs",
  "level": "B1",
  "category": "Глагольные конструкции",
  "title": "Phrasal verbs — частицы и порядок слов",
  "brief": "Фразовые глаголы состоят из глагола и частицы/предлога. С некоторыми объект можно ставить в середину, с другими нельзя.",
  "notes": [
   "Turn off the light = turn the light off. Но местоимение: turn it off, НЕ turn off it.",
   "Look after someone — неразделяемое: look after the child / look after him."
  ],
  "uses": [
   {
    "label": "separable",
    "detail": "Объект может стоять в середине",
    "example": "turn the radio off"
   },
   {
    "label": "pronoun",
    "detail": "Местоимение между частями",
    "example": "turn it off"
   },
   {
    "label": "inseparable",
    "detail": "Части не разделяются",
    "example": "look after them"
   }
  ],
  "examples": [
   {
    "en": "Please turn off the light.",
    "ru": "Пожалуйста, выключи свет."
   },
   {
    "en": "Please turn it off.",
    "ru": "Пожалуйста, выключи его."
   },
   {
    "en": "I will look after the cat.",
    "ru": "Я присмотрю за котом."
   },
   {
    "en": "We need to follow up on the ticket.",
    "ru": "Нужно уточнить статус обращения."
   }
  ],
  "mistake": {
   "wrong": "Please turn off it.",
   "right": "Please turn it off.",
   "why": "С разделяемым turn off местоимение ставится между verb и particle."
  },
  "tasks": [
   {
    "id": "phrasal-verbs-c1",
    "type": "choice",
    "prompt": "Turn ___ off, please.",
    "options": [
     "it",
     "off it",
     "to it"
    ],
    "answer": "it",
    "why": "Turn it off."
   },
   {
    "id": "phrasal-verbs-c2",
    "type": "choice",
    "prompt": "She looks ___ her sister.",
    "options": [
     "into",
     "after",
     "up"
    ],
    "answer": "after",
    "why": "Look after — присматривать."
   },
   {
    "id": "phrasal-verbs-c3",
    "type": "choice",
    "prompt": "We will ___ up on this case.",
    "options": [
     "turn",
     "give",
     "follow"
    ],
    "answer": "follow",
    "why": "Follow up on — вернуться к вопросу."
   },
   {
    "id": "phrasal-verbs-f1",
    "type": "fill",
    "prompt": "Please ___ the lights off.",
    "answer": "turn",
    "why": "Turn the lights off."
   },
   {
    "id": "phrasal-verbs-f2",
    "type": "fill",
    "prompt": "I will look ___ the children.",
    "answer": "after",
    "why": "Look after + object."
   },
   {
    "id": "phrasal-verbs-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Please turn off it.",
    "answer": "Please turn it off.",
    "why": "С разделяемым turn off местоимение ставится между verb и particle."
   }
  ]
 },
 {
  "id": "stative-verbs",
  "level": "B1",
  "category": "Времена и планы",
  "title": "Stative verbs — когда не нужен Continuous",
  "brief": "Know, believe, own, want и многие другие глаголы состояния обычно не ставятся в Continuous.",
  "notes": [
   "I know the answer, а не I am knowing.",
   "У некоторых глаголов разные значения: I think he is right (мнение), I am thinking about it (обдумываю)."
  ],
  "uses": [
   {
    "label": "state",
    "detail": "Состояние — чаще Simple",
    "example": "I understand the rule."
   },
   {
    "label": "activity",
    "detail": "Действие — может Continuous",
    "example": "I am thinking about it."
   },
   {
    "label": "sense",
    "detail": "Восприятие — зависит от значения",
    "example": "I see your point."
   }
  ],
  "examples": [
   {
    "en": "I know the answer.",
    "ru": "Я знаю ответ."
   },
   {
    "en": "She wants a new job.",
    "ru": "Она хочет новую работу."
   },
   {
    "en": "I am thinking about the problem.",
    "ru": "Я обдумываю проблему."
   },
   {
    "en": "I understand what you mean.",
    "ru": "Я понимаю, что ты имеешь в виду."
   }
  ],
  "mistake": {
   "wrong": "I am knowing the answer.",
   "right": "I know the answer.",
   "why": "Know в значении «знать» — stative."
  },
  "tasks": [
   {
    "id": "stative-verbs-c1",
    "type": "choice",
    "prompt": "I ___ what you mean.",
    "options": [
     "am understanding",
     "understand",
     "understanding"
    ],
    "answer": "understand",
    "why": "Understand — обычно Simple."
   },
   {
    "id": "stative-verbs-c2",
    "type": "choice",
    "prompt": "She ___ two cars.",
    "options": [
     "owns",
     "is owning",
     "own"
    ],
    "answer": "owns",
    "why": "Own — состояние владения."
   },
   {
    "id": "stative-verbs-c3",
    "type": "choice",
    "prompt": "I ___ about changing jobs.",
    "options": [
     "think",
     "am thinking",
     "knows"
    ],
    "answer": "am thinking",
    "why": "Процесс обдумывания — am thinking."
   },
   {
    "id": "stative-verbs-f1",
    "type": "fill",
    "prompt": "I ___ the answer.",
    "answer": "know",
    "why": "Know — Simple."
   },
   {
    "id": "stative-verbs-f2",
    "type": "fill",
    "prompt": "She ___ to work remotely.",
    "answer": "wants",
    "why": "Want — stative в этом значении."
   },
   {
    "id": "stative-verbs-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I am knowing the answer.",
    "answer": "I know the answer.",
    "why": "Know в значении «знать» — stative."
   }
  ]
 },
 {
  "id": "politeness-requests",
  "level": "B1",
  "category": "Основы предложения",
  "title": "Could / Would / Mind — вежливые просьбы",
  "brief": "Для работы и общения важно смягчать вопросы и просьбы, особенно к незнакомым людям.",
  "notes": [
   "Could you please check this? Would you mind checking this?",
   "После mind обычно -ing: Would you mind sending the file? После could — базовая форма: Could you send…?"
  ],
  "uses": [
   {
    "label": "could you",
    "detail": "Вежливая просьба",
    "example": "Could you help me?"
   },
   {
    "label": "would you mind + -ing",
    "detail": "Очень вежливая просьба",
    "example": "Would you mind waiting?"
   },
   {
    "label": "would you like",
    "detail": "Предложение",
    "example": "Would you like some tea?"
   }
  ],
  "examples": [
   {
    "en": "Could you please confirm the amount?",
    "ru": "Не могли бы вы подтвердить сумму?"
   },
   {
    "en": "Would you mind waiting a moment?",
    "ru": "Вы не против немного подождать?"
   },
   {
    "en": "Would you like some help?",
    "ru": "Вам нужна помощь?"
   },
   {
    "en": "Could you share the transaction ID?",
    "ru": "Не могли бы вы указать ID транзакции?"
   }
  ],
  "mistake": {
   "wrong": "Would you mind to wait?",
   "right": "Would you mind waiting?",
   "why": "После mind обычно -ing."
  },
  "tasks": [
   {
    "id": "politeness-requests-c1",
    "type": "choice",
    "prompt": "Would you mind ___?",
    "options": [
     "to wait",
     "waiting",
     "wait"
    ],
    "answer": "waiting",
    "why": "Mind + -ing."
   },
   {
    "id": "politeness-requests-c2",
    "type": "choice",
    "prompt": "Could you ___ this file?",
    "options": [
     "check",
     "checking",
     "to check"
    ],
    "answer": "check",
    "why": "После could базовый глагол."
   },
   {
    "id": "politeness-requests-c3",
    "type": "choice",
    "prompt": "___ you like some coffee?",
    "options": [
     "Could",
     "Do",
     "Would"
    ],
    "answer": "Would",
    "why": "Would you like — предложение."
   },
   {
    "id": "politeness-requests-f1",
    "type": "fill",
    "prompt": "Would you mind ___ me the reference number?",
    "answer": "sending",
    "why": "После mind — -ing."
   },
   {
    "id": "politeness-requests-f2",
    "type": "fill",
    "prompt": "Could you please ___ the details?",
    "answer": "confirm",
    "why": "Could you + V."
   },
   {
    "id": "politeness-requests-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Would you mind to wait?",
    "answer": "Would you mind waiting?",
    "why": "После mind обычно -ing."
   }
  ]
 },
 {
  "id": "wish-if-only",
  "level": "B2",
  "category": "Сложные предложения",
  "title": "Wish / If only — сожаления",
  "brief": "Wish + Past Simple часто о желаемой иной ситуации сейчас; wish + Past Perfect — о прошлом сожалении.",
  "notes": [
   "I wish I knew more. I wish I had studied harder.",
   "Wish someone would — желание изменения поведения: I wish he would reply."
  ],
  "uses": [
   {
    "label": "wish + past",
    "detail": "Воображаемое сейчас",
    "example": "I wish I had time."
   },
   {
    "label": "wish + past perfect",
    "detail": "Сожаление о прошлом",
    "example": "I wish I had called."
   },
   {
    "label": "wish + would",
    "detail": "Желание перемены",
    "example": "I wish they would listen."
   }
  ],
  "examples": [
   {
    "en": "I wish I knew the answer.",
    "ru": "Жаль, что я не знаю ответа."
   },
   {
    "en": "If only I had called earlier!",
    "ru": "Если бы я только позвонил раньше!"
   },
   {
    "en": "I wish they would reply sooner.",
    "ru": "Хотелось бы, чтобы они отвечали быстрее."
   },
   {
    "en": "I wish I were more confident.",
    "ru": "Хотелось бы мне быть увереннее."
   }
  ],
  "mistake": {
   "wrong": "I wish I know the answer.",
   "right": "I wish I knew the answer.",
   "why": "Для нереальной ситуации сейчас используется Past form."
  },
  "tasks": [
   {
    "id": "wish-if-only-c1",
    "type": "choice",
    "prompt": "I wish I ___ more time today.",
    "options": [
     "have",
     "had",
     "will have"
    ],
    "answer": "had",
    "why": "Wish о настоящем — Past Simple."
   },
   {
    "id": "wish-if-only-c2",
    "type": "choice",
    "prompt": "I wish I ___ earlier yesterday.",
    "options": [
     "had arrived",
     "arrive",
     "would arrive"
    ],
    "answer": "had arrived",
    "why": "Сожаление о прошлом — Past Perfect."
   },
   {
    "id": "wish-if-only-c3",
    "type": "choice",
    "prompt": "I wish he ___ answer my messages.",
    "options": [
     "will",
     "has",
     "would"
    ],
    "answer": "would",
    "why": "Желание изменения — would."
   },
   {
    "id": "wish-if-only-f1",
    "type": "fill",
    "prompt": "I wish I ___ rich.",
    "answer": "were",
    "why": "Wish + were — стандартная форма в формальном употреблении."
   },
   {
    "id": "wish-if-only-f2",
    "type": "fill",
    "prompt": "If only I had ___ more. (учился)",
    "answer": "studied",
    "why": "Past Perfect о прошлом."
   },
   {
    "id": "wish-if-only-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I wish I know the answer.",
    "answer": "I wish I knew the answer.",
    "why": "Для нереальной ситуации сейчас используется Past form."
   }
  ]
 },
 {
  "id": "complex-contrast",
  "level": "B2",
  "category": "Сложные предложения",
  "title": "Unless / As long as / In case",
  "brief": "Unless = if not; as long as = при условии; in case = на случай, если.",
  "notes": [
   "I will call unless you object. You can join as long as you register. Take an umbrella in case it rains.",
   "In case и if не одно и то же: in case описывает подготовку к возможному событию."
  ],
  "uses": [
   {
    "label": "unless",
    "detail": "Если не",
    "example": "Unless it rains, we will go."
   },
   {
    "label": "as long as",
    "detail": "При условии что",
    "example": "You can stay as long as you help."
   },
   {
    "label": "in case",
    "detail": "На случай если",
    "example": "Save a copy in case something fails."
   }
  ],
  "examples": [
   {
    "en": "I will go unless I get sick.",
    "ru": "Я пойду, если не заболею."
   },
   {
    "en": "You can leave as long as the work is done.",
    "ru": "Можешь уйти при условии, что работа выполнена."
   },
   {
    "en": "Keep a backup in case the file is lost.",
    "ru": "Сохрани копию на случай потери файла."
   },
   {
    "en": "Unless you ask, I will not change it.",
    "ru": "Если не попросишь, я не изменю это."
   }
  ],
  "mistake": {
   "wrong": "Unless you do not hurry, you will be late.",
   "right": "Unless you hurry, you will be late.",
   "why": "Unless уже означает if not, второе отрицание меняет смысл."
  },
  "tasks": [
   {
    "id": "complex-contrast-c1",
    "type": "choice",
    "prompt": "Take a charger ___ your phone dies.",
    "options": [
     "unless",
     "in case",
     "as long as"
    ],
    "answer": "in case",
    "why": "Подготовка к возможному событию — in case."
   },
   {
    "id": "complex-contrast-c2",
    "type": "choice",
    "prompt": "I will call ___ you tell me not to.",
    "options": [
     "unless",
     "in case",
     "because"
    ],
    "answer": "unless",
    "why": "Если не скажешь обратное — unless."
   },
   {
    "id": "complex-contrast-c3",
    "type": "choice",
    "prompt": "You can use it ___ you follow the rules.",
    "options": [
     "unless",
     "in case",
     "as long as"
    ],
    "answer": "as long as",
    "why": "Условие — as long as."
   },
   {
    "id": "complex-contrast-f1",
    "type": "fill",
    "prompt": "Save your work ___ the computer crashes.",
    "answer": "in case",
    "why": "На случай возможного сбоя."
   },
   {
    "id": "complex-contrast-f2",
    "type": "fill",
    "prompt": "___ you hurry, you will miss the train.",
    "answer": "Unless",
    "why": "If you do not hurry — unless you hurry."
   },
   {
    "id": "complex-contrast-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Unless you do not hurry, you will be late.",
    "answer": "Unless you hurry, you will be late.",
    "why": "Unless уже означает if not, второе отрицание меняет смысл."
   }
  ]
 },
 {
  "id": "modal-perfect",
  "level": "B2",
  "category": "Глагольные конструкции",
  "title": "Should have / Might have / Must have",
  "brief": "Модальный + have + V3 помогает говорить о прошлом: сожаление, предположение или почти уверенный вывод.",
  "notes": [
   "You should have checked — следовало проверить (но не проверил).",
   "He might have forgotten — возможно, забыл. She must have left — должно быть, ушла."
  ],
  "uses": [
   {
    "label": "should have + V3",
    "detail": "Упрёк / сожаление",
    "example": "I should have replied."
   },
   {
    "label": "might have + V3",
    "detail": "Неуверенное предположение",
    "example": "He might have missed it."
   },
   {
    "label": "must have + V3",
    "detail": "Сильный вывод",
    "example": "She must have left."
   }
  ],
  "examples": [
   {
    "en": "I should have checked the details.",
    "ru": "Мне следовало проверить детали."
   },
   {
    "en": "He might have forgotten.",
    "ru": "Возможно, он забыл."
   },
   {
    "en": "She must have arrived already.",
    "ru": "Должно быть, она уже приехала."
   },
   {
    "en": "You could have asked for help.",
    "ru": "Ты мог попросить о помощи."
   }
  ],
  "mistake": {
   "wrong": "You should have check the file.",
   "right": "You should have checked the file.",
   "why": "После should have используется V3."
  },
  "tasks": [
   {
    "id": "modal-perfect-c1",
    "type": "choice",
    "prompt": "He ___ have missed the train. (возможно)",
    "options": [
     "should",
     "might",
     "must to"
    ],
    "answer": "might",
    "why": "Вероятность — might have."
   },
   {
    "id": "modal-perfect-c2",
    "type": "choice",
    "prompt": "You ___ have apologized. (следовало)",
    "options": [
     "should",
     "might",
     "may"
    ],
    "answer": "should",
    "why": "Совет о прошлом — should have."
   },
   {
    "id": "modal-perfect-c3",
    "type": "choice",
    "prompt": "She ___ have left: her coat is gone.",
    "options": [
     "should",
     "couldn’t",
     "must"
    ],
    "answer": "must",
    "why": "Сильный вывод по признаку — must have."
   },
   {
    "id": "modal-perfect-f1",
    "type": "fill",
    "prompt": "I should have ___ sooner.",
    "answer": "called",
    "why": "Should have + V3."
   },
   {
    "id": "modal-perfect-f2",
    "type": "fill",
    "prompt": "He might have ___ the email.",
    "answer": "missed",
    "why": "Might have + V3."
   },
   {
    "id": "modal-perfect-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: You should have check the file.",
    "answer": "You should have checked the file.",
    "why": "После should have используется V3."
   }
  ]
 },
 {
  "id": "inversion",
  "level": "B2",
  "category": "Сложные предложения",
  "title": "Negative inversion — Never / Rarely",
  "brief": "После начального never, rarely, hardly, not only и похожих выражений часто нужна инверсия вспомогательного глагола.",
  "notes": [
   "Never have I seen this before. Rarely do we receive such requests.",
   "В обычном нейтральном порядке: I have never seen this before. Инверсия — стилистическое усиление."
  ],
  "uses": [
   {
    "label": "never + aux + S",
    "detail": "Усиление отрицанием",
    "example": "Never have I felt so ready."
   },
   {
    "label": "rarely + do/does",
    "detail": "Редкость",
    "example": "Rarely do we see that."
   },
   {
    "label": "not only + aux",
    "detail": "Усиленный контраст",
    "example": "Not only did she call, but she wrote."
   }
  ],
  "examples": [
   {
    "en": "Never have I seen such a delay.",
    "ru": "Никогда я не видел такой задержки."
   },
   {
    "en": "Rarely do we get this request.",
    "ru": "Мы редко получаем такой запрос."
   },
   {
    "en": "Not only did he call, but he emailed.",
    "ru": "Он не только позвонил, но и написал."
   },
   {
    "en": "Hardly had I arrived when it started.",
    "ru": "Едва я приехал, как всё началось."
   }
  ],
  "mistake": {
   "wrong": "Never I have seen this.",
   "right": "Never have I seen this.",
   "why": "После начального never — инверсия вспомогательного глагола."
  },
  "tasks": [
   {
    "id": "inversion-c1",
    "type": "choice",
    "prompt": "Never ___ I seen this before.",
    "options": [
     "do",
     "have",
     "am"
    ],
    "answer": "have",
    "why": "Present Perfect — have I."
   },
   {
    "id": "inversion-c2",
    "type": "choice",
    "prompt": "Rarely ___ she complain.",
    "options": [
     "does",
     "is",
     "has"
    ],
    "answer": "does",
    "why": "Present Simple — does she."
   },
   {
    "id": "inversion-c3",
    "type": "choice",
    "prompt": "Not only ___ he help, but he also stayed.",
    "options": [
     "has",
     "was",
     "did"
    ],
    "answer": "did",
    "why": "Past Simple — did he."
   },
   {
    "id": "inversion-f1",
    "type": "fill",
    "prompt": "Never ___ she been so happy.",
    "answer": "has",
    "why": "Never has she…"
   },
   {
    "id": "inversion-f2",
    "type": "fill",
    "prompt": "Rarely ___ we see such problems.",
    "answer": "do",
    "why": "Rarely do we…"
   },
   {
    "id": "inversion-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: Never I have seen this.",
    "answer": "Never have I seen this.",
    "why": "После начального never — инверсия вспомогательного глагола."
   }
  ]
 },
 {
  "id": "causative",
  "level": "B2",
  "category": "Глагольные конструкции",
  "title": "Have / Get something done",
  "brief": "Causative показывает, что услугу выполнил другой человек: I had my phone repaired.",
  "notes": [
   "Have/get + object + V3: She got her passport renewed.",
   "Сравни I repaired my laptop (сам), I had my laptop repaired (кто-то отремонтировал)."
  ],
  "uses": [
   {
    "label": "have + obj + V3",
    "detail": "Организовал услугу",
    "example": "I had my car washed."
   },
   {
    "label": "get + obj + V3",
    "detail": "То же, более разговорно",
    "example": "I got my phone fixed."
   },
   {
    "label": "do it myself",
    "detail": "Сделал самостоятельно",
    "example": "I repaired the bike."
   }
  ],
  "examples": [
   {
    "en": "I had my car repaired.",
    "ru": "Мне отремонтировали машину."
   },
   {
    "en": "She got her hair cut.",
    "ru": "Она подстриглась у мастера."
   },
   {
    "en": "We had the documents translated.",
    "ru": "Нам перевели документы."
   },
   {
    "en": "I fixed the issue myself.",
    "ru": "Я исправил проблему сам."
   }
  ],
  "mistake": {
   "wrong": "I had my car repair.",
   "right": "I had my car repaired.",
   "why": "После object используется V3."
  },
  "tasks": [
   {
    "id": "causative-c1",
    "type": "choice",
    "prompt": "I had my phone ___.",
    "options": [
     "fix",
     "fixed",
     "fixing"
    ],
    "answer": "fixed",
    "why": "Have something done."
   },
   {
    "id": "causative-c2",
    "type": "choice",
    "prompt": "She got her hair ___.",
    "options": [
     "cut",
     "cutting",
     "to cut"
    ],
    "answer": "cut",
    "why": "V3 cut = cut."
   },
   {
    "id": "causative-c3",
    "type": "choice",
    "prompt": "We ___ the contract translated.",
    "options": [
     "were",
     "made",
     "had"
    ],
    "answer": "had",
    "why": "Had something translated — услуга."
   },
   {
    "id": "causative-f1",
    "type": "fill",
    "prompt": "I got my laptop ___.",
    "answer": "repaired",
    "why": "Get + object + V3."
   },
   {
    "id": "causative-f2",
    "type": "fill",
    "prompt": "She had her room ___.",
    "answer": "painted",
    "why": "Have + object + V3."
   },
   {
    "id": "causative-fix",
    "type": "fix",
    "prompt": "Исправь ошибку в предложении: I had my car repair.",
    "answer": "I had my car repaired.",
    "why": "После object используется V3."
   }
  ]
 }
] as GrammarRule[];

/** 18-step training per rule: 6 legacy checks, 3 independently authored scenarios,
 * 4 translations, 3 interactive word-order tasks, 2 listening dictations.
 * Keep the legacy ids unchanged for old errors, progress and saved profiles.
 */
export function expandRulePractice(rule:GrammarRule, scenarios:RuleTask[]):GrammarRule{
 const transfers:RuleTask[]=rule.examples.map((e,i)=>({
  id:`${rule.id}-deep-translate-${i+1}`,type:'translate',
  prompt:`Переведи по образцу: ${e.ru}`,answer:e.en,
  hint:`Составь полное предложение по-английски. Тема: ${rule.title}.`,
  why:`Учебный образец: «${e.en}». ${rule.brief} Другой грамотный перевод можно засчитать после самостоятельной сверки.`
 }));
 const orders:RuleTask[]=rule.examples.slice(0,3).map((e,i)=>({
  id:`${rule.id}-deep-order-${i+1}`,type:'order',
  prompt:`Собери предложение из слов. Перевод: ${e.ru}`,
  answer:e.en,tokens:shuffleRuleTokens(e.en,`${rule.id}-${i}`),
  why:`Порядок слов: «${e.en}». ${rule.brief}`
 }));
 const listening:RuleTask[]=rule.examples.slice(2,4).map((e,i)=>({
  id:`${rule.id}-deep-listen-${i+1}`,type:'dictation',
  prompt:'Прослушай английскую реплику и запиши её полностью.',
  answer:e.en,hint:`Перевод для самопроверки: ${e.ru}`,
  why:`В аудиоупражнении прозвучало: «${e.en}». ${rule.brief}`
 }));
 return {...rule,tasks:[...rule.tasks,...scenarios,...transfers,...orders,...listening]};
}

/** Stable shuffle makes word-order cards reproducible and usable on repeated words. */
export function shuffleRuleTokens(sentence:string,seed:string):string[]{
 const words=sentence.trim().split(/\s+/);
 if(words.length<2)return words;
 let value=0;for(let i=0;i<seed.length;i++)value=(Math.imul(31,value)+seed.charCodeAt(i))>>>0;
 const shuffled=[...words];
 for(let i=shuffled.length-1;i>0;i--){value=(Math.imul(value,1664525)+1013904223)>>>0;const j=value%(i+1);[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
 if(shuffled.every((word,i)=>word===words[i]))[shuffled[0],shuffled[1]]=[shuffled[1],shuffled[0]];
 return shuffled;
}
export const GRAMMAR_RULES:GrammarRule[]=BASE_GRAMMAR_RULES.map(rule=>expandRulePractice(rule,(extraContexts as Record<string,RuleTask[]>)[rule.id]||[]));

export const RULE_CATEGORIES:RuleCategory[]=Array.from(new Set(GRAMMAR_RULES.map(r=>r.category)));
const contractions:Record<string,string>={
 "i'm":"i am","you're":"you are","we're":"we are","they're":"they are","he's":"he is","she's":"she is","it's":"it is",
 "i've":"i have","you've":"you have","we've":"we have","they've":"they have",
 "i'll":"i will","you'll":"you will","he'll":"he will","she'll":"she will","we'll":"we will","they'll":"they will","it'll":"it will",
 "don't":"do not","doesn't":"does not","didn't":"did not","can't":"cannot","won't":"will not","isn't":"is not","aren't":"are not","wasn't":"was not","weren't":"were not","couldn't":"could not","wouldn't":"would not","shouldn't":"should not"
};
export function normalizeRuleAnswer(s:string){
 return s.trim().toLowerCase().replace(/[’‘]/g,"'")
  .replace(/\b(?:i'm|you're|we're|they're|he's|she's|it's|i've|you've|we've|they've|i'll|you'll|he'll|she'll|we'll|they'll|it'll|don't|doesn't|didn't|can't|won't|isn't|aren't|wasn't|weren't|couldn't|wouldn't|shouldn't)\b/g,(x)=>contractions[x]||x)
  .replace(/[.!?,;:]+/g,' ').replace(/\s+/g,' ').trim();
}
export function isRuleTaskCorrect(task:RuleTask,response:string){return [task.answer,...(task.accepted||[])].some(a=>normalizeRuleAnswer(response)===normalizeRuleAnswer(a));}
export function filterGrammarRules(terms:{search?:string;level?:Level|'all';category?:RuleCategory|'all'},rules=GRAMMAR_RULES){
 const query=String(terms.search||'').toLocaleLowerCase('ru').trim();return rules.filter(rule=>(!terms.level||terms.level==='all'||rule.level===terms.level)&&(!terms.category||terms.category==='all'||rule.category===terms.category)&&(!query||[rule.title,rule.brief,rule.category,rule.level,...rule.notes,...rule.uses.flatMap(u=>[u.label,u.detail,u.example]),...rule.examples.flatMap(e=>[e.en,e.ru])].join(' ').toLocaleLowerCase('ru').includes(query)));
}
export const RULE_TOTALS={topics:GRAMMAR_RULES.length,tasks:GRAMMAR_RULES.reduce((sum,r)=>sum+r.tasks.length,0),examples:GRAMMAR_RULES.reduce((sum,r)=>sum+r.examples.length,0)};
