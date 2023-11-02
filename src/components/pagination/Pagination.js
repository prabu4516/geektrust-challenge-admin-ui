import React, { useContext } from 'react'
import { MyContext } from '../context'
import "./pagination.css"
const Pagination = () => {
  const {
    filterD,
    currPage, setCurrpage,
    setChecked,setSelectAll,
    userPerPage
  } = useContext(MyContext);

  const totalBtn = Math.ceil(filterD.length / userPerPage);
  const pageNumber = Array.from({length: totalBtn}, (_, i) => i+1);

  const handlePageChange = (num)=>{
    setCurrpage(num);
    setChecked([]);
    setSelectAll(false);

  }
  return (
    <div className='btnCont'>
      <div className='btnContIN'>
      <button className="num" onClick={()=>{setCurrpage(1)}}>&lt;&lt;</button>
      <button className="num" onClick={()=>{
        (currPage === 1) ? setCurrpage(1): setCurrpage(currPage -1)}}>&lt;</button>
      {pageNumber.map((number, ind) => {
        return (
          <span>
            <button  className="num" onClick={()=>handlePageChange(number)}>
              {number}
            </button>
          </span>
        )
      })}
      <button className="num"onClick={()=>{
        (currPage === totalBtn)? setCurrpage(totalBtn):setCurrpage(currPage+1);
      }}>&gt;</button>
      <button  className="num" onClick={()=>{setCurrpage(totalBtn
        )}}>&gt;&gt;</button>
</div>

    </div>
  )
}

export default Pagination