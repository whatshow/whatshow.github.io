@echo off
echo All projects are going to be pushed!
echo.
echo.
set bat_path=%~dp0
cd /d %bat_path%
for /f "tokens=*" %%i in ('dir /ad  /b ') do (
    cd %%i 
    echo ------%%i------
    git add .
    git commit -m "auto push"
    git push
    cd ..
)
echo.
echo.
echo All projects are pushed!
pause