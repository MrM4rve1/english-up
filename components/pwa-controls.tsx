'use client';
import {useEffect,useState} from 'react';
import {Download,RefreshCcw,Wifi,WifiOff,Smartphone} from 'lucide-react';
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:'accepted'|'dismissed'}>};
export function PWAControls(){
 const [online,setOnline]=useState(true);const [install,setInstall]=useState<InstallEvent|null>(null);const [installed,setInstalled]=useState(false);const [updateReady,setUpdateReady]=useState(false);const [message,setMessage]=useState('');
 useEffect(()=>{
  const updateNetwork=()=>setOnline(navigator.onLine);updateNetwork();
  setInstalled(window.matchMedia('(display-mode: standalone)').matches);
  const onInstall=(event:Event)=>{event.preventDefault();setInstall(event as InstallEvent);};
  const onInstalled=()=>{setInstalled(true);setInstall(null);setMessage('English Up установлен как приложение.');};
  window.addEventListener('online',updateNetwork);window.addEventListener('offline',updateNetwork);
  window.addEventListener('beforeinstallprompt',onInstall);window.addEventListener('appinstalled',onInstalled);
  let active=true;let registration:ServiceWorkerRegistration|undefined;
  if('serviceWorker' in navigator&&process.env.NODE_ENV==='production'){
   navigator.serviceWorker.register((process.env.NEXT_PUBLIC_BASE_PATH||'')+'/sw.js').then(reg=>{
    if(!active)return;registration=reg;
    if(reg.waiting&&navigator.serviceWorker.controller)setUpdateReady(true);
    reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)setUpdateReady(true);});});
   }).catch(()=>setMessage('Сервис-воркер недоступен. Проверь HTTPS или localhost.'));
  }
  return ()=>{active=false;void registration;window.removeEventListener('online',updateNetwork);window.removeEventListener('offline',updateNetwork);window.removeEventListener('beforeinstallprompt',onInstall);window.removeEventListener('appinstalled',onInstalled);};
 },[]);
 async function beginInstall(){if(!install)return;try{await install.prompt();const result=await install.userChoice;if(result.outcome!=='accepted')setMessage('Установку можно запустить позднее из меню браузера.');setInstall(null);}catch{setMessage('Не удалось запустить установку из браузера.');}}
 function refreshApp(){window.location.reload();}
 return <section className="panel p-5 md:p-6" aria-label="Установка приложения"><div className="flex items-start gap-3"><Smartphone size={22} className="text-indigo-600 dark:text-indigo-300 shrink-0"/><div className="flex-1"><h3 className="font-extrabold text-lg">English Up как приложение</h3><p className="muted text-sm mt-2 leading-6">Работает без регистрации. После первого открытия часть ранее загруженных уроков может работать без сети. Для синтеза голоса и распознавания речи могут потребоваться возможности браузера и соединение.</p><div className="flex flex-wrap items-center gap-2 mt-4"><span className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold ${online?'bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100':'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100'}`}>{online?<Wifi size={15}/>:<WifiOff size={15}/>} {online?'Сеть доступна':'Нет соединения'}</span>{installed&&<span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">✓ Установлено</span>}{install&&!installed&&<button className="btn" onClick={()=>void beginInstall()}><Download size={16}/> Установить</button>}{updateReady&&<button className="btn-soft" onClick={refreshApp}><RefreshCcw size={16}/> Обновить приложение</button>}</div>{!install&&!installed&&<p className="muted text-xs mt-3">Если кнопки установки нет, открой меню Chrome/Edge → «Установить приложение»; браузер покажет её только при поддержке PWA. В режиме разработки установка может быть недоступна.</p>}{message&&<p className="text-xs text-indigo-700 dark:text-indigo-200 mt-3" role="status">{message}</p>}</div></div></section>;
}
