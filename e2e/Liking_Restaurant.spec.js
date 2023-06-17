const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.post .post-content a', 10);
  I.seeElement('.post .post-content a');

  const firstRestoran = locate('.post .post-content a').first();
  const firstRestoranTitle = await I.grabTextFrom(firstRestoran);
  I.click(firstRestoran);

  I.waitForElement('#likeButton', 15);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.post', 15);
  I.seeElement('.post');
  const likedRestoranTitle = await I.grabTextFrom('.post .post-content a');

  assert.strictEqual(firstRestoranTitle, likedRestoranTitle);
});
