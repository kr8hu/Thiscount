/**
 * Loading States
 * 
 */
export const loadingStates = [
    {
        id: 0,
        title: "Betöltés",
        description: "Alkalmazásadatok betöltése"
    },
    {
        id: 1,
        title: "Betöltés",
        description: "Szöveges tartalmak betöltése"
    },
    {
        id: 2,
        title: "Betöltés",
        description: "Adatbázisok beállítása"
    },
    {
        id: 3,
        title: "Betöltés",
        description: "Kuponok betöltése"
    },
    {
        id: -1,
        title: "Kész",
        description: "Alkalmazás megnyitása"
    }
];


/**
 * Loading Progresses
 * 
 */
export const loadingProgress = {
    init: 0,
    texts: 1,
    stores: 2,
    coupons: 3,
    completed: -1
}