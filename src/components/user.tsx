import type { Felhasznalok } from "../types/type";

interface UserProps {
  users: Felhasznalok[];
}

function User(props: UserProps) {
  return (
    <div className="col-12 text-center table-responsive mt-4">
      <h2>Felhasználók listája</h2>
      <table className="table table-hover table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Név</th>
            <th>Életkor</th>
            <th>Születési idő</th>
            <th>Email</th>
            <th>Aktív</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;