import { useState, useEffect } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // 👉 AJOUT : état pour contrôler l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);

  async function loadUsers() {
    const res = await fetch("http://localhost:8082/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:8082/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("http://localhost:8082/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", email: "", password: "" });
    setEditingId(null);
    setShowForm(false); // 👉 cacher le formulaire
    loadUsers();
  }

  function handleEdit(u: User) {
    setEditingId(u.id!);
    setForm(u);
    setShowForm(true); // 👉 afficher le formulaire
  }

  async function handleDelete(id: number) {
    await fetch(`http://localhost:8082/users/${id}`, { method: "DELETE" });
    loadUsers();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestion des utilisateurs</h1>

      {/* USER LIST */}
      <table border={1} cellPadding={8} style={{ marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Modifier</button>
                <button onClick={() => handleDelete(u.id!)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👉 BOUTON POUR AFFICHER LE FORMULAIRE */}
      <button
        style={{ padding: "8px 16px", marginBottom: 20 }}
        onClick={() => {
          setEditingId(null); // création -> pas d'id
          setForm({ name: "", email: "", password: "" });
          setShowForm(true); // afficher le formulaire
        }}
      >
        ➕ Créer un utilisateur
      </button>

      {/* FORMULAIRE AFFICHÉ UNIQUEMENT SI showForm = true */}
      {showForm && (
        <div>
          <h2>{editingId ? "Modifier" : "Créer"} un utilisateur</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <br />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <br />

            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <br />

            <button type="submit">
              {editingId ? "Enregistrer les modifications" : "Créer"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false); // cacher
                setEditingId(null);
                setForm({ name: "", email: "", password: "" });
              }}
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
