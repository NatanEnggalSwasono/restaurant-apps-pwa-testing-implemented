const assert = require('assert');

Feature('Reverse Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/home');
});

Scenario('unliking one restaurant', async({ I }) => {
    I.amOnPage('/#/home');
    I.waitForElement('.post .post-content a', 10);
    I.seeElement('.post .post-content a');

    const firstLikedRestoran = locate('.post .post-content a').first();
    const firstLikedRestoranTitle = await I.grabTextFrom(firstLikedRestoran);
    I.click(firstLikedRestoran);

    I.waitForElement('#likeButton', 20);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/');
    I.waitForElement('.post', 20);
    I.seeElement('.post');
    const unlikedRestoranTitle = await I.grabTextFrom('.post .post-content a');

    assert.strictEqual(firstLikedRestoranTitle, unlikedRestoranTitle);
});