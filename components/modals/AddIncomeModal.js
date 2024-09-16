//React
import { useRef, useContext } from "react";
//utilities
import { currencyFormatter } from "@/lib/utils";
//Modals
import Modal from "@/components/Modal";
//Context
import { financeContext } from "@/lib/store/context-api";
import { authContext } from "@/lib/store/auth-context";
//Icons
import { FaTrashAlt } from "react-icons/fa";
//Toastify
import { toast } from "react-toastify";

function AddIncomeModal({show, onClose}){
    const amountRef = useRef()
    const descriptionRef = useRef()
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext)

    const {user} = useContext(authContext)

    //Handler Functions
    const addIncomeHandler = async (e) => {
        e.preventDefault();
    
        const newIncome = {
            amount: +amountRef.current.value,
            Description: descriptionRef.current.value,
            createdAt: new Date(),
            uid: user.uid,
        };

        try{
            await addIncomeItem(newIncome);
            descriptionRef.current.value = "";
            amountRef.current.value = "";
            toast.success("Income added successfully!")
        } catch(error){
            console.log(error.message);
            toast.error(error.message);
        }
    }
    
    const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
            toast.success("Income deleted successfully.")
        } catch(error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return(
        <Modal show={show} onClose={onClose}>
            <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
            <div className="input-form">
                <label htmlFor="amount">Income Amount</label>
                <input 
                type="number"
                ref={amountRef}
                name="amount" 
                min={0.01} 
                step={0.01} 
                placeholder="Enter income amount" 
                required
                />
            </div>

            <div className="flex flex-col gap-4">
                <label htmlFor="Description">Name</label>
                <input 
                type="text"
                ref={descriptionRef}
                name="Description"  
                placeholder="Enter income name" 
                required
                />
            </div>

            <button type="submit" className="btn btn-secondary btn-submit">
                Add entry
            </button>
            </form>

            <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-2xl font-bold">Income History</h3>

            {income.map(i => {
                return (
                <div className="flex justify-between item-center" key={i.id}>
                    <div>
                    <p className="font-semibold">{i.Description}</p>
                    <small className="text-xs">{i.createdAt.toISOString()}</small>
                    </div>
                    <p className="flex items-center gap-2">
                    {currencyFormatter(i.amount)}
                    <button onClick={() => { deleteIncomeEntryHandler(i.id) }}>
                        <FaTrashAlt color="#cb4335"/>
                    </button>
                    </p>
                </div>
                )
            })}
            </div>
        </Modal>
    )
}

export default AddIncomeModal;