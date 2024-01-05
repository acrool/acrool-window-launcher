


export interface IBrowser {
    ready: (readyUrl: string) => WindowProxy|null
    open: (url: string, childWindow: WindowProxy|null) => WindowProxy|null
    close: (childWindow: WindowProxy|null) => void
}


