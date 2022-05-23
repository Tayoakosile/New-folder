import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../utils/Util'
import { Provider } from 'react-redux'
import store from '../reduxStore/store'

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  )
}

export default Layout
