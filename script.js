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
            "2024-08-22": "Begrüßung",
            "2024-08-23": "Tablet Einrichtung",
            "2024-08-26": "Berufsschule",
            "2024-08-27": "Berufsschule",
            "2024-08-28": "Berufsschule",
            "2024-08-29": "Berufsschule",
            "2024-08-30": "Berufsschule",
            "2024-09-02": "Konzern-Begrüßung",
            "2024-09-03": "Orga-Tag",
            "2024-09-04": "Modul A1 Modul A2",
            "2024-09-05": "Modul G1",
            "2024-09-06": "Modul G2",
            "2024-09-09": "Modul G2",
            "2024-09-10": "Modul G3",
            "2024-09-11": "Modul G3",
            "2024-09-12": "Modul G4",
            "2024-09-13": "Lerngang G Module",
            "2024-09-16": "Berufsschule",
            "2024-09-17": "Berufsschule",
            "2024-09-18": "Berufsschule",
            "2024-09-19": "QZ",
            "2024-09-20": "Berufsschule",
            "2024-09-23": "Bb1400",
            "2024-09-24": "Bb1400",
            "2024-09-25": "Bb1400",
            "2024-09-26": "Bb1400",
            "2024-09-27": "QZ",
            "2024-09-30": "Modul G4 Lernfahrt 1",
            "2024-10-01": "Modul G4 Lernfahrt 1",
            "2024-10-02": "Modul G4 Lernfahrt 1",
            "2024-10-03": "Urlaub",
            "2024-10-04": "Urlaub",
            "2024-10-07": "Berufsschule",
            "2024-10-08": "Berufsschule",
            "2024-10-09": "Berufsschule",
            "2024-10-10": "Berufsschule",
            "2024-10-11": "Berufsschule",
            "2024-10-14": "Modul B1",
            "2024-10-15": "Wdh G Module",
            "2024-10-16": "Wdh G Module",
            "2024-10-17": "Wdh G Module",
            "2024-10-18": "Wdh G Module",
            "2024-10-21": "Bb1520",
            "2024-10-22": "Bb1520",
            "2024-10-23": "Bb1520",
            "2024-10-24": "Bb1520",
            "2024-10-25": "Bb1520",
            "2024-10-28": "Seminar V2",
            "2024-10-29": "QZ",
            "2024-10-30": "QZ",
            "2024-11-04": "SMK",
            "2024-11-05": "SMK",
            "2024-11-06": "SMK",
            "2024-11-07": "SMK",
            "2024-11-08": "SMK",
            "2024-11-11": "Berufsschule",
            "2024-11-12": "Berufsschule",
            "2024-11-13": "Berufsschule",
            "2024-11-14": "Berufsschule",
            "2024-11-15": "Berufsschule",
            "2024-11-18": "Seminar V3",
            "2024-11-19": "Seminar V3",
            "2024-11-20": "Probezeit-gespräche",
            "2024-11-21": "Tf-Mitfahrt",
            "2024-11-22": "Tf-Mitfahrt",
            "2024-11-25": "Bb1520",
            "2024-11-26": "Bb1520",
            "2024-11-27": "Bb1520",
            "2024-11-28": "Bb1520",
            "2024-11-29": "Bb1520",
            "2024-12-02": "Berufsschule",
            "2024-12-03": "Berufsschule",
            "2024-12-04": "Berufsschule",
            "2024-12-05": "Berufsschule",
            "2024-12-06": "Berufsschule",
            "2024-12-09": "Bb1521",
            "2024-12-10": "Simulator",
            "2024-12-11": "Tf-Mitfahrt",
            "2024-12-12": "Tf-Mitfahrt",
            "2024-12-13": "QZ",
            "2024-12-16": "Bb1200",
            "2024-12-17": "Bb1200",
            "2024-12-18": "Urlaub",
            "2024-12-19": "Urlaub",
            "2024-12-20": "Urlaub",
            "2024-12-23": "Urlaub",
            "2024-12-24": "Heilig Abend",
            "2024-12-25": "Weihnachten",
            "2024-12-26": "Weihnachten",
            "2024-12-27": "Urlaub",
            "2024-12-30": "Urlaub",
            "2024-12-31": "Urlaub",
            "2025-01-06": "Berufsschule",
            "2025-01-07": "Berufsschule",
            "2025-01-08": "Berufsschule",
            "2025-01-09": "Berufsschule",
            "2025-01-10": "Berufsschule",
            "2025-01-13": "KiN Seminar",
            "2025-01-14": "KiN Seminar",
            "2025-01-15": "KiN Seminar",
            "2025-01-16": "KiN Seminar",
            "2025-01-17": "KiN Seminar",
            "2025-01-20": "KiN / Tf-Mitfahrt",
            "2025-01-21": "KiN / Tf-Mitfahrt",
            "2025-01-22": "KiN / Tf-Mitfahrt",
            "2025-01-23": "KiN / Tf-Mitfahrt",
            "2025-01-24": "KiN / Tf-Mitfahrt",
            "2025-01-27": "Berufsschule",
            "2025-01-28": "Berufsschule",
            "2025-01-29": "Berufsschule",
            "2025-01-30": "Berufsschule",
            "2025-01-31": "Berufsschule",
            "2025-02-03": "QZ",
            "2025-02-04": "Bb1530",
            "2025-02-05": "Bb1530",
            "2025-02-06": "Bb1530",
            "2025-02-07": "Bb1530",
            "2025-02-10": "KiN / Tf-Mitfahrt",
            "2025-02-11": "KiN / Tf-Mitfahrt",
            "2025-02-12": "KiN / Tf-Mitfahrt",
            "2025-02-13": "KiN / Tf-Mitfahrt",
            "2025-02-14": "KiN / Tf-Mitfahrt",
            "2025-02-17": "Berufsschule",
            "2025-02-18": "Berufsschule",
            "2025-02-19": "Berufsschule",
            "2025-02-20": "Berufsschule",
            "2025-02-21": "Berufsschule",
            "2025-02-24": "Modul A3 / B2.1",
            "2025-02-25": "Modul B2.1",
            "2025-02-26": "Modul B2.1",
            "2025-02-27": "Modul B2.1",
            "2025-02-28": "Modul B2.2 / B2.3",
            "2025-03-03": "Tf-Mitfahrt / Modul EB 5",
            "2025-03-04": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-05": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-06": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-07": "Tf-Mitfahrt / QZ",
            "2025-03-10": "Tf-Mitfahrt / Modul EB 5",
            "2025-03-11": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-12": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-13": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-14": "Tf-Mitfahrt / QZ",
            "2025-03-17": "Berufsschule",
            "2025-03-18": "Berufsschule",
            "2025-03-19": "Berufsschule",
            "2025-03-20": "Berufsschule",
            "2025-03-21": "Berufsschule",
            "2025-03-24": "Modul B3.1.1",
            "2025-03-25": "Bb1570",
            "2025-03-26": "Modul B3.1.2",
            "2025-03-27": "Modul B3.1.2",
            "2025-03-28": "Modul B3.1.2",
            "2025-03-31": "Modul EX 19",
            "2025-04-01": "Bb1560",
            "2025-04-02": "Bb1560",
            "2025-04-03": "Bb1560",
            "2025-04-04": "Bb1560",
            "2025-04-07": "Berufsschule",
            "2025-04-08": "Berufsschule",
            "2025-04-09": "Berufsschule",
            "2025-04-10": "Berufsschule",
            "2025-04-11": "Berufsschule",
            "2025-04-14": "Urlaub",
            "2025-04-15": "Urlaub",
            "2025-04-16": "Urlaub",
            "2025-04-17": "Urlaub",
            "2025-04-21": "Tf-Mitfahrt",
            "2025-04-22": "Tf-Mitfahrt",
            "2025-04-23": "Tf-Mitfahrt",
            "2025-04-24": "Tf-Mitfahrt",
            "2025-04-28": "Wdh. B Module",
            "2025-04-29": "Wdh B. Module",
            "2025-04-30": "LEK I",
            "2025-05-01": "Tag der Arbeit",
            "2025-05-02": "Urlaub",
            "2025-05-05": "Modul BP",
            "2025-05-06": "Modul BP",
            "2025-05-07": "Modul BP",
            "2025-05-08": "Modul BP",
            "2025-05-09": "Modul BP",
            "2025-05-12": "Berufsschule",
            "2025-05-13": "Berufsschule",
            "2025-05-14": "Berufsschule",
            "2025-05-15": "Berufsschule",
            "2025-05-16": "Berufsschule",
            "2025-05-19": "InfraGo",
            "2025-05-20": "InfraGo",
            "2025-05-21": "InfraGo",
            "2025-05-22": "InfraGo",
            "2025-05-23": "InfraGo",
            "2025-05-26": "FG 1",
            "2025-05-27": "FG 1",
            "2025-05-28": "Wdh. B Module",
            "2025-05-29": "Christi Himmelfahrt",
            "2025-05-30": "Urlaub",
            "2025-06-02": "Berufsschule",
            "2025-06-03": "Berufsschule",
            "2025-06-04": "Berufsschule",
            "2025-06-05": "Berufsschule",
            "2025-06-06": "Berufsschule",
            "2025-06-09": "Modul B4.1",
            "2025-06-10": "Modul B4.2",
            "2025-06-11": "Modul B4.2",
            "2025-06-12": "Bb1559",
            "2025-06-16": "Modul B4.3.1",
            "2025-06-17": "Modul B4.3.1",
            "2025-06-18": "Modul B4.3.1",
            "2025-06-19": "Fronleichnam",
            "2025-06-20": "Urlaub",
            "2025-06-23": "Berufsschule",
            "2025-06-24": "Berufsschule",
            "2025-06-25": "Berufsschule",
            "2025-06-26": "Berufsschule",
            "2025-06-27": "Berufsschule",
            "2025-06-30": "Modul B4.3.1",
            "2025-07-01": "Bb1570",
            "2025-07-02": "Bb1570",
            "2025-07-03": "Modul B4.4",
            "2025-07-04": "Modul B4.4",
            "2025-07-07": "Lernfahrt 4 / QZ",
            "2025-07-08": "Lernfahrt 4 / QZ",
            "2025-07-09": "Modul Z1",
            "2025-07-10": "Modul Z1",
            "2025-07-11": "Modul Z1 ÜS",
            "2025-07-14": "Modul Z1 ÜS",
            "2025-07-15": "Modul K1",
            "2025-07-16": "Modul K2 / EK2",
            "2025-07-17": "Modul K3",
            "2025-07-18": "EK / K Praxis",
            "2025-07-21": "Wdh B Module",
            "2025-07-22": "Lernfahrt 5 / QZ",
            "2025-07-23": "Lernfahrt 5 / QZ",
            "2025-07-24": "Wdh. B Module",
            "2025-07-25": "LEK 2"
        },
        "Kaiserslautern": {
            "2024-08-22": "Begrüßung",
            "2024-08-23": "Tablet Einrichtung",
            "2024-08-26": "Berufsschule",
            "2024-08-27": "Berufsschule",
            "2024-08-28": "Berufsschule",
            "2024-08-29": "Berufsschule",
            "2024-08-30": "Berufsschule",
            "2024-09-02": "Konzern-Begrüßung",
            "2024-09-03": "Orga-Tag",
            "2024-09-04": "Modul A1 Modul A2",
            "2024-09-05": "Modul G1",
            "2024-09-06": "Modul G2",
            "2024-09-09": "Modul G2",
            "2024-09-10": "Modul G3",
            "2024-09-11": "Modul G3",
            "2024-09-12": "Modul G4",
            "2024-09-13": "Lerngang G Module",
            "2024-09-16": "Berufsschule",
            "2024-09-17": "Berufsschule",
            "2024-09-18": "Berufsschule",
            "2024-09-19": "QZ",
            "2024-09-20": "Berufsschule",
            "2024-09-23": "Bb1400",
            "2024-09-24": "Bb1400",
            "2024-09-25": "Bb1400",
            "2024-09-26": "Bb1400",
            "2024-09-27": "QZ",
            "2024-09-30": "Modul G4 Lernfahrt 1",
            "2024-10-01": "Modul G4 Lernfahrt 1",
            "2024-10-02": "Modul G4 Lernfahrt 1",
            "2024-10-03": "Urlaub",
            "2024-10-04": "Urlaub",
            "2024-10-07": "Berufsschule",
            "2024-10-08": "Berufsschule",
            "2024-10-09": "Berufsschule",
            "2024-10-10": "Berufsschule",
            "2024-10-11": "Berufsschule",
            "2024-10-14": "Modul B1",
            "2024-10-15": "Wdh G Module",
            "2024-10-16": "Wdh G Module",
            "2024-10-17": "Wdh G Module",
            "2024-10-18": "Wdh G Module",
            "2024-10-21": "Bb1520",
            "2024-10-22": "Bb1520",
            "2024-10-23": "Bb1520",
            "2024-10-24": "Bb1520",
            "2024-10-25": "Bb1520",
            "2024-10-28": "Seminar V2",
            "2024-10-29": "QZ",
            "2024-10-30": "QZ",
            "2024-11-04": "SMK",
            "2024-11-05": "SMK",
            "2024-11-06": "SMK",
            "2024-11-07": "SMK",
            "2024-11-08": "SMK",
            "2024-11-11": "Berufsschule",
            "2024-11-12": "Berufsschule",
            "2024-11-13": "Berufsschule",
            "2024-11-14": "Berufsschule",
            "2024-11-15": "Berufsschule",
            "2024-11-18": "Seminar V3",
            "2024-11-19": "Seminar V3",
            "2024-11-20": "Probezeit-gespräche",
            "2024-11-21": "Tf-Mitfahrt",
            "2024-11-22": "Tf-Mitfahrt",
            "2024-11-25": "Bb1520",
            "2024-11-26": "Bb1520",
            "2024-11-27": "Bb1520",
            "2024-11-28": "Bb1520",
            "2024-11-29": "Bb1520",
            "2024-12-02": "Berufsschule",
            "2024-12-03": "Berufsschule",
            "2024-12-04": "Berufsschule",
            "2024-12-05": "Berufsschule",
            "2024-12-06": "Berufsschule",
            "2024-12-09": "Bb1521",
            "2024-12-10": "Simulator",
            "2024-12-11": "Tf-Mitfahrt",
            "2024-12-12": "Tf-Mitfahrt",
            "2024-12-13": "QZ",
            "2024-12-16": "Bb1200",
            "2024-12-17": "Bb1200",
            "2024-12-18": "Urlaub",
            "2024-12-19": "Urlaub",
            "2024-12-20": "Urlaub",
            "2024-12-23": "Urlaub",
            "2024-12-24": "Heilig Abend",
            "2024-12-25": "Weihnachten",
            "2024-12-26": "Weihnachten",
            "2024-12-27": "Urlaub",
            "2024-12-30": "Urlaub",
            "2024-12-31": "Urlaub",
            "2025-01-06": "Berufsschule",
            "2025-01-07": "Berufsschule",
            "2025-01-08": "Berufsschule",
            "2025-01-09": "Berufsschule",
            "2025-01-10": "Berufsschule",
            "2025-01-13": "KiN Seminar",
            "2025-01-14": "KiN Seminar",
            "2025-01-15": "KiN Seminar",
            "2025-01-16": "KiN Seminar",
            "2025-01-17": "KiN Seminar",
            "2025-01-20": "KiN / Tf-Mitfahrt",
            "2025-01-21": "KiN / Tf-Mitfahrt",
            "2025-01-22": "KiN / Tf-Mitfahrt",
            "2025-01-23": "KiN / Tf-Mitfahrt",
            "2025-01-24": "KiN / Tf-Mitfahrt",
            "2025-01-27": "Berufsschule",
            "2025-01-28": "Berufsschule",
            "2025-01-29": "Berufsschule",
            "2025-01-30": "Berufsschule",
            "2025-01-31": "Berufsschule",
            "2025-02-03": "QZ - SKL",
            "2025-02-04": "Bb1530",
            "2025-02-05": "Bb1530",
            "2025-02-06": "Bb1530",
            "2025-02-07": "Bb1530",
            "2025-02-10": "KiN / Tf-Mitfahrt",
            "2025-02-11": "KiN / Tf-Mitfahrt",
            "2025-02-12": "KiN / Tf-Mitfahrt",
            "2025-02-13": "KiN / Tf-Mitfahrt",
            "2025-02-14": "KiN / Tf-Mitfahrt",
            "2025-02-17": "Berufsschule",
            "2025-02-18": "Berufsschule",
            "2025-02-19": "Berufsschule",
            "2025-02-20": "Berufsschule",
            "2025-02-21": "Berufsschule",
            "2025-02-24": "Modul A3 / B2.1",
            "2025-02-25": "Modul B2.1",
            "2025-02-26": "Modul B2.1",
            "2025-02-27": "Modul B2.1",
            "2025-02-28": "Modul B2.2 / B2.3",
            "2025-03-03": "Tf-Mitfahrt / Modul EB 5",
            "2025-03-04": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-05": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-06": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-07": "Tf-Mitfahrt / QZ",
            "2025-03-10": "Tf-Mitfahrt / Modul EB 5",
            "2025-03-11": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-12": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-13": "Tf-Mitfahrt / Px Rangieren",
            "2025-03-14": "Tf-Mitfahrt / QZ",
            "2025-03-17": "Berufsschule",
            "2025-03-18": "Berufsschule",
            "2025-03-19": "Berufsschule",
            "2025-03-20": "Berufsschule",
            "2025-03-21": "Berufsschule",
            "2025-03-24": "Modul B3.1.1",
            "2025-03-25": "Bb1570",
            "2025-03-26": "Modul B3.1.2",
            "2025-03-27": "Modul B3.1.2",
            "2025-03-28": "Modul B3.1.2",
            "2025-03-31": "Modul EX 19",
            "2025-04-01": "Bb1560",
            "2025-04-02": "Bb1560",
            "2025-04-03": "Bb1560",
            "2025-04-04": "Bb1560",
            "2025-04-07": "Berufsschule",
            "2025-04-08": "Berufsschule",
            "2025-04-09": "Berufsschule",
            "2025-04-10": "Berufsschule",
            "2025-04-11": "Berufsschule",
            "2025-04-14": "Urlaub",
            "2025-04-15": "Urlaub",
            "2025-04-16": "Urlaub",
            "2025-04-17": "Urlaub",
            "2025-04-21": "Tf-Mitfahrt",
            "2025-04-22": "Tf-Mitfahrt",
            "2025-04-23": "Tf-Mitfahrt",
            "2025-04-24": "Tf-Mitfahrt",
            "2025-04-28": "Wdh. B Module",
            "2025-04-29": "Wdh B. Module",
            "2025-04-30": "LEK I",
            "2025-05-01": "Tag der Arbeit",
            "2025-05-02": "Urlaub",
            "2025-05-05": "Modul BP",
            "2025-05-06": "Modul BP",
            "2025-05-07": "Modul BP",
            "2025-05-08": "Modul BP",
            "2025-05-09": "Modul BP",
            "2025-05-12": "Berufsschule",
            "2025-05-13": "Berufsschule",
            "2025-05-14": "Berufsschule",
            "2025-05-15": "Berufsschule",
            "2025-05-16": "Berufsschule",
            "2025-05-19": "InfraGo",
            "2025-05-20": "InfraGo",
            "2025-05-21": "InfraGo",
            "2025-05-22": "InfraGo",
            "2025-05-23": "InfraGo",
            "2025-05-26": "FG 1",
            "2025-05-27": "FG 1",
            "2025-05-28": "Wdh. B Module",
            "2025-05-29": "Christi Himmelfahrt",
            "2025-05-30": "Urlaub",
            "2025-06-02": "Berufsschule",
            "2025-06-03": "Berufsschule",
            "2025-06-04": "Berufsschule",
            "2025-06-05": "Berufsschule",
            "2025-06-06": "Berufsschule",
            "2025-06-09": "Modul B4.1",
            "2025-06-10": "Modul B4.2",
            "2025-06-11": "Modul B4.2",
            "2025-06-12": "Bb1559",
            "2025-06-16": "Modul B4.3.1",
            "2025-06-17": "Modul B4.3.1",
            "2025-06-18": "Modul B4.3.1",
            "2025-06-19": "Fronleichnam",
            "2025-06-20": "Urlaub",
            "2025-06-23": "Berufsschule",
            "2025-06-24": "Berufsschule",
            "2025-06-25": "Berufsschule",
            "2025-06-26": "Berufsschule",
            "2025-06-27": "Berufsschule",
            "2025-06-30": "Modul B4.3.1",
            "2025-07-01": "Bb1570",
            "2025-07-02": "Bb1570",
            "2025-07-03": "Modul B4.4",
            "2025-07-04": "Modul B4.4",
            "2025-07-07": "Lernfahrt 4 / QZ",
            "2025-07-08": "Lernfahrt 4 / QZ",
            "2025-07-09": "Modul Z1",
            "2025-07-10": "Modul Z1",
            "2025-07-11": "Modul Z1 ÜS",
            "2025-07-14": "Modul Z1 ÜS",
            "2025-07-15": "Modul K1",
            "2025-07-16": "Modul K2 / EK2",
            "2025-07-17": "Modul K3",
            "2025-07-18": "EK / K Praxis",
            "2025-07-21": "Wdh B Module",
            "2025-07-22": "Lernfahrt 5 / QZ",
            "2025-07-23": "Lernfahrt 5 / QZ",
            "2025-07-24": "Wdh. B Module",
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