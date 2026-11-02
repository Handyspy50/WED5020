// ==========================================
// STAR BITES WEBSITE
// JAVASCRIPT FUNCTIONALITY
// ==========================================


// Enter the email address that should receive enquiries.
const STARBITES_EMAIL = "YOUR_EMAIL_ADDRESS_HERE";


// ==========================================
// 1. PRODUCT INFORMATION
// ==========================================

const products = [
    {
        id: 1,
        name: "Bubble Waffles",
        category: "Waffles",
        description: "Fresh waffles with scoops of ice cream, fully loaded with toppings.",
        price: 35,
        image: "images/banana waffle.png.jpg",
        alt: "Banana bubble waffle"
    },
    {
        id: 2,
        name: "Oreo Bubble Waffle",
        category: "Waffles",
        description: "A bubble waffle served with a delicious Oreo-inspired topping.",
        price: 35,
        image: "images/og waffle.jpg.jpg",
        alt: "Oreo bubble waffle"
    },
    {
        id: 3,
        name: "Chocolate Bubble Waffle",
        category: "Waffles",
        description: "A freshly made waffle with chocolate flavour and sweet toppings.",
        price: 35,
        image: "images/chocolate waffle.png.jpg",
        alt: "Chocolate bubble waffle"
    },
    {
        id: 4,
        name: "Milkshakes",
        category: "Drinks",
        description: "Rich and creamy milkshakes in Strawberry Starburst, Blue Moon Shake and Choco Nova flavours.",
        price: 25,
        image: "images/drinks.jpg.jpg",
        alt: "Star Bites milkshakes"
    },
    {
        id: 5,
        name: "Refreshers",
        category: "Drinks",
        description: "Refreshing drinks, including Blueberry Refresher, Watermelon Spritz and Mojito.",
        price: 15,
        image: "images/drinks.jpg.jpg",
        alt: "Star Bites refreshing drinks"
    },
    {
        id: 6,
        name: "Combo",
        category: "Combos",
        description: "Enjoy a delightful combination of bubble waffles and a refreshing drink.",
        price: 45,
        image: "images/sweet waffle.png.jpg",
        alt: "Star Bites waffle combo"
    }
];


// ==========================================
// 2. FORM MESSAGE
// ==========================================

function showFormMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className = "form-message show " + type;
}


// ==========================================
// 3. PHONE NUMBER VALIDATION
// ==========================================

function validSouthAfricanPhone(phone) {

    const cleanedPhone = phone.replace(/[\s-]/g, "");

    return /^(0[6-8][0-9]{8}|\+27[6-8][0-9]{8})$/.test(cleanedPhone);
}


// ==========================================
// 4. FORM VALIDATION
// ==========================================

function validateForm(form) {

    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const phone = form.querySelector('input[name="phone"]');

    if (phone && phone.value.trim()) {

        if (!validSouthAfricanPhone(phone.value.trim())) {

            phone.setCustomValidity(
                "Enter a valid South African mobile number, for example 0712345678 or +27712345678."
            );

            phone.reportValidity();
            phone.setCustomValidity("");

            return false;
        }
    }

    return true;
}


// ==========================================
// 5. SEND FORM THROUGH FORMSUBMIT
// ==========================================

async function submitFormWithAjax(form, messageElement, subject) {

    if (!validateForm(form)) {
        return;
    }

    if (!STARBITES_EMAIL ||
        STARBITES_EMAIL === "YOUR_EMAIL_ADDRESS_HERE") {

        showFormMessage(
            messageElement,
            "Please enter the correct email address in apps.js before sending.",
            "error"
        );

        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    const originalText = submitButton
        ? submitButton.textContent
        : "Submit";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    }

    const formData = Object.fromEntries(
        new FormData(form).entries()
    );

    formData._subject = subject;
    formData._template = "table";

    try {

        const response = await fetch(
            "https://formsubmit.co/ajax/" +
            encodeURIComponent(STARBITES_EMAIL),
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(formData)
            }
        );

        const result = await response.json();

        if (!response.ok ||
            result.success === false ||
            result.success === "false") {

            throw new Error("The message could not be sent.");
        }

        showFormMessage(
            messageElement,
            "Thank you! Your message has been submitted successfully.",
            "success"
        );

        form.reset();

        if (form.id === "enquiry-form") {
            updateEstimate();
        }

    } catch (error) {

        showFormMessage(
            messageElement,
            "Your message could not be sent. Please check your internet connection and try again.",
            "error"
        );

    } finally {

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
}


