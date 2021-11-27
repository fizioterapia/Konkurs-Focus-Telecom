# Konkurs Focus Telecom
Autor: Tomasz Gradek

**Instalacja:**

```
cd backend
npm install
cd ..
cd frontend
npm install
```

# Konfiguracja backend'u

Jeśli chcesz korzystać ze strony za pomocą Fake API nie konfiguruj bramki.

**Konfiguracja Bramki:**

1. Przejdź do katalogu `./backend/config/`.
2. Przekopiuj plik `auth.example.json` i zmień jego nazwę na `auth.json`.
3. Uzupełnij kolumnę **call** za pomocą danych logowania do bramki Focus Telecom.
4. Uzupełnij kolumnę **number** swoim numerem telefonu.

**Konfiguracja FAQ:**

1. Przejdź do katalogu `./backend/files/`.
2. Edytuj plik `faq.txt` na podstawie poniższego wzoru:

```
Linia nieparzysta - Pytanie
Linia parzysta - Odpowiedź do pytania

Przykład:
#1 Pytanie
Odpowiedź
#2 Pytanie
Odpowiedź
```

# Uruchomienie strony

```
# Backend
cd backend
node app.js

# Frontend
cd frontend
npm run serve
```

Rezultat będzie widoczny pod adresem: http://localhost:8080
