import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUsers, deleteUser, updateUserRole } from '../../../services/CrudParaUsuarios';

const UsuariosPanel = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsuarios(data);
        } catch (err) {
            setError('No se pudieron cargar los usuarios.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d9488',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(id);
                setUsuarios(usuarios.filter(u => u.id !== id));
                Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Hubo un error al eliminar el usuario.', 'error');
            }
        }
    };

    const handleCambiarRol = async (id, currentRole) => {
        const result = await Swal.fire({
            title: 'Modificar Rol',
            text: `¿Desea cambiar el rol actual (${currentRole})?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0d9488',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const updatedUser = await updateUserRole(id, currentRole);
                setUsuarios(usuarios.map(u => u.id === id ? updatedUser : u));
                Swal.fire('¡Actualizado!', 'El rol fue modificado exitosamente.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Hubo un error al actualizar el rol.', 'error');
            }
        }
    };

    if (loading) return <div className="tab-content fade-in"><p>Cargando usuarios...</p></div>;
    if (error) return <div className="tab-content fade-in"><p className="error">{error}</p></div>;

    return (
        <div className="tab-content fade-in">
            <h1>Gestión de Usuarios</h1>
            <p>Directorio de usuarios registrados. Se omiten datos sensibles (contraseñas).</p>
            
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge-role ${user.role}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn-action edit"
                                        onClick={() => handleCambiarRol(user.id, user.role)}
                                        title="Cambiar Rol"
                                    >
                                        Cambiar Rol
                                    </button>
                                    <button 
                                        className="btn-action delete"
                                        onClick={() => handleEliminar(user.id)}
                                        title="Eliminar"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsuariosPanel;
