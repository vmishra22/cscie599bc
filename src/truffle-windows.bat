
cd "C:\Users\v1a\blockchain\cscie599bc\src\LetterContract"
rd /s /q "C:\Users\v1a\blockchain\cscie599bc\src\LetterContract\build\"
call truffle.cmd compile
call truffle.cmd migrate
