//Interfaces
import ICoupon from "../interfaces/Coupon";
import IStoreIndex from "../interfaces/StoreIndex";


/**
 * couponIndexes
 * 
 */
const couponIndexes: IStoreIndex[] = [
    { name: "name", unique: false },
    { name: "code", unique: false },
    { name: "expiry", unique: false },
];


/**
 * CouponService
 * 
 */
class CouponServices {

    private db: IDBDatabase | null = null;
    public db_name: string = "Thiscount_db";
    public store: string = "coupons";


    /**
     * initialize
     * 
     */
    public initialize(): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            const request: IDBOpenDBRequest = indexedDB.open(this.db_name);

            request.onupgradeneeded = (e: any) => {
                const db = (e.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains(this.store)) {
                    //console.log(`A "${this.store}" store nem létezik.`);

                    const store = db.createObjectStore(this.store, { keyPath: 'id', autoIncrement: true });

                    couponIndexes.forEach((e: IStoreIndex) => {
                        store.createIndex(e.name, e.name, { unique: e.unique });
                    });

                    //console.log(`A "${this.store}" store létrehozva.`);
                }
            }

            request.onerror = (e: any) => {
                reject(false);
            }

            request.onsuccess = (e: any) => {
                this.db = (e.target as IDBOpenDBRequest).result;
                resolve(true);
            }
        });
    }


    /**
     * create
     * 
     * @param coupon 
     * @returns 
     */
    public create(coupon: ICoupon): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject(false);
            }

            const transaction = this.db.transaction([this.store], 'readwrite');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.add(coupon);

            request.onsuccess = () => {
                //console.log('Kupon hozzáadva:', coupon.code);
                resolve(true);
            };

            request.onerror = (e: any) => {
                console.error('Hiba a kupon hozzáadása során:', (e.target as IDBRequest).error);
                reject(false);
            };
        });
    }


    /**
     * find
     * 
     * @param id 
     * @returns 
     */
    public find(id: string): Promise<ICoupon> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject([]);
            }

            const transaction = this.db.transaction([this.store], 'readonly');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.get(id);

            request.onsuccess = (event) => {
                const result = (event.target as IDBRequest).result;
                if (result) {
                    //console.log('Kupon megtalálva:', result);
                    resolve(result);
                } else {
                    //console.log('Kupon nem található ezzel az ID-val:', id);
                    reject([]);
                }
            };

            request.onerror = (event) => {
                console.error('Hiba az adat lekérése során:', (event.target as IDBRequest).error);
                reject([]);
            };
        });
    }


    /**
     * findAll
     * 
     * @param id 
     * @returns 
     */
    public findAll(): Promise<ICoupon[]> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject([]);
            }

            const transaction = this.db.transaction([this.store], 'readonly');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.getAll();

            request.onsuccess = (event) => {
                const result = (event.target as IDBRequest).result;
                if (result.length > 0) {
                    //console.log('Kupon megtalálva:', result);
                    resolve(result);
                } else {
                    //console.log('Nem található kupon');
                    resolve([]);
                }
            };

            request.onerror = (event) => {
                console.error('Hiba az adat lekérése során:', (event.target as IDBRequest).error);
                reject([]);
            };
        });
    }


    /**
     * findByName
     * 
     * @param couponName 
     * @returns 
     */
    public findByName(couponName: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject(false);
            }

            const transaction = this.db.transaction([this.store], 'readonly');
            const objectStore = transaction.objectStore(this.store);
            const index = objectStore.index('name');

            const request = index.get(couponName);

            request.onsuccess = (event) => {
                const result = (event.target as IDBRequest).result;
                if (result) {
                    //console.log('Kupon megtalálva a kóddal:', result);
                    resolve(true);
                } else {
                    //console.log('Kupon nem található ezzel a névvel:', couponName);
                    reject(false);
                }
            };

            request.onerror = (event) => {
                console.error('Hiba az adat lekérése során:', (event.target as IDBRequest).error);
                reject(false);
            };
        });
    }


    /**
     * update
     * 
     * @param id 
     * @param newCoupon 
     * @returns 
     */
    public update(id: string, newCoupon: ICoupon): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject(false);
            }

            const transaction = this.db.transaction([this.store], 'readwrite');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.get(id);

            request.onsuccess = (event) => {
                const coupon = (event.target as IDBRequest).result;

                if (coupon) {
                    const updateRequest = objectStore.put(newCoupon);

                    updateRequest.onsuccess = () => {
                        //console.log('Kupon frissítve:', coupon);
                        resolve(true);
                    };

                    updateRequest.onerror = (event) => {
                        console.error('Hiba a kupon frissítése során:', (event.target as IDBRequest).error);
                        reject(false);
                    };
                }
            };

            request.onerror = (event) => {
                console.error('Hiba a kupon lekérése során:', (event.target as IDBRequest).error);
                reject(false);
            };
        });
    }


    /**
     * delete
     * 
     * @param id 
     * @returns 
     */
    public delete(id: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject(false);
            }

            const transaction = this.db.transaction([this.store], 'readwrite');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.delete(id);

            request.onsuccess = () => {
                //console.log('Kupon törölve ID alapján:', id);
                resolve(true);
            };

            request.onerror = (event) => {
                console.error('Hiba a kupon törlése során:', (event.target as IDBRequest).error);
                reject(false);
            };
        });
    }


    /**
     * clear
     * 
     * @returns 
     */
    public clear(): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            if (!this.db) {
                console.error('Az adatbázis még nem nyílt meg.');
                return reject(false);
            }

            const transaction = this.db.transaction([this.store], 'readwrite');
            const objectStore = transaction.objectStore(this.store);

            const request = objectStore.clear();

            request.onsuccess = () => {
                //console.log('Kuponok törölve.');
                resolve(true);
            };

            request.onerror = (event) => {
                console.error('Hiba a kupon törlése során:', (event.target as IDBRequest).error);
                reject(false);
            };
        });
    }
}

//eslint-disable-next-line
export default new CouponServices();
