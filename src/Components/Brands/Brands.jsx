import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "../Loading/Loading";


export default function Brands() {
  async function getAllBrands(limit, page) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`, {
      params: { limit, page },
    });
  }

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(12);

  function nextPage() {
    if (data.data.data.length < pageSize) {
      return
    }else{
      setPageNumber(pageNumber + 1)
    }
  }
  function prevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  const { data, isLoading } = useQuery(
    ["getAllBrands", pageSize, pageNumber],
    () => {
      return getAllBrands(pageSize, pageNumber);
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        <div className=" d-flex justify-content-evenly align-items-center mt-4 gap-sm-0">
          
        <button onClick={prevPage} className="btn btn-outline-success  myshadow  fw-bold">
          Previous
          </button>
          
          <span className="bg-main-light px-3 py-2 rounded-5 myshadow h4 text-muted">{data.data.data.length < pageSize ? <span className="text-main">Last Brands</span> : pageNumber}</span>
          <button
              onClick={nextPage}
              className="btn btn-outline-success myshadow fw-bold"
            >
              Next
            </button>
          
        </div>
        <div className="row mt-5">
          {data.data.data.map((brand, index) => {
            return (
              <div key={index} className="col-md-2 cursor-pointer">
                <div className="product p-4 rounded-2 bg-dark-subtle">
                  <img className="w-100 rounded-5" src={brand.image} alt={brand.slug} />
                  <p className="text-muted fw-bold text-center mt-4 ">
                    {brand.name}
                  </p>
                </div>
                ;
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
