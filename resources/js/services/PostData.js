export function PostData(type, userData) {
    let baseUrl = 'http://127.0.0.1:8000/login';
    return new Promise((resolve, reject) => {
        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then((Response) => Response.json())
        .catch((error) => {
            reject(error);
        });
    });
}