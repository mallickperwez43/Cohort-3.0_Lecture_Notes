interface User {
    id: string;
    name: string;
}

type Users = { [key: string]: User };

const usersOne: Users = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

// cleaner way to write this --> Record

interface UserView {
    id: string;
    name: string;
}

type UsersTwo = Record<string, UserView>;

const users: UsersTwo = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }


// Map : way to set and get

interface UserOutlook {
    id: string;
    name: string;
}

// Initialize an empty Map
const usersMap = new Map<string, UserOutlook>();

// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }