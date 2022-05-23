import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/inter'
import '@fontsource/inter'
import '../styles/globals.css'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  }
})
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
