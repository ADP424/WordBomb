var proteins = new Map()
var fruits = new Map()
var vegetables = new Map()
var dairy = new Map()
var grains = new Map()

var selectedMenuFood
var selectedSelectedFood
var transferButton
var calorieCount

function setUp() {
    proteins.set('Steak', '300')
    proteins.set('Ground beef', '200')
    proteins.set('Chicken', '100')
    proteins.set('Fish', '80')
    proteins.set('Soy', '50')

    fruits.set('Orange', 300)
    fruits.set('Banana', 200)
    fruits.set('Pineapple', 100)
    fruits.set('Grapes', 80)
    fruits.set('Blueberries', 50)

    vegetables.set('Romaine', 30)
    vegetables.set('Green beans', 40)
    vegetables.set('Squash', 100)
    vegetables.set('Spinach', 50)
    vegetables.set('Kale', 10)

    dairy.set('Milk', 300)
    dairy.set('Yoghurt', 200)
    dairy.set('Cheddar cheese', 200)
    dairy.set('Skim milk', 100)
    dairy.set('Cottage cheese', 80)

    grains.set('Bread', 200)
    grains.set('Bagel', 300)
    grains.set('Pita', 250)
    grains.set('Naan', 210)
    grains.set('Tortilla', 120)

    transferButton = document.getElementById('TransferButton')

    calorieCount = 0
}

function setMenuItems(categorySelect) {
    menuItems = document.getElementById('MenuItems')
    menuItems.innerHTML = ""
    selectedCategory = categorySelect.options[categorySelect.selectedIndex]
    category = selectedCategory.value

    var categoryMap = new Map()
    if(category === "Protein") {
        categoryMap = proteins
    }
    else if(category === "Fruits") {
        categoryMap = fruits
    }
    else if(category === "Vegetables") {
        categoryMap = vegetables
    }
    else if(category === "Dairy") {
        categoryMap = dairy
    }
    else if(category === "Grains") {
        categoryMap = grains
    }
    else {
        opt = document.createElement('option')
        opt.textContent = "Select a category"
        menuItems.add(opt)
    }

    for (const [key, value] of categoryMap.entries()) {
        opt = document.createElement('option')
        opt.textContent = key
        opt.value = value
        menuItems.add(opt)
    }
}

function setSelectedMenuFood(foodSelector) {
    food = foodSelector.options[foodSelector.selectedIndex]
    if(food != null && food.textContent !== "Select a category") {
        selectedMenuFood = food
        transferButton.textContent = ">>"
    }
}

function setSelectedSelectedFood(foodSelector) {
    food = foodSelector.options[foodSelector.selectedIndex]
    if(food != null) {
        selectedSelectedFood = food
        transferButton.textContent = "<<"
        console.log(selectedSelectedFood)
        console.log(food)
    }
}

function transferFood() {
    menuItems = document.getElementById('MenuItems')
    selectedItems = document.getElementById('SelectedItems')
    caloriesLabel = document.getElementById('CaloriesLabel')
    
    if(selectedMenuFood != null && transferButton.textContent === ">>") {
        calorieCount += parseInt(selectedMenuFood.value)
        caloriesLabel.textContent = "Calories: " + calorieCount

        opt = document.createElement('option')
        opt.textContent = selectedMenuFood.textContent
        opt.value = selectedMenuFood.value
        selectedItems.add(opt)

        selectedMenuFood = null
        selectedSelectedFood = null
    }
    else if(selectedSelectedFood != null) {
        calorieCount -= parseInt(selectedSelectedFood.value)
        caloriesLabel.textContent = "Calories: " + calorieCount

        for (var i = 0; i < selectedItems.length; i++) {
            if(selectedItems.options[i].textContent == selectedSelectedFood.textContent) {
                selectedItems.remove(i)
                break
            }
        }

        selectedMenuFood = null
        selectedSelectedFood = null
    }
}