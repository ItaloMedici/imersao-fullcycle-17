package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi"

	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/entity"
	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/service"
)

type WebCategoryHandler struct {
	CategoryService *service.CategoryService
}

func NewCategoryHandler(categoryService *service.CategoryService) *WebCategoryHandler {
	return &WebCategoryHandler{CategoryService: categoryService}
}

func (handler *WebCategoryHandler) GetCategories(response http.ResponseWriter, request *http.Request) {
	categories, err := handler.CategoryService.GetCategories()

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(response).Encode(categories)
}

func (handler *WebCategoryHandler) GetCategory(response http.ResponseWriter, request *http.Request) {
	id := chi.URLParam(request, "id")

	if id == "" {
		http.Error(response, "ID is required", http.StatusBadRequest)
		return
	}

	category, err := handler.CategoryService.GetCategoryByID(id)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(response).Encode(category)
}

func (handler *WebCategoryHandler) CreateCategory(response http.ResponseWriter, request *http.Request) {
	var category entity.Category

	err := json.NewDecoder(request.Body).Decode(&category)

	if err != nil {
		http.Error(response, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := handler.CategoryService.CreateCategory(category.Name)

	if err != nil {
		http.Error(response, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(response).Encode(result)
}
