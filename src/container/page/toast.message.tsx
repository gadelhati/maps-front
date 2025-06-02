import { ErrorMessage, initialErrorMessage } from "../../assets/error/errorMessage"

interface ToastDetails {
    name: string,
    icon: string,
    title: string,
    text: string,
}

export const toastDetails : ToastDetails[] = [
    {
        name: 'success',
        icon: '&#10004;',
        title: 'Success',
        text: 'This is a success toast.',
    },
    {
        name: 'error',
        icon: '&#10008;',
        title: 'Error',
        text: 'This is an error toast.',
    },
    {
        name: 'warning',
        icon: '&#9888;',
        title: 'Warning',
        text: 'This is a warning toast.',
    },
    {
        name: 'info',
        icon: '&#8505;',
        title: 'Info',
        text: 'This is an information toast.',
    }
]

const removeToast = (toast: any) => {
    toast.classList.add('hide') 
    if(toast.timeoutId) clearTimeout(toast.timeoutId)
    setTimeout(() => toast.remove(), 500)
}

export const createToast = (classe: ToastDetails, error: ErrorMessage[]) => {
    // if (error[0]!.message === '') {
    //     return;
    // }
    const notifications = document.querySelector(".notifications");
    error.forEach(err => {
        const toast = document.createElement("li");
        toast.className = `toast ${classe.name}`;
        toast.innerHTML = `<div class="column">
                             <i>${err.field}</i>
                             <p>${err.message}</p>
                           </div>`;

        notifications?.appendChild(toast);
        setTimeout(() => removeToast(toast), 4000);
    });
}