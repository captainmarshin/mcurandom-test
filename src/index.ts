// MCU Random 2023

// ------------------------------------------------------------

import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
    "sql.js-httpvfs/dist/sqlite.worker.js",
    import.meta.url
);

const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm",
    import.meta.url);

// ------------------------------------------------------------

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

    // Sagas section
    const query_the_infinity_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE saga="The Infinity Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE saga="The Infinity Saga" ORDER BY release_date ASC`);
    const query_the_multiverse_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE saga="The Multiverse Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE saga="The Multiverse Saga" ORDER BY release_date ASC`);

    // Series section
    const query_spiderverse = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies_legacy WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series LIKE "%Spider-Verse%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_webseries WHERE series LIKE "%Spider-Verse%" ORDER BY release_date ASC`);
    const query_the_defenders_saga = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series="The Defenders Saga" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series="The Defenders Saga" ORDER BY release_date ASC`);
    const query_marvel_heroes = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series="Marvel Heroes" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series="Marvel Heroes" ORDER BY release_date ASC`);
    const query_young_adult = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series="Young Adult" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series="Young Adult" ORDER BY release_date ASC`);
    const query_marvel_legacy_movies = await worker.db.query(`SELECT * FROM titles_movies_legacy`);
    const query_adventure_into_fear = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies_legacy WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series LIKE "%Adventure into Fear%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series LIKE "%Adventure into Fear%" ORDER BY release_date ASC`);

    // Current section
    const query_upcoming = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description, imdb FROM titles_movies WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, imdb FROM titles_tv WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, imdb FROM titles_animation WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, imdb FROM titles_oneshots WHERE release_date > DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, imdb FROM titles_specials WHERE release_date > DATE('now') ORDER BY release_date ASC`);
    const query_running_now = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM ( SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE release_date <= DATE('now')) ORDER BY release_date DESC LIMIT 1`);

    // const query_running_now = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description, description FROM ( SELECT title, poster, saga, phase, release_date, type, description, description FROM titles_movies WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, description FROM titles_tv WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, description FROM titles_oneshots WHERE studio = "Marvel Studios" AND release_date <= DATE('now') UNION SELECT title, poster, saga, phase, release_date, type, description, description FROM titles_specials WHERE studio = "Marvel Studios" AND release_date <= DATE('now')) ORDER BY release_date DESC LIMIT 1`);

    // Phases section
    const query_phase_one = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase One" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase One" ORDER BY release_date ASC`);
    const query_phase_two = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase Two" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase Two" ORDER BY release_date ASC`);
    const query_phase_three = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase Three" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase Three" ORDER BY release_date ASC`);
    const query_phase_four = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase Four" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase Four" ORDER BY release_date ASC`);
    const query_phase_five = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase Five" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase Five" ORDER BY release_date ASC`);
    const query_phase_six = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE phase="Phase Six" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE phase="Phase Six" ORDER BY release_date ASC`);

    // Universe section
    const query_marvel_cinematic_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots  WHERE studio = "Marvel Studios" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials  WHERE studio = "Marvel Studios" ORDER BY release_date ASC`);
    const query_fox_xmen_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies_legacy WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series LIKE "%Fox's X-Men Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series LIKE "%Fox's X-Men Universe%" ORDER BY release_date ASC`);
    const query_sony_spiderman_universe = await worker.db.query(`SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_movies_legacy WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_tv WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_animation WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_oneshots WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_specials WHERE series LIKE "%Sony's Spider-Man Universe%" UNION SELECT title, poster, saga, phase, release_date, type, description FROM titles_webseries WHERE series LIKE "%Sony's Spider-Man Universe%" ORDER BY release_date ASC`);
    const query_characters = await worker.db.query(`SELECT * FROM universe_characters`);

    // Episodes
    const query_tv_episodes = await worker.db.query(`SELECT * FROM episodes_tv`)
    const query_animation_episodes = await worker.db.query(`SELECT * FROM episodes_animation`)
    const query_webseries_episodes = await worker.db.query(`SELECT * FROM episodes_webseries`)

    const query_runtime = await worker.db.query(`SELECT runtime, type FROM ( SELECT runtime, type FROM titles_movies UNION SELECT runtime, type FROM titles_tv UNION SELECT runtime, type FROM titles_animation UNION SELECT runtime, type FROM titles_oneshots UNION SELECT runtime, type FROM titles_specials UNION SELECT runtime, type FROM titles_webseries UNION SELECT runtime, type FROM titles_movies_legacy) ORDER BY type`)

    // Fetch sections from db and create on page
    async function fetchSections() {
      const querySections = await worker.db.query(`SELECT name FROM web_sections ORDER BY sorting ASC`);
      const sectionsContainer = document.getElementById("sectionsContainer");
    
      if (sectionsContainer) {
        querySections.forEach((section: any) => {
          const sectionElement = document.createElement("div");
          sectionElement.classList.add("section");
          sectionElement.setAttribute("name", section.name);
    
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
      const queryCategories = await worker.db.query(`SELECT name, section, description FROM web_categories`);
      const sectionContainers = document.getElementsByClassName("section");
    
      queryCategories.forEach(async (category: any) => {
        const sectionContainer = Array.from(sectionContainers).find((container: any) => {
          const sectionName = container.getAttribute("name");
          return sectionName === category.section;
        });
    
        if (sectionContainer) {
          const categoryBlock = document.createElement("div");
          categoryBlock.classList.add("category-block");
    
          const categoryNameElement = document.createElement("div");
          categoryNameElement.classList.add("category-name");
          categoryNameElement.textContent = category.name;
          categoryBlock.appendChild(categoryNameElement);
    
          if (category.name !== "Running now") {
            const categoryDescriptionElement = document.createElement("div");
            categoryDescriptionElement.classList.add("category-description");
            categoryDescriptionElement.textContent = category.description;
            categoryBlock.appendChild(categoryDescriptionElement);
          }

          if (category.name == "Running now") {
            const categoryDescriptionElement = document.createElement("div");
            categoryDescriptionElement.classList.add("category-description");
            categoryBlock.appendChild(categoryDescriptionElement);
          }
    
          const categoryTitlesElement = document.createElement("div");
          categoryTitlesElement.classList.add("category-titles");
          categoryTitlesElement.setAttribute("name", category.name); 
          categoryBlock.appendChild(categoryTitlesElement);

          sectionContainer.appendChild(categoryBlock);

        }
      });
        
      queryCategories.forEach(async (category: any) => {
        const queryName = category.name
          .toLowerCase()
          .replace(/-/g, '')
          .replace(/['’]s?/g, '')
          .replace(/\s/g, '_');
        const query = `query_${queryName}`;

        await fetchContentForCategory(eval(query), category.name);
      });
    }


    async function fetchContentForCategory(queryContent: any[], categoryName: string) {
      const categoryTitlesElements = document.querySelectorAll('.category-titles');
    
      categoryTitlesElements.forEach((categoryTitlesElement) => {
        if (categoryTitlesElement.getAttribute('name') === categoryName) {
          queryContent.forEach((content: any) => {

            if (categoryName === 'Characters') {
              const characterElement = document.createElement('div');
              characterElement.setAttribute("name", content.alias);
              characterElement.classList.add('character');
      
              const imageElement = document.createElement('div');
              imageElement.classList.add('character-image');
              const characterImg = document.createElement('img');
              characterImg.src = "." + content.image;
              imageElement.appendChild(characterImg);
      
              const aliasElement = document.createElement('div');
              aliasElement.classList.add('character-alias');
              aliasElement.textContent = content.alias;
      
              const nameElement = document.createElement('div');
              nameElement.classList.add('character-name');
              nameElement.textContent = content.name;
      
              const universeElement = document.createElement('div');
              universeElement.classList.add('character-universe');
              universeElement.textContent = content.universe;
      
              characterElement.appendChild(imageElement);
              characterElement.appendChild(aliasElement);
              characterElement.appendChild(nameElement);
              characterElement.appendChild(universeElement);

              categoryTitlesElement.appendChild(characterElement);
              
            } else {

              const contentElement = document.createElement('div');
              contentElement.setAttribute("name", content.title);
              contentElement.setAttribute("data-type", content.type);
              contentElement.classList.add('project');
      
              const posterElement = document.createElement('div');
              posterElement.classList.add('project-poster');
              const posterImg = document.createElement('img');
              posterImg.src = "." + content.poster;
              posterElement.appendChild(posterImg);
      
              const titleElement = document.createElement('div');
              titleElement.classList.add('project-name');
              titleElement.textContent = content.title;

              const typeElement = document.createElement('div');
              typeElement.classList.add('project-type');
              typeElement.textContent = content.type;
      
              const sagaElement = document.createElement('div');
              sagaElement.classList.add('project-saga');
              sagaElement.textContent = content.saga;
      
              const phaseElement = document.createElement('div');
              phaseElement.classList.add('project-phase');
              phaseElement.textContent = content.phase;

              const releasedateElement = document.createElement('div');
              releasedateElement.classList.add('project-date');
              releasedateElement.textContent = content.release_date;

              const descriptionElement = document.createElement('div');
              descriptionElement.classList.add('project-description');
              descriptionElement.textContent = content.description;
      
              contentElement.appendChild(posterElement);
              contentElement.appendChild(titleElement);
              contentElement.appendChild(typeElement);
              contentElement.appendChild(sagaElement);
              contentElement.appendChild(phaseElement);
              contentElement.appendChild(releasedateElement);
              contentElement.appendChild(descriptionElement);

              if (categoryName === 'Running now') {
                const categoryDescriptionElement = categoryTitlesElement.previousElementSibling;
                if (categoryDescriptionElement) {
                  categoryDescriptionElement.textContent = content.description;
                }
              }
      
              categoryTitlesElement.appendChild(contentElement);
            }

            });
          }
      });
    }



    // Widget functions

    // Assuming the structure of query_upcoming is like this:
    // const query_upcoming: { release_date: string }[] = await worker.db.query(...);

    async function calculateDaysUntilNextRelease(query_upcoming: any) { // Add the parameter
      if (query_upcoming && query_upcoming.length > 0) {
        const nextReleaseDate = new Date(query_upcoming[0].release_date);
        const today = new Date();
        const timeDiff = nextReleaseDate.getTime() - today.getTime();
        const daysUntilNextRelease = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return daysUntilNextRelease;
      }
      
      return 0;
    }
    

    async function calculateTotalRewatchTime(query_runtime: any) {
      if (query_runtime && query_runtime.length > 0) {
          const totalRuntimeMinutes = query_runtime.reduce((total: any, entry: { runtime: any; }) => total + entry.runtime, 0);
          const totalDays = Math.floor(totalRuntimeMinutes / (60 * 24));
          const remainingMinutes = totalRuntimeMinutes % (60 * 24);
          const totalHours = Math.floor(remainingMinutes / 60);
          const totalMinutes = remainingMinutes % 60;
  
          return { days: totalDays, hours: totalHours, minutes: totalMinutes };
      }
  
      return { days: 0, hours: 0, minutes: 0 };
    }


    // ICS blob generation
    async function generateICSFile() {
      const nextWidget = query_upcoming[0] as {
        title: string;
        description: string;
        release_date: string; // Adjust the type if needed
        imdb: string; // Adjust the type if needed
    };
  
      if (!nextWidget) {
          return null;
      }
  
      const { title, description, release_date, imdb } = nextWidget;
  
      const startDate = new Date(release_date);
      // const endDate = new Date(release_date);
      // endDate.setDate(endDate.getDate() + 1); // Add one day to create an all-day event
  
      // Generate the .ics file content
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART;VALUE=DATE:${startDate.toISOString().slice(0, 10).replace(/[-:]/g, '')}
DESCRIPTION:${description}
LOCATION:https://www.imdb.com/showtimes/
STATUS:CONFIRMED
SEQUENCE:0
URL:${imdb}
END:VEVENT
END:VCALENDAR`;
  
      // Create a Blob from the icsContent
      const blob = new Blob([icsContent], { type: 'text/calendar' });
  
      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);
  
      return { blobUrl, title };
  }
  




    type WidgetColors = {
      [key in 'Next' | 'Random' | 'Trivia' | 'Quiz' | 'Rewatch' | 'Music']: string;
    };

    async function fetchWidgets() {
      const queryWidgets = await worker.db.query(`SELECT name, sorting FROM web_widgets`);
    
      const widgetColors: WidgetColors = {
        Next: 'widget-next',
        Random: 'widget-random',
        Trivia: 'widget-trivia',
        Quiz: 'widget-quiz',
        Rewatch: 'widget-rewatch',
        Music: 'widget-music'
      };
    
      queryWidgets.forEach(async (widget: any) => {
        const section = document.querySelector(`[name="${widget.sorting}"]`);
        
        if (section) {
          const widgetElement = document.createElement('div');
          widgetElement.classList.add('widget');
          const backgroundColorId = widgetColors[widget.name as keyof WidgetColors]; // Type assertion here
          
          if (backgroundColorId) {
            widgetElement.id = backgroundColorId;
            widgetElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${backgroundColorId}`);
          }
    
          const widgetContentElement = document.createElement('div');
          widgetContentElement.classList.add('widget-content');
          
          if (widget.name === 'Next') {
            const daysUntilNextRelease = await calculateDaysUntilNextRelease(query_upcoming); // Pass query_upcoming here
            widgetContentElement.textContent = `${daysUntilNextRelease} days until next release`;
          }
           else {
            widgetContentElement.textContent = widget.name;
          }

          if (widget.name === 'Random') {
            widgetContentElement.textContent = `Get random title from entire multiverse!`;
          }

          if (widget.name === 'Trivia') {
            const randomTrivia = `<div class="widget-content-text">Tony Stark is Iron Man</div>`
            widgetContentElement.innerHTML = `Did you know?${randomTrivia}`;
          }

          if (widget.name === 'Quiz') {
            widgetContentElement.textContent = `Quiz`;
          }

          if (widget.name === 'Rewatch') {
            const totalRewatchTime = await calculateTotalRewatchTime(query_runtime);
            let rewatchTime = '';
    
            if (totalRewatchTime.days > 0) {
                rewatchTime += `${totalRewatchTime.days} days `;
            }
    
            if (totalRewatchTime.hours > 0) {
                rewatchTime += `${totalRewatchTime.hours} hours `;
            }
    
            rewatchTime += `${totalRewatchTime.minutes} minutes`;
    
            widgetContentElement.innerHTML = `
                ${rewatchTime}
                <div class="widget-content-text">need to rewatch all content</div>`;
          }
          
          widgetElement.appendChild(widgetContentElement);
    
          if (widget.name === 'Next') {
            const result = await generateICSFile();
  
            if (result !== null) {
              const { blobUrl, title } = result; {
                const widgetButtonElement = document.createElement('div');
                widgetButtonElement.classList.add('widget-button');
                widgetButtonElement.setAttribute('id', 'notify-btn');
                widgetButtonElement.setAttribute('data-url', blobUrl); // ics blob url
                widgetButtonElement.setAttribute('data-title', title); // project title
                widgetButtonElement.textContent = 'Notify me';
                widgetElement.appendChild(widgetButtonElement);
              }
            }
          }

          if (widget.name === 'Random') {
            const widgetButtonElement = document.createElement('div');
            widgetButtonElement.classList.add('widget-button');
            widgetButtonElement.setAttribute('id', 'random-btn');
            widgetButtonElement.textContent = 'Random!';
            widgetElement.appendChild(widgetButtonElement);
          }

          if (widget.name === 'Trivia') {
            const widgetButtonElement = document.createElement('div');
            widgetButtonElement.classList.add('widget-button');
            widgetButtonElement.setAttribute('id', 'trivia-btn');
            widgetButtonElement.textContent = 'Another one!';
            widgetElement.appendChild(widgetButtonElement);
          }

          if (widget.name === 'Rewatch') {
            const widgetButtonElement = document.createElement('div');
            widgetButtonElement.classList.add('widget-button');
            widgetButtonElement.setAttribute('id', 'rewatch-checklist-btn');
            widgetButtonElement.textContent = 'Rewatch Checklist';
            widgetElement.appendChild(widgetButtonElement);
          }
    
          section.appendChild(widgetElement);
        }
      });
    }
    
    

    await fetchSections();
    await fetchCategories();
    await fetchWidgets();

    return Promise.resolve();
    
}

