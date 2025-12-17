import React, { useState } from 'react'
import './Catalogues.css'


import searchIcon from '../Assets/search_64px.png'
import bookIcon from '../Assets/book.png'


const Catalogue = () => {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [addedBooks, setAddedBooks] = useState([])

  // exemple de donnée pour le catalogue
  const subjects = [
    'Toutes les matières',
    'Informatique',
    'Droit',
    'Médecine',
    'Économie',
    'Sciences',
    'Lettres',
    'Ingénierie'
  ]

  const books = [
    {
      id: 1,
      title: 'Base de Données SQL',
      author: 'John Smith',
      subject: 'Informatique',
      year: 2023,
      description: 'Guide complet des bases de données relationnelles',
      isAdded: false
    },
    {
      id: 2,
      title: 'Introduction au Droit',
      author: 'Marie Dupont',
      subject: 'Droit',
      year: 2022,
      description: 'Fondamentaux du droit civil et pénal',
      isAdded: false
    },
    {
      id: 3,
      title: 'Droit des Affaires',
      author: 'Marie Dupont',
      subject: 'Droit',
      year: 2023,
      description: 'Droit commercial et des sociétés',
      isAdded: false
    },
    {
      id: 4,
      title: 'Algorithmique Avancée',
      author: 'Paul Martin',
      subject: 'Informatique',
      year: 2024,
      description: 'Structures de données et algorithmes complexes',
      isAdded: false
    },
   
  ]

  // Filtrer les livres
  const filteredBooks = books.filter(book => {
    const matchesSubject = !selectedSubject || 
      selectedSubject === 'Toutes les matières' || 
      book.subject === selectedSubject
    
    const matchesSearch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSubject && matchesSearch
  })

  const handleAddToLibrary = (bookId) => {
    if (addedBooks.includes(bookId)) {
      setAddedBooks(addedBooks.filter(id => id !== bookId))
    } else {
      setAddedBooks([...addedBooks, bookId])
    }
  }

  return (
    <div className="catalogue-container">
      <div className="catalogue-header">
        <h1 className="catalogue-title">Catalogue des Livres</h1>
      </div>

      {/* Barre de filtres et recherche */}
      <div className="controls-section">
        <div className="filter-controls">
          <div className="filter-group">
            <div className="filter-label">
              <span>Filtrer par matière</span>
            </div>
            <div className="subject-filters">
              {subjects.map((subject, index) => (
                <button
                  key={index}
                  className={`subject-filter ${selectedSubject === subject ? 'active' : ''}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="search-group">
            <div className="search-box">
              <img src={searchIcon} alt="Recherche" className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un livre, auteur ou sujet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="stats-bar">
          <span className="stat-item">
            <strong>{filteredBooks.length}</strong> livres trouvés
          </span>
          <span className="stat-item">
            <strong>{addedBooks.length}</strong> dans votre bibliothèque
          </span>
        </div>
      </div>

      {/* Grille des livres */}
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <div className="book-icon">
                  <img src={bookIcon} alt="Livre" />
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">Par {book.author}</p>
                  <div className="book-meta">
                    <span className="book-subject">{book.subject}</span>
                    <span className="book-year">{book.year}</span>
                  </div>
                </div>
              </div>

              <p className="book-description">{book.description}</p>

              <div className="book-actions">
                <button 
                  className={`add-button ${addedBooks.includes(book.id) ? 'added' : ''}`}
                  onClick={() => handleAddToLibrary(book.id)}
                >
                  {addedBooks.includes(book.id) ? 'Ajouté à la Bibliothèque' : 'Ajouter à la Bibliothèque'}
                </button>
                
                <button className="preview-button">
                   Aperçu
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon"></div>
            <h3>Aucun livre trouvé</h3>
            <p>Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Catalogue