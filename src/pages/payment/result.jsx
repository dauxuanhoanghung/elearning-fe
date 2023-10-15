import { Alert, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSnackbar } from '../../contexts/SnackbarContext'
import { registrationService } from '../../services'

const ResultPaymentPage = () => {
  const [params] = useSearchParams()
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true)
  const vnp_ResponseCode = params.get('vnp_ResponseCode')

  useEffect(() => {
    console.log(params);
    const handleRegister = async () => {
      if (vnp_ResponseCode === '00') {
        const res = await registrationService.register({
          course, amount: params.get(), code: params.get("vnp_TransactionNo")
        })
      } else {
        showSnackbar({ message: "Payment fail!!!", severity: 'error' });
      }
      setLoading(false)
    }
    handleRegister();
  }, [])

  return (
    <div>
      {loading && <Typography severity="success">Loading</Typography>}
      {!loading && vnp_ResponseCode !== '00' ?
        <Alert severity="error">Payment Fail!</Alert> :
        <Alert severity="success">Payment Successful!</Alert>}
    </div>
  )
}

export default ResultPaymentPage;