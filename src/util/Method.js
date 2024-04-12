export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export function goToLoginPage() {
    localStorage.setItem('unauthorized', "1")
    setTimeout(() => {
        localStorage.setItem('unauthorized', "0")
    }, 1000)
    window.location.href = '/login';
}

