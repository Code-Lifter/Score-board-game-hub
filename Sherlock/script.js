
      // --- DOM Elements ---

      const searchInput = document.getElementById("directorySearch");

      const directoryList = document.getElementById("directoryList");

      const categoriesContainer = document.getElementById(
        "categoriesContainer",
      );

      const informantsContainer = document.getElementById(
        "informantsContainer",
      );

      const noResults = document.getElementById("noResults");

      const loadingMsg = document.getElementById("loadingMsg");

      // --- Global State ---

      let masterDirectoryData = [];

      // --- TAB SWITCHING LOGIC ---

      const tabBtns = document.querySelectorAll(".tab-btn");

      const tabContents = document.querySelectorAll(".tab-content");

      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          tabBtns.forEach((b) => b.classList.remove("active"));

          tabContents.forEach((c) => c.classList.remove("active"));

          btn.classList.add("active");

          document.getElementById(btn.dataset.tab).classList.add("active");
        });
      });

      // --- FETCH & INITIALIZE ---

      async function loadArchives() {
        try {
          // Fetch all three JSON files concurrently for speed

          const [dirRes, catRes, infoRes] = await Promise.all([
            fetch("directory.json"),

            fetch("categories.json"),

            fetch("informants.json"),
          ]);

          // Catch local file:// protocol errors

          if (!dirRes.ok || !catRes.ok || !infoRes.ok) {
            throw new Error(
              "Network response was not ok. Are you running a local server?",
            );
          }

          masterDirectoryData = await dirRes.json();

          const categoriesData = await catRes.json();

          const informantsData = await infoRes.json();

          // Clear loading message

          loadingMsg.style.display = "none";

          // Initialize Views

          renderDirectory(masterDirectoryData);

          renderCategories(categoriesData);

          renderInformants(informantsData);
        } catch (error) {
          console.error("Initialization Failed:", error);

          loadingMsg.innerHTML = `<span style="color: darkred;">Error reading archives. If you are opening this file directly, you must use a local server (like VS Code Live Server) to fetch JSON files.</span>`;
        }
      }

      // --- RENDER FUNCTIONS ---

      function renderDirectory(data) {
        directoryList.innerHTML = "";

        if (data.length === 0) {
          noResults.style.display = "block";

          return;
        }

        noResults.style.display = "none";

        let currentLetter = "";

        let html = "";

        data.forEach((item) => {
          const firstLetter = item.name.charAt(0).toUpperCase();

          if (firstLetter !== currentLetter) {
            html += `<div class="letter-header">${firstLetter}</div>`;

            currentLetter = firstLetter;
          }

          html += `

<div class="directory-item">

<span class="dir-name">${item.name}</span>

<span class="dir-dots"></span>

<span class="dir-location">${item.location}</span>

</div>

`;
        });

        directoryList.innerHTML = html;
      }

      function renderCategories(data) {
        let html = "";

        for (const [categoryName, items] of Object.entries(data)) {
          html += `<div class="category-header">${categoryName}</div>`;

          html += items
            .map(
              (item) => `

<div class="directory-item">

<span class="dir-name">${item.name}</span>

<span class="dir-dots"></span>

<span class="dir-location">${item.location}</span>

</div>

`,
            )
            .join("");
        }

        categoriesContainer.innerHTML = html;
      }

function renderInformants(data) {
        informantsContainer.innerHTML = data
          .map(
            (info) => `
<div class="informant-card">
  <img src="images/${info.image}" alt="${info.name}" class="informant-img" />
  <div class="informant-content">
    <div class="informant-header">
      <h3 class="informant-name">${info.name}</h3>
      <span class="informant-location">${info.location}</span>
    </div>
    <p class="informant-desc">${info.description}</p>
  </div>
</div>
`
          )
          .join("");
      }
      
      // --- LIVE SEARCH ---

      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        const filteredData = masterDirectoryData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm),
        );

        renderDirectory(filteredData);
      });

      // Boot the app

      loadArchives();
