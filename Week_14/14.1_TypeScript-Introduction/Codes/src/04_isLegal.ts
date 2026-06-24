const isLegal = (age: number): boolean => {
    return age >= 18;
};

const RahulAge: number = 13;
const KiratAge: number = 19;

console.log(`Rahul is ${isLegal(RahulAge) ? "an Adult" : "still a Minor"}`);
console.log(`Kirat is ${isLegal(KiratAge) ? "an Adult" : "still a Minor"}`);