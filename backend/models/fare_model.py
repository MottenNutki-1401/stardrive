import pandas as pd

from sklearn.linear_model import LinearRegression

# LOAD DATA
data = pd.read_csv("data/train.csv")

# TRAINING DATA
X = data[[
    "distance",
    "eta",
    "demand",
    "time"
]]

y = data["fare"]

# MODEL
fare_model = LinearRegression()

fare_model.fit(X, y)

# FUNCTION
def predict_fare(
    distance,
    eta,
    demand,
    time
):

    prediction = fare_model.predict([[
        distance,
        eta,
        demand,
        time
    ]])[0]

    return round(prediction, 2)