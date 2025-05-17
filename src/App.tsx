import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CategoryList from './components/CategoryList';
import AddCategoryForm from './components/AddCategoryForm';

// Define types
export interface Item {
  id: string;
  name: string;
  packed: boolean;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

function App() {
  // Load from localStorage or use default categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('packingCategories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    
    return [
      {
        id: uuidv4(),
        name: 'Essentials',
        items: [
          { id: uuidv4(), name: 'Passport', packed: false },
          { id: uuidv4(), name: 'Phone charger', packed: false },
          { id: uuidv4(), name: 'Wallet', packed: false },
        ]
      },
      {
        id: uuidv4(),
        name: 'Clothes',
        items: [
          { id: uuidv4(), name: 'T-shirts', packed: false },
          { id: uuidv4(), name: 'Socks', packed: false },
          { id: uuidv4(), name: 'Underwear', packed: false },
        ]
      },
      {
        id: uuidv4(),
        name: 'Toiletries',
        items: [
          { id: uuidv4(), name: 'Toothbrush', packed: false },
          { id: uuidv4(), name: 'Shampoo', packed: false },
          { id: uuidv4(), name: 'Sunscreen', packed: false },
        ]
      },
    ];
  });

  // Save to localStorage when categories change
  useEffect(() => {
    localStorage.setItem('packingCategories', JSON.stringify(categories));
  }, [categories]);

  // Add a new category
  const addCategory = (categoryName: string) => {
    setCategories([
      ...categories,
      {
        id: uuidv4(),
        name: categoryName,
        items: []
      }
    ]);
  };

  // Add a new item to a category
  const addItem = (categoryId: string, itemName: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            items: [
              ...category.items,
              { id: uuidv4(), name: itemName, packed: false }
            ]
          }
        : category
    ));
  };

  // Toggle item packed status
  const toggleItemPacked = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            items: category.items.map(item => 
              item.id === itemId
                ? { ...item, packed: !item.packed }
                : item
            )
          }
        : category
    ));
  };

  // Delete an item
  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            items: category.items.filter(item => item.id !== itemId)
          }
        : category
    ));
  };

  // Delete a category
  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Packing Checklist</h1>
          <p className="text-lg text-indigo-700">Never forget your essentials again!</p>
        </div>
        
        <AddCategoryForm onAddCategory={addCategory} />
        
        <CategoryList 
          categories={categories}
          onAddItem={addItem}
          onToggleItem={toggleItemPacked}
          onDeleteItem={deleteItem}
          onDeleteCategory={deleteCategory}
        />
      </div>
    </div>
  );
}

export default App;
