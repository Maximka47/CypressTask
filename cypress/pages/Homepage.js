export class Homepage {

    visit() {
        cy.visit('https://telnyx.com/');
        cy.viewport(1280, 720);
        cy.get('body').should('be.visible');

        cy.get('body').then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click({ force: true });
            }
        });
    }

    verifyHomepageVisible() {
        cy.get('header').should('be.visible');
        cy.get('footer').should('be.visible');
    }

    checkPrimaryNavigation() {
        cy.get('header button').contains('Products').click({ force: true });
        cy.get('header').within(() => {
            cy.contains('a', 'SIP Trunking', { timeout: 15000 })
                .should('be.visible')
                .click({ force: true });
        });
    }

    verifySignupNavigation() {
        cy.get('main').contains('Sign up', { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });
    }

    footerSocialMediaLinks() {
        const socials = ['LinkedIn', 'Twitter', 'Facebook'];
        socials.forEach((social) => {
            cy.get('footer').within(() => {
                cy.get(`a[href*="${social.toLowerCase()}"]`)
                    .should('have.attr', 'href')
                    .and('match', new RegExp(`https://.*${social.toLowerCase()}.com`));
            });
        });
    }

    pricingPageNavigation() {
        cy.contains('header a', 'Pricing').click();
    }

    contactUsNavigation() {
        cy.get('main').contains('Contact us', { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });
    }

    loginNavigation() {
        cy.get('header').contains('Log in', { timeout: 15000 })
            .should('be.visible')
            .click({ force: true });
    }

    resourcesNavigation() {
        cy.get('header').contains('Resources', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('header').within(() => {
            cy.contains('a', 'Resource Center', { timeout: 10000 })
                .should('be.visible')
                .click({ force: true });
        });
    }

    footerNavigationCareers() { // method clearly for TC_009
        cy.get('footer').within(() => {
            cy.contains('a', 'Careers', { timeout: 10000 })
                .should('be.visible')
                .click({ force: true });
        });
    }

    validateSiteResponsiveness() { // method clearly for TC_010
        const viewports = [[1440, 900], [768, 1024], [375, 667]];
        viewports.forEach(viewport => {
            cy.viewport(viewport[0], viewport[1]);
            cy.get('header').should('be.visible');
            cy.get('footer').should('be.visible');
        });
    }
}