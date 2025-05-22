import "cypress-xpath";

describe("Navigation and Collection Management Tests with Cypress", () => {
  const selectors = {
    myAgents: {
      name: "My Agents",
      pathname: "/workspace/my-agents",
    },
    recommendations: {
      pathname: "/workspace/recommendations",
    },
    myWorkspace: {
      name: "My Workspace",
      sections: [
        {
          name: "Collections",
          pathname: "/workspace/collections",
          createCollection: "Create collection",
          editCollection: "Edit collection",
          collectionName1: `Rubina's collection 1`,
          collectionName2: `Rubina's collection 2`,
        },
        {
          name: "Inspirations",
          pathname: "/workspace/inspirations",
        },
        {
          name: "Likes",
          pathname: "/workspace/liked-homes",
        },
        {
          name: "Saved searches",
          pathname: "/workspace/saved-searches",
        },
      ],
    },
  };

  const getCollectionNameInput = () =>
    cy.xpath("//input[@placeholder='Type collection name']");

  const findCollectionCard = (name: string) =>
    cy.xpath(`//p[text()="${name}"]`);

  const openMyWorkspaceSection = (sectionName: string) => {
    cy.contains("p", selectors.myWorkspace.name).parents("button").click();
    cy.contains("a", sectionName).parents("li").click();
  };

  const openCollectionContextMenu = (name: string) => {
    findCollectionCard(name)
      .parentsUntil('[class*="CollectionCard"]')
      .parent()
      .next()
      .find("button")
      .first()
      .click();
  };

  const openCollectionEditModal = (name: string) => {
    openCollectionContextMenu(name);
    cy.contains("p", selectors.myWorkspace.sections[0].editCollection)
      .parents("li")
      .click();
  };

  const checkPathName = (pathname: string) => {
    cy.location("pathname").should("eq", pathname);
  };

  const createCollection = (name: string) => {
    cy.contains("p", selectors.myWorkspace.sections[0].createCollection)
      .parents("button")
      .click();
    getCollectionNameInput().type(name);
    cy.xpath("//p[@data-tooltip-content='Create']").click();
    findCollectionCard(name).should("exist").and("contain.text", name);
  };

  const editCollectionName = (oldName: string, newName: string) => {
    openCollectionEditModal(oldName);
    getCollectionNameInput().clear().type(newName);
    cy.xpath("//p[@data-tooltip-content='Save']").click();
    findCollectionCard(newName).should("exist").and("contain.text", newName);
  };

  const deleteCollection = (name: string) => {
    openCollectionEditModal(name);
    cy.xpath("//p[@data-tooltip-content='Delete collection']").click();
    cy.xpath("//p[@data-tooltip-content='Delete']").click();
    findCollectionCard(name).should("not.exist");
  };

  beforeEach(() => {
    cy.visit("/");
    cy.origin("https://elliman.auth.purlin.tech/", () => {
      cy.get("#email").type("rubina_s+700@purlin.com");
      cy.get("form").submit();
      cy.get("#password").should("exist");
      cy.get("#password").type("Rubina5!");
      cy.get("form").submit();
    });
  });

  it("Verify the url components after log in", () => {
    cy.location().should((loc) => {
      expect(loc.host).to.eq("mcw-de.purlin.tech");
      expect(loc.hostname).to.eq("mcw-de.purlin.tech");
      expect(loc.href).to.eq(
        "https://mcw-de.purlin.tech/workspace/recommendations",
      );
      expect(loc.origin).to.eq("https://mcw-de.purlin.tech");
      expect(loc.pathname).to.eq("/workspace/recommendations");
      expect(loc.protocol).to.eq("https:");
      expect(loc.superDomain).to.eq("purlin.tech");
      expect(loc.superDomainOrigin).to.eq("https://purlin.tech");
    });
    cy.title().should("eq", "Elliman Inspirations");
  });

  it("Verify workspace navigations", () => {
    cy.contains("p", selectors.myAgents.name).parents("a").click();
    checkPathName(selectors.myAgents.pathname);
    cy.go("back");
    checkPathName(selectors.recommendations.pathname);

    selectors.myWorkspace.sections.forEach((section) => {
      openMyWorkspaceSection(section.name);
      checkPathName(section.pathname);
    });
  });

  it("Verify the collections CRUD functionality", () => {
    const { collectionName1, collectionName2, name } =
      selectors.myWorkspace.sections[0];

    openMyWorkspaceSection(name);

    createCollection(collectionName1);

    editCollectionName(collectionName1, collectionName2);

    deleteCollection(collectionName2);
  });
});
