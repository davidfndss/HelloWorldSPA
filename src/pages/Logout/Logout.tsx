import React from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Context/UserContext.jsx"
import Swal from 'sweetalert2'

function Logout() {
  const { setLoggedUserInfo } = React.useContext(UserContext)
  const navigate = useNavigate()
  async function logout() {
    Cookies.set("atk", "")
    Cookies.set("id", "")

    setLoggedUserInfo({})
  }

  React.useEffect(() => {
    Swal.fire({
      title: "Você deseja realmente Sair?",
      showDenyButton: true,
      showConfirmButton: true,
      icon: "warning",
      confirmButtonText: `Sair`,
      confirmButtonColor: "#d33",
      denyButtonText: `Cancelar`,
      denyButtonColor: `#3085d6`,
    }).then((result) => {
     if (result.isConfirmed) {
        logout()
        navigate("/")
      }

      if (result.isDenied) navigate(-1)

    });

  }, [])

  return
}

export { Logout }