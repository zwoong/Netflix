import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

// Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다
// 값을 읽는 컴포넌트들은 암묵적으로 Atom을 구독한다.
export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | DocumentData | null>({
  key: 'movieState',
  default: null,
})