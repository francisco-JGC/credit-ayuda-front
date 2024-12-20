import { Link } from 'react-router-dom'
import creditAyudaIcon from '../../assets/images/credit-ayuda.webp'

export const Logo = () => (
  <Link to="/" className="-m-1.5 p-1.5">
    <span className="sr-only">Credit-Ayuda</span>
    <img alt="Credit-Ayuda" src={creditAyudaIcon} className="h-8 w-auto" />
  </Link>
)
