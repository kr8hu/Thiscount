/**
 * calculateTimeLeft
 * 
 * @returns 
 */
export const calculateTimeLeft = (endDate: Date, startDate?: Date) => {
    const now = startDate?.getTime() ?? new Date().getTime();
    const end = endDate.getTime();
    const timeLeft = end - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { timeLeft, days, hours, minutes, seconds };
};


/**
 * generateRandomString
 * 
 * @returns 
 */
export function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    let result = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}


/**
 * sortByProperty
 * 
 */
export function sortByProperty(property: string, desc: boolean) {
    let sortOrder = desc ? -1 : 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return (a: any, b: any) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


/**
 * getSortPropertyByText
 * 
 * @param property 
 * @returns 
 */
export function getSortPropertyByText(property: string) {
    switch (property) {
        case "id": return "Azonosító";
        case "name": return "Név";
        case "code": return "Kód";
        case "expiry": return "Lejárati dátum";
        default: return "Azonosító";
    }
}


/**
 * getSortPropertyByID
 * 
 * @param idx 
 */
export const getSortPropertyByID = (idx: number) => {
    switch (idx) {
        case 0: return "id";
        case 1: return "name";
        case 2: return "code";
        case 3: return "expiry";
        default: return "id";
    }
}