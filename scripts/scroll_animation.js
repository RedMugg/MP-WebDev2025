document.addEventListener("DOMContentLoaded", () => {
    const totalSlides = 3;
    let currentSlide = 1;
    let isAnimating = false;
    let scrollAllowed = true;
    let lastScrollTime = 0;

    const slideTitles = [
        "Echoes of Light",
        "Fragments of Silence",
        "Dreamscape Horizon",
        "The Geometry of Emotion",
        "Whispers in Color",
        "Temporal Reflections",
        "Beyond the Canvas"
    ];

    const slideDescriptions = [
        "Light dancing through space",
        "Quiet moments in motion",
        "Surreal dreamlike perspectives",
        "Emotions shaped by form",
        "Colors speak in silence",
        "Time mirrored in art",
        "Imagination beyond boundaries"
    ];

    function createSlide(slideNumber, direction) {
        const slide = document.createElement("div");
        slide.className = "slide";

        const slideBgImg = document.createElement("div");
        slideBgImg.className = "slideBgImg";

        const img = document.createElement("img");
        img.src = `./images/img${slideNumber}.jpg`;
        img.alt = "";

        slideBgImg.appendChild(img);
        slide.appendChild(slideBgImg);

        if (direction === "down") {
            slideBgImg.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        } else {
            slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        }

        return slide;
    }

    function createMainImageWrapper(slideNumber, direction) {
        const wrapper = document.createElement("div");
        wrapper.className = "slideMainImgWrapper";

        const img = document.createElement("img");
        img.src = `./images/img${slideNumber}.jpg`;
        img.alt = "";

        wrapper.appendChild(img);

        if (direction === "down") {
            wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        } else {
            wrapper.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        }

        return wrapper;
    }

    function createTextElements(slideNumber, direction) {
        const newTitle = document.createElement("h1");
        newTitle.textContent = slideTitles[slideNumber - 1];
        gsap.set(newTitle, {
            y: direction === "down" ? 50 : -50,
        });

        const newDescription = document.createElement("p");
        newDescription.textContent = slideDescriptions[slideNumber - 1];
        gsap.set(newDescription, {
            y: direction === "down" ? 20 : -20,
        });

        const newCounter = document.createElement("p");
        newCounter.textContent = slideNumber;
        gsap.set(newCounter, {
            y: direction === "down" ? 18 : -18,
        });

        return { newTitle, newDescription, newCounter };
    }

    function animateSlide(direction) {
        if (isAnimating || !scrollAllowed) return;

        isAnimating = true;
        scrollAllowed = false;

        const slider = document.querySelector(".slider");
        const currentSlideElement = slider.querySelector(".slide");
        const mainImageContainer = document.querySelector(".slideMainImg");
        const currentMainWrapper = mainImageContainer.querySelector(".slideMainImgWrapper");

        const titleContainer = document.querySelector(".slideTitle");
        const descriptionContainer = document.querySelector(".slideDescription");
        const counterContainer = document.querySelector(".count");

        const currenTitle = titleContainer.querySelector("h1");
        const currentDescription = descriptionContainer.querySelector("p");
        const currentCounter = counterContainer.querySelector("p");

        if ((direction === "down" && currentSlide === totalSlides) ||
            (direction === "up" && currentSlide === 1)) {
            isAnimating = false;
            scrollAllowed = true;
            return;
        }

        currentSlide += direction === "down" ? 1 : -1;

        const newSlide = createSlide(currentSlide, direction);
        const newMainWrapper = createMainImageWrapper(currentSlide, direction);
        const { newTitle, newDescription, newCounter } = createTextElements(currentSlide, direction);

        slider.appendChild(newSlide);
        mainImageContainer.appendChild(newMainWrapper);
        titleContainer.appendChild(newTitle);
        descriptionContainer.appendChild(newDescription);
        counterContainer.appendChild(newCounter);

        gsap.set(newMainWrapper.querySelector("img"), {
            y: direction === "down" ? "-50%" : "50%",
        });

        const tl = gsap.timeline({
            onComplete: () => {
                [
                    currentSlideElement,
                    currentMainWrapper,
                    currenTitle,
                    currentDescription,
                    currentCounter
                ].forEach((el) => el?.remove());

                isAnimating = false;
                setTimeout(() => {
                    scrollAllowed = true;
                    lastScrollTime = Date.now();
                }, 100);
            },
        });

        tl.to(
            newSlide.querySelector(".slideBgImg"),
            {
                clipPath:
                    direction === "down"
                        ? "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            },
            0
        )
            .to(currentSlideElement.querySelector("img"), {
                scale: 1.5,
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(newMainWrapper, {
                clipPath:
                    direction === "down"
                        ? "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)"
                        : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(currentMainWrapper.querySelector("img"), {
                y: direction === "down" ? "50%" : "-50%",
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(newMainWrapper.querySelector("img"), {
                y: "0%",
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(currenTitle, {
                y: direction === "down" ? -50 : 50,
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(newTitle, {
                y: 0,
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(currentDescription, {
                y: direction === "down" ? -20 : 20,
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0)
            .to(currentCounter, {
                y: direction === "down" ? -18 : 18,
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            }, 0);
    }

    function removeScrollListeners() {
        window.removeEventListener("wheel", wheelHandler, { passive: false });
        window.removeEventListener("touchmove", touchMoveHandler, { passive: false });
    }

    function handScroll(direction) {
        const now = Date.now();
        if (isAnimating || !scrollAllowed) return;
        if (now - lastScrollTime < 1000) return;
        lastScrollTime = now;

        if (direction === "down" && currentSlide === totalSlides) {
            removeScrollListeners();
            return;
        }

        if (direction === "up" && currentSlide === 1) {
            removeScrollListeners();
            return;
        }

        animateSlide(direction);
    }

    // Named handlers so we can remove them later
    function wheelHandler(e) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? "down" : "up";
        handScroll(direction);
    }

    function touchMoveHandler(e) {
        e.preventDefault();
        if (!isTouchActive || isAnimating || !scrollAllowed) return;
        const touchCurrentY = e.touches[0].clientY;
        const difference = touchStartY - touchCurrentY;
        if (Math.abs(difference) > 10) {
            isTouchActive = false;
            const direction = difference > 0 ? "down" : "up";
            handScroll(direction);
        }
    }

    // Add listeners
    window.addEventListener("wheel", wheelHandler, { passive: false });

    let touchStartY = 0;
    let isTouchActive = false;

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
        isTouchActive = true;
    }, { passive: false });

    window.addEventListener("touchmove", touchMoveHandler, { passive: false });

    window.addEventListener("touchend", () => {
        isTouchActive = false;
    });
});






