interface WelcomeProps {
  userName: string;
}

const Welcome = ({ userName }: WelcomeProps) => {
  return (
    <>
      <div className="p-3 p-md-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            Üdvözöllek a TechSupport oldalán {userName}!
          </h1>
          <p className="col-md-8 fs-4">
            Ezt az oldalt azért hoztuk létre, hogy mindenki tisztán lássa miből
            is áll egy számítógép és minek mi a feladata. Ahogy az autó sem fút
            kerekek és motor nélkül a többiről nem is beszélve.
          </p>
          <p className="col-md-8 fs-4">
            A Lexikon oldalon felsoroljuk azokat az alkatrészeket, ami
            létfontosságú a működéshez és ezt megpróbáljuk hétköznapi nyelven
            szemléltetni.
          </p>
          <p className="col-md-8 fs-4">
            A Gépösszeállítás oldalon egy vázlatos leírást találsz, hogy adott
            kategóriában milyen alkatrésztípust érdemes választani.
          </p>
          <br />
          <p className="col-md-8 fs-4">
            Számunkra fontos ennek az oldalnak a fejlesztése, ebben tudsz nekünk
            segíteni, hogy visszajelzéseket/megjegyzéseket írsz. Ezt úgy teheted
            meg, hogy bejelentkezel, de ne félj adataid biztonságban vannak
            nálunk.
          </p>
        </div>
      </div>
      <div className="mb-4 p-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Csapatunkról:</h1>
          <p className="col-md-8 fs-4">
            Mi egy lelkes csapat vagyunk, akik szenvedélyesen hisznek a
            technológia oktatásában és abban, hogy mindenki számára elérhetővé
            tegyék a számítógépek világát kortól nemtől függetlenül. Célunk,
            hogy egy olyan platformot hozzunk létre, ahol a felhasználó
            könnyedén megtalálhatja a szükséges információt és vázlatot a
            számítógéphez és megértéséhez.
          </p>
          <p className="col-md-8 fs-4">
            Ezeken a linkeken megtalálod a csapat tagjainak GitHub profilját:
            <ul>
              <li>
                <a href="https://github.com/Atmerium">Molnár Attila</a>
              </li>
              <li>
                <a href="https://github.com/Kende28">Yamakawa Kende</a>
              </li>
              <li>
                <a href="https://github.com/LemonIcecreamUwU">Almási Bence</a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
