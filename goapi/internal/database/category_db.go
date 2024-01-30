package database

import (
	"database/sql"

	"github.com/ItaloMedici/imersao-fullcycle-17/goapi/internal/entity"
)

type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db: db}
}

func (categoryRepo *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, err := categoryRepo.db.Query("SELECT id, name FROM categories")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []*entity.Category

	for rows.Next() {
		var currentCategory entity.Category

		var err = rows.Scan(&currentCategory.ID, &currentCategory.Name)

		if err != nil {
			return nil, err
		}

		categories = append(categories, &currentCategory)
	}

	return categories, nil
}

func (categoryRepo *CategoryDB) GetCategoryByID(id string) (*entity.Category, error) {
	var category entity.Category
	err := categoryRepo.db.QueryRow("SELECT id, name FROM categories WHERE id = ?", id).Scan(&category.ID, &category.Name)

	if err != nil {
		return nil, err
	}

	return &category, nil
}

func (categoryRepo *CategoryDB) CreateCategory(category *entity.Category) (string, error) {
	_, err := categoryRepo.db.Exec("INSERT INTO categories (id, name) values (?, ?)", category.ID, category.Name)

	if err != nil {
		return "", err
	}

	return category.ID, nil
}
