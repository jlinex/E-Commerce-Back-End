const router = require('express').Router();
const { Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.find().populate('products');
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
      const category = await Category.findById(req.params.id)
        .include({
          path: 'product_category',
          model: 'Product'
        });
  
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.post('/', async (req, res) => {
  // create a new category
  try {
    const CategoriesAll = await Category.create(req.body);
    res.status(200).json(CategoriesAll);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const CategoriesAll = await Category.update(req.body);
    res.status(200).json(CategoriesAll);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!Category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
