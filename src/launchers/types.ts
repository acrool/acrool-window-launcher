
export interface IBrowser {
    // ready: () => void
    open: (url: string) => Promise<this>
    close: () => this
    name: string
}
