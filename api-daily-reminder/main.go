package main

// Imports
import (
    "time"
    "net/http"

	"github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

// Objet représentant une activité
type Activity struct {
    ID     string  `json:"id"`
    Name  string  `json:"name"`
    DaysInARow  float64 `json:"daysInARow"`
}


// Données brutes
var activities = map[string]Activity{
    "1": {ID: "1", Name: "Patate", DaysInARow: 5},
    "2": {ID: "2", Name: "Cube Rubik's", DaysInARow: 2},
    "3": {ID: "3", Name: "Faire nos modules", DaysInARow: 1},
}

// Service handler
func updateActivityById(c *gin.Context) {
    id := c.Param("id")
    activity, ok := activities[id]
    if !ok {
        c.JSON(http.StatusNotFound, gin.H{"error": "Activity not found"})
        return
    }

    var updatedActivity Activity
    if err := c.BindJSON(&updatedActivity); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Update the user fields
    if updatedActivity.Name != "" {
        activity.Name = updatedActivity.Name
    }
    if updatedActivity.DaysInARow >= 0 {
        activity.DaysInARow = updatedActivity.DaysInARow
    }

    activities[id] = activity

    c.JSON(http.StatusOK, activity)
}

func getActivities(c *gin.Context) {
    act := make([]Activity, 0, len(activities))
    for _, activity := range activities {
        act = append(act, activity)
    }
    c.IndentedJSON(http.StatusOK, act)
}

// Controller
func main() {
    router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

    router.GET("/activities", getActivities)
    router.PATCH("/activities/:id", updateActivityById)
    router.Run("localhost:8080")
}


// Private functions
func getActivityById(id string) (Activity, bool) {
    var activity Activity
    for _, act := range activities {
        if act.ID == id {
            activity = act
            return activity, true
        }
    }
    return activity, false
}
