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
    cy.get(".movie").each(($el, index) => {
      const title = $el.find(".themoviedb-name").text().replace("...", "").trim();
      cy.wrap($el).click();
      cy.get(".detail-name").eq(index).should("include.text", title);
    });
  });

  // Check if an user can click the load more button
  it("can click on load more button", () => {
    cy.get(".loadable").click();
  });
});
