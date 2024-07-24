

export default function Footer() {
  return (
    <>
      <div className=" bg-main-light  mt-5 p-4">
      <div className="w-auto ">
          <h4 className="fw-bold fs-6">Get the FrechCart app</h4>
          <h5 className="text-muted fw-semibold fs-6">
            We will send you a link ,open it on your phone to download the app
          </h5>
        </div>
        <div className="">
          <div className="row align-items-center my-4 px-4">
            <div className="col-12 col-md-8 mb-3 mb-md-0">
              <input
                className="form-control myshadow ps-3 bg-white"
                type="email"
                placeholder="Email..."
              />
            </div>
            <div className="col-12 col-md-4">
              <button className="btn bg-main py-2 w-100 text-white">
                Share App Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
