package database

import (
	"database/sql"

	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/entity"
)

type ProductDB struct {
	db *sql.DB
}

func NewProductDB(db *sql.DB) *ProductDB {
	return &ProductDB{db: db}
}

func (productRepo *ProductDB) GetProducts() ([]*entity.Product, error) {
	rows, err := productRepo.db.Query("SELECT * FROM products")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var currentProduct entity.Product

		var rowError = rows.Scan(&currentProduct.ID, &currentProduct.Name, &currentProduct.Description, &currentProduct.Price, &currentProduct.CategoryID, &currentProduct.ImageURL)

		if rowError != nil {
			return nil, rowError
		}

		products = append(products, &currentProduct)
	}

	return products, nil
}

func (productRepo *ProductDB) GetProductByID(id string) (*entity.Product, error) {
	var product entity.Product
	error := productRepo.db.QueryRow("SELECT * FROM products WHERE id = ?", id).Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL)

	if error != nil {
		return nil, error
	}

	return &product, nil
}

func (productRepo *ProductDB) GetProductsByCategory(categoryID string) ([]*entity.Product, error) {
	rows, error := productRepo.db.Query("SELECT * FROM products WHERE category_id = ?", categoryID)

	if error != nil {
		return nil, error
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var currentProduct entity.Product

		var rowError = rows.Scan(&currentProduct.ID, &currentProduct.Name, &currentProduct.Description, &currentProduct.Price, &currentProduct.CategoryID, &currentProduct.ImageURL)

		if rowError != nil {
			return nil, rowError
		}

		products = append(products, &currentProduct)
	}

	return products, nil
}

func (productRepo *ProductDB) CreateProduct(product *entity.Product) (string, error) {
	_, error := productRepo.db.Exec("INSERT INTO products (id, name, description, price, category_id, image_url) values (?, ?, ?, ?, ?, ?)", product.ID, product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL)

	if error != nil {
		return "", error
	}

	return product.ID, nil
}
