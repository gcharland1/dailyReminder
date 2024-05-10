package main

// Imports
import (
    "database/sql"
    "net/http"
    "time"

	"github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
     _ "github.com/mattn/go-sqlite3"
)

// Objet représentant une activité
type Activity struct {
    ID     string  `json:"id"`
    Name  string  `json:"name"`
    DaysInARow  float64 `json:"daysInARow"`
}

const file = "../activities.db"


// Service handler
func getActivities(c *gin.Context) {
    db, err := sql.Open("sqlite3", file)
    if err != nil {
        c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    rows, err := db.Query("SELECT * FROM activities")
    if err != nil {
        c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.IndentedJSON(http.StatusOK, rows)
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
    router.Run("localhost:8080")
}

