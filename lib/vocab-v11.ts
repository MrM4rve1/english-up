import type {Word} from './content.ts';

/** English Up 11.0: locally authored, example-backed supplementary word bank.
 * Format: CEFR | Topic | English | Russian | English example | Russian example.
 * Entries are authored independently; no fake combinations are produced to hit a quota.
 */
const MATERIAL=`
A1|Город|sidewalk|тротуар|Please stay on the sidewalk.|Пожалуйста, оставайтесь на тротуаре.
A1|Город|intersection|перекрёсток|Turn right at the next intersection.|Поверните направо на следующем перекрёстке.
A1|Город|traffic light|светофор|The traffic light is red.|Горит красный сигнал светофора.
A1|Город|corner|угол|The pharmacy is on the corner.|Аптека находится на углу.
A1|Город|block|квартал|The store is two blocks away.|Магазин находится в двух кварталах.
A1|Город|entrance|вход|The entrance is around the back.|Вход находится сзади здания.
A1|Город|exit|выход|The exit is on your left.|Выход слева от вас.
A1|Город|stairs|лестница|Take the stairs to the second floor.|Поднимитесь по лестнице на второй этаж.
A1|Город|elevator|лифт|The elevator is out of service.|Лифт не работает.
A1|Город|bridge|мост|We walked across the bridge.|Мы прошли по мосту.
A1|Город|river|река|There is a river near our house.|Рядом с нашим домом есть река.
A1|Город|square|площадь|Let's meet in the main square.|Давай встретимся на главной площади.
A1|Город|museum|музей|The museum opens at nine.|Музей открывается в девять.
A1|Город|theater|театр|We are going to the theater tonight.|Сегодня вечером мы идём в театр.
A1|Город|playground|детская площадка|The children are at the playground.|Дети на игровой площадке.
A1|Дом|ceiling|потолок|The ceiling is very high.|Здесь очень высокий потолок.
A1|Дом|floor|пол|Please clean the kitchen floor.|Пожалуйста, вымой пол на кухне.
A1|Дом|wall|стена|There is a picture on the wall.|На стене висит картина.
A1|Дом|doorbell|дверной звонок|Someone is ringing the doorbell.|Кто-то звонит в дверь.
A1|Дом|curtain|штора|Close the curtains before bed.|Закрой шторы перед сном.
A1|Дом|pillow|подушка|I need another pillow.|Мне нужна ещё одна подушка.
A1|Дом|blanket|одеяло|This blanket is soft and warm.|Это одеяло мягкое и тёплое.
A1|Дом|towel|полотенце|There are clean towels in the bathroom.|В ванной есть чистые полотенца.
A1|Дом|soap|мыло|Please wash your hands with soap.|Пожалуйста, помой руки с мылом.
A1|Дом|toothbrush|зубная щётка|I forgot my toothbrush.|Я забыл зубную щётку.
A1|Дом|mirror|зеркало|The mirror is above the sink.|Зеркало висит над раковиной.
A1|Дом|lamp|лампа|Turn off the lamp, please.|Выключи лампу, пожалуйста.
A1|Дом|shelf|полка|Put the book on the shelf.|Поставь книгу на полку.
A1|Дом|key|ключ|I cannot find my keys.|Не могу найти ключи.
A1|Дом|lock|замок|The lock on the door is broken.|Замок на двери сломан.
A1|Еда|spoon|ложка|I need a spoon for the soup.|Мне нужна ложка для супа.
A1|Еда|fork|вилка|Can you pass me a fork?|Передай мне вилку, пожалуйста.
A1|Еда|knife|нож|Be careful with that sharp knife.|Осторожнее с этим острым ножом.
A1|Еда|plate|тарелка|Put the plates on the table.|Поставь тарелки на стол.
A1|Еда|bowl|миска|I ate a bowl of soup.|Я съел миску супа.
A1|Еда|glass|стакан|Could I have a glass of water?|Можно стакан воды?
A1|Еда|cup|чашка|This cup is too hot to hold.|Эта чашка слишком горячая.
A1|Еда|napkin|салфетка|Do you have a napkin?|У вас есть салфетка?
A1|Еда|menu|меню|Could we see the menu, please?|Можно нам меню, пожалуйста?
A1|Еда|bill|счёт|Could we have the bill, please?|Можно нам счёт, пожалуйста?
A1|Еда|tip|чаевые|We left a tip for the server.|Мы оставили официанту чаевые.
A1|Еда|taste|вкус; пробовать|This soup tastes good.|У этого супа приятный вкус.
A1|Еда|spicy|острый|Is this dish very spicy?|Это блюдо очень острое?
A1|Еда|sweet|сладкий|The strawberries are very sweet.|Клубника очень сладкая.
A1|Еда|sour|кислый|This lemon is sour.|Этот лимон кислый.
A1|Учёба|notebook|тетрадь|Write the new words in your notebook.|Запиши новые слова в тетрадь.
A1|Учёба|dictionary|словарь|I use a dictionary when I read.|Я пользуюсь словарём, когда читаю.
A1|Учёба|sentence|предложение|Write one sentence about your family.|Напиши одно предложение о семье.
A1|Учёба|question|вопрос|Please ask one more question.|Пожалуйста, задай ещё один вопрос.
A1|Учёба|answer|ответ|I know the answer.|Я знаю ответ.
A1|Учёба|mistake|ошибка|Everyone makes mistakes sometimes.|Все иногда ошибаются.
A1|Учёба|lesson|урок|Our next lesson is on Thursday.|Наш следующий урок в четверг.
A1|Учёба|homework|домашнее задание|I finished my homework before dinner.|Я закончил домашнее задание до ужина.
A1|Учёба|practice|практика; тренироваться|Practice a little every day.|Тренируйся понемногу каждый день.
A1|Учёба|repeat|повторять|Please repeat the word slowly.|Повтори слово медленно, пожалуйста.
A2|Покупки|receipt|чек|Keep the receipt in case you need a refund.|Сохрани чек на случай возврата.
A2|Покупки|discount|скидка|This jacket has a twenty percent discount.|На эту куртку скидка двадцать процентов.
A2|Покупки|sale|распродажа|The store is having a winter sale.|В магазине зимняя распродажа.
A2|Покупки|return an item|вернуть товар|Can I return this item without the box?|Могу я вернуть товар без коробки?
A2|Покупки|exchange an item|обменять товар|I'd like to exchange this item for a larger size.|Я хотел бы обменять этот товар на больший размер.
A2|Покупки|cash register|касса|Please pay at the cash register.|Оплатите, пожалуйста, на кассе.
A2|Покупки|shopping cart|тележка для покупок|The shopping cart is almost full.|Тележка для покупок почти полная.
A2|Покупки|checkout|оформление покупки|The checkout line is moving slowly.|Очередь на кассу движется медленно.
A2|Покупки|out of stock|нет в наличии|Sorry, this color is out of stock.|К сожалению, этого цвета нет в наличии.
A2|Покупки|delivery fee|стоимость доставки|The delivery fee is five dollars.|Стоимость доставки — пять долларов.
A2|Покупки|tracking number|номер отслеживания|We will send you a tracking number.|Мы отправим вам номер отслеживания.
A2|Покупки|package|посылка|Your package arrived this morning.|Ваша посылка пришла сегодня утром.
A2|Покупки|damaged|повреждённый|The box was damaged during shipping.|Коробка была повреждена при доставке.
A2|Покупки|warranty|гарантия|This laptop comes with a one-year warranty.|На этот ноутбук действует годовая гарантия.
A2|Покупки|customer review|отзыв покупателя|I read a customer review before ordering.|Перед заказом я прочитал отзыв покупателя.
A2|Здоровье|headache|головная боль|I have a headache today.|Сегодня у меня болит голова.
A2|Здоровье|stomachache|боль в животе|He stayed home because of a stomachache.|Он остался дома из-за боли в животе.
A2|Здоровье|dizzy|испытывающий головокружение|I feel dizzy when I stand up quickly.|У меня кружится голова, когда я резко встаю.
A2|Здоровье|tired|уставший|I feel tired after the night shift.|Я чувствую усталость после ночной смены.
A2|Здоровье|rest|отдых; отдыхать|You need some rest after work.|Тебе нужно отдохнуть после работы.
A2|Здоровье|pharmacy|аптека|Is there a pharmacy near the hotel?|Рядом с отелем есть аптека?
A2|Здоровье|insurance|страховка|Do you have health insurance?|У вас есть медицинская страховка?
A2|Здоровье|clinic|клиника|The clinic is closed on Sunday.|Клиника закрыта в воскресенье.
A2|Здоровье|nurse|медсестра; медбрат|The nurse asked me to wait outside.|Медсестра попросила меня подождать снаружи.
A2|Здоровье|medicine|лекарство|Take this medicine as directed by your doctor.|Принимайте это лекарство по назначению врача.
A2|Путешествия|boarding pass|посадочный талон|Show your boarding pass at the gate.|Покажите посадочный талон у выхода на посадку.
A2|Путешествия|boarding gate|выход на посадку|Our boarding gate has changed.|Наш выход на посадку изменился.
A2|Путешествия|carry-on bag|ручная кладь|My carry-on bag fits under the seat.|Моя ручная кладь помещается под сиденьем.
A2|Путешествия|checked baggage|зарегистрированный багаж|The airline lost my checked baggage.|Авиакомпания потеряла мой зарегистрированный багаж.
A2|Путешествия|flight delay|задержка рейса|The flight delay was caused by bad weather.|Рейс задержался из-за плохой погоды.
A2|Путешествия|arrival time|время прибытия|The arrival time is shown on the ticket.|Время прибытия указано в билете.
A2|Путешествия|one-way ticket|билет в одну сторону|I only need a one-way ticket.|Мне нужен только билет в одну сторону.
A2|Путешествия|round-trip ticket|билет туда и обратно|A round-trip ticket costs less.|Билет туда и обратно стоит дешевле.
A2|Путешествия|reservation number|номер бронирования|Please enter your reservation number.|Введите номер бронирования, пожалуйста.
A2|Путешествия|check in online|зарегистрироваться онлайн|You can check in online a day before your flight.|На рейс можно зарегистрироваться онлайн за день до вылета.
A2|Работа|job opening|вакансия|I found a job opening in customer support.|Я нашёл вакансию в клиентской поддержке.
A2|Работа|apply for a job|подать заявку на работу|I want to apply for a job remotely.|Я хочу подать заявку на удалённую работу.
A2|Работа|job interview|собеседование|My job interview is on Tuesday.|Моё собеседование во вторник.
A2|Работа|work experience|опыт работы|Do you have any work experience?|У вас есть опыт работы?
A2|Работа|part-time|неполная занятость|She is looking for a part-time job.|Она ищет работу с неполной занятостью.
A2|Работа|full-time|полная занятость|This is a full-time position.|Это должность с полной занятостью.
A2|Работа|work remotely|работать удалённо|Our support team works remotely.|Наша команда поддержки работает удалённо.
A2|Работа|night shift|ночная смена|I prefer working the night shift.|Я предпочитаю работать в ночную смену.
A2|Работа|work schedule|рабочий график|My work schedule changes each month.|Мой рабочий график меняется каждый месяц.
A2|Работа|paid leave|оплачиваемый отпуск|Employees can request paid leave.|Сотрудники могут запросить оплачиваемый отпуск.
A2|Общение|by the way|кстати|By the way, how was your weekend?|Кстати, как прошли выходные?
A2|Общение|in a hurry|в спешке|Sorry, I'm in a hurry today.|Извини, сегодня я тороплюсь.
A2|Общение|make sure|убедиться|Please make sure the address is correct.|Убедитесь, что адрес правильный.
A2|Общение|find out|выяснить|I will find out what happened.|Я выясню, что произошло.
A2|Общение|keep in touch|поддерживать связь|Let's keep in touch after the course.|Давай поддерживать связь после курса.
A2|Общение|give someone a hand|помочь кому-либо|Could you give me a hand with this box?|Можешь помочь мне с этой коробкой?
A2|Общение|take a break|сделать перерыв|Let's take a short break.|Давай сделаем короткий перерыв.
A2|Общение|be on time|приходить вовремя|Please be on time for the meeting.|Пожалуйста, приходи на встречу вовремя.
A2|Общение|run late|опаздывать|I'm running late because of traffic.|Я опаздываю из-за пробок.
A2|Общение|get along with|ладить с|I get along with my coworkers.|Я хорошо лажу с коллегами.
B1|Поддержка|support ticket|обращение в поддержку|Please create a support ticket for this issue.|Создайте обращение в поддержку по этому вопросу.
B1|Поддержка|ticket queue|очередь обращений|There are twelve tickets in our queue.|В нашей очереди двенадцать обращений.
B1|Поддержка|case number|номер обращения|Could you share your case number?|Можете назвать номер обращения?
B1|Поддержка|response time|время ответа|Our average response time is under an hour.|Наше среднее время ответа меньше часа.
B1|Поддержка|resolve an issue|решить проблему|We are working to resolve the issue.|Мы работаем над решением проблемы.
B1|Поддержка|escalate a case|передать обращение на следующий уровень|We may need to escalate the case to a specialist.|Возможно, придётся передать обращение специалисту.
B1|Поддержка|follow-up message|повторное сообщение|I will send a follow-up message tomorrow.|Я отправлю повторное сообщение завтра.
B1|Поддержка|clarify a request|уточнить запрос|Could you clarify your request?|Можете уточнить ваш запрос?
B1|Поддержка|acknowledge a problem|признать наличие проблемы|We should acknowledge the problem first.|Сначала стоит признать наличие проблемы.
B1|Поддержка|offer a solution|предложить решение|Let me offer a solution that may help.|Позвольте предложить решение, которое может помочь.
B1|Поддержка|next steps|следующие шаги|I will explain the next steps clearly.|Я ясно объясню следующие шаги.
B1|Поддержка|keep someone updated|держать в курсе|We will keep you updated on the case.|Мы будем держать вас в курсе дела.
B1|Поддержка|handover notes|заметки для передачи смены|Please add handover notes before leaving.|Перед уходом добавь заметки для передачи смены.
B1|Поддержка|customer complaint|жалоба клиента|We received a customer complaint about a delay.|Мы получили жалобу клиента на задержку.
B1|Поддержка|customer satisfaction|удовлетворённость клиентов|Customer satisfaction improved last month.|Удовлетворённость клиентов выросла в прошлом месяце.
B1|Платежи|pending transaction|ожидающая обработки транзакция|The pending transaction has not been completed.|Ожидающая транзакция ещё не завершена.
B1|Платежи|payment reference|идентификатор платежа|Please include the payment reference in your message.|Укажите идентификатор платежа в сообщении.
B1|Платежи|billing address|платёжный адрес|Check that your billing address is correct.|Проверьте правильность платёжного адреса.
B1|Платежи|payment processor|платёжный процессор|The payment processor is investigating the issue.|Платёжный процессор расследует проблему.
B1|Платежи|processing delay|задержка обработки|We apologize for the processing delay.|Приносим извинения за задержку обработки.
B1|Платежи|transaction receipt|квитанция о транзакции|Could you attach the transaction receipt?|Можете приложить квитанцию о транзакции?
B1|Платежи|refund request|запрос на возврат средств|Your refund request is under review.|Ваш запрос на возврат средств рассматривается.
B1|Платежи|bank statement|банковская выписка|Check your bank statement for this charge.|Проверьте это списание в банковской выписке.
B1|Платежи|duplicate charge|двойное списание|The customer reported a duplicate charge.|Клиент сообщил о двойном списании.
B1|Платежи|payment confirmation|подтверждение платежа|We have not received payment confirmation yet.|Мы пока не получили подтверждение платежа.
B1|Платежи|exchange fee|комиссия за обмен валюты|The exchange fee depends on the provider.|Комиссия за обмен зависит от провайдера.
B1|Платежи|withdraw funds|вывести средства|You can withdraw funds after verification.|Вы можете вывести средства после проверки.
B1|Платежи|deposit funds|пополнить счёт|You can deposit funds using a bank transfer.|Вы можете пополнить счёт банковским переводом.
B1|Платежи|refund status|статус возврата|Please check the refund status in your account.|Проверьте статус возврата в своём аккаунте.
B1|Платежи|payment declined|платёж отклонён|The payment was declined by the bank.|Платёж был отклонён банком.
B1|Работа|team meeting|встреча команды|The team meeting starts at ten.|Встреча команды начинается в десять.
B1|Работа|meeting agenda|повестка встречи|Please review the meeting agenda in advance.|Пожалуйста, заранее ознакомьтесь с повесткой встречи.
B1|Работа|action item|задача по итогам встречи|Each action item has an owner.|У каждой задачи по итогам встречи есть ответственный.
B1|Работа|workload|рабочая нагрузка|Our workload increases on Mondays.|По понедельникам наша рабочая нагрузка увеличивается.
B1|Работа|performance review|оценка результатов работы|My performance review is next month.|Моя оценка результатов работы состоится в следующем месяце.
B1|Работа|probation period|испытательный срок|The probation period lasts three months.|Испытательный срок длится три месяца.
B1|Работа|salary range|зарплатный диапазон|Could you share the salary range for this role?|Можете назвать зарплатный диапазон для этой должности?
B1|Работа|career growth|карьерный рост|The company offers opportunities for career growth.|Компания предоставляет возможности для карьерного роста.
B1|Работа|transfer knowledge|передавать знания|We should transfer knowledge before the handover.|Нужно передать знания до передачи смены.
B1|Работа|meet a deadline|уложиться в срок|We need to meet the deadline by Friday.|Нам нужно уложиться в срок к пятнице.
B1|Работа|set priorities|расставлять приоритеты|Let's set priorities before we start.|Давай расставим приоритеты перед началом.
B1|Работа|take responsibility|взять ответственность|I am ready to take responsibility for the task.|Я готов взять ответственность за задачу.
B1|Работа|give feedback|дать обратную связь|Could you give feedback on my report?|Можете дать обратную связь по моему отчёту?
B1|Работа|make progress|добиваться прогресса|We are making progress on the issue.|Мы продвигаемся в решении проблемы.
B1|Работа|stay focused|сохранять концентрацию|It helps to stay focused during a busy shift.|Во время напряжённой смены важно сохранять концентрацию.
B2|FinTech|issuing bank|банк-эмитент|The issuing bank may ask for more evidence.|Банк-эмитент может запросить дополнительные доказательства.
B2|FinTech|acquiring bank|банк-эквайер|The acquiring bank handles payments for the merchant.|Банк-эквайер обрабатывает платежи мерчанта.
B2|FinTech|dispute resolution|урегулирование споров|Dispute resolution can take several weeks.|Урегулирование споров может занять несколько недель.
B2|FinTech|chargeback reason code|код причины чарджбэка|Check the chargeback reason code before responding.|Перед ответом проверьте код причины чарджбэка.
B2|FinTech|settlement report|отчёт о расчётах|Please compare the settlement report with the ledger.|Сверьте отчёт о расчётах с реестром.
B2|FinTech|reconciliation discrepancy|расхождение при сверке|We found a reconciliation discrepancy yesterday.|Вчера мы обнаружили расхождение при сверке.
B2|FinTech|transaction ledger|реестр транзакций|The transaction ledger contains all recorded payments.|В реестре транзакций содержатся все учтённые платежи.
B2|FinTech|payment gateway|платёжный шлюз|The payment gateway was unavailable for ten minutes.|Платёжный шлюз был недоступен десять минут.
B2|FinTech|merchant account|счёт мерчанта|The merchant account must be verified before activation.|Счёт мерчанта нужно проверить перед активацией.
B2|FinTech|compliance review|проверка соблюдения требований|The compliance review is still in progress.|Проверка соблюдения требований ещё продолжается.
B2|FinTech|risk assessment|оценка рисков|The team completed a risk assessment.|Команда завершила оценку рисков.
B2|FinTech|suspicious pattern|подозрительная закономерность|The analyst noticed a suspicious pattern in the transactions.|Аналитик заметил подозрительную закономерность в транзакциях.
B2|FinTech|fraud investigation|расследование мошенничества|The fraud investigation has not been completed.|Расследование мошенничества ещё не завершено.
B2|FinTech|verification threshold|порог проверки|Transactions above the verification threshold need extra checks.|Транзакции выше порога проверки требуют дополнительных проверок.
B2|FinTech|transaction monitoring|мониторинг транзакций|Transaction monitoring helps identify unusual activity.|Мониторинг транзакций помогает выявлять необычную активность.
B2|Деловой английский|root cause analysis|анализ первопричины|The engineers conducted a root cause analysis.|Инженеры провели анализ первопричины.
B2|Деловой английский|mitigation plan|план снижения последствий|We need a mitigation plan for the outage.|Нам нужен план снижения последствий сбоя.
B2|Деловой английский|service disruption|сбой обслуживания|We informed customers about the service disruption.|Мы сообщили клиентам о сбое обслуживания.
B2|Деловой английский|service-level agreement|соглашение об уровне обслуживания|Our service-level agreement defines response targets.|Наше соглашение об уровне обслуживания определяет целевые сроки ответа.
B2|Деловой английский|escalation procedure|процедура эскалации|Follow the escalation procedure for urgent cases.|При срочных случаях следуйте процедуре эскалации.
B2|Деловой английский|contingency plan|резервный план|The team prepared a contingency plan.|Команда подготовила резервный план.
B2|Деловой английский|stakeholder update|сообщение заинтересованным сторонам|We sent a stakeholder update after the incident.|После инцидента мы отправили сообщение заинтересованным сторонам.
B2|Деловой английский|outstanding issue|нерешённая проблема|There is one outstanding issue in this case.|В этом обращении осталась одна нерешённая проблема.
B2|Деловой английский|time-sensitive|требующий срочного внимания|This is a time-sensitive customer request.|Этот запрос клиента требует срочного внимания.
B2|Деловой английский|proactively|заранее; инициативно|We proactively informed users about the delay.|Мы заранее сообщили пользователям о задержке.
B2|Деловой английский|substantiate a claim|подтвердить утверждение доказательствами|We need documents to substantiate the claim.|Нам нужны документы, чтобы подтвердить это утверждение.
B2|Деловой английский|address concerns|разобраться с опасениями|Let's address the customer's concerns directly.|Давай прямо разберёмся с опасениями клиента.
B2|Деловой английский|reach a compromise|достичь компромисса|The two teams managed to reach a compromise.|Двум командам удалось достичь компромисса.
B2|Деловой английский|take into account|принимать во внимание|Please take the customer's circumstances into account.|Пожалуйста, примите во внимание обстоятельства клиента.
B2|Деловой английский|follow through on a promise|выполнить обещание|We must follow through on our promise to update the customer.|Нам нужно выполнить обещание сообщить клиенту новости.
B2|Академический английский|evidence-based|основанный на данных|We need an evidence-based approach.|Нам нужен подход, основанный на данных.
B2|Академический английский|underlying assumption|базовое предположение|The report relies on an underlying assumption.|Отчёт опирается на базовое предположение.
B2|Академический английский|draw a conclusion|сделать вывод|It is too early to draw a conclusion.|Пока слишком рано делать вывод.
B2|Академический английский|considerable|значительный|There was a considerable increase in demand.|Спрос значительно вырос.
B2|Академический английский|nevertheless|тем не менее|The task was difficult; nevertheless, we finished it.|Задача была сложной, тем не менее мы её завершили.
B2|Академический английский|furthermore|кроме того|Furthermore, the proposal would reduce costs.|Кроме того, предложение позволило бы сократить расходы.
B2|Академический английский|whereas|тогда как|The first plan is cheaper, whereas the second is faster.|Первый план дешевле, тогда как второй быстрее.
B2|Академический английский|thereby|тем самым|We simplified the process, thereby reducing errors.|Мы упростили процесс, тем самым сократив число ошибок.
B2|Академический английский|in contrast|в отличие от этого|In contrast, the new approach is more flexible.|В отличие от этого новый подход более гибкий.
B2|Академический английский|on the whole|в целом|On the whole, the launch went smoothly.|В целом запуск прошёл гладко.
A1|Природа|lake|озеро|We go swimming in the lake in summer.|Летом мы купаемся в озере.
A1|Природа|forest|лес|The forest is quiet in the morning.|По утрам в лесу тихо.
A1|Природа|hill|холм|The children ran up the hill.|Дети взбежали на холм.
A1|Природа|beach|пляж|We spent the afternoon on the beach.|Мы провели день на пляже.
A1|Природа|island|остров|They live on a small island.|Они живут на маленьком острове.
A1|Природа|mountain|гора|The mountain is covered in snow.|Гора покрыта снегом.
A1|Природа|flower|цветок|She put a flower in a glass.|Она поставила цветок в стакан.
A1|Природа|leaf|лист|A yellow leaf fell from the tree.|С дерева упал жёлтый лист.
A1|Природа|grass|трава|Please don't walk on the grass.|Пожалуйста, не ходите по траве.
A1|Природа|rainbow|радуга|We saw a rainbow after the rain.|После дождя мы увидели радугу.
A1|Природа|storm|буря|A storm is coming tonight.|Сегодня ночью ожидается буря.
A1|Природа|wind|ветер|The wind is getting stronger.|Ветер усиливается.
A1|Природа|cloud|облако|There are dark clouds in the sky.|На небе тёмные облака.
A1|Природа|snowflake|снежинка|A snowflake landed on my jacket.|На мою куртку упала снежинка.
A1|Природа|shadow|тень|We sat in the shadow of a tree.|Мы сидели в тени дерева.
A1|Животные|rabbit|кролик|The rabbit is eating a carrot.|Кролик ест морковку.
A1|Животные|turtle|черепаха|The turtle moves very slowly.|Черепаха движется очень медленно.
A1|Животные|duck|утка|There are three ducks in the pond.|В пруду три утки.
A1|Животные|horse|лошадь|A horse is standing by the fence.|У забора стоит лошадь.
A1|Животные|sheep|овца|The farmer has ten sheep.|У фермера десять овец.
A1|Животные|goat|коза|The goat climbed onto the rock.|Коза забралась на камень.
A1|Животные|bee|пчела|A bee is flying near the flowers.|Возле цветов летает пчела.
A1|Животные|butterfly|бабочка|A butterfly landed on my hand.|Бабочка села мне на руку.
A1|Животные|spider|паук|There is a spider in the corner.|В углу сидит паук.
A1|Животные|ant|муравей|An ant is carrying a leaf.|Муравей несёт лист.
A1|Тело|elbow|локоть|I hurt my elbow while playing.|Я ушиб локоть во время игры.
A1|Тело|knee|колено|She fell and hurt her knee.|Она упала и ушибла колено.
A1|Тело|shoulder|плечо|My shoulder feels better today.|Сегодня моё плечо болит меньше.
A1|Тело|wrist|запястье|He wears a watch on his left wrist.|Он носит часы на левом запястье.
A1|Тело|thumb|большой палец руки|She held up her thumb to say yes.|Она подняла большой палец в знак согласия.
A1|Тело|eyebrow|бровь|He raised one eyebrow in surprise.|Он удивлённо поднял одну бровь.
A1|Тело|cheek|щека|The child had red cheeks from the cold.|У ребёнка покраснели щёки от холода.
A1|Тело|ankle|лодыжка|I twisted my ankle yesterday.|Вчера я подвернул лодыжку.
A1|Тело|heel|пятка|These shoes hurt my heels.|Эта обувь натирает мне пятки.
A1|Тело|chin|подбородок|He rested his chin on his hand.|Он опёрся подбородком на руку.
A2|Быт|fold|складывать|Please fold the clean towels.|Пожалуйста, сложи чистые полотенца.
A2|Быт|rinse|ополаскивать|Rinse the cup after washing it.|Сполосни чашку после мытья.
A2|Быт|sweep|подметать|I need to sweep the kitchen floor.|Мне нужно подмести пол на кухне.
A2|Быт|wipe|протирать|Wipe the table with a clean cloth.|Протри стол чистой тряпкой.
A2|Быт|spill|проливать|Be careful not to spill your coffee.|Смотри не пролей кофе.
A2|Быт|stir|размешивать|Stir the soup before serving it.|Размешай суп перед подачей.
A2|Быт|peel|чистить кожуру|Peel the potatoes before cooking them.|Почисти картофель перед готовкой.
A2|Быт|chop|нарезать|Chop the onions into small pieces.|Мелко нарежь лук.
A2|Быт|boil|кипятить; варить|Boil the water before making tea.|Вскипяти воду перед приготовлением чая.
A2|Быт|fry|жарить|We usually fry eggs for breakfast.|Обычно мы жарим яйца на завтрак.
A2|Быт|bake|печь|We baked bread yesterday.|Вчера мы испекли хлеб.
A2|Быт|freeze|замораживать|You can freeze the leftovers.|Остатки еды можно заморозить.
A2|Быт|melt|таять; плавиться|The ice cream is starting to melt.|Мороженое начинает таять.
A2|Быт|hang up clothes|развешивать одежду|Please hang up the wet clothes.|Пожалуйста, развесь мокрую одежду.
A2|Быт|plug in|включить в розетку|Plug in the charger before using it.|Подключи зарядку к розетке перед использованием.
A2|Быт|unplug|отключить от розетки|Unplug the kettle when you leave.|Отключи чайник от розетки перед уходом.
A2|Быт|turn down the volume|уменьшить громкость|Please turn down the volume a little.|Пожалуйста, немного убавь громкость.
A2|Быт|turn up the heat|прибавить отопление|Can you turn up the heat? It's cold.|Можешь прибавить отопление? Холодно.
A2|Быт|run out of|закончиться|We have run out of milk.|У нас закончилось молоко.
A2|Быт|throw away|выбросить|Don't throw away the receipt.|Не выбрасывай чек.
A2|Эмоции|embarrassed|смущённый|I felt embarrassed when I forgot her name.|Мне было неловко, когда я забыл её имя.
A2|Эмоции|relieved|испытывающий облегчение|I was relieved to hear the good news.|Я испытал облегчение, услышав хорошую новость.
A2|Эмоции|frustrated|раздосадованный|The customer sounded frustrated.|Клиент говорил с раздражением.
A2|Эмоции|disappointed|разочарованный|She was disappointed with the result.|Она была разочарована результатом.
A2|Эмоции|nervous|нервничающий|I am nervous before interviews.|Я нервничаю перед собеседованиями.
A2|Эмоции|proud|гордый|My parents are proud of me.|Родители гордятся мной.
A2|Эмоции|jealous|ревнивый; завистливый|He was jealous of his friend's success.|Он завидовал успеху друга.
A2|Эмоции|curious|любопытный|I'm curious about how it works.|Мне интересно, как это работает.
A2|Эмоции|patient|терпеливый|Please be patient while we check.|Пожалуйста, проявите терпение, пока мы проверяем.
A2|Эмоции|grateful|благодарный|I am grateful for your help.|Я благодарен за вашу помощь.
A2|Общение|on purpose|намеренно|I didn't break it on purpose.|Я не сломал это специально.
A2|Общение|by accident|случайно|I deleted the file by accident.|Я случайно удалил файл.
A2|Общение|for a while|на некоторое время|Let's rest here for a while.|Давай немного отдохнём здесь.
A2|Общение|at least|как минимум|Please wait at least ten minutes.|Пожалуйста, подождите не менее десяти минут.
A2|Общение|at most|не более|The transfer should take at most two days.|Перевод должен занять не более двух дней.
A2|Общение|in advance|заранее|Please book your ticket in advance.|Пожалуйста, забронируй билет заранее.
A2|Общение|straight away|сразу же|I will call you straight away.|Я позвоню тебе сразу же.
A2|Общение|right now|прямо сейчас|I cannot talk right now.|Я не могу говорить прямо сейчас.
A2|Общение|once in a while|время от времени|We meet once in a while.|Мы видимся время от времени.
A2|Общение|so far|до сих пор; пока что|So far, everything is going well.|Пока что всё идёт хорошо.
B1|Работа|prioritize|определять приоритеты|We should prioritize urgent cases first.|Сначала стоит заняться срочными обращениями.
B1|Работа|coordinate|координировать|She coordinates work across time zones.|Она координирует работу в разных часовых поясах.
B1|Работа|collaborate|сотрудничать|Our teams collaborate on difficult cases.|Наши команды сотрудничают по сложным обращениям.
B1|Работа|delegate|делегировать|The manager delegated the task to another team.|Руководитель делегировал задачу другой команде.
B1|Работа|supervise|руководить; контролировать|He supervises the night shift.|Он руководит ночной сменой.
B1|Работа|monitor|отслеживать|We monitor all pending payments.|Мы отслеживаем все платежи в обработке.
B1|Работа|evaluate|оценивать|We need to evaluate the proposed solution.|Нам нужно оценить предложенное решение.
B1|Работа|identify|выявлять|The team identified the source of the error.|Команда выявила источник ошибки.
B1|Работа|investigate|расследовать|We will investigate the duplicate transaction.|Мы проверим обстоятельства двойной транзакции.
B1|Работа|verify|проверять достоверность|Please verify the transaction details.|Пожалуйста, проверьте данные транзакции.
B1|Работа|document|документировать|Document every step in the case notes.|Документируйте каждый шаг в заметках по обращению.
B1|Работа|report an issue|сообщить о проблеме|Report the issue to the support lead.|Сообщите о проблеме руководителю поддержки.
B1|Работа|handle a complaint|разобрать жалобу|We can handle the complaint calmly.|Мы можем спокойно разобраться с жалобой.
B1|Работа|set expectations|обозначить ожидания|It helps to set realistic expectations.|Полезно обозначить реалистичные ожидания.
B1|Работа|manage workload|управлять нагрузкой|We need to manage workload during peak hours.|Нам нужно управлять нагрузкой в часы пик.
B1|Работа|resolve a conflict|разрешить конфликт|The manager helped resolve a conflict.|Руководитель помог разрешить конфликт.
B1|Работа|meet requirements|соответствовать требованиям|Your application must meet the requirements.|Ваша заявка должна соответствовать требованиям.
B1|Работа|conduct training|проводить обучение|The company will conduct training next week.|Компания проведёт обучение на следующей неделе.
B1|Работа|improve efficiency|повысить эффективность|Clear notes can improve efficiency.|Понятные заметки помогают повысить эффективность.
B1|Работа|reduce errors|уменьшить число ошибок|The new checklist reduced errors.|Новый контрольный список уменьшил число ошибок.
B1|Финансы|interest rate|процентная ставка|The interest rate changed this month.|В этом месяце изменилась процентная ставка.
B1|Финансы|loan|заём; кредит|They applied for a bank loan.|Они подали заявку на банковский кредит.
B1|Финансы|installment|взнос; платёж по частям|You can pay in monthly installments.|Можно платить ежемесячными взносами.
B1|Финансы|monthly payment|ежемесячный платёж|Your monthly payment is due on Friday.|Ваш ежемесячный платёж нужно внести к пятнице.
B1|Финансы|overdue|просроченный|The customer has an overdue payment.|У клиента просроченный платёж.
B1|Финансы|outstanding balance|непогашенный остаток|Please check your outstanding balance.|Проверьте непогашенный остаток.
B1|Финансы|account holder|владелец счёта|The account holder must approve the change.|Владелец счёта должен одобрить изменение.
B1|Финансы|bank account number|номер банковского счёта|The bank account number is on the statement.|Номер банковского счёта указан в выписке.
B1|Финансы|transfer limit|лимит перевода|You have reached your transfer limit.|Вы достигли лимита переводов.
B1|Финансы|transaction fee|комиссия за транзакцию|A transaction fee may apply.|За транзакцию может взиматься комиссия.
B1|Финансы|processing fee|комиссия за обработку|The service charges a processing fee.|Сервис взимает комиссию за обработку.
B1|Финансы|available funds|доступные средства|There are not enough available funds.|Недостаточно доступных средств.
B1|Финансы|insufficient funds|недостаточно средств|The payment failed due to insufficient funds.|Платёж не прошёл из-за недостатка средств.
B1|Финансы|payment reversal|отмена проведённого платежа|The bank initiated a payment reversal.|Банк инициировал отмену платежа.
B1|Финансы|account verification|проверка счёта|Account verification may take one day.|Проверка счёта может занять один день.
B2|Аналитика|benchmark|эталон; ориентир для сравнения|We used last year's data as a benchmark.|Мы использовали прошлогодние данные как ориентир.
B2|Аналитика|trend analysis|анализ тенденций|Trend analysis showed an increase in disputes.|Анализ тенденций показал рост числа споров.
B2|Аналитика|sample size|размер выборки|The sample size was too small for a reliable result.|Размер выборки был слишком мал для надёжного результата.
B2|Аналитика|margin of error|погрешность|The margin of error is shown in the report.|Погрешность указана в отчёте.
B2|Аналитика|statistically significant|статистически значимый|The difference was not statistically significant.|Разница не была статистически значимой.
B2|Аналитика|correlation|корреляция|Correlation does not always imply causation.|Корреляция не всегда означает причинность.
B2|Аналитика|causation|причинно-следственная связь|The study did not establish causation.|Исследование не установило причинно-следственную связь.
B2|Аналитика|outlier|выброс; аномальное значение|One outlier affected the average.|Одно аномальное значение повлияло на среднее.
B2|Аналитика|reliable estimate|надёжная оценка|We need more data for a reliable estimate.|Для надёжной оценки нужны дополнительные данные.
B2|Аналитика|data integrity|целостность данных|The system checks data integrity regularly.|Система регулярно проверяет целостность данных.
B2|Аналитика|audit trail|журнал аудита|The audit trail shows who changed the record.|Журнал аудита показывает, кто изменил запись.
B2|Аналитика|traceability|прослеживаемость|Traceability is essential for financial records.|Для финансовых записей важна прослеживаемость.
B2|Аналитика|risk exposure|подверженность риску|The review assessed our risk exposure.|Проверка оценила нашу подверженность риску.
B2|Аналитика|decision criteria|критерии принятия решения|The decision criteria must be transparent.|Критерии принятия решения должны быть прозрачными.
B2|Аналитика|trade-off|компромисс между требованиями|There is a trade-off between speed and accuracy.|Между скоростью и точностью приходится искать компромисс.
B2|Переговоры|mutual agreement|взаимное соглашение|We reached a mutual agreement on the schedule.|Мы достигли взаимного соглашения по графику.
B2|Переговоры|common ground|точки соприкосновения|Both teams found common ground on the policy.|Обе команды нашли точки соприкосновения по правилам.
B2|Переговоры|counterproposal|встречное предложение|The client sent a counterproposal yesterday.|Вчера клиент отправил встречное предложение.
B2|Переговоры|concession|уступка|The supplier made a small concession.|Поставщик пошёл на небольшую уступку.
B2|Переговоры|non-negotiable|не подлежащий обсуждению|Customer data security is non-negotiable.|Безопасность данных клиентов не подлежит обсуждению.
B2|Переговоры|reconsider|пересмотреть решение|We may need to reconsider the timeline.|Возможно, нужно пересмотреть сроки.
B2|Переговоры|justify|обосновывать|Can you justify the extra cost?|Можете обосновать дополнительные расходы?
B2|Переговоры|reach consensus|прийти к единому мнению|It took an hour to reach consensus.|Потребовался час, чтобы прийти к единому мнению.
B2|Переговоры|make an exception|сделать исключение|We cannot make an exception without approval.|Мы не можем сделать исключение без одобрения.
B2|Переговоры|uphold a policy|соблюдать установленные правила|We must uphold the policy fairly.|Мы должны справедливо соблюдать правила.
B2|Переговоры|enforce a rule|обеспечивать соблюдение правила|The platform must enforce the rule consistently.|Платформа должна последовательно обеспечивать соблюдение правила.
B2|Переговоры|set a precedent|создать прецедент|This decision could set a precedent.|Это решение может создать прецедент.
B2|Переговоры|long-term impact|долгосрочные последствия|We should consider the long-term impact.|Нам стоит учесть долгосрочные последствия.
B2|Переговоры|unintended consequence|непредвиденное последствие|The change had an unintended consequence.|Изменение привело к непредвиденному последствию.
B2|Переговоры|accountability|ответственность за результат|Clear accountability improves teamwork.|Чёткая ответственность улучшает командную работу.
`;
export const v11Vocabulary:Word[]=MATERIAL.trim().split('\n').map((line,index)=>{
 const p=line.split('|');
 if(p.length!==6||!['A1','A2','B1','B2'].includes(p[0])||p.some(s=>!s.trim()))throw new Error(`Invalid v11 word on line ${index+1}`);
 const [level,topic,en,ru,example,translation]=p;
 return {id:`editorial-v11:${en.toLowerCase()}`,en,ru,level:level as Word['level'],topic,example,translation,source:'original' as const};
});
