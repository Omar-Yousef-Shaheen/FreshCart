import { FallingLines } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="d-flex vh-100 bg-light bg-opacity-50 justify-content-center align-items-center">
    <FallingLines
      color="#0aad0a"
      width="150"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>


  )
}
