import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import PainterNav from "../../Components/Painter/PainterNav";
import { createSlot } from '../../api/painterApi';
import { useSelector } from 'react-redux';

function PainterSlotAdd() {
  const [slots, setSlots] = useState([{ date: '', startTime: '', endTime: '', amount: '' }]);
  const [editedSlot, setEditedSlot] = useState({ date: '', startTime: '', endTime: '', amount: '' });
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null);
  const slotsEndRef = useRef(null);

  const currentpainter = useSelector((state) => state.painter.currentUser)
  const id = currentpainter.user._id
  console.log(currentpainter,'currentpainter');

  useEffect(() => {
    if (slotsEndRef.current) {
      slotsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [slots]);

  const handleInputChange = (index, event) => {
    const values = [...slots];
    values[index][event.target.name] = event.target.value;
    setSlots(values);
  };

  const handleAddSlot = () => {
    setSlots([...slots, { date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveSlot = (index) => {
    const values = [...slots];
    values.splice(index, 1);
    setSlots(values);
  };

  const handleEditSlot = (index) => {
    setCurrentSlotIndex(index);
    setEditedSlot(slots[index]);
    setModalIsOpen(true);
  };

  const handleModalInputChange = (event) => {
    setEditedSlot({ ...editedSlot, [event.target.name]: event.target.value });
  };

  const handleSaveEdit = () => {
    const updatedSlots = [...slots];
    updatedSlots[currentSlotIndex] = editedSlot;
    setSlots(updatedSlots);
    setModalIsOpen(false);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        // console.log(slots,"slots");   
     
      await createSlot(id,{slots})
      console.log('Slots submitted successfully:', {slots});
      // Optionally, you can reset the form or show a success message here
    } catch (error) {
      console.error('Error submitting slots:', error);
    }
  };

  return (
    <>
      <PainterNav/>
      <div className="flex justify-center items-center ">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add Available Slots</h2>
          <div className="max-h-60 overflow-y-auto">

                 {slots.map((slot, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                      <label className="block text-gray-700 mb-2">
                        Date:
                        <input
                          type="date"
                          name="date"
                          value={slot.date}
                          onChange={(event) => handleInputChange(index, event)}
                          className="w-full mt-1 p-2 border rounded"
                          required
                          disablePast
                        />
                      </label>
                      <label className="block text-gray-700 mb-2">
                        Start Time:
                        <input
                          type="time"
                          name="startTime"
                          value={slot.startTime}
                          onChange={(event) => handleInputChange(index, event)}
                          className="w-full mt-1 p-2 border rounded"
                          required
                        />
                      </label>
                      <label className="block text-gray-700 mb-2">
                        End Time:
                        <input
                          type="time"
                          name="endTime"
                          value={slot.endTime}
                          onChange={(event) => handleInputChange(index, event)}
                          className="w-full mt-1 p-2 border rounded"
                          required
                        />
                      </label>
                      <label className="block text-gray-700 mb-2">
                        Amount:
                        <input
                          type="number"
                          name="amount"
                          value={slot.amount}
                          onChange={(event) => handleInputChange(index, event)}
                          className="w-full mt-1 p-2 border rounded"
                          required
                        />
                      </label>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => handleEditSlot(index)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                        >
                          Edit Slot
                        </button>
                        {slots.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSlot(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                          >
                            Remove Slot
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

            <div ref={slotsEndRef}></div>
          </div>
          <button
            type="button"
            onClick={handleAddSlot}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Another Slot
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
          >
            Submit Slots
          </button>
        </form>
      </div>
      
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="absolute inset-0 flex items-center justify-center" overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75" closeTimeoutMS={200}>
              <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-xl mb-4">Edit Slot</h2>
                <label className="block text-gray-700 mb-2">
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={editedSlot.date}
                    onChange={handleModalInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </label>
                <label className="block text-gray-700 mb-2">
                  Start Time:
                  <input
                    type="time"
                    name="startTime"
                    value={editedSlot.startTime}
                    onChange={handleModalInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </label>
                <label className="block text-gray-700 mb-2">
                  End Time:
                  <input
                    type="time"
                    name="endTime"
                    value={editedSlot.endTime}
                    onChange={handleModalInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </label>
                <label className="block text-gray-700 mb-2">
                  Amount:
                  <input
                    type="number"
                    name="amount"
                    value={editedSlot.amount}
                    onChange={handleModalInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </label>
                <div className="flex justify-end">
                  <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Save
                  </button>
                  <button onClick={() => setModalIsOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4 ml-2">
                    Close
                  </button>
                </div>
              </div>
            </Modal>

    </>
  );
}

export default PainterSlotAdd;
