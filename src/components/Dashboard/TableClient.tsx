import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

interface Clientes {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface TableProps {
    searchTerm: string;
}

const TableClient: React.FC<TableProps> = ({ searchTerm }) => {
    const [Clientess, setClientess] = useState<Clientes[]>([]);
    const [selectedClientes, setSelectedClientes] = useState<Clientes | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadClientess();
    }, []);

    const loadClientess = () => {
        fetch("http://localhost:3000/auth/client/")
            .then((response) => response.json())
            .then((data: Clientes[]) => setClientess(data))
            .catch((error) => {
                console.error("Error al cargar los clientes:", error);
                alert("Error al cargar los Clientes");
            });
    };

    const saveChanges = () => {
        if (selectedClientes) {
            if (window.confirm("¿Quieres actualizar este Clientes?")) {
                fetch(
                    `http://localhost:3000/auth/client/${selectedClientes.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(selectedClientes),
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al actualizar el Clientes");
                        }
                        return response.json();
                    })
                    .then(() => {
                        loadClientess();
                        setShowModal(false);
                        setSelectedClientes(null);
                    })
                    .catch((error) => {
                        console.error("Error al guardar cambios:", error);
                        alert("Error al guardar los cambios del Clientes");
                    });
            }
        }
    };

    const handleEditClick = (Clientes: Clientes) => {
        setSelectedClientes(Clientes);
        setShowModal(true);
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm("¿Estás seguro de eliminar este Clientes?")) {
            fetch(`http://localhost:3000/auth/client/${id}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al eliminar el Clientes");
                    }
                    return response.text();
                })
                .then((result) => {
                    alert(result);
                    loadClientess();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Error al eliminar el Clientes");
                });
        }
    };

    const filteredClientess = Clientess.filter((Clientes) =>
        Clientes.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: "ID",
            selector: (row: Clientes) => row.id,
            sortable: true,
        },
        {
            name: "Nombre",
            selector: (row: Clientes) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: Clientes) => row.email,
            sortable: true,
        },
        {
            name: "Password",
            selector: (row: Clientes) => row.password,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row: Clientes) => (
                <>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Editar</Tooltip>}
                    >
                        <Button
                            className="btn btn-sm btn-edit"
                            onClick={() => handleEditClick(row)}
                        >
                            <MdModeEditOutline className="btn-modal-custom" />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Eliminar</Tooltip>}
                    >
                        <Button
                            className="btn btn-sm btn-delete"
                            onClick={() => handleDeleteClick(row.id)}
                        >
                            <MdDelete className="btn-modal-custom" />
                        </Button>
                    </OverlayTrigger>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="main-contenedor">
            <div className="contendorMain__titles"><h4>Administración de Clientes</h4></div>
            <div className="table-responsive">
                <DataTable
                    columns={columns}
                    data={filteredClientess}
                    pagination
                    highlightOnHover
                    striped
                /></div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Clientes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="edit-user-nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedClientes?.name || ""}
                                    onChange={(e) =>
                                        setSelectedClientes((prev) => ({
                                            ...prev!,
                                            nombre_Clientes: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="edit-user-email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={selectedClientes?.email || ""}
                                    onChange={(e) =>
                                        setSelectedClientes((prev) => ({
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
