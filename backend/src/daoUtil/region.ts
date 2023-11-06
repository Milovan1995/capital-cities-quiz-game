//there will be an option to choose a region eventually so i'm adding a bit of a randomising 'flavour' currently to make sure i'm including everything

let regionNumberArray: number[] = [1, 2, 3, 4, 5];
let regionNumber: number = regionNumberArray[Math.floor(Math.random() * 5)];
export { regionNumber };
