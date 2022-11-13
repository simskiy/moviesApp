import { Alert } from 'antd'
import React from 'react'
import './style.scss'

const ErrorIndicator = () => {
  const errorMsg = 'Извините. Произошла ошибка сети. Проверьте подключение Интернет или включите VPN.'
  return <Alert type="error" message={errorMsg} />
}

export default ErrorIndicator
