# Dylan Web Design & Development Sprint 0

Welkom bij de README van mijn website voor Sprint 0 van de minor Web Design & Development.

## Week 1

### Maandag 2 februari
Jarig & vrij

### Dinsdag 3 februari
Vandaag heb ik een eerste idee voor de website gehad; ik wil een interactieve platformer maken waarbij je met het toetsenbord een personage kan besturen en vervolgens mijn leerdoelen kan vinden door rond te zoeken in het scherm
Voor nu heb ik wat standaard HTML en CSS erin gezet en heb ik ervoor gezorgd dat de website hier op Github staat. Momenteel wordt deze geupdatet wanneer ik de bestanden handmatig upload.
Verder heb ik een knop rechtsboven staan die de kleuren van de achtergrond kleur veranderd. Dit wordt gedaan door de body een .night class te geven.

### Woensdag 4 februari
Vandaag was ik helaas te laat vanwege het OV. De treinen op Schiphol reden niet vanwege een brandalarm. Ik kon gelukkig nog wel de Directus → FETCH → JSON → HTML workshop volgen. Ik heb geleerd over API's en JSONs en heb mijn Github website nu gekloond op mijn computer. Nu kan ik mijn veranderingen gelijk pushen naar Github. 

Verder heb ik een visitekaart website gemaakt tijdens de workshop waarmee ik data heb opgehaald uit een API over mezelf door een URL op te halen, de data eruit te fetchen met een functie en deze af te spelen met InnerHTML.

Op mijn eigen website ben ik begonnen aan een platformer. Ik heb al ervaring met het maken van platformers in JavaScript in jaar 1, dus vond het wel bij mij passen. Momenteel heb ik een canvas met een vierkant die je links en rechts kan besturen met de W en D. Verder kun je ook de pijltoetsen gebruiken en staan er op het scherm ook pijltjes die je kan gebruiken. Verder is er zwaartekracht waardoor het vierkantje omlaag valt en heb ik een platform waar het vierkantje op kan staan. In jaar 1 had ik een volledig spel gemaakt in JavaScript. Hier heb ik wat code uit recycled. Ik heb veel code wel herschreven want mijn code van toen was niet heel optimaal en netjes geschreven. Verder had ik toen een tutorial gebruikt van Chris Courses voor JavaScript platformers. Die video staat vermeld in de bronnenlijst.

### Donderdag 5 februari
Vandaag zijn we begonnen met 2 workshops: 1 over thema's en 1 over responsiveness. Voor themas is laten zien hoe je makkelijk de kleuren kan bepalen van light & dark mode. Ik ga zelf wat anders doen dan light/dark. Ik heb het idee om een water thema toe te voegen. In mijn platformer zou je dan op de normale thema van links naar rechts kunnen bewegen met zwaartekracht. Je kan niet in de lucht springen. Als het water thema aan staat, kun je in de lucht "zwemmen". Voor nu heb ik mijn code aangepast om een water thema aan en uit te zetten. Verder heb ik mijn ::root veranderd naar html.

Op het begin van de dag werd iedereens Github pagina besproken. Mijn Github was bijna goed. Het enige wat ik miste is wat folders. Ik heb mijn stylesheet en script in hun eigen mapje gezet en een IMG folder toegevoegd. 

Ik heb de spring functie toegevoegd. Je kan springen met W, Space en de bovenpijl toets (zowel op scherm als toetsenbord). Verder heb ik de toetsenbord op het scherm geupdatet om te werken op mobiel.




### Vrijdag 6 februari
Vandaag moesten we een eerste versie van onze website laten zien. Ik heb in de ochtend een level gemaakt voor op mobiel. Dit level heb ik eerst ontworpen in Figma en daarna toegepast in JavaScript. Ik kon in Figma mijn frame dezelfde grootte maken als mijn canvas en kon daardoor alle waardes van grootte en coordinaten 1 op 1 toepassen.

Verder heb ik mijn code wat opgeschoont. Er zat een bug in het spel waardoor je in het water thema extra hoog sprong. Ik weet niet precies waardoor het kwam maar toen ik wat overbodige code (over wel/niet kunnen springen op platforms) had verwijderd was de sprong weer normaal. Verder kun je niet meer buiten het canvas springen (tenzij je naar beneden valt)

Ook heb ik een boek object toegevoegd. Voor nu nog een vierkant. Ik heb een collider functie gemaakt met behulp van ChatGPT waardoor de speler met dit object kan interacteren. Wanneer de speler tegen het "boek" aanloopt verdwijnt het boek en verschint een popup met mijn leerdoelen
Leerdoel 1 - Ik wil indrukwekkende animaties kunnen maken in CSS
Leerdoel 2 - Ik wil mezelf verbeteren in ideeen bedenken voor themas van websites
Leerdoel 3 - Ik wil meer efficient code kunnen schrijven en zo min mogelijk overbodige code hebben.




## Week 2

### Maandag 9 februari
Vandaag moet ik naar de tandarts om 13:00 dus ben ik helaas niet aanwezig. Verder deed het internet thuis vervelend dus had ik niet veel kunnen doen tot later in de middag.

Ik heb me vandaag veel bezig gehouden met het water thema. Ik heb mijn code iets anders opgezet. Eerst had ik 1 variabel voor de achtergrond kleur. Deze zou veranderen afhankelijk van het data thema. Nu heb ik gewoon 2 variabelen, 1 voor normale achtergrond, een voor water. De rede hiervoor is omdat ik een transitie heb toegevoegd in JavaScript waarbij het water van onder omhoog komt binnen een paar seconden. Omdat beide achtergrond kleuren in beeld moeten zijn heb ik het zo moeten doen. 

Ook heb ik een bubbel animatie toegevoegd. Ik had dit eerst met CSS gedaan maar helaas heb ik het uiteindelijk met JavaScript moeten doen zodat het zou werken met de thema transitie. Ik heb hier veel ChatGPT voor gebruikt door de hele tijd mijn eigen code op te sturen, zeggen wat ik wel en niet goed vind om uiteindelijk op een resultaat te komen waar ik tevreden mee ben.

Daarnaast heb ik het canvas een vaste grootte gemaakt. Ik heb het een formaat voor mobiel gemaakt, maar zal ook prima speelbaar zijn op desktop. Op laptop is er een grijze achtergrond omheen dus ondanks het canvas een mobiel formaat heeft ziet hij er op desktop prima uit. Ik moest er nog voor zorgen dat de pijltoetsen en de thema knop ook binnen de canvas bleven op desktop dus ik heb alles in een wrapper gezet en de styling van de canvas hierop toegepast. Ik heb deze ook in het midden gezet met inset en transform:translate.

Verder heb ik vernomen dat de extra eis gaat over het ophalen van data van andere studenten uit het API.

### Dinsdag 10 februari

### Woensdag 11 februari

### Donderdag 12 februari
Vandaag om 10.00 is de deadline

### Vrijdag 13 februari
Vrij

## Bronnenlijst
Chris Courses Platformer
https://www.youtube.com/watch?v=4q2vvZn5aoo

W3 Schools Positions
https://www.w3schools.com/css/css_positioning.asp

ChatGPT: Lopen met de pijltoetsen
Ik had al code voor het bewegen, maar ik heb aan Chat gevraagd hoe ik handig de functie kan toepassen op zowel WASD, de pijltoetsen en de schermtoetsen voor zowel muis als touch
Prompt:

ChatGPT: Collision met boek
Prompt: 

Animista: CSS Animaties
https://animista.net/play/entrances/rotate-in-2/rotate-in-2-bck-cw