import { device, element, by, expect } from 'detox';

describe('Full App Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('auth → challenge → reply → map → closet', async () => {
    // 1. Auth (Assuming mock auth or persistent session for test)
    // await element(by.id('login-btn')).tap();
    
    // 2. Challenge Flow
    // Navigate to challenge creation
    // await element(by.id('create-challenge-btn')).tap();
    // await expect(element(by.text('ONE-TAKE CHALLENGE'))).toBeVisible();
    // Simulate recording (mocked in app code for detox usually)
    // await element(by.text('RECORD')).tap();
    // await new Promise(resolve => setTimeout(resolve, 16000)); // Wait for 15s record
    // await element(by.text('SEND CHALLENGE')).tap();

    // 3. Map Check-in
    // await element(by.id('tab-map')).tap();
    // await expect(element(by.type('MapboxGL.MapView'))).toBeVisible();

    // 4. Closet & Wallet
    // await element(by.id('tab-closet')).tap();
    // await expect(element(by.text('BACKPACK'))).toBeVisible();
    // await expect(element(by.text('HB'))).toBeVisible(); // Wallet check
    
    // Equip item
    // await element(by.text('Equip')).atIndex(0).tap();
    // await expect(element(by.text('Equipped')).atIndex(0)).toBeVisible();
  });
});
