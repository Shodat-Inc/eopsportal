export function checkEmailAdress(email: any, arr: any) {
    const matched = arr.filter((item: any) => {
        return item.username === email
    })
    if (matched && matched.length > 0) {
        return true;
    } else {
        return false;
    }
}