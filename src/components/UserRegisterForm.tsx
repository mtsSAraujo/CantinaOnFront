import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState<"ADMINISTRADOR" | "CLIENTE">("CLIENTE");
    const status = "DEFAULT"

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const payload = { nome, email, senha, tipoUsuario, status };

        try {
            await axios.post("http://localhost:8080/api/user/register", payload, {});

            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Erro ao cadastrar o usuário.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select
                        className="form-select"
                        value={tipoUsuario}
                        onChange={(e) =>
                            setTipoUsuario(e.target.value as "ADMINISTRADOR" | "CLIENTE")
                        }
                        required
                    >
                        <option value="ADMINISTRADOR">Administrador</option>
                        <option value="CLIENTE">Cliente</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>
        </div>
    );
};

export default UserRegister;
