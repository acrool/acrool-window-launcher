// Launcher.test.ts
import Launcher from './Launcher';
import * as utils from './utils';

describe('Launcher', () => {
    let launcher: Launcher;

    beforeEach(() => {
        launcher = new Launcher();
    });

    it('should create an instance of Launcher', () => {
        expect(launcher).toBeInstanceOf(Launcher);
    });

    it('should have a method to open a new tab', () => {
        expect(typeof launcher.open).toBe('function');
    });

    it('should call asyncOpen from utils when opening a new tab', async () => {
        // Mock the asyncOpen function
        const asyncOpenMock = jest.spyOn(utils, 'asyncOpen').mockResolvedValue(null);

        // Call the open method
        await launcher.open('https://example.com');

        // Check if asyncOpen was called
        expect(asyncOpenMock).toHaveBeenCalledWith('https://example.com');

        // Restore the original function
        asyncOpenMock.mockRestore();
    });

    // More tests can be added here...
});
