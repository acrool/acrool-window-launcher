
export const asyncOpen = (url: string): Promise<WindowProxy|null> => {
    return new Promise(resolve => {
        window.requestAnimationFrame(() => {
            const childWindow = window.open(url);
            resolve(childWindow);
        });
    });

};
