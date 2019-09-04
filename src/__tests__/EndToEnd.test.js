import puppeteer from 'puppeteer';

// Feature 1: FILTER EVENTS BY CITY
describe('Filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  // Scenario 1: By default, when user hasn’t searched for a city, show upcoming events based on the user’s location
  test('By default, when user hasn’t searched for a city, show upcoming events based on the user’s location', async () => {
    const eventList = await page.$('.EventList');
    expect(eventList).toBeDefined();
  });

  // Scenario 2: User should see a list of suggestions when they search for a city
  test('User should see a list of suggestions when they search for a city', async () => {
    // jest.setTimeout(30000); // added for testing purposes
    await page.type('.city', 'Brooklyn'); // Types slower, like a user
    // await page.type('.city', 'Brooklyn', { delay: 100 }); // Types slower, like a user
    const suggestionsList = await page.$$eval(
      '.suggestions li',
      li => li.length
    );
    console.log('TCL: suggestionsList length', suggestionsList);
    expect(suggestionsList).toBeDefined();
  }, 6000);

  // Scenario 3: User can select a city from the suggested list
  test(' User can select a city from the suggested list', async () => {
    await page.hover('.suggestions li');
    await page.click('.suggestions li');
    const searchValue = await page.$eval('.city', el => el.value);
    console.log('TCL: searchValue', searchValue);
    expect(searchValue).toBeDefined();
  }, 6000);
});

// Feature 2: SHOW/HIDE AN EVENT'S DETAILS
describe('show/hide an event details', () => {
  let browser;
  let page;
  let eventDetail;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  // Scenario 1: An event element is collapsed by default.
  test('An event element is collapsed (hidden) by default', async () => {
    eventDetail = await page.$('.Event .detail-info');
    expect(eventDetail).toBeNull();
  });

  // Scenario 2: User can expand an event to see its details.
  test('User can expand an event to see its details by clicking on the "Details" button', async () => {
    await page.hover('.Event .details-btn');
    await page.click('.Event .details-btn');
    eventDetail = await page.$('.Event .detail-info');
    expect(eventDetail).toBeDefined();
  });

  // Scenario 3: User can collapse an event to hide its details.
  test('User can hide an event details by clicking on the "Hide" button', async () => {
    await page.hover('.Event .details-btn');
    await page.click('.Event .details-btn');
    eventDetail = await page.$('.Event .detail-info');
    expect(eventDetail).toBeNull();
  });
});
