import { useState } from "react"

function useAuth() {
    const [user, setUser] = useState();

  return user
}

export default useAuth