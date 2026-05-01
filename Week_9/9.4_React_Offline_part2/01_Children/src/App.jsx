import { useState } from 'react';
import './App.css'
import Card from './components/Card'
import Modal from './components/Modal';
import Collapsible from './components/Collapsible';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* CARD */}
      <Card>
        <h2>Card Title</h2>
        <p>This is some content inside the card.</p>
      </Card>
      <Card>
        <h2>Another Card</h2>
        <p>This card has different content!</p>
      </Card>

      {/* MODAL */}
      <div>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2>Modal Title</h2>
          <p>This is some content inside the modal.</p>
        </Modal>
      </div>

      {/* COLLAPSIBLE */}
      <div>
        <Collapsible title="Section 1">
          <p>This is the content of section 1.</p>
        </Collapsible>
        <Collapsible title="Section 2">
          <p>This is the content of section 2.</p>
        </Collapsible>
      </div>
    </div>
  );
}

export default App
