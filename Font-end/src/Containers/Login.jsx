import React, { useState } from 'react'
import '../Containers/Login.css'

import user_icon from '../Assets/user.svg'
import email_icon from '../Assets/mail.svg'
import password_icon from '../Assets/lock.svg'
import field_icon from '../Assets/book.png'


const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    field: '',
    level: ''
  })

  const fields = [
    'Informatique','Médecine', 'Ingénierie', 
    'Commerce', 'Sciences', 'Arts'
  ]

  const levels = [
    'Licence 1', 'Licence 2', 'Licence 3',
    'Master 1', 'Master 2', 'Doctorat'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Connexion avec:', formData.email, formData.password)
    } else {
      console.log('Inscription avec:', formData)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      field: '',
      level: ''
    })
  }

  return (
    <div className='login-container'>
      <div className="header">
        <div className="text">{isLogin ? 'Connexion' : 'Inscription Étudiant'}</div>
        <div className="underline"></div>
        <div className="toggle-text">
          {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'} 
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? ' Créer un compte' : ' Se connecter'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input">
            <img src={user_icon} alt="Nom" />
            <input 
              type="text" 
              name="name"
              placeholder='Nom complet' 
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email" />
          <input 
            type="email" 
            name="email"
            placeholder='Adresse email' 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="Mot de passe" />
          <input 
            type="password" 
            name="password"
            placeholder='Mot de passe' 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <>
            <div className="input">
              <img src={password_icon} alt="Confirmation" />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder='Confirmer le mot de passe' 
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>

            <div className="input">
              <select 
                name="field"
                value={formData.field}
                onChange={handleChange}
                required={!isLogin}
                className="select-input"
              >
                <option value="">Sélectionnez votre filière</option>
                {fields.map((field, index) => (
                  <option key={index} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div className="input">
              <img src={level_icon} alt="Niveau" />
              <select 
                name="level"
                value={formData.level}
                onChange={handleChange}
                required={!isLogin}
                className="select-input"
              >
                <option value="">Sélectionnez votre niveau</option>
                {levels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {isLogin && (
          <div className="forgot-password">
            Mot de passe oublié ? <span className="click-here">Cliquez ici</span>
          </div>
        )}

        <div className="submit-container">
          <button type="submit" className="submit">
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </div>

        {!isLogin && (
          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              J'accepte les conditions d'utilisation et la politique de confidentialité
            </label>
          </div>
        )}
      </form>
    </div>
  )
}

export default Login