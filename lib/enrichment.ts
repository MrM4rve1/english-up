import type { Lesson, Question } from './content';

/** Дополнительные проверенные вручную задания. Не генерируются случайной заменой слов. */
const q = (question:string, choices:[string,string,string], answer:number, why:string):Question => ({q:question,choices,answer,why});

const bank: Record<string,Question[]> = {
 'be':[
  q('You ___ very helpful.',['am','are','is'],1,'С you используется are.'),
  q('My colleagues ___ at the office.',['is','am','are'],2,'Множественное число colleagues требует are.'),
  q('It ___ not a problem.',['are','is','am'],1,'С it используется is.'),
  q('___ your manager available?',['Is','Are','Do'],0,'С одним человеком (your manager) начинаем вопрос с Is.'),
 ],
 'present-simple':[
  q('My brother ___ in a bank.',['work','works','working'],1,'С he/she/it в утверждении добавляем -s: works.'),
  q('We ___ payments every day.',['process','processes','processing'],0,'С we используется начальная форма process.'),
  q('Does she ___ on weekends?',['works','work','working'],1,'После does глагол стоит в начальной форме.'),
  q('I ___ not understand the question.',['does','am','do'],2,'С I отрицание: do not understand.'),
 ],
 'present-cont':[
  q('They ___ discussing the issue now.',['is','are','do'],1,'С they используется are + ing.'),
  q('Look! The dog ___ .',['runs','is running','run'],1,'Look! = действие происходит прямо сейчас.'),
  q('Are you ___ to me?',['listen','listening','listens'],1,'После are нужна форма с -ing.'),
  q('She ___ working this week.',['isn’t','doesn’t','aren’t'],0,'Временная ситуация: is not working.'),
 ],
 'past-simple':[
  q('I ___ your message last night.',['received','receive','have received'],0,'Last night — конкретное время в прошлом.'),
  q('___ you call the client yesterday?',['Do','Did','Have'],1,'Вопрос о прошлом: Did + базовая форма.'),
  q('She didn’t ___ the file.',['sent','send','sends'],1,'После didn’t употребляется базовая форма send.'),
  q('We ___ to the meeting on Monday.',['go','went','gone'],1,'Past Simple глагола go — went.'),
 ],
 'present-perfect':[
  q('We ___ just finished the report.',['has','have','did'],1,'С we: have + V3.'),
  q('He has ___ his password.',['forget','forgot','forgotten'],2,'Третья форма forget — forgotten.'),
  q('I ___ never visited Chicago.',['have','did','am'],0,'Опыт до настоящего времени: have never + V3.'),
  q('She ___ yesterday.',['has called','called','have called'],1,'Yesterday требует Past Simple, не Present Perfect.'),
 ],
 'past-cont':[
  q('When I arrived, they ___ talking.',['was','were','did'],1,'They were + глагол-ing.'),
  q('At 9 o’clock I ___ dinner.',['was cooking','have cooked','cook'],0,'Длительный процесс в определённый момент прошлого.'),
  q('What ___ you doing when I called?',['did','were','have'],1,'Вопрос Past Continuous: Were you doing…?'),
  q('He ___ while the phone rang.',['was driving','drives','has driven'],0,'Длительный фон: was driving; короткое событие: rang.'),
 ],
 'conditional-1':[
  q('If he ___ the file, I will check it.',['will send','sends','sent'],1,'В if-части будущего условия: Present Simple.'),
  q('We will reply if we ___ an update.',['have','will have','had'],0,'После if не нужно will, если это обычное условие.'),
  q('If the order fails, we ___ you.',['contacted','will contact','contacting'],1,'В результате реального условия используем will + verb.'),
  q('If you study, you ___ improve.',['will','would','did'],0,'Реальное будущее, First Conditional.'),
 ],
 'passive':[
  q('The payment ___ yesterday.',['was processed','processed','is processing'],0,'Прошлое время и пассив: was + V3.'),
  q('Emails ___ every morning.',['send','are sent','are sending'],1,'Регулярное действие в пассиве: are + V3.'),
  q('Your request will ___ reviewed.',['is','be','being'],1,'Future Passive: will be + V3.'),
  q('The documents have ___ verified.',['be','being','been'],2,'Present Perfect Passive: have been + V3.'),
 ],
 'extra-1':[
  q('I bought ___ umbrella.',['a','an','the'],1,'Umbrella начинается с гласного звука: an.'),
  q('She works at ___ university.',['an','a','the'],1,'University начинается со звука /j/: a university.'),
  q('___ sun is shining.',['A','An','The'],2,'Об уникальном солнце говорят the sun.'),
  q('He is ___ honest person.',['a','an','—'],1,'Honest начинается с гласного звука: an.'),
 ],
 'extra-2':[
  q('There ___ a new message.',['is','are','have'],0,'Единственное число: there is.'),
  q('There ___ any tickets left.',['isn’t','aren’t','doesn’t'],1,'Несколько tickets: there aren’t.'),
  q('___ there a bank nearby?',['Are','Do','Is'],2,'Один bank: Is there…?'),
  q('How many people ___ there?',['is','are','have'],1,'People — множественное число.'),
 ],
 'extra-3':[
  q('Can she ___ me?',['helps','help','to help'],1,'После can — начальная форма без to.'),
  q('I ___ swim, but I can drive.',['can’t','am not','don’t'],0,'Отсутствие умения: can’t + verb.'),
  q('___ I ask a question?',['Do','Can','Am'],1,'Can I…? — вежливый способ попросить разрешения.'),
  q('He can ___ English well.',['speaks','speaking','speak'],2,'У can нет окончания -s.'),
 ],
 'extra-4':[
  q('I need ___ help.',['some','any','many'],0,'В утвердительной просьбе о количестве: some.'),
  q('Do you have ___ updates?',['some','any','much'],1,'В обычном вопросе: any.'),
  q('Would you like ___ coffee?',['any','some','many'],1,'В предложении угощения часто some.'),
  q('We don’t have ___ time left.',['some','any','many'],1,'В отрицании: any.'),
 ],
 'extra-5':[
  q('Look at those clouds! It ___ rain.',['is going to','will to','go to'],0,'Видны признаки будущего: is going to.'),
  q('I ___ study tonight.',['am going to','are going to','going'],0,'С I: am going to + verb.'),
  q('Are they going to ___ us?',['helping','help','helps'],1,'После going to нужна базовая форма.'),
  q('He ___ going to move.',['am','are','is'],2,'С he используется is.'),
 ],
 'extra-6':[
  q('This lesson is ___ than the last one.',['more easy','easier','easiest'],1,'Easy → easier; для сравнения используем than.'),
  q('My new job is ___ interesting.',['more','most','much'],0,'Длинное прилагательное: more interesting.'),
  q('Today is ___ than yesterday.',['hotter','more hot','hottest'],0,'Hot → hotter (удваиваем t).'),
  q('That is the ___ option.',['better','best','more good'],1,'Превосходная степень good — best.'),
 ],
 'extra-7':[
  q('You ___ see a doctor if you feel sick.',['should','mustn’t','can’t'],0,'Should — рекомендация.'),
  q('We ___ follow the company’s security rules.',['shouldn’t','have to','might'],1,'Have to — внешнее обязательство по правилам.'),
  q('You ___ share passwords with strangers.',['mustn’t','don’t have to','might'],0,'Mustn’t означает строгий запрет.'),
  q('You ___ bring a laptop; we provide one.',['mustn’t','don’t have to','shouldn’t'],1,'Don’t have to = нет необходимости (не запрет).'),
 ],
 'extra-8':[
  q('She used to ___ in Boston.',['living','lived','live'],2,'После used to базовая форма глагола.'),
  q('I ___ to wake up early, but now I work nights.',['used','use','am used'],0,'Used to описывает прежнюю привычку.'),
  q('Did you ___ to work here?',['used','use','using'],1,'После did: use to, без -d.'),
  q('He didn’t ___ to like coffee.',['used','use','using'],1,'Отрицание: didn’t use to + verb.'),
 ],
 'extra-9':[
  q('I have been ___ English for months.',['learn','learning','learned'],1,'Have been + глагол-ing.'),
  q('She ___ been waiting since 9 a.m.',['have','has','is'],1,'С she используем has been.'),
  q('How long ___ you been working here?',['do','have','are'],1,'Вопрос: How long have you been…?'),
  q('They have been talking ___ an hour.',['since','for','during'],1,'For = длительность; since = начальная точка.'),
 ],
 'extra-10':[
  q('By the time I called, she ___ left.',['had','has','did'],0,'Past Perfect: had + V3.'),
  q('He had ___ the email before lunch.',['send','sent','sending'],1,'Третья форма send — sent.'),
  q('We ___ finished when the meeting started.',['have','were','had'],2,'Одно действие завершилось до другого в прошлом.'),
  q('Had you ___ this before?',['seen','saw','see'],0,'После had употребляется третья форма seen.'),
 ],
 'extra-11':[
  q('If I ___ more time, I would travel.',['have','had','will have'],1,'Second Conditional: if + Past Simple.'),
  q('She ___ help if she knew.',['will','would','is'],1,'Воображаемый результат: would + verb.'),
  q('If I were you, I ___ apologize.',['would','will','am'],0,'Совет с воображаемым условием: If I were you, I would…'),
  q('If he spoke English, he ___ apply.',['can','would','did'],1,'Нереальная/воображаемая ситуация: would apply.'),
 ],
 'extra-12':[
  q('“I am busy,” he said. → He said he ___ busy.',['is','was','were'],1,'При передаче в прошедшем am → was.'),
  q('She told ___ she was tired.',['me','to me','I'],0,'Tell + person: told me.'),
  q('“I will call,” he said. → He said he ___ call.',['will','would','can'],1,'Will часто меняется на would.'),
  q('He said that he ___ there before.',['had been','has been','is'],0,'Present Perfect обычно меняется на Past Perfect.'),
 ],
 'extra-13':[
  q('If you had studied, you ___ passed.',['would','would have','will have'],1,'Результат нереального прошлого: would have + V3.'),
  q('If I ___ known, I would have helped.',['have','had','did'],1,'Условие Third Conditional: had + V3.'),
  q('She would have called if she ___ time.',['had had','has','would have'],0,'Past Perfect глагола have — had had.'),
  q('If it hadn’t rained, we ___ gone out.',['will have','would have','would'],1,'В альтернативном прошлом: would have + V3.'),
 ],
 'extra-14':[
  q('You ___ have checked the amount.',['should','must to','would to'],0,'Should have + V3: совет или сожаление о прошлом.'),
  q('She ___ have missed the message; I’m not sure.',['must to','might','should to'],1,'Might have выражает неуверенное предположение.'),
  q('He ___ have forgotten, but he remembered.',['could','can to','was'],0,'Could have + V3 — нереализованная возможность.'),
  q('They must have ___ already.',['leave','left','leaving'],1,'После must have употребляется V3.'),
 ],
 'extra-15':[
  q('Rarely ___ we see such requests.',['are','do','have'],1,'После Rarely в начале: вспомогательный do перед подлежащим.'),
  q('Not only ___ she help, but she also explained.',['did','does','was'],0,'Not only + инверсия did she help.'),
  q('Never ___ he been so nervous.',['has','does','is'],0,'В Present Perfect: Never has he been…'),
  q('Only then ___ I understand the problem.',['did','do','have'],0,'При вынесении Only then происходит инверсия.'),
 ],
 'extra-16':[
  q('If I had studied more, I ___ more confident now.',['would be','would have been','will be'],0,'Прошлое условие → результат сейчас: would be.'),
  q('If she were more careful, she ___ lost her key yesterday.',['won’t have','wouldn’t have','doesn’t'],1,'Состояние сейчас → результат в прошлом: wouldn’t have + V3.'),
  q('If he had taken the job, he ___ in Seattle now.',['would live','will live','has lived'],0,'Прошлый выбор влияет на настоящее: would live.'),
  q('If I spoke Spanish, I ___ helped yesterday.',['would have','had','will'],0,'Настоящая способность, прошлое следствие: would have + V3.'),
 ],
};

