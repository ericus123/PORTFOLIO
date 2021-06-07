import React from "react";
import { useLocation } from "react-router-dom";
import Link from "next/link";

const Paginate = (props) => {
  const { items, path } = props;
  // const { search } = useLocation();
  // let page = new URLSearchParams(search).get("page") || 1;
  const page = 1;
  const prevPage = items.prevPage;
  const nextPage = items.nextPage;
  const error = items.error;

  // const paginations = !error ? (
  //   <div class="pagination">
  //     {prevPage ? (
  //       <Link href={`${prevPage}`}>
  //         <a>&laquo;</a>
  //       </Link>
  //     ) : (
  //       <Link href="" style={{ pointerEvents: "none" }}>
  //         <a>&laquo;</a>
  //       </Link>
  //     )}
  //     {prevPage ? (
  //       <Link href={`${path + prevPage}`}>
  //         <a>{prevPage}</a>
  //       </Link>
  //     ) : null}
  //     <Link href="" className="active">
  //       {page}
  //     </Link>
  //     {nextPage ? (
  //       <Link href={`${path + nextPage}`}>
  //         <a>{nextPage}</a>
  //       </Link>
  //     ) : null}
  //     {nextPage ? (
  //       <Link href={`${path + nextPage}`}>
  //         <a>&raquo;</a>
  //       </Link>
  //     ) : (
  //       <Link href="" style={{ pointerEvents: "none" }}>
  //         <a>&raquo;</a>
  //       </Link>
  //     )}
  //   </div>
  // ) : null;
  // return paginations;
  return <></>;
};
export default Paginate;
