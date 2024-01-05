
/**
 * 判斷是否為Safari
 */
export function checkIsSafariBrowser(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('safari') && !userAgent.includes('chrome');
}
