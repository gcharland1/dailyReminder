package main

// Imports
import (
    "net/http"

    "github.com/gin-gonic/gin"
)

// Objet représentant une activité
type activity struct {
    ID     string  `json:"id"`
    Name  string  `json:"name"`
    DaysInARow  float64 `json:"daysInARow"`
}


// Données brutes
var activities = []activity{
    {ID: "1", Name: "Yoga aérien", DaysInARow: 5},
    {ID: "2", Name: "Cube Rubik's", DaysInARow: 2},
    {ID: "3", Name: "Se coucher tôt", DaysInARow: 1},
}

// Service handler
func getActivities(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, activities)
}

// Controller
func main() {
    router := gin.Default()

    router.GET("/activities", getActivities)
    router.Run("localhost:8080")
}
