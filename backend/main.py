from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from models.fare_model import predict_fare

from models.compatibility_model import (
    predict_acceptance
)

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

#ROOT project

@app.get("/")

def root():

    return {
        "message": "Backend running...."
    }

#requesting model

class RideRequest(BaseModel):

    distance: float
    eta: float
    demand: int
    time: int

#AI prediction endpoint
@app.post("/predict")

def predict_ride(request: RideRequest):
    

    #fare engine

    suggested_fare = predict_fare(

        request.distance,
        request.eta,
        request.demand,
        request.time
    )

    #compatability module

    compatibility = predict_acceptance(

        suggested_fare,

        request.distance,
        request.eta,
        request.demand,
        request.time
    )

   # return response
    return {

        "suggested_fare":
            suggested_fare,

        "acceptance_probability":
            compatibility["probability"],

        "status":
            compatibility["status"],

        "prediction":
            compatibility["prediction"]
    }