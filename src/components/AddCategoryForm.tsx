import { useState } from 'react';

interface AddCategoryFormProps {
  onAddCategory: (name: string) => void;
}

const AddCategoryForm = ({ onAddCategory }: AddCategoryFormProps) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName('');
    }
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name..."
          className="form-input"
          required
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm; 