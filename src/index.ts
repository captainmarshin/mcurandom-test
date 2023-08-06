// MCU Random 2023

// ------------------------------------------------------------

import { WorkerHttpvfs, createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
    "sql.js-httpvfs/dist/sqlite.worker.js",
    import.meta.url
);

const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm",
    import.meta.url);

let worker: WorkerHttpvfs; 

// ------------------------------------------------------------

async function load() {

    worker = await createDbWorker(
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


    // Sections
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


    // Categories
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

    // Projects & Characters
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


    // Widgets
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

              // Widget Header
              const widgetHeaderElement = document.createElement('div');
              widgetHeaderElement.classList.add('widget-header');

              // Widget Name
              const widgetNameElement = document.createElement('div');
              widgetNameElement.classList.add('widget-name');
              widgetNameElement.textContent = widget.name;
              widgetHeaderElement.appendChild(widgetNameElement);

              // Widget Menu
              const widgetMenuElement = document.createElement('div');
              widgetMenuElement.classList.add('widget-menu');
              widgetMenuElement.setAttribute('id', `${widget.name}-btn`);
              widgetMenuElement.innerHTML = '<span class="material-symbols-outlined">help</span>';
              widgetHeaderElement.appendChild(widgetMenuElement);

              widgetElement.appendChild(widgetHeaderElement);

              // Widget Content
              const widgetContentElement = document.createElement('div');
              widgetContentElement.classList.add('widget-content');

              // Widget Content Header
              const widgetTextHeaderElement = document.createElement('div');
              widgetTextHeaderElement.classList.add('widget-text-h');
              widgetContentElement.appendChild(widgetTextHeaderElement);

              // Widget Content Content
              const widgetTextContentElement = document.createElement('div');
              widgetTextContentElement.classList.add('widget-text-c');
              widgetContentElement.appendChild(widgetTextContentElement);

              // Widget Content Description
              const widgetTextDescriptionElement = document.createElement('div');
              widgetTextDescriptionElement.classList.add('widget-text-d');
              widgetContentElement.appendChild(widgetTextDescriptionElement);

              widgetElement.appendChild(widgetContentElement);

              // --------


              if (widget.name === 'Next') {
                  const daysUntilNextRelease = await calculateDaysUntilNextRelease(query_upcoming);

                  widgetTextHeaderElement.textContent = `The Marvels`;
                  widgetTextContentElement.textContent = `${daysUntilNextRelease} days`;
                  widgetTextDescriptionElement.textContent = `until new release`;

                  const result = await generateICSFile();

                  if (result !== null) {
                      const { blobUrl, title } = result;
                      const widgetButtonElement = document.createElement('div');
                      widgetButtonElement.classList.add('widget-button');
                      widgetButtonElement.setAttribute('id', 'notify-btn');
                      widgetButtonElement.setAttribute('data-url', blobUrl); // ics blob url
                      widgetButtonElement.setAttribute('data-title', title); // project title
                      widgetButtonElement.textContent = 'Notify me';
                      widgetElement.appendChild(widgetButtonElement);
                  }
              }

              if (widget.name === 'Random') {
                  widgetTextContentElement.textContent = `Get random title from entire multiverse!`;
                  const widgetButtonElement = document.createElement('div');
                  widgetButtonElement.classList.add('widget-button');
                  widgetButtonElement.setAttribute('id', 'random-btn');
                  widgetButtonElement.textContent = 'Random!';
                  widgetElement.appendChild(widgetButtonElement);
              }

              if (widget.name === 'Trivia') {

                  widgetTextHeaderElement.textContent = `Did you know?`;
                  widgetTextContentElement.textContent = ``;
                  widgetTextDescriptionElement.textContent = ``;

                  const widgetButtonElement = document.createElement('div');
                  widgetButtonElement.classList.add('widget-button');
                  widgetButtonElement.setAttribute('id', 'trivia-btn');
                  widgetButtonElement.textContent = 'Another one!';
                  widgetElement.appendChild(widgetButtonElement);
              }

              if (widget.name === 'Quiz') {
                  widgetTextContentElement.textContent = `Quiz`;
              }

              if (widget.name === 'Rewatch') {
                  const totalRewatchTime = await calculateTotalRewatchTime(query_runtime);
                  let rewatchTime = '';

                  if (totalRewatchTime.days > 0) { rewatchTime += `${totalRewatchTime.days} days `; }
                  if (totalRewatchTime.hours > 0) { rewatchTime += `${totalRewatchTime.hours} hours `; }
                  rewatchTime += `${totalRewatchTime.minutes} minutes`;

                  widgetTextHeaderElement.textContent = `You need`;
                  widgetTextContentElement.textContent = `${rewatchTime}`;
                  widgetTextDescriptionElement.textContent = `to rewatch all content`;

                  const widgetButtonElement = document.createElement('div');
                  widgetButtonElement.classList.add('widget-button');
                  widgetButtonElement.setAttribute('id', 'rewatch-checklist-btn');
                  widgetButtonElement.textContent = 'Rewatch Checklist';
                  widgetElement.appendChild(widgetButtonElement);
              }

              if (widget.name === 'Music') {
                  const widgetButtonElement = document.createElement('div');
                  widgetButtonElement.classList.add('widget-button');
                  widgetButtonElement.setAttribute('id', 'music-btn');
                  widgetButtonElement.textContent = 'Listen';
                  widgetElement.appendChild(widgetButtonElement);
              }

              section.appendChild(widgetElement);
          }
      });
  }


    // Widget: Next onload info
    async function calculateDaysUntilNextRelease(query_upcoming: any) {
        if (query_upcoming && query_upcoming.length > 0) {
            const nextReleaseDate = new Date(query_upcoming[0].release_date);
            const today = new Date();
            const timeDiff = nextReleaseDate.getTime() - today.getTime();
            const daysUntilNextRelease = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysUntilNextRelease;
        }
        return 0;
    }

    // Widget: Next event generation
    async function generateICSFile() {
      const nextWidget = query_upcoming[0] as {
          title: string;
          description: string;
          release_date: string;
          imdb: string;
      };

      if (!nextWidget) {
          return null;
      }

      const { title, description, release_date, imdb } = nextWidget;

      const startDate = new Date(release_date);

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

      const blob = new Blob([icsContent], { type: 'text/calendar' });

      const blobUrl = URL.createObjectURL(blob);

      return { blobUrl, title };
  }


    // Widget: Rewatch onload info
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


    // Window: Get data
    async function getProjectData(target: HTMLElement) {

        const projectDiv = target.closest('.project') as HTMLElement;
        if (!projectDiv) {
            return null;
        }

        const name = projectDiv.getAttribute('name');
        const type = projectDiv.getAttribute('data-type');

        if (!name || !type) {
            return null;
        }

        const tableNames = ['titles_animation', 'titles_books', 'titles_comics', 'titles_documentary', 
        'titles_games', 'titles_movies', 'titles_movies_legacy', 'titles_musicals', 'titles_oneshots', 
        'titles_specials', 'titles_tv', 'titles_webseries'];
        const results = [];

        const episodesTables = ['episodes_animation', 'episodes_tv', 'episodes_webseries']
        const episodesResults = []

        for (const tableName of tableNames) {
            const query = `SELECT * FROM ${tableName} WHERE title = ? AND type = ?`;
            const queryResult = await worker.db.query(query, [name, type]);

            if (queryResult.length > 0) {
                results.push({ tableName, rows: queryResult });
            }
        }

        for (const episodesTable of episodesTables) {
          const query = `SELECT * FROM ${episodesTable} WHERE tv_title = ?`;
          const queryResult = await worker.db.query(query, [name]);

          if (queryResult.length > 0) {
            episodesResults.push({ episodesTable, rows: queryResult });
          }
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
        const posterUrl = projectDiv.querySelector('.project-poster img') ?.getAttribute('src');
        const description = projectDiv.querySelector('.project-description') ?.textContent;
        const universe_data = results
        const episodes_data = episodesResults

        return {
            name,
            type,
            posterUrl,
            description,
            screenshotUrl,
            universe_data,
            episodes_data
        };
    }

    // Window: Template
    function createProjectPageWindow(projectData: any): string {
        return `
      <div class="project-page-close">
        <div class="project-page-close-button"></div>
        <div class="project-page-close-button-x"><span class="material-symbols-outlined">close</span></div>
      </div>

      <div class="project-page-cover" style="background-image: url('${projectData.posterUrl}');"></div>

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
        ${projectData.universe_data.map((item: { tableName: any; rows: any[]; }) => `
        <div class="universe-data-item">
            <div class="table-name">${item.tableName}</div>
            <div class="table-rows">${item.rows.map(row => `
                <div class="table-row">${JSON.stringify(row)}</div>
            `).join('')}</div>
        </div>
    `).join('')}
        </div>
      </div>

      <div class="project-page-episodes">
          <div class="project-page-header">Episodes</div>
          <div class="project-page-section-content">
          ${projectData.episodes_data.map((item: { tableName: any; rows: any[]; }) => `
          <div class="universe-data-item">
              <div class="table-name">${item.tableName}</div>
              <div class="table-rows">${item.rows.map(row => `
                  <div class="table-row">${JSON.stringify(row)}</div>
              `).join('')}</div>
          </div>
      `).join('')}
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

    // Window: Open
    async function openProjectWindow(event: Event) {
        const projectBackground = document.querySelector('.project-page-background') as HTMLElement;
        const existingProjectPage = projectBackground.querySelector('.project-page') as HTMLElement;
        const projectData = await getProjectData(event.target as HTMLElement);

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

            projectPage.classList.add('project-page-animation');

            const closeButton = projectPage.querySelector('.project-page-close-button') as HTMLElement;
            if (closeButton) {
                closeButton.addEventListener('click', () => closeProjectWindow(projectBackground));
            }
        } else {
            const projectPageWindow = createProjectPageWindow(projectData);
            existingProjectPage.setAttribute('name', projectData.name);
            existingProjectPage.innerHTML = '';
            existingProjectPage.innerHTML = projectPageWindow;

            existingProjectPage.classList.add('project-page-animation'); // Add animation class
            projectBackground.appendChild(existingProjectPage);

            const closeButton = existingProjectPage.querySelector('.project-page-close-button') as HTMLElement;
            if (closeButton) {
                closeButton.addEventListener('click', () => closeProjectWindow(projectBackground));
            }
        }
        projectBackground.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Window: Close
    function closeProjectWindow(projectBackground: HTMLElement) {
        projectBackground.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Window: Close listener
    document.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (
            target.classList.contains('project-page-background') ||
            target.classList.contains('project-page-close-button') ||
            target.classList.contains('material-symbols-outlined')
        ) {
          const projectPage = document.querySelector('.project-page-animation') as HTMLElement;
          if (projectPage) {
              projectPage.classList.remove('project-page-animation');
          }

            closeProjectWindow(document.querySelector('.project-page-background') as HTMLElement);
        }
    });

    // Window: Open listener
    const projectDivs = document.querySelectorAll('.project');
    projectDivs.forEach((projectDiv) => {
        projectDiv.addEventListener('click', openProjectWindow);
    });



  // Widget: Next
    const notifyButton = document.getElementById('notify-btn');
    if (notifyButton) {
        notifyButton.addEventListener('click', () => {
            const icsBlobUrl = notifyButton.getAttribute('data-url');
            const projectTitle = notifyButton.getAttribute('data-title');
            if (icsBlobUrl) {
                const a = document.createElement('a');
                a.href = icsBlobUrl;
                a.download = projectTitle + '.ics';
                a.click();
            }
        });
    }


// Widget: Trivia
    const triviaButton = document.getElementById('trivia-btn');
if (triviaButton) {
    triviaButton.addEventListener('click', async () => {

        const query_trivia = await worker.db.query(`SELECT * FROM universe_trivia`);

        if (query_trivia.length === 0) {
            console.log("No trivia found");
            return;
        }

        const randomIndex = Math.floor(Math.random() * query_trivia.length);

        const randomTrivia = query_trivia[randomIndex] as {
            trivia: string;
            project: string;
        };

        const { trivia, project } = randomTrivia;

        const widgetTriviaElement = document.getElementById('widget-trivia');
        if (widgetTriviaElement) {

            const widgetTextContentElement = widgetTriviaElement.querySelector('.widget-text-c');
            if (widgetTextContentElement) {
                widgetTextContentElement.textContent = trivia;
            }

            const widgetTextDescriptionElement = widgetTriviaElement.querySelector('.widget-text-d');
            if (widgetTextDescriptionElement) {
                widgetTextDescriptionElement.textContent = project;
            }
        }
    });
}


// Widget: Random
const randomButton = document.getElementById('random-btn');
if (randomButton) {
    randomButton.addEventListener('click', async () => {

        const query_random = await worker.db.query(`SELECT * FROM titles_movies`);

        if (query_random.length === 0) {
            console.log("No titles found");
            return;
        }

        const randomIndex = Math.floor(Math.random() * query_random.length);

        const randomTitle = query_random[randomIndex] as {
            title: string;
            type: string;
        };

        const { title, type } = randomTitle;

        const widgetTriviaElement = document.getElementById('widget-random');
        if (widgetTriviaElement) {

            const widgetTextHeaderElement = widgetTriviaElement.querySelector('.widget-text-h');
            if (widgetTextHeaderElement) {
                widgetTextHeaderElement.textContent = type;
            }

            const widgetTextContentElement = widgetTriviaElement.querySelector('.widget-text-c');
            if (widgetTextContentElement) {
                widgetTextContentElement.textContent = title;
            }

            // Load ${project} in div inside widget div with  `widget-text-d` class
            // const widgetTextDescriptionElement = widgetTriviaElement.querySelector('.widget-text-d');
            // if (widgetTextDescriptionElement) {
            //     widgetTextDescriptionElement.textContent = project;
            // }
        }
    });
}

    
// Menu: Notifications
const notificationsButton = document.getElementById('notifications-btn');
const notificationsMenu = document.getElementById('menu-notifications');

if (notificationsButton && notificationsMenu) {
    let menuOpen = false;

    const openMenu = () => {
        notificationsMenu.style.display = 'block';
        menuOpen = true;
    };

    const closeMenu = () => {
        notificationsMenu.style.display = 'none';
        menuOpen = false;
    };

    notificationsButton.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Node;
        if (!notificationsMenu.contains(target) && !notificationsButton.contains(target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

// Button: Subscribe
const subscribeButton = document.getElementById('subscribe-btn');
    if (subscribeButton) {
      subscribeButton.addEventListener('click', () => {
            const telegramLink = 'https://t.me/mcurandom';
              window.open(telegramLink);
        });
    }


// Menu: Settings
const settingsButton = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('menu-settings');

if (settingsButton && settingsMenu) {
    let menuOpen = false;

    const openMenu = () => {
      settingsMenu.style.display = 'block';
        menuOpen = true;
    };

    const closeMenu = () => {
      settingsMenu.style.display = 'none';
        menuOpen = false;
    };

    settingsButton.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Node;
        if (!settingsMenu.contains(target) && !settingsButton.contains(target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}



// Menu: Settings in Next widget
const widgetSettingsNextButton = document.getElementById('Next-btn');
const widgetSettingsNextMenu = document.getElementById('next-menu-settings');

if (widgetSettingsNextButton && widgetSettingsNextMenu) {
    let menuOpen = false;

    const openMenu = () => {
      widgetSettingsNextMenu.style.display = 'block';
        menuOpen = true;
    };

    const closeMenu = () => {
      widgetSettingsNextMenu.style.display = 'none';
        menuOpen = false;
    };

    widgetSettingsNextButton.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Node;
        if (!widgetSettingsNextMenu.contains(target) && !widgetSettingsNextButton.contains(target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}




});