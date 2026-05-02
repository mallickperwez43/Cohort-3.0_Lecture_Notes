import './App.css'
import ItemList from './components/ItemList';

function App() {

  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  return (
    <div>
      <ItemList items={items} />
    </div>
  )
}

export default App