load().then(() => {

  // Preloader
  const preloader = document.querySelector('.preloader') as HTMLElement | null;
  if (preloader) {
    preloader.style.display = 'none';
  }

  // Window function

  // Get data for window
  function getProjectData(target: HTMLElement) {
    const projectDiv = target.closest('.project') as HTMLElement;
    if (!projectDiv) {
      return null;
    }

    const name = projectDiv.getAttribute('name');
    const type = projectDiv.getAttribute('data-type');

    if (!name || !type) {
      return null;
    }

    const screenshotName = name
      .toLowerCase()
      .replace(/:/g, '')
      .replace(/\?/g, '')
      .replace(/\./g, '')
      .replace(/-/g, '')
      .replace(/['’]s?/g, '')
      .replace(/\s/g, '_');

    const screenshotUrl = `./img/screenshots/${screenshotName}.jpg`
    const posterUrl = projectDiv.querySelector('.project-poster img')?.getAttribute('src');
    const description = projectDiv.querySelector('.project-description')?.textContent;
    const universe_data = `Universe data`

    return {
      name,
      type,
      posterUrl,
      description,
      screenshotUrl,
      universe_data
    };
  }

  // Window template
  function createProjectPageWindow(projectData: any): string {
    return `
      <div class="project-page-close">
        <div class="project-page-close-button"></div>
        <div class="project-page-close-button-x"><span class="material-symbols-outlined">close</span></div>
      </div>

      <div class="project-page-header-little">
        <div class="project-page-header-little-title">${projectData.name}</div>
        <div class="project-page-header-little-type">${projectData.type}</div>
      </div>

      <div class="project-page-cover" style="background-image: url('${projectData.screenshotUrl}');"></div>

      <div class="project-page-content">
        <div class="project-page-card-block">
          <div class="project-page-card">
            <div class="project-poster"><img src="${projectData.posterUrl}"></div>
            <div class="project-page-name">${projectData.name}</div>
            <div class="project-page-type">${projectData.type}</div>
          </div>
        </div>
      </div>

      <div class="project-page-description">
        ${projectData.description}
      </div>

      <div class="project-page-universe">
        <div class="project-page-section-content">
            ${projectData.universe_data}
        </div>
      </div>

      <div class="project-page-episodes">
          <div class="project-page-header">Episodes</div>
          <div class="project-page-section-content">
              
          </div>
      </div>

      <div class="project-page-characters">
          <div class="project-page-header">Characters</div>
          <div class="project-page-section-content">
              
          </div>
      </div>

      <div class="project-page-details">
          <div class="project-page-header">Details</div>
          <div class="project-page-section-content">
              
          </div>
      </div>

      <div class="project-page-links">
          <div class="project-page-link">Open on <span class="link-imdb"> IMDb</span> <span class="material-symbols-outlined">chevron_right</span></div>
      </div>

    </div>
    `;
  }

  // Open window function
  function openProjectWindow(event: Event) {
    const projectBackground = document.querySelector('.project-page-background') as HTMLElement;
    const existingProjectPage = projectBackground.querySelector('.project-page') as HTMLElement;
    const projectData = getProjectData(event.target as HTMLElement);

    if (!projectData) {
      return;
    }

    if (!existingProjectPage) {
      const projectPage = document.createElement('div');
      projectPage.classList.add('project-page');
      projectPage.setAttribute('name', projectData.name);
      const projectPageWindow = createProjectPageWindow(projectData);
      projectPage.innerHTML = projectPageWindow;
      projectBackground.appendChild(projectPage);
      const closeButton = projectPage.querySelector('.project-page-close-button') as HTMLElement;
      if (closeButton) {
        closeButton.addEventListener('click', () => closeProjectWindow(projectBackground));
      }
    } else {
      const projectPageWindow = createProjectPageWindow(projectData);
      existingProjectPage.setAttribute('name', projectData.name);
      existingProjectPage.innerHTML = '';
      existingProjectPage.innerHTML = projectPageWindow;
      const closeButton = existingProjectPage.querySelector('.project-page-close-button') as HTMLElement;
      if (closeButton) {
        closeButton.addEventListener('click', () => closeProjectWindow(projectBackground));
      }
    }
    projectBackground.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Close window function
  function closeProjectWindow(projectBackground: HTMLElement) {
    projectBackground.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Event listener for close button
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('project-page-background') ||
      target.classList.contains('project-page-close-button') ||
      target.classList.contains('material-symbols-outlined')
    ) {
      closeProjectWindow(document.querySelector('.project-page-background') as HTMLElement);
    }
  });
  
  // Listener for open window
  const projectDivs = document.querySelectorAll('.project');
  projectDivs.forEach((projectDiv) => {
    projectDiv.addEventListener('click', openProjectWindow);
  });


  // Widgets

  // widgetNext
  const notifyButton = document.getElementById('notify-btn');
if (notifyButton) {
    notifyButton.addEventListener('click', () => {
        const icsBlobUrl = notifyButton.getAttribute('data-url');
        const projectTitle = notifyButton.getAttribute('data-title');
        if (icsBlobUrl) {
            // Open the .ics file
            // window.location.href = icsBlobUrl;
            const a = document.createElement('a');
        
            // Set the href and download attributes
            a.href = icsBlobUrl;
            a.download = projectTitle + '.ics'; // Set the desired filename here
            
            // Programmatically click the <a> element
            a.click();
        }
    });
}

  function widgetRandom(){
    
  }

  function widgetTrivia(){
    
  }

  function widgetQuiz(){
    
  }

  function widgetRewatch(){
    
  }

  function widgetMusic(){

  }


});


