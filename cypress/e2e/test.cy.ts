describe("empty spec", () => {
  // Load the website for every test
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // Check if user can see the home page title
  it("has the title of the first page", () => {
    cy.get("header").contains("Themoviedb API Favorite List");
  });

  // Check if the home page has movie items
  it("has movie items", () => {
    cy.get(".movie").should("have.length.at.least", 1);
  });

  // Check if an user can click a single movie item and see the diplay
  it("can click each movie item and returns single item display", () => {
    cy.get(".movie").each(($el) => {
      const title = $el
        .find(".themoviedb-name")
        .text()
        .replace("...", "")
        .trim();
      cy.wrap($el).click();
      cy.wrap($el).get(".detail-name").should("include.text", title);
      cy.get('.detail-close').click();
    });
  });

  // Check if an user can click the load more button
  it("can click on load more button", () => {
    cy.get(".loadable").click();
  });


  // Check if user can type keyword to search and if matched results returned
  it("searches by typing the keyword to the search field and returns matched results", () => {
    cy.get(".search-input").should("be.visible").type("New York");

    cy.get(".movie").each(($el) => {
      cy.wrap($el).click();
      cy.wrap($el).get(".detail-name").should("include.text", "New York");
      cy.get('.detail-close').click();
    });
  });
});