// Дополнительные живые примеры для каждой темы (American English).
const samples:Record<string,[string,string][]>={
 'be':[['I am a student.','Я студент.'],['He is very tired.','Он очень устал.'],['We are ready to start.','Мы готовы начать.'],['They are not at home.','Их нет дома.']],
 'present-simple':[['I usually wake up at seven.','Обычно я просыпаюсь в семь.'],['He doesn’t drink coffee.','Он не пьёт кофе.'],['Do they work on weekends?','Они работают по выходным?'],['The store opens at nine.','Магазин открывается в девять.']],
 'present-cont':[['The phone is ringing.','Телефон звонит.'],['She is not working today.','Сегодня она не работает.'],['Are you listening to me?','Ты меня слушаешь?'],['They are staying with friends this week.','На этой неделе они живут у друзей.']],
 'past-simple':[['He arrived an hour ago.','Он приехал час назад.'],['We didn’t watch the movie.','Мы не смотрели фильм.'],['Did she finish her task?','Она закончила задание?'],['I went to the bank on Friday.','В пятницу я ходил в банк.']],
 'present-perfect':[['I have never tried sushi.','Я никогда не пробовал суши.'],['He has lost his keys.','Он потерял ключи.'],['We haven’t received a reply yet.','Мы ещё не получили ответ.'],['Have they finished the project?','Они завершили проект?']],
 'past-cont':[['She was watching TV when I called.','Она смотрела телевизор, когда я позвонил.'],['Were you waiting for me?','Ты меня ждал?'],['We weren’t sleeping at midnight.','В полночь мы не спали.'],['It was raining all afternoon.','Весь день шёл дождь.']],
 'conditional-1':[['If you leave now, you will be on time.','Если выйдешь сейчас, успеешь вовремя.'],['If it snows, we will stay in.','Если пойдёт снег, мы останемся дома.'],['She will call if she needs help.','Она позвонит, если ей понадобится помощь.'],['If I don’t understand, I will ask.','Если не пойму, спрошу.']],
 'passive':[['The package was delivered yesterday.','Посылку доставили вчера.'],['English is spoken here.','Здесь говорят по-английски.'],['The issue will be fixed soon.','Проблема скоро будет исправлена.'],['The documents have been checked.','Документы уже проверены.']],
 'extra-1':[['She has a new job.','У неё новая работа.'],['We saw an interesting movie.','Мы посмотрели интересный фильм.'],['The answer is clear.','Ответ понятен.'],['I need an hour.','Мне нужен час.']],
 'extra-2':[['There are two shops nearby.','Поблизости есть два магазина.'],['Is there a problem?','Есть проблема?'],['There isn’t any milk.','Молока нет.'],['Are there any questions?','Есть вопросы?']],
 'extra-3':[['I can drive.','Я умею водить.'],['She can’t come tonight.','Сегодня вечером она не может прийти.'],['Can I sit here?','Можно здесь сесть?'],['We can help you.','Мы можем вам помочь.']],
 'extra-4':[['We need some information.','Нам нужна информация.'],['I don’t have any money.','У меня нет денег.'],['Do you have any questions?','Есть вопросы?'],['Would you like some water?','Хотите воды?']],
 'extra-5':[['They are going to move next month.','Они собираются переехать в следующем месяце.'],['I’m not going to buy it.','Я не собираюсь это покупать.'],['Are you going to call him?','Ты собираешься ему звонить?'],['Look! It’s going to rain.','Смотри! Сейчас пойдёт дождь.']],
 'extra-6':[['This one is cheaper.','Этот дешевле.'],['Her English is better now.','Сейчас её английский лучше.'],['It is the most useful tool.','Это самый полезный инструмент.'],['Today is colder than yesterday.','Сегодня холоднее, чем вчера.']],
 'extra-7':[['You should get some rest.','Тебе стоит отдохнуть.'],['I have to work tomorrow.','Мне нужно работать завтра.'],['You must not share this code.','Нельзя делиться этим кодом.'],['You don’t have to hurry.','Тебе не нужно спешить.']],
 'extra-8':[['She used to play tennis.','Раньше она играла в теннис.'],['We didn’t use to have a car.','Раньше у нас не было машины.'],['Did you use to live here?','Ты раньше здесь жил?'],['He used to work nights.','Раньше он работал по ночам.']],
 'extra-9':[['I have been working since noon.','Я работаю с полудня.'],['How long have you been learning English?','Как давно ты учишь английский?'],['It has been raining all day.','Дождь идёт весь день.'],['They have been discussing the issue.','Они уже некоторое время обсуждают проблему.']],
 'extra-10':[['I had left before he arrived.','Я ушёл до того, как он пришёл.'],['She had already eaten.','Она уже поела.'],['Had you seen the movie before?','Ты уже видел этот фильм раньше?'],['They hadn’t received the report yet.','Они ещё не получили отчёт.']],
 'extra-11':[['If I were rich, I would travel more.','Если бы я был богат, я бы больше путешествовал.'],['She would help if she had time.','Она помогла бы, если бы у неё было время.'],['If we lived closer, we would meet often.','Если бы мы жили ближе, мы бы часто встречались.'],['What would you do?','Что бы ты сделал?']],
 'extra-12':[['She said she was tired.','Она сказала, что устала.'],['He told me he needed help.','Он сказал мне, что ему нужна помощь.'],['They said they would arrive late.','Они сказали, что приедут поздно.'],['She asked if I was ready.','Она спросила, готов ли я.']],
 'extra-13':[['If you had called, I would have answered.','Если бы ты позвонил, я бы ответил.'],['I would have helped if I had known.','Я бы помог, если бы знал.'],['If we had left earlier, we would have arrived on time.','Если бы вышли раньше, приехали бы вовремя.'],['She wouldn’t have missed it if she had checked.','Она бы не пропустила это, если бы проверила.']],
 'extra-14':[['You should have told me.','Тебе стоило мне сказать.'],['She might have forgotten.','Возможно, она забыла.'],['We could have taken a taxi.','Мы могли бы поехать на такси.'],['He must have been exhausted.','Должно быть, он был очень уставшим.']],
 'extra-15':[['Never have I seen this before.','Никогда раньше я такого не видел.'],['Rarely do we get such questions.','Редко мы получаем такие вопросы.'],['Only then did I understand.','Только тогда я понял.'],['Not only did she help, but she stayed late.','Она не только помогла, но и задержалась.']],
 'extra-16':[['If I had slept more, I would feel better now.','Если бы я больше поспал, сейчас чувствовал бы себя лучше.'],['If she were more careful, she wouldn’t have lost it.','Если бы она была внимательнее, она бы это не потеряла.'],['If he had moved, he would live closer now.','Если бы он переехал, сейчас жил бы ближе.'],['If I spoke French, I would have helped yesterday.','Если бы я говорил по-французски, я бы помог вчера.']],
};

