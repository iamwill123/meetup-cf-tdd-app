import puppeteer from 'puppeteer';

// FEATURE 2: SHOW/HIDE AN EVENT DETAILS
// Scenario 1: An event element is collapsed by default.
// Scenario 2: User can expand an event to see its details.
// Scenario 3: User can collapse an event to hide its details.
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
    await page.click('.Event .details-btn');
    eventDetail = await page.$('.Event .detail-info');
    expect(eventDetail).toBeDefined();
  });

  // Scenario 3: User can collapse an event to hide its details.
  test('User can hide an event details by clicking on the "Hide" button', async () => {
    await page.click('.Event .details-btn');
    eventDetail = await page.$('.Event .detail-info');
    expect(eventDetail).toBeNull();
  });
});
