# Willkommen zu deiner neuen Webseite!

Liebe Sabine,

herzlichen Glückwunsch zu deiner nagelneuen, modernen Online-Präsenz! Diese Dokumentation soll dir als kleiner Wegweiser dienen. Sie ist nicht kompliziert geschrieben, sondern so gedacht, dass du jederzeit schnell nachschlagen kannst, wenn du etwas anpassen möchtest.

Deine neue Seite wurde handwerklich genauso sorgfältig maßgeschneidert wie deine Kreationen. Im Hintergrund arbeiten modernste Technologien:
* **Astro:** Macht die Seite blitzschnell und sicher.
* **Sveltia CMS:** Ein Verwaltungssystem, das direkt mit deinen Dateien spricht – ohne fehleranfällige Datenbanken im Hintergrund.
* **Netlify:** Sorgt dafür, dass Änderungen sofort in echte Webseiten verwandelt und ins Netz geladen werden.

Das Beste daran? Du musst dich um all diese Technik nicht kümmern. Du fokussierst dich auf deine Arbeit und die Inhalte.

### Checkliste: Was wir gemeinsam bei der Übergabe einrichten
Damit du direkt sicher starten kannst, gehen wir folgende Schritte einmal gemeinsam durch:
- [ ] Deinen Zugang zum Redaktionssystem (CMS) testen.
- [ ] Dein Profil und deinen "Über mich"-Text anschauen.
- [ ] Ein erstes Demo-Produkt anlegen und die Verbindung zu Stripe (Bezahlung) verstehen.
- [ ] Einen kurzen Beispiel-Blogbeitrag erstellen, um den Text-Editor kennenzulernen.

---

## 1. Das Redaktionssystem (CMS) aufrufen

Um neue Taschen einzustellen, Blogbeiträge zu schreiben oder Kurse anzupassen, nutzt du dein Redaktionssystem (das CMS).

1. Gehe in deinem Internet-Browser auf deine Webseite und hänge einfach `/admin` an die Adresse an (also z.B. `deinewebseite.de/admin`).
2. Klicke auf "**Login with GitHub**".
3. Du wirst nun in das Dashboard von *Sveltia CMS* weitergeleitet. 

Auf der linken Seite siehst du nun deine verschiedenen Inhalte: **Produkte, Blog, Projekte, Kurse** und spezielle Seiten (wie Startseite oder Über Mich).

---

## 2. Den Online-Shop pflegen (Produkte)

Deine Produkte sind das Herzstück der Seite. Wenn du im CMS links auf **"Shop / Produkte"** klickst, siehst du alle bisherigen Werke.

**Ein neues Produkt anlegen:**
1. Klicke oben rechts auf den Button zum Erstellen eines neuen Eintrags.
2. Fülle die Felder aus:
    * **Titel:** Z.b. "Umhängetasche Rosa Traum"
    * **Beschreibung:** Ein kurzer Satz, der bei Google oder auf Facebook erscheint, wenn jemand den Link teilt.
    * **Preis:** Bitte einfach als Zahl eingeben (z.B. `120`).
    * **Vorschaubild:** Das Hauptbild.
    * **Bildergalerie:** Hier kannst du auf das kleine Plus klicken und weitere Detail-Aufnahmen hinzufügen.
    * **Stripe Payment Link:** Hier fügst du den Verkaufs-Link ein, den du bei Stripe (deinem Bezahlanbieter) erstellt hast.
3. **Besondere Häkchen:**
    * **Gepinnt?:** Wenn du das auswählst, wird dieses Produkt riiiiesig ganz oben im Shop als Highlight angezeigt. (Tipp: Immer nur *ein* Produkt pinnen!).
    * **Entwurf?:** Klicke das an, wenn du das Produkt noch nicht veröffentlichen möchtest (z.b. wenn noch ein Foto fehlt).

**Besonderheit bei Unikaten & Stripe:**
Da die meisten deiner Werke Unikate (Einzelstücke) sind, empfehlen wir dir dringend, beim Erstellen des Bezahl-Links in Stripe die **Stückzahl auf 1 zu begrenzen**. 
Dadurch passiert folgendes automatisch: Wenn jemand die Tasche kauft, wird der Link bei Stripe sofort ungültig (inaktiv). Deine Webseite merkt das beim nächsten Seitenaufruf ganz von alleine und graut den "Kaufen"-Button für diesen Artikel aus! Das ist die einfachste und sicherste Lösung. Alternativ kannst du auch jederzeit das Produkt hier im CMS öffnen und per Hand das Häkchen bei **"Ist Verkauft?"** setzen.

