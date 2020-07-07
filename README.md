Prosta aplikacja webowa do ewidencji wykoywanych serwisów np. w serwisie komputerowym

Do uruchomienia potrzebne jest zainstalowane środowisko Node.js.

Dodatkowo należy zainstalować kilka modułów:
`npm i express mongoose ejs method-override shortid`

Jeżeli chcemy używać MongoDB w chmurze, należy stworzyć tam klaster, dodać użytkownika z uprawnieniami do odczytu i zapisu, oraz dodać nasz publiczny adres IP aby móc połączyć się z klastrem.
Można też używać Mongo lokalnie (wymagana instalacja), należy wtedy zmienić adres na: `mongodb://localhost:27017/<database>`

Aby uruchomić serwer, wpisz:
`node app.js`.