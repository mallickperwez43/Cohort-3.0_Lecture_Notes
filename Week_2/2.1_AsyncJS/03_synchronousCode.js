// Syncronous code - code that runs line by line and waits for the current line to finish before moving to the next line(order pattern)

// function to calculate the sum of numbers from 1 to n
function sum(num) {
	let ans = 0;
 
	for (let i = 1; i <= num; i++) {
		ans = ans + i
	}

	return ans;
}

const ans1 = sum(10);
console.log(ans1);

const ans2 = sum(100);
console.log(ans2);

const ans3 = sum(1000); 
console.log(ans3);

/* execution flow
 14 takes the argument as 10
 performs the task in the sum function and returns and store in ans1 then print it 
 performs the task in the sum function and returns and store in ans2 then print it 
 performs the task in the sum function and returns and store in ans3 then print it 
*/

// synchronous nature -> single threaded language(JS)