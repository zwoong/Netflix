import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
        {/* HOC(Higher-Order Component) : 컴포넌트 로직을 재사용하기 위해 사용되고 
        컴포넌트를 가져와 새 컴포넌트를 반환하는 함수 */}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
