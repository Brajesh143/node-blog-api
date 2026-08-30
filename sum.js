async function getUser() {
    const response = await fetch("http://localhost:5000/user");

    if (!response.ok) {
        throw new Error("API 1 failed");
    }

    return response.json();
}

async function getOrders() {
    const response = await fetch("http://localhost:5000/orders");

    if (!response.ok) {
        throw new Error("API 2 failed");
    }

    return response.json();
}

async function getPayments() {
    const response = await fetch("http://localhost:5000/payments");

    if (!response.ok) {
        throw new Error("API 3 failed");
    }

    return response.json();
}

// const sequencialExecution = async() => {
//     console.time("Sequential");

//     const user = await getUser();
//     const orders = await getOrders();
//     const payments = await getPayments();

//     console.log(user);
//     console.log(orders);
//     console.log(payments);

//     console.timeEnd("Sequential");
// }

// sequencialExecution();

// concurrent api call

// const concurrent = async() => {
//     console.time("Concurrent");

//     const results = await Promise.all([
//         getUser(),
//         getOrders(),
//         getPayments()
//     ])

//     console.log(results);
//     // console.log(orders);
//     // console.log(payments);

//     console.timeEnd("Concurrent");
// }

// concurrent();

// const concurrentAllSettled = async() => {
//     console.time("Concurrent");

//     const results = await Promise.allSettled([
//         getUser(),
//         getOrders(),
//         getPayments()
//     ])

//     console.log(results);
//     // console.log(orders);
//     // console.log(payments);

//     console.timeEnd("Concurrent");
// }

// concurrentAllSettled();


async function retry(fn, retries=3) {
    for (let attempt=1; attempt <= retries; attempt++) {
        try {
            console.log(`attempt ${attempt}`)
            const result = await getOrders();
            return result;
        } catch (error) {
            if (attempt == retries) {
                throw error;
            }
        }
    }
}

retry()