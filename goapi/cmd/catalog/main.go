package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/database"
	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/service"
	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/webserver"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/imersao_fullcycle_17")
	if err != nil {
		// panic allows to stop the execution of the program
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	categoryHandler := webserver.NewCategoryHandler(categoryService)
	productHandler := webserver.NewProductHandler(productService)

	router := chi.NewRouter()

	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	router.Get("/category", categoryHandler.GetCategories)
	router.Get("/category/{id}", categoryHandler.GetCategory)
	router.Post("/category", categoryHandler.CreateCategory)

	router.Get("/product", productHandler.GetProducts)
	router.Get("/product/{id}", productHandler.GetProduct)
	router.Get("/product/category/{categoryID}", productHandler.GetProductByCategory)
	router.Post("/product", productHandler.CreateProduct)

	fmt.Println("🚀 Server running on port 8080")
	http.ListenAndServe(":8080", router)
}
