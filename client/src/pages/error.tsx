import { Link } from "react-router-dom"

function Error({message} : {message: string}) {
  return (
    <div>
        <p>
            {message}
        </p>
        <Link to="/">Home</Link>
    </div>
  )
}

export default Error