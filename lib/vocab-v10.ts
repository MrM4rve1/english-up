import type {Word} from './content.ts';
import {scenarioUnits} from './life-work-content.ts';

/** English Up 10.0: original practice phrases already authored for the America/Work courses.
 * They are included in vocabulary only once, and their original course IDs remain untouched.
 */
export const scenarioVocabulary:Word[]=scenarioUnits.flatMap(unit=>unit.phrases.map((phrase,index)=>({
 id:`phrase-v10:${unit.category}:${unit.id}:${index}`,
 en:phrase.en,ru:phrase.ru,level:unit.level,
 topic:unit.category==='america'?'Разговорная Америка':'Рабочие выражения',
 example:phrase.en,translation:phrase.ru,
 tip:phrase.tip,source:'course' as const
})));

/** Additional editorially authored entries. Columns: level/topic/English/Russian/example/translation.
 * Avoids duplicate translations of inflected variants masquerading as new vocabulary.
 */
const ADDITIONAL=`
A1|Семья|parent|родитель|My parent is at home.|Мой родитель дома.
A1|Семья|relative|родственник|A relative is coming to visit.|К нам в гости приезжает родственник.
A1|Семья|cousin|двоюродный брат или сестра|My cousin lives in Boston.|Мой двоюродный брат живёт в Бостоне.
A1|Семья|grandson|внук|Her grandson is five years old.|Её внуку пять лет.
A1|Семья|granddaughter|внучка|My granddaughter likes books.|Моя внучка любит книги.
A1|Семья|nephew|племянник|My nephew starts school this year.|Мой племянник идёт в школу в этом году.
A1|Семья|niece|племянница|My niece is learning to swim.|Моя племянница учится плавать.
A1|Семья|twin|близнец|My brother has a twin.|У моего брата есть близнец.
A1|Семья|couple|пара|The couple has two children.|У этой пары двое детей.
A1|Семья|wedding|свадьба|The wedding is in June.|Свадьба состоится в июне.
A1|Одежда|sweater|свитер|This sweater is warm.|Этот свитер тёплый.
A1|Одежда|jacket|куртка|Take your jacket; it's cold.|Возьми куртку, холодно.
A1|Одежда|coat|пальто|I need a new coat for winter.|Мне нужно новое пальто на зиму.
A1|Одежда|scarf|шарф|She is wearing a blue scarf.|На ней синий шарф.
A1|Одежда|gloves|перчатки|Don't forget your gloves.|Не забудь перчатки.
A1|Одежда|boots|ботинки|My boots are wet.|Мои ботинки мокрые.
A1|Одежда|socks|носки|I bought three pairs of socks.|Я купил три пары носков.
A1|Одежда|shirt|рубашка|He wears a white shirt to work.|На работу он надевает белую рубашку.
A1|Одежда|skirt|юбка|This skirt is too long.|Эта юбка слишком длинная.
A1|Одежда|dress|платье|She bought a summer dress.|Она купила летнее платье.
A1|Одежда|sneakers|кроссовки|My sneakers are comfortable.|Мои кроссовки удобные.
A1|Одежда|size|размер|Do you have this in my size?|У вас есть это моего размера?
A1|Одежда|fit|подходить по размеру|These shoes don't fit me.|Эта обувь мне не подходит по размеру.
A1|Еда|beef|говядина|We don't eat beef very often.|Мы нечасто едим говядину.
A1|Еда|chicken|курица|I'm making chicken and rice.|Я готовлю курицу с рисом.
A1|Еда|fish|рыба|We had fish for dinner.|На ужин у нас была рыба.
A1|Еда|fruit|фрукты|I eat fruit every day.|Я ем фрукты каждый день.
A1|Еда|vegetable|овощ|Carrots are my favorite vegetable.|Морковь — мой любимый овощ.
A1|Еда|mushroom|гриб|Would you like mushrooms on your pizza?|Хочешь грибы на пицце?
A1|Еда|flour|мука|We need flour to make bread.|Чтобы испечь хлеб, нам нужна мука.
A1|Еда|honey|мёд|I put honey in my tea.|Я добавляю мёд в чай.
A1|Еда|pepper|перец|Please pass the pepper.|Передай, пожалуйста, перец.
A1|Еда|salt|соль|This soup needs more salt.|В этот суп нужно добавить соли.
A1|Еда|sugar|сахар|I don't put sugar in my coffee.|Я не кладу сахар в кофе.
A1|Еда|coffee|кофе|I usually drink coffee in the morning.|Обычно утром я пью кофе.
A1|Еда|tea|чай|Would you like some tea?|Хочешь чаю?
A1|Время|midnight|полночь|I usually go to bed before midnight.|Обычно я ложусь спать до полуночи.
A1|Время|noon|полдень|Let's meet at noon.|Давай встретимся в полдень.
A1|Время|weekend|выходные|What are you doing this weekend?|Что ты делаешь в эти выходные?
A1|Время|weekday|будний день|Monday is a weekday.|Понедельник — будний день.
A1|Время|calendar|календарь|Mark the date on your calendar.|Отметь дату в календаре.
A1|Время|minute|минута|Give me one minute, please.|Подожди минутку, пожалуйста.
A1|Время|hour|час|The lesson lasts one hour.|Урок длится один час.
A1|Время|second|секунда|Wait a second!|Секундочку!
A1|Время|yesterday|вчера|I was at home yesterday.|Вчера я был дома.
A1|Время|soon|скоро|I'll be back soon.|Я скоро вернусь.
A2|Быт|laundry|стирка; бельё|I need to do the laundry.|Мне нужно постирать бельё.
A2|Быт|dishwasher|посудомоечная машина|The dishwasher is full.|Посудомоечная машина заполнена.
A2|Быт|vacuum cleaner|пылесос|The vacuum cleaner is broken.|Пылесос сломался.
A2|Быт|washing machine|стиральная машина|The washing machine is leaking.|Стиральная машина протекает.
A2|Быт|trash can|мусорное ведро|The trash can is under the sink.|Мусорное ведро под раковиной.
A2|Быт|recycle|сдавать на переработку|We recycle paper and glass.|Мы сдаём бумагу и стекло на переработку.
A2|Быт|repair|ремонтировать|Can you repair this chair?|Ты можешь починить этот стул?
A2|Быт|replace|заменять|We need to replace the battery.|Нам нужно заменить батарейку.
A2|Быт|appliance|бытовой прибор|This appliance uses little electricity.|Этот прибор потребляет мало электричества.
A2|Быт|faucet|водопроводный кран|The faucet is dripping.|Из крана капает вода.
A2|Быт|outlet|электрическая розетка|Is there an outlet near the desk?|Рядом со столом есть розетка?
A2|Быт|extension cord|удлинитель|Please use an extension cord.|Пожалуйста, воспользуйся удлинителем.
A2|Быт|storage|хранение|We need more storage space.|Нам нужно больше места для хранения.
A2|Быт|drawer|выдвижной ящик|The keys are in the top drawer.|Ключи лежат в верхнем ящике.
A2|Здоровье|sore throat|боль в горле|I have a sore throat.|У меня болит горло.
A2|Здоровье|cough|кашель|This cough keeps me awake.|Этот кашель мешает мне спать.
A2|Здоровье|fever|жар; повышенная температура|He has a high fever.|У него высокая температура.
A2|Здоровье|allergy|аллергия|Do you have any food allergies?|У вас есть пищевая аллергия?
A2|Здоровье|prescription|рецепт врача|The doctor gave me a prescription.|Врач выписал мне рецепт.
A2|Здоровье|painkiller|обезболивающее|Ask the pharmacist about a painkiller.|Спросите фармацевта об обезболивающем.
A2|Здоровье|symptom|симптом|When did the symptoms start?|Когда появились симптомы?
A2|Здоровье|treatment|лечение|The treatment takes two weeks.|Лечение длится две недели.
A2|Здоровье|recover|выздоравливать|I hope you recover soon.|Надеюсь, ты скоро поправишься.
A2|Здоровье|appointment with a doctor|приём у врача|I have an appointment with a doctor on Friday.|В пятницу у меня приём у врача.
A2|Путешествия|passport control|паспортный контроль|We waited at passport control.|Мы ждали на паспортном контроле.
A2|Путешествия|customs|таможня|We went through customs quickly.|Мы быстро прошли таможню.
A2|Путешествия|connecting flight|стыковочный рейс|Our connecting flight leaves at nine.|Наш стыковочный рейс вылетает в девять.
A2|Путешествия|aisle seat|место у прохода|I'd like an aisle seat, please.|Мне, пожалуйста, место у прохода.
A2|Путешествия|window seat|место у окна|Can I have a window seat?|Можно мне место у окна?
A2|Путешествия|seat belt|ремень безопасности|Please fasten your seat belt.|Пожалуйста, пристегните ремень безопасности.
A2|Путешествия|baggage claim|выдача багажа|Where is baggage claim?|Где находится зона выдачи багажа?
A2|Путешествия|security screening|досмотр службы безопасности|Security screening took twenty minutes.|Досмотр занял двадцать минут.
A2|Путешествия|flight attendant|бортпроводник|The flight attendant offered water.|Бортпроводник предложил воду.
A2|Путешествия|departure board|табло вылетов|Check the departure board.|Посмотрите на табло вылетов.
A2|Путешествия|car rental|прокат автомобилей|We booked a car rental online.|Мы забронировали машину напрокат онлайн.
A2|Путешествия|speed limit|ограничение скорости|Please follow the speed limit.|Соблюдайте ограничение скорости.
A2|Путешествия|parking lot|парковка|The parking lot is full.|На парковке нет мест.
A2|Путешествия|gas station|заправка|Is there a gas station nearby?|Рядом есть заправка?
A2|Путешествия|crosswalk|пешеходный переход|Use the crosswalk to cross the street.|Переходите улицу по пешеходному переходу.
A2|Общение|invite|приглашать|I'd like to invite you to dinner.|Я хотел бы пригласить тебя на ужин.
A2|Общение|accept|принимать|She accepted my invitation.|Она приняла моё приглашение.
A2|Общение|decline|отклонять; вежливо отказываться|He politely declined the offer.|Он вежливо отказался от предложения.
A2|Общение|suggest|предлагать|Can you suggest a good restaurant?|Можешь посоветовать хороший ресторан?
A2|Общение|recommend|рекомендовать|I recommend this book.|Я рекомендую эту книгу.
A2|Общение|explain|объяснять|Please explain the problem.|Пожалуйста, объясните проблему.
A2|Общение|describe|описывать|Can you describe the issue?|Можете описать проблему?
A2|Общение|agree|соглашаться|I agree with you.|Я с тобой согласен.
A2|Общение|disagree|не соглашаться|I disagree with that decision.|Я не согласен с этим решением.
A2|Общение|apologize|извиняться|I apologize for the confusion.|Приношу извинения за путаницу.
A2|Общение|interrupt|перебивать|Sorry to interrupt you.|Извините, что перебиваю.
A2|Общение|promise|обещать|I promise to call tomorrow.|Обещаю позвонить завтра.
A2|Общение|remind|напоминать|Please remind me tomorrow.|Напомни мне завтра, пожалуйста.
A2|Общение|forget|забывать|I sometimes forget names.|Иногда я забываю имена.
A2|Общение|remember|помнить|Do you remember her address?|Ты помнишь её адрес?
B1|Технологии|authentication|аутентификация|Authentication is required to sign in.|Для входа нужна аутентификация.
B1|Технологии|two-factor authentication|двухфакторная аутентификация|Enable two-factor authentication for security.|Включите двухфакторную аутентификацию для защиты.
B1|Технологии|encryption|шифрование|Encryption protects sensitive data.|Шифрование защищает конфиденциальные данные.
B1|Технологии|data breach|утечка данных|The company reported a data breach.|Компания сообщила об утечке данных.
B1|Технологии|backup|резервная копия|Create a backup before updating the app.|Сделай резервную копию перед обновлением приложения.
B1|Технологии|restore|восстанавливать|You can restore your settings later.|Позже ты сможешь восстановить настройки.
B1|Технологии|update software|обновлять программное обеспечение|Please update your software.|Пожалуйста, обновите программное обеспечение.
B1|Технологии|bug report|отчёт об ошибке|I submitted a bug report yesterday.|Вчера я отправил отчёт об ошибке.
B1|Технологии|outage|сбой сервиса|We are investigating a service outage.|Мы расследуем сбой сервиса.
B1|Технологии|latency|задержка ответа системы|High latency may slow the app down.|Высокая задержка ответа может замедлить приложение.
B1|Технологии|bandwidth|пропускная способность|Video calls require enough bandwidth.|Для видеозвонков нужна достаточная пропускная способность.
B1|Технологии|browser extension|расширение браузера|Disable the browser extension to test the issue.|Отключите расширение браузера, чтобы проверить проблему.
B1|Технологии|cache|кэш|Try clearing the browser cache.|Попробуйте очистить кэш браузера.
B1|Технологии|database|база данных|The database stores transaction records.|База данных хранит записи о транзакциях.
B1|Технологии|API endpoint|конечная точка API|The API endpoint is temporarily unavailable.|Конечная точка API временно недоступна.
B1|Работа|follow up with a customer|связаться с клиентом повторно|I'll follow up with the customer tomorrow.|Завтра я повторно свяжусь с клиентом.
B1|Работа|set expectations|обозначить ожидания|We should set realistic expectations.|Нам нужно обозначить реалистичные ожидания.
B1|Работа|manage workload|распределять рабочую нагрузку|I manage my workload during busy shifts.|Я распределяю нагрузку во время напряжённых смен.
B1|Работа|meet a deadline|уложиться в срок|We need to meet the deadline.|Нам нужно уложиться в срок.
B1|Работа|handover notes|заметки для передачи смены|Please read the handover notes.|Пожалуйста, прочитайте заметки для передачи смены.
B1|Работа|open a ticket|создать обращение|I'll open a ticket for this issue.|Я создам обращение по этой проблеме.
B1|Работа|close a ticket|закрыть обращение|Please close the ticket after confirmation.|Закройте обращение после подтверждения.
B1|Работа|reopen a case|повторно открыть дело|We had to reopen the case.|Нам пришлось снова открыть дело.
B1|Работа|assign an owner|назначить ответственного|Please assign an owner to this task.|Назначьте ответственного за эту задачу.
B1|Работа|track progress|отслеживать прогресс|We track progress every day.|Мы отслеживаем прогресс каждый день.
B1|Работа|provide an update|сообщить новые сведения|I'll provide an update by noon.|Я сообщу новые сведения к полудню.
B1|Работа|ask for clarification|попросить уточнения|We need to ask for clarification.|Нам нужно попросить уточнения.
B1|Работа|handle an escalation|обработать эскалацию|She can handle an escalation calmly.|Она умеет спокойно обрабатывать эскалации.
B1|Работа|resolve a complaint|урегулировать жалобу|We resolved the complaint yesterday.|Вчера мы урегулировали жалобу.
B1|Работа|document the outcome|зафиксировать результат|Please document the outcome of the review.|Зафиксируйте результат проверки.
B1|Платежи|payment gateway|платёжный шлюз|The payment gateway is not responding.|Платёжный шлюз не отвечает.
B1|Платежи|payment processor|платёжный процессор|The payment processor is reviewing the transaction.|Платёжный процессор проверяет транзакцию.
B1|Платежи|settlement|расчёт по операциям|Settlement usually happens after processing.|Расчёт по операциям обычно следует после обработки.
B1|Платежи|processing fee|комиссия за обработку|A processing fee may apply.|Может взиматься комиссия за обработку.
B1|Платежи|billing address|платёжный адрес|Please confirm your billing address.|Подтвердите ваш платёжный адрес.
B1|Платежи|billing cycle|расчётный период|Your billing cycle ends next week.|Ваш расчётный период заканчивается на следующей неделе.
B1|Платежи|payment method|способ оплаты|Please choose another payment method.|Выберите другой способ оплаты.
B1|Платежи|payment link|ссылка для оплаты|We sent a secure payment link.|Мы отправили безопасную ссылку для оплаты.
B1|Платежи|transaction reference|идентификатор операции|Please share the transaction reference.|Пожалуйста, сообщите идентификатор операции.
B1|Платежи|refund request|запрос на возврат средств|We received your refund request.|Мы получили ваш запрос на возврат.
B1|Платежи|refund status|статус возврата|You can check the refund status online.|Вы можете проверить статус возврата онлайн.
B1|Платежи|chargeback dispute|спор по оспоренному платежу|The team is reviewing the chargeback dispute.|Команда рассматривает спор по оспоренному платежу.
B1|Платежи|dispute resolution|урегулирование споров|Dispute resolution may take time.|Урегулирование споров может занять время.
B1|Платежи|risk assessment|оценка рисков|The payment requires risk assessment.|Платёж требует оценки рисков.
B1|Платежи|fraud alert|предупреждение о мошенничестве|The system triggered a fraud alert.|Система выдала предупреждение о мошенничестве.
B2|Работа|stakeholder|заинтересованная сторона|Keep stakeholders informed of the incident.|Сообщайте заинтересованным сторонам об инциденте.
B2|Работа|contingency plan|резервный план действий|We prepared a contingency plan.|Мы подготовили резервный план действий.
B2|Работа|root cause analysis|анализ первопричины|The team completed a root cause analysis.|Команда завершила анализ первопричины.
B2|Работа|mitigation|смягчение последствий|The mitigation reduced the impact.|Меры смягчения снизили последствия.
B2|Работа|operational risk|операционный риск|We must assess the operational risk.|Нам нужно оценить операционный риск.
B2|Работа|service continuity|непрерывность обслуживания|Service continuity is a key priority.|Непрерывность обслуживания — важный приоритет.
B2|Работа|resource allocation|распределение ресурсов|Resource allocation affects response times.|Распределение ресурсов влияет на скорость ответа.
B2|Работа|capacity planning|планирование мощностей|Capacity planning helps during peak demand.|Планирование мощностей помогает при пиковом спросе.
B2|Работа|performance review|оценка эффективности работы|My performance review is next month.|Моя оценка эффективности состоится в следующем месяце.
B2|Работа|professional development|профессиональное развитие|Professional development matters to me.|Профессиональное развитие важно для меня.
B2|Работа|cross-functional team|межфункциональная команда|A cross-functional team reviewed the issue.|Межфункциональная команда рассмотрела проблему.
B2|Работа|escalation matrix|матрица эскалации|Follow the escalation matrix for urgent cases.|Для срочных случаев используйте матрицу эскалации.
B2|Работа|audit trail|журнал аудита|The audit trail records all changes.|Журнал аудита фиксирует все изменения.
B2|Работа|policy exception|исключение из политики|The manager approved a policy exception.|Руководитель одобрил исключение из политики.
B2|Работа|incident response|реагирование на инциденты|Our incident response plan is up to date.|Наш план реагирования на инциденты актуален.
B2|Платежи|anti-money laundering|противодействие отмыванию денег|Anti-money laundering checks are mandatory.|Проверки по противодействию отмыванию денег обязательны.
B2|Платежи|know your customer|знай своего клиента; KYC|Know your customer checks help verify identity.|Проверки KYC помогают установить личность.
B2|Платежи|enhanced due diligence|расширенная проверка клиента|The account requires enhanced due diligence.|Для счёта нужна расширенная проверка клиента.
B2|Платежи|suspicious activity|подозрительная активность|We flagged the suspicious activity for review.|Мы отметили подозрительную активность для проверки.
B2|Платежи|transaction monitoring|мониторинг транзакций|Transaction monitoring can reveal unusual patterns.|Мониторинг транзакций может выявить необычные закономерности.
B2|Платежи|payment reconciliation|сверка платёжных операций|Payment reconciliation identified a mismatch.|Сверка платёжных операций выявила расхождение.
B2|Платежи|duplicate charge|двойное списание|The customer reported a duplicate charge.|Клиент сообщил о двойном списании.
B2|Платежи|reversal|сторнирование операции|The bank processed the reversal.|Банк обработал сторнирование.
B2|Платежи|authorization hold|блокировка суммы при авторизации|The authorization hold is temporary.|Блокировка суммы при авторизации временная.
B2|Платежи|acquiring bank|банк-эквайер|The acquiring bank confirmed the payment.|Банк-эквайер подтвердил платёж.
B2|Платежи|issuing bank|банк-эмитент|Contact the issuing bank for more details.|Обратитесь в банк-эмитент за подробностями.
B2|Платежи|cardholder|держатель карты|The cardholder disputed the transaction.|Держатель карты оспорил операцию.
B2|Платежи|settlement delay|задержка расчётов|A settlement delay affected the payout.|Задержка расчётов повлияла на выплату.
B2|Платежи|cross-border payment|трансграничный платёж|Cross-border payments may take longer.|Трансграничные платежи могут занимать больше времени.
B2|Платежи|exchange rate markup|надбавка к обменному курсу|The exchange rate markup increased the cost.|Надбавка к обменному курсу увеличила стоимость.
`;
export const v10Vocabulary:Word[]=ADDITIONAL.trim().split('\n').map((line,i)=>{
 const parts=line.split('|');
 if(parts.length!==6)throw new Error(`Недопустимая запись словаря v10, строка ${i+1}`);
 const [level,topic,en,ru,example,translation]=parts;
 return {id:`v10:${en.toLowerCase()}`,en,ru,topic,level:level as Word['level'],example,translation,source:'original' as const};
});
