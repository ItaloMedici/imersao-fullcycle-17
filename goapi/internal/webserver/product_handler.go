package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/entity"
	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/service"
	"github.com/go-chi/chi"
)

type WebProductHandler struct {
	ProductService *service.ProductService
}

func NewProductHandler(productService *service.ProductService) *WebProductHandler {
	return &WebProductHandler{ProductService: productService}
}

func (handler *WebProductHandler) GetProducts(response http.ResponseWriter, request *http.Request) {
	products, err := handler.ProductService.GetProducts()

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(response).Encode(products)
}

func (handler *WebProductHandler) GetProduct(response http.ResponseWriter, request *http.Request) {
	id := chi.URLParam(request, "id")

	if id == "" {
		http.Error(response, "ID is required", http.StatusBadRequest)
		return
	}

	product, err := handler.ProductService.GetProductByID(id)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(response).Encode(product)
}

func (handler *WebProductHandler) GetProductByCategory(response http.ResponseWriter, request *http.Request) {
	categoryID := chi.URLParam(request, "categoryID")

	if categoryID == "" {
		http.Error(response, "CategoryID is required", http.StatusBadRequest)
		return
	}

	products, err := handler.ProductService.GetProductsByCategory(categoryID)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(response).Encode(products)
}

func (handler *WebProductHandler) CreateProduct(response http.ResponseWriter, request *http.Request) {
	var product entity.Product

	err := json.NewDecoder(request.Body).Decode(&product)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := handler.ProductService.CreateProduct(product.Name, product.Description, product.CategoryID, product.ImageURL, product.Price)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(response).Encode(result)
}
