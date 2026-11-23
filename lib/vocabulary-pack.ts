import type {Word} from './content';
/** Curated bilingual English–Russian word cards. Every example and translation is written as a pair. */
const DATA=` 
A1|Дом|door|дверь|Please close the door.|Пожалуйста, закрой дверь.
A1|Дом|window|окно|Open the window, please.|Открой окно, пожалуйста.
A1|Дом|floor|пол; этаж|The bag is on the floor.|Сумка стоит на полу.
A1|Дом|ceiling|потолок|The ceiling is white.|Потолок белый.
A1|Дом|wall|стена|There is a picture on the wall.|На стене висит картина.
A1|Дом|roof|крыша|The roof is red.|Крыша красная.
A1|Дом|stairs|лестница|Take the stairs to the second floor.|Поднимись по лестнице на второй этаж.
A1|Дом|kitchen|кухня|My mother is in the kitchen.|Моя мама на кухне.
A1|Дом|bedroom|спальня|Our bedroom is small.|Наша спальня маленькая.
A1|Дом|bathroom|ванная комната|The bathroom is next to the kitchen.|Ванная комната рядом с кухней.
A1|Дом|living room|гостиная|We watch movies in the living room.|Мы смотрим фильмы в гостиной.
A1|Дом|furniture|мебель|This furniture is new.|Эта мебель новая.
A1|Дом|table|стол|Put your cup on the table.|Поставь чашку на стол.
A1|Дом|chair|стул|There are four chairs here.|Здесь четыре стула.
A1|Дом|sofa|диван|The cat is sleeping on the sofa.|Кот спит на диване.
A1|Дом|mirror|зеркало|Look in the mirror.|Посмотри в зеркало.
A1|Дом|towel|полотенце|I need a clean towel.|Мне нужно чистое полотенце.
A1|Дом|blanket|одеяло|This blanket is warm.|Это одеяло тёплое.
A1|Дом|pillow|подушка|My pillow is soft.|Моя подушка мягкая.
A1|Дом|lamp|лампа|Turn on the lamp, please.|Включи лампу, пожалуйста.
A1|Дом|fridge|холодильник|There is milk in the fridge.|В холодильнике есть молоко.
A1|Дом|oven|духовка|The bread is in the oven.|Хлеб в духовке.
A1|Дом|sink|раковина|Wash your hands in the sink.|Вымой руки в раковине.
A1|Дом|key|ключ|I can't find my key.|Я не могу найти свой ключ.
A1|Дом|address|адрес|What is your address?|Какой у тебя адрес?
A1|Еда|bread|хлеб|I eat bread for breakfast.|Я ем хлеб на завтрак.
A1|Еда|butter|сливочное масло|Put some butter on the bread.|Намажь немного масла на хлеб.
A1|Еда|cheese|сыр|Would you like some cheese?|Хочешь сыра?
A1|Еда|egg|яйцо|I usually have an egg for breakfast.|Обычно я ем яйцо на завтрак.
A1|Еда|rice|рис|We have rice with chicken.|Мы едим рис с курицей.
A1|Еда|pasta|макароны; паста|She is cooking pasta.|Она готовит пасту.
A1|Еда|potato|картофель|I need two potatoes.|Мне нужны две картофелины.
A1|Еда|tomato|помидор|Add a tomato to the salad.|Добавь помидор в салат.
A1|Еда|onion|лук|Cut the onion into small pieces.|Нарежь лук мелкими кусочками.
A1|Еда|carrot|морковь|This carrot is fresh.|Эта морковь свежая.
A1|Еда|cucumber|огурец|I like cucumber in my salad.|Я люблю огурец в салате.
A1|Еда|banana|банан|I take a banana to work.|Я беру банан на работу.
A1|Еда|orange|апельсин|This orange is sweet.|Этот апельсин сладкий.
A1|Еда|grape|виноградина|These grapes are delicious.|Этот виноград очень вкусный.
A1|Еда|strawberry|клубника|She likes strawberries.|Она любит клубнику.
A1|Еда|soup|суп|The soup is hot.|Суп горячий.
A1|Еда|salad|салат|I ordered a salad.|Я заказал салат.
A1|Еда|sandwich|бутерброд|I'll make a sandwich.|Я сделаю бутерброд.
A1|Еда|breakfast|завтрак|Breakfast starts at eight.|Завтрак начинается в восемь.
A1|Еда|lunch|обед|We have lunch at noon.|Мы обедаем в полдень.
A1|Еда|dinner|ужин|Dinner is ready.|Ужин готов.
A1|Еда|hungry|голодный|I'm hungry after work.|Я голоден после работы.
A1|Еда|thirsty|испытывающий жажду|I'm thirsty. Can I have water?|Я хочу пить. Можно воды?
A1|Еда|delicious|вкусный|This cake is delicious.|Этот торт очень вкусный.
A1|Еда|spicy|острый|Is this soup spicy?|Этот суп острый?
A1|Повседневные действия|wake up|просыпаться|I wake up at seven.|Я просыпаюсь в семь.
A1|Повседневные действия|get dressed|одеваться|I get dressed before breakfast.|Я одеваюсь перед завтраком.
A1|Повседневные действия|brush my teeth|чистить зубы|I brush my teeth twice a day.|Я чищу зубы дважды в день.
A1|Повседневные действия|take a shower|принимать душ|I take a shower every morning.|Я принимаю душ каждое утро.
A1|Повседневные действия|leave home|выходить из дома|I leave home at eight.|Я выхожу из дома в восемь.
A1|Повседневные действия|come back|возвращаться|I come back at six.|Я возвращаюсь в шесть.
A1|Повседневные действия|clean|убирать; чистить|I clean my room on Saturday.|Я убираю комнату в субботу.
A1|Повседневные действия|wash|мыть; стирать|I wash the dishes after dinner.|Я мою посуду после ужина.
A1|Повседневные действия|cook|готовить|My brother can cook.|Мой брат умеет готовить.
A1|Повседневные действия|rest|отдыхать|I rest after work.|Я отдыхаю после работы.
A1|Повседневные действия|exercise|тренироваться|I exercise three times a week.|Я тренируюсь три раза в неделю.
A1|Повседневные действия|walk|гулять; ходить пешком|Let's walk to the park.|Давай пойдём в парк пешком.
A1|Повседневные действия|run|бегать|She runs every morning.|Она бегает каждое утро.
A1|Повседневные действия|swim|плавать|Can you swim?|Ты умеешь плавать?
A1|Повседневные действия|dance|танцевать|They like to dance.|Они любят танцевать.
A1|Повседневные действия|sing|петь|She sings very well.|Она очень хорошо поёт.
A1|Повседневные действия|draw|рисовать|My son likes to draw.|Мой сын любит рисовать.
A1|Повседневные действия|listen|слушать|Please listen carefully.|Пожалуйста, слушай внимательно.
A1|Повседневные действия|read|читать|I read before bed.|Я читаю перед сном.
A1|Повседневные действия|write|писать|Write your name here.|Напиши своё имя здесь.
A1|Повседневные действия|open|открывать|Open your book.|Открой свою книгу.
A1|Повседневные действия|close|закрывать|Close the door, please.|Закрой дверь, пожалуйста.
A1|Повседневные действия|carry|нести|Can you carry this bag?|Можешь понести эту сумку?
A1|Повседневные действия|bring|приносить|Please bring your passport.|Пожалуйста, принеси паспорт.
A1|Повседневные действия|choose|выбирать|Choose a seat.|Выбери место.
A1|Город|street|улица|My office is on this street.|Мой офис находится на этой улице.
A1|Город|road|дорога|Be careful on the road.|Будь осторожен на дороге.
A1|Город|bridge|мост|We crossed the bridge.|Мы перешли через мост.
A1|Город|corner|угол|The store is on the corner.|Магазин находится на углу.
A1|Город|park|парк|Let's meet in the park.|Давай встретимся в парке.
A1|Город|library|библиотека|The library is closed today.|Сегодня библиотека закрыта.
A1|Город|museum|музей|This museum is interesting.|Этот музей интересный.
A1|Город|hospital|больница|He works at a hospital.|Он работает в больнице.
A1|Город|pharmacy|аптека|Is there a pharmacy nearby?|Рядом есть аптека?
A1|Город|station|станция; вокзал|The train station is busy.|На железнодорожном вокзале многолюдно.
A1|Город|bus stop|автобусная остановка|Wait for me at the bus stop.|Подожди меня на автобусной остановке.
A1|Город|airport|аэропорт|We arrived at the airport early.|Мы приехали в аэропорт рано.
A1|Город|hotel|отель|The hotel is near the beach.|Отель находится рядом с пляжем.
A1|Город|restaurant|ресторан|This restaurant is expensive.|Этот ресторан дорогой.
A1|Город|store|магазин|The store opens at nine.|Магазин открывается в девять.
A1|Город|market|рынок|We buy fruit at the market.|Мы покупаем фрукты на рынке.
A1|Город|ticket|билет|Where can I buy a ticket?|Где я могу купить билет?
A1|Город|map|карта|I need a map of the city.|Мне нужна карта города.
A1|Город|left|налево; левый|Turn left at the traffic light.|Поверни налево на светофоре.
A1|Город|right|направо; правый|Turn right after the bridge.|Поверни направо после моста.
A1|Город|straight ahead|прямо|Go straight ahead.|Иди прямо.
A1|Город|near|рядом; близко|The bank is near my house.|Банк находится рядом с моим домом.
A1|Город|far|далеко|Is the airport far from here?|Аэропорт далеко отсюда?
A1|Город|behind|позади; за|The garden is behind the house.|Сад находится за домом.
A1|Город|between|между|The café is between two stores.|Кафе находится между двумя магазинами.
A2|Путешествия|boarding pass|посадочный талон|Show your boarding pass at the gate.|Покажите посадочный талон у выхода на посадку.
A2|Путешествия|gate|выход на посадку|Our gate has changed.|Наш выход на посадку изменился.
A2|Путешествия|luggage|багаж|My luggage is heavy.|Мой багаж тяжёлый.
A2|Путешествия|carry-on bag|ручная кладь|You can take one carry-on bag.|Можно взять одну единицу ручной клади.
A2|Путешествия|check in|регистрироваться|We need to check in online.|Нам нужно зарегистрироваться онлайн.
A2|Путешествия|departure|отправление; вылет|Our departure is at six.|Наш вылет в шесть.
A2|Путешествия|arrival|прибытие|What is the arrival time?|Какое время прибытия?
A2|Путешествия|destination|пункт назначения|Chicago is our final destination.|Чикаго — наш конечный пункт назначения.
A2|Путешествия|delay|задержка|The flight has a two-hour delay.|Рейс задерживается на два часа.
A2|Путешествия|cancel|отменять|They canceled the flight.|Они отменили рейс.
A2|Путешествия|book a room|забронировать номер|I'd like to book a room.|Я хотел бы забронировать номер.
A2|Путешествия|reservation|бронирование|I have a reservation under Ivanov.|У меня бронирование на фамилию Иванов.
A2|Путешествия|reception desk|стойка регистрации|Ask at the reception desk.|Спросите на стойке регистрации.
A2|Путешествия|single room|одноместный номер|Do you have a single room?|У вас есть одноместный номер?
A2|Путешествия|double room|двухместный номер|We need a double room.|Нам нужен двухместный номер.
A2|Путешествия|local transportation|местный транспорт|Local transportation is affordable.|Местный транспорт недорогой.
A2|Путешествия|subway|метро|Take the subway downtown.|Поезжай в центр на метро.
A2|Путешествия|transfer|пересадка|We have one transfer in Boston.|У нас одна пересадка в Бостоне.
A2|Путешествия|round-trip ticket|билет туда-обратно|A round-trip ticket costs less.|Билет туда-обратно стоит дешевле.
A2|Путешествия|one-way ticket|билет в одну сторону|I need a one-way ticket.|Мне нужен билет в одну сторону.
A2|Здоровье|headache|головная боль|I have a headache.|У меня болит голова.
A2|Здоровье|fever|жар; повышенная температура|She has a fever.|У неё высокая температура.
A2|Здоровье|cough|кашель|I have a dry cough.|У меня сухой кашель.
A2|Здоровье|sore throat|боль в горле|My sore throat is getting better.|Горло болит уже меньше.
A2|Здоровье|stomachache|боль в животе|I have a stomachache.|У меня болит живот.
A2|Здоровье|back pain|боль в спине|I have back pain after work.|После работы у меня болит спина.
A2|Здоровье|injury|травма|He has a knee injury.|У него травма колена.
A2|Здоровье|appointment|запись на приём|I have a doctor's appointment.|Я записан на приём к врачу.
A2|Здоровье|medicine|лекарство|Take this medicine with food.|Принимай это лекарство во время еды.
A2|Здоровье|prescription|рецепт от врача|You need a prescription for this medicine.|Для этого лекарства нужен рецепт.
A2|Здоровье|symptom|симптом|What symptoms do you have?|Какие у вас симптомы?
A2|Здоровье|allergy|аллергия|I have an allergy to peanuts.|У меня аллергия на арахис.
A2|Здоровье|feel better|чувствовать себя лучше|I hope you feel better soon.|Надеюсь, тебе скоро станет лучше.
A2|Здоровье|get sick|заболеть|I rarely get sick.|Я редко болею.
A2|Здоровье|healthy|здоровый|She eats healthy food.|Она ест полезную еду.
A2|Здоровье|tired|уставший|I'm tired after my shift.|Я устал после смены.
A2|Здоровье|dizzy|испытывающий головокружение|I feel dizzy when I stand up.|У меня кружится голова, когда я встаю.
A2|Здоровье|recover|выздоравливать|He is recovering after surgery.|Он восстанавливается после операции.
A2|Здоровье|emergency|чрезвычайная ситуация|Call for help in an emergency.|Позови на помощь в чрезвычайной ситуации.
A2|Здоровье|insurance|страховка|Does your insurance cover this visit?|Ваша страховка покрывает этот визит?
A2|Общение|invite|приглашать|I'd like to invite you to dinner.|Я хотел бы пригласить тебя на ужин.
A2|Общение|accept|принимать|She accepted the invitation.|Она приняла приглашение.
A2|Общение|refuse|отказываться|He refused the offer politely.|Он вежливо отказался от предложения.
A2|Общение|apologize|извиняться|I want to apologize for being late.|Я хочу извиниться за опоздание.
A2|Общение|agree|соглашаться|I agree with you.|Я с тобой согласен.
A2|Общение|disagree|не соглашаться|I disagree with that idea.|Я не согласен с этой идеей.
A2|Общение|suggest|предлагать|Can you suggest a good movie?|Можешь посоветовать хороший фильм?
A2|Общение|recommend|рекомендовать|I recommend this book.|Я рекомендую эту книгу.
A2|Общение|explain|объяснять|Could you explain the rule again?|Можешь ещё раз объяснить правило?
A2|Общение|describe|описывать|Please describe the problem.|Пожалуйста, опиши проблему.
A2|Общение|promise|обещать|I promise to call tomorrow.|Обещаю позвонить завтра.
A2|Общение|complain|жаловаться|The customer complained about the delay.|Клиент пожаловался на задержку.
A2|Общение|offer|предлагать|Can I offer you some help?|Могу предложить вам помощь?
A2|Общение|share|делиться|Can you share the details?|Можешь поделиться подробностями?
A2|Общение|mention|упоминать|She mentioned the meeting.|Она упомянула встречу.
A2|Общение|remind|напоминать|Please remind me tomorrow.|Пожалуйста, напомни мне завтра.
A2|Общение|introduce|представлять; знакомить|Let me introduce my colleague.|Позволь представить моего коллегу.
A2|Общение|contact|связаться с|Please contact our team by email.|Пожалуйста, свяжитесь с нашей командой по электронной почте.
A2|Общение|reply|отвечать|I'll reply to your message tonight.|Я отвечу на твоё сообщение сегодня вечером.
A2|Общение|conversation|разговор|We had a long conversation.|У нас был долгий разговор.
B1|Работа|colleague|коллега|My colleague helped me solve the issue.|Мой коллега помог мне решить проблему.
B1|Работа|supervisor|руководитель смены|Ask your supervisor for guidance.|Попроси указаний у руководителя смены.
B1|Работа|deadline|крайний срок|The deadline is next Friday.|Крайний срок — следующая пятница.
B1|Работа|workload|рабочая нагрузка|Our workload is high today.|Сегодня у нас высокая рабочая нагрузка.
B1|Работа|shift|смена|My night shift starts at ten.|Моя ночная смена начинается в десять.
B1|Работа|handover|передача дел|Write a handover note for the next shift.|Напиши заметку для передачи дел следующей смене.
B1|Работа|follow up|уточнить позже; продолжить работу|I'll follow up on your request tomorrow.|Завтра я уточню статус вашего обращения.
B1|Работа|escalate|передать на более высокий уровень|We need to escalate this case.|Нам нужно передать этот случай на более высокий уровень.
B1|Работа|resolve|решать; устранять|We resolved the issue this morning.|Мы устранили проблему сегодня утром.
B1|Работа|request|запрос|We received your request.|Мы получили ваш запрос.
B1|Работа|inquiry|обращение; запрос информации|We received an inquiry about a payment.|Мы получили запрос по платежу.
B1|Работа|complaint|жалоба|The customer filed a complaint.|Клиент подал жалобу.
B1|Работа|customer service|обслуживание клиентов|I work in customer service.|Я работаю в службе поддержки клиентов.
B1|Работа|support ticket|обращение в поддержку|Please create a support ticket.|Пожалуйста, создайте обращение в поддержку.
B1|Работа|response time|время ответа|Our average response time is five minutes.|Наше среднее время ответа — пять минут.
B1|Работа|available|доступный; свободный|An agent will be available soon.|Специалист скоро освободится.
B1|Работа|unavailable|недоступный|The service is temporarily unavailable.|Сервис временно недоступен.
B1|Работа|confirm|подтверждать|Please confirm your email address.|Пожалуйста, подтвердите свой адрес электронной почты.
B1|Работа|verify|проверять; подтверждать|We need to verify the transaction.|Нам нужно проверить транзакцию.
B1|Работа|investigate|расследовать; проверять|Our team will investigate the issue.|Наша команда проверит проблему.
B1|Работа|provide|предоставлять|Could you provide more details?|Не могли бы вы предоставить больше деталей?
B1|Работа|require|требовать|This process requires approval.|Для этого процесса требуется одобрение.
B1|Работа|process|обрабатывать|We process requests in order.|Мы обрабатываем запросы по очереди.
B1|Работа|update|обновлять; сообщать новости|I'll update you when I know more.|Я сообщу вам, когда узнаю больше.
B1|Работа|assist|помогать|How can I assist you today?|Чем я могу вам помочь сегодня?
B1|Платежи|transaction ID|идентификатор транзакции|Please send your transaction ID.|Пожалуйста, отправьте идентификатор транзакции.
B1|Платежи|receipt|чек; квитанция|Keep the payment receipt.|Сохраните чек об оплате.
B1|Платежи|invoice|счёт на оплату|The invoice is due tomorrow.|Срок оплаты счёта — завтра.
B1|Платежи|billing address|платёжный адрес|Enter your billing address.|Введите свой платёжный адрес.
B1|Платежи|cardholder|держатель карты|The cardholder must authorize the payment.|Держатель карты должен подтвердить платёж.
B1|Платежи|expiration date|срок действия|Check the card's expiration date.|Проверьте срок действия карты.
B1|Платежи|payment method|способ оплаты|Choose a payment method.|Выберите способ оплаты.
B1|Платежи|bank transfer|банковский перевод|The bank transfer is still pending.|Банковский перевод ещё обрабатывается.
B1|Платежи|withdrawal|вывод средств|Your withdrawal is being processed.|Ваш вывод средств обрабатывается.
B1|Платежи|deposit|пополнение; депозит|The deposit appeared in my account.|Пополнение отобразилось на моём счёте.
B1|Платежи|balance|баланс|Check your account balance.|Проверьте баланс вашего счёта.
B1|Платежи|fee|комиссия|The bank charges a small fee.|Банк взимает небольшую комиссию.
B1|Платежи|refund request|запрос на возврат|We received your refund request.|Мы получили ваш запрос на возврат.
B1|Платежи|payment status|статус платежа|Let me check the payment status.|Позвольте проверить статус платежа.
B1|Платежи|proof of payment|подтверждение оплаты|Please attach proof of payment.|Пожалуйста, прикрепите подтверждение оплаты.
B1|Платежи|processing time|время обработки|The processing time depends on the bank.|Время обработки зависит от банка.
B1|Платежи|payment gateway|платёжный шлюз|The payment gateway is temporarily unavailable.|Платёжный шлюз временно недоступен.
B1|Платежи|billing issue|проблема с оплатой|We are looking into the billing issue.|Мы разбираемся с проблемой оплаты.
B1|Платежи|payment confirmation|подтверждение платежа|You will receive payment confirmation by email.|Вы получите подтверждение платежа по электронной почте.
B1|Платежи|duplicate charge|двойное списание|I noticed a duplicate charge on my card.|Я заметил двойное списание с карты.
B2|Деловой английский|follow-up email|письмо с уточнением|I sent a follow-up email yesterday.|Вчера я отправил письмо с уточнением.
B2|Деловой английский|action item|задача по итогам встречи|We assigned each action item to an owner.|Мы назначили ответственного за каждую задачу.
B2|Деловой английский|stakeholder|заинтересованная сторона|We informed all stakeholders about the change.|Мы сообщили об изменении всем заинтересованным сторонам.
B2|Деловой английский|deliverable|ожидаемый результат работы|The report is our main deliverable.|Отчёт — наш основной результат работы.
B2|Деловой английский|scope|объём работ|The scope of the project has changed.|Объём работ по проекту изменился.
B2|Деловой английский|priority|приоритет|Customer safety is our top priority.|Безопасность клиентов — наш главный приоритет.
B2|Деловой английский|trade-off|компромисс между вариантами|Every choice involves a trade-off.|Каждый выбор связан с компромиссом.
B2|Деловой английский|constraint|ограничение|Time is our main constraint.|Время — наше главное ограничение.
B2|Деловой английский|milestone|важный этап|We reached a major milestone.|Мы достигли важного этапа.
B2|Деловой английский|workaround|обходное решение|We found a temporary workaround.|Мы нашли временное обходное решение.
B2|Деловой английский|root cause|первопричина|We need to identify the root cause.|Нам нужно установить первопричину.
B2|Деловой английский|mitigate|смягчать; снижать риск|We took steps to mitigate the risk.|Мы приняли меры для снижения риска.
B2|Деловой английский|compliance|соблюдение требований|Compliance is essential in payment services.|Соблюдение требований крайне важно для платёжных сервисов.
B2|Деловой английский|audit trail|история действий для аудита|Keep an audit trail of all changes.|Сохраняйте историю всех изменений для аудита.
B2|Деловой английский|discrepancy|расхождение|We found a discrepancy in the records.|Мы обнаружили расхождение в записях.
B2|Деловой английский|reconciliation|сверка данных|Reconciliation happens at the end of the day.|Сверка данных проводится в конце дня.
B2|Деловой английский|settlement|расчёт; окончательное перечисление|The settlement may take two business days.|Окончательное перечисление может занять два рабочих дня.
B2|Деловой английский|authorization|авторизация; разрешение|The transaction requires authorization.|Для транзакции требуется авторизация.
B2|Деловой английский|fraudulent|мошеннический|The bank blocked a fraudulent transaction.|Банк заблокировал мошенническую транзакцию.
B2|Деловой английский|suspicious activity|подозрительная активность|Report any suspicious activity immediately.|Немедленно сообщайте о любой подозрительной активности.
B2|Технологии|troubleshoot|устранять неполадки|Let's troubleshoot the connection.|Давай разберёмся с неполадками соединения.
B2|Технологии|outage|сбой сервиса|The outage affected several regions.|Сбой затронул несколько регионов.
B2|Технологии|latency|задержка отклика|High latency can slow down the app.|Высокая задержка отклика может замедлить приложение.
B2|Технологии|downtime|время недоступности|We want to reduce downtime.|Мы хотим сократить время недоступности.
B2|Технологии|deployment|развёртывание приложения|The deployment finished successfully.|Развёртывание приложения завершилось успешно.
B2|Технологии|roll back|откатить изменения|We may need to roll back the update.|Возможно, нам придётся откатить обновление.
B2|Технологии|vulnerability|уязвимость|The team fixed a security vulnerability.|Команда устранила уязвимость безопасности.
B2|Технологии|authentication|проверка подлинности|Authentication protects user accounts.|Проверка подлинности защищает аккаунты пользователей.
B2|Технологии|encryption|шифрование|Encryption protects sensitive data.|Шифрование защищает конфиденциальные данные.
B2|Технологии|access rights|права доступа|Check your access rights first.|Сначала проверьте свои права доступа.
B2|Технологии|backup|резервная копия|We created a backup before the update.|Мы создали резервную копию перед обновлением.
B2|Технологии|restore|восстанавливать|Can we restore the previous version?|Можем ли мы восстановить предыдущую версию?
B2|Технологии|permission|разрешение|You don't have permission to edit this file.|У вас нет разрешения редактировать этот файл.
B2|Технологии|configuration|конфигурация; настройка|The configuration was incorrect.|Конфигурация была неверной.
B2|Технологии|integration|интеграция|The integration connects both systems.|Интеграция связывает обе системы.
B2|Технологии|compatibility|совместимость|We need to check browser compatibility.|Нужно проверить совместимость с браузером.
B2|Технологии|performance|производительность|We monitor performance every day.|Мы ежедневно отслеживаем производительность.
B2|Технологии|reliability|надёжность|Reliability matters more than speed.|Надёжность важнее скорости.
B2|Технологии|scalability|масштабируемость|Scalability is important for a growing service.|Масштабируемость важна для растущего сервиса.
B2|Технологии|maintenance|техническое обслуживание|The website is under maintenance.|На сайте ведутся технические работы.
`;


