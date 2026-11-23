import type {RuleTask} from "./grammar-reference.ts";
/** Independently authored contextual exercises with Russian explanations. */
export const extraContexts:Record<string,RuleTask[]> = {
  "articles-a-an": [
    {
      "id": "articles-a-an-deep-context-1",
      "type": "choice",
      "prompt": "Can you give me ___ honest opinion?",
      "options": [
        "a",
        "an",
        "the"
      ],
      "answer": "an",
      "why": "В honest буква h не произносится, поэтому слово начинается с гласного звука и нужен an."
    },
    {
      "id": "articles-a-an-deep-context-2",
      "type": "choice",
      "prompt": "I have ___ useful suggestion for our team.",
      "options": [
        "a",
        "an",
        "some"
      ],
      "answer": "a",
      "why": "Useful начинается со звука /j/, поэтому ставим a."
    },
    {
      "id": "articles-a-an-deep-context-3",
      "type": "choice",
      "prompt": "We bought ___ new monitors for the office.",
      "options": [
        "a",
        "an",
        "—"
      ],
      "answer": "—",
      "why": "Перед множественным monitors не ставят a/an; здесь артикль не нужен."
    }
  ],
  "articles-the-zero": [
    {
      "id": "articles-the-zero-deep-context-1",
      "type": "choice",
      "prompt": "I found a key. ___ key was under the sofa.",
      "options": [
        "A",
        "The",
        "—"
      ],
      "answer": "The",
      "why": "Ключ уже упоминался, значит речь об известном предмете — нужен the."
    },
    {
      "id": "articles-the-zero-deep-context-2",
      "type": "choice",
      "prompt": "___ music helps me relax after work. (Music in general)",
      "options": [
        "—",
        "The",
        "An"
      ],
      "answer": "—",
      "why": "Когда говорим о музыке вообще, с неисчисляемым music артикль не нужен."
    },
    {
      "id": "articles-the-zero-deep-context-3",
      "type": "choice",
      "prompt": "___ moon looks bright tonight.",
      "options": [
        "A",
        "—",
        "The"
      ],
      "answer": "The",
      "why": "Луна в данном контексте уникальна, поэтому говорим the moon."
    }
  ],
  "countable": [
    {
      "id": "countable-deep-context-1",
      "type": "choice",
      "prompt": "We have three ___ of advice from the trainer.",
      "options": [
        "advices",
        "pieces",
        "piece"
      ],
      "answer": "pieces",
      "why": "Advice неисчисляемое; три совета — three pieces of advice."
    },
    {
      "id": "countable-deep-context-2",
      "type": "choice",
      "prompt": "Choose a natural phrase: \"two ___\".",
      "options": [
        "requests",
        "information",
        "equipment"
      ],
      "answer": "requests",
      "why": "Requests можно посчитать и поставить во множественное число: two requests."
    },
    {
      "id": "countable-deep-context-3",
      "type": "choice",
      "prompt": "Which word can follow \"an\" here: \"an ___\"?",
      "options": [
        "equipment",
        "advice",
        "idea"
      ],
      "answer": "idea",
      "why": "Idea исчисляемое, поэтому сочетание an idea правильно; advice и equipment неисчисляемые."
    }
  ],
  "personal-pronouns": [
    {
      "id": "personal-pronouns-deep-context-1",
      "type": "choice",
      "prompt": "The manager invited Anna and ___ to the meeting.",
      "options": [
        "I",
        "me",
        "my"
      ],
      "answer": "me",
      "why": "После invited требуется объектная форма me, а не I."
    },
    {
      "id": "personal-pronouns-deep-context-2",
      "type": "choice",
      "prompt": "___ are responsible for the report. (Tom and I)",
      "options": [
        "We",
        "Us",
        "Our"
      ],
      "answer": "We",
      "why": "Перед are нужно подлежащее we, а не объектная форма us."
    },
    {
      "id": "personal-pronouns-deep-context-3",
      "type": "choice",
      "prompt": "I spoke to Sarah, and she sent the details to ___.",
      "options": [
        "he",
        "his",
        "him"
      ],
      "answer": "him",
      "why": "После предлога to нужна объектная форма him."
    }
  ],
  "possessive-pronouns": [
    {
      "id": "possessive-pronouns-deep-context-1",
      "type": "choice",
      "prompt": "This seat isn't ours. Is it ___? (belongs to you)",
      "options": [
        "your",
        "yours",
        "you"
      ],
      "answer": "yours",
      "why": "Yours заменяет сочетание your seat и употребляется без существительного."
    },
    {
      "id": "possessive-pronouns-deep-context-2",
      "type": "choice",
      "prompt": "My friend forgot ___ password.",
      "options": [
        "her",
        "hers",
        "she"
      ],
      "answer": "her",
      "why": "Перед password нужен притяжательный определитель her."
    },
    {
      "id": "possessive-pronouns-deep-context-3",
      "type": "choice",
      "prompt": "The dog is wagging ___ tail.",
      "options": [
        "it's",
        "it",
        "its"
      ],
      "answer": "its",
      "why": "Its показывает принадлежность; it's — сокращение от it is."
    }
  ],
  "reflexive": [
    {
      "id": "reflexive-deep-context-1",
      "type": "choice",
      "prompt": "The two colleagues helped ___ finish their tasks.",
      "options": [
        "themselves",
        "each other",
        "themself"
      ],
      "answer": "each other",
      "why": "Each other означает, что коллеги помогли друг другу."
    },
    {
      "id": "reflexive-deep-context-2",
      "type": "choice",
      "prompt": "I made this website by ___.",
      "options": [
        "myself",
        "me",
        "mine"
      ],
      "answer": "myself",
      "why": "By myself значит «самостоятельно, без чьей-либо помощи»."
    },
    {
      "id": "reflexive-deep-context-3",
      "type": "choice",
      "prompt": "Children, please introduce ___ to the group.",
      "options": [
        "yourself",
        "ourselves",
        "yourselves"
      ],
      "answer": "yourselves",
      "why": "К нескольким детям обращаются с формой yourselves."
    }
  ],
  "this-that": [
    {
      "id": "this-that-deep-context-1",
      "type": "choice",
      "prompt": "___ emails on my screen are urgent. (Near me)",
      "options": [
        "Those",
        "These",
        "This"
      ],
      "answer": "These",
      "why": "These относится к нескольким предметам, которые находятся рядом."
    },
    {
      "id": "this-that-deep-context-2",
      "type": "choice",
      "prompt": "Look at ___ building across the street. (Far away)",
      "options": [
        "that",
        "this",
        "these"
      ],
      "answer": "that",
      "why": "That обозначает один предмет вдали от говорящего."
    },
    {
      "id": "this-that-deep-context-3",
      "type": "choice",
      "prompt": "___ is my new notebook. (I am holding it)",
      "options": [
        "Those",
        "These",
        "This"
      ],
      "answer": "This",
      "why": "This — один предмет вблизи говорящего."
    }
  ],
  "some-any": [
    {
      "id": "some-any-deep-context-1",
      "type": "choice",
      "prompt": "Could I have ___ more tea, please?",
      "options": [
        "any",
        "some",
        "no"
      ],
      "answer": "some",
      "why": "В вежливой просьбе о чае обычно используется some."
    },
    {
      "id": "some-any-deep-context-2",
      "type": "choice",
      "prompt": "We don't have ___ free rooms tonight.",
      "options": [
        "any",
        "some",
        "no"
      ],
      "answer": "any",
      "why": "После отрицания don't have употребляется any."
    },
    {
      "id": "some-any-deep-context-3",
      "type": "choice",
      "prompt": "There are ___ messages in my inbox. (A positive statement)",
      "options": [
        "any",
        "no",
        "some"
      ],
      "answer": "some",
      "why": "В утвердительном предложении перед messages естественно some."
    }
  ],
  "much-many": [
    {
      "id": "much-many-deep-context-1",
      "type": "choice",
      "prompt": "How ___ money do we need for the tickets?",
      "options": [
        "many",
        "much",
        "few"
      ],
      "answer": "much",
      "why": "Money здесь неисчисляемое, поэтому используем much."
    },
    {
      "id": "much-many-deep-context-2",
      "type": "choice",
      "prompt": "There aren't ___ people in the queue.",
      "options": [
        "many",
        "much",
        "little"
      ],
      "answer": "many",
      "why": "People — исчисляемое множественное число; подойдёт many."
    },
    {
      "id": "much-many-deep-context-3",
      "type": "choice",
      "prompt": "He has ___ experience in customer support.",
      "options": [
        "many",
        "a few",
        "a lot of"
      ],
      "answer": "a lot of",
      "why": "Experience в значении «опыт» неисчисляемое; a lot of подходит."
    }
  ],
  "few-little": [
    {
      "id": "few-little-deep-context-1",
      "type": "choice",
      "prompt": "I can help; I still have ___ free minutes.",
      "options": [
        "a little",
        "a few",
        "little"
      ],
      "answer": "a few",
      "why": "Minutes можно посчитать: a few означает «несколько»."
    },
    {
      "id": "few-little-deep-context-2",
      "type": "choice",
      "prompt": "We can't finish; there is very ___ information.",
      "options": [
        "little",
        "few",
        "a few"
      ],
      "answer": "little",
      "why": "Information неисчисляемое, little показывает нехватку."
    },
    {
      "id": "few-little-deep-context-3",
      "type": "choice",
      "prompt": "There's ___ sugar left, enough for one cup.",
      "options": [
        "a few",
        "few",
        "a little"
      ],
      "answer": "a little",
      "why": "Sugar неисчисляемое, a little — «немного, но есть»."
    }
  ],
  "there-is-are": [
    {
      "id": "there-is-are-deep-context-1",
      "type": "choice",
      "prompt": "___ three updates in the ticket.",
      "options": [
        "There is",
        "There are",
        "It is"
      ],
      "answer": "There are",
      "why": "Three updates — множественное число, поэтому there are."
    },
    {
      "id": "there-is-are-deep-context-2",
      "type": "choice",
      "prompt": "___ a problem with the server?",
      "options": [
        "Is there",
        "Are there",
        "There is"
      ],
      "answer": "Is there",
      "why": "В вопросе с единственным a problem ставим Is there."
    },
    {
      "id": "there-is-are-deep-context-3",
      "type": "choice",
      "prompt": "___ some useful advice in this guide.",
      "options": [
        "There are",
        "There were",
        "There is"
      ],
      "answer": "There is",
      "why": "Advice неисчисляемое, поэтому используется there is."
    }
  ],
  "word-order": [
    {
      "id": "word-order-deep-context-1",
      "type": "choice",
      "prompt": "Choose the natural order: ___",
      "options": [
        "Usually I emails answer.",
        "I usually answer emails.",
        "I answer usually emails."
      ],
      "answer": "I usually answer emails.",
      "why": "Наречие usually обычно ставится перед смысловым глаголом answer."
    },
    {
      "id": "word-order-deep-context-2",
      "type": "choice",
      "prompt": "Choose the sentence with a correct adverb position.",
      "options": [
        "She is always on time.",
        "She always is on time.",
        "Always she is on time."
      ],
      "answer": "She is always on time.",
      "why": "С глаголом be наречие частоты ставят после него: is always."
    },
    {
      "id": "word-order-deep-context-3",
      "type": "choice",
      "prompt": "Which sentence puts the time phrase correctly?",
      "options": [
        "We the reports check every morning.",
        "Every we morning check the reports.",
        "We check the reports every morning."
      ],
      "answer": "We check the reports every morning.",
      "why": "Обычный порядок: подлежащее, сказуемое, дополнение, затем время."
    }
  ],
  "do-does": [
    {
      "id": "do-does-deep-context-1",
      "type": "choice",
      "prompt": "___ your colleagues work on weekends?",
      "options": [
        "Does",
        "Do",
        "Did"
      ],
      "answer": "Do",
      "why": "Colleagues — множественное число, поэтому в Present Simple нужен Do."
    },
    {
      "id": "do-does-deep-context-2",
      "type": "choice",
      "prompt": "___ she send the invoice yesterday?",
      "options": [
        "Did",
        "Does",
        "Do"
      ],
      "answer": "Did",
      "why": "Yesterday указывает на прошлое; вопрос строится с Did."
    },
    {
      "id": "do-does-deep-context-3",
      "type": "choice",
      "prompt": "He doesn't ___ this address.",
      "options": [
        "knows",
        "knew",
        "know"
      ],
      "answer": "know",
      "why": "После doesn't нужен глагол в начальной форме know без окончания -s."
    }
  ],
  "in-on-at-time": [
    {
      "id": "in-on-at-time-deep-context-1",
      "type": "choice",
      "prompt": "My shift starts ___ 8:30 a.m.",
      "options": [
        "in",
        "at",
        "on"
      ],
      "answer": "at",
      "why": "С точным временем 8:30 используем at."
    },
    {
      "id": "in-on-at-time-deep-context-2",
      "type": "choice",
      "prompt": "The conference is ___ September.",
      "options": [
        "in",
        "at",
        "on"
      ],
      "answer": "in",
      "why": "С названием месяца September ставится in."
    },
    {
      "id": "in-on-at-time-deep-context-3",
      "type": "choice",
      "prompt": "We will meet ___ Tuesday afternoon.",
      "options": [
        "in",
        "at",
        "on"
      ],
      "answer": "on",
      "why": "С днём недели Tuesday используется on, даже если добавлено afternoon."
    }
  ],
  "in-on-at-place": [
    {
      "id": "in-on-at-place-deep-context-1",
      "type": "choice",
      "prompt": "The document is ___ the drawer.",
      "options": [
        "at",
        "in",
        "on"
      ],
      "answer": "in",
      "why": "Документ внутри ящика, поэтому in."
    },
    {
      "id": "in-on-at-place-deep-context-2",
      "type": "choice",
      "prompt": "I'll meet you ___ the bus stop.",
      "options": [
        "at",
        "on",
        "in"
      ],
      "answer": "at",
      "why": "Автобусная остановка — конкретная точка встречи, поэтому at."
    },
    {
      "id": "in-on-at-place-deep-context-3",
      "type": "choice",
      "prompt": "The painting is hanging ___ the wall.",
      "options": [
        "in",
        "at",
        "on"
      ],
      "answer": "on",
      "why": "Картина находится на поверхности стены, поэтому on."
    }
  ],
  "to-into-onto": [
    {
      "id": "to-into-onto-deep-context-1",
      "type": "choice",
      "prompt": "She put the papers ___ the folder.",
      "options": [
        "to",
        "into",
        "onto"
      ],
      "answer": "into",
      "why": "Папка — внутренняя область, движение внутрь передаёт into."
    },
    {
      "id": "to-into-onto-deep-context-2",
      "type": "choice",
      "prompt": "The cat jumped ___ the table.",
      "options": [
        "onto",
        "into",
        "from"
      ],
      "answer": "onto",
      "why": "На поверхность стола перемещаются с предлогом onto."
    },
    {
      "id": "to-into-onto-deep-context-3",
      "type": "choice",
      "prompt": "I'm travelling ___ Chicago tomorrow.",
      "options": [
        "into",
        "onto",
        "to"
      ],
      "answer": "to",
      "why": "С городом назначения используем to: travelling to Chicago."
    }
  ],
  "for-since-during": [
    {
      "id": "for-since-during-deep-context-1",
      "type": "choice",
      "prompt": "I've been here ___ last Monday.",
      "options": [
        "for",
        "since",
        "during"
      ],
      "answer": "since",
      "why": "Last Monday — момент начала периода, поэтому since."
    },
    {
      "id": "for-since-during-deep-context-2",
      "type": "choice",
      "prompt": "I studied English ___ three hours.",
      "options": [
        "for",
        "since",
        "while"
      ],
      "answer": "for",
      "why": "Three hours — продолжительность, поэтому for."
    },
    {
      "id": "for-since-during-deep-context-3",
      "type": "choice",
      "prompt": "Please stay quiet ___ the presentation.",
      "options": [
        "while",
        "since",
        "during"
      ],
      "answer": "during",
      "why": "После during ставится существительное или именная группа: the presentation."
    }
  ],
  "by-with-for": [
    {
      "id": "by-with-for-deep-context-1",
      "type": "choice",
      "prompt": "The parcel must arrive ___ noon tomorrow. (Deadline)",
      "options": [
        "with",
        "by",
        "for"
      ],
      "answer": "by",
      "why": "Дедлайн «не позднее полудня» обозначается by."
    },
    {
      "id": "by-with-for-deep-context-2",
      "type": "choice",
      "prompt": "The file was signed ___ a digital pen.",
      "options": [
        "with",
        "by",
        "for"
      ],
      "answer": "with",
      "why": "Инструмент, которым подписали файл, вводится with."
    },
    {
      "id": "by-with-for-deep-context-3",
      "type": "choice",
      "prompt": "I prepared this guide ___ new employees.",
      "options": [
        "by",
        "with",
        "for"
      ],
      "answer": "for",
      "why": "For указывает, для кого подготовлено руководство."
    }
  ],
  "verb-prepositions": [
    {
      "id": "verb-prepositions-deep-context-1",
      "type": "choice",
      "prompt": "We're looking ___ a missing payment.",
      "options": [
        "to",
        "for",
        "at"
      ],
      "answer": "for",
      "why": "Look for означает «искать», а не просто «смотреть»."
    },
    {
      "id": "verb-prepositions-deep-context-2",
      "type": "choice",
      "prompt": "Please listen ___ the full recording.",
      "options": [
        "to",
        "for",
        "on"
      ],
      "answer": "to",
      "why": "После listen перед объектом нужен предлог to."
    },
    {
      "id": "verb-prepositions-deep-context-3",
      "type": "choice",
      "prompt": "Everything depends ___ the verification result.",
      "options": [
        "from",
        "at",
        "on"
      ],
      "answer": "on",
      "why": "Depend on — устойчивое сочетание «зависеть от»."
    }
  ],
  "adjective-prepositions": [
    {
      "id": "adjective-prepositions-deep-context-1",
      "type": "choice",
      "prompt": "I'm interested ___ remote work.",
      "options": [
        "at",
        "in",
        "for"
      ],
      "answer": "in",
      "why": "Прилагательное interested сочетается с in."
    },
    {
      "id": "adjective-prepositions-deep-context-2",
      "type": "choice",
      "prompt": "Who is responsible ___ the refund?",
      "options": [
        "for",
        "of",
        "with"
      ],
      "answer": "for",
      "why": "После responsible нужен предлог for."
    },
    {
      "id": "adjective-prepositions-deep-context-3",
      "type": "choice",
      "prompt": "She is very good ___ explaining rules.",
      "options": [
        "on",
        "for",
        "at"
      ],
      "answer": "at",
      "why": "Когда говорим о навыке, используем good at + существительное или -ing."
    }
  ],
  "say-tell-speak-talk": [
    {
      "id": "say-tell-speak-talk-deep-context-1",
      "type": "choice",
      "prompt": "Please ___ me what happened.",
      "options": [
        "say",
        "tell",
        "speak"
      ],
      "answer": "tell",
      "why": "Tell me — устойчивое управление: после tell можно назвать адресата."
    },
    {
      "id": "say-tell-speak-talk-deep-context-2",
      "type": "choice",
      "prompt": "I need to ___ to the supervisor privately.",
      "options": [
        "talk",
        "tell",
        "say"
      ],
      "answer": "talk",
      "why": "Talk to someone означает «поговорить с кем-то»."
    },
    {
      "id": "say-tell-speak-talk-deep-context-3",
      "type": "choice",
      "prompt": "She can ___ three languages.",
      "options": [
        "tell",
        "say",
        "speak"
      ],
      "answer": "speak",
      "why": "Для владения иностранными языками используется speak."
    }
  ],
  "make-do": [
    {
      "id": "make-do-deep-context-1",
      "type": "choice",
      "prompt": "Please ___ a decision before Friday.",
      "options": [
        "do",
        "make",
        "take"
      ],
      "answer": "make",
      "why": "Правильное устойчивое сочетание — make a decision."
    },
    {
      "id": "make-do-deep-context-2",
      "type": "choice",
      "prompt": "I have to ___ the laundry tonight.",
      "options": [
        "do",
        "make",
        "create"
      ],
      "answer": "do",
      "why": "Домашние дела выражаются сочетанием do the laundry."
    },
    {
      "id": "make-do-deep-context-3",
      "type": "choice",
      "prompt": "Don't worry if you ___ a mistake.",
      "options": [
        "do",
        "work",
        "make"
      ],
      "answer": "make",
      "why": "Ошибки «совершают»: make a mistake."
    }
  ],
  "look-see-watch": [
    {
      "id": "look-see-watch-deep-context-1",
      "type": "choice",
      "prompt": "Can you ___ the mountains from here?",
      "options": [
        "watch",
        "see",
        "look"
      ],
      "answer": "see",
      "why": "See описывает сам факт зрительного восприятия."
    },
    {
      "id": "look-see-watch-deep-context-2",
      "type": "choice",
      "prompt": "Please ___ at the last line of the email.",
      "options": [
        "look",
        "see",
        "watch"
      ],
      "answer": "look",
      "why": "Look at означает намеренно направить взгляд на что-то."
    },
    {
      "id": "look-see-watch-deep-context-3",
      "type": "choice",
      "prompt": "We often ___ the news in the evening.",
      "options": [
        "look",
        "see",
        "watch"
      ],
      "answer": "watch",
      "why": "Watch употребляется при просмотре передач и видео."
    }
  ],
  "hear-listen": [
    {
      "id": "hear-listen-deep-context-1",
      "type": "choice",
      "prompt": "I could ___ someone knocking on the door.",
      "options": [
        "listen",
        "hear",
        "listen to"
      ],
      "answer": "hear",
      "why": "Hear означает «услышать звук» без обязательного намерения."
    },
    {
      "id": "hear-listen-deep-context-2",
      "type": "choice",
      "prompt": "Please ___ to my explanation carefully.",
      "options": [
        "listen",
        "hear",
        "watch"
      ],
      "answer": "listen",
      "why": "Listen to — сознательно прислушиваться к чему-то."
    },
    {
      "id": "hear-listen-deep-context-3",
      "type": "choice",
      "prompt": "Could you repeat that? I didn't ___ you.",
      "options": [
        "listen",
        "watch",
        "hear"
      ],
      "answer": "hear",
      "why": "У hear может быть прямое дополнение без предлога."
    }
  ],
  "borrow-lend": [
    {
      "id": "borrow-lend-deep-context-1",
      "type": "choice",
      "prompt": "Can I ___ your dictionary until tomorrow?",
      "options": [
        "lend",
        "borrow",
        "take"
      ],
      "answer": "borrow",
      "why": "Borrow — взять что-то на время у другого человека."
    },
    {
      "id": "borrow-lend-deep-context-2",
      "type": "choice",
      "prompt": "I'll ___ you my umbrella for the afternoon.",
      "options": [
        "lend",
        "borrow",
        "bring"
      ],
      "answer": "lend",
      "why": "Lend — дать что-то другому человеку на время."
    },
    {
      "id": "borrow-lend-deep-context-3",
      "type": "choice",
      "prompt": "Please ___ these forms to my office later.",
      "options": [
        "take",
        "borrow",
        "bring"
      ],
      "answer": "bring",
      "why": "Bring — принести предмет к говорящему или в указанное им место."
    }
  ],
  "comparatives": [
    {
      "id": "comparatives-deep-context-1",
      "type": "choice",
      "prompt": "This solution is ___ than the first one.",
      "options": [
        "most reliable",
        "more reliable",
        "reliabler"
      ],
      "answer": "more reliable",
      "why": "Для длинного прилагательного reliable используем more reliable."
    },
    {
      "id": "comparatives-deep-context-2",
      "type": "choice",
      "prompt": "This is ___ result in the team.",
      "options": [
        "the best",
        "better",
        "the better"
      ],
      "answer": "the best",
      "why": "При выборе лучшего из группы нужна превосходная степень the best."
    },
    {
      "id": "comparatives-deep-context-3",
      "type": "choice",
      "prompt": "Our new app is ___ than the old one.",
      "options": [
        "fastest",
        "the fast",
        "faster"
      ],
      "answer": "faster",
      "why": "При сравнении двух приложений используем faster than."
    }
  ],
  "adjective-adverb": [
    {
      "id": "adjective-adverb-deep-context-1",
      "type": "choice",
      "prompt": "He explained the rules ___.",
      "options": [
        "clear",
        "clearly",
        "clarity"
      ],
      "answer": "clearly",
      "why": "Действие explained уточняет наречие clearly."
    },
    {
      "id": "adjective-adverb-deep-context-2",
      "type": "choice",
      "prompt": "She's a very ___ colleague.",
      "options": [
        "reliable",
        "reliably",
        "reliability"
      ],
      "answer": "reliable",
      "why": "Перед существительным colleague нужно прилагательное reliable."
    },
    {
      "id": "adjective-adverb-deep-context-3",
      "type": "choice",
      "prompt": "The team worked ___ to resolve it.",
      "options": [
        "hardly",
        "hardness",
        "hard"
      ],
      "answer": "hard",
      "why": "Work hard значит «усердно работать»; hardly означает «едва ли»."
    }
  ],
  "too-enough": [
    {
      "id": "too-enough-deep-context-1",
      "type": "choice",
      "prompt": "It's ___ noisy to record audio here.",
      "options": [
        "enough",
        "too",
        "such"
      ],
      "answer": "too",
      "why": "Too + прилагательное показывает избыток, который мешает действию."
    },
    {
      "id": "too-enough-deep-context-2",
      "type": "choice",
      "prompt": "The room is big ___ for the meeting.",
      "options": [
        "enough",
        "too",
        "such"
      ],
      "answer": "enough",
      "why": "С прилагательным big слово enough ставится после него."
    },
    {
      "id": "too-enough-deep-context-3",
      "type": "choice",
      "prompt": "It was ___ an interesting lesson!",
      "options": [
        "so",
        "too",
        "such"
      ],
      "answer": "such",
      "why": "Such ставится перед именной группой: such an interesting lesson."
    }
  ],
  "modals": [
    {
      "id": "modals-deep-context-1",
      "type": "choice",
      "prompt": "You ___ share your password with anyone. (Prohibited)",
      "options": [
        "don't have to",
        "mustn't",
        "should"
      ],
      "answer": "mustn't",
      "why": "Mustn't означает запрет; don't have to — отсутствие необходимости."
    },
    {
      "id": "modals-deep-context-2",
      "type": "choice",
      "prompt": "You ___ try restarting the app. (Advice)",
      "options": [
        "should",
        "mustn't",
        "have to"
      ],
      "answer": "should",
      "why": "Should используется для совета, а не строгой обязанности."
    },
    {
      "id": "modals-deep-context-3",
      "type": "choice",
      "prompt": "You ___ attend if you're busy. (Not necessary)",
      "options": [
        "mustn't",
        "shouldn't",
        "don't have to"
      ],
      "answer": "don't have to",
      "why": "Don't have to значит «не обязательно», а не «нельзя»."
    }
  ],
  "gerund-infinitive": [
    {
      "id": "gerund-infinitive-deep-context-1",
      "type": "choice",
      "prompt": "He promised ___ back tomorrow.",
      "options": [
        "calling",
        "to call",
        "call"
      ],
      "answer": "to call",
      "why": "После promise употребляется инфинитив с to."
    },
    {
      "id": "gerund-infinitive-deep-context-2",
      "type": "choice",
      "prompt": "I avoid ___ client data in public chats.",
      "options": [
        "sharing",
        "to share",
        "share"
      ],
      "answer": "sharing",
      "why": "После avoid ставится глагол с -ing."
    },
    {
      "id": "gerund-infinitive-deep-context-3",
      "type": "choice",
      "prompt": "She stopped ___ coffee to sleep better. (Gave up coffee)",
      "options": [
        "to drink",
        "drink",
        "drinking"
      ],
      "answer": "drinking",
      "why": "Stop drinking означает прекратить пить кофе; stop to drink — остановиться, чтобы выпить."
    }
  ],
  "used-to": [
    {
      "id": "used-to-deep-context-1",
      "type": "choice",
      "prompt": "I ___ take the bus every day, but now I drive.",
      "options": [
        "am used to",
        "used to",
        "use to"
      ],
      "answer": "used to",
      "why": "Used to + глагол описывает привычку в прошлом, которой сейчас может не быть."
    },
    {
      "id": "used-to-deep-context-2",
      "type": "choice",
      "prompt": "She is used to ___ with international clients.",
      "options": [
        "working",
        "work",
        "to work"
      ],
      "answer": "working",
      "why": "После be used to ставится существительное или глагол с -ing."
    },
    {
      "id": "used-to-deep-context-3",
      "type": "choice",
      "prompt": "Did you ___ work in an office before?",
      "options": [
        "used to",
        "be used to",
        "use to"
      ],
      "answer": "use to",
      "why": "В вопросе с Did используется начальная форма use to."
    }
  ],
  "going-to-will": [
    {
      "id": "going-to-will-deep-context-1",
      "type": "choice",
      "prompt": "Look at those clouds! It ___ rain.",
      "options": [
        "will be",
        "is going to",
        "was"
      ],
      "answer": "is going to",
      "why": "Видимые признаки будущего события часто выражаются be going to."
    },
    {
      "id": "going-to-will-deep-context-2",
      "type": "choice",
      "prompt": "The phone is ringing. I ___ answer it!",
      "options": [
        "will",
        "am going to",
        "was going to"
      ],
      "answer": "will",
      "why": "Решение, принятое прямо сейчас, обычно выражают с will."
    },
    {
      "id": "going-to-will-deep-context-3",
      "type": "choice",
      "prompt": "I've bought tickets. We ___ visit Boston next month.",
      "options": [
        "will suddenly",
        "were",
        "are going to"
      ],
      "answer": "are going to",
      "why": "Заранее составленный план выражается с be going to."
    }
  ],
  "present-perfect-markers": [
    {
      "id": "present-perfect-markers-deep-context-1",
      "type": "choice",
      "prompt": "Have you finished the assignment ___?",
      "options": [
        "already",
        "yet",
        "still"
      ],
      "answer": "yet",
      "why": "Yet часто ставят в конце вопроса о том, выполнено ли действие."
    },
    {
      "id": "present-perfect-markers-deep-context-2",
      "type": "choice",
      "prompt": "I have ___ sent the documents, so you can read them now.",
      "options": [
        "already",
        "yet",
        "still"
      ],
      "answer": "already",
      "why": "Already подчёркивает, что действие уже завершено."
    },
    {
      "id": "present-perfect-markers-deep-context-3",
      "type": "choice",
      "prompt": "She's ___ waiting for a reply after two hours.",
      "options": [
        "yet",
        "just",
        "still"
      ],
      "answer": "still",
      "why": "Still означает «всё ещё», когда ситуация продолжается."
    }
  ],
  "conditionals": [
    {
      "id": "conditionals-deep-context-1",
      "type": "choice",
      "prompt": "If it rains tomorrow, we ___ at home.",
      "options": [
        "would stay",
        "will stay",
        "stayed"
      ],
      "answer": "will stay",
      "why": "В реальном условии о будущем: if + Present Simple, затем will + глагол."
    },
    {
      "id": "conditionals-deep-context-2",
      "type": "choice",
      "prompt": "If I ___ more time, I would learn another language.",
      "options": [
        "had",
        "have",
        "will have"
      ],
      "answer": "had",
      "why": "Во втором типе условных предложений Past Simple описывает нереальную ситуацию сейчас."
    },
    {
      "id": "conditionals-deep-context-3",
      "type": "choice",
      "prompt": "If you heat ice, it ___.",
      "options": [
        "will melted",
        "would melt",
        "melts"
      ],
      "answer": "melts",
      "why": "Нулевой тип условных предложений описывает закономерность с Present Simple."
    }
  ],
  "relative-clauses": [
    {
      "id": "relative-clauses-deep-context-1",
      "type": "choice",
      "prompt": "The person ___ called you is waiting outside.",
      "options": [
        "whose",
        "who",
        "where"
      ],
      "answer": "who",
      "why": "Who связывает придаточное с существительным, обозначающим человека."
    },
    {
      "id": "relative-clauses-deep-context-2",
      "type": "choice",
      "prompt": "I met a woman ___ daughter studies here.",
      "options": [
        "whose",
        "who",
        "which"
      ],
      "answer": "whose",
      "why": "Whose указывает, кому кто-то или что-то принадлежит."
    },
    {
      "id": "relative-clauses-deep-context-3",
      "type": "choice",
      "prompt": "The package ___ arrived was damaged.",
      "options": [
        "whose",
        "who",
        "that"
      ],
      "answer": "that",
      "why": "That может относиться к предмету, как package."
    }
  ],
  "indirect-questions": [
    {
      "id": "indirect-questions-deep-context-1",
      "type": "choice",
      "prompt": "Could you tell me where the station ___?",
      "options": [
        "does",
        "is",
        "are"
      ],
      "answer": "is",
      "why": "В косвенном вопросе порядок как в утверждении: where the station is."
    },
    {
      "id": "indirect-questions-deep-context-2",
      "type": "choice",
      "prompt": "Do you know ___ the bank is open?",
      "options": [
        "if",
        "does",
        "what"
      ],
      "answer": "if",
      "why": "Косвенный общий вопрос вводится if или whether."
    },
    {
      "id": "indirect-questions-deep-context-3",
      "type": "choice",
      "prompt": "I wonder why he ___ early yesterday.",
      "options": [
        "did left",
        "does leave",
        "left"
      ],
      "answer": "left",
      "why": "После I wonder используется прямой порядок слов без did."
    }
  ],
  "linking-words": [
    {
      "id": "linking-words-deep-context-1",
      "type": "choice",
      "prompt": "___ she was tired, she finished the report.",
      "options": [
        "Despite",
        "Although",
        "However"
      ],
      "answer": "Although",
      "why": "Although вводит полное придаточное предложение с подлежащим и сказуемым."
    },
    {
      "id": "linking-words-deep-context-2",
      "type": "choice",
      "prompt": "___ the delays, the train arrived safely.",
      "options": [
        "Despite",
        "Although",
        "Because"
      ],
      "answer": "Despite",
      "why": "Despite сочетается с существительным или формой -ing, но не с целым придаточным."
    },
    {
      "id": "linking-words-deep-context-3",
      "type": "choice",
      "prompt": "We cancelled the event ___ the weather was dangerous.",
      "options": [
        "despite",
        "however",
        "because"
      ],
      "answer": "because",
      "why": "Because вводит объяснение причины в виде придаточного предложения."
    }
  ],
  "both-either-neither": [
    {
      "id": "both-either-neither-deep-context-1",
      "type": "choice",
      "prompt": "___ of the two proposals is acceptable; choose one.",
      "options": [
        "Neither",
        "Either",
        "Both"
      ],
      "answer": "Either",
      "why": "Either означает любой из двух вариантов по отдельности."
    },
    {
      "id": "both-either-neither-deep-context-2",
      "type": "choice",
      "prompt": "___ of my brothers lives in New York. (Zero of two)",
      "options": [
        "Neither",
        "Either",
        "Both"
      ],
      "answer": "Neither",
      "why": "Neither означает ни один из двух."
    },
    {
      "id": "both-either-neither-deep-context-3",
      "type": "choice",
      "prompt": "___ candidates passed the test. (Two of two)",
      "options": [
        "Either",
        "Neither",
        "Both"
      ],
      "answer": "Both",
      "why": "Both охватывает оба объекта сразу."
    }
  ],
  "passive-voice": [
    {
      "id": "passive-voice-deep-context-1",
      "type": "choice",
      "prompt": "The tickets ___ checked yesterday.",
      "options": [
        "are",
        "were",
        "will"
      ],
      "answer": "were",
      "why": "В Past Simple Passive для множественного tickets нужно were + V3."
    },
    {
      "id": "passive-voice-deep-context-2",
      "type": "choice",
      "prompt": "Your order will ___ delivered tomorrow.",
      "options": [
        "be",
        "is",
        "been"
      ],
      "answer": "be",
      "why": "Future Passive строится как will be + V3."
    },
    {
      "id": "passive-voice-deep-context-3",
      "type": "choice",
      "prompt": "Payments ___ processed every day.",
      "options": [
        "is",
        "was",
        "are"
      ],
      "answer": "are",
      "why": "Payments — множественное число, поэтому Present Simple Passive: are processed."
    }
  ],
  "reported-speech": [
    {
      "id": "reported-speech-deep-context-1",
      "type": "choice",
      "prompt": "\"I am tired,\" she said. → She said she ___ tired.",
      "options": [
        "is always",
        "was",
        "were"
      ],
      "answer": "was",
      "why": "При передаче сказанного в прошлом am обычно меняется на was."
    },
    {
      "id": "reported-speech-deep-context-2",
      "type": "choice",
      "prompt": "\"Can you help?\" → He asked if I ___ help.",
      "options": [
        "could",
        "can to",
        "do"
      ],
      "answer": "could",
      "why": "В косвенной речи can часто переходит в could."
    },
    {
      "id": "reported-speech-deep-context-3",
      "type": "choice",
      "prompt": "She ___ me that the meeting was cancelled.",
      "options": [
        "said",
        "spoke",
        "told"
      ],
      "answer": "told",
      "why": "У told должен быть адресат: told me, а said me неверно."
    }
  ],
  "question-tags": [
    {
      "id": "question-tags-deep-context-1",
      "type": "choice",
      "prompt": "You're ready, ___?",
      "options": [
        "are you",
        "aren't you",
        "don't you"
      ],
      "answer": "aren't you",
      "why": "После утвердительного You're ready используется отрицательный хвостик aren't you."
    },
    {
      "id": "question-tags-deep-context-2",
      "type": "choice",
      "prompt": "He can't drive, ___?",
      "options": [
        "can he",
        "can't he",
        "does he"
      ],
      "answer": "can he",
      "why": "После отрицательного can't требуется положительный хвостик can he."
    },
    {
      "id": "question-tags-deep-context-3",
      "type": "choice",
      "prompt": "They have arrived, ___?",
      "options": [
        "don't they",
        "have they",
        "haven't they"
      ],
      "answer": "haven't they",
      "why": "В Present Perfect хвостик повторяет вспомогательный have с отрицанием."
    }
  ],
  "phrasal-verbs": [
    {
      "id": "phrasal-verbs-deep-context-1",
      "type": "choice",
      "prompt": "Please turn ___ off before leaving. (The computer; use \"it\")",
      "options": [
        "off it",
        "it",
        "it to"
      ],
      "answer": "it",
      "why": "В разделяемом turn off местоимение it ставится между глаголом и частицей."
    },
    {
      "id": "phrasal-verbs-deep-context-2",
      "type": "choice",
      "prompt": "She looks ___ her younger brother on weekends.",
      "options": [
        "after",
        "up",
        "off"
      ],
      "answer": "after",
      "why": "Look after — неразделяемый фразовый глагол со значением «заботиться»."
    },
    {
      "id": "phrasal-verbs-deep-context-3",
      "type": "choice",
      "prompt": "Please ___ this word up in a dictionary.",
      "options": [
        "look at",
        "look for",
        "look"
      ],
      "answer": "look",
      "why": "Look up a word — «найти значение слова в словаре»."
    }
  ],
  "stative-verbs": [
    {
      "id": "stative-verbs-deep-context-1",
      "type": "choice",
      "prompt": "I ___ what you mean.",
      "options": [
        "am understanding",
        "understand",
        "understanding"
      ],
      "answer": "understand",
      "why": "Understand описывает состояние и обычно не используется в Continuous."
    },
    {
      "id": "stative-verbs-deep-context-2",
      "type": "choice",
      "prompt": "She ___ a new laptop right now. (She is shopping)",
      "options": [
        "is looking for",
        "looks for always",
        "know"
      ],
      "answer": "is looking for",
      "why": "Временное действие прямо сейчас можно выразить через is looking for."
    },
    {
      "id": "stative-verbs-deep-context-3",
      "type": "choice",
      "prompt": "He ___ two older sisters.",
      "options": [
        "is having",
        "having",
        "has"
      ],
      "answer": "has",
      "why": "Have в значении владения обычно стоит в Simple."
    }
  ],
  "politeness-requests": [
    {
      "id": "politeness-requests-deep-context-1",
      "type": "choice",
      "prompt": "___ you please send the file? (Polite request)",
      "options": [
        "Must",
        "Could",
        "May I"
      ],
      "answer": "Could",
      "why": "Could you — вежливая просьба к собеседнику."
    },
    {
      "id": "politeness-requests-deep-context-2",
      "type": "choice",
      "prompt": "Would you mind ___ the door?",
      "options": [
        "closing",
        "to close",
        "close"
      ],
      "answer": "closing",
      "why": "После Would you mind нужен глагол с окончанием -ing."
    },
    {
      "id": "politeness-requests-deep-context-3",
      "type": "choice",
      "prompt": "___ you like a glass of water?",
      "options": [
        "Could to",
        "Have",
        "Would"
      ],
      "answer": "Would",
      "why": "Would you like — стандартная форма вежливого предложения."
    }
  ],
  "wish-if-only": [
    {
      "id": "wish-if-only-deep-context-1",
      "type": "choice",
      "prompt": "I wish I ___ more confident right now.",
      "options": [
        "am",
        "were",
        "will be"
      ],
      "answer": "were",
      "why": "Wish о нереальном настоящем часто требует формы were."
    },
    {
      "id": "wish-if-only-deep-context-2",
      "type": "choice",
      "prompt": "If only I ___ the ticket earlier! (Past regret)",
      "options": [
        "had checked",
        "check",
        "will check"
      ],
      "answer": "had checked",
      "why": "Сожаление о прошлом выражается If only + Past Perfect."
    },
    {
      "id": "wish-if-only-deep-context-3",
      "type": "choice",
      "prompt": "I wish the neighbours ___ stop making noise.",
      "options": [
        "have",
        "had",
        "would"
      ],
      "answer": "would",
      "why": "Wish + would выражает желание, чтобы другой человек изменил поведение."
    }
  ],
  "complex-contrast": [
    {
      "id": "complex-contrast-deep-context-1",
      "type": "choice",
      "prompt": "Take a charger ___ your phone runs out of power.",
      "options": [
        "unless",
        "in case",
        "as long as"
      ],
      "answer": "in case",
      "why": "In case означает «на случай, если» и предполагает подготовку заранее."
    },
    {
      "id": "complex-contrast-deep-context-2",
      "type": "choice",
      "prompt": "You won't pass ___ you study.",
      "options": [
        "unless",
        "in case",
        "as long as"
      ],
      "answer": "unless",
      "why": "Unless значит «если не» и вводит отрицательное условие."
    },
    {
      "id": "complex-contrast-deep-context-3",
      "type": "choice",
      "prompt": "You can borrow my bike ___ you return it tonight.",
      "options": [
        "unless",
        "in case",
        "as long as"
      ],
      "answer": "as long as",
      "why": "As long as означает «при условии, что»."
    }
  ],
  "modal-perfect": [
    {
      "id": "modal-perfect-deep-context-1",
      "type": "choice",
      "prompt": "You ___ told me earlier. (Criticism about the past)",
      "options": [
        "must have",
        "should have",
        "might have"
      ],
      "answer": "should have",
      "why": "Should have + V3 выражает упрёк или сожаление о прошлом."
    },
    {
      "id": "modal-perfect-deep-context-2",
      "type": "choice",
      "prompt": "She ___ missed the train; I'm not sure.",
      "options": [
        "might have",
        "must have",
        "should have"
      ],
      "answer": "might have",
      "why": "Might have + V3 — неуверенное предположение о прошлом."
    },
    {
      "id": "modal-perfect-deep-context-3",
      "type": "choice",
      "prompt": "The lights are on. He ___ returned home.",
      "options": [
        "should have",
        "might never",
        "must have"
      ],
      "answer": "must have",
      "why": "Must have + V3 — уверенный вывод о прошлом по косвенным признакам."
    }
  ],
  "inversion": [
    {
      "id": "inversion-deep-context-1",
      "type": "choice",
      "prompt": "Never ___ I experienced such a problem.",
      "options": [
        "do",
        "have",
        "am"
      ],
      "answer": "have",
      "why": "После Never в начале фразы происходит инверсия: have I, а не I have."
    },
    {
      "id": "inversion-deep-context-2",
      "type": "choice",
      "prompt": "Rarely ___ she arrive late.",
      "options": [
        "does",
        "is",
        "has"
      ],
      "answer": "does",
      "why": "После Rarely в Present Simple ставим does перед подлежащим."
    },
    {
      "id": "inversion-deep-context-3",
      "type": "choice",
      "prompt": "Not only ___ he apologize, but he also offered help.",
      "options": [
        "was",
        "has",
        "did"
      ],
      "answer": "did",
      "why": "После Not only в Past Simple ставим did перед подлежащим."
    }
  ],
  "causative": [
    {
      "id": "causative-deep-context-1",
      "type": "choice",
      "prompt": "We had our windows ___ last week.",
      "options": [
        "clean",
        "cleaned",
        "cleaning"
      ],
      "answer": "cleaned",
      "why": "Have something done требует третьей формы глагола, здесь cleaned."
    },
    {
      "id": "causative-deep-context-2",
      "type": "choice",
      "prompt": "She got her computer ___ yesterday.",
      "options": [
        "fixed",
        "fix",
        "to fix"
      ],
      "answer": "fixed",
      "why": "После get + object в этой конструкции нужна форма V3, здесь fixed."
    },
    {
      "id": "causative-deep-context-3",
      "type": "choice",
      "prompt": "I ___ my jacket repaired at the tailor's.",
      "options": [
        "did",
        "made",
        "had"
      ],
      "answer": "had",
      "why": "Had my jacket repaired означает, что ремонт выполнил кто-то другой."
    }
  ]
};
