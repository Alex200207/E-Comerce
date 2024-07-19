import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

interface Usuario {
    ID_Usuario: number;
    nombre_usuario: string;
    email: string;
}

interface TableProps {
    searchTerm: string;
}

const TableClient: React.FC<TableProps> = ({ searchTerm }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = () => {
        fetch("http://localhost:3000/usuarios")
            .then((response) => response.json())
            .then((data: Usuario[]) => setUsuarios(data))
            .catch((error) => {
                console.error("Error al cargar los usuarios:", error);
                alert("Error al cargar los usuarios");
            });
    };

    const saveChanges = () => {
        if (selectedUsuario) {
            if (window.confirm("¿Quieres actualizar este usuario?")) {
                fetch(
                    `http://localhost:3000/usuarios/${selectedUsuario.ID_Usuario}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(selectedUsuario),
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al actualizar el usuario");
                        }
                        return response.json();
                    })
                    .then(() => {
                        loadUsuarios();
                        setShowModal(false);
                        setSelectedUsuario(null);
                    })
                    .catch((error) => {
                        console.error("Error al guardar cambios:", error);
                        alert("Error al guardar los cambios del usuario");
                    });
            }
        }
    };

    const handleEditClick = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setShowModal(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            fetch(`http://localhost:3000/usuarios/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al eliminar el usuario");
                    }
                    return response.text();
                })
                .then((result) => {
                    alert(result);
                    loadUsuarios();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error al eliminar el usuario");
                });
        }
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: "ID",
            selector: (row: Usuario) => row.ID_Usuario,
            sortable: true,
        },
        {
            name: "Nombre",
            selector: (row: Usuario) => row.nombre_usuario,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: Usuario) => row.email,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row: Usuario) => (
                <>
                    <button
                        className="btn btn-sm btn-edit"
                        onClick={() => handleEditClick(row)}
                    >
                        <MdModeEditOutline className="btn-modal-custom" />
                    </button>
                    <button
                        className="btn btn-sm btn-delete"
                        onClick={() => handleDeleteClick(row.ID_Usuario)}
                    >
                        <MdDelete className="btn-modal-custom"/>
                    </button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="main-contenedor">
                <DataTable
                    columns={columns}
                    data={filteredUsuarios}
                    pagination
                    highlightOnHover
                    striped
                />
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="edit-user-nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUsuario?.nombre_usuario || ""}
                                    onChange={(e) =>
                                        setSelectedUsuario((prev) => ({
                                            ...prev!,
                                            nombre_usuario: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="edit-user-email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedUsuario?.email || ""}
                                    onChange={(e) =>
                                        setSelectedUsuario((prev) => ({
                                            ...prev!,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={saveChanges}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default TableClient;
