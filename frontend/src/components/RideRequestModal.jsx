import "../styles/riderequestmodal.css";

function RideRequestModal({

  request,

  onAccept,

  onReject,

}) {

  if (!request) return null;

  return (

    <div className="driver-modal1">

      {/* TOP */}
      <div className="driver-top1">

        <img
          src={request.passenger_pic}
          alt="passenger"
        />

        <div className="driver-name1">

          <div className="online-dot1"></div>

          <h2>
            {request.passenger_name}
          </h2>

        </div>

      </div>

      {/* INFO */}
      <div className="driver-info1">

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
      <div className="driver-bottom1">

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