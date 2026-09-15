"use strict";

/* =========================================================
   KIDS SCIENCE - COMPLETE WEBSITE JAVASCRIPT
========================================================= */

const KS = (() => {

    /* =====================================================
       STORAGE
    ===================================================== */

    const ACCOUNTS_KEY = "kidsScienceAccounts";
    const CURRENT_KEY = "kidsScienceCurrentUID";
    const BEST_KEY = "kidsScienceFlappyBest";

    let currentBook = null;
    let currentChapter = null;

    let game = {
        running: false,
        over: false,
        animation: null,
        bird: null,
        pipes: [],
        score: 0,
        lastTime: 0,
        spawnTimer: 0
    };

    /* =====================================================
       PASS DATA
    ===================================================== */

    const PASSES = {
        FREE: {
            price: 0,
            daily: 0,
            videoDiscount: 0
        },

        PRO: {
            price: 5000,
            daily: 500,
            videoDiscount: 50
        },

        ELITE: {
            price: 8000,
            daily: 750,
            videoDiscount: 100
        },

        PREMIUM: {
            price: 12000,
            daily: 400,
            videoDiscount: 200
        }
    };

    /* =====================================================
       VIDEOS
    ===================================================== */

    const VIDEOS = [
        {
            id: "Gf4qxkGbp7M",
            title: "Science Video 1",
            description: "Explore science through an educational video.",
            price: 250,
            emoji: "🌎"
        },

        {
            id: "GtFHVL9-V5Y",
            title: "Science Video 2",
            description: "Discover another interesting science topic.",
            price: 300,
            emoji: "🚀"
        },

        {
            id: "ImvQ0n__sHg",
            title: "Science Video 3",
            description: "Learn something new with KIDS SCIENCE.",
            price: 350,
            emoji: "🧬"
        },

        {
            id: "PLZCwIyIR0-VjvUVYQNrx-BR0M3gCS3snl",
            title: "Science Playlist",
            description: "A complete science playlist.",
            price: 500,
            emoji: "📺",
            playlist: true
        }
    ];

    /* =====================================================
       COURSES
    ===================================================== */

    const COURSES = [
        {
            id: "nature",
            title: "Nature",
            emoji: "🌿",
            description: "Discover plants, animals, water and our planet.",

            chapters: [
                {
                    title: "What Is Nature?",
                    emoji: "🌎",
                    content: `
                        <p>Nature is everything around us that is not made by humans.
                        Trees, animals, rivers, oceans, mountains, clouds and sunlight
                        are all parts of nature.</p>

                        <h2>🌳 Living Things</h2>

                        <p>Plants and animals are living things. They need resources
                        from their environment to survive.</p>

                        <h2>☀️ The Sun</h2>

                        <p>The Sun provides light and heat. Plants use sunlight to
                        make food through photosynthesis.</p>

                        <h2>🌎 Our Environment</h2>

                        <p>An environment contains living and non-living things that
                        interact with each other.</p>
                    `,
                    questions: [
                        {
                            q: "Which is part of nature?",
                            options: ["Tree", "Computer", "Car"],
                            answer: 0
                        },
                        {
                            q: "What provides light and heat to Earth?",
                            options: ["Moon", "Sun", "Rock"],
                            answer: 1
                        },
                        {
                            q: "Which are living things?",
                            options: ["Plants and animals", "Rocks", "Clouds"],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "Plants",
                    emoji: "🌱",
                    content: `
                        <p>Plants are living organisms. Most plants make their own
                        food using sunlight, water and carbon dioxide.</p>

                        <h2>🌿 Roots</h2>
                        <p>Roots usually hold a plant in the ground and absorb water
                        and minerals.</p>

                        <h2>🍃 Leaves</h2>
                        <p>Leaves are important for photosynthesis.</p>

                        <h2>🌸 Flowers</h2>
                        <p>Many plants use flowers as part of their reproductive
                        process.</p>
                    `,
                    questions: [
                        {
                            q: "What do roots absorb?",
                            options: ["Water and minerals", "Sunlight", "Air only"],
                            answer: 0
                        },
                        {
                            q: "Where does most photosynthesis happen?",
                            options: ["Leaves", "Roots", "Rocks"],
                            answer: 0
                        },
                        {
                            q: "Are plants living organisms?",
                            options: ["Yes", "No", "Only at night"],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "Animals",
                    emoji: "🦁",
                    content: `
                        <p>Animals are living organisms that obtain energy by
                        consuming food.</p>

                        <h2>🐘 Habitats</h2>
                        <p>A habitat is the natural place where an organism lives.</p>

                        <h2>🐟 Aquatic Animals</h2>
                        <p>Fish and many other organisms live in water.</p>

                        <h2>🦅 Birds</h2>
                        <p>Birds have feathers and beaks. Many birds can fly,
                        although not every bird can.</p>
                    `,
                    questions: [
                        {
                            q: "What is a habitat?",
                            options: [
                                "Natural place where an organism lives",
                                "A type of food",
                                "A machine"
                            ],
                            answer: 0
                        },
                        {
                            q: "Where do fish normally live?",
                            options: ["Water", "Desert", "Clouds"],
                            answer: 0
                        },
                        {
                            q: "What do birds have?",
                            options: ["Feathers", "Wheels", "Gills only"],
                            answer: 0
                        }
                    ]
                }
            ]
        },

        {
            id: "space",
            title: "Space",
            emoji: "🚀",
            description: "Explore planets, stars and our Solar System.",

            chapters: [
                {
                    title: "The Solar System",
                    emoji: "☀️",
                    content: `
                        <p>The Solar System contains the Sun and the objects
                        that orbit it.</p>

                        <h2>☀️ The Sun</h2>
                        <p>The Sun is a star and is at the center of our Solar System.</p>

                        <h2>🪐 Planets</h2>
                        <p>Our Solar System has eight recognized planets.</p>

                        <h2>🌍 Earth</h2>
                        <p>Earth is the planet where we live.</p>
                    `,
                    questions: [
                        {
                            q: "What is the Sun?",
                            options: ["A star", "A planet", "A moon"],
                            answer: 0
                        },
                        {
                            q: "How many recognized planets are in our Solar System?",
                            options: ["8", "4", "20"],
                            answer: 0
                        },
                        {
                            q: "Where do we live?",
                            options: ["Earth", "Mars", "Jupiter"],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "The Moon",
                    emoji: "🌙",
                    content: `
                        <p>The Moon is Earth's natural satellite. It orbits Earth.</p>

                        <h2>🌕 Moon Phases</h2>
                        <p>The Moon appears to change shape during its cycle because
                        we see different portions of its sunlit side.</p>

                        <h2>🌊 Tides</h2>
                        <p>The Moon's gravity contributes strongly to Earth's tides.</p>
                    `,
                    questions: [
                        {
                            q: "What is the Moon?",
                            options: [
                                "Earth's natural satellite",
                                "A star",
                                "A planet"
                            ],
                            answer: 0
                        },
                        {
                            q: "What causes the Moon's changing appearance?",
                            options: [
                                "Different portions of its sunlit side are visible",
                                "The Moon turns off",
                                "The Moon disappears"
                            ],
                            answer: 0
                        },
                        {
                            q: "Does the Moon affect Earth's tides?",
                            options: ["Yes", "No", "Never"],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "Stars",
                    emoji: "⭐",
                    content: `
                        <p>Stars are huge balls of extremely hot gas that produce
                        energy and light.</p>

                        <h2>⭐ Our Star</h2>
                        <p>The Sun is the closest star to Earth.</p>

                        <h2>🌌 Galaxies</h2>
                        <p>Stars can be grouped into enormous systems called galaxies.</p>
                    `,
                    questions: [
                        {
                            q: "Is the Sun a star?",
                            options: ["Yes", "No", "It is a planet"],
                            answer: 0
                        },
                        {
                            q: "What are galaxies?",
                            options: [
                                "Huge systems containing stars and other matter",
                                "Single planets",
                                "Clouds only"
                            ],
                            answer: 0
                        },
                        {
                            q: "What do stars produce?",
                            options: ["Energy and light", "Water", "Soil"],
                            answer: 0
                        }
                    ]
                }
            ]
        },

        {
            id: "physics",
            title: "Basic Physics",
            emoji: "⚡",
            description: "Learn about motion, forces and energy.",

            chapters: [
                {
                    title: "Force",
                    emoji: "💪",
                    content: `
                        <p>A force is a push or pull that can change an object's
                        motion.</p>

                        <h2>🏀 Push</h2>
                        <p>Pushing an object means applying force away from yourself.</p>

                        <h2>🧲 Pull</h2>
                        <p>Pulling applies force toward yourself.</p>
                    `,
                    questions: [
                        {
                            q: "A force can be a...",
                            options: ["Push or pull", "Color", "Sound only"],
                            answer: 0
                        },
                        {
                            q: "What is pushing?",
                            options: [
                                "Applying force away",
                                "Removing gravity",
                                "Creating light"
                            ],
                            answer: 0
                        },
                        {
                            q: "What is pulling?",
                            options: [
                                "Applying force toward yourself",
                                "Changing color",
                                "Making water"
                            ],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "Energy",
                    emoji: "⚡",
                    content: `
                        <p>Energy is the ability to cause change or do work.</p>

                        <h2>☀️ Solar Energy</h2>
                        <p>Energy from sunlight can be captured using solar technology.</p>

                        <h2>🔋 Electrical Energy</h2>
                        <p>Electrical energy powers many devices around us.</p>
                    `,
                    questions: [
                        {
                            q: "What is energy?",
                            options: [
                                "Ability to cause change or do work",
                                "Only food",
                                "A color"
                            ],
                            answer: 0
                        },
                        {
                            q: "What provides solar energy?",
                            options: ["Sunlight", "Rocks", "Snow"],
                            answer: 0
                        },
                        {
                            q: "What can electrical energy power?",
                            options: ["Devices", "Mountains", "Oceans"],
                            answer: 0
                        }
                    ]
                },

                {
                    title: "Motion",
                    emoji: "🏃",
                    content: `
                        <p>Motion happens when an object's position changes with time.</p>

                        <h2>🚗 Speed</h2>
                        <p>Speed describes how quickly something moves.</p>

                        <h2>🛑 Friction</h2>
                        <p>Friction is a force that opposes motion between surfaces.</p>
                    `,
                    questions: [
                        {
                            q: "What is motion?",
                            options: [
                                "Change in position with time",
                                "A type of color",
                                "A material"
                            ],
                            answer: 0
                        },
                        {
                            q: "What describes how quickly something moves?",
                            options: ["Speed", "Mass", "Color"],
                            answer: 0
                        },
                        {
                            q: "What opposes motion between surfaces?",
                            options: ["Friction", "Sunlight", "Sound"],
                            answer: 0
                        }
                    ]
                }
            ]
        }
    ];

    /* =====================================================
       STORAGE HELPERS
    ===================================================== */

    function readAccounts() {

        try {
            const raw = localStorage.getItem(ACCOUNTS_KEY);

            if (!raw) return [];

            const data = JSON.parse(raw);

            return Array.isArray(data)
                ? data.map(normalizeAccount)
                : [];

        } catch (error) {
            console.error("Account storage error:", error);
            return [];
        }
    }

    function saveAccounts(accounts) {
        localStorage.setItem(
            ACCOUNTS_KEY,
            JSON.stringify(accounts)
        );
    }

    function normalizeAccount(account) {

        return {
            uid: account.uid || makeUID(),
            name: String(account.name || "Scientist"),
            emoji: account.emoji || "🙂",
            balance: Number(account.balance) || 0,
            pass: account.pass || "FREE",
            passExpires: Number(account.passExpires) || null,
            transactions: Array.isArray(account.transactions)
                ? account.transactions
                : [],
            unlockedVideos: Array.isArray(account.unlockedVideos)
                ? account.unlockedVideos
                : [],
            unlockedCourses: Array.isArray(account.unlockedCourses)
                ? account.unlockedCourses
                : [],
            lastBonusDate: account.lastBonusDate || "",
            lastDailyPassReward: account.lastDailyPassReward || "",
            lastGameOfferDate: account.lastGameOfferDate || ""
        };
    }

    function makeUID() {

        const chars =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        let uid = "KID-";

        for (let i = 0; i < 6; i++) {
            uid += chars[
                Math.floor(Math.random() * chars.length)
            ];
        }

        return uid;
    }

    function today() {
        const d = new Date();

        return d.getFullYear() +
            "-" +
            String(d.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(d.getDate()).padStart(2, "0");
    }

    function currentAccount() {

        const uid = localStorage.getItem(CURRENT_KEY);

        if (!uid) return null;

        const accounts = readAccounts();

        const account = accounts.find(
            a => a.uid === uid
        );

        if (!account) {
            localStorage.removeItem(CURRENT_KEY);
            return null;
        }

        return account;
    }

    function saveAccount(account) {

        const accounts = readAccounts();

        const index = accounts.findIndex(
            a => a.uid === account.uid
        );

        if (index === -1) {
            accounts.push(account);
        } else {
            accounts[index] = account;
        }

        saveAccounts(accounts);
    }

    function addTransaction(account, text, amount) {

        account.transactions.unshift({
            text,
            amount,
            date: new Date().toLocaleString()
        });

        if (account.transactions.length > 100) {
            account.transactions =
                account.transactions.slice(0, 100);
        }
    }

    /* =====================================================
       PASS EXPIRATION
    ===================================================== */

    function checkPass(account) {

        if (
            account.pass !== "FREE" &&
            account.passExpires &&
            Date.now() >= account.passExpires
        ) {

            addTransaction(
                account,
                `${account.pass} pass expired`,
                0
            );

            account.pass = "FREE";
            account.passExpires = null;
            account.lastDailyPassReward = "";

            saveAccount(account);
        }
    }

    function applyTheme() {

        const account = currentAccount();

        let pass = "FREE";

        if (account) {
            checkPass(account);
            pass = account.pass || "FREE";
        }

        document.body.dataset.pass = pass;
    }

    /* =====================================================
       DAILY PASS REWARD
    ===================================================== */

    function checkDailyPassReward(account) {

        if (!account) return;

        checkPass(account);

        if (account.pass === "FREE") return;

        const date = today();

        if (account.lastDailyPassReward === date) {
            return;
        }

        const amount =
            PASSES[account.pass].daily;

        account.balance += amount;
        account.lastDailyPassReward = date;

        addTransaction(
            account,
            `${account.pass} daily PlayCoins`,
            amount
        );

        saveAccount(account);
    }

    /* =====================================================
       ACCOUNT
    ===================================================== */

    function createAccount(name) {

        name = String(name || "").trim();

        if (!name) {
            alert("Please enter your nickname.");
            return;
        }

        if (name.length > 16) {
            alert("Nickname must be 16 characters or less.");
            return;
        }

        const accounts = readAccounts();

        const existing = accounts.find(
            a => a.name.toLowerCase() === name.toLowerCase()
        );

        if (existing) {
            localStorage.setItem(
                CURRENT_KEY,
                existing.uid
            );

            location.href = "index.html";
            return;
        }

        const emojis = [
            "🙂", "😎", "🤓", "🧑‍🔬",
            "🐼", "🦊", "🐯", "🐸",
            "🚀", "🪐"
        ];

        const account = {
            uid: makeUID(),
            name,
            emoji:
                emojis[Math.floor(Math.random() * emojis.length)],
            balance: 500,
            pass: "FREE",
            passExpires: null,
            transactions: [],
            unlockedVideos: [],
            unlockedCourses: [],
            lastBonusDate: "",
            lastDailyPassReward: "",
            lastGameOfferDate: ""
        };

        addTransaction(
            account,
            "🎁 Welcome bonus",
            500
        );

        accounts.push(account);

        saveAccounts(accounts);

        localStorage.setItem(
            CURRENT_KEY,
            account.uid
        );

        location.href = "index.html";
    }

    function logout() {

        localStorage.removeItem(CURRENT_KEY);

        location.href = "index.html";
    }

    function deleteAccount() {

        const account = currentAccount();

        if (!account) return;

        const confirmed = confirm(
            "Delete this KIDS SCIENCE account permanently?"
        );

        if (!confirmed) return;

        const accounts = readAccounts().filter(
            a => a.uid !== account.uid
        );

        saveAccounts(accounts);

        localStorage.removeItem(CURRENT_KEY);

        location.href = "index.html";
    }

    function loginWithUID(uid) {

        const accounts = readAccounts();

        const account = accounts.find(
            a => a.uid === uid
        );

        if (!account) return;

        localStorage.setItem(
            CURRENT_KEY,
            uid
        );

        location.href = "index.html";
    }

    function requireLogin() {

        const account = currentAccount();

        if (!account) {
            location.href = "index.html";
            return null;
        }

        checkPass(account);
        checkDailyPassReward(account);

        return currentAccount();
    }

    /* =====================================================
       HOME
    ===================================================== */

    function initHome() {

        const area =
            document.getElementById("accountArea");

        if (!area) return;

        const account = currentAccount();

        if (!account) {

            area.innerHTML = `
                <section class="welcome-account">
                    <h2>🚀 Start Your Science Journey</h2>
                    <p>Create your free KIDS SCIENCE account.
                    You receive 500 PlayCoins.</p>

                    <form id="createAccountForm" style="margin-top:18px">
                        <input
                            id="nicknameInput"
                            maxlength="16"
                            placeholder="Enter your nickname"
                            required
                            style="
                                padding:13px;
                                border-radius:10px;
                                border:1px solid var(--border);
                                background:#041329;
                                color:white;
                            "
                        >
                        <button class="primary-btn">
                            Create Account
                        </button>
                    </form>

                    <div id="savedAccounts" style="margin-top:20px"></div>
                </section>
            `;

            document
                .getElementById("createAccountForm")
                .addEventListener("submit", event => {

                    event.preventDefault();

                    createAccount(
                        document.getElementById(
                            "nicknameInput"
                        ).value
                    );
                });

            renderSavedAccounts();

            return;
        }

        checkPass(account);
        checkDailyPassReward(account);

        const updated = currentAccount();

        area.innerHTML = `
            <section class="welcome-account">
                <h2>${escapeHTML(updated.emoji)}
                    Welcome back, ${escapeHTML(updated.name)}!</h2>

                <p>
                    UID: <b>${escapeHTML(updated.uid)}</b>
                    · 🪙 ${updated.balance} PlayCoins
                    · ${escapeHTML(updated.pass)}
                </p>

                <div style="margin-top:15px">
                    <a class="primary-btn" href="courses.html">
                        Start Learning
                    </a>

                    <a class="secondary-btn" href="accounts.html">
                        Account
                    </a>
                </div>
            </section>
        `;
    }

    function renderSavedAccounts() {

        const box =
            document.getElementById("savedAccounts");

        if (!box) return;

        const accounts = readAccounts();

        if (!accounts.length) return;

        box.innerHTML = `
            <h3>Saved Accounts</h3>
            ${accounts.map(account => `
                <div class="transaction">
                    <span>
                        ${escapeHTML(account.emoji)}
                        ${escapeHTML(account.name)}
                        <small>${escapeHTML(account.uid)}</small>
                    </span>

                    <button
                        class="secondary-btn"
                        onclick="KS.loginWithUID('${account.uid}')">
                        Continue
                    </button>
                </div>
            `).join("")}
        `;
    }

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* =====================================================
       WALLET
    ===================================================== */

    function claimDailyBonus() {

        const account = requireLogin();

        if (!account) return;

        const date = today();

        if (account.lastBonusDate === date) {
            alert("You already claimed today's bonus.");
            return;
        }

        account.balance += 100;
        account.lastBonusDate = date;

        addTransaction(
            account,
            "🎁 Daily bonus",
            100
        );

        saveAccount(account);

        renderWallet();

        alert("You received 100 PlayCoins!");
    }

    function renderWallet() {

        const account = requireLogin();

        if (!account) return;

        document.getElementById(
            "walletBalance"
        ).textContent = account.balance;

        document.getElementById(
            "walletPass"
        ).textContent =
            account.pass +
            (
                account.passExpires
                    ? ` · Expires ${new Date(
                        account.passExpires
                    ).toLocaleDateString()}`
                    : ""
            );

        const list =
            document.getElementById("transactions");

        if (!list) return;

        if (!account.transactions.length) {
            list.innerHTML = "<p>No transactions yet.</p>";
            return;
        }

        list.innerHTML =
            account.transactions.map(tx => `
                <div class="transaction">
                    <span>
                        ${escapeHTML(tx.text)}
                        <small>${escapeHTML(tx.date)}</small>
                    </span>

                    <strong class="${
                        tx.amount >= 0
                            ? "positive"
                            : "negative"
                    }">
                        ${
                            tx.amount > 0
                                ? "+"
                                : ""
                        }${tx.amount}
                    </strong>
                </div>
            `).join("");

        const button =
            document.getElementById("dailyBonusButton");

        if (button) {

            if (account.lastBonusDate === today()) {
                button.disabled = true;
                button.textContent =
                    "✓ Today's Bonus Claimed";
            }
        }
    }

    /* =====================================================
       VIDEOS
    ===================================================== */

    function videoPrice(video, account) {

        let price = video.price;

        if (account && PASSES[account.pass]) {

            price -= PASSES[
                account.pass
            ].videoDiscount;
        }

        return Math.max(0, price);
    }

    function renderVideos() {

        const account = requireLogin();

        if (!account) return;

        const grid =
            document.getElementById("videoGrid");

        if (!grid) return;

        grid.innerHTML = VIDEOS.map(video => {

            const unlocked =
                account.unlockedVideos.includes(video.id);

            const price =
                videoPrice(video, account);

            return `
                <article class="video-card">

                    <div class="video-thumbnail">
                        ${video.emoji}
                    </div>

                    <h2>${escapeHTML(video.title)}</h2>

                    <p>${escapeHTML(video.description)}</p>

                    ${
                        unlocked
                            ? `
                                <p class="price">
                                    ✓ UNLOCKED
                                </p>

                                <button
                                    class="primary-btn"
                                    onclick="KS.playVideo('${video.id}')">
                                    ▶ Watch
                                </button>
                            `
                            : `
                                <p class="price">
                                    🪙 ${price} PlayCoins
                                </p>

                                <button
                                    class="primary-btn"
                                    onclick="KS.purchaseVideo('${video.id}')">
                                    🔒 Unlock Video
                                </button>
                            `
                    }

                </article>
            `;

        }).join("");
    }

    function purchaseVideo(id) {

        const account = requireLogin();

        if (!account) return;

        const video =
            VIDEOS.find(v => v.id === id);

        if (!video) return;

        if (account.unlockedVideos.includes(id)) {
            playVideo(id);
            return;
        }

        const price =
            videoPrice(video, account);

        if (account.balance < price) {
            alert(
                `You need ${price - account.balance} more PlayCoins.`
            );
            return;
        }

        account.balance -= price;

        account.unlockedVideos.push(id);

        addTransaction(
            account,
            `🎬 Purchased ${video.title}`,
            -price
        );

        if (account.pass === "ELITE") {

            account.balance += 100;

            addTransaction(
                account,
                "👑 ELITE video purchase bonus",
                100
            );
        }

        saveAccount(account);

        renderVideos();

        alert(
            `Video unlocked! You paid ${price} PlayCoins.`
        );
    }

    function playVideo(id) {

        const account = requireLogin();

        if (!account) return;

        if (!account.unlockedVideos.includes(id)) {
            alert("Unlock this video first.");
            return;
        }

        const video =
            VIDEOS.find(v => v.id === id);

        if (!video) return;

        const player =
            document.getElementById("youtubePlayer");

        const box =
            document.getElementById("videoPlayerBox");

        const title =
            document.getElementById("playingTitle");

        if (!player || !box) return;

        if (video.playlist) {

            player.src =
                `https://www.youtube.com/embed/videoseries?list=${video.id}`;

        } else {

            player.src =
                `https://www.youtube.com/embed/${video.id}?autoplay=1`;
        }

        title.textContent = video.title;

        box.classList.remove("hidden");

        box.scrollIntoView({
            behavior: "smooth"
        });
    }

    function closeVideo() {

        const player =
            document.getElementById("youtubePlayer");

        const box =
            document.getElementById("videoPlayerBox");

        if (player) player.src = "";

        if (box) box.classList.add("hidden");
    }

    /* =====================================================
       COURSES
    ===================================================== */

    function renderBooks() {

        const account = requireLogin();

        if (!account) return;

        const grid =
            document.getElementById("courseBooks");

        if (!grid) return;

        grid.innerHTML =
            COURSES.map(book => `
                <article
                    class="course-card"
                    onclick="KS.openBook('${book.id}')"
                    style="cursor:pointer">

                    <div class="card-icon">
                        ${book.emoji}
                    </div>

                    <h2>${escapeHTML(book.title)}</h2>

                    <p>${escapeHTML(book.description)}</p>

                    <button class="primary-btn">
                        Open Book
                    </button>
                </article>
            `).join("");
    }

    function openBook(id) {

        currentBook =
            COURSES.find(book => book.id === id);

        if (!currentBook) return;

        document
            .getElementById("courseBooks")
            .classList.add("hidden");

        document
            .getElementById("chapterSection")
            .classList.remove("hidden");

        document
            .getElementById("readerSection")
            .classList.add("hidden");

        document
            .getElementById("quizSection")
            .classList.add("hidden");

        document.getElementById(
            "bookTitle"
        ).textContent =
            currentBook.emoji +
            " " +
            currentBook.title;

        document.getElementById(
            "chapterList"
        ).innerHTML =
            currentBook.chapters.map(
                (chapter, index) => `
                    <div
                        class="chapter-card"
                        onclick="KS.openChapter(${index})">

                        <span>${chapter.emoji}</span>

                        <h3>
                            Chapter ${index + 1}
                        </h3>

                        <p>
                            ${escapeHTML(chapter.title)}
                        </p>
                    </div>
                `
            ).join("");
    }

    function openChapter(index) {

        if (!currentBook) return;

        currentChapter =
            currentBook.chapters[index];

        if (!currentChapter) return;

        document
            .getElementById("chapterSection")
            .classList.add("hidden");

        document
            .getElementById("readerSection")
            .classList.remove("hidden");

        document
            .getElementById("quizSection")
            .classList.add("hidden");

        document.getElementById(
            "chapterIllustration"
        ).textContent =
            currentChapter.emoji;

        document.getElementById(
            "readerTitle"
        ).textContent =
            currentChapter.title;

        document.getElementById(
            "readerContent"
        ).innerHTML =
            currentChapter.content;
    }

    function showBooks() {

        document
            .getElementById("courseBooks")
            .classList.remove("hidden");

        document
            .getElementById("chapterSection")
            .classList.add("hidden");

        document
            .getElementById("readerSection")
            .classList.add("hidden");

        document
            .getElementById("quizSection")
            .classList.add("hidden");
    }

    function showChapters() {

        if (!currentBook) {
            showBooks();
            return;
        }

        document
            .getElementById("courseBooks")
            .classList.add("hidden");

        document
            .getElementById("chapterSection")
            .classList.remove("hidden");

        document
            .getElementById("readerSection")
            .classList.add("hidden");

        document
            .getElementById("quizSection")
            .classList.add("hidden");
    }

    function startQuiz() {

        if (!currentChapter) return;

        document
            .getElementById("readerSection")
            .classList.add("hidden");

        document
            .getElementById("quizSection")
            .classList.remove("hidden");

        document.getElementById(
            "quizResult"
        ).innerHTML = "";

        document.getElementById(
            "quizQuestions"
        ).innerHTML =
            currentChapter.questions.map(
                (question, index) => `

                    <div class="question">

                        <h3>
                            ${index + 1}.
                            ${escapeHTML(question.q)}
                        </h3>

                        ${question.options.map(
                            (option, optionIndex) => `
                                <label>
                                    <input
                                        type="radio"
                                        name="question${index}"
                                        value="${optionIndex}">
                                    ${escapeHTML(option)}
                                </label>
                            `
                        ).join("")}

                    </div>
                `
            ).join("");
    }

    function submitQuiz() {

        const account = requireLogin();

        if (!account) return;

        if (!currentChapter) return;

        let score = 0;

        currentChapter.questions.forEach(
            (question, index) => {

                const selected =
                    document.querySelector(
                        `input[name="question${index}"]:checked`
                    );

                if (
                    selected &&
                    Number(selected.value) === question.answer
                ) {
                    score++;
                }
            }
        );

        const total =
            currentChapter.questions.length;

        const reward =
            score === total
                ? 50
                : score * 10;

        if (reward > 0) {

            account.balance += reward;

            addTransaction(
                account,
                `📚 ${currentChapter.title} Q&A reward`,
                reward
            );

            saveAccount(account);
        }

        document.getElementById(
            "quizResult"
        ).innerHTML = `
            <div class="welcome-account" style="margin-top:20px">
                <h2>
                    ${
                        score === total
                            ? "🎉 Perfect!"
                            : "🧠 Good Try!"
                    }
                </h2>

                <p>
                    Score: ${score}/${total}
                </p>

                <p>
                    Reward: +${reward} PlayCoins
                </p>

                <button
                    class="primary-btn"
                    onclick="KS.showChapters()">
                    Next Chapter
                </button>
            </div>
        `;
    }

    /* =====================================================
       SUBSCRIPTIONS
    ===================================================== */

    function buyPass(passName) {

        const account = requireLogin();

        if (!account) return;

        if (!PASSES[passName]) return;

        if (
            account.pass === passName &&
            account.passExpires &&
            Date.now() < account.passExpires
        ) {
            alert("You already have this active pass.");
            return;
        }

        let price =
            PASSES[passName].price;

        /* Existing premium passes get a discount
           when buying another tier. */

        if (
            account.pass !== "FREE" &&
            account.pass !== passName
        ) {
            price = Math.floor(price * 0.9);
        }

        if (account.balance < price) {

            alert(
                `You need ${price - account.balance} more PlayCoins.`
            );

            return;
        }

        account.balance -= price;

        account.pass = passName;

        account.passExpires =
            Date.now() +
            (10 * 24 * 60 * 60 * 1000);

        account.lastDailyPassReward = "";

        addTransaction(
            account,
            `👑 Purchased ${passName} Pass`,
            -price
        );

        saveAccount(account);

        applyTheme();

        renderSubscription();

        alert(
            `${passName} activated for exactly 10 days!`
        );
    }

    function renderSubscription() {

        const account = requireLogin();

        if (!account) return;

        const box =
            document.getElementById("currentPass");

        if (!box) return;

        checkPass(account);

        const updated =
            currentAccount();

        if (updated.pass === "FREE") {

            box.innerHTML = `
                <strong>Current Pass:</strong>
                FREE
                <br>
                <small>
                    You can upgrade using PlayCoins.
                </small>
            `;

        } else {

            box.innerHTML = `
                <strong>Current Pass:</strong>
                ${escapeHTML(updated.pass)}
                <br>
                <strong>Expires:</strong>
                ${new Date(
                    updated.passExpires
                ).toLocaleString()}
            `;
        }
    }

    /* =====================================================
       FLAPPY BIRD
    ===================================================== */

    const GRAVITY = 0.45;
    const FLAP_POWER = -7;
    const PIPE_SPEED = 3;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 140;
    const BIRD_LEFT = 80;
    const BIRD_SIZE = 35;

    function getBest() {

        const account = currentAccount();

        if (!account) return 0;

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(BEST_KEY) || "{}"
                );

            return Number(
                data[account.uid] || 0
            );

        } catch {
            return 0;
        }
    }

    function saveBest(score) {

        const account = currentAccount();

        if (!account) return;

        let data = {};

        try {
            data =
                JSON.parse(
                    localStorage.getItem(BEST_KEY) || "{}"
                );
        } catch {}

        data[account.uid] =
            Math.max(
                Number(data[account.uid] || 0),
                score
            );

        localStorage.setItem(
            BEST_KEY,
            JSON.stringify(data)
        );
    }

    function drawGame() {

        const canvas =
            document.getElementById("gameCanvas");

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* background */

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height
            );

        gradient.addColorStop(0, "#061e48");
        gradient.addColorStop(1, "#031026");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* stars */

        ctx.fillStyle = "rgba(255,255,255,.6)";

        for (let i = 0; i < 35; i++) {

            const x = (i * 71) % canvas.width;
            const y = (i * 37) % 230;

            ctx.fillRect(x, y, 2, 2);
        }

        /* pipes */

        game.pipes.forEach(pipe => {

            ctx.fillStyle = "#20b66c";

            ctx.fillRect(
                pipe.x,
                0,
                PIPE_WIDTH,
                pipe.top
            );

            ctx.fillRect(
                pipe.x,
                pipe.bottom,
                PIPE_WIDTH,
                canvas.height - pipe.bottom
            );

            ctx.fillStyle = "#32e18b";

            ctx.fillRect(
                pipe.x - 5,
                pipe.top - 18,
                PIPE_WIDTH + 10,
                18
            );

            ctx.fillRect(
                pipe.x - 5,
                pipe.bottom,
                PIPE_WIDTH + 10,
                18
            );
        });

        /* bird */

        ctx.fillStyle = "#ffd83d";

        ctx.beginPath();

        ctx.arc(
            BIRD_LEFT + BIRD_SIZE / 2,
            game.bird.y,
            BIRD_SIZE / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#111";

        ctx.beginPath();

        ctx.arc(
            BIRD_LEFT + 23,
            game.bird.y - 5,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#ff8b2c";

        ctx.beginPath();

        ctx.moveTo(
            BIRD_LEFT + 32,
            game.bird.y
        );

        ctx.lineTo(
            BIRD_LEFT + 47,
            game.bird.y + 5
        );

        ctx.lineTo(
            BIRD_LEFT + 32,
            game.bird.y + 10
        );

        ctx.fill();

        /* score */

        ctx.fillStyle = "white";
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            game.score,
            canvas.width / 2,
            45
        );
    }

    function startGame() {

        const account = requireLogin();

        if (!account) return;

        game.running = true;
        game.over = false;
        game.score = 0;
        game.lastTime = performance.now();
        game.spawnTimer = 0;

        game.bird = {
            y: 250,
            velocity: 0
        };

        game.pipes = [];

        document.getElementById(
            "gameMessage"
        ).textContent =
            "Tap, click or press SPACE to fly!";

        updateGameUI();

        if (game.animation) {
            cancelAnimationFrame(game.animation);
        }

        game.animation =
            requestAnimationFrame(gameLoop);
    }

    function flap() {

        if (!game.running) return;

        game.bird.velocity =
            FLAP_POWER;
    }

    function gameLoop(timestamp) {

        if (!game.running) return;

        const delta =
            Math.min(
                timestamp - game.lastTime,
                32
            );

        game.lastTime = timestamp;

        const multiplier =
            delta / 16.67;

        game.bird.velocity +=
            GRAVITY * multiplier;

        game.bird.y +=
            game.bird.velocity * multiplier;

        game.spawnTimer += delta;

        if (game.spawnTimer >= 1500) {

            game.spawnTimer = 0;

            const minTop = 70;
            const maxTop = 290;

            const top =
                minTop +
                Math.random() *
                (maxTop - minTop);

            game.pipes.push({
                x: 360,
                top,
                bottom: top + PIPE_GAP,
                scored: false
            });
        }

        game.pipes.forEach(
            pipe => {
                pipe.x -=
                    PIPE_SPEED * multiplier;
            }
        );

        game.pipes =
            game.pipes.filter(
                pipe => pipe.x > -PIPE_WIDTH - 10
            );

        for (const pipe of game.pipes) {

            if (
                !pipe.scored &&
                pipe.x + PIPE_WIDTH < BIRD_LEFT
            ) {

                pipe.scored = true;
                game.score++;

                updateGameUI();
            }
        }

        const birdTop =
            game.bird.y -
            BIRD_SIZE / 2;

        const birdBottom =
            game.bird.y +
            BIRD_SIZE / 2;

        if (
            birdTop <= 0 ||
            birdBottom >= 520
        ) {
            endGame();
            return;
        }

        for (const pipe of game.pipes) {

            const horizontal =
                BIRD_LEFT + BIRD_SIZE > pipe.x &&
                BIRD_LEFT < pipe.x + PIPE_WIDTH;

            const vertical =
                birdTop < pipe.top ||
                birdBottom > pipe.bottom;

            if (horizontal && vertical) {
                endGame();
                return;
            }
        }

        drawGame();

        game.animation =
            requestAnimationFrame(gameLoop);
    }

    function endGame() {

        game.running = false;
        game.over = true;

        let multiplier = 1;

        const account = currentAccount();

        if (
            account &&
            (
                account.pass === "ELITE" ||
                account.pass === "PREMIUM"
            ) &&
            account.lastGameOfferDate !== today()
        ) {

            multiplier = 20;

            account.lastGameOfferDate = today();

            saveAccount(account);
        }

        const finalScore =
            game.score * multiplier;

        const bestBefore =
            getBest();

        saveBest(finalScore);

        const newBest =
            Math.max(
                bestBefore,
                finalScore
            );

        if (account) {

            const reward =
                Math.min(
                    finalScore * 2,
                    100
                );

            if (reward > 0) {

                account.balance += reward;

                addTransaction(
                    account,
                    `🎮 Flappy Bird reward (${finalScore})`,
                    reward
                );

                saveAccount(account);
            }
        }

        document.getElementById(
            "gameMessage"
        ).textContent =
            `Game Over! Score ${game.score}` +
            (
                multiplier > 1
                    ? ` → Daily ×${multiplier} = ${finalScore}`
                    : ""
            );

        updateGameUI();

        drawGame();
    }

    function updateGameUI() {

        const score =
            document.getElementById("gameScore");

        const best =
            document.getElementById("gameBest");

        const multiplier =
            document.getElementById("gameMultiplier");

        if (score) {
            score.textContent = game.score;
        }

        if (best) {
            best.textContent = getBest();
        }

        if (multiplier) {

            const account = currentAccount();

            const available =
                account &&
                (
                    account.pass === "ELITE" ||
                    account.pass === "PREMIUM"
                ) &&
                account.lastGameOfferDate !== today();

            multiplier.textContent =
                available ? "×20" : "×1";
        }
    }

    function setupGameInput() {

        const canvas =
            document.getElementById("gameCanvas");

        if (!canvas) return;

        canvas.addEventListener(
            "click",
            () => {
                if (game.running) {
                    flap();
                }
            }
        );

        canvas.addEventListener(
            "touchstart",
            event => {
                event.preventDefault();

                if (game.running) {
                    flap();
                }
            },
            { passive: false }
        );

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.code === "Space" &&
                    game.running
                ) {
                    event.preventDefault();
                    flap();
                }
            }
        );

        drawGame();
        updateGameUI();
    }

    /* =====================================================
       ACCOUNTS PAGE
    ===================================================== */

    function renderAccountPage() {

        const account = requireLogin();

        if (!account) return;

        const box =
            document.getElementById("accountProfile");

        if (!box) return;

        box.innerHTML = `
            <div
                class="profile-avatar"
                ${
                    account.pass !== "FREE"
                        ? `style="border-color:var(--accent);
                           box-shadow:0 0 35px var(--accent)"`
                        : ""
                }>
                ${escapeHTML(account.emoji)}
            </div>

            <h1>${escapeHTML(account.name)}</h1>

            <div class="uid-box">
                ${escapeHTML(account.uid)}
            </div>

            <p style="margin-top:15px">
                🪙 ${account.balance} PlayCoins
            </p>

            <p>
                👑 Pass:
                <strong>${escapeHTML(account.pass)}</strong>
            </p>

            ${
                account.passExpires
                    ? `
                        <p>
                            Expires:
                            ${new Date(
                                account.passExpires
                            ).toLocaleString()}
                        </p>
                    `
                    : ""
            }

            <p style="margin-top:15px">
                🎬 Unlocked Videos:
                ${account.unlockedVideos.length}
            </p>
        `;
    }

    /* =====================================================
       PAGE STARTUP
    ===================================================== */

    function start() {

        applyTheme();

        const page =
            document.body.dataset.page;

        if (
            page !== "home" &&
            page !== "soon" &&
            page !== "chat"
        ) {
            requireLogin();
        }

        switch (page) {

            case "home":
                initHome();
                break;

            case "courses":
                renderBooks();
                break;

            case "videos":
                renderVideos();
                break;

            case "wallet":
                renderWallet();
                break;

            case "subscription":
                renderSubscription();
                break;

            case "accounts":
                renderAccountPage();
                break;

            case "games":
                setupGameInput();
                break;
        }
    }

    return {
        start,
        createAccount,
        loginWithUID,
        logout,
        deleteAccount,
        getCurrentAccount: currentAccount,

        claimDailyBonus,

        openBook,
        openChapter,
        showBooks,
        showChapters,
        startQuiz,
        submitQuiz,

        purchaseVideo,
        playVideo,
        closeVideo,

        buyPass,

        startGame,
        flap
    };

})();

window.KS = KS;

document.addEventListener(
    "DOMContentLoaded",
    KS.start
);