---

## 3. Blogbeiträge schreiben

Hast du Tipps für die Stoffwahl oder möchtest Bilder aus deiner Werkstatt zeigen? 
Klicke links auf **"Blog"** und erstelle einen neuen Eintrag. Bedenke dabei immer: Deine Kunden schätzen deine mehr als 30-jährige Erfahrung. Schreib genau so einladend, wie du es im echten Leben erklären würdest!

---

## 4. Der Text-Editor (Schreiben & Formatieren)

Wenn du lange Texte schreibst (z.B. im Blog, bei den Kursen oder auf der "Über mich"-Seite), steht dir ein umfangreicher **Text-Editor** zur Verfügung. Das zugehörige Textfeld heißt meistens **"Inhalt"** (oder "Body"). Du kannst dort fast wie in Word arbeiten. 

Hier ist eine Übersicht, was du alles machen kannst:
* **Text formatieren:** Mache Wörter **fett** oder *kursiv*, um sie hervorzuheben. Einfach den Text markieren und in der Menüleiste des Editors auf das **B** (Bold/Fett) oder *I* (Italic/Kursiv) klicken.
* **Überschriften:** Strukturiere lange Texte mit Zwischenüberschriften (wie "H2" oder "H3"). Das macht es für den Leser viel übersichtlicher.
* **Listen:** Erstelle Aufzählungen mit Punkten oder nummerierte Listen (perfekt für Schritt-für-Schritt-Anleitungen oder Materiallisten).
* **Links einfügen:** Du kannst Wörter markieren und einen Link hinterlegen (z.B. auf deine Nähkurse oder zu einem Produkt im Shop).
* **Bilder einfügen:** Lade direkt im Text Bilder hoch, um deine Beiträge lebendiger zu machen.
* **Zitate:** Hebe wichtige Aussagen als Blockzitat hervor.

*Tipp:* Wenn du dir unsicher bist, probiere es einfach an einem neuen Entwurf aus!

---

## 5. Nähkurse aktualisieren

Wenn sich die Termine für das nächste Quartal ändern oder du einen neuen Workshop-Block anbietest, klicke links auf **"Kurse / Workshops"**.

Du findest hier Felder für den Beginn ("Startdatum"), Dauer und den Ort. Du kannst im Text-Editor dann ganz übersichtlich aufschreiben, wann genau der Mittwochskurs und wann der Donnerstagskurs stattfindet.

---

## 6. Zu guter Letzt: Das Speichern & Bauen im Hintergrund

Egal in welchem Bereich du arbeitest (Shop, Blog, Kurse) – wenn du fertig bist, drückst du oben auf **"Speichern"** (oder Publish/Veröffentlichen). 

**Wichtig zu wissen: Deine Seite wird im Hintergrund neu gebaut!**
Normale Webseiten (wie z.B. WordPress) bauen bei jedem Besucherzugriff alles frisch aus einer Datenbank zusammen. Das macht sie oft langsam und sehr anfällig für Hacker. 
Deine Seite ist hier modern und anders: Wenn du auf "Speichern" klickst, fängt im Hintergrund ein System an, eine komplett fertige, rasend schnelle und absolut sichere Version deiner neuen Seite zu "bauen" und als fertiges Paket ins Netz zu stellen. 

* **Der große Vorteil für dich:** Du musst dich nie um technische Updates oder Hacker-Angriffe sorgen. Deine Seite ist für deine Besucher immer blitzschnell da und extrem sicher.
* **Was das für deine Arbeit bedeutet:** Nachdem du auf Speichern gedrückt hast, dauert es immer **ca. 1 bis 2 Minuten**, bis die Seite im Hintergrund fertig "gebaut" wurde und die Änderungen für alle Menschen im Internet sichtbar auftauchen. 

Hab also nach dem Speichern einen kurzen Moment Geduld – lade einfach deine Webseite nach ein, zwei Minuten neu, und deine neuesten Werke sind online!

Viel Freude mit deiner digitalen Werkstatt!
