@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js не найден. Установите LTS с https://nodejs.org/
  pause
  exit /b 1
)
if not exist "node_modules\next" (
  echo Устанавливаю зависимости. Для этого нужен интернет...
  call npm install
  if errorlevel 1 (
    echo Ошибка установки зависимостей. Проверьте интернет и повторите попытку.
    pause
    exit /b 1
  )
)
echo Сайт запустится по адресу http://localhost:3000
call npm run dev
pause
