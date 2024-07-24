import errorImage from '../../images/error.svg'

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div>
        <img className='w-100 px-4' src={errorImage} alt="erroImage" />
      </div>
    </div>
  )
}
