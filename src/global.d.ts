
declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        webviewOpen: { postMessage: (url: string) => void }
    }
}


// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {};
