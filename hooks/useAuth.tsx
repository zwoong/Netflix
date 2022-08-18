import { async } from '@firebase/util'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

// Context : 전역 데이터를 관리하기 위해서 사용하는 저장 공간
const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode
    // type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    useEffect(
        () =>
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // Logged in...
              setUser(user)
              setLoading(false)
            } else {
              // Not logged in...
              setUser(null)
              setLoading(true)
              router.push('/login')
            }
    
            setInitialLoading(false)
          }),
        [auth]
      )

    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push("/")
            // setLoading(false) finally에 기재해줬으니 필요없는 코드가 아닐까?
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push("/")
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    } 

    const logout = async () => {
        setLoading(true)

        signOut(auth).then(() => {
            setUser(null)
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    /* 기존에 수향한 연산의 결과값을 어딘가에 저장해 두고 동일한 
    입력이 들어오면 재활용하는 프로그래밍 기법 */
    const memoedValue = useMemo(() => ({
        user, signUp, signIn, loading, logout, error
    }), [user, loading])

    return (
        // provider는 정의한 context를 하위 컴포넌트에게 전달하는 역할
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}