class Rectangle {
    // Constructor
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color; 
    }
    // method
    area() {
        const area = this.width * this.height;
        return area;
    }
    
    paint() {
        console.log(`Painting with color ${this.color}`);
    }
    
}
 
const rect = new Rectangle(2, 4, 'red') // instance of the Rectangle class/ object of the Rectangle class
const area = rect.area();
const color = rect.color;
console.log(area)
console.log(color)
rect.paint();