const pitfalls:Record<string,[string,string,string]>={
 'be':['She are busy.','She is busy.','Для she — is, а не are.'],
 'present-simple':['He work every day.','He works every day.','В утверждениях после he/she/it добавляется -s.'],
 'present-cont':['I working now.','I am working now.','Для Continuous нужен am/is/are.'],
 'past-simple':['Did you went?','Did you go?','После did — начальная форма.'],
 'present-perfect':['I have seen him yesterday.','I saw him yesterday.','Конкретное прошлое время yesterday требует Past Simple.'],
 'past-cont':['I were sleeping.','I was sleeping.','С I в прошлом используется was.'],
 'conditional-1':['If it will rain, I stay.','If it rains, I will stay.','Обычно после if используем Present Simple.'],
 'passive':['The email sent yesterday.','The email was sent yesterday.','В пассиве нужен be + V3.'],
 'extra-1':['an university','a university','Артикль определяется звуком, а не первой буквой.'],
 'extra-2':['There is two options.','There are two options.','Множественное число требует are.'],
 'extra-3':['She can speaks.','She can speak.','После can только базовая форма.'],
 'extra-4':['I don’t have some time.','I don’t have any time.','В обычном отрицании употребляется any.'],
 'extra-5':['I going to leave.','I am going to leave.','Не пропускай am/is/are перед going to.'],
 'extra-6':['more easier','easier','Нельзя одновременно more и -er.'],
 'extra-7':['You must to go.','You must go.','После must — глагол без to.'],
 'extra-8':['Did you used to live here?','Did you use to live here?','После did используется use, не used.'],
 'extra-9':['I have been work.','I have been working.','После been нужна форма -ing.'],
 'extra-10':['She had went.','She had gone.','Past Perfect: had + третья форма глагола.'],
 'extra-11':['If I will have time, I would help.','If I had time, I would help.','Во втором условном if + Past Simple.'],
 'extra-12':['He told that he was tired.','He said that he was tired.','Tell требует адресата: told me.'],
 'extra-13':['If I would have known…','If I had known…','В if-части Third Conditional используем had + V3.'],
 'extra-14':['She should have went.','She should have gone.','После have — третья форма глагола.'],
 'extra-15':['Never I have seen…','Never have I seen…','После Never в начале нужна инверсия.'],
 'extra-16':['If I had practiced, I would speak better yesterday.','If I had practiced, I would speak better now.','Смешанные условия связывают прошлую причину с текущим результатом.'],
};
export type DetailedLesson=Lesson&{pitfall?:[string,string,string]};
export function enrichLessons(lessons:Lesson[]):DetailedLesson[]{
 return lessons.map(lesson=>({...lesson,questions:[...lesson.questions,...(bank[lesson.id]??[])],examples:[...lesson.examples,...(samples[lesson.id]??[])],pitfall:pitfalls[lesson.id]}));
}
