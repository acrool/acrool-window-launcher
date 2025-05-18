import {expect,test} from '@playwright/test';

const STORYBOOK_BASE = 'http://localhost:6006/iframe.html';

// 1. 非同步成功開新視窗
// 假設按鈕名稱為「非同步成功開新視窗」
test('Launcher 非同步成功開新視窗', async ({page, context}) => {
    await page.goto(`${STORYBOOK_BASE}?id=primary-windowlauncher--with-url-success`);
    const targetUrl = 'https://acrool.com/';

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('[data-testid="open-button"]').click()
    ]);

    // 先驗證 loading
    await newPage.waitForLoadState();
    expect(newPage.url()).toMatch('http://localhost:6006/loading.html');

    // 等待導向到 lobbyUrl
    await newPage.waitForURL(targetUrl, {timeout: 3000});
    expect(newPage.url()).toBe(targetUrl);

    // 點擊關閉按鈕
    await page.locator('[data-testid="close-button"]').click();

    // 新分頁被關閉
    expect(newPage.isClosed()).toBeTruthy();
});

// 2. 非同步開新視窗失敗時自動關閉 loading
// 假設按鈕名稱為「非同步開新視窗失敗」
test('Launcher 非同步開新視窗失敗時自動關閉 loading', async ({page, context}) => {
    await page.goto(`${STORYBOOK_BASE}?id=primary-windowlauncher--with-url-fail`);

    // 觸發開新視窗
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('[data-testid="open-button"]').click()
    ]);

    // 先驗證 loading.html 有被開啟
    await newPage.waitForLoadState();
    expect(newPage.url()).toMatch('http://localhost:6006/loading.html');

    // 等待一段時間，讓錯誤流程發生（例如 2 秒）
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 驗證 newPage 已經被自動關閉
    expect(newPage.isClosed()).toBeTruthy();
});

// 3. 非同步開新視窗並塞入 HTML 內容
// 假設按鈕名稱為「非同步開新視窗（HTML）」
test('Launcher 非同步開新視窗並塞入 HTML 內容', async ({page, context}) => {
    await page.goto(`${STORYBOOK_BASE}?id=primary-windowlauncher--with-html-success`);

    // 觸發開新視窗
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('[data-testid="open-button"]').click()
    ]);

    // 等待新分頁載入
    await newPage.waitForLoadState();

    // 驗證新分頁內容有正確顯示 HTML
    // 這裡假設 HTML 內容有一個 id="test-html-content" 的元素
    const htmlContent = await newPage.locator('#test-html-content').textContent();
    expect(htmlContent).toContain('Build anything');

    // 關閉新分頁
    await newPage.close();
});
