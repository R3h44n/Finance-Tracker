//Utilities
import { currencyFormatter } from "@/lib/utils";
//Modal
import Modal from "../Modal";
//React Icons
import { FaTrashAlt } from "react-icons/fa";
//React
import { useContext } from "react";
//Context
import { financeContext } from "@/lib/store/context-api";
//Toastify
import { toast } from "react-toastify";

function ViewExpenseModal({show, onClose, expense}){
    const {deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext)

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id);
            toast.success("Expense category deleted successfully!")
        } catch (error){
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const deleteExpenseItemHandler = async (item) => {
        try {
            // Remove the item from the list
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            // Update the expense balance
            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount,
            }

            await deleteExpenseItem(updatedExpense, expense.id);
            toast.success("Expense item deleted successfully!");
        } catch(error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-4xl capitalize">{expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Delete</button>
            </div>

            <div>
                <h3 className="my-4 text-2xl">Expense History</h3>
                {expense.items.map(item => {
                    return (
                        <div 
                            key={item.id} 
                            className="flex items-center justify-between"
                        >
                            <small>
                                {item.createdAt.toMillis 
                                    ? new Date(item.createdAt.toMillis()).toISOString() 
                                    : item.createdAt.toISOString() 
                                }
                            </small>
                            <p className="flex items-center gap-2">
                                {currencyFormatter(item.amount)}
                                <button onClick={() => {
                                    deleteExpenseItemHandler(item)
                                }}>
                                    <FaTrashAlt className="delete"/>
                                </button>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default ViewExpenseModal;