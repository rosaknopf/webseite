# Setup & Deployment Walkthrough

Dieses Dokument dient als technische Checkliste für den initialen Handover an den Kunden (Sabine Fröhlke). Ziel ist es, ein wartbares, unabhängiges und perfekt konfiguriertes Setup zu schaffen, bei dem du zukünftige Wartungsarbeiten problemlos durchführen kannst.

## 1. Domain & Hosting (Netlify)
Der moderne Tech-Stack (Astro SSR) benötigt einen performanten Host. Netlify ist hierfür die beste Wahl, da es sowohl die statischen Assets blitzschnell ausliefert, als auch die Serverless-Funktion für Stripe reibungslos bereitstellt.

- [ ] **Kunden-Account anlegen:** Erstelle einen dedizierten Netlify-Account für die Kundin (oder nutze ihren bestehenden).
- [ ] **Domain-Kauf:** Kaufe die finale Wunschdomain (z.B. über Netlify direkt oder einen externen Registrar wie INWX/IONOS).
    - *Tipp:* Wenn die Domain extern gekauft wird, hinterlege die Netlify-Nameserver im Domain-Portal für automatisches SSL.
- [ ] **Neues Projekt anlegen:** Verbinde Netlify mit dem neuen GitHub-Repository (siehe unten).

## 2. GitHub (Infrastruktur & Maintainability)
Das Repository sollte der Kundin gehören, du bleibst jedoch für Updates und Wartung an Bord.

- [ ] **Neues Repo erstellen:** Generiere ein privates (oder öffentliches) GitHub Repository im Account der Kundin (oder übertrage dieses Repo).
- [ ] **Code Push:** Pushe den aktuellen, bereinigten Projektstand dorthin.
- [ ] **Contributor Access:** Füge deinen eigenen GitHub-Account unter *Settings > Collaborators* als Administrator oder Maintainer hinzu!
    - *Warum?* Wenn Astro, Tailwind oder Stripe in Zukunft Major-Updates bekommen, kannst du so blitzschnell Branches erstellen, Updates testen und PRs mergen, ohne nach Logins fragen zu müssen.

## 3. Stripe Konfiguration (Sicherheit geht vor)
Die Webseite nutzt Netlify Functions (`/api/check-stock`), um live und DSGVO-konform zu prüfen, ob Artikel noch verfügbar sind. Dafür brauchen wir einen API-Key.

- [ ] **Stripe Account:** Die Kundin benötigt einen Stripe-Account für die Abwicklung.
- [ ] **Restricted Key anlegen:**
    1. Im Stripe-Dashboard zu *Entwickler > API-Schlüssel* navigieren.
    2. Klicke auf **"Eingeschränkten Schlüssel erstellen"**.
    3. Gib dem Schlüssel einen Namen (z.B. "Webseiten-Stock-Checker").
    4. Scrolle zu den Rechten für **"Payment Links"** und setze diese zwingend auf **"Nur lesen" (Read)**. Alle anderen Rechte verbieten!
    5. Schlüssel (`rk_live_...`) kopieren.
- [ ] **Environment Variable in Netlify setzen:**
    1. Im Netlify-Dashboard deines Projekts zu *Site configuration > Environment variables* navigieren.
    2. Variable anlegen: `STRIPE_SECRET_KEY` = `rk_live_...`
    3. *Wichtig:* Falls es Netlify Contexts gibt, stelle sicher, dass der Key für "Production" *und* für "Deploy Previews" eingetragen ist, sonst bricht der SSR-Build ab.

## 4. Netlify CMS (Sveltia) anbinden
Damit die Kundin redaktionell ohne Code arbeiten kann.

- [ ] **OAuth App in GitHub erstellen:**
    1. Im neuen GitHub-Account unter *Settings > Developer Settings > OAuth Apps* eine neue App anlegen.
    2. *Homepage URL:* Die neue Live-URL (z.B. `https://rosa-knopf.de`)
    3. *Authorization callback URL:* `https://api.netlify.com/auth/done` (Standard Netlify Auth).
- [ ] **Credentials in Netlify hinterlegen:**
    1. In Netlify unter *Site configuration > Access control > OAuth* den GitHub Provider aktivieren.
    2. Client ID und Client Secret aus dem vorherigen Schritt eintragen.

## 5. Finaler Check
- [ ] **Neu Bauen:** Trigger in Netlify unter *Deploys* einen neuen Build (`Clear cache and deploy site`).
- [ ] **Stripe Test:** Klicke im Onlineshop auf ein ausverkauftes Test-Produkt. Der Button muss sofort ausgegraut werden.
- [ ] **CMS Test:** Gehe auf `deinedomain.de/admin` und logge dich ein. Es sollte direkt das Sveltia-Dashboard erscheinen.

Hast du alles abgehakt, ist das Projekt wartbar, sicher und bereit für die Veröffentlichung!
