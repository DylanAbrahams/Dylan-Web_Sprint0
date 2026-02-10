// ===================== CONFIG =====================
// Toegestane IDs
const allowedIds = [69, 71, 72, 228];
for (let i = 279; i <= 325; i++) {
  if (![281, 282, 294, 317, 319, 323].includes(i)) {
    allowedIds.push(i);
  }
}

// ===================== API CHECK (1 CALL) =====================
async function checkPlayerNameWithAPI(playerName) {
  const enteredName = playerName.toLowerCase();
  let matchFound = false;

  const idsParam = allowedIds.join(",");
  const apiURL = `https://fdnd.directus.app/items/person?filter[id][_in]=${idsParam}&limit=-1`;

  const response = await fetchJson(apiURL);
  const persons = response.data;

  persons.forEach(personData => {
    const personName = personData.name ? personData.name.toLowerCase() : "";
    const personNickname = personData.nickname ? personData.nickname.toLowerCase() : "";

    const match =
      personName.includes(enteredName) || personNickname.includes(enteredName);

    if (match) {
      matchFound = true;

      // 🔹 Zet spelerkleur
      if (personData.fav_color) player.color = personData.fav_color;

      // 🔹 Update HTML
      document.getElementById("player-name-display").textContent = personData.name;
      document.getElementById("player-color-display").textContent = personData.fav_color || "N/A";

      console.log("=== API DATA MATCH ===");
      console.log("Name:", personData.name);
      console.log("Nickname:", personData.nickname);
      console.log("Color:", personData.fav_color);
      console.log("Website:", personData.profilecard);
      console.log("ID:", personData.id);
      console.log(`✅ Match gevonden voor "${playerName}" bij ID: ${personData.id}`);
    }
  });

  if (!matchFound) {
    console.log(`❌ Geen match gevonden voor "${playerName}"`);
  }
}

async function updateBooksContentFromAPI(id) {
  const apiURL = `https://fdnd.directus.app/items/person/${id}`;
  const response = await fetchJson(apiURL);
  const personData = response.data;

  if (personData.custom) {
    try {
      const customData = JSON.parse(personData.custom);
      if (customData.leerdoelen && Array.isArray(customData.leerdoelen)) {
        // Loop over bestaande boeken en vervang de content
        for (let i = 0; i < books.length; i++) {
          if (customData.leerdoelen[i]) {
            books[i].content = customData.leerdoelen[i].beschrijving;
          } else {
            books[i].content = "Leerdoel ontbreekt"; // fallback
          }
        }
      }
    } catch (error) {
      console.error("Error parsing custom JSON:", error);
    }
  }
}

// ===================== FETCH HELPERS =====================
async function fetchJson(url, payload = {}) {
  try {
    const response = await fetch(url, payload);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
