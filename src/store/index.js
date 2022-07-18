import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
  modal: '',
  walletAddress: '',
  connectedAccount: '',
  transactions: [],
  transaction: {
    address: '',
    amount: '',
    remark: '',
  },
  transactionCount: localStorage.getItem('transactionCount'),
  falseState: false
})

export { useGlobalState, setGlobalState }