const EXTRA=`
A2|Покупки|size|размер|Do you have this in a smaller size?|У вас есть это меньшего размера?
A2|Покупки|fitting room|примерочная|Where is the fitting room?|Где находится примерочная?
A2|Покупки|cashier|кассир|Please pay at the cashier.|Пожалуйста, оплатите на кассе.
A2|Покупки|cash|наличные|Can I pay in cash?|Могу я заплатить наличными?
A2|Покупки|credit card|кредитная карта|Do you accept credit cards?|Вы принимаете кредитные карты?
A2|Покупки|discount|скидка|Is there a student discount?|Есть ли скидка для студентов?
A2|Покупки|sale|распродажа|These shoes are on sale.|Эти туфли продаются со скидкой.
A2|Покупки|return an item|вернуть товар|Can I return this item?|Могу ли я вернуть этот товар?
A2|Покупки|exchange an item|обменять товар|I'd like to exchange this item.|Я хотел бы обменять этот товар.
A2|Покупки|out of stock|нет в наличии|This product is out of stock.|Этого товара нет в наличии.
A2|Покупки|in stock|в наличии|The blue jacket is in stock.|Синяя куртка есть в наличии.
A2|Покупки|shopping cart|корзина покупок|Your shopping cart is empty.|Ваша корзина покупок пуста.
A2|Покупки|checkout|оформление заказа|Go to checkout to pay.|Перейдите к оформлению заказа, чтобы оплатить.
A2|Покупки|delivery|доставка|Delivery is free this week.|На этой неделе доставка бесплатная.
A2|Покупки|shipping|доставка товара|Shipping takes three days.|Доставка занимает три дня.
A2|Покупки|package|посылка|My package arrived this morning.|Моя посылка пришла сегодня утром.
A2|Покупки|tracking number|номер отслеживания|Do you have a tracking number?|У вас есть номер отслеживания?
A2|Покупки|damaged|повреждённый|The box arrived damaged.|Коробка пришла повреждённой.
A2|Покупки|broken|сломанный|The screen is broken.|Экран сломан.
A2|Покупки|receipt number|номер чека|Please enter your receipt number.|Пожалуйста, введите номер чека.
A2|Покупки|brand|бренд|Which brand do you prefer?|Какой бренд ты предпочитаешь?
A2|Покупки|quality|качество|The quality is excellent.|Качество отличное.
A2|Покупки|price tag|ценник|Check the price tag.|Посмотри на ценник.
A2|Покупки|affordable|доступный по цене|This apartment is affordable.|Эта квартира доступна по цене.
A2|Покупки|expensive|дорогой|That hotel is too expensive.|Этот отель слишком дорогой.
A2|Жильё|landlord|арендодатель|Our landlord is very helpful.|Наш арендодатель очень отзывчивый.
A2|Жильё|tenant|арендатор|The tenant pays rent every month.|Арендатор платит за жильё каждый месяц.
A2|Жильё|rent|арендная плата|Rent is due on the first day of the month.|Арендную плату нужно внести первого числа месяца.
A2|Жильё|lease|договор аренды|Please read the lease carefully.|Пожалуйста, внимательно прочитайте договор аренды.
A2|Жильё|security deposit|залог за жильё|We paid a security deposit.|Мы внесли залог за жильё.
A2|Жильё|utilities|коммунальные услуги|Are utilities included in the rent?|Коммунальные услуги включены в аренду?
A2|Жильё|electricity|электричество|The electricity is off.|Электричества нет.
A2|Жильё|heating|отопление|The heating is not working.|Отопление не работает.
A2|Жильё|plumbing|водопровод и сантехника|The plumbing needs repairs.|Сантехнике требуется ремонт.
A2|Жильё|leak|протечка|There is a leak under the sink.|Под раковиной протечка.
A2|Жильё|repair|ремонтировать|Can you repair the window?|Вы можете починить окно?
A2|Жильё|neighborhood|район|This neighborhood is quiet.|Этот район тихий.
A2|Жильё|apartment building|многоквартирный дом|Our apartment building has an elevator.|В нашем доме есть лифт.
A2|Жильё|elevator|лифт|Take the elevator to the third floor.|Поднимитесь на третий этаж на лифте.
A2|Жильё|move in|въехать|We plan to move in on Monday.|Мы планируем въехать в понедельник.
A2|Жильё|move out|съехать|We will move out next month.|Мы съедем в следующем месяце.
A2|Жильё|roommate|сосед по квартире|My roommate works from home.|Мой сосед по квартире работает из дома.
A2|Жильё|shared apartment|общая квартира|I live in a shared apartment.|Я живу в общей квартире.
A2|Жильё|quiet hours|часы тишины|Please respect the quiet hours.|Пожалуйста, соблюдайте часы тишины.
A2|Жильё|furnished|меблированный|The apartment is fully furnished.|Квартира полностью меблирована.
A2|Общение|keep in touch|поддерживать связь|Let's keep in touch.|Давай поддерживать связь.
A2|Общение|get along|ладить|I get along with my coworkers.|Я лажу с коллегами.
A2|Общение|make friends|заводить друзей|It's easy to make friends here.|Здесь легко заводить друзей.
A2|Общение|trust|доверять|I trust my best friend.|Я доверяю своему лучшему другу.
A2|Общение|support|поддерживать|My family supports my decision.|Моя семья поддерживает моё решение.
A2|Общение|argue|спорить; ссориться|They often argue about money.|Они часто спорят из-за денег.
A2|Общение|forgive|прощать|Can you forgive me?|Ты можешь меня простить?
A2|Общение|advice|совет|I need some advice.|Мне нужен совет.
A2|Общение|decision|решение|This is an important decision.|Это важное решение.
A2|Общение|choice|выбор|You have a choice.|У тебя есть выбор.
B1|Собеседование|apply for a job|откликаться на вакансию|I applied for a job yesterday.|Вчера я откликнулся на вакансию.
B1|Собеседование|job opening|вакансия|I saw a job opening online.|Я увидел вакансию в интернете.
B1|Собеседование|resume|резюме|Please attach your resume.|Пожалуйста, прикрепите своё резюме.
B1|Собеседование|cover letter|сопроводительное письмо|I wrote a short cover letter.|Я написал короткое сопроводительное письмо.
B1|Собеседование|interview|собеседование|My interview is on Tuesday.|Моё собеседование во вторник.
B1|Собеседование|candidate|кандидат|We interviewed three candidates.|Мы провели собеседования с тремя кандидатами.
B1|Собеседование|recruiter|рекрутер|The recruiter called me yesterday.|Рекрутер позвонил мне вчера.
B1|Собеседование|responsibility|обязанность|What are the main responsibilities?|Каковы основные обязанности?
B1|Собеседование|previous experience|предыдущий опыт|I have previous experience in support.|У меня есть предыдущий опыт в поддержке.
B1|Собеседование|strength|сильная сторона|Patience is one of my strengths.|Терпение — одна из моих сильных сторон.
B1|Собеседование|weakness|слабая сторона|I am working on my weaknesses.|Я работаю над своими слабыми сторонами.
B1|Собеседование|skill|навык|Communication is an important skill.|Общение — важный навык.
B1|Собеседование|qualification|квалификация|This role requires a technical qualification.|Для этой должности нужна техническая квалификация.
B1|Собеседование|training|обучение|The company provides training.|Компания проводит обучение.
B1|Собеседование|probation period|испытательный срок|The probation period lasts three months.|Испытательный срок длится три месяца.
B1|Собеседование|salary expectation|ожидаемая зарплата|What is your salary expectation?|На какую зарплату вы рассчитываете?
B1|Собеседование|remote position|удалённая должность|I'm looking for a remote position.|Я ищу удалённую работу.
B1|Собеседование|part-time|неполный рабочий день|She works part-time.|Она работает неполный день.
B1|Собеседование|full-time|полный рабочий день|It's a full-time position.|Это работа на полный день.
B1|Собеседование|flexible schedule|гибкий график|We offer a flexible schedule.|Мы предлагаем гибкий график.
B1|Собеседование|work experience|опыт работы|I have two years of work experience.|У меня два года опыта работы.
B1|Собеседование|teamwork|командная работа|Teamwork is important in this role.|Командная работа важна в этой должности.
B1|Собеседование|problem-solving|решение проблем|Problem-solving is a key skill.|Решение проблем — ключевой навык.
B1|Собеседование|time management|управление временем|Good time management helps me meet deadlines.|Хорошее управление временем помогает мне соблюдать сроки.
B1|Собеседование|career growth|карьерный рост|I'm interested in career growth.|Меня интересует карьерный рост.
B1|Учёба|revise|повторять изученное|I need to revise these grammar rules.|Мне нужно повторить эти правила грамматики.
B1|Учёба|memorize|запоминать|I find it hard to memorize long lists.|Мне трудно запоминать длинные списки.
B1|Учёба|pronunciation|произношение|I want to improve my pronunciation.|Я хочу улучшить своё произношение.
B1|Учёба|fluency|беглость речи|Practice helps improve fluency.|Практика помогает улучшить беглость речи.
B1|Учёба|accuracy|точность|Accuracy matters when writing emails.|Точность важна при написании писем.
B1|Учёба|mistake|ошибка|Everyone makes mistakes.|Все совершают ошибки.
B1|Учёба|feedback|обратная связь|My teacher gave me useful feedback.|Преподаватель дал мне полезную обратную связь.
B1|Учёба|assignment|задание|I finished my assignment.|Я закончил своё задание.
B1|Учёба|assessment|оценивание|The assessment includes a writing task.|Оценивание включает письменное задание.
B1|Учёба|progress|прогресс|I've made progress this month.|В этом месяце я добился прогресса.
B1|Учёба|goal|цель|My goal is to reach B2.|Моя цель — достичь B2.
B1|Учёба|improve|улучшать|I'm trying to improve my English.|Я стараюсь улучшить свой английский.
B1|Учёба|practice regularly|регулярно практиковаться|You should practice regularly.|Тебе стоит заниматься регулярно.
B1|Учёба|pay attention|обращать внимание|Pay attention to word order.|Обращай внимание на порядок слов.
B1|Учёба|make progress|добиваться прогресса|You can make progress every week.|Ты можешь прогрессировать каждую неделю.
B1|Учёба|understand the context|понимать контекст|Try to understand the context first.|Сначала постарайся понять контекст.
B1|Учёба|look up a word|искать слово в словаре|Look up the word if you don't know it.|Поищи слово в словаре, если не знаешь его.
B1|Учёба|take notes|делать заметки|I take notes during every lesson.|Я делаю заметки на каждом уроке.
B1|Учёба|review|повторять; обзор|I review new words every evening.|Я повторяю новые слова каждый вечер.
B1|Учёба|self-study|самостоятельное обучение|Self-study requires discipline.|Самостоятельное обучение требует дисциплины.
B2|Аргументация|in my opinion|по моему мнению|In my opinion, the plan is realistic.|По моему мнению, план реалистичен.
B2|Аргументация|from my perspective|с моей точки зрения|From my perspective, quality matters most.|С моей точки зрения, качество важнее всего.
B2|Аргументация|on the other hand|с другой стороны|On the other hand, the cost is high.|С другой стороны, стоимость высока.
B2|Аргументация|nevertheless|тем не менее|The task was difficult; nevertheless, we finished it.|Задача была трудной, но тем не менее мы её выполнили.
B2|Аргументация|furthermore|более того|Furthermore, we need to test the changes.|Более того, нам нужно протестировать изменения.
B2|Аргументация|in contrast|в отличие от этого|In contrast, the new method is faster.|В отличие от этого новый метод быстрее.
B2|Аргументация|to some extent|в некоторой степени|I agree with you to some extent.|Я в некоторой степени с тобой согласен.
B2|Аргументация|take into account|принимать во внимание|We must take costs into account.|Мы должны учитывать расходы.
B2|Аргументация|draw a conclusion|сделать вывод|We need more data to draw a conclusion.|Нам нужно больше данных, чтобы сделать вывод.
B2|Аргументация|provide evidence|привести доказательства|Can you provide evidence for your claim?|Можешь привести доказательства своего утверждения?
B2|Аргументация|evaluate|оценивать|We need to evaluate the results.|Нам нужно оценить результаты.
B2|Аргументация|assumption|предположение|That assumption might be wrong.|Это предположение может быть неверным.
B2|Аргументация|consequence|последствие|Consider the consequences before deciding.|Учти последствия, прежде чем принимать решение.
B2|Аргументация|persuade|убеждать|She persuaded me to try again.|Она убедила меня попробовать снова.
B2|Аргументация|justify|обосновывать|How would you justify that decision?|Как бы ты обосновал это решение?
B2|Аргументация|compromise|компромисс|We finally reached a compromise.|В итоге мы пришли к компромиссу.
B2|Аргументация|prioritize|расставлять приоритеты|We need to prioritize urgent tasks.|Нам нужно расставить приоритеты среди срочных задач.
B2|Аргументация|interpret|интерпретировать|Different people interpret this differently.|Разные люди интерпретируют это по-разному.
B2|Аргументация|objective|объективный|Try to be objective in your analysis.|Старайся быть объективным в своём анализе.
B2|Аргументация|subjective|субъективный|Taste is subjective.|Вкус субъективен.
A1|Эмоции|happy|счастливый|I'm happy to see you.|Я рад тебя видеть.
A1|Эмоции|sad|грустный|She feels sad today.|Ей сегодня грустно.
A1|Эмоции|angry|сердитый|Why are you angry?|Почему ты сердишься?
A1|Эмоции|excited|взволнованный; радостный|I'm excited about the trip.|Я в восторге от предстоящей поездки.
A1|Эмоции|scared|испуганный|The little boy is scared.|Маленький мальчик испуган.
A1|Эмоции|calm|спокойный|Try to stay calm.|Постарайся сохранять спокойствие.
A1|Эмоции|nervous|нервничающий|I feel nervous before exams.|Я нервничаю перед экзаменами.
A1|Эмоции|proud|гордый|I'm proud of you.|Я горжусь тобой.
A1|Эмоции|surprised|удивлённый|We were surprised by the news.|Мы были удивлены новостями.
A1|Эмоции|lonely|одинокий|He feels lonely in a new city.|Он чувствует себя одиноким в новом городе.
A1|Эмоции|kind|добрый|My teacher is very kind.|Мой преподаватель очень добрый.
A1|Эмоции|friendly|дружелюбный|The staff are friendly.|Персонал дружелюбный.
A1|Эмоции|patient|терпеливый|Please be patient.|Пожалуйста, проявите терпение.
A1|Эмоции|shy|застенчивый|She was shy as a child.|В детстве она была застенчивой.
A1|Эмоции|brave|смелый|That was a brave decision.|Это было смелое решение.
`;

export const curatedVocabulary:Word[]=(DATA.trim()+'\n'+EXTRA.trim()).split('\n').filter(Boolean).map((line,i)=>{
 const parts=line.split('|');
 if(parts.length!==6)throw new Error(`Bad vocabulary entry ${i+1}: ${line}`);
 const [level,topic,en,ru,example,translation]=parts;
 if(!['A1','A2','B1','B2'].includes(level))throw new Error(`Bad level at vocabulary row ${i+1}`);
 return {id:en,en,ru,example,translation,level:level as Word['level'],topic};
});
