import {Homepage} from "../pages/Homepage";

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('play() request was interrupted')) {
    return false;
  }
  return true;
});

describe('Telnyx Verified Cypress Tests', () => {
  const homepage = new Homepage();

  beforeEach(() => {
    homepage.visit();
  });

  it('TC_001 - Verify Homepage Loads Correctly', () => {
    homepage.verifyHomepageVisible();
  });

  it('TC_002 - Check Primary Navigation', () => {
    homepage.checkPrimaryNavigation();
    cy.url({ timeout: 15000 }).should('include', '/products/sip-trunks');
    cy.get('h1', { timeout: 15000 }).should('contain', 'SIP Trunking');
  });

  it('TC_003 – Verify Sign-Up page navigation is working', () => {
    homepage.verifySignupNavigation();
    cy.url({ timeout: 15000 }).should('include', '/sign-up');
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
    homepage.footerSocialMediaLinks();
  });

  it('TC_005 - Pricing Page Navigation', () => {
    homepage.pricingPageNavigation();
    cy.url().should('include', '/pricing');
    cy.get('h1').should('contain', 'Pricing');
  });

  it('TC_006 – Contact Us Page', () => {
    homepage.contactUsNavigation();
    cy.url({ timeout: 15000 }).should('include', '/contact-us');
    cy.get('span', { timeout: 15000 })
        .should('be.visible')
        .and('contain','Contact');
  });

  it('TC_007 – Verify Log in page navigation Cross-origin', () => {
    homepage.loginNavigation();
    cy.origin('https://portal.telnyx.com', () => {
      cy.visit('/#/login/sign-in');
      cy.url({ timeout: 15000 })
          .should('include', '/#/login/sign-in');
      cy.get('h1,h2', { timeout: 15000 })
          .should('be.visible')
          .and('contain.text', 'Log in');
    });
  });

  it('TC_008 – Check Resources Navigation', () => {
    homepage.resourcesNavigation();
    cy.url({ timeout: 15000 }).should('include', '/resources');
  });

  it('TC_009 - Check Footer Navigation', () => {
    homepage.footerNavigationCareers();
    cy.url({ timeout: 15000 })
        .should('include', '/careers');
    cy.get('strong', { timeout: 15000 }).first()
        .should('be.visible')
        .and('contain.text', 'careers');
  });

  it('TC_010 - Validate Site Responsiveness', () => {
    homepage.validateSiteResponsiveness();
  });

});