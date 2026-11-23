import type {Level} from './storage.ts';
export type AssessmentKind='grammar'|'vocabulary'|'reading'|'listening';
export type AssessmentItem={id:string;level:Level;kind:AssessmentKind;prompt:string;choices:[string,string,string,string];answer:0|1|2|3;explanation:string;passage?:string;audio?:string};
type Raw=[Level,AssessmentKind,string,string,number,string,string?];
const placement:Raw[]=[
['A1','grammar','She ___ a student.','am|is|are|be',1,'С she в настоящем времени используется is.'],
['A1','grammar','___ you from the US?','Is|Are|Am|Be',1,'Вопрос с you строится через Are.'],
['A1','grammar','I ___ coffee every morning.','drinks|am drink|drink|drinking',2,'Для привычки используется Present Simple: I drink.'],
['A1','grammar','There ___ two books on the table.','is|are|was|be',1,'Во множественном числе используется there are.'],
['A1','vocabulary','Как по-английски «вчера»?','tomorrow|yesterday|today|later',1,'Yesterday означает вчера.'],
['A1','vocabulary','Как по-английски «полотенце»?','blanket|towel|pillow|curtain',1,'Towel — полотенце.'],
['A1','vocabulary','What does “neighbor” mean?','сосед|начальник|водитель|покупатель',0,'Neighbor — сосед.'],
['A1','vocabulary','Как сказать «поездка»?','trip|tree|price|shop',0,'Trip — поездка.'],
['A2','grammar','I ___ TV when you called.','watch|watched|was watching|have watched',2,'Длительное действие в прошлом: was watching.'],
['A2','grammar','We ___ this movie before.','saw already|have seen|see|are see',1,'Неопределённый опыт до настоящего: have seen.'],
['A2','grammar','If it rains, we ___ at home.','will stay|stayed|staying|would stay',0,'Первое условное: if + Present Simple, will + verb.'],
['A2','grammar','She is ___ than her sister.','tallest|more tall|taller|the taller',2,'Короткое прилагательное tall получает -er.'],
['A2','vocabulary','What does “receipt” mean?','отчёт|чек|оплата|сдача',1,'Receipt — чек о покупке или оплате.'],
['A2','vocabulary','Как сказать «записаться на приём»?','make an appointment|take a payment|miss a meeting|change a password',0,'Make an appointment — договориться о приёме.'],
['A2','vocabulary','What does “reschedule” mean?','отказать|согласиться|перенести по времени|подтвердить',2,'Reschedule — перенести на другое время.'],
['A2','vocabulary','“Out of stock” means:','в наличии|нет в наличии|по скидке|в дороге',1,'Out of stock — товар закончился.'],
['B1','grammar','When I arrived, they ___ dinner.','had finished|have finished|finish|are finish',0,'Действие завершилось раньше другого прошлого события: Past Perfect.'],
['B1','grammar','The email ___ yesterday.','sends|was sent|has send|is sending',1,'Пассив в Past Simple: was sent.'],
['B1','grammar','He said he ___ tired.','is|was|will|has',1,'В косвенной речи после said в прошлом обычно используется was.'],
['B1','grammar','If I had more time, I ___ more.','study|will study|would study|studied',2,'Нереальная ситуация сейчас: Second Conditional, would + verb.'],
['B1','vocabulary','“Escalate the case” means:','удалить обращение|передать обращение выше|закрыть аккаунт|проверить баланс',1,'Escalate — передать проблему специалисту следующего уровня.'],
['B1','vocabulary','Как сказать «крайний срок»?','schedule|deadline|feedback|outage',1,'Deadline — крайний срок.'],
['B1','vocabulary','What does “pending” mean for a payment?','ожидает завершения|полностью отменён|уже возвращён|заблокирован навсегда',0,'Pending — операция ещё находится в обработке.'],
['B1','vocabulary','What does “clarify” mean?','избегать|уточнять|одобрять|заменять',1,'Clarify — прояснять или уточнять информацию.'],
['B2','grammar','If she had left earlier, she ___ the train.','caught|would catch|would have caught|has caught',2,'Third Conditional описывает нереальный результат в прошлом: would have + V3.'],
['B2','grammar','Not only ___ the error, but he also fixed it.','he noticed|did he notice|he did notice|has he notice',1,'После Not only в начале предложения используется инверсия: did he notice.'],
['B2','grammar','The issue should ___ before the launch.','resolve|have resolved|have been resolved|be resolving',2,'Модальный перфектный пассив: should have been resolved.'],
['B2','grammar','She denied ___ the confidential data.','to share|share|sharing|had share',2,'После deny употребляется -ing: denied sharing.'],
['B2','vocabulary','What does “mitigate” mean in risk management?','уменьшать последствия|создавать риск|передавать сообщение|подписывать договор',0,'Mitigate — снижать риск или его последствия.'],
['B2','vocabulary','What does “reconciliation” mean in finance?','оценка кандидата|сверка записей|перевод сотрудника|новое назначение',1,'Reconciliation — сверка финансовых записей.'],
['B2','vocabulary','“Substantiate a claim” means:','опровергнуть всё|подкрепить утверждение доказательствами|сократить сроки|попросить отпуск',1,'Substantiate — обосновать доказательствами.'],
['B2','vocabulary','What does “nevertheless” signal?','причину|противопоставление|точное время|порядок действий',1,'Nevertheless вводит уступительное противопоставление.'],
['A1','reading','Where does Emma live?','Boston|Chicago|Miami|Dallas',0,'Emma говорит, что живёт в Boston.','My name is Emma. I live in Boston with my brother. I work in a small café.'],
['A1','reading','Where does Emma work?','In a hotel|In a café|In a school|In a bank',1,'В тексте указано a small café.','My name is Emma. I live in Boston with my brother. I work in a small café.'],
['A2','reading','Why did Alex call the store?','To order coffee|To change his address|To report a broken lamp|To find a job',2,'Лампа не работает, поэтому Алекс звонит в магазин.','Alex bought a lamp online. When it arrived, it would not turn on. He called the store to ask for an exchange.'],
['A2','reading','What did Alex want?','An exchange|A discount only|A new password|A vacation',0,'He called to ask for an exchange.','Alex bought a lamp online. When it arrived, it would not turn on. He called the store to ask for an exchange.'],
['B1','reading','Why did the agent avoid an exact refund date?','The bank was still processing it|The customer had canceled the account|The refund was already complete|There was no transaction',0,'Срок зависит от банка, который ещё обрабатывает возврат.','The agent confirmed that a refund was being processed by the bank. Instead of promising a specific date, she explained that the completion time depended on the bank and offered to send an update.'],
['B1','reading','What did the agent offer?','A free device|An update|A new card|An immediate chargeback',1,'The agent offered to send an update.','The agent confirmed that a refund was being processed by the bank. Instead of promising a specific date, she explained that the completion time depended on the bank and offered to send an update.'],
['B2','reading','What caused the interruption?','A change in the database query|A delayed flight|An employee on leave|A customer complaint',0,'Unexpected database traffic followed a change in the query.','After a routine deployment, database traffic rose unexpectedly because a query had changed. The team restored service within twenty minutes. Although transactions were delayed, customer balances remained intact.'],
['B2','reading','What remained unaffected?','Service response time|Customer balances|Database traffic|Transaction processing speed',1,'Customer balances remained intact.','After a routine deployment, database traffic rose unexpectedly because a query had changed. The team restored service within twenty minutes. Although transactions were delayed, customer balances remained intact.'],
['A1','listening','What drink does the customer order?','Water|Tea|Coffee|Juice',2,'Customer asks for a small coffee.','Customer: A small coffee, please. Server: Of course. Anything else?'],
['A1','listening','What size is the drink?','Large|Small|Medium|Extra large',1,'A small coffee.','Customer: A small coffee, please. Server: Of course. Anything else?'],
['A2','listening','When is the new appointment?','Tuesday at nine|Monday at ten|Wednesday at three|Friday at five',2,'The new time is Wednesday at three.','Caller: Can we move my appointment from Monday at ten to Wednesday at three? Receptionist: Yes, Wednesday at three is available.'],
['A2','listening','Was the new appointment accepted?','Yes|No|Only next week|Not discussed',0,'The receptionist confirms availability.','Caller: Can we move my appointment from Monday at ten to Wednesday at three? Receptionist: Yes, Wednesday at three is available.'],
['B1','listening','Why is the transaction still pending?','The bank is still processing it|The customer has no account|The agent reversed it|It was paid in cash',0,'Agent confirms the bank is processing it.','Customer: Has my payment failed? Agent: Not necessarily. The bank is still processing it. I will update you when the status changes.'],
['B1','listening','What will the agent do next?','Request a password|Delete the case|Send an update|Promise completion today',2,'The agent will update the customer.','Customer: Has my payment failed? Agent: Not necessarily. The bank is still processing it. I will update you when the status changes.'],
['B2','listening','What should the team avoid?','Documenting the incident|Promising a guaranteed fix|Giving a status update|Investigating the cause',1,'The manager says not to promise a guarantee.','Manager: The service has recovered, but the root cause is still under investigation. Please share what we know and avoid promising a permanent fix until engineering confirms it.'],
['B2','listening','What remains unknown?','The service has recovered|The customer impact|The exact root cause|The team contact',2,'The root cause is still under investigation.','Manager: The service has recovered, but the root cause is still under investigation. Please share what we know and avoid promising a permanent fix until engineering confirms it.'],
];

