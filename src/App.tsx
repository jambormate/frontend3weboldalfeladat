import { useEffect, useState } from "react";
import "./App.css";
import type { Felhasznalok } from "./types/type";

function App() {
  const [users, setUsers] = useState<Felhasznalok[]>([]);
  const [nev, setNev] = useState<string>("");
  const [kor, setKor] = useState<number>(0);
  const [szuletesiDatum, setSzuletesiDatum] = useState<Date>(new Date());
  const [aktiv, setAktiv] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/felhasznalok");
        const data: Felhasznalok[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  async function handleFelhasznaloFelvetel(e) {
    e.preventDefault();
    const ujFelhasznalo = {
      nev: nev,
      kor: kor,
      szuletesi_datum: szuletesiDatum,
      aktiv: aktiv,
      email: email,
    };
    try {
      const response = await fetch("http://localhost:3000/felhasznalok", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(ujFelhasznalo),
      });
      const felhasznalo: Felhasznalok = await response.json();
      setUsers((elozo) => [...elozo, felhasznalo]);
      setNev("");
      setKor(0);
      setSzuletesiDatum(new Date());
      setAktiv(false);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
    console.log(ujFelhasznalo);
  }

  async function handleFelhasznaloTorles(id: string) {
    try {
      const response = await fetch("http://localhost:3000/felhasznalok/" + id, {
        method: "DELETE",
      });
      setUsers((elozo) => elozo.filter((user) => user.id.toString() !== id));
    } catch (error) {
      console.log(error);
    }
  }
  async function handlePluszKor(user: Felhasznalok) {
    try {
      const pluszKor = user.kor + 1;
      const response = await fetch(
        "http://localhost:3000/felhasznalok/" + user.id,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ kor: pluszKor }),
        },
      );
      setUsers((elozo) =>
        elozo.map((u) => (u.id === user.id ? { ...u, kor: pluszKor } : u)),
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function handleMinuszKor(user: Felhasznalok) {
    try {
      const minuszKor = user.kor - 1;
      const response = await fetch(
        "http://localhost:3000/felhasznalok/" + user.id,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ kor: minuszKor }),
        },
      );
      setUsers((elozo) =>
        elozo.map((u) => (u.id === user.id ? { ...u, kor: minuszKor } : u)),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <div className="col-12 text-center">
          <h1>Felhasználók weboldal</h1>
        </div>
        <div
          className="col-12"
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <button className="btn btn-primary">Adminisztrátor</button>
          <button className="btn btn-primary">Moderátor</button>
          <button className="btn btn-primary">Felhasználó</button>
        </div>
      </header>
      <main>
        <div
          className="col-12 text-center table-responsive"
          style={{ marginTop: "20px" }}
        >
          <h2>Felhasználók listája</h2>
          <table
            className="table table-hover table-striped table-bordered"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <thead>
              <tr>
                <th>Név</th>
                <th>Életkor</th>
                <th>Születési idő</th>
                <th>Email</th>
                <th>Aktív</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.nev}</td>
                  <td>{user.kor}</td>
                  <td>
                    {new Date(user.szuletesi_datum).toLocaleDateString("hu-HU")}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.aktiv ? "Igen" : "Nem"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleFelhasznaloTorles(user.id.toString())
                      }
                    >
                      Törlés
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handlePluszKor(user)}
                    >
                      Életkor növelése
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => handleMinuszKor(user)}
                    >
                      Életkor csökkentése
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12 text-center" style={{ marginTop: "20px" }}>
          <h2>Új felhasználó felvétele</h2>
          <form
            onSubmit={handleFelhasznaloFelvetel}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Név"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Életkor"
              value={kor}
              onChange={(e) => setKor(Number(e.target.value))}
              required
            />
            <input
              type="date"
              placeholder="Születési idő"
              value={szuletesiDatum.toISOString().split("T")[0]}
              onChange={(e) => setSzuletesiDatum(new Date(e.target.value))}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>
              Aktív:
              <input
                type="checkbox"
                checked={aktiv}
                onChange={(e) => setAktiv(e.target.checked)}
              />
            </label>
            <button type="submit" className="btn btn-success">
              Felhasználó felvétele
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
