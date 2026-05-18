const body = document.body;
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const topStrip = document.createElement("div");
topStrip.className = "top-strip";
topStrip.innerHTML = "<span>Enugu State Government</span><span>Office of Donor Relations</span>";
body.prepend(topStrip);

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
body.appendChild(backToTop);

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuToggle.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
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

    const bgCurrent = document.createElement("div");
    const bgNext = document.createElement("div");
    bgCurrent.className = "hero-bg active";
    bgNext.className = "hero-bg";
    hero.prepend(bgNext);
    hero.prepend(bgCurrent);

    let heroIndex = 0;
    let showingCurrent = true;

    function changeHero() {
        const visible = showingCurrent ? bgCurrent : bgNext;
        const hidden = showingCurrent ? bgNext : bgCurrent;

        hidden.style.backgroundImage = `url(${heroImages[heroIndex]})`;
        hidden.classList.add("active");
        visible.classList.remove("active");

        showingCurrent = !showingCurrent;
        heroIndex = (heroIndex + 1) % heroImages.length;
    }

    bgCurrent.style.backgroundImage = `url(${heroImages[0]})`;
    heroIndex = 1;
    setInterval(changeHero, 6000);
}

const revealItems = document.querySelectorAll("section, .project-item, .project-card, .priority, .metric-card, .story-card, .leader-card");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".projects-page .project-item[data-category]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        projectItems.forEach((item) => {
            item.hidden = filter !== "all" && item.dataset.category !== filter;
        });
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const formMessage = contactForm.querySelector(".form-message");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.elements.name.value.trim();
        const email = contactForm.elements.email.value.trim();
        const message = contactForm.elements.message.value.trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        formMessage.className = "form-message";

        if (!name || !email || !message) {
            formMessage.textContent = "Please complete all fields before sending.";
            formMessage.classList.add("error");
            return;
        }

        if (!emailValid) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.classList.add("error");
            return;
        }

        if (message.length < 10) {
            formMessage.textContent = "Please enter a message of at least 10 characters.";
            formMessage.classList.add("error");
            return;
        }

        formMessage.textContent = "Thank you. Your message is ready, but this static demo still needs a form service to deliver it.";
        formMessage.classList.add("success");
        contactForm.reset();
    });
}

const readButtons = document.querySelectorAll(".news-read-btn");

if (readButtons.length) {
    const modal = document.createElement("div");
    modal.className = "news-modal";
    modal.innerHTML = `
        <div class="news-modal-card" role="dialog" aria-modal="true" aria-labelledby="news-modal-title">
            <button class="modal-close" type="button" aria-label="Close news detail">&times;</button>
            <span class="section-label">News & Media</span>
            <h2 id="news-modal-title"></h2>
            <p></p>
        </div>
    `;
    body.appendChild(modal);

    const modalTitle = modal.querySelector("h2");
    const modalBody = modal.querySelector("p");
    const modalClose = modal.querySelector(".modal-close");

    function closeModal() {
        modal.classList.remove("open");
        body.classList.remove("modal-open");
    }

    readButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modalTitle.textContent = button.dataset.title;
            modalBody.textContent = button.dataset.body;
            modal.classList.add("open");
            body.classList.add("modal-open");
            modalClose.focus();
        });
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 420);
    header.classList.toggle("scrolled", window.scrollY > 20);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
