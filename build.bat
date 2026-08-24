@echo off
setlocal

rem **************************************************
rem Parse arguments: first non-flag is the tag, --no-cache enables no-cache
rem All other arguments are passed directly to docker build.
rem **************************************************
set "TAG="
set "DOCKER_BUILD_ARGS="

:parse_args
if "%~1"=="" goto args_parsed
  if not defined TAG (set "TAG=%~1") else (set "DOCKER_BUILD_ARGS=%DOCKER_BUILD_ARGS% %~1")
shift
goto parse_args
:args_parsed
if "%TAG%"=="" (
  echo Uso: %~nx0 ^<tag^> [--no-cache]
  exit /b 1
)

rem **************************************************
rem Navega para a raiz do projeto e lê o nome do package.json
rem **************************************************

rem Build command (echo before executing). DOCKER_BUILD_ARGS are passed here.
set "BUILD_CMD=docker build %DOCKER_BUILD_ARGS% -t registry.ghcarvalho.com.br/softline/frontend:%TAG% ."
set "PUSH_CMD=docker push registry.ghcarvalho.com.br/softline/frontend:%TAG%"

echo %BUILD_CMD%
call %BUILD_CMD%
if errorlevel 1 (
  echo Erro ao executar o docker build
  exit /b %errorlevel%
)

echo %PUSH_CMD%
call %PUSH_CMD%
if errorlevel 1 (
  echo Erro ao executar o docker push
  exit /b %errorlevel%
)