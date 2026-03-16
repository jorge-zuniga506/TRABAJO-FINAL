import React from 'react'

function Registro() {
  return (
    <div>Registro
        <div className="container">
            <div className="register-container">
                <div className="register-header">
                    <h1>Registro</h1>
                </div>
                <div className="register-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registro