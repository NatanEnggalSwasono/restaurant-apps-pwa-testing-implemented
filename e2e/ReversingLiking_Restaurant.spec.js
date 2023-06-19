const assert = require('assert');

Feature('Reverse Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.post .post-content a', 10);
  I.seeElement('.post .post-content a');

  const firstRestoran = locate('.post .post-content a').first();
  const firstRestoranTitle = await I.grabTextFrom(firstRestoran);
  I.click(firstRestoran);

  I.waitForElement('#likeButton', 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.post', 20);
  I.seeElement('.post');
  const firstLikedRestoran = locate('.post .post-content a').first();
  const firstLikedRestoranTitle = await I.grabTextFrom(firstLikedRestoran);
  assert.strictEqual(firstRestoranTitle, firstLikedRestoranTitle);

  I.click(firstLikedRestoran);
  I.waitForElement('#likeButton', 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
});
