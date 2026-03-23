@echo off
setlocal

:loop
cls
echo ===========================================
echo      FlexiAura Auto-Sync Active
echo ===========================================
echo.
echo [%date% %time%] Checking for changes...

:: Add all changes
git add .

:: Commit with timestamp
git commit -m "Auto sync: %date% %time%"

:: Check if commit was successful (changes existed)
if %errorlevel% equ 0 (
    echo.
    echo Changes detected. Pushing to GitHub...
    git push
    echo.
    echo [%date% %time%] Sync complete!
) else (
    echo.
    echo No changes detected.
)

echo.
echo Waiting 60 seconds before next check...
:: Wait for 60 seconds
timeout /t 60 >nul
goto loop
