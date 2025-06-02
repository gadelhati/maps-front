import { ErrorMessage } from "../../assets/error/errorMessage"

interface ToastDetails {
    name: string,
    icon: string,
    title?: string,
    text?: string,
}

export const toastDetails : ToastDetails[] = [
    {
        name: 'success',
        icon: '&#10004;'
    },
    {
        name: 'error',
        icon: '&#10008;'
    },
    {
        name: 'warning',
        icon: '&#9888;'
    },
    {
        name: 'info',
        icon: '&#8505;'
    }
]

const removeToast = (toast: any) => {
    toast.classList.add('hide') 
    if(toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
}

export const createToast = (classe: ToastDetails, errors: ErrorMessage[]) => {
    const notifications = document.querySelector(".notifications");
    errors.forEach(error => {
        const toast = document.createElement("li");
        toast.className = `toast ${classe.name}`;
        toast.innerHTML = `<div class="column">
                             <i>${error.field}</i>
                             <p>${error.message}</p>
                           </div>`;
        notifications?.appendChild(toast);
        setTimeout(() => removeToast(toast), 4000);
    });
}