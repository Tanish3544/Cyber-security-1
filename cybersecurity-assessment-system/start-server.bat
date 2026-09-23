@echo off
title Cyber Security Assessment and Protection System - Local Host
echo Starting local web server...
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