const b2:Raw[]=[
['B2','grammar','Hardly ___ when the system crashed.','had we logged in|we had logged in|have we logged in|we logged in',0,'Hardly в начале требует инверсии Past Perfect.'],
['B2','grammar','If the team had tested the patch, we ___ this issue now.','will not have|would not be facing|had not faced|were not facing',1,'Mixed Conditional: прошлое условие с результатом сейчас.'],
['B2','grammar','The request is believed ___ yesterday.','to submit|to have been submitted|being submitted|to have submit',1,'Перфектный пассивный инфинитив после is believed.'],
['B2','grammar','It is essential that he ___ the form today.','submits|submit|submitted|will submitting',1,'В американском английском после essential that — subjunctive с базовой формой submit.'],
['B2','grammar','No sooner ___ than the alarm sounded.','the server started|did the server start|had the server started|was the server start',2,'После No sooner употребляется инверсия Past Perfect.'],
['B2','grammar','She regrets ___ the message before checking it.','send|to send|having sent|to have send',2,'Сожаление о завершённом действии выражается having sent.'],
['B2','grammar','The issue ___ by now if the fix had worked.','would have been resolved|will resolve|has been resolving|would resolve',0,'Нереальный результат в прошлом: would have been resolved.'],
['B2','grammar','The report, ___ was published yesterday, is accurate.','that|what|which|whose',2,'В определительном придаточном с запятыми используется which.'],
['B2','vocabulary','What does “due diligence” refer to?','проверка перед решением|срочная доставка|исправление произношения|выдача зарплаты',0,'Due diligence — тщательная предварительная проверка.'],
['B2','vocabulary','“A plausible explanation” is:','очень дорогая|правдоподобная|гарантированная|вымышленная',1,'Plausible — правдоподобный.'],
['B2','vocabulary','What does “inadvertently” mean?','специально|еженедельно|непреднамеренно|официально',2,'Inadvertently — нечаянно, непреднамеренно.'],
['B2','vocabulary','“Viable alternative” means:','приемлемая альтернатива|отменённый платёж|секретная информация|завершённая проверка',0,'Viable — практически осуществимый.'],
['B2','vocabulary','“Allocate resources” means:','удалить отчёты|распределить ресурсы|изменить пароль|выписать чек',1,'Allocate — выделять, распределять.'],
['B2','vocabulary','What does “implication” often mean?','случайный звонок|неявное следствие|неверный адрес|краткая инструкция',1,'Implication — следствие или значение чего-либо.'],
['B2','vocabulary','“Ambiguous” means:','однозначный|двусмысленный|обязательный|устаревший',1,'Ambiguous — допускающий несколько трактовок.'],
['B2','vocabulary','“Comprehensive review” means:','поверхностная проверка|ежедневный звонок|всесторонний обзор|случайное сообщение',2,'Comprehensive — всесторонний.'],
['B2','reading','Why was the report postponed?','The data was incomplete|The client canceled it|The server was stolen|The manager was on vacation',0,'Отчёт отложили до получения полных данных.','The team postponed publishing its risk report because two key data sources were incomplete. Rather than presenting misleading estimates, the analysts requested additional records and agreed to communicate the delay transparently.'],
['B2','reading','Which principle guided the team?','Avoiding all communication|Presenting misleading estimates|Transparency about uncertainty|Releasing the report regardless',2,'Команда выбрала прозрачность вместо недостоверных оценок.','The team postponed publishing its risk report because two key data sources were incomplete. Rather than presenting misleading estimates, the analysts requested additional records and agreed to communicate the delay transparently.'],
['B2','reading','What was the proposed solution?','Introduce another manual approval step|Automate routine checks and review exceptions|Stop verifying transactions|Remove transaction monitoring',1,'Routine checks would be automated, with exceptions manually reviewed.','An internal review found that routine payment checks caused unnecessary delays. The team proposed automated checks with manual review reserved for unusual transactions. It emphasized that speed must not come at the expense of compliance.'],
['B2','reading','What trade-off did the review mention?','Speed versus compliance|Salary versus travel|Storage versus bandwidth|Recruitment versus training',0,'Speed must not come at the expense of compliance.','An internal review found that routine payment checks caused unnecessary delays. The team proposed automated checks with manual review reserved for unusual transactions. It emphasized that speed must not come at the expense of compliance.'],
['B2','listening','What does the supervisor require before a refund?','A social media post|Verification of the transaction|A phone number only|A customer rating',1,'Supervisor asks for verification first.','Supervisor: We understand the customer is frustrated. Before confirming any refund, we must verify the transaction and review the applicable policy. Please explain the next steps without making guarantees.'],
['B2','listening','What should the agent avoid?','Clarifying the policy|Explaining next steps|Making guarantees|Reviewing the transaction',2,'The supervisor says without making guarantees.','Supervisor: We understand the customer is frustrated. Before confirming any refund, we must verify the transaction and review the applicable policy. Please explain the next steps without making guarantees.'],
['B2','listening','Why is the handover important?','The next shift needs context|The case is closed|The customer canceled it|The supervisor is on leave',0,'The next shift must understand checks already performed.','Team lead: The customer sent two receipts that do not match. Document what you have checked and leave a clear handover so the next shift can continue without repeating the investigation.'],
['B2','listening','What problem was identified?','The transaction was approved|The two receipts did not match|The password expired|The server was restarted',1,'Two receipts do not match.','Team lead: The customer sent two receipts that do not match. Document what you have checked and leave a clear handover so the next shift can continue without repeating the investigation.'],
];
function build(items:Raw[],prefix:string):AssessmentItem[]{return items.map((x,i)=>{const [level,kind,prompt,choices,answer,explanation,source]=x;const parts=choices.split('|');if(parts.length!==4||answer<0||answer>3||!explanation||((kind==='reading'||kind==='listening')&&!source))throw Error(`Invalid ${prefix} question ${i}`);return {id:`${prefix}-${i+1}`,level,kind,prompt,choices:parts as AssessmentItem['choices'],answer:answer as AssessmentItem['answer'],explanation,...(kind==='reading'?{passage:source}:{}),...(kind==='listening'?{audio:source}:{})};});}
export const placementItems=build(placement,'placement-v11');
export const b2ExamItems=build(b2,'exam-v11');
export type AssessmentResult={id:'placement'|'b2';at:number;correct:number;total:number;byKind:Record<AssessmentKind,{correct:number;total:number}>;byLevel:Record<Level,{correct:number;total:number}>;transcriptOpened:boolean;estimatedLevel?:Level};
export function assess(id:AssessmentResult['id'],items:AssessmentItem[],answers:Record<string,number>,transcriptOpened=false,at=Date.now()):AssessmentResult{
 const byKind={grammar:{correct:0,total:0},vocabulary:{correct:0,total:0},reading:{correct:0,total:0},listening:{correct:0,total:0}};
 const byLevel={A1:{correct:0,total:0},A2:{correct:0,total:0},B1:{correct:0,total:0},B2:{correct:0,total:0}};
 let correct=0;for(const q of items){const ok=answers[q.id]===q.answer;correct+=Number(ok);byKind[q.kind].total++;byKind[q.kind].correct+=Number(ok);byLevel[q.level].total++;byLevel[q.level].correct+=Number(ok);}
 let level:Level='A1';for(const l of ['A1','A2','B1','B2'] as Level[]){const section=byLevel[l];if(section.total&&section.correct/section.total>=.75)level=l;else break;}
 return {id,at,correct,total:items.length,byKind,byLevel,transcriptOpened,...(id==='placement'?{estimatedLevel:level}:{})};
}
export function isAssessmentResult(value:unknown,id:string):value is AssessmentResult{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const o=value as Record<string,unknown>;
 if(o.id!==id||!['placement','b2'].includes(id)||!Number.isFinite(o.at)||typeof o.transcriptOpened!=='boolean')return false;
 if(!Number.isInteger(o.correct)||!Number.isInteger(o.total)||Number(o.total)<=0||Number(o.total)>100||Number(o.correct)<0||Number(o.correct)>Number(o.total))return false;
 const validGroup=(obj:unknown,keys:string[])=>{
  if(!obj||typeof obj!=='object'||Array.isArray(obj))return false;
  const entries=obj as Record<string,{correct?:unknown;total?:unknown}>;
  return keys.every(k=>Number.isInteger(entries[k]?.correct)&&Number.isInteger(entries[k]?.total)&&Number(entries[k].total)>=0&&Number(entries[k].correct)>=0&&Number(entries[k].correct)<=Number(entries[k].total));
 };
 if(!validGroup(o.byKind,['grammar','vocabulary','reading','listening'])||!validGroup(o.byLevel,['A1','A2','B1','B2']))return false;
 if(o.estimatedLevel!==undefined&&!['A1','A2','B1','B2'].includes(String(o.estimatedLevel)))return false;
 return true;
}
export function assessmentRate(score:{correct:number;total:number}){return score.total?Math.round(score.correct/score.total*100):0;}
export const writingPrompt='Напиши 120–180 слов: ответь клиенту, у которого задержалась транзакция. Объясни возможные причины, что ты проверишь и когда вернёшься с обновлением. Не обещай непроверенный результат.';
export const speakingPrompt='Устно (2–3 минуты): расскажи о сложном рабочем случае, объясни, какие действия ты предпринял, чего добился и что сделал бы иначе.';
