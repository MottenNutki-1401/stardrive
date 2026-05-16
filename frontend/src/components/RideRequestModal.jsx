import "../styles/drivermodal.css";

function RideRequestModal({

  request,

  onAccept,

  onReject,
s
}) {

  if (!request) return null;

  return (

    <div className="driver-modal">

      <div className="driver-top">

        <h2>
          New Ride Request
        </h2>

      </div>

      <div className="driver-info">

        <p>
          Passenger ID:
          {request.passenger_id}
        </p>

        <p>
          Offer:
          ₱{request.offer}
        </p>

        <p>
          Status:
          {request.status}
        </p>

      </div>

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