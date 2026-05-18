const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuToggle.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
}

const hero = document.querySelector(".hero");

if (hero) {
    const heroImages = [
        "FB_IMG_1773051484138.jpg",
        "dubemonyia.jpg",
        "petermbah.jpg",
        "Gemini_Generated_Image_9sivd39sivd39siv.png"
    ];

    let heroIndex = 0;

    function changeHero() {
        hero.style.backgroundImage = `url(${heroImages[heroIndex]})`;
        heroIndex = (heroIndex + 1) % heroImages.length;
    }

    changeHero();
    setInterval(changeHero, 6000);
}
