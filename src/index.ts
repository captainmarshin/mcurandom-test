// Import db plugin
import { createDbWorker } from "sql.js-httpvfs";

// Create worker for db
const workerUrl = new URL(
    "sql.js-httpvfs/dist/sqlite.worker.js",
    import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm",
    import.meta.url);

// Load database
async function load() {
  
    const worker = await createDbWorker(
        [{
            from: "inline",
            config: {
                serverMode: "full",
                url: "./universe.db",
                requestChunkSize: 4096,
            },
        }, ],
        workerUrl.toString(),
        wasmUrl.toString()
    );


    // --- Queries ---


    // Categories section
    const query_movies = await worker.db.query(`SELECT * FROM titles_movies`);
    const query_tv_shows = await worker.db.query(`SELECT * FROM titles_tv`);
    const query_animation = await worker.db.query(`SELECT * FROM titles_animation`);
    const query_specials = await worker.db.query(`SELECT * FROM titles_specials`);
    const query_oneshots = await worker.db.query(`SELECT * FROM titles_oneshots`);
    const query_webseries = await worker.db.query(`SELECT * FROM titles_webseries`);
    const query_comics = await worker.db.query(`SELECT * FROM titles_comics`);
    const query_games = await worker.db.query(`SELECT * FROM titles_games`);
    const query_musicals = await worker.db.query(`SELECT * FROM titles_musicals`);
    const query_books = await worker.db.query(`SELECT * FROM titles_books`);
    const query_documentary = await worker.db.query(`SELECT * FROM titles_documentary`);

    // // Sagas section
    const query_the_infinity_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE saga="The Infinity Saga" ORDER BY release_date ASC`);
    const query_the_multiverse_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE saga="The Multiverse Saga" ORDER BY release_date ASC`);

    // // Series section
    const query_spiderverse = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_movies_legacy WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date FROM titles_webseries WHERE series LIKE "%Spider-Verse%" ORDER BY release_date ASC`);
    const query_the_defenders_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series="The Defenders Saga" ORDER BY release_date ASC`);
    const query_marvel_heroes = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series="Marvel Heroes" ORDER BY release_date ASC`);
    const query_young_adult = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series="Young Adult" ORDER BY release_date ASC`);
    const query_marvel_legacy_movies = await worker.db.query(`SELECT * FROM titles_movies_legacy`);
    const query_adventure_into_fear = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date FROM titles_movies_legacy WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series LIKE "%Adventure into Fear%" ORDER BY release_date ASC`);

    // // Current section
    const query_upcoming = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE release_date > DATE('now') ORDER BY release_date ASC`);
    const query_running_now = await worker.db.query(`SELECT title, poster, saga, phase, release_date, description FROM ( SELECT title, poster, saga, phase, release_date, description FROM titles_movies WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, description FROM titles_tv WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, description FROM titles_animation WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, description FROM titles_oneshots WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, description FROM titles_specials WHERE studio = "Marvel Studios" AND release_date <= DATE('now')) ORDER BY release_date DESC LIMIT 1`);

    // Phases section
    const query_phase_one = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase One" ORDER BY release_date ASC`);
    const query_phase_two = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase Two" ORDER BY release_date ASC`);
    const query_phase_three = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase Three" ORDER BY release_date ASC`);
    const query_phase_four = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase Four" ORDER BY release_date ASC`);
    const query_phase_five = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase Five" ORDER BY release_date ASC`);
    const query_phase_six = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE phase="Phase Six" ORDER BY release_date ASC`);

    // Universe section
    const query_marvel_cinematic_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials  WHERE studio = "Marvel Studios" ORDER BY release_date ASC`);
    const query_fox_xmen_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_movies_legacy WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series LIKE "%Fox's X-Men Universe%" ORDER BY release_date ASC`);
    const query_sony_spiderman_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_movies_legacy WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date FROM titles_webseries WHERE series LIKE "%Sony's Spider-Man Universe%" ORDER BY release_date ASC`);
    const query_characters = await worker.db.query(`SELECT * FROM universe_characters`);

    // // Sorting queries
    // const query_mcu_sort_storydate = await worker.db.query(`SELECT title, poster, saga, phase, storyorder FROM titles_movies  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, storyorder FROM titles_tv  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, storyorder FROM titles_animation  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, storyorder FROM titles_oneshots  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, storyorder FROM titles_specials  WHERE studio = "Marvel Studios" ORDER BY storyorder ASC`);
    // const query_mcu_sort_releasedate = await worker.db.query(`SELECT title, poster, saga, phase, release_date FROM titles_movies  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_tv  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_animation  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_oneshots  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date FROM titles_specials  WHERE studio = "Marvel Studios" ORDER BY release_date ASC`);


    // --- Fetch and Display functions ---


    // Fetch sections from db and create on page
    async function fetchSections() {
      // SQL query
      const querySections = await worker.db.query(`SELECT name FROM web_sections ORDER BY sorting ASC`);
      // Get content div
      const sectionsContainer = document.getElementById("sectionsContainer");
    
      // Check if not null
      if (sectionsContainer) {
        // For every section from db
        querySections.forEach((section: any) => {
          // Create section element
          const sectionElement = document.createElement("div");
          sectionElement.classList.add("section");
          // Set name for each created element
          sectionElement.setAttribute("name", section.name);
    
          // Remove separator for Current section, because it first
          if (section.name !== "Current") {
            const sectionNameElement = document.createElement("div");
            sectionNameElement.classList.add("separator");
            sectionNameElement.textContent = section.name;
            sectionElement.appendChild(sectionNameElement);
          }
    
          sectionsContainer.appendChild(sectionElement);
        });
      }
    }
    
    async function fetchCategories() {
      // Fetch categories from the `web_categories` table
      const queryCategories = await worker.db.query(`SELECT name, section, description FROM web_categories`);
    
      // Get the section containers
      const sectionContainers = document.getElementsByClassName("section");
    
      // Loop through each category
      queryCategories.forEach(async (category: any) => {
        // Find the corresponding section container
        const sectionContainer = Array.from(sectionContainers).find((container: any) => {
          const sectionName = container.getAttribute("name");
          return sectionName === category.section;
        });
    
        if (sectionContainer) {
          // Create the category block
          const categoryBlock = document.createElement("div");
          categoryBlock.classList.add("category-block");
    
          // Create the category name element
          const categoryNameElement = document.createElement("div");
          categoryNameElement.classList.add("category-name");
          categoryNameElement.textContent = category.name;
          categoryBlock.appendChild(categoryNameElement);
    
          // Create the category description element (excluding "Running now" category)
          if (category.name !== "Running now") {
            const categoryDescriptionElement = document.createElement("div");
            categoryDescriptionElement.classList.add("category-description");
            categoryDescriptionElement.textContent = category.description;
            categoryBlock.appendChild(categoryDescriptionElement);
          }

          // For Running now category we create empty div, vecuase description we use from
          // project.
          if (category.name == "Running now") {
            const categoryDescriptionElement = document.createElement("div");
            categoryDescriptionElement.classList.add("category-description");
            categoryBlock.appendChild(categoryDescriptionElement);
          }
    
          // Create the titles element
          const categoryTitlesElement = document.createElement("div");
          categoryTitlesElement.classList.add("category-titles");
          categoryTitlesElement.setAttribute("name", category.name); 
          categoryBlock.appendChild(categoryTitlesElement);
    
          // Append the category block to the section container
          sectionContainer.appendChild(categoryBlock);

        }
      });
    
      // Call the function to fetch and display the content for each category
      queryCategories.forEach(async (category: any) => {
        // Modify category name to proper format for get all queries
        // For ex.: Fox's X-Men Universe will be fox_xmen_universe
        const queryName = category.name
          .toLowerCase() // Convert to lowercase
          .replace(/-/g, '') // Remove hyphens
          .replace(/['’]s?/g, '') // Remove 's or s after an apostrophe
          .replace(/\s/g, '_'); // Replace spaces with underscores

        // Combine queryName
        const query = `query_${queryName}`;

        // Call the function to fetch and display content in category
        await fetchContentForCategory(eval(query), category.name);
      });
    }

    async function fetchContentForCategory(queryContent: any[], categoryName: string) {
      // Find the category-titles element based on the category name
      const categoryTitlesElements = document.querySelectorAll('.category-titles');
    
      // Loop through the category-titles elements
      categoryTitlesElements.forEach((categoryTitlesElement) => {
        if (categoryTitlesElement.getAttribute('name') === categoryName) {
          // Loop through each content item
          queryContent.forEach((content: any) => {

            if (categoryName === 'Characters') {
              // Create the content element
              const characterElement = document.createElement('div');
              characterElement.setAttribute("name", content.alias);
              characterElement.classList.add('character');
      
              // Create the poster element
              const imageElement = document.createElement('div');
              imageElement.classList.add('character-image');
              const characterImg = document.createElement('img');
              characterImg.src = "." + content.image;
              imageElement.appendChild(characterImg);
      
              // Create the title element
              const aliasElement = document.createElement('div');
              aliasElement.classList.add('character-alias');
              aliasElement.textContent = content.alias;
      
              // Create the saga element
              const nameElement = document.createElement('div');
              nameElement.classList.add('character-name');
              nameElement.textContent = content.name;
      
              // Create the phase element
              const universeElement = document.createElement('div');
              universeElement.classList.add('character-universe');
              universeElement.textContent = content.universe;
      
              // Append the content elements to the container
              characterElement.appendChild(imageElement);
              characterElement.appendChild(aliasElement);
              characterElement.appendChild(nameElement);
              characterElement.appendChild(universeElement);

              categoryTitlesElement.appendChild(characterElement);
              
            } else {

            // Create the content element
            const contentElement = document.createElement('div');
            contentElement.setAttribute("name", content.title);
            contentElement.classList.add('project');
    
            // Create the poster element
            const posterElement = document.createElement('div');
            posterElement.classList.add('project-poster');
            const posterImg = document.createElement('img');
            posterImg.src = "." + content.poster;
            posterElement.appendChild(posterImg);
    
            // Create the title element
            const titleElement = document.createElement('div');
            titleElement.classList.add('project-name');
            titleElement.textContent = content.title;
    
            // Create the saga element
            const sagaElement = document.createElement('div');
            sagaElement.classList.add('project-data');
            sagaElement.textContent = content.saga;
    
            // Create the phase element
            const phaseElement = document.createElement('div');
            phaseElement.classList.add('project-data');
            phaseElement.textContent = content.phase;
    
            // Append the content elements to the container
            contentElement.appendChild(posterElement);
            contentElement.appendChild(titleElement);
            contentElement.appendChild(sagaElement);
            contentElement.appendChild(phaseElement);

            // Append the project description to the Running now category
            if (categoryName === 'Running now') {
              // Search for .category-description element inside category
              const categoryDescriptionElement = categoryTitlesElement.previousElementSibling;
              // Not null check
              if (categoryDescriptionElement) {
                // Insert description
                categoryDescriptionElement.textContent = content.description;
              }
            }
    
            categoryTitlesElement.appendChild(contentElement);
          }

          });
        }
      });
    }


    // Define a type for the widget colors
    type WidgetColors = {
      [key in 'Next' | 'Random' | 'Trivia' | 'Quiz' | 'Rewatch' | 'Music']: string;
    };

    // Fetch widgets from the `web_widgets` table
    async function fetchWidgets() {
      const queryWidgets = await worker.db.query(`SELECT name, sorting FROM web_widgets`);

      // Map widget names to background color IDs
      const widgetColors: WidgetColors = {
        Next: 'widget-next',
        Random: 'widget-random',
        Trivia: 'widget-trivia',
        Quiz: 'widget-quiz',
        Rewatch: 'widget-rewatch',
        Music: 'widget-music'
      };

      // Loop through each widget and attach it to its corresponding section
      queryWidgets.forEach((widget: any) => {
        // Get the section to which the widget belongs
        const section = document.querySelector(`[name="${widget.sorting}"]`);
        if (section) {
          // Create the widget element
          const widgetElement = document.createElement('div');
          widgetElement.classList.add('widget');
          const backgroundColorId = widgetColors[widget.name as keyof WidgetColors]; // Type assertion here
          if (backgroundColorId) {
            widgetElement.id = backgroundColorId;
            widgetElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${backgroundColorId}`);
          }

          // Create the widget content element
          const widgetContentElement = document.createElement('div');
          widgetContentElement.classList.add('widget-content');
          widgetContentElement.textContent = widget.name;
          widgetElement.appendChild(widgetContentElement);

          // Append the widget to the section
          section.appendChild(widgetElement);
        }
      });
    }






    // Call the function to fetch and display the sections
    await fetchSections();
    
    // Call the function to fetch and display the categories
    await fetchCategories();

    await fetchWidgets();

    return Promise.resolve();
    
}

// load().then(() => {
//   // Get the preloader element
//   const preloader = document.querySelector('.preloader') as HTMLElement | null;
//   // Get the sectionsContainer element
//   const sectionsContainer = document.getElementById('sectionsContainer') as HTMLElement | null;

//   // Hide the preloader after 3 seconds
//   setTimeout(() => {
//     if (preloader) {
//       preloader.style.display = 'none';
//     }

//     // Show the sectionsContainer
//     if (sectionsContainer) {
//       sectionsContainer.style.visibility = 'visible';
//     }
//   }, 3000);
// });

load().then(() => {
  // Get the preloader element
  const preloader = document.querySelector('.preloader') as HTMLElement | null;

  // Hide the preloader after 3 seconds
    if (preloader) {
      preloader.style.display = 'none';
    }
});


