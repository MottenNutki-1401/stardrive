import "../styles/riderequestmodal.css";

function RideRequestModal({

  request,

  onAccept,

  onReject,

}) {

  if (!request) return null;

  return (

    <div className="driver-modal">

      {/* TOP */}
      <div className="driver-top">

        <img
          src={request.passenger_pic}
          alt="passenger"
        />

        <div className="driver-name">

          <div className="online-dot"></div>

          <h2>
            {request.passenger_name}
          </h2>

        </div>

      </div>

      {/* INFO */}
      <div className="driver-info">

        <p>
          Pickup:
          {request.pickup}
        </p>

        <p>
          Destination:
          {request.destination}
        </p>

        <p>
          Offer:
          ₱{request.offer}
        </p>

      </div>

      {/* BUTTONS */}
      <div className="driver-bottom">

        <button
          onClick={onAccept}
        >
          ACCEPT
        </button>

        <button
          onClick={onReject}
        >
          REJECT
        </button>

      </div>

    </div>
  );
}

export default RideRequestModal;