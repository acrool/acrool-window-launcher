import Launcher from './Launcher';
import {IOpenData} from './types';
import * as utils from './utils';

describe('Launcher', () => {
    let launcher: Launcher;

    beforeEach(() => {
        launcher = new Launcher();
    });

    it('should create an instance of Launcher', () => {
        expect(launcher).toBeInstanceOf(Launcher);
    });

    it('should initialize with default options', () => {
        const defaultLauncher = new Launcher();
        expect(defaultLauncher['_readyUrl']).toBe('about:blank');
        expect(defaultLauncher['_isPreClose']).toBe(false);
        expect(defaultLauncher['_isEnableCatchClose']).toBe(true);
    });

    it('should initialize with custom options', () => {
        const customLauncher = new Launcher({
            readyUrl: 'https://custom.com',
            isPreClose: true,
            isEnableCatchClose: false
        });
        expect(customLauncher['_readyUrl']).toBe('https://custom.com');
        expect(customLauncher['_isPreClose']).toBe(true);
        expect(customLauncher['_isEnableCatchClose']).toBe(false);
    });

    it('should open a URL in a new tab', async () => {
        // 模拟 window.open 返回的窗口对象
        const mockWindow = {
            focus: jest.fn(),
            location: {href: ''},
            window: true,
            closed: false
        };
        
        // 保存原始的 window.open
        const originalOpen = window.open;
        window.open = jest.fn().mockReturnValue(mockWindow);

        await launcher.open(async () => 'https://example.com');
        
        // 验证 _ready 方法是否正确调用
        expect(window.open).toHaveBeenCalledWith('about:blank');
        
        // 验证 _openUrl 方法是否正确调用
        expect(mockWindow.focus).toHaveBeenCalled();
        expect(mockWindow.location.href).toBe('https://example.com');

        // 恢复原始的 window.open
        window.open = originalOpen;
    });

    it('should open HTML content in a new tab', async () => {
        // 模拟 window.open 返回的窗口对象
        const mockWindow = {
            focus: jest.fn(),
            document: {
                open: jest.fn(),
                close: jest.fn()
            },
            window: true,
            closed: false
        };
        
        // 保存原始的 window.open
        const originalOpen = window.open;
        window.open = jest.fn().mockReturnValue(mockWindow);

        // 模拟 writeHtml 函数
        const writeHtmlMock = jest.spyOn(utils, 'writeHtml').mockImplementation(() => {});

        const htmlData: IOpenData = {
            type: 'html',
            value: '<html><body>Test</body></html>'
        };

        await launcher.open(async () => htmlData);
        
        // 验证 _ready 方法是否正确调用
        expect(window.open).toHaveBeenCalledWith('about:blank');
        
        // 验证 _openHtml 方法是否正确调用
        expect(mockWindow.focus).toHaveBeenCalled();
        expect(writeHtmlMock).toHaveBeenCalledWith(mockWindow.document, htmlData.value);

        // 恢复原始的函数
        writeHtmlMock.mockRestore();
        window.open = originalOpen;
    });

    it('should close the child window', () => {
        const mockWindow = {closed: false, close: jest.fn()};
        launcher['_childWindow'] = mockWindow as any;

        launcher.close();
        
        expect(mockWindow.close).toHaveBeenCalled();
    });

    it('should handle pre-close option', async () => {
        // 模拟第一个窗口
        const firstWindow = {
            focus: jest.fn(),
            location: {href: ''},
            window: true,
            closed: false,
            close: jest.fn()
        };
        
        // 模拟第二个窗口（预关闭后打开的窗口）
        const secondWindow = {
            focus: jest.fn(),
            location: {href: ''},
            window: true,
            closed: false
        };
        
        // 保存原始的 window.open
        const originalOpen = window.open;
        window.open = jest.fn()
            .mockReturnValueOnce(firstWindow)  // 第一次调用返回第一个窗口
            .mockReturnValueOnce(secondWindow); // 第二次调用返回第二个窗口

        // 创建一个启用了预关闭选项的 launcher
        const launcherWithPreClose = new Launcher({isPreClose: true});
        
        // 第一次打开
        await launcherWithPreClose.open(async () => 'https://first.com');
        
        // 验证第一个窗口被正确设置
        expect(launcherWithPreClose['_childWindow']).toBe(firstWindow);
        
        // 第二次打开（应该触发预关闭）
        await launcherWithPreClose.open(async () => 'https://second.com');
        
        // 验证第一个窗口被关闭
        expect(firstWindow.close).toHaveBeenCalled();
        
        // 验证第二个窗口被正确设置
        expect(launcherWithPreClose['_childWindow']).toBe(secondWindow);
        
        // 恢复原始的 window.open
        window.open = originalOpen;
    });

    it('should handle errors and close window when enabled', async () => {
        // 模拟窗口对象
        const mockWindow = {
            focus: jest.fn(),
            location: {href: ''},
            window: true,
            closed: false,
            close: jest.fn()
        };
        
        // 保存原始的 window.open
        const originalOpen = window.open;
        window.open = jest.fn().mockReturnValue(mockWindow);

        // 创建一个启用了错误关闭选项的 launcher
        const launcherWithCatchClose = new Launcher({isEnableCatchClose: true});
        
        // 模拟一个会抛出错误的 promise
        const errorPromise = async () => {
            throw new Error('Test error');
        };

        // 验证错误被抛出且窗口被关闭
        await expect(launcherWithCatchClose.open(errorPromise))
            .rejects.toThrow('Test error');
        
        expect(mockWindow.close).toHaveBeenCalled();
        
        // 恢复原始的 window.open
        window.open = originalOpen;
    });

    it('should not close window when error handling is disabled', async () => {
        // 模拟窗口对象
        const mockWindow = {
            focus: jest.fn(),
            location: {href: ''},
            window: true,
            closed: false,
            close: jest.fn()
        };
        
        // 保存原始的 window.open
        const originalOpen = window.open;
        window.open = jest.fn().mockReturnValue(mockWindow);

        // 创建一个禁用了错误关闭选项的 launcher
        const launcherWithoutCatchClose = new Launcher({isEnableCatchClose: false});
        
        // 模拟一个会抛出错误的 promise
        const errorPromise = async () => {
            throw new Error('Test error');
        };

        // 验证错误被抛出但窗口没有被关闭
        await expect(launcherWithoutCatchClose.open(errorPromise))
            .rejects.toThrow('Test error');
        
        expect(mockWindow.close).not.toHaveBeenCalled();
        
        // 恢复原始的 window.open
        window.open = originalOpen;
    });
});
