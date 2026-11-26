import type { Felhasznalok } from "../types/type";

interface AdminProps {
  users: Felhasznalok[];
  nev: string;
  setNev: Function;
  kor: number;
  setKor: Function;
  szuletesiDatum: Date;
  setSzuletesiDatum: Function;
  aktiv: boolean;
  setAktiv: Function;
  email: string;
  setEmail: Function;
  handleFelhasznaloFelvetel: (e) => void;
  handleFelhasznaloTorles: Function;
  handlePluszKor: Function;
  handleMinuszKor: Function;
  handleAktivValtas: Function;
}

function Admin(props: AdminProps) {
  return (
    <>
      <div className="col-12 text-center table-responsive mt-4">
        <h2>Felhasználók listája - Adminisztrátor</h2>
        <table className="table table-hover table-striped table-bordered">
          <thead className="table-dark">
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
            {props.users.map((user) => (
              <tr key={user.id}>
                <td>{user.nev}</td>
                <td>{user.kor}</td>
                <td>
                  {new Date(user.szuletesi_datum).toLocaleDateString("hu-HU")}
                </td>
                <td>{user.email}</td>
                <td>{user.aktiv ? "Igen" : "Nem"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => props.handleFelhasznaloTorles(user.id.toString())}
                  >
                    Törlés
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => props.handlePluszKor(user)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => props.handleMinuszKor(user)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => props.handleAktivValtas(user)}
                  >
                    Aktív váltása
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-12 text-center mt-4 mb-5">
        <h2>Új felhasználó felvétele</h2>
        <form
          onSubmit={props.handleFelhasznaloFelvetel}
          className="d-flex flex-column align-items-center gap-2"
        >
          <input
            className="form-control w-25"
            type="text"
            placeholder="Név"
            value={props.nev}
            onChange={(e) => props.setNev(e.target.value)}
            required
          />
          <input
            className="form-control w-25"
            type="number"
            placeholder="Életkor"
            value={props.kor}
            onChange={(e) => props.setKor(Number(e.target.value))}
            required
          />
          <input
            className="form-control w-25"
            type="date"
            value={props.szuletesiDatum.toISOString().split("T")[0]}
            onChange={(e) => props.setSzuletesiDatum(new Date(e.target.value))}
            required
          />
          <input
            className="form-control w-25"
            type="email"
            placeholder="Email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
            required
          />
          <label>
            Aktív:
            <input
              className="form-check-input ms-2"
              type="checkbox"
              checked={props.aktiv}
              onChange={(e) => props.setAktiv(e.target.checked)}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Felhasználó felvétele
          </button>
        </form>
      </div>
    </>
  );
}

export default Admin;