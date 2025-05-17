import Swal from 'sweetalert2';

// Handle HTTP error code (like 481)
export function unauthorized(code) {
    if (code === 401) {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/login';
    }
}

// Save email to session
export function setEmail(email) {
    sessionStorage.setItem('email', email);
}

// Retrieve email from session
export function getEmail() {
    return sessionStorage.getItem('email');
}

// Format timestamp to "dd Mon yyyy"
export function TimestampToDate(timestamp) {
    let date = new Date(timestamp);
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + " " + monthName[date.getMonth()] + ' ' + date.getFullYear();
}

// Show confirmation alert (with "Are you sure?")
export async function showConfirmAlert() {
    const result = await Swal.fire({
        title: "Are You Sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

// Show success alert
export async function showSuccessAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

// Show warning alert
export async function showWarningAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

// Show info alert
export async function showInfoAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}