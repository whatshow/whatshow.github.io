@echo off
echo All projects are going to be pulled including (nested) submodules
echo.
echo.
set bat_path=%~dp0
cd /d %bat_path%
for /f "tokens=*" %%i in ('dir /ad  /b ') do (
    cd %%i 
    echo ------%%i------
    git pull
    git submodule update --remote --merge --recursive --init
    cd ..
)
echo.
echo.
echo All projects are pulled including (nested) submodules!
pause