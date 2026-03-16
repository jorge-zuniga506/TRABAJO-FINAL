import React from 'react'

function Inicioseccion() {
  return (
    <div>Inicioseccion
        <div className="container">
            <div className="login-container">
                <div className="login-header">
                    <h1>Iniciar Sesión</h1>
                </div>
                <div className="login-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inicioseccion