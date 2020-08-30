const baseUrl = 'http://localhost:8080';
const headers = new Headers({
    'Content-Type': 'application/json'
});

const format = async<T> (response: Response): Promise<T> => {
    try {
        return await response.json();
    } catch (ex) {
        throw new Error(ex);
    }
}

export const get = async<T> (path?: string): Promise<T> => {
    const response = await fetch(baseUrl + path, {
        headers
    });

    return format(response);
};

export const post = async<T> (path?: string, body?: T): Promise<T> => {
    const response = await fetch(baseUrl + path, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    });

    return format(response);
}

export const patch = async<T> (path?: string, body?: T): Promise<T> => {
    const response = await fetch(baseUrl + path, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body)
    });

    return format(response);
}


export const remove = async<T> (path?: string): Promise<T> => {
    const response = await fetch(baseUrl + path, {
        method: 'DELETE',
        headers,
    });

    return format(response);
}