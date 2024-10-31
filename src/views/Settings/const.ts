export const sortPropertyActionSheet = {
    title: "Rendezési mód kiválasztása",
    cancelable: true,
    buttons: [
        "Azonosító",
        "Név",
        "Kód",
        "Lejárati dátum",
        "Bezárás",
    ]
};

export const couponsForDeletionActionSheet = {
    title: "Kuponok törlése",
    cancelable: true,
    buttons: [
        "Csak a lejárt kuponok",
        "Minden kupon törlése",
        "Bezárás",
    ]
};

export const expiredVisibilityActionSheet = {
    title: "Lejárt kuponok láthatósága",
    cancelable: true,
    buttons: [
        "Elrejtés",
        "Megjelenítés",
        "Bezárás",
    ]
};

export const deleteTypes = {
    expired: 0,
    all: 1
}