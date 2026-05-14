import pandas as pd

from sklearn.neighbors import KNeighborsClassifier

# LOAD DATA
data = pd.read_csv("data/train.csv")

# TRAINING DATA
X = data[[
    "fare",
    "distance",
    "eta",
    "demand",
    "time"
]]

y = data["accepted"]

# MODEL
knn_model = KNeighborsClassifier(
    n_neighbors=3
)

knn_model.fit(X, y)

# FUNCTION
def predict_acceptance(
    fare,
    distance,
    eta,
    demand,
    time
):

    prediction = knn_model.predict([[
        fare,
        distance,
        eta,
        demand,
        time
    ]])[0]

    probability = knn_model.predict_proba([[
        fare,
        distance,
        eta,
        demand,
        time
    ]])[0][1]

    if probability > 0.7:
        status = "High"

    elif probability > 0.4:
        status = "Medium"

    else:
        status = "Low"

    return {
        "prediction":
            "Accept"
            if prediction == 1
            else "Reject",

        "probability":
            round(probability * 100, 2),

        "status":
            status
    }