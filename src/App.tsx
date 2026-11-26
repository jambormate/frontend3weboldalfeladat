import { useEffect, useState } from "react";
import "./App.css";
import type { Felhasznalok } from "./types/type";
import Admin from "./components/admin";
import Moderator from "./components/mod";
import User from "./components/user";

function App() {
  const [users, setUsers] = useState<Felhasznalok[]>([]);
  const [nev, setNev] = useState<string>("");
  const [kor, setKor] = useState<number>(0);
  const [szuletesiDatum, setSzuletesiDatum] = useState<Date>(new Date());
  const [aktiv, setAktiv] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [oldal, setOldal] = useState<string>("admin");

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
  async function handleAktivValtas(user: Felhasznalok) {
    try {
      const ujAktiv = !user.aktiv;
      const response = await fetch(
        "http://localhost:3000/felhasznalok/" + user.id,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ aktiv: ujAktiv }),
        }
      );
      setUsers((elozo) =>
        elozo.map((u) => (u.id === user.id ? { ...u, aktiv: ujAktiv } : u)),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="container-fluid bg-dark text-white">
        <div className="col-12 text-center">
          <h1>Felhasználók weboldal</h1>
        </div>
        <div
          className="col-12"
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <button
            className={`btn ${oldal === "admin" ? "btn-success" : "btn-primary"}`}
            onClick={() => setOldal("admin")}
          >
            Adminisztrátor
          </button>
          <button
            className={`btn ${oldal === "moderator" ? "btn-success" : "btn-primary"}`}
            onClick={() => setOldal("moderator")}
          >
            Moderátor
          </button>
          <button
            className={`btn ${oldal === "user" ? "btn-success" : "btn-primary"}`}
            onClick={() => setOldal("user")}
          >
            Felhasználó
          </button>
        </div>
      </header>
      <main className="container-fluid">
        {oldal === "admin" && (
          <Admin
            users={users}
            nev={nev}
            setNev={setNev}
            kor={kor}
            setKor={setKor}
            szuletesiDatum={szuletesiDatum}
            setSzuletesiDatum={setSzuletesiDatum}
            aktiv={aktiv}
            setAktiv={setAktiv}
            email={email}
            setEmail={setEmail}
            handleFelhasznaloFelvetel={handleFelhasznaloFelvetel}
            handleFelhasznaloTorles={handleFelhasznaloTorles}
            handlePluszKor={handlePluszKor}
            handleMinuszKor={handleMinuszKor}
            handleAktivValtas={handleAktivValtas}
          />
        )}

        {oldal === "moderator" && (
          <Moderator
            users={users}
            handlePluszKor={handlePluszKor}
            handleMinuszKor={handleMinuszKor}
            handleAktivValtas={handleAktivValtas}
          />
        )}

        {oldal === "user" && <User users={users} />}
      </main>
    </>
  );
}

export default App;
