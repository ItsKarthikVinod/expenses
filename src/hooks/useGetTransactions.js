import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase';
import useGetUserInfo from './useGetUserInfo';


function useGetTransactions() {
    const [transactions, setTransations] = useState([])
    const [transactionTotal, setTransactionTotal] = useState({
        balance: 0.0,
        expenses: 0.0,
        income:0.0
    })
    const transactionCollectionRef = collection(db, "transactions");
    const {userID}= useGetUserInfo()
    const getTransations = async () => {
        let unsubscribe
        try {
            const queryTransactions = query(transactionCollectionRef, where('userID', '==', userID), orderBy('createdAt'))
            
            unsubscribe=onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0
                let totalExpenses = 0
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id
                    docs.push({ ...data, id })
                    if (data.transactionType === 'expense') {
                        totalExpenses+= Number(data.transactionAmount)
                    } else {
                        totalIncome+=Number(data.transactionAmount)
                    }
                    
                })
                
                setTransations(docs);

                let balance = totalIncome-totalExpenses
                setTransactionTotal({
                    balance,
                    income: totalIncome,
                    expenses: totalExpenses
                })
            })
            
            
        } catch (error) {
            console.error(error)
        }
        return ()=> unsubscribe()
    }
    useEffect(() => {
        getTransations()
    },[])
  return {transactions, transactionTotal}
}

export default useGetTransactions