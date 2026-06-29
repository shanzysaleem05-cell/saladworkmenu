const fs = require('fs');
let data = fs.readFileSync('data/menuData.ts', 'utf8');

data = data.replace(/sophie's/gi, 'sophies')
           .replace(/turkey-jalapeño/gi, 'turkey-jalapeno')
           .replace(/coke-\(bottle\)/gi, 'coke-bottle')
           .replace(/diet-coke-\(bottle\)/gi, 'diet-coke-bottle')
           .replace(/sprite-\(bottle\)/gi, 'sprite-bottle')
           .replace(/chipotle-chicken-&/gi, 'chipotle-chicken-and')
           .replace(/turkey-cheddar-&/gi, 'turkey-cheddar-and')
           .replace(/sides-&-desserts/gi, 'sides-and-desserts')
           .replace(/Our signature salads/gi, "SaladWorks signature salads")
           .replace(/our selection/gi, "SaladWorks' selection");

fs.writeFileSync('data/menuData.ts', data);
