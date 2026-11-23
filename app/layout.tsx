import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'English Up — английский A1–B2',description:'Английский A1–B2: грамматика, словарь, чтение, аудирование, интерактивные диалоги. Без регистрации и платного API.',manifest:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/manifest.webmanifest',appleWebApp:{capable:true,title:'English Up',statusBarStyle:'default'},icons:{icon:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/icon-192.png',apple:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/icon-192.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru" suppressHydrationWarning><body>{children}</body></html>}
