document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Logik
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Überprüfen, ob der Dark Mode bereits aktiviert ist (z.B. über localStorage)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.checked = false;
    }

    // Event-Listener für den Dark Mode Schalter
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Restlicher Code für den Kalender
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const locationSelector = document.getElementById('location');

    // Starte mit dem aktuellen Monat
    let currentDate = new Date();

    // Ereignisse für verschiedene Standorte
    const events = {
        "Saarbrücken": {
            "2025-07-25": "LEK 2"
        },
        "Kaiserslautern": {
            "2025-07-25": "LEK 2"
        }
    };
    

    // Funktion zum Anzeigen des Kalenders
    function renderCalendar() {
        // Leere den Kalender
        calendar.innerHTML = '';

        // Aktueller Monat und Jahr
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        // Monat und Jahr anzeigen
        const monthNames = [
            "Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"
        ];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        // Erster Tag des Monats
        const firstDayOfMonth = new Date(year, month, 1);
        // Letzter Tag des Monats
        const lastDayOfMonth = new Date(year, month + 1, 0);
        // Anzahl der Tage im Monat
        const daysInMonth = lastDayOfMonth.getDate();
        // Wochentag des ersten Tages (0 = Sonntag, 1 = Montag, usw.)
        let firstDayOfWeek = firstDayOfMonth.getDay();

        // Anpassung: Wenn Sonntag (0), setze auf 7, damit Montag der erste Tag ist
        if (firstDayOfWeek === 0) {
            firstDayOfWeek = 7; // Sonntag wird zu Tag 7
        }

        // Leere Tage am Anfang des Monats
        for (let i = 1; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            calendar.appendChild(emptyDay);
        }

        // Tage des Monats
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            const date = new Date(year, month, day);
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const event = events[locationSelector.value][dateString] || '';
            if (date.getDay() === 0 || date.getDay() === 6) {
                dayElement.classList.add('weekend');
            }

            // Hintergrundfarben basierend auf dem Ereignis
            if (event.includes("Begrüßung") || event.includes("Tablet Einrichtung") || event.includes("Konzern-Begrüßung")) {
                dayElement.style.backgroundColor = "darkorange";
            } else if (event.includes("Berufsschule")) {
                dayElement.style.backgroundColor = "#089ac9"; // Minimal dunkleres Blau für Berufsschule
            } else if (event.includes("Orga-Tag") || event.includes("Seminar V2") || event.includes("Seminar V3") || event.includes("InfraGo") || event.includes("KiN Seminar") || event.includes("Gesundheitstag")) {
                dayElement.style.backgroundColor = "white";
            } else if (event.includes("Modul")) {
                dayElement.style.backgroundColor = "orange";
            } else if (event.includes("QZ")) {
                dayElement.style.backgroundColor = "gray";
                if (date.getDay() === 0 || date.getDay() === 6) { // Samstag oder Sonntag
                    dayElement.style.backgroundColor = "darkgray";
                }
            } else if (event.startsWith("Bb") || event.includes("SMK") || event.includes("Simulator")) {
                dayElement.style.backgroundColor = "green"; // Simulator wird grün
            } else if (event.includes("Probezeitklausur") || event.includes("Probezeit-gespräch") || event.includes("LEK")) {
                dayElement.style.backgroundColor = "#de3c3c";
            } else if (event.includes("Tf-Mitfahrt")) {
                dayElement.style.backgroundColor = "yellow";
            } else if (event.includes("Urlaub")) {
                dayElement.style.backgroundColor = "#b4e1f0";
            } else if (event.includes("Heilig Abend") || event.includes("Weihnachten") || event.includes("Fronleichnam") || event.includes("Christi Himmelfahrt") || event.includes("Tag der Arbeit")) {
                dayElement.style.backgroundColor = "lightyellow"; // Feiertage
            } else if (event === "" && (date.getDay() === 0 || date.getDay() === 6)) { // Feiertage (Samstage/Sonntage ohne Ereignis)
                dayElement.style.backgroundColor = "lightyellow";
            }

            // Ereignisse an allen Tagen anzeigen
            dayElement.innerHTML = `<div>${day}</div><div class="event">${event}</div>`;

            dayElement.addEventListener('click', () => {
                alert(`Du hast den ${day}. ${monthNames[month]} ${year} ausgewählt!\nEreignis: ${event}`);
            });
            calendar.appendChild(dayElement);
        }
    }

    // Vorheriger Monat
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Nächster Monat
    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Standort ändern
    locationSelector.addEventListener('change', () => {
        renderCalendar();
    });

    // Initialen Kalender rendern
    renderCalendar();
});
