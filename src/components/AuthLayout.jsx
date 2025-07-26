import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected ( { children, auth = true }) {
   const navigate = useNavigate()
   const authStatus = useSelector((state) => state.auth)
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      if (auth && authStatus.status !== auth ) {
         navigate("/login")
      } else if (!auth && authStatus.status !== auth) {
         navigate("/")
      } else {
         setLoading(false)
      }
      setLoading(false)
   }, [authStatus, navigate, auth])
   return loading ? <h1>Loading...</h1> : <>{children}</>
}
