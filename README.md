# Thiscount

Ez az alkalmazás lehetőséget nyújt a felhasználóknak, hogy a kedvezményeket biztosító kuponjaikat egyszerűen és gyorsan egy helyen tárolhassák és rendszerezhessék. A kuponok adatai (név, kuponkód és érvényességi idő) rögzíthetők, valamint szükség esetén könnyen elérhetők és kezelhetők.

## Fő funkciók

- **Kuponok mentése**: Minden kupon tárolható egyedi névvel, kuponkóddal és érvényességi dátummal.
- **Kuponkód másolása**: Az alkalmazásban rögzített kuponokat könnyedén átmásolhatod a vágólapra egy gombnyomással.
- **Kupon törlése**: Egyszerűen eltávolíthatók a már nem érvényes vagy szükségtelenné vált kuponok.

## Telepítési útmutató

1. **Csomagok telepítése**:
```bash
npm install
```

2. **Projektfájlok szinkronizálása iOS és Android projektkönyvtárakba**:
```bash
npx cap sync
```

## Használati útmutató

**Böngészőben**:

1. **Projekt megnyitása a helyi hálózaton**:
```bash
npm run start
```

**Eszközön**:

1. **Chunk fájlok generálása**:
```bash
npm run build
```

2. **Projektfájlok szinkronizálása iOS és Android projektkönyvtárakba**:
```bash
npx cap sync
```

3. **Natív fejlesztőkörnyezet megnyitása**:
```bash
npx cap open android vagy ios
```

Android esetén az Android Studio, iOS esetén az Xcode betöltődése után a projekt futtatható a csatlakoztatott eszközökön.

## Rendszerkövetelmények

- **Platform**: Android 5+, iOS 11+, WebView 60+ (Chrome), WKWebView
- **Szükséges támogatás**: IndexedDB az adatok helyi mentéséhez

## Képernyőképek
<div style="display: flex; justify-content: space-between;">
<img src="screenshots/localhost_3000_(Nexus 5X).png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_1.png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_2.png" width="250" height="auto" style="margin-right: 5px;">
<img src="screenshots/localhost_3000_(Nexus 5X)_3.png" width="250" height="auto" style="margin-right: 5px;">
</div>