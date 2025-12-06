import LoginModal from "./LoginModal";

const Welcome = () => {
  return (
    <>
      <div className="p-3 p-md-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            Üdvözöllek a TechSupport oldalán
          </h1>
          <p className="col-md-8 fs-4">
            Ez az oldal segít abban ha nem tudod miből áll egy modern
            számítógép. Az oldalunk oktatási céllal készült, hogy segítsen a
            jövő technológiai szakembereinek és infósoknak.
          </p>
          <p className="col-md-8 fs-4">
            A lexikon résznél találhatsz egy részlet gazdag gyűjteményt a
            számítógépek alkatrészeiről és azok funkcióiról.
          </p>
          <p className="col-md-8 fs-4">
            Kisebb útmutatót is nyújtunk a számítógép-összeszereléshez. Ez
            magában foglalja az ajánlott alkatrészek kiválasztását, de segítünk
            abban is, hogy megéri-e megvásárolni egy már összeállított
            konfigurációt. Főként a perifériákra és azok ár-érték arányára
            összpontosítva.
          </p>
          <p className="col-md-8 fs-4">
            Jelenleg még csak a sulis/office és a gaming perifériák vannak
            kidolgozva.
          </p>
          <br />
          <p className="col-md-8 fs-4">
            Amennyiben szeretnéd munkásságunkat kicsit támogatni, kérlek
            jelentkezz be, és így tudsz nekünk megjegyzésekt tenni hogy miket
            kéne változtatnunk.
          </p>
        </div>
      </div>
      <div className="mb-4 p-4 bg-light rounded-3">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Csapatunkról:</h1>
            <p className="col-md-8 fs-4">
              Mi egy lelkes csapat vagyunk, akik szenvedélyesen hisznek a
              technológia oktatásában és abban, hogy mindenki számára elérhetővé
              tegyék a számítógépek világát. Célunk, hogy egy olyan platformot
              hozzunk létre, ahol a felhasználók könnyedén megtalálhatják a
              szükséges információkat és útmutatásokat a számítógépek
              összeszereléséhez és használatához.
            </p>
            <p className="col-md-8 fs-4">
                Ezeken a linkeken megtalálod a csapat tagjainak GitHub profilját:
                <ul>
                    <li><a href="https://github.com/Atmerium">Molnár Attila</a></li>
                    <li><a href="https://github.com/Kende28">Yamakawa Kende</a></li>
                    <li><a href="">Almási Bence</a></li>
                </ul>
            </p>
        </div>
      </div>
      <LoginModal />
    </>
  );
};

export default Welcome;
