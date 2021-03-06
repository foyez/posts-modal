import { useState } from 'react'
import Modal from './Modal/Modal'

export const CreateCategory = ({
  activeModal,
  handleCreateCatSubmit,
  closeModal,
}) => {
  const [category, setCategory] = useState('')
  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleCreateCatSubmit(category)
    setCategory('')
  }

  return (
    <Modal
      show={activeModal === 'createCategory'}
      closeModal={closeModal('createCategory')}
    >
      <button
        onClick={closeModal('createCategory')}
        type="button"
        className="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <h1>Create a category</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category-name">Category</label>
          <input
            onChange={handleChange}
            value={category}
            className="form-control"
            id="category-name"
          />
        </div>

        <button className="btn btn-secondary">Submit</button>
      </form>
    </Modal>
  )
}
