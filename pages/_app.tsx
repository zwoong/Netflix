import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // HOC(Higher-Order Component) : 컴포넌트 로직을 재사용하기 위해 사용되고 컴포넌트를 가져와
    // 새 컴포넌트를 반환하는 함수 
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
