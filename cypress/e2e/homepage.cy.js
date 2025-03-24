Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('play() request was interrupted')) {
    return false; // Prevent Cypress explicitly failing tests due to video pause errors
  }
  return true; // Allow Cypress to explicitly handle all other errors legitimately
});


describe('Telnyx Verified Cypress Tests', () => {

  beforeEach(() => {
    cy.visit('https://telnyx.com/');
    cy.viewport(1280, 720);
    cy.get('body').should('be.visible');

    // Optional close cookie popup if present
    cy.get('body').then(($body) => {
      if ($body.find('[aria-label="close and deny"]').length > 0) {
        cy.get('[aria-label="close and deny"]').click({ force: true });
      }
    });
  });

  it('TC_001 - Verify Homepage Loads Correctly', () => {
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('TC_002 - Check Primary Navigation', () => {
    // Click to open the submenu explicitly
    cy.get('header button').contains('Products').click({ force: true });

    cy.get('header').within(() => {
      cy.contains('a', 'SIP Trunking', { timeout: 15000 })
          .should('be.visible')
          .click({ force: true });
    });

    // Verify page URL and heading explicitly with timeout
    cy.url({ timeout: 15000 }).should('include', '/products/sip-trunks');
    cy.get('h1', { timeout: 15000 }).should('contain', 'SIP Trunking');
  });



  it('TC_003 – Verify Sign-Up page navigation is working', () => {

    cy.get('main').contains('Sign up', { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

    cy.url({ timeout: 15000 })
        .should('include', '/sign-up');

    cy.get('form').first().within(() => {
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');

      cy.get('button[type="submit"]')
          .should('be.visible')
          .and('contain.text', 'SIGN UP');
    });

    cy.get('h1', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'Create a Telnyx account');
  });





  it('TC_004 - Footer Social Media Links', () => {
    const socials = ['LinkedIn', 'Twitter', 'Facebook'];
    socials.forEach((social) => {
      cy.get('footer').within(() => {
        cy.get(`a[href*="${social.toLowerCase()}"]`)
            .should('have.attr', 'href')
            .and('match', new RegExp(`https://.*${social.toLowerCase()}.com`));
      });
    });
  });

  it('TC_005 - Pricing Page Navigation', () => {
    cy.contains('header a', 'Pricing').click();
    cy.url().should('include', '/pricing');
    cy.get('h1').should('contain','Pricing');
  });

  it('TC_006 – Contact Us Page', () => {

    cy.get('main').contains('Contact us', { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

    cy.url({ timeout: 15000 }).should('include', '/contact-us');

    cy.get('span', { timeout:15000 })
        .should('be.visible')
        .and('contain','Contact');
  });


  it('TC_007 – Verify Log in page navigation Cross-origin', () => {

    cy.get('header').contains('Log in', { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

    cy.origin('https://portal.telnyx.com', () => {

      cy.visit('/#/login/sign-in');

      // Explicitly validate new domain environment
      cy.url({ timeout: 15000 })
          .should('include', '/#/login/sign-in');

      cy.get('h1,h2', { timeout: 15000 })
          .should('be.visible')
          .and('contain.text', 'Log in');
    });
  });





  it('TC_008 – Check Resources Navigation', () => {

    cy.get('header').contains('Resources', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });

    cy.get('header').within(() => {
      cy.contains('a', 'Resource Center', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
    });

    cy.url({ timeout: 15000 }).should('include', '/resources');

    cy.get('h1,h2', { timeout: 15000 })
        .should('be.visible')
        .and('contain.text', 'articles');
  });


  it('TC_009 - Check Footer Navigation', () => {

    cy.get('footer').within(() => {
      cy.contains('a', 'Careers', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
    });

    cy.url({ timeout: 15000 })
        .should('include', '/careers');

    cy.get('strong', { timeout: 15000 }).first()
        .should('be.visible')
        .and('contain.text', 'careers');
  });


  it('TC_010 - Validate Site Responsiveness', () => {
    const viewports = [[1440,900],[768,1024],[375,667]];
    viewports.forEach(viewport => {
      cy.viewport(viewport[0], viewport[1]);
      cy.get('header').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });

});
