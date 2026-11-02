Star Bites Website - Part 3

Project Overview

Star Bites is a family-friendly dessert business based in Soshanguve. The website provides information about the business, its products, prices, enquiries and contact details. The purpose of the website is to make it easier for customers to learn about the business, view available products and contact the organisation.

Website Pages

The website consists of five main HTML pages:

* index.html - The home page, which introduces the business and includes frequently asked questions.
* about.html - Provides information about the business, its background, mission and values.
* products.html - Displays the available products and their prices, with JavaScript features for searching, filtering and sorting.
* enquiry.html - Allows customers to submit product and service enquiries.
* contact.html - Provides the business contact information, an interactive map and a general contact form.

Main Project Files

* styles.css - The external CSS file used for the website’s colours, fonts, layouts, animations and responsive design.
* apps.js - The JavaScript file used for website functionality, product display, form validation, interactive tabs, FAQ accordion and image lightbox.
* images/ - Contains the logo and product images used throughout the website.
* robots.txt - Provides instructions for search engine crawlers.
* sitemap.xml - Lists the website pages to help search engines find the website.
* CHANGELOG.md - Records the changes and improvements made during Part 3.

How to Run the Website

1. Open the Star Bites project folder in Visual Studio Code.
2. Make sure all five HTML pages, styles.css and apps.js are in the main project folder.
3. Keep the existing images folder and its images in the project.
4. Make sure the following JavaScript reference is included in each HTML page, before the closing body tag:
    <script src="apps.js" defer></script>
5. Open index.html in a web browser or use the Live Server extension in Visual Studio Code.
6. Test the navigation links, product features, forms and other interactive elements.

JavaScript Functionality

JavaScript was added to improve the functionality and interaction of the website. The main features include:

* Product search to help customers find specific products.
* Category filtering to display products from selected categories.
* Sorting products by name or price.
* An image lightbox that allows customers to view product images in a larger format.
* Interactive tabs on the About Us page.
* An FAQ accordion on the Home page.
* An enquiry price estimate that changes according to the selected product and quantity.
* Form validation to check customer information before submission.
* Success and error messages to provide feedback when forms are submitted.

Forms and Email Configuration

The website includes two forms: a product and service enquiry form and a general contact form.

The forms use HTML validation, JavaScript validation and the FormSubmit AJAX service to process submissions.

The recipient email address has been configured in apps.js. The first submission may require email confirmation through FormSubmit before submissions can be delivered.

An internet connection is required when using the online form service.

SEO Improvements

The following search engine optimisation improvements were included:

* Unique page titles and meta descriptions.
* Relevant keywords for the website pages.
* Descriptive alternative text for images.
* A clear heading structure.
* Internal links between website pages.
* A robots.txt file and an XML sitemap.
* Lazy loading for product images.

Before publishing the website, replace the placeholder domain in robots.txt and sitemap.xml with the final published website address.

Performance and Security

The website includes several improvements to support performance and safer user interaction:

* An external CSS file is used to keep styling separate from HTML.
* An external JavaScript file is used to manage interactive features.
* Product images are loaded with responsive image settings and lazy loading where appropriate.
* Form fields include required fields and input limits.
* JavaScript validation checks the information entered by customers.
* User-entered form information is handled as form data rather than being inserted directly into the page as HTML.
* External links that open in a new tab use appropriate security attributes.
* HTTPS should be used when the website is published.
* Passwords, private API keys and payment details should not be stored in client-side JavaScript.

The map and online form service require an internet connection.

Responsive Design

The website uses responsive CSS to make the pages suitable for different screen sizes.

The stylesheet includes:

* Desktop layout as the default design.
* Tablet breakpoint at 900px.
* Mobile breakpoint at 600px.
* Small mobile breakpoint at 400px.
* A reduced-motion setting for users who prefer less animation.

Testing Checklist

* [ ]	All five HTML pages open correctly.
* [ ]	Navigation links work between the pages.
* [ ]	The logo and product images display correctly.
* [ ]	The website styling appears on all pages.
* [ ]	Product search works correctly.
* [ ]	Product category filtering works.
* [ ]	Product sorting works by name and price.
* [ ]	Product images open and close in the lightbox.
* [ ]	About page tabs display the correct information.
* [ ]	Home page FAQ accordion opens and closes.
* [ ]	Enquiry form validates customer information.
* [ ]	Enquiry price estimate updates when the product or quantity changes.
* [ ]	Contact form validates the information entered.
* [ ]	Form submissions work after email activation.
* [ ]	The interactive map loads when an internet connection is available.
* [ ]	The website is tested on desktop, tablet and mobile screen sizes.

GitHub and Deployment

The website can be uploaded to GitHub for version control and published using a static hosting service such as GitHub Pages or Netlify.

1. Create or open the Star Bites GitHub repository.
2. Upload all HTML, CSS and JavaScript files, together with the images folder.
3. Commit the changes using a descriptive message, such as Complete Part 3 website improvements.
4. Enable GitHub Pages or deploy the website through Netlify.
5. Update the sitemap and robots file with the final published website address.