// ==========================================
// 6. DISPLAY PRODUCTS
// ==========================================

function initialiseProducts() {

    const grid = document.getElementById("product-list");

    if (!grid) {
        return;
    }

    const search = document.getElementById("product-search");
    const category = document.getElementById("product-category");
    const sort = document.getElementById("product-sort");

    if (!search || !category || !sort) {
        return;
    }


    function renderProducts() {

        const term = search.value.trim().toLowerCase();

        let visibleProducts = products.filter(product => {

            const searchableText =
                product.name + " " +
                product.description + " " +
                product.category;

            const matchesSearch =
                searchableText.toLowerCase().includes(term);

            const matchesCategory =
                category.value === "All" ||
                product.category === category.value;

            return matchesSearch && matchesCategory;
        });


        // Sort products.

        if (sort.value === "price-low") {

            visibleProducts.sort(
                (a, b) => a.price - b.price
            );

        } else if (sort.value === "price-high") {

            visibleProducts.sort(
                (a, b) => b.price - a.price
            );

        } else if (sort.value === "name") {

            visibleProducts.sort(
                (a, b) => a.name.localeCompare(b.name)
            );
        }


        // Clear the old products.

        grid.replaceChildren();


        // Display a message if there are no results.

        if (visibleProducts.length === 0) {

            const message = document.createElement("p");

            message.className = "no-results";

            message.textContent =
                "No products match your search. Please try another word or category.";

            grid.appendChild(message);

            return;
        }


        // Create each product card.

        visibleProducts.forEach(product => {

            const card = document.createElement("article");

            card.className = "product-row";


            const information = document.createElement("div");

            information.className = "product-information";


            const heading = document.createElement("h2");

            heading.textContent = product.name + " ";


            const price = document.createElement("span");

            price.className = "price";

            price.textContent =
                "R" + product.price.toFixed(2);

            heading.appendChild(price);


            const description = document.createElement("p");

            description.textContent = product.description;


            const categoryText = document.createElement("p");

            categoryText.className = "form-help";

            categoryText.textContent =
                "Category: " + product.category;


            const enquiryLink = document.createElement("a");

            enquiryLink.className = "button-link";

            enquiryLink.href =
                "enquiry.html?product=" +
                encodeURIComponent(product.name);

            enquiryLink.textContent =
                "Enquire about this product";


            information.appendChild(heading);
            information.appendChild(description);
            information.appendChild(categoryText);
            information.appendChild(enquiryLink);


            const imageContainer = document.createElement("div");

            imageContainer.className = "product-image";


            const image = document.createElement("img");

            image.src = product.image;
            image.alt = product.alt;
            image.loading = "lazy";
            image.tabIndex = 0;
            image.dataset.lightbox = "true";


            imageContainer.appendChild(image);

            card.appendChild(information);
            card.appendChild(imageContainer);

            grid.appendChild(card);
        });
    }


    // Search, filter and sort events.

    search.addEventListener("input", renderProducts);

    category.addEventListener("change", renderProducts);

    sort.addEventListener("change", renderProducts);


    // Show products when page loads.

    renderProducts();
}


// ==========================================
// 7. CALCULATE ENQUIRY ESTIMATE
// ==========================================

function updateEstimate() {

    const productSelect =
        document.getElementById("enquiry-product");

    const quantityInput =
        document.getElementById("quantity");

    const estimate =
        document.getElementById("estimate-total");


    if (!productSelect || !quantityInput || !estimate) {
        return;
    }


    const selectedProduct = products.find(product =>
        product.name === productSelect.value
    );

    const quantity = Number(quantityInput.value);


    if (!selectedProduct) {

        estimate.textContent =
            "Select a product to calculate.";

        return;
    }


    if (!Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 100) {

        estimate.textContent =
            "Enter a quantity between 1 and 100.";

        return;
    }


    const total = selectedProduct.price * quantity;

    estimate.textContent =
        "R" + total.toFixed(2);
}


// ==========================================
// 8. ENQUIRY FORM
// ==========================================

function initialiseEnquiryForm() {

    const form = document.getElementById("enquiry-form");

    if (!form) {
        return;
    }

    const productSelect =
        document.getElementById("enquiry-product");


    // Select a product automatically when
    // a customer arrives from the Products page.

    const requestedProduct =
        new URLSearchParams(window.location.search)
            .get("product");


    if (requestedProduct && productSelect) {

        const matchingOption = Array.from(
            productSelect.options
        ).find(option => option.value === requestedProduct);

        if (matchingOption) {
            productSelect.value = requestedProduct;
        }
    }


    // Submit the enquiry.

    form.addEventListener("submit", event => {

        event.preventDefault();

        submitFormWithAjax(
            form,
            document.getElementById("enquiry-feedback"),
            "Star Bites Product or Service Enquiry"
        );
    });


    // Update estimated price.

    form.addEventListener("input", updateEstimate);

    form.addEventListener("change", updateEstimate);

    updateEstimate();
}


// ==========================================
// 9. CONTACT FORM
// ==========================================

function initialiseContactForm() {

    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }


    form.addEventListener("submit", event => {

        event.preventDefault();

        submitFormWithAjax(
            form,
            document.getElementById("contact-feedback"),
            "Message from the Star Bites Website"
        );
    });
}


// ==========================================
// 10. ABOUT PAGE TABS
// ==========================================

function initialiseTabs() {

    const buttons =
        document.querySelectorAll("[data-tab-button]");

    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove the active state from all buttons.

            buttons.forEach(item => {
                item.setAttribute("aria-selected", "false");
            });


            // Hide all tab panels.

            document.querySelectorAll("[data-tab-panel]")
                .forEach(panel => {
                    panel.hidden = true;
                });


            // Activate the selected button.

            button.setAttribute("aria-selected", "true");


            // Show the selected panel.

            const panel = document.getElementById(
                button.dataset.tabButton
            );

            if (panel) {
                panel.hidden = false;
            }
        });
    });
}


// ==========================================
// 11. HOME PAGE FAQ ACCORDION
// ==========================================

function initialiseAccordion() {

    document.querySelectorAll("[data-accordion-button]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item = button.closest(".faq-item");

                const answer = item.querySelector(".faq-answer");

                const isExpanded =
                    button.getAttribute("aria-expanded") === "true";


                button.setAttribute(
                    "aria-expanded",
                    String(!isExpanded)
                );


                item.classList.toggle("active", !isExpanded);


                if (answer) {
                    answer.hidden = isExpanded;
                }
            });
        });
}


// ==========================================
// 12. PRODUCT IMAGE LIGHTBOX
// ==========================================

function initialiseLightbox() {

    const lightbox =
        document.getElementById("image-lightbox");

    const largeImage =
        document.getElementById("lightbox-image");

    const closeButton =
        document.getElementById("lightbox-close");


    if (!lightbox || !largeImage || !closeButton) {
        return;
    }


    function openLightbox(image) {

        largeImage.src = image.src;

        largeImage.alt = image.alt;

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        closeButton.focus();
    }


    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

        largeImage.src = "";

        largeImage.alt = "";
    }


    // Open image when clicked.

    document.addEventListener("click", event => {

        const image = event.target.closest(
            'img[data-lightbox="true"]'
        );

        if (image) {
            openLightbox(image);
        }
    });


    // Close using Escape.

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" &&
            lightbox.classList.contains("open")) {

            closeLightbox();
        }


        // Allow keyboard users to open images.

        const image = event.target.closest &&
            event.target.closest('img[data-lightbox="true"]');

        if (image &&
            (event.key === "Enter" || event.key === " ")) {

            event.preventDefault();

            openLightbox(image);
        }
    });


    closeButton.addEventListener("click", closeLightbox);


    // Close when clicking outside the image.

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}


// ==========================================
// 13. START WEBSITE FEATURES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initialiseProducts();

    initialiseEnquiryForm();

    initialiseContactForm();

    initialiseTabs();

    initialiseAccordion();

    initialiseLightbox();

});