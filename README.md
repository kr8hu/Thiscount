# Thiscount

Ez az alkalmazás lehetőséget nyújt a felhasználóknak, hogy a kedvezményeket biztosító kuponjaikat egyszerűen és gyorsan egy helyen tárolhassák és rendszerezhessék. A kuponok adatai (név, kuponkód és érvényességi idő) rögzíthetők, valamint szükség esetén könnyen elérhetők és kezelhetők.

## Telepítési útmutató

1. **Modulok telepítése**:
```bash
npm install
```

2. **Fájlok szinkronizálása iOS és Android könyvtárakba**:
```bash
npx cap sync
```

## Használati útmutató

**Debug**:

1. **Futtatás a helyi hálózaton**:
```bash
npm run start
```

**Release**:

1. **Chunk fájlok generálása**:
```bash
npm run build
```

2. **Fájlok szinkronizálása iOS és Android könyvtárakba**:
```bash
npx cap sync
```

3. **Natív fejlesztőkörnyezet megnyitása**:
```bash
npx cap open android vagy ios
```

Android esetén az Android Studio, iOS esetén az Xcode betöltődése után a projekt futtatható a csatlakoztatott eszközökön.

## Tech Stack
- CRA
- Typescript
- React
- Ionic Capacitor
- Onsen UI

## Képernyőképek
<div style="display: flex; justify-content: space-between;">
<img src="screenshots/localhost_3000_(Nexus 5X).png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_1.png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_2.png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_3.png" width="250" height="auto" style="margin-right: 5px;">
</div>