import React, { useState, useSelector} from 'react';
import { SecondModal } from '../../context/SecondModal'
import './index.css'



function NotAvailableModal({buttonTxt, bookData}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>

    <div className='notavailablebutton' onClick={() =>setShowModal(true)}>{buttonTxt}  <div className="price-to-bold">
          ${bookData[0].price_hardcover ? bookData[0].price_hardcover.toFixed(2) : 0.0}
        </div></div>
      {showModal && (
        <SecondModal className={"notavailablemodal"} onClose={() => setShowModal(false)}>
              <button
          className="cart-header-y"
          onClick={() =>setShowModal(false)}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </button>
<div className="not-available-message">Sorry, this book is not yet available in your selected format.  Check back again soon, or select a different format.</div>

        </SecondModal>
      )}
    </>
  );
}

export default NotAvailableModal;
