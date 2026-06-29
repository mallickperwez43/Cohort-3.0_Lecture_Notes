// Union : means a value can be one of several types.
type GoodUser = {
    name: string;
    gift: string;
};

type BadUser = {
    name: string;
    ip: string;
};

type User = GoodUser | BadUser;

const user: User = {
    name: "Alex",
    gift: "Mobile",
    ip: "300.20.4090.700"
}

console.log(user);

// Intersection : means a value must fulfill all types combined.  

type Employee = {
    name: string;
    startDate: Date;
};

type Manager = {
    name: string;
    department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer"
};

console.log(teamLead);