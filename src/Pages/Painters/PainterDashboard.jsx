import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PainterNav from '../../Components/Painter/PainterNav';
import { deleteSlots, editSlots, getPainterDashBoard } from '../../api/painterApi';


function PainterDashboard(props) {

    const [slots, setSlots] = useState([]);
    const [payments, setPayments] = useState([]);
    const [currentPageSlots, setCurrentPageSlots] = useState(1);
    const [currentPagePayments, setCurrentPagePayments] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [slotToDelete, setSlotToDelete] = useState(null); // State to store the slot to delete
    const itemsPerPage = 5;
  
    const currentpainter = useSelector((state) => state.painter.currentUser)
    const painterId = currentpainter.user._id
    // console.log(currentpainter,'currentpainter');
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('useeffect worked');
        
        try {
          const response = await getPainterDashBoard(painterId)
          setSlots(response?.data?.data?.slot);
          setPayments(response?.data?.data?.payments);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };
      fetchData();
    }, [painterId]);
  
    const handleEditSlot = (slot) => {
      setSelectedSlot(slot);
      setDate(slot?.date);
      setAmount(slot?.amount);
      setIsModalOpen(true);
    };
  
    const handleSaveSlot = async () => {
      try {
        const data = {date,amount}
        const response = await editSlots(selectedSlot._id,data);
        setSlots((prevSlots) => prevSlots.map((slot) => (slot._id === response.data._id ? response.data : slot)));
        toast.success("slot edited")
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating slot:', error);
      }
    };
  
    const handleDeleteSlot = (slotId) => {
      setSlotToDelete(slotId); 
      setIsDeleteModalOpen(true);
    };
  
    const confirmDeleteSlot = async () => {
      try {
        await deleteSlots(slotToDelete);
        setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== slotToDelete));
        toast.error("post deleted")
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting slot:', error);
      }
    };
  
    const cancelDeleteSlot = () => {
      setIsDeleteModalOpen(false); // Close delete confirmation modal
      setSlotToDelete(null); // Clear slot to delete
    };
  
    const paginate = (items = [], page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.slice(startIndex, endIndex);
    };
  
    const handlePageChangeSlots = (page) => {
      setCurrentPageSlots(page);
    };
  
    const handlePageChangePayments = (page) => {
      setCurrentPagePayments(page);
    };
  
    const calculateTotalProfit = () => {
      return payments.reduce((total, payment) => total + payment.amount, 0);
    };

    return (
        <>

          <PainterNav />    
        <Toaster />
          <div className='flex h-screen w-full items-center'>    
        <div className=" flex flex-col justify-around w-full px-4">
          <h2 className="text-3xl font-bold mb-6 underline font-serif text-black">Painter Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slots Section */}
            <div className="bg-[#50187b] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">My Slots</h3>
              <div className='border w-20 h-10 flex justify-center items-center bg-green-500 m-2'>
                <Link to={"/painter/slot"}>
                  Add Slot
                </Link>
              </div>
  
              <ul>
                {paginate(slots, currentPageSlots).map((slot, index) => (
                  <li
                    key={index}
                    className={`mb-2 p-4 border-b border-gray-200 ${slot.status === 'booked' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}
                  >
                    <div className="text-lg font-medium">{new Date(slot?.date).toLocaleDateString()}</div>
                    <div>Amount: {slot?.amount}₹</div>
                    <div>Status: {slot?.status}</div>
                    {slot.status === 'pending' && (
                      <>
                        <button
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                          onClick={() => handleEditSlot(slot)}
                        >
                          Edit
                        </button>
                        <button
                          className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
                          onClick={() => handleDeleteSlot(slot._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <Pagination
                totalItems={slots.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPageSlots}
                onPageChange={handlePageChangeSlots}
              />
            </div>
            {/* Payments Section */}
            <div className="bg-[#50187b] p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">My Payments</h3>
              <div className="text-lg font-medium mb-4 text-white">
                Total Profit: {calculateTotalProfit()}₹
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-[#6920a4] text-left text-xs font-medium text-white uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 bg-[#6920a4] text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 bg-[#6920a4] text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 bg-[#6920a4] text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginate(payments, currentPagePayments).map((payment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap bg-[#6920a4] text-white">{(currentPagePayments - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap bg-[#6920a4] text-white">{payment?.userId?.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap bg-[#6920a4] text-white">{new Date(payment?.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap bg-[#6920a4] text-white">{payment?.amount}₹</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                totalItems={payments.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPagePayments}
                onPageChange={handlePageChangePayments}
              />
            </div>
          </div>
        </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Slot</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Amount</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveSlot}
              >
                Save
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p>Are you sure you want to delete this slot?</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDeleteSlot}
              >
                Delete
              </button>
              <button
                className="mt-4 ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={cancelDeleteSlot}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
}


const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

export default PainterDashboard;