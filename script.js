// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
	navLinks.classList.toggle("open");

	menuToggle.textContent = navLinks.classList.contains("open")
		? "✕"
		: "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("open");
		menuToggle.textContent = "☰";
	});
});


// Favorite property buttons
document.querySelectorAll(".favorite-button").forEach(button => {
	button.addEventListener("click", () => {
		button.classList.toggle("is-favorite");

		button.textContent = button.classList.contains("is-favorite")
			? "♥"
			: "♡";

		button.setAttribute(
			"aria-pressed",
			button.classList.contains("is-favorite")
		);
	});
});


// Property search
const propertySearch = document.getElementById("propertySearch");
const searchMessage = document.getElementById("searchMessage");
const resultsMessage = document.getElementById("resultsMessage");

propertySearch.addEventListener("submit", event => {
	event.preventDefault();

	const location = document
		.getElementById("location")
		.value.trim()
		.toLowerCase();

	const propertyType = document.getElementById("propertyType").value;
	const budget = document.getElementById("budget").value;
	const listingType = document.getElementById("listingType").value;

	const cards = [...document.querySelectorAll(".property-card")];

	let visibleCount = 0;

	cards.forEach(card => {
		const cardLocation = card.dataset.location;
		const cardType = card.dataset.type;
		const cardPrice = Number(card.dataset.price);
		const cardListing = card.dataset.listing;

		const matchesLocation =
			!location || cardLocation.includes(location);

		const matchesType =
			propertyType === "all" || cardType === propertyType;

		const matchesBudget =
			budget === "all" || cardPrice <= Number(budget);

		const matchesListing =
			listingType === "all" || cardListing === listingType;

		const isMatch =
			matchesLocation &&
			matchesType &&
			matchesBudget &&
			matchesListing;

		card.hidden = !isMatch;

		if (isMatch) visibleCount++;
	});

	searchMessage.textContent =
		visibleCount === 0
			? "No matching properties in our sample listings. Try changing your filters."
			: `${visibleCount} matching sample ${visibleCount === 1 ? "property" : "properties"} found.`;

	resultsMessage.textContent = searchMessage.textContent;

	document.getElementById("properties").scrollIntoView({
		behavior: "smooth"
	});
});


// Property details buttons
document.querySelectorAll(".details-button").forEach(button => {
	button.addEventListener("click", () => {
		const propertyName = button.dataset.property;

		alert(
			`${propertyName}\n\n` +
			"This is a demonstration property listing.\n" +
			"Property details and enquiry functionality can be added next."
		);
	});
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.querySelector(
            'input[type="text"]'
        )?.value.trim();

        const email = contactForm.querySelector(
            'input[type="email"]'
        )?.value.trim();

        const message = contactForm.querySelector(
            "textarea"
        )?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        alert(
            `Thank you, ${name}! Your enquiry has been prepared.`
        );

        contactForm.reset();
    });
}

const propertyGrid = document.getElementById("property-grid");

if (propertyGrid) {
    const cards = [...propertyGrid.querySelectorAll(".property-card")];
    const search = document.getElementById("property-search");
    const typeFilter = document.getElementById("type-filter");
    const purposeFilter = document.getElementById("purpose-filter");
    const resetButton = document.getElementById("reset-filters");
    const resultsCount = document.getElementById("results-count");
    const noResults = document.getElementById("no-results");

    function filterProperties() {
        const term = search.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach(card => {
            const matchesSearch =
                card.dataset.search.includes(term);

            const matchesType =
                typeFilter.value === "all" ||
                card.dataset.type === typeFilter.value;

            const matchesPurpose =
                purposeFilter.value === "all" ||
                card.dataset.purpose === purposeFilter.value;

            const show =
                matchesSearch && matchesType && matchesPurpose;

            card.hidden = !show;
            if (show) visible++;
        });

        resultsCount.textContent =
            `${visible} propert${visible === 1 ? "y" : "ies"} found`;

        noResults.hidden = visible !== 0;
    }

    search.addEventListener("input", filterProperties);
    typeFilter.addEventListener("change", filterProperties);
    purposeFilter.addEventListener("change", filterProperties);

    resetButton.addEventListener("click", () => {
        search.value = "";
        typeFilter.value = "all";
        purposeFilter.value = "all";
        filterProperties();
    });

    propertyGrid.addEventListener("click", event => {
        const button = event.target.closest(".favorite-btn");
        if (!button) return;

        const isSaved = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!isSaved));
        button.textContent = isSaved ? "♡ Save" : "♥ Saved";
    });

    filterProperties